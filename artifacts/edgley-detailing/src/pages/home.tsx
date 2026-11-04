import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Code2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Link } from 'wouter';

export default function HomePage() {
  return (
    <main>
      <section className="guide-hero" aria-labelledby="guide-home-title">
        <div className="guide-hero-copy">
          <div className="guide-eyebrow">A friendly starting point</div>
          <h1 id="guide-home-title">Curious about AI?<br />Start <em>right here.</em></h1>
          <p className="guide-lede">Learn what AI is, try a little code, and make sense of the tools along the way. No experience needed — start with one small question.</p>
          <div className="guide-hero-actions">
            <Link className="guide-button" href="/learn">
              Find your first lesson <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="guide-quiet-link" href="/learn#practice">
              <ArrowDown aria-hidden="true" /> See what you can try
            </Link>
          </div>
        </div>
        <div className="guide-art" role="img" aria-label="A sample first coding lesson showing a computer printing Hello, world">
          <div className="guide-orbit" />
          <div className="guide-sun" />
          <div className="guide-learning-card">
            <div className="guide-card-top"><span>Tiny experiment / 01</span><span className="guide-card-dot" /></div>
            <div className="guide-card-title">Make a computer<br />say hello.</div>
            <div className="guide-code"><b>print</b>(&quot;Hello, world!&quot;)<br /><span aria-hidden="true">→ Hello, world!</span></div>
            <div className="guide-card-bottom"><span>A first line of code</span><strong>You made it</strong></div>
          </div>
          <div className="guide-sticker"><Sparkles aria-hidden="true" /><span>Small steps<br />count</span></div>
        </div>
      </section>
      <div className="guide-ribbon" aria-label="What you can learn">
        <div className="guide-ribbon-inner"><span>Learn by trying</span><span>Plain-language explanations</span><span>Make something small</span><span>Come back curious</span></div>
      </div>
      <section className="guide-content" aria-labelledby="guide-path-title">
        <aside className="guide-safety" aria-label="Safe practice">
          <span className="guide-safety-icon"><ShieldCheck aria-hidden="true" /></span>
          <div className="guide-safety-copy">
            <strong>Safe to explore</strong>
            <p>Practice activities use sample data in your browser. They don’t connect to your real accounts or save changes.</p>
          </div>
          <Link className="guide-safety-link" href="/learn#practice">How practice works <ArrowRight aria-hidden="true" /></Link>
        </aside>
        <div className="guide-section-head">
          <div><div className="guide-section-kicker">Pick a path · go at your pace</div><h2 id="guide-path-title">What would you like<br />to figure out?</h2></div>
          <p>Each lesson is a small step. Start anywhere, follow your curiosity, and come back whenever you like.</p>
        </div>
        <div className="guide-path-grid">
          <Link className="guide-path primary-path" href="/learn#practice">
            <div className="guide-path-top"><span className="guide-path-number">01 / TRY IT</span><span className="guide-path-icon"><Code2 aria-hidden="true" /></span></div>
            <div><h3>Make something<br />with code</h3><p>Start with a tiny experiment and see what your instructions can do.</p><span className="guide-path-link">Try a practice lesson <ArrowRight aria-hidden="true" /></span></div>
          </Link>
          <Link className="guide-path ai-path" href="/learn#ai">
            <div className="guide-path-top"><span className="guide-path-number">02 / GET THE IDEA</span><span className="guide-path-icon"><Sparkles aria-hidden="true" /></span></div>
            <div><h3>Get to know AI</h3><p>What it can do, how it learns, and where people fit in.</p><span className="guide-path-link">Explore AI basics <ArrowRight aria-hidden="true" /></span></div>
          </Link>
          <Link className="guide-path" href="/learn#coding-words">
            <div className="guide-path-top"><span className="guide-path-number">03 / LOOK IT UP</span><span className="guide-path-icon"><BookOpen aria-hidden="true" /></span></div>
            <div><h3>Decode the words</h3><p>Clear, friendly explanations for the terms you keep hearing.</p><span className="guide-path-link">Browse coding words <ArrowRight aria-hidden="true" /></span></div>
          </Link>
        </div>
      </section>
      <section className="guide-bottom" aria-labelledby="guide-toolkit-title">
        <div className="guide-next">
          <div className="guide-next-copy"><div className="guide-section-kicker">Keep useful things close</div><h2 id="guide-toolkit-title">Your beginner toolkit</h2><p>A simple collection of starting points for learning about AI and code.</p></div>
          <Link className="guide-button" href="/learn#toolkit">Open the toolkit <Wrench aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
