import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

export function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLearn = location === '/learn';
  const openLearnFromTop = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link href="/" className="wordmark" data-testid="link-brand-home" onClick={() => setMenuOpen(false)}>
          <span className="wordmark-mark" aria-hidden="true" />
          <span>
            <span className="wordmark-main">EDGLEY</span>
            <span className="wordmark-sub">AUTOMOTIVE DETAILING</span>
          </span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          data-testid="button-toggle-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
          <Link href="/#services" data-testid="link-services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/#approach" data-testid="link-approach" onClick={() => setMenuOpen(false)}>Our approach</Link>
          <Link href="/learn" className={`nav-learn${isLearn ? ' active' : ''}`} data-testid="link-learn" onClick={openLearnFromTop}>Learn how this site works</Link>
        </nav>
      </header>
      {children}
      <footer className="footer">
        <span>EDGLEY AUTOMOTIVE DETAILING · DALLAS–FORT WORTH</span>
        <Link href="/learn" data-testid="link-footer-learn" onClick={openLearnFromTop}>A little about this website <span aria-hidden="true">↗</span></Link>
        <span>INTERIOR · EXTERIOR · OWNER-OPERATED</span>
      </footer>
    </div>
  );
}
