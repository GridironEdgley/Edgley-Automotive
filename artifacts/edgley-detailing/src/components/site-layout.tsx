import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Compass, Menu, X } from 'lucide-react';
import '../styles/ai-guide.css';
import { Analytics } from '@vercel/analytics/react';
export function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLearn = location.startsWith('/learn');

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        document.getElementById(hash)?.scrollIntoView({ behavior: 'auto' });
        window.requestAnimationFrame(() => {
          root.style.scrollBehavior = previousScrollBehavior;
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  const jumpToLesson = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (!isLearn) return;
    event.preventDefault();
    window.history.replaceState(null, '', `/learn#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell guide-page">
      <header className="guide-topbar">
        <Link href="/" className="guide-brand" data-testid="link-brand-home" onClick={() => setMenuOpen(false)}>
          <span className="guide-brand-mark" aria-hidden="true"><Compass /></span>
          <span>
            <span className="guide-brand-name">AI Guide</span>
            <span className="guide-brand-note">A place to start</span>
          </span>
        </Link>
        <button
          className="guide-menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          data-testid="button-toggle-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`guide-nav${menuOpen ? ' guide-nav-open' : ''}`} aria-label="Learning navigation">
          <Link href="/learn#coding-words" data-testid="link-glossary" onClick={jumpToLesson('coding-words')}>Coding words</Link>
          <Link href="/learn#ai" data-testid="link-ai" onClick={jumpToLesson('ai')}>About AI</Link>
          <Link href="/learn#toolkit" data-testid="link-toolkit" onClick={jumpToLesson('toolkit')}>Toolkit</Link>
          <Link href="/learn" className="guide-nav-cta" aria-current={isLearn ? 'page' : undefined} data-testid="link-learn" onClick={() => setMenuOpen(false)}>Explore lessons <ArrowRight size={13} aria-hidden="true" /></Link>
        </nav>
      </header>
      {children}
      <footer className="guide-footer">
        <span>AI Guide · A little learning, a lot of curiosity</span>
        <Link href="/learn" data-testid="link-footer-learn" onClick={() => setMenuOpen(false)}>All lessons <ArrowRight size={12} aria-hidden="true" /></Link>
        <span>Start small. Keep exploring.</span>
        <Analytics />
      </footer>
    </div>
  );
}
