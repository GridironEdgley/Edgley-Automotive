import { ArrowDown, ArrowRight, BookOpen, Code2, Compass, Sparkles, Wrench } from 'lucide-react';
import './_group.css';

export function AiGuide() {
  return (
    <div className="guide-page">
      <style>{`
        .guide-page {
          --ink: #223a38; --muted: #627571; --paper: #f5f7ef; --line: #d9e2d7;
          --teal: #24766b; --lime: #d5ed83; --coral: #e18c70; --lavender: #e8e6f3;
          min-height: 100dvh; overflow: hidden; background: var(--paper); color: var(--ink);
          font-family: 'Manrope', sans-serif;
        }
        .guide-page * { box-sizing: border-box; }
        .guide-page a { color: inherit; }
        .guide-topbar {
          height: 78px; padding: 0 clamp(22px, 6vw, 92px); display: flex; align-items: center;
          justify-content: space-between; border-bottom: 1px solid var(--line); background: var(--paper);
        }
        .guide-brand { display: flex; align-items: center; gap: 11px; text-decoration: none; }
        .guide-brand-mark { width: 34px; height: 34px; border-radius: 11px 11px 11px 3px; background: var(--teal); color: var(--lime); display: grid; place-items: center; }
        .guide-brand-mark svg { width: 19px; height: 19px; }
        .guide-brand-name { font: 700 18px/1 'Space Grotesk', sans-serif; letter-spacing: -.04em; }
        .guide-brand-note { display: block; margin-top: 5px; color: var(--muted); font: 9px 'DM Mono', monospace; letter-spacing: .12em; text-transform: uppercase; }
        .guide-nav { display: flex; align-items: center; gap: clamp(16px, 3vw, 38px); }
        .guide-nav a { text-decoration: none; font-size: 12px; font-weight: 700; color: var(--muted); transition: color .2s ease; }
        .guide-nav a:hover { color: var(--teal); }
        .guide-nav .guide-nav-cta { color: var(--teal); border: 1px solid #a9c8bf; border-radius: 999px; padding: 10px 15px; }
        .guide-hero {
          position: relative; padding: 76px clamp(22px, 8vw, 126px) 82px; display: grid;
          grid-template-columns: 1.02fr .98fr; gap: 6vw; align-items: center; min-height: 580px;
        }
        .guide-hero-copy { position: relative; z-index: 1; animation: guide-rise .7s .05s both; }
        .guide-eyebrow { display: inline-flex; align-items: center; gap: 9px; color: var(--teal); font: 10px 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .16em; }
        .guide-eyebrow::before { content: ''; width: 21px; height: 1px; background: var(--coral); }
        .guide-hero h1 { max-width: 620px; margin: 23px 0 21px; font: 600 clamp(52px, 7vw, 88px)/.98 'Space Grotesk', sans-serif; letter-spacing: -.075em; }
        .guide-hero h1 em { color: var(--teal); font-style: normal; position: relative; white-space: nowrap; }
        .guide-hero h1 em::after { content: ''; position: absolute; z-index: -1; left: 2px; right: -5px; bottom: 5px; height: 17px; background: var(--lime); transform: rotate(-1.3deg); }
        .guide-lede { max-width: 450px; margin: 0; color: var(--muted); font-size: 15px; line-height: 1.85; }
        .guide-hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; margin-top: 31px; }
        .guide-button { display: inline-flex; align-items: center; gap: 13px; border-radius: 999px; padding: 14px 19px; background: var(--teal); color: #f8fbf3 !important; text-decoration: none; font-size: 12px; font-weight: 800; transition: transform .2s ease, background .2s ease; }
        .guide-button:hover { background: #195e55; transform: translateY(-2px); }
        .guide-button svg { width: 16px; height: 16px; }
        .guide-quiet-link { display: inline-flex; align-items: center; gap: 8px; color: var(--muted) !important; text-decoration: none; font-size: 12px; font-weight: 700; }
        .guide-quiet-link svg { width: 14px; height: 14px; }
        .guide-art { min-height: 408px; position: relative; display: grid; place-items: center; animation: guide-rise .8s .16s both; }
        .guide-orbit { position: absolute; width: min(34vw, 400px); aspect-ratio: 1; border: 1px dashed #b6c9b6; border-radius: 50%; transform: rotate(-20deg); }
        .guide-orbit::before, .guide-orbit::after { content: ''; position: absolute; border: 1px solid #dce5d6; border-radius: 50%; inset: 26px; }
        .guide-orbit::after { inset: 55px; }
        .guide-sun { width: 190px; height: 190px; position: absolute; border-radius: 50%; background: var(--lime); left: 19%; top: 13%; }
        .guide-learning-card { position: relative; z-index: 1; width: min(330px, 78%); padding: 24px; background: #fffef8; border: 1px solid #dfe8dc; border-radius: 20px; box-shadow: 0 18px 45px rgba(35, 65, 56, .1); transform: rotate(2deg); }
        .guide-card-top { display: flex; justify-content: space-between; align-items: center; color: var(--muted); font: 10px 'DM Mono', monospace; letter-spacing: .1em; text-transform: uppercase; }
        .guide-card-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--coral); box-shadow: 13px 0 0 #efc56e, 26px 0 0 #8cbba6; margin-right: 26px; }
        .guide-card-title { margin: 27px 0 18px; font: 600 27px/1.08 'Space Grotesk', sans-serif; letter-spacing: -.055em; }
        .guide-code { padding: 14px 15px; border-radius: 11px; background: #eaf1e9; font: 12px/1.8 'DM Mono', monospace; color: #395e55; }
        .guide-code b { color: #bd715c; font-weight: 500; }
        .guide-card-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 17px; color: var(--muted); font-size: 10px; }
        .guide-card-bottom strong { color: var(--teal); font-size: 11px; }
        .guide-sticker { position: absolute; z-index: 2; right: 3%; bottom: 9%; width: 92px; height: 92px; border-radius: 50%; background: var(--coral); color: #fffaf0; display: grid; place-items: center; text-align: center; font: 10px/1.35 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .06em; transform: rotate(9deg); }
        .guide-sticker svg { width: 17px; height: 17px; margin-bottom: -16px; }
        .guide-ribbon { overflow: hidden; background: var(--teal); color: #eef4df; padding: 15px 0; }
        .guide-ribbon-inner { display: flex; justify-content: space-around; gap: 34px; white-space: nowrap; font: 10px 'DM Mono', monospace; letter-spacing: .15em; text-transform: uppercase; }
        .guide-ribbon span { display: inline-flex; align-items: center; gap: 32px; }
        .guide-ribbon span::after { content: ''; width: 6px; height: 6px; background: var(--lime); border-radius: 50%; }
        .guide-content { padding: 84px clamp(22px, 8vw, 126px) 100px; }
        .guide-section-head { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 34px; }
        .guide-section-kicker { color: #7b8e83; font: 10px 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .16em; }
        .guide-section-head h2 { margin: 13px 0 0; font: 600 clamp(32px, 4.6vw, 52px)/1.03 'Space Grotesk', sans-serif; letter-spacing: -.065em; }
        .guide-section-head p { max-width: 300px; color: var(--muted); font-size: 12px; line-height: 1.7; margin: 0 0 3px; }
        .guide-path-grid { display: grid; grid-template-columns: 1.15fr .9fr .9fr; gap: 13px; align-items: stretch; }
        .guide-path { min-height: 250px; display: flex; flex-direction: column; justify-content: space-between; text-decoration: none; padding: 25px; border: 1px solid var(--line); border-radius: 15px; background: #fffef8; transition: transform .23s ease, box-shadow .23s ease; }
        .guide-path:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(35, 65, 56, .08); }
        .guide-path.primary-path { background: #e5eee4; border-color: #d2e2d0; min-height: 274px; }
        .guide-path.ai-path { background: var(--lavender); border-color: #dedbea; }
        .guide-path-top { display: flex; justify-content: space-between; align-items: center; }
        .guide-path-number { color: #82968a; font: 10px 'DM Mono', monospace; letter-spacing: .1em; }
        .guide-path-icon { width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center; background: #d8e8d6; color: var(--teal); }
        .ai-path .guide-path-icon { background: #d8d5e9; color: #625d88; }
        .guide-path-icon svg { width: 18px; height: 18px; }
        .guide-path h3 { margin: 20px 0 9px; font: 600 23px/1.05 'Space Grotesk', sans-serif; letter-spacing: -.05em; }
        .guide-path p { max-width: 285px; margin: 0; color: var(--muted); font-size: 12px; line-height: 1.65; }
        .guide-path-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 21px; color: var(--teal); font-size: 11px; font-weight: 800; }
        .guide-path-link svg { width: 14px; height: 14px; transition: transform .2s ease; }
        .guide-path:hover .guide-path-link svg { transform: translateX(3px); }
        .guide-bottom { padding: 0 clamp(22px, 8vw, 126px) 72px; }
        .guide-next { position: relative; overflow: hidden; padding: 36px 42px; display: flex; justify-content: space-between; align-items: center; gap: 28px; border-radius: 18px; background: #e9eddf; }
        .guide-next::after { content: '01'; position: absolute; right: 33%; top: -39px; color: rgba(36,118,107,.08); font: 700 180px/.9 'Space Grotesk', sans-serif; letter-spacing: -.1em; pointer-events: none; }
        .guide-next-copy { position: relative; z-index: 1; }
        .guide-next h2 { margin: 11px 0 7px; font: 600 clamp(26px, 3.6vw, 39px)/1.05 'Space Grotesk', sans-serif; letter-spacing: -.06em; }
        .guide-next p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.7; }
        .guide-footer { min-height: 74px; padding: 20px clamp(22px, 6vw, 92px); display: flex; justify-content: space-between; align-items: center; gap: 16px; border-top: 1px solid var(--line); color: #71847b; font: 9px 'DM Mono', monospace; letter-spacing: .09em; text-transform: uppercase; }
        .guide-footer a { color: var(--teal); text-decoration: none; }
        @keyframes guide-rise { from { opacity: 0; transform: translateY(13px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .guide-page *, .guide-page *::before, .guide-page *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; } }
        @media (max-width: 760px) {
          .guide-topbar { height: auto; min-height: 70px; padding: 14px 20px; align-items: flex-start; }
          .guide-nav { gap: 13px; padding-top: 9px; }
          .guide-nav a { font-size: 10px; }
          .guide-nav a:nth-child(2), .guide-nav a:nth-child(3) { display: none; }
          .guide-nav .guide-nav-cta { padding: 9px 12px; }
          .guide-hero { grid-template-columns: 1fr; padding: 61px 23px 55px; gap: 22px; }
          .guide-hero h1 { font-size: clamp(52px, 14vw, 76px); }
          .guide-art { min-height: 330px; }
          .guide-orbit { width: min(76vw, 340px); }
          .guide-sun { width: 145px; height: 145px; }
          .guide-learning-card { width: min(310px, 82%); }
          .guide-sticker { right: 4%; bottom: 4%; width: 78px; height: 78px; }
          .guide-ribbon-inner { justify-content: flex-start; padding-left: 22px; }
          .guide-content { padding: 68px 22px 74px; }
          .guide-section-head { display: block; }
          .guide-section-head p { margin-top: 17px; }
          .guide-path-grid { grid-template-columns: 1fr; }
          .guide-path, .guide-path.primary-path { min-height: 220px; }
          .guide-bottom { padding: 0 22px 55px; }
          .guide-next { padding: 27px 24px; align-items: flex-start; flex-direction: column; }
          .guide-next::after { right: 10%; top: -13px; }
          .guide-footer { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
      <header className="guide-topbar">
        <a className="guide-brand" href="/learn" aria-label="AI Guide home">
          <span className="guide-brand-mark" aria-hidden="true"><Compass /></span>
          <span><span className="guide-brand-name">AI Guide</span><span className="guide-brand-note">A place to start</span></span>
        </a>
        <nav className="guide-nav" aria-label="Learning navigation">
          <a href="/learn#coding-words">Coding words</a>
          <a href="/learn#ai">About AI</a>
          <a href="/learn#toolkit">Toolkit</a>
          <a className="guide-nav-cta" href="/learn">Explore lessons <ArrowRight size={13} /></a>
        </nav>
      </header>
      <main>
        <section className="guide-hero">
          <div className="guide-hero-copy">
            <div className="guide-eyebrow">A friendly starting point</div>
            <h1>Curious about AI?<br />Start <em>right here.</em></h1>
            <p className="guide-lede">Learn what AI is, try a little code, and make sense of the words along the way. No experience needed — just bring a question.</p>
            <div className="guide-hero-actions">
              <a className="guide-button" href="/learn">Find your first lesson <ArrowRight /></a>
              <a className="guide-quiet-link" href="/learn#practice"><ArrowDown /> See what you can try</a>
            </div>
          </div>
          <div className="guide-art" aria-label="A simple example of a first coding lesson">
            <div className="guide-orbit" />
            <div className="guide-sun" />
            <div className="guide-learning-card">
              <div className="guide-card-top"><span>tiny experiment / 01</span><span className="guide-card-dot" /></div>
              <div className="guide-card-title">Make a computer<br />say hello.</div>
              <div className="guide-code"><b>print</b>(<span>"Hello, world!"</span>)<br /><span>→ Hello, world!</span></div>
              <div className="guide-card-bottom"><span>A first line of code</span><strong>you made it</strong></div>
            </div>
            <div className="guide-sticker"><Sparkles /><span>small steps<br />count</span></div>
          </div>
        </section>
        <div className="guide-ribbon" aria-label="What you can learn">
          <div className="guide-ribbon-inner"><span>Learn by trying</span><span>Plain-language explanations</span><span>Make something small</span><span>Come back curious</span></div>
        </div>
        <section className="guide-content">
          <div className="guide-section-head">
            <div><div className="guide-section-kicker">Pick a path · go at your pace</div><h2>What would you like<br />to figure out?</h2></div>
            <p>Each lesson is a small step. Start anywhere, follow your curiosity, and come back whenever you like.</p>
          </div>
          <div className="guide-path-grid">
            <a className="guide-path primary-path" href="/learn#practice">
              <div className="guide-path-top"><span className="guide-path-number">01 / TRY IT</span><span className="guide-path-icon"><Code2 /></span></div>
              <div><h3>Make something<br />with code</h3><p>Start with a tiny experiment and see what your instructions can do.</p><span className="guide-path-link">Try a practice lesson <ArrowRight /></span></div>
            </a>
            <a className="guide-path ai-path" href="/learn#ai">
              <div className="guide-path-top"><span className="guide-path-number">02 / GET THE IDEA</span><span className="guide-path-icon"><Sparkles /></span></div>
              <div><h3>Get to know AI</h3><p>What it can do, how it learns, and where people fit in.</p><span className="guide-path-link">Explore AI basics <ArrowRight /></span></div>
            </a>
            <a className="guide-path" href="/learn#coding-words">
              <div className="guide-path-top"><span className="guide-path-number">03 / LOOK IT UP</span><span className="guide-path-icon"><BookOpen /></span></div>
              <div><h3>Decode the words</h3><p>Clear, friendly explanations for the terms you keep hearing.</p><span className="guide-path-link">Browse coding words <ArrowRight /></span></div>
            </a>
          </div>
        </section>
        <section className="guide-bottom" id="toolkit">
          <div className="guide-next">
            <div className="guide-next-copy"><div className="guide-section-kicker">Keep useful things close</div><h2>Your beginner toolkit</h2><p>A simple collection of starting points for learning about AI and code.</p></div>
            <a className="guide-button" href="/learn#toolkit">Open the toolkit <Wrench /></a>
          </div>
        </section>
      </main>
      <footer className="guide-footer"><span>AI GUIDE · A LITTLE LEARNING, A LOT OF CURIOSITY</span><a href="/learn">All lessons <ArrowRight size={12} /></a><span>START SMALL. KEEP EXPLORING.</span></footer>
    </div>
  );
}
