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
  const [phrase, setPhrase] = useState('Work Hard.');
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

function ReverseEngineerLab() {
  const [title, setTitle] = useState('Interior detailing');
  const [spacing, setSpacing] = useState(20);
  const [accent, setAccent] = useState<'yellow' | 'cream' | 'mint'>('yellow');
  const [showExplanation, setShowExplanation] = useState(false);
  const accents = {
    yellow: '#f5d21b',
    cream: '#d8d3c5',
    mint: '#70c8b2',
  };

  return (
    <>
      <div className="reverse-lab">
        <div className="reverse-controls">
          <div className="practice-label">Change one part at a time</div>
          <label className="practice-input-label" htmlFor="reverse-title">Card title</label>
          <input
            id="reverse-title"
            className="practice-input"
            value={title}
            maxLength={50}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label className="practice-input-label" htmlFor="reverse-spacing">Space inside the card: {spacing}px</label>
          <input
            id="reverse-spacing"
            className="reverse-range"
            type="range"
            min="12"
            max="36"
            step="4"
            value={spacing}
            onChange={(event) => setSpacing(Number(event.target.value))}
          />
          <label className="practice-input-label" htmlFor="reverse-accent">Border color</label>
          <select
            id="reverse-accent"
            className="practice-input"
            value={accent}
            onChange={(event) => setAccent(event.target.value as keyof typeof accents)}
          >
            <option value="yellow">Yellow</option>
            <option value="cream">Cream</option>
            <option value="mint">Mint</option>
          </select>
          <button
            className="reverse-toggle"
            type="button"
            onClick={() => setShowExplanation((visible) => !visible)}
            aria-expanded={showExplanation}
            data-testid="button-reverse-explanation"
          >
            {showExplanation ? 'Hide the explanation' : 'What changed?'}
          </button>
        </div>
        <article
          className="reverse-preview"
          style={{ padding: `${spacing}px`, borderTopColor: accents[accent] }}
          aria-live="polite"
        >
          <div className="practice-label">Live sample</div>
          <h3>{title || 'Your card title'}</h3>
          <p>Change a control and watch this card update. This sample is separate from the real business page.</p>
        </article>
      </div>
      {showExplanation && (
        <div className="notice reverse-explanation">
          <strong>You changed three kinds of information:</strong> the title is text, the padding controls space, and the accent is a color. In a real website, those values come from a component and its CSS. The visible result is a clue about which part of the code to look for.
        </div>
      )}
      <CodeBlock label="Simplified example, not the exact site source">{`<article style={{
  padding: "${spacing}px",
  borderTopColor: "${accents[accent]}"
}}>
  <h3>${title || 'Your card title'}</h3>
</article>`}</CodeBlock>
    </>
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
            <a href="#reverse-engineering" data-testid="link-learn-reverse">Reverse engineering</a>
            <a href="#ai" data-testid="link-learn-ai">Grok &amp; AI helpers</a>
            <a href="#toolkit" data-testid="link-learn-toolkit">Developer tools</a>
            <a href="#apis-tools" data-testid="link-learn-apis">APIs, MCP &amp; Vercel</a>
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
            <section id="reverse-engineering">
              <div className="section-kicker">04 / Learn by reverse engineering</div>
              <h2>Work backward from what you can see.</h2>
              <p>Reverse engineering means starting with an object or program you can observe, then tracing clues to understand how it works. For web development, that can mean noticing what a button does, finding the matching component, and testing which style controls its appearance.</p>
              <p>Use this skill on your own projects, or on code and products you have permission to study. Don’t use it to break into accounts, get around payments or access controls, or take private information from someone else’s system.</p>
              <h3>REA is a toolset that can help</h3>
              <p><strong>REA</strong> stands for <em>Reverse Engineer Anything</em>. It is a separate, open-source toolset that can connect an AI coding assistant to software-inspection tools. REA is not the AI itself, and it is not a magic “understand anything” button.</p>
              <div className="concept-strip">
                <div><strong>1. You choose</strong><span>Pick one behavior in a program you’re allowed to study.</span></div>
                <div><strong>2. The agent asks</strong><span>MCP is the connector that lets the assistant call REA tools.</span></div>
                <div><strong>3. REA inspects</strong><span>It returns evidence from the supported program or its behavior.</span></div>
                <div><strong>4. You verify</strong><span>The agent explains the evidence; you check it with a test.</span></div>
              </div>
              <p>What REA can inspect depends on the kind of program and the tools set up for it. Its guides cover web pages and JavaScript apps as well as more advanced software formats. Start with your own small web project; the advanced formats can wait.</p>
              <h3>How to use REA well</h3>
              <ol>
                <li>Ask one specific question, such as “How does this button export a file?” Avoid asking it to explain an entire app at once.</li>
                <li>Tell the assistant which authorized project to inspect and ask it to show the evidence or file locations behind its answer.</li>
                <li>Ask it to separate what it actually found from what it is guessing.</li>
                <li>Start with read-only investigation. Review any plan before allowing an assistant to change files or run actions.</li>
                <li>Make a prediction, test it on a safe copy or demo, and compare the result with the explanation.</li>
              </ol>
              <CodeBlock label="A beginner-friendly REA prompt">{`Use REA on my own demo project. Explain how the
service-card title is displayed. Show the evidence or
files you used, separate facts from guesses, and do not
change anything. Suggest one small test I can try.`}</CodeBlock>
              <div className="notice">
                <strong>Privacy and setup:</strong> REA analyzes a target on your computer, but its findings are sent to the connected AI assistant. Check that assistant’s privacy rules, and never include passwords, private keys, or customer data. REA is not installed or connected to this Replit project.
              </div>
              <p className="rea-links">
                Learn more from the <a href="https://morluto.github.io/rea/" target="_blank" rel="noreferrer">REA project guide</a>, its <a href="https://morluto.github.io/rea/get-started/" target="_blank" rel="noreferrer">setup guide</a>, and the <a href="https://github.com/morluto/rea" target="_blank" rel="noreferrer">source repository</a>.
              </p>
              <h3>A repeatable learning loop</h3>
              <ol>
                <li><strong>Observe:</strong> What do you see? What exact action causes it?</li>
                <li><strong>Predict:</strong> Which word, button, component, or style might control it?</li>
                <li><strong>Trace:</strong> Search the project for visible text, then follow the component’s <code>className</code> to its CSS.</li>
                <li><strong>Change one thing:</strong> Make a small edit and predict what should happen.</li>
                <li><strong>Compare:</strong> Check the Preview, including a phone-size screen. Undo the edit if it did something else.</li>
                <li><strong>Explain:</strong> Say what you changed and why the page changed. Ask an AI helper to check your explanation, not just do the work for you.</li>
              </ol>
              <h3>Try it with this sample card</h3>
              <p>Change its words, spacing, or border color. Before each change, guess what you expect; then use “What changed?” to see the idea. Next, use the same observe-and-trace loop on a real service tile on the home page.</p>
              <ReverseEngineerLab />
              <p>For the real page, start in <code>src/pages/home.tsx</code>. Find a visible phrase, check its <code>className</code>, then search for that class in <code>src/index.css</code>. The Inspector’s Elements panel can help show the rendered element and its styles, but the source files are where you make lasting edits.</p>
              <h3 id="reverse-github">Use GitHub to trace a project</h3>
              <p>GitHub can help you reverse engineer a codebase by showing its files and how they changed over time. Only study repositories you own, have permission to use, or are allowed to inspect under their license.</p>
              <ol>
                <li>Open the repository’s file list. Read <code>README</code> first; it often explains what the project does.</li>
                <li>Search for a phrase you can see on the page. Open the matching file to find the component that displays it.</li>
                <li>Follow clues such as imports and <code>className</code> values to find related components or styles.</li>
                <li>Open that file’s change history. Pick a change and read the “diff”—a view that marks added and removed lines—so you can see what changed.</li>
                <li>Compare the code with the live Preview, then write one sentence about how the change affects what you see.</li>
              </ol>
              <div className="notice">
                <strong>For this project:</strong> A GitHub connection has not been confirmed. You can practice the same file-tracing steps in Replit’s file browser and version history. A GitHub backup only exists after a repository is connected and changes are pushed to it.
              </div>
            </section>
            <section id="ai">
              <div className="section-kicker">05 / Working with AI</div>
              <h2>Use Grok and other AI helpers as tutors.</h2>
              <p>An AI assistant is a tool you can talk to in everyday language. It can explain code, suggest an example, or help investigate an error. It does not understand your project perfectly and can confidently suggest something incorrect, so treat its answer as a draft—not a command.</p>
              <p>Grok, made by xAI, is one AI assistant. You can ask it to explain a small code example or make you a practice question, just as you can with other AI helpers. Replit Agent can work with files in this project when you ask it to; a separate chatbot usually only sees what you share with it. Don’t assume any chatbot can see your workspace.</p>
              <h3>A useful first prompt</h3>
              <p>Tell the assistant who you are, what you want, what it should avoid changing, and how simple the explanation should be.</p>
              <CodeBlock label="Try this with Grok or another tutor">{`I'm learning by doing. Explain this code in simple
words, but don't change it. Ask me to predict what will
happen if I change the card's padding from 20px to 24px.
Then give me one safe exercise and a way to undo it.`}</CodeBlock>
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
                <li>For a bot that can take actions, ask what it plans to do and review before it runs commands, publishes, or sends messages.</li>
              </ul>
            </section>
            <section id="toolkit">
              <div className="section-kicker">06 / Your developer toolkit</div>
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
            <section id="apis-tools">
              <div className="section-kicker">07 / Connecting and sharing software</div>
              <h2>APIs, MCP, Postman, and Vercel.</h2>
              <p>These names describe different jobs. An API lets programs exchange information. MCP lets an AI app connect to tools. Postman helps you test an API. Vercel can host a website and publish updates.</p>
              <h3>An API is a conversation between programs</h3>
              <p>An API is a set of rules for asking another program for information or an action. The program sends a request to an address called an endpoint. The response often includes a status number and data in a format called JSON.</p>
              <div className="concept-strip">
                <div><strong>GET</strong><span>Ask to read information.</span></div>
                <div><strong>POST</strong><span>Ask to send or create information.</span></div>
                <div><strong>Status</strong><span>A number that summarizes the result.</span></div>
                <div><strong>JSON</strong><span>A structured way to package data.</span></div>
              </div>
              <h3>Try a read-only request in Postman</h3>
              <p>Postman is a tool for sending API requests and looking at the replies. The Postman Echo service safely sends back details of your test request, so you can learn without connecting to a real customer database.</p>
              <ol>
                <li>Open Postman and create a new HTTP request.</li>
                <li>Choose <code>GET</code>, then enter this address:</li>
              </ol>
              <CodeBlock label="Postman Echo practice">{`https://postman-echo.com/get?lesson=first-api`}</CodeBlock>
              <ol start={3}>
                <li>Press <strong>Send</strong> and look at the response. Find the <code>lesson</code> value in the returned JSON.</li>
                <li>Change <code>first-api</code> to another harmless word, send again, and predict what value will come back.</li>
              </ol>
              <p>This is a read-only practice request. Don’t put passwords, API keys, or personal information in a URL or test request. Postman collections can save requests; review them before sharing so private values aren’t included.</p>
              <h3>MCP connects an AI assistant to tools</h3>
              <p><strong>MCP</strong> means Model Context Protocol. It is a shared way for AI apps to discover and use tools or read information from other programs. An MCP server is a program that offers those capabilities. For example, REA from the earlier section uses MCP to offer inspection tools to a compatible AI assistant.</p>
              <p>MCP is not the same thing as an API, though an MCP tool may use an API behind the scenes. Some MCP tools only read information; others can edit files, send messages, or change data. Before connecting one, check who made it, what it can access, and whether you can review actions before they happen.</p>
              <h3>Vercel hosts and publishes websites</h3>
              <p>Vercel is a website hosting platform. When a project is connected to a Git provider, Vercel can build preview versions from code changes and publish the production version from a chosen branch. A preview is for checking; production is the version visitors see.</p>
              <div className="concept-strip">
                <div><strong>GitHub</strong><span>Keeps the project’s code and history.</span></div>
                <div><strong>Vercel</strong><span>Builds and hosts a website from that code.</span></div>
                <div><strong>Postman</strong><span>Tests an API without clicking through the site.</span></div>
                <div><strong>MCP</strong><span>Lets a compatible AI app use approved tools.</span></div>
              </div>
              <div className="notice">
                <strong>For this Edgley site:</strong> These are learning examples, not connected services. The site does not currently send quote requests to an API, and it is not configured with Postman, MCP, or Vercel. Its current preview and hosting remain in Replit.
              </div>
              <p className="tool-links">
                Official guides: <a href="https://learning.postman.com/docs/reference/developer-resources/echo-api" target="_blank" rel="noreferrer">Postman Echo</a>, <a href="https://modelcontextprotocol.io/docs/learn/server-concepts" target="_blank" rel="noreferrer">MCP servers</a>, and <a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Vercel with Git</a>.
              </p>
            </section>
            <section id="debugging">
              <div className="section-kicker">08 / When something breaks</div>
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
              <div className="section-kicker">09 / Keeping a history</div>
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
              <div className="section-kicker">10 / A possible next layer</div>
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
