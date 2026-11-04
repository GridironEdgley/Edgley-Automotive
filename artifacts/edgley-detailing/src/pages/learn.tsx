import { useState } from 'react';
import { Link } from 'wouter';
import {
  AccessControlLab,
  ApiRequestLab,
  DebuggingChooserLab,
  FileTraceLab,
  FrontendBackendLab,
  GitFlowLab,
  McpPermissionsLab,
  PromptBuilderLab,
  SqlPlaygroundLab,
  ToolPickerLab,
  VercelSettingsLab,
} from '@/components/learning-labs';

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
  const [phrase, setPhrase] = useState('Learn by doing.');
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
        <CodeBlock label="The idea behind the demo">{`const [phrase, setPhrase] = useState('Learn by doing.');

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
  const [title, setTitle] = useState('AI learning path');
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
          <p>Change a control and watch this card update. This sample is separate from the real AI Guide homepage.</p>
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

const glossaryTerms = [
  { term: 'Code', group: 'Basic building blocks', meaning: 'Instructions that tell a computer what to do.', example: 'Like a recipe: the computer follows the steps.' },
  { term: 'Programming language', group: 'Basic building blocks', meaning: 'A structured way to write instructions a computer can run.', example: 'Like choosing a language to give instructions clearly.' },
  { term: 'IDE / code editor', group: 'Basic building blocks', meaning: 'A place to read and write code. An IDE adds extra helpers such as error hints and run buttons.', example: 'Like a notebook that can also check your spelling and organize your tools.' },
  { term: 'UI (user interface)', group: 'What you see', meaning: 'The parts of an app you can see and use: text, buttons, menus, and forms.', example: 'Like the dashboard and controls in a car.' },
  { term: 'UX (user experience)', group: 'What you see', meaning: 'How easy, clear, and pleasant an app feels while you use it.', example: 'A button is UI; how easy it is to find and use is UX.' },
  { term: 'Front end', group: 'How a website works', meaning: 'The part of a website that runs in your browser and shows the page.', example: 'Like the shop floor that customers walk through.' },
  { term: 'Back end', group: 'How a website works', meaning: 'The behind-the-scenes code that handles requests, rules, and saved information.', example: 'Like the kitchen and storeroom behind a restaurant.' },
  { term: 'HTML and JSX', group: 'How a website works', meaning: 'HTML describes page structure. JSX is a React-friendly way to write that structure inside code.', example: 'Like arranging headings, paragraphs, and buttons in a page.' },
  { term: 'CSS', group: 'How a website works', meaning: 'Rules that control how a page looks, including colors, spacing, and layout.', example: 'Like paint, furniture, and signs in a room.' },
  { term: 'JavaScript', group: 'How a website works', meaning: 'A programming language that can make a page respond to clicks and changing information.', example: 'Like the switches that make the lights and doors work.' },
  { term: 'TypeScript', group: 'How a website works', meaning: 'JavaScript with extra labels that help catch some mistakes before the app runs.', example: 'Like putting labels on boxes so the right things go in them.' },
  { term: 'Component', group: 'Code pieces', meaning: 'A reusable piece of a page, such as a button, menu, or service card.', example: 'Like a building block you can use in more than one place.' },
  { term: 'Function', group: 'Code pieces', meaning: 'A named set of instructions that does a particular job.', example: 'Like a small machine: give it an input and it follows its steps.' },
  { term: 'Variable', group: 'Code pieces', meaning: 'A named place in code for holding a value, such as a name or number.', example: 'Like a labeled box whose contents can change.' },
  { term: 'State', group: 'Code pieces', meaning: 'Information a page is currently keeping track of, like the text typed into a form.', example: 'Like a whiteboard that remembers the current score while the game is open.' },
  { term: 'Props', group: 'Code pieces', meaning: 'Information passed into a component so it knows what to show.', example: 'Like handing a building block its color and label.' },
  { term: 'Event', group: 'Code pieces', meaning: 'Something that happens, such as a click, key press, or form submission.', example: 'Like ringing a doorbell; the app can respond to it.' },
  { term: 'Route', group: 'Code pieces', meaning: 'A rule that connects a web address, such as /learn, to a page.', example: 'Like a sign that points to the right room.' },
  { term: 'Bug, error, and debugging', group: 'Fixing and sharing', meaning: 'A bug is a problem in code. An error is a message about a problem. Debugging means finding and fixing the cause.', example: 'Like noticing a toy does not work, then checking its pieces one by one.' },
  { term: 'Package', group: 'Tools and services', meaning: 'Reusable code made by other developers that you can add to a project.', example: 'Like buying a ready-made part instead of building every part yourself.' },
  { term: 'Library and framework', group: 'Tools and services', meaning: 'A library is ready-made code you can call when you need it. A framework provides a broader structure for how an app is built.', example: 'A library is like borrowing a tool; a framework is like using a prepared building plan.' },
  { term: 'Runtime', group: 'Tools and services', meaning: 'The environment that runs your code, such as a browser running the website’s JavaScript.', example: 'Like the stage where a play can actually happen.' },
  { term: 'SDK (software development kit)', group: 'Tools and services', meaning: 'A set of tools and instructions that helps developers build with a particular platform or service.', example: 'Like a toolbox with the right tools and a manual for one repair job.' },
  { term: 'API (application programming interface)', group: 'Tools and services', meaning: 'A set of rules that lets one program ask another program for information or an action.', example: 'Like a menu: it shows what you can ask for and how to ask.' },
  { term: 'Endpoint and request', group: 'Tools and services', meaning: 'An endpoint is a specific API address. A request is the message a program sends to that address.', example: 'Like choosing a department and asking it a question.' },
  { term: 'HTTP status code', group: 'Tools and services', meaning: 'A number in a web reply that gives a quick clue about the result. For example, 200 usually means success and 404 means not found.', example: 'Like a short delivery update: delivered, or address not found.' },
  { term: 'JSON', group: 'Tools and services', meaning: 'A common text format for packaging labeled information so programs can exchange it.', example: 'Like a form with clear labels such as name and price.' },
  { term: 'Database and SQL', group: 'Tools and services', meaning: 'A database stores organized information. SQL is a language used to ask for or change information in many databases.', example: 'Like a filing cabinet and the instructions for finding a folder.' },
  { term: 'Client and server', group: 'Tools and services', meaning: 'The client (often your browser) asks for something; a server is a computer that receives the request and sends a reply.', example: 'Like a customer placing an order and a shop worker bringing it back.' },
  { term: 'Authentication and authorization', group: 'Tools and services', meaning: 'Authentication checks who you are. Authorization checks what you are allowed to do.', example: 'Authentication checks your ticket; authorization checks which rooms your ticket allows you to enter.' },
  { term: 'Environment variable', group: 'Tools and services', meaning: 'A setting supplied to an app from outside its code, often used for configuration. Private keys must be kept secret.', example: 'Like a setting on a control panel, rather than a rule written into the machine.' },
  { term: 'Git', group: 'Fixing and sharing', meaning: 'A tool that records snapshots of code changes so you can review or revisit them.', example: 'Like a save history for your project.' },
  { term: 'Repository (repo)', group: 'Fixing and sharing', meaning: 'A project folder tracked by Git, including its files and change history.', example: 'Like a project binder with the current pages and a record of edits.' },
  { term: 'Branch', group: 'Fixing and sharing', meaning: 'A separate line of work where you can try changes without changing the main version right away.', example: 'Like making a copy of a drawing to experiment on.' },
  { term: 'Commit', group: 'Fixing and sharing', meaning: 'A saved Git snapshot with a short note explaining what changed.', example: 'Like saving a named checkpoint in a game.' },
  { term: 'GitHub', group: 'Fixing and sharing', meaning: 'A website for storing Git repositories online and collaborating on code.', example: 'Like keeping your project binder online so you can reach it from another computer.' },
  { term: 'Root directory', group: 'Fixing and sharing', meaning: 'The top-level folder of a project; folders and files are organized inside it.', example: 'Like the front door of a building, before you choose a room.' },
  { term: 'Deploy and hosting', group: 'Fixing and sharing', meaning: 'Hosting keeps a website available online. Deploying puts a built version of your code there.', example: 'Like opening your finished shop for visitors.' },
];

function GlossarySection() {
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const visibleTerms = glossaryTerms.filter(({ term, group, meaning, example }) =>
    `${term} ${group} ${meaning} ${example}`.toLowerCase().includes(normalizedSearch),
  );

  return (
    <section id="coding-words">
      <div className="section-kicker">00 / Your coding dictionary</div>
      <h2>Big coding words, in simple language.</h2>
      <p>Use this as a friendly dictionary while you read the rest of the guide. You do not need to memorize everything. Search for a word when you meet it, then connect it to the example.</p>
      <label className="practice-input-label" htmlFor="glossary-search">Look up a word</label>
      <input
        id="glossary-search"
        className="practice-input glossary-search"
        type="search"
        placeholder="Try “SDK”, “state”, or “Git”"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-describedby="glossary-result-count"
      />
      <p id="glossary-result-count" className="glossary-count" aria-live="polite">
        Showing {visibleTerms.length} of {glossaryTerms.length} terms.
      </p>
      {visibleTerms.length > 0 ? (
        <div className="glossary-grid">
          {visibleTerms.map(({ term, group, meaning, example }) => (
            <article className="glossary-card" key={term}>
              <div className="practice-label">{group}</div>
              <h3>{term}</h3>
              <p>{meaning}</p>
              <p className="glossary-example"><strong>Think of it like:</strong> {example}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="notice" role="status">No matching word yet. Try a shorter search, or clear the search box.</div>
      )}
    </section>
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
            <a href="#coding-words" data-testid="link-learn-coding-words">Coding word dictionary</a>
            <a href="#react" data-testid="link-learn-react">React + TypeScript</a>
            <a href="#frontend-backend" data-testid="link-learn-frontend-backend">Front end + back end</a>
            <a href="#practice" data-testid="link-learn-practice">Try a small edit</a>
            <a href="#files" data-testid="link-learn-files">Finding the code</a>
            <a href="#reverse-engineering" data-testid="link-learn-reverse">Reverse engineering</a>
            <a href="#ai" data-testid="link-learn-ai">Grok &amp; AI helpers</a>
            <a href="#toolkit" data-testid="link-learn-toolkit">Developer tools</a>
            <a href="#apis-tools" data-testid="link-learn-apis">APIs, MCP &amp; Vercel</a>
            <a href="#debugging" data-testid="link-learn-debugging">Fixing problems</a>
            <a href="#git" data-testid="link-learn-git">Git + GitHub</a>
            <a href="#supabase" data-testid="link-learn-supabase">What Supabase adds</a>
            <a href="#sql-vercel" data-testid="link-learn-sql-vercel">SQL + Vercel troubleshooting</a>
          </nav>
          <article className="learn-content">
            <div className="notice lab-intro">
              <strong>Learn by trying:</strong> The interactive examples throughout this guide use temporary sample data in your browser. They do not run code you type, connect to real accounts, change the real site, or save information; they reset when you reload.
            </div>
            <GlossarySection />
            <section id="react">
              <div className="section-kicker">01 / The ingredients</div>
              <h2>React builds the pieces.</h2>
              <p>React lets us describe reusable pieces of a page—like a lesson card or the shared navigation—and compose them into screens. TypeScript adds labels for the kinds of values those pieces expect. In this real app, a small component receives a text label and code snippet:</p>
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
            <section id="frontend-backend">
              <div className="section-kicker">02 / How the pieces work together</div>
              <h2>Front end and back end have different jobs.</h2>
              <p>The <strong>front end</strong> is the part that runs in a visitor’s browser: the words, images, buttons, layout, and interactions. The <strong>back end</strong> runs on a server and handles work the browser should not do by itself, such as checking a request, protecting private information, and saving or retrieving data.</p>
              <div className="concept-strip">
                <div><strong>Front end</strong><span>Shows the page and responds to clicks.</span></div>
                <div><strong>Back end</strong><span>Applies rules and handles protected work.</span></div>
                <div><strong>Database</strong><span>Keeps information for later.</span></div>
                <div><strong>API</strong><span>Carries requests and replies between them.</span></div>
              </div>
              <h3>How they might work together</h3>
              <p>Imagine a future “Request a quote” form. The browser collects the visitor’s details, the front end sends them to a back-end API, the back end checks the information and saves it, then sends a reply for the page to show.</p>
              <CodeBlock label="A simplified example—not connected to this website">{`Visitor fills out a form
        ↓
Front end sends a request to the API
        ↓
Back end checks the request and saves it
        ↓
Database keeps the information
        ↓
Back end replies; front end shows a message`}</CodeBlock>
              <p>A real app should not trust the browser alone. Someone can inspect or change browser code, so the back end must check important rules itself. Passwords and private service keys belong on the server, never in front-end code that visitors can download.</p>
              <h3>What this means for AI Guide</h3>
              <p>AI Guide is currently a front-end learning site: its pages explain ideas and include small local practice examples, but they do not send information to a back end or save it in a database. You can change the page and preview it without setting up a server. If you later add accounts or saved progress, you would need a back end or a carefully configured service such as Supabase.</p>
              <div className="notice">
                <strong>Know the difference:</strong> A button that looks like a form action is not proof that information was delivered. A working submit flow needs a real destination, a successful server response, clear confirmation for the visitor, and safe handling of the saved data.
              </div>
              <FrontendBackendLab />
              <h3>A beginner’s way to explore</h3>
              <ol>
                <li>Change a heading or color and check the Preview. That is front-end work.</li>
                <li>Look at the browser’s Network tab while a page loads. It shows files and requests the browser receives.</li>
                <li>When a site sends data, inspect the request and response without sharing passwords or private customer details.</li>
                <li>Ask: “Where is this information checked? Where is it saved? What does the visitor see if it fails?” Those questions help you spot which back-end pieces a feature needs.</li>
              </ol>
            </section>
            <section id="practice">
              <div className="section-kicker">03 / Learn by trying</div>
              <h2>Make a change and watch what happens.</h2>
              <p>Learning sticks when you can experiment. These controls are safe to try: they change only this preview, and no customer information is sent or stored.</p>
              <HeadlinePractice />
            </section>
            <section id="files">
              <div className="section-kicker">04 / Finding your way</div>
              <h2>Know which file does what.</h2>
              <p>Open the project folder in a code editor such as VS Code. The useful starting points are:</p>
              <ul>
                <li><strong>src/pages/home.tsx</strong> — the AI Guide homepage and its copy.</li>
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
              <p>Keep lesson descriptions honest: say what a tool can and cannot do, and distinguish a practice example from a connected service.</p>
              <CodeBlock label="JSX example">{`<a className="guide-path" href="/learn#practice">
  <h3>Make something with code</h3>
  <p>Try a small coding experiment.</p>
</a>`}</CodeBlock>
              <p>The <code>className</code> connects this markup to a CSS rule. In JSX, the attribute is spelled <code>className</code> rather than HTML's <code>class</code>.</p>
              <div className="concept-strip">
                <div><strong>HTML / JSX</strong><span>What appears on the page</span></div>
                <div><strong>CSS</strong><span>How those parts look</span></div>
                <div><strong>TypeScript</strong><span>What values the code expects</span></div>
                <div><strong>React</strong><span>How pieces update and fit together</span></div>
              </div>
              <FileTraceLab />
            </section>
            <section id="reverse-engineering">
              <div className="section-kicker">05 / Learn by reverse engineering</div>
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
              <p>Change its words, spacing, or border color. Before each change, guess what you expect; then use “What changed?” to see the idea. Next, use the same observe-and-trace loop on a real lesson card on the home page.</p>
              <ReverseEngineerLab />
              <p>For the real page, start in <code>src/pages/home.tsx</code>. Find a visible phrase, check its <code>className</code>, then search for that class in <code>src/styles/ai-guide.css</code>. The Inspector’s Elements panel can help show the rendered element and its styles, but the source files are where you make lasting edits.</p>
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
              <div className="section-kicker">06 / Working with AI</div>
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
              <PromptBuilderLab />
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
              <div className="section-kicker">07 / Your developer toolkit</div>
              <h2>Tools have different jobs.</h2>
              <p>You do not need to master everything at once. Start with the editor, Preview, AI help, and a safe way to save your work. Add the other tools as a project needs them.</p>
              <div className="toolkit-grid">
                <article className="toolkit-card">
                  <div className="practice-label">Where you write</div>
                  <h3>Code editor</h3>
                  <p>The editor shows your project files and lets you change them. In this Replit project, start with <code>src/pages/home.tsx</code> for the AI Guide homepage.</p>
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
              <ToolPickerLab />
            </section>
            <section id="apis-tools">
              <div className="section-kicker">08 / Connecting and sharing software</div>
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
              <ApiRequestLab />
              <h3>MCP connects an AI assistant to tools</h3>
              <p><strong>MCP</strong> means Model Context Protocol. It is a shared way for AI apps to discover and use tools or read information from other programs. An MCP server is a program that offers those capabilities. For example, REA from the earlier section uses MCP to offer inspection tools to a compatible AI assistant.</p>
              <p>MCP is not the same thing as an API, though an MCP tool may use an API behind the scenes. Some MCP tools only read information; others can edit files, send messages, or change data. Before connecting one, check who made it, what it can access, and whether you can review actions before they happen.</p>
              <McpPermissionsLab />
              <h3>Vercel hosts and publishes websites</h3>
              <p>Vercel is a website hosting platform. When a project is connected to a Git provider, Vercel can build preview versions from code changes and publish the production version from a chosen branch. A preview is for checking; production is the version visitors see.</p>
              <div className="concept-strip">
                <div><strong>GitHub</strong><span>Keeps the project’s code and history.</span></div>
                <div><strong>Vercel</strong><span>Builds and hosts a website from that code.</span></div>
                <div><strong>Postman</strong><span>Tests an API without clicking through the site.</span></div>
                <div><strong>MCP</strong><span>Lets a compatible AI app use approved tools.</span></div>
              </div>
              <div className="notice">
                <strong>For AI Guide:</strong> These are learning examples, not connected services. The website does not send information to an API or connect to Postman or MCP, and it is still hosted in Replit. Connecting the Replit assistant to a Vercel account does not deploy this website to Vercel.
              </div>
              <p className="tool-links">
                Official guides: <a href="https://learning.postman.com/docs/reference/developer-resources/echo-api" target="_blank" rel="noreferrer">Postman Echo</a>, <a href="https://modelcontextprotocol.io/docs/learn/server-concepts" target="_blank" rel="noreferrer">MCP servers</a>, and <a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Vercel with Git</a>.
              </p>
            </section>
            <section id="debugging">
              <div className="section-kicker">09 / When something breaks</div>
              <h2>Find the error, then fix one clue at a time.</h2>
              <p>Debugging means finding the cause of a problem instead of guessing at fixes. First notice where the error appears; different tools report different kinds of problems.</p>
              <h3>Where to look for errors</h3>
              <ol>
                <li><strong>Browser Console:</strong> In the Preview, open the browser’s Developer Tools (often <kbd>F12</kbd> or right-click and choose <strong>Inspect</strong>), then select <strong>Console</strong>. Red messages often indicate JavaScript errors. Yellow messages are usually warnings; read them, but they may not be the cause of the problem.</li>
                <li><strong>Replit workflow logs:</strong> If the app will not start or the Preview is blank, open the running web workflow’s logs. The server or build error may appear there even when the browser Console is empty.</li>
                <li><strong>Type check:</strong> Run this in the project Shell to find many TypeScript mistakes and see the file and line involved:</li>
              </ol>
              <CodeBlock label="Run from the workspace root">{`pnpm --filter @workspace/edgley-detailing run typecheck`}</CodeBlock>
              <p>Read the first relevant error and note its file name and line number. Fixing that one can make later messages disappear. If the error began after an edit, try to reproduce it and remember exactly what changed.</p>
              <h3>Ask AI to help without handing it the whole project</h3>
              <p>Share the exact error text and only the small nearby piece of code needed to understand it. Ask for an explanation before asking for a fix. A good assistant should tell you what it thinks is wrong, why, and how to check its suggestion.</p>
              <CodeBlock label="A careful troubleshooting prompt">{`I'm learning. Please explain this error in simple words.

Error:
[paste the exact error message]

Relevant code:
[paste only the small code section around the file and line]

Tell me the likely cause, one small fix, and how to
verify it. Don't rewrite unrelated files. If you're unsure,
say what information is missing.`}</CodeBlock>
              <h3>Review and verify the proposed fix</h3>
              <ol>
                <li>Ask the AI to explain every change before applying it. If you use an AI coding tool, ask it to change only the relevant code and show you what it changed.</li>
                <li>Read the changed files or diff. Don’t accept a fix you can’t explain yet; ask questions or undo it.</li>
                <li>Run the type check again, then repeat the action that caused the problem and check the Preview.</li>
                <li>If the problem remains, give the AI the new error and what you already tried. Don’t pile on several guesses at once.</li>
              </ol>
              <div className="notice"><strong>Keep private information private:</strong> Before sharing an error or code with any AI service, remove passwords, API keys, access tokens, private customer details, and other secrets. Save a Git checkpoint before a larger change so you can return to a known-good version.</div>
              <DebuggingChooserLab />
            </section>
            <section id="git">
              <div className="section-kicker">10 / Keeping a history</div>
              <h2>Put this website on GitHub.</h2>
              <p><strong>Git</strong> keeps a history of code changes. A <strong>commit</strong> is a named snapshot in that history. <strong>GitHub</strong> stores a copy online, and <strong>push</strong> sends your committed snapshots there. Making a commit and pushing it are two separate steps.</p>
              <div className="notice">
                <strong>Important for this Replit project:</strong> Git is already set up on the <code>main</code> branch. It also has a Replit-managed destination named <code>gitsafe-backup</code>; keep it and add GitHub as a second destination. The repository is the whole shared workspace, so it includes the AI Guide website and shared project files—not only the <code>artifacts/edgley-detailing</code> folder.
              </div>
              <div className="notice">
                <strong>Prefer to sync only when you choose?</strong> In Replit, open <strong>Tools → Git</strong> and turn the <strong>Auto-sync</strong> toggle off. You can still make commits and run <code>git push github main</code> whenever you decide the changes are ready. Adding a GitHub destination by itself does not upload your code.
              </div>
              <h3>One-time setup</h3>
              <ol>
                <li>
                  On GitHub, create a <strong>new, empty, private repository</strong>. A name like <code>edgley-detailing-website</code> works. Leave the README, license, and GitHub-provided <code>.gitignore</code> unchecked: this Replit project already has its own files and history. See GitHub’s <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noreferrer">new repository guide</a>.
                </li>
                <li>
                  Back in Replit, open <strong>Tools → Git</strong>. Review the changed files, stage only the files you intend to save, and make a commit with a clear message, such as <code>Add GitHub learning guide</code>. You can use this screen to review and commit; the command below makes the push destination explicit.
                </li>
                <li>
                  Open Replit’s Shell at the project root. Add the GitHub repository as a second destination. Replace <code>YOUR-USERNAME</code> with your GitHub username; if you chose a different repository name, change that part of the URL too:
                  <CodeBlock label="Add GitHub without replacing Replit's destination">{`git remote add github https://github.com/YOUR-USERNAME/edgley-detailing-website.git
git remote`}</CodeBlock>
                  The second command lists the remote names. You should see both <code>gitsafe-backup</code> and <code>github</code>.
                </li>
                <li>
                  Send the committed project history to GitHub:
                  <CodeBlock label="First push to GitHub">{`git push github main`}</CodeBlock>
                  The first push may take a little while. When it finishes, refresh the GitHub repository page and check that you can see the project files.
                </li>
              </ol>
              <h3>Each time you make more changes</h3>
              <ol>
                <li>Edit a small piece of code and check the Replit preview.</li>
                <li>In <strong>Tools → Git</strong>, review the files, stage the intended changes, and commit them with a short description.</li>
                <li>In Shell, run <code>git push github main</code>. This sends the new commit to GitHub; committing alone does not upload it.</li>
              </ol>
              <div className="notice">
                <strong>Protect your work:</strong> A private repository is a good starting choice. Review the files before committing, and never add passwords, API keys, access tokens, or private connection details. If Replit asks to remove or replace the existing remote, cancel and get help instead. If Git reports a rejected push or a conflict, do not use “force push”—stop and ask what the message means.
              </div>
              <GitFlowLab />
              <p>If the command says <code>remote github already exists</code>, don’t add it again. If it asks you to sign in, use Replit’s GitHub authorization flow; never paste a password or access token into chat or save one in your code. For Replit’s visual Git tools, see the official <a href="https://docs.replit.com/features/workspace-tools/git-interface" target="_blank" rel="noreferrer">Git pane guide</a>.</p>
            </section>
            <section id="supabase">
              <div className="section-kicker">11 / A possible next layer</div>
              <h2>What would Supabase add?</h2>
              <p>Supabase is a hosted platform that can provide a Postgres database, authentication, file storage, and APIs. A database becomes useful when the site needs to remember information—for example, saving a learner’s progress or letting the owner update lessons without editing code.</p>
              <h3>A simple data shape</h3>
              <p>Before connecting anything, decide what information to store. This is an example of a possible table—not a live table in this project:</p>
              <CodeBlock label="Example only / not connected">{`practice_notes
  id            unique note number
  topic         concept being practiced
  note          learner's own observation
  created_at    when the note was added`}</CodeBlock>
              <p>Then plan who can add, read, and change each row. Supabase uses Row Level Security (RLS) policies for database access. A public website should not be able to read every learner’s private note.</p>
              <AccessControlLab />
              <div className="notice" data-testid="status-no-backend">
                <strong>Important: Supabase is not connected.</strong> This site currently has no database or backend. The current pages are static frontend content. There is no learning progress or other user information saved remotely.
              </div>
              <p>Connecting a database is not just adding a URL. It requires a specific feature, a data model, secure access policies, and a clear plan for who can read or change information. Never put a private service-role key in browser code. The current site can stay simple until you want a feature that needs saved data.</p>
            </section>
            <section id="sql-vercel">
              <div className="section-kicker">12 / Working with data and deployments</div>
              <h2>SQL reads and changes database information.</h2>
              <p><strong>SQL</strong> (usually said “sequel”) is a language for asking a database to find, add, change, or remove information. Think of a table like a spreadsheet: columns describe what each value means, and each row is one saved record.</p>
              <CodeBlock label="Example only: a pretend tasks table">{`tasks
  id | title      | status
   1 | Learn SQL  | open
   2 | Test a page| done`}</CodeBlock>
              <p>These examples use a pretend <code>tasks</code> table. They do not run on this website or change any real data.</p>
              <h3>Four SQL actions to recognize</h3>
              <div className="concept-strip">
                <div><strong>SELECT</strong><span>Find and read matching rows.</span></div>
                <div><strong>INSERT</strong><span>Add a new row.</span></div>
                <div><strong>UPDATE</strong><span>Change existing rows.</span></div>
                <div><strong>DELETE</strong><span>Remove rows.</span></div>
              </div>
              <CodeBlock label="Practice examples only—not connected">{`-- Read open tasks
SELECT title, status
FROM tasks
WHERE status = 'open';

-- Change one task (id 1)
UPDATE tasks
SET status = 'done'
WHERE id = 1;`}</CodeBlock>
              <p><code>WHERE</code> narrows an action to matching rows. Without it, an <code>UPDATE</code> could change every row, and a <code>DELETE</code> could remove every row. Start by learning <code>SELECT</code>; only practice changes in a throwaway database, never on important or live data.</p>
              <SqlPlaygroundLab />
              <p>In a real app, the front end should not get broad database access. A secure back end checks who is making a request and what they are allowed to do. Use parameterized queries rather than joining user-entered text into SQL, which helps prevent SQL injection. Never paste private database passwords or service keys into browser code or AI chats.</p>
              <h3>Vercel helps you find deployment problems</h3>
              <p>Vercel can build and host a website. Its build logs show problems that stop a new version from building; runtime logs show errors from server-side functions. Vercel does not automatically repair your source code—you use the error clues to make and test a code change.</p>
              <h3>What “Root Directory” means in Vercel</h3>
              <p>The Root Directory is the folder where Vercel starts looking for project files and running its build. It is not the folder where the finished website goes—that is the <strong>Output Directory</strong>. For this workspace, the repository root contains <code>pnpm-workspace.yaml</code> and shared packages, while the AI Guide app is nested under <code>artifacts/edgley-detailing</code>.</p>
              <CodeBlock label="Simplified folder map">{`Repository root
├── pnpm-workspace.yaml
├── artifacts/
│   └── edgley-detailing/   ← this website
└── lib/
    └── api-client-react/   ← shared workspace package`}</CodeBlock>
              <p><strong>For this project, leave Root Directory at the repository root (the default).</strong> The app imports a shared workspace package from the <code>lib</code> folder. Vercel warns that setting an app’s root to a subfolder prevents it from accessing files outside that folder, so pointing Root Directory directly at <code>artifacts/edgley-detailing</code> could make workspace dependencies unavailable.</p>
              <ol>
                <li>In Vercel, open the project’s <strong>Settings → Build and Deployment</strong>.</li>
                <li>Keep <strong>Root Directory</strong> set to the repository root. You can keep the setting empty/default when the repository root is selected.</li>
                <li>Set the build command to build only this website from the workspace root:</li>
              </ol>
              <CodeBlock label="Vercel Build Command">{`PORT=23599 BASE_PATH=/ pnpm --filter @workspace/edgley-detailing run build`}</CodeBlock>
              <p>Then set <strong>Output Directory</strong> to <code>artifacts/edgley-detailing/dist/public</code>. In short: Root Directory tells Vercel where to start; Build Command tells it what to run; Output Directory tells it which finished files to publish. These settings are instructions for a future Vercel setup—this site is still hosted in Replit.</p>
              <VercelSettingsLab />
              <ol>
                <li>In Vercel, open the project and choose <strong>Deployments</strong>. Select the deployment that failed, then open its <strong>Build Logs</strong>.</li>
                <li>Look for the first clear error, plus the file name, line number, or failed command. A later error may only be a result of the first one.</li>
                <li>For this Vite app, you can also run its build check from the workspace Shell:</li>
              </ol>
              <CodeBlock label="Run from the workspace root">{`pnpm --filter @workspace/edgley-detailing run build`}</CodeBlock>
              <ol start={4}>
                <li>Fix the source file—not generated build output. Review the change, run the build again, and check the site.</li>
                <li>If Vercel is connected to GitHub, push the fix to a branch and inspect its Preview Deployment before merging or sending it to the live site.</li>
              </ol>
              <p>Build logs and browser errors are different clues. If the deployment succeeds but a button or page fails in a visitor’s browser, open that page’s Developer Tools and check the <strong>Console</strong>. Server-side function problems appear in Vercel’s runtime logs; a static page’s browser error may not appear there.</p>
              <CodeBlock label="Ask AI to explain a Vercel build error">{`Explain this build error in beginner-friendly language.
Point out the first error, the file or command involved,
and one small source-code fix to try. Don't change
unrelated files. Then tell me how to test the fix locally.`}</CodeBlock>
              <div className="notice">
                <strong>For AI Guide:</strong> It is currently hosted in Replit and is not connected to a Vercel project or database. You will not see this site’s real deployment logs in Vercel until you set up a project for it. Before sharing a log with AI, remove passwords, access tokens, private URLs, and personal information.
              </div>
              <p className="tool-links">
                Official references: <a href="https://vercel.com/docs/deployments/configure-a-build#root-directory" target="_blank" rel="noreferrer">Vercel Root Directory</a>, <a href="https://vercel.com/docs/deployments/troubleshoot-a-build" target="_blank" rel="noreferrer">Vercel build troubleshooting</a>, <a href="https://vercel.com/docs/observability/runtime-logs" target="_blank" rel="noreferrer">Vercel runtime logs</a>, and <a href="https://supabase.com/docs/guides/database/overview" target="_blank" rel="noreferrer">Supabase database basics</a>.
              </p>
            </section>
          </article>
        </div>
        <div className="learn-end">
          <div><div className="eyebrow">Back to the AI Guide</div><p>Return to the learning home page.</p></div>
          <Link href="/" className="button-yellow" data-testid="link-return-home">Return to the AI Guide <span aria-hidden="true">→</span></Link>
        </div>
      </main>
    </>
  );
}
