import { useState } from 'react';
import { Link } from 'wouter';

function CodeBlock({ label, children }: { label: string; children: string }) {
  return <pre className="code-block"><span className="code-label">{label}</span><code>{children}</code></pre>;
}

const practiceSteps = [
  'Change the sample headline and watch the preview update.',
  'Find the home page component and trace which route opens it.',
  'Make one small edit, then inspect the changed files before saving a Git checkpoint.',
  'Explain why this version does not need a database yet.',
];

function HeadlinePractice() {
  const [phrase, setPhrase] = useState('No shortcuts.');
  const [completed, setCompleted] = useState<string[]>([]);
  const isComplete = (step: string) => completed.includes(step);

  function toggleStep(step: string) {
    setCompleted((current) =>
      current.includes(step)
        ? current.filter((item) => item !== step)
        : [...current, step],
    );
  }

  return (
    <div className="practice-grid">
      <div className="practice-card">
        <div className="practice-label">Try it / 01</div>
        <h3>Change a word. See it change.</h3>
        <p>This tiny demo uses React state: the page remembers what you type while it is open, then redraws the preview.</p>
        <label className="practice-input-label" htmlFor="headline-practice-input">Type a short headline</label>
        <input
          id="headline-practice-input"
          className="practice-input"
          data-testid="input-headline-practice"
          maxLength={60}
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
        />
        <div className="practice-preview" aria-live="polite">
          <span>LIVE PREVIEW</span>
          <strong>{phrase || 'Your headline appears here.'}</strong>
        </div>
        <CodeBlock label="The idea behind the demo">{`const [phrase, setPhrase] = useState('No shortcuts.');

<input
  value={phrase}
  onChange={(event) => setPhrase(event.target.value)}
/>

<strong>{phrase}</strong>`}</CodeBlock>
        <p><code>useState</code> holds the current text. <code>value</code> shows it in the input. <code>onChange</code> updates it as you type.</p>
      </div>
      <div className="practice-card">
        <div className="practice-label">Try it / 02</div>
        <h3>Your first four steps</h3>
        <p>Use these small tasks to connect the ideas to the actual project. They are practice notes, not saved account data.</p>
        <div className="practice-progress" aria-live="polite">
          <span>{completed.length} of {practiceSteps.length} done</span>
          <div className="practice-progress-track" aria-hidden="true">
            <span style={{ width: `${(completed.length / practiceSteps.length) * 100}%` }} />
          </div>
        </div>
        <div className="practice-checklist">
          {practiceSteps.map((step) => (
            <label className="practice-check" key={step}>
              <input
                type="checkbox"
                checked={isComplete(step)}
                onChange={() => toggleStep(step)}
                data-testid={`checkbox-practice-${practiceSteps.indexOf(step) + 1}`}
              />
              <span>{step}</span>
            </label>
          ))}
        </div>
        <p className="practice-footnote">This checklist resets if you reload the page.</p>
      </div>
    </div>
  );
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
            <a href="#practice" data-testid="link-learn-practice">Try a small edit</a>
            <a href="#files" data-testid="link-learn-files">Finding the code</a>
            <a href="#ai" data-testid="link-learn-ai">AI for beginners</a>
            <a href="#toolkit" data-testid="link-learn-toolkit">Developer tools</a>
            <a href="#debugging" data-testid="link-learn-debugging">Fixing problems</a>
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
            <section id="practice">
              <div className="section-kicker">02 / Learn by trying</div>
              <h2>Make a change and watch what happens.</h2>
              <p>Learning sticks when you can experiment. These controls are safe to try: they change only this preview, and no customer information is sent or stored.</p>
              <HeadlinePractice />
            </section>
            <section id="files">
              <div className="section-kicker">03 / Finding your way</div>
              <h2>Know which file does what.</h2>
              <p>Open the project folder in a code editor such as VS Code. The useful starting points are:</p>
              <ul>
                <li><strong>src/pages/home.tsx</strong> — the customer-facing Edgley page and its copy.</li>
                <li><strong>src/pages/learn.tsx</strong> — this guide and the instructional examples.</li>
                <li><strong>src/components/site-layout.tsx</strong> — shared brand header and footer.</li>
                <li><strong>src/index.css</strong> — colors, type, spacing, responsive rules, and motion.</li>
                <li><strong>src/App.tsx</strong> — the route map that connects page paths to components.</li>
              </ul>
              <h3>Your first real edit</h3>
              <ol>
                <li>Open <code>src/pages/home.tsx</code> and find the exact words you want to change.</li>
                <li>Edit only those words, save the file, and look at the preview again.</li>
                <li>If the preview looks wrong, undo the last edit before changing more.</li>
              </ol>
              <p>Keep business copy factual: don't add a price, review, phone number, or promise unless Edgley has confirmed it.</p>
              <CodeBlock label="JSX example">{`<h3 className="tile-title">Interior</h3>
<p className="tile-note">
  Ask about the right service for your vehicle.
</p>`}</CodeBlock>
              <p>The <code>className</code> connects this markup to a CSS rule. In JSX, the attribute is spelled <code>className</code> rather than HTML's <code>class</code>.</p>
              <div className="concept-strip">
                <div><strong>HTML / JSX</strong><span>What appears on the page</span></div>
                <div><strong>CSS</strong><span>How those parts look</span></div>
                <div><strong>TypeScript</strong><span>What values the code expects</span></div>
                <div><strong>React</strong><span>How pieces update and fit together</span></div>
              </div>
            </section>
            <section id="ai">
              <div className="section-kicker">04 / Working with AI</div>
              <h2>AI can help you learn. You stay in charge.</h2>
              <p>An AI assistant is a tool you can talk to in everyday language. It can explain code, suggest an example, or help investigate an error. It does not understand your project perfectly and can confidently suggest something incorrect, so treat its answer as a draft—not a command.</p>
              <h3>A useful first prompt</h3>
              <p>Tell the assistant who you are, what you want, what it should avoid changing, and how simple the explanation should be.</p>
              <CodeBlock label="Copy this idea, then make it your own">{`I'm new to coding. In this Edgley website, explain
src/pages/home.tsx in simple terms. Don't edit any files.
Give me one safe change to try and tell me how to check it.`}</CodeBlock>
              <div className="concept-strip">
                <div><strong>Ask for an explanation</strong><span>“What does this line do?”</span></div>
                <div><strong>Ask for a small change</strong><span>“Change only this heading.”</span></div>
                <div><strong>Ask how to check</strong><span>“How can I tell if it worked?”</span></div>
                <div><strong>Ask before a big edit</strong><span>“Explain your plan first. Don't edit yet.”</span></div>
              </div>
              <h3>Keep yourself and your project safe</h3>
              <ul>
                <li>Never paste passwords, private keys, secret codes, or real customer information into an AI chat or source file.</li>
                <li>Ask for one change at a time, then read the summary and inspect what changed.</li>
                <li>Use the Preview and type check to verify the result. “The AI said it works” is not a test.</li>
                <li>If you do not understand a change, ask the assistant to explain it before accepting it.</li>
              </ul>
            </section>
            <section id="toolkit">
              <div className="section-kicker">05 / Your developer toolkit</div>
              <h2>Tools have different jobs.</h2>
              <p>You do not need to master everything at once. Start with the editor, Preview, AI help, and a safe way to save your work. Add the other tools as a project needs them.</p>
              <div className="toolkit-grid">
                <article className="toolkit-card">
                  <div className="practice-label">Where you write</div>
                  <h3>Code editor</h3>
                  <p>The editor shows your project files and lets you change them. In this Replit project, start with <code>src/pages/home.tsx</code> for the business page.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">What visitors see</div>
                  <h3>Preview</h3>
                  <p>Preview opens the site as a visitor would see it. After saving a change, look here to catch layout or wording problems quickly.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Ask and understand</div>
                  <h3>AI assistant</h3>
                  <p>Ask it to explain a file, suggest one edit, or translate an error into plain language. Check its suggestions before keeping them.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Find browser errors</div>
                  <h3>Browser tools</h3>
                  <p>The browser’s Inspect or Developer Tools panel can show errors and help you see why a page looks different. The Console tab is a good place to start when the page breaks.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Run short commands</div>
                  <h3>Terminal</h3>
                  <p>A terminal is a text box for instructions to your computer. For this app, <code>pnpm --filter @workspace/edgley-detailing run typecheck</code> checks for many code and typing mistakes.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">A saved checkpoint</div>
                  <h3>Git</h3>
                  <p>Git records named snapshots of your project. If an edit goes wrong, those snapshots can help you understand or undo changes.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">A copy online</div>
                  <h3>GitHub</h3>
                  <p>GitHub can keep a copy of a Git project online and help people work together. It only protects your work after you connect a repository and send your changes to it.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Reliable instructions</div>
                  <h3>Documentation</h3>
                  <p>Official guides explain how tools work. Use them to confirm important details because AI answers can be outdated or mistaken.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Project ingredients</div>
                  <h3>Packages</h3>
                  <p>Packages are reusable code made by other developers. This project uses <code>pnpm</code> to manage them; <code>package.json</code> lists what the app uses. Ask before adding a new one.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Check different screens</div>
                  <h3>Mobile and accessibility checks</h3>
                  <p>Look at the site on a phone-size screen and try navigating with a keyboard. Clear text, readable contrast, and working buttons help more people use it.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Save information</div>
                  <h3>Supabase</h3>
                  <p>A database service for information a site needs to remember. This site does not use one yet; add it only when there is a real feature that needs saved data.</p>
                </article>
                <article className="toolkit-card">
                  <div className="practice-label">Share it with visitors</div>
                  <h3>Publish / hosting</h3>
                  <p>Publishing puts a finished version of the website on a public internet address. Check the page and its links before making it live.</p>
                </article>
              </div>
            </section>
            <section id="debugging">
              <div className="section-kicker">06 / When something breaks</div>
              <h2>Debug one clue at a time.</h2>
              <p>Debugging means finding the cause of a problem instead of guessing at fixes. Try this calm, repeatable order:</p>
              <ol>
                <li>Remember the last thing you changed. Can you make the problem happen again?</li>
                <li>Check the Preview. Did the page disappear, or is one thing simply styled incorrectly?</li>
                <li>Look at the first useful error in the browser Console or the type-check result.</li>
                <li>Ask AI to explain that error and suggest one small fix—do not ask it to rewrite everything.</li>
                <li>Change one thing, save, and check the Preview again. If it gets worse, undo that change.</li>
              </ol>
              <div className="notice"><strong>A good debugging habit:</strong> Save a Git checkpoint before a large change. That gives you a known-good version to return to.</div>
            </section>
            <section id="git">
              <div className="section-kicker">07 / Keeping a history</div>
              <h2>Git gives you a rewind button.</h2>
              <p>Git is the change-history tool; GitHub is a place to keep a copy of a Git project online. You can start with the Replit version-control tools instead of typing commands. If the project is connected to a GitHub repository, the same basic cycle can be done in a terminal:</p>
              <CodeBlock label="A simple Git workflow">{`git status
git add src/pages/home.tsx src/index.css
git commit -m "Refine service page copy"
git push`}</CodeBlock>
              <ol>
                <li><code>git status</code> shows which files changed.</li>
                <li><code>git add</code> selects the edits for the next snapshot.</li>
                <li><code>git commit</code> saves a named checkpoint locally.</li>
                <li><code>git push</code> sends committed changes to the configured remote repository, such as GitHub. It only works after a remote repository has been connected.</li>
              </ol>
              <p>A GitHub copy can help if an account or project becomes unavailable, but only if you connected it and pushed your changes. Before pushing, review the changes and keep credentials and private information out of the repository.</p>
            </section>
            <section id="supabase">
              <div className="section-kicker">08 / A possible next layer</div>
              <h2>What would Supabase add?</h2>
              <p>Supabase is a hosted platform that can provide a Postgres database, authentication, file storage, and APIs. A database becomes useful when the site needs to remember information—for example, storing real quote requests or letting the owner update services without editing code.</p>
              <h3>A simple data shape</h3>
              <p>Before connecting anything, decide what information to store. This is an example of a possible table—not a live table in this project:</p>
              <CodeBlock label="Example only / not connected">{`quote_requests
  id            unique request number
  customer_name visitor's name
  vehicle       vehicle details
  created_at    when the request arrived`}</CodeBlock>
              <p>Then plan who can add, read, and change each row. Supabase uses Row Level Security (RLS) policies for database access. A public website should not be able to read every customer's private request.</p>
              <div className="notice" data-testid="status-no-backend">
                <strong>Important: Supabase is not connected.</strong> This site currently has no database or backend. The current pages are static frontend content. There is no quote or contact submission that is delivered or saved remotely.
              </div>
              <p>Connecting a database is not just adding a URL. It requires a specific feature, a data model, secure access policies, and a clear plan for who can read or change information. Never put a private service-role key in browser code. The current site can stay simple until you want a feature that needs saved data.</p>
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
