import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import brandCard from '@assets/business-card-side-1_480_1793739431141.png';

export default function HomePage() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="fade-in">
            <div className="eyebrow">Mobile detailing · Dallas–Fort Worth</div>
            <h1>Clean lines.<br /><span>No shortcuts.</span></h1>
            <p className="hero-copy">Owner-operated mobile automotive detailing, with care for the details inside and out. Edgley brings a hands-on approach to the vehicle you depend on every day.</p>
            <div className="hero-actions">
              <a className="button-yellow" href="#services" data-testid="link-explore-services">Explore services <ArrowRight size={15} /></a>
              <a className="text-link" href="#contact" data-testid="link-contact-information">How to get in touch</a>
            </div>
          </div>
          <figure className="hero-art fade-in">
            <img src={brandCard} alt="Edgley Automotive Detailing business card artwork, featuring a line drawing of a car and the words No shortcuts." data-testid="img-edgley-brand-artwork" />
            <figcaption className="hero-stamp">Interior / Exterior</figcaption>
          </figure>
        </section>

        <div className="ticker" aria-label="Edgley service focus">
          <div className="ticker-track"><span>Mobile detailing</span><span>Dallas–Fort Worth</span><span>Interior / Exterior</span><span>No shortcuts.</span></div>
        </div>

        <section className="section-pad intro-section" id="approach">
          <div>
            <div className="section-kicker">01 / The Edgley approach</div>
            <p className="intro-copy">Detailing is a series of small decisions made with care. The promise is simple: show up, work hands-on, and don't skip the parts that make the difference.</p>
          </div>
          <div>
            <h2 className="section-title">The finish is in <em>the details.</em></h2>
            <div className="principles">
              <article className="principle">
                <span className="principle-num">01 — OWNER-OPERATED</span>
                <h3>A personal touch</h3>
                <p>Edgley is owner-operated. The work is approached with care, not passed off as a faceless process.</p>
              </article>
              <article className="principle">
                <span className="principle-num">02 — MOBILE</span>
                <h3>At your vehicle</h3>
                <p>Mobile detailing across the Fort Worth area. Specific availability and service area details should be confirmed directly.</p>
              </article>
              <article className="principle">
                <span className="principle-num">03 — NO SHORTCUTS</span>
                <h3>Inside and out</h3>
                <p>Interior and exterior detailing are the focus. The work is about the vehicle, not just the easy-to-see parts.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="service-panel" id="services">
          <div className="service-head">
            <div>
              <div className="section-kicker">02 / What Edgley does</div>
              <h2 className="section-title" style={{ marginTop: 15 }}>Two sides. <em>One standard.</em></h2>
            </div>
            <p>Service details, vehicle fit, and availability can vary. Reach out through a verified business channel before booking; none is published here yet.</p>
          </div>
          <div className="service-pair">
            <article className="service-tile">
              <span className="tile-meta">A / THE CABIN</span>
              <div>
                <h3 className="tile-title">Interior</h3>
                <p className="tile-note">A considered clean for the space you spend your time in. Scope and options are confirmed directly with Edgley.</p>
              </div>
              <span className="tile-meta">COMFORT · CARE · DETAIL</span>
            </article>
            <article className="service-tile dark-tile">
              <span className="tile-meta">B / THE EXTERIOR</span>
              <div>
                <h3 className="tile-title">Exterior</h3>
                <p className="tile-note">A hands-on refresh for the vehicle's exterior. Ask about the right service for your vehicle and its condition.</p>
              </div>
              <span className="tile-meta">PRESENTATION · FINISH · DETAIL</span>
            </article>
          </div>
          <div className="service-foot">SERVICE SCOPE, PRICING, AND AVAILABILITY ARE NOT LISTED ON THIS SITE.</div>
        </section>

        <section className="promise">
          <div className="promise-left">
            <div className="eyebrow">The standard</div>
            <h2>No<br /><span>shortcuts.</span></h2>
          </div>
          <div className="promise-right">
            <div className="promise-rule" />
            <p>It's the line on the card, and the idea behind the work. Take the time to look closer. Treat each part of the vehicle with attention. Leave the rushed version for someone else.</p>
            <p>Edgley Automotive Detailing is an owner-operated mobile detailing business serving Dallas–Fort Worth.</p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <div className="section-kicker">03 / Next step</div>
            <h2 className="section-title" style={{ marginTop: 15 }}>Start with a <em>conversation.</em></h2>
          </div>
          <div className="contact-note" data-testid="status-contact-details">
            <strong>Business contact details aren't verified here.</strong>
            <p>This first version does not list a phone number, email address, or booking form. We won't pretend a message is delivered or saved. Use a contact method you already have for Edgley to ask about service scope, availability, and pricing.</p>
          </div>
        </section>
      </main>
      <div className="learn-end">
        <div><div className="eyebrow">Curious about the build?</div><p>This website is a small React app. See the beginner guide to how it works.</p></div>
        <Link className="button-yellow" href="/learn" data-testid="link-learning-guide">Open the learning guide <ArrowRight size={15} /></Link>
      </div>
    </>
  );
}
