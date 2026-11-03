import { Link } from 'wouter';

function CodeBlock({ label, children }: { label: string; children: string }) {
  return <pre className="code-block"><span className="code-label">{label}</span><code>{children}</code></pre>;
}

export default function LearnPage() {
  return (
    <>
      <main>
        <section className="learn-hero">
          <div className="eyebrow">A field guide for curious beginners</div>
          <h1>A website is just code with a point of view.</h1>
          <p>Here's a plain-language tour of the React and TypeScript pieces behind this site, where to edit them, and what a database could add later.</p>
        </section>
        <div className="learn-layout">
          <nav className="learn-toc" aria-label="Learning guide contents">
            <a href="#react" data-testid="link-learn-react">React + TypeScript</a>
            <a href="#files" data-testid="link-learn-files">Finding the code</a>
            <a href="#git" data-testid="link-learn-git">Git + GitHub</a>
            <a href="#supabase" data-testid="link-learn-supabase">What Supabase adds</a>
          </nav>
          <article className="learn-content">
            <section id="react">
              <div className="section-kicker">01 / The ingredients</div>
              <h2>React builds the pieces.</h2>
              <p>React lets us describe reusable pieces of a page—like a service tile or the shared navigation—and compose them into screens. TypeScript adds labels for the kinds of values those pieces expect. In this real app, a small component receives a text label and code snippet:</p>
              <CodeBlock label="src/pages/learn.tsx">{`function CodeBlock({ label, children }: {
  label: string;
  children: string;
}) {
  return (
    <pre className="code-block">
      <span>{label}</span>
      <code>{children}</code>
    </pre>
  );
}`}</CodeBlock>
              <p>The curly braces put JavaScript values into JSX, React's HTML-like syntax. The TypeScript type says both properties are strings, so an editor can flag a mismatch before the page runs.</p>
              <h3>Routes choose a page</h3>
              <p>This project uses wouter for routing. A route maps a URL path to a page component. These are the two routes in this version:</p>
              <CodeBlock label="src/App.tsx">{`<Switch>
  <Route path="/">
    <SiteLayout><HomePage /></SiteLayout>
  </Route>
  <Route path="/learn">
    <SiteLayout><LearnPage /></SiteLayout>
  </Route>
  <Route component={NotFound} />
</Switch>`}</CodeBlock>
              <p>A shared navigation sits around the route switch, which is why the learning guide is reachable from both pages.</p>
            </section>
            <section id="files">
              <div className="section-kicker">02 / Finding your way</div>
              <h2>Know which file does what.</h2>
              <p>Open the project folder in a code editor such as VS Code. The useful starting points are:</p>
              <ul>
                <li><strong>src/pages/home.tsx</strong> — the customer-facing Edgley page and its copy.</li>
                <li><strong>src/pages/learn.tsx</strong> — this guide and the instructional examples.</li>
                <li><strong>src/components/site-layout.tsx</strong> — shared brand header and footer.</li>
                <li><strong>src/index.css</strong> — colors, type, spacing, responsive rules, and motion.</li>
                <li><strong>src/App.tsx</strong> — the route map that connects page paths to components.</li>
              </ul>
              <h3>Make a small, safe edit</h3>
              <p>Find the text you want to change in the relevant page file, edit it, save, and check the local preview. Keep the copy factual: don't add a price, review, phone number, or promise unless Edgley has confirmed it.</p>
              <CodeBlock label="JSX example">{`<h3 className="tile-title">Interior</h3>
<p className="tile-note">
  Ask about the right service for your vehicle.
</p>`}</CodeBlock>
              <p>The <code>className</code> connects this markup to a CSS rule. In JSX, the attribute is spelled <code>className</code> rather than HTML's <code>class</code>.</p>
            </section>
            <section id="git">
              <div className="section-kicker">03 / Keeping a history</div>
              <h2>Git gives you a rewind button.</h2>
              <p>Git records changes in a project so you can see what changed and return to an earlier version. GitHub can host a copy of that repository and make collaboration easier. A basic edit cycle looks like this in a terminal opened at the project folder:</p>
              <CodeBlock label="A simple Git workflow">{`git status
git add src/pages/home.tsx src/index.css
git commit -m "Refine service page copy"
git push`}</CodeBlock>
              <ol>
                <li><code>git status</code> shows which files changed.</li>
                <li><code>git add</code> selects the edits for the next snapshot.</li>
                <li><code>git commit</code> saves a named checkpoint locally.</li>
                <li><code>git push</code> sends committed changes to the configured remote repository, such as GitHub.</li>
              </ol>
              <p>Before pushing, review the changes and make sure credentials or private information aren't included. If Git is new to you, a graphical Git client can make these steps easier to inspect.</p>
            </section>
            <section id="supabase">
              <div className="section-kicker">04 / A possible next layer</div>
              <h2>What would Supabase add?</h2>
              <p>Supabase is a hosted platform that can provide a Postgres database, authentication, file storage, and APIs. A future version could use it for carefully designed features—such as a private admin workflow to manage service information—after access rules and data handling are planned.</p>
              <div className="notice" data-testid="status-no-backend">
                <strong>Important: Supabase is not connected.</strong> This site currently has no database or backend. The current pages are static frontend content. There is no quote or contact submission that is delivered or saved remotely.
              </div>
              <p>Connecting a database is not just adding a URL. It requires a specific feature, a data model, secure access policies, and a clear plan for who can read or change information. Never put a private service-role key in browser code.</p>
            </section>
          </article>
        </div>
        <div className="learn-end">
          <div><div className="eyebrow">Back to the business</div><p>Return to Edgley's service overview.</p></div>
          <Link href="/" className="button-yellow" data-testid="link-return-home">Return to home <span aria-hidden="true">→</span></Link>
        </div>
      </main>
    </>
  );
}
