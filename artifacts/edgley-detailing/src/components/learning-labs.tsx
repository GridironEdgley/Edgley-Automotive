import { useState, type ReactNode } from 'react';

function LabPanel({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="learning-lab">
      <div className="learning-lab-label">{label} · local practice</div>
      <h3 className="learning-lab-title">{title}</h3>
      {children}
    </div>
  );
}

function LabCode({ children }: { children: string }) {
  return <pre className="lab-code"><code>{children}</code></pre>;
}

function LabMessage({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning';
}) {
  return <div className={`lab-message lab-message-${tone}`} role="status" aria-live="polite">{children}</div>;
}

export function FrontendBackendLab() {
  const [name, setName] = useState('Jordan');
  const [vehicle, setVehicle] = useState('2018 sedan');
  const [result, setResult] = useState('');
  const valid = name.trim().length > 0 && vehicle.trim().length > 0;

  function simulateSubmit() {
    setResult(valid
      ? `The front end prepared this sample request: ${JSON.stringify({ name: name.trim(), vehicle: vehicle.trim() })}. A pretend server checked it and replied “Request received.” Nothing was sent or saved.`
      : 'The front end caught a missing field before sending. A real back end must also validate the request.');
  }

  return (
    <LabPanel label="Try it / front end + back end" title="Simulate a quote form">
      <p>Edit the fields and submit. This demo shows front-end checks and a pretend server reply; it does not contact a real business.</p>
      <div className="lab-fields">
        <label className="lab-field">Name
          <input className="practice-input" value={name} onChange={(event) => { setName(event.target.value); setResult(''); }} />
        </label>
        <label className="lab-field">Vehicle
          <input className="practice-input" value={vehicle} onChange={(event) => { setVehicle(event.target.value); setResult(''); }} />
        </label>
      </div>
      <div className="lab-actions">
        <button className="lab-button" type="button" onClick={simulateSubmit}>Simulate submit</button>
        <button className="lab-button lab-button-quiet" type="button" onClick={() => { setName(''); setVehicle(''); setResult(''); }}>Clear fields</button>
      </div>
      {result && <LabMessage tone={valid ? 'success' : 'warning'}>{result}</LabMessage>}
      <p className="lab-footnote">Try clearing one field, then submit again. The browser catches the blank value, but a real server must check it too.</p>
    </LabPanel>
  );
}

export function FileTraceLab() {
  const [file, setFile] = useState('');
  const correct = file === 'src/index.css';

  return (
    <LabPanel label="Try it / trace the code" title="Which file would you inspect?">
      <p>You notice that the site’s background color is wrong. Pick the first file you would inspect.</p>
      <label className="lab-field">Choose a file
        <select className="practice-input" value={file} onChange={(event) => setFile(event.target.value)}>
          <option value="">Choose one…</option>
          <option value="src/pages/home.tsx">src/pages/home.tsx</option>
          <option value="src/index.css">src/index.css</option>
          <option value="src/App.tsx">src/App.tsx</option>
        </select>
      </label>
      {file && (
        <LabMessage tone={correct ? 'success' : 'warning'}>
          {correct
            ? 'Good clue: src/index.css contains the site colors and styles. If the color belongs to one specific component, also check that component’s className.'
            : `${file} can affect other parts of the app, but shared colors and styling are defined in src/index.css.`}
        </LabMessage>
      )}
    </LabPanel>
  );
}

export function PromptBuilderLab() {
  const [goal, setGoal] = useState('Explain why this button is not responding.');
  const [boundary, setBoundary] = useState('Do not edit files. Explain one safe test first.');

  return (
    <LabPanel label="Try it / AI tutor" title="Build a clear learning prompt">
      <p>Change the goal or boundary and watch the prompt update. This does not send anything to an AI service.</p>
      <div className="lab-fields">
        <label className="lab-field">What do you want to learn?
          <textarea className="practice-input lab-textarea" value={goal} onChange={(event) => setGoal(event.target.value)} />
        </label>
        <label className="lab-field">What should the AI avoid?
          <textarea className="practice-input lab-textarea" value={boundary} onChange={(event) => setBoundary(event.target.value)} />
        </label>
      </div>
      <LabCode>{`I'm learning by doing. ${goal.trim() || '[describe your learning goal]'}
${boundary.trim() || '[add a safety boundary]'}
Explain your reasoning in simple words and tell me how
to verify the result.`}</LabCode>
    </LabPanel>
  );
}

export function ToolPickerLab() {
  const [scenario, setScenario] = useState('style');
  const [tool, setTool] = useState('');
  const answers: Record<string, string> = {
    style: 'Browser Developer Tools',
    types: 'Terminal type check',
    history: 'Git',
    api: 'Postman',
  };
  const prompts: Record<string, string> = {
    style: 'Find which CSS rule controls a button’s color.',
    types: 'Check a TypeScript error and its file/line.',
    history: 'Compare your edit with an earlier version.',
    api: 'Send a test request and inspect the response.',
  };

  return (
    <LabPanel label="Try it / pick a tool" title="Match the tool to the job">
      <p>Choose a task, then pick a tool you think can help.</p>
      <div className="lab-fields">
        <label className="lab-field">Task
          <select className="practice-input" value={scenario} onChange={(event) => { setScenario(event.target.value); setTool(''); }}>
            {Object.entries(prompts).map(([key, prompt]) => <option key={key} value={key}>{prompt}</option>)}
          </select>
        </label>
        <label className="lab-field">Your tool choice
          <select className="practice-input" value={tool} onChange={(event) => setTool(event.target.value)}>
            <option value="">Choose a tool…</option>
            {Object.values(answers).map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>
      {tool && <LabMessage tone={tool === answers[scenario] ? 'success' : 'warning'}>
        {tool === answers[scenario]
          ? `Right: ${tool} is a useful place to start.`
          : `For this task, try ${answers[scenario]}. ${tool} is useful for a different kind of job.`}
      </LabMessage>}
    </LabPanel>
  );
}

export function ApiRequestLab() {
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [lesson, setLesson] = useState('first-api');
  const [sent, setSent] = useState(false);
  const requestData = { lesson: lesson.trim() || 'your-value' };
  const sampleResponse = method === 'GET'
    ? { received: requestData, status: 'sample response' }
    : { created: true, savedData: requestData, status: 'sample response' };

  return (
    <LabPanel label="Try it / APIs" title="Change an API request">
      <p>Choose a method and edit the value. The preview below is simulated locally; no network request is sent.</p>
      <div className="lab-fields">
        <label className="lab-field">Method
          <select className="practice-input" value={method} onChange={(event) => { setMethod(event.target.value as 'GET' | 'POST'); setSent(false); }}>
            <option value="GET">GET · ask to read</option>
            <option value="POST">POST · ask to send</option>
          </select>
        </label>
        <label className="lab-field">Practice value
          <input className="practice-input" value={lesson} maxLength={40} onChange={(event) => { setLesson(event.target.value); setSent(false); }} />
        </label>
      </div>
      <LabCode>{method === 'GET'
        ? `GET /practice?lesson=${encodeURIComponent(requestData.lesson)}`
        : `POST /practice\nContent-Type: application/json\n\n${JSON.stringify(requestData, null, 2)}`}</LabCode>
      <div className="lab-actions">
        <button className="lab-button" type="button" onClick={() => setSent(true)}>Show sample response</button>
      </div>
      {sent && <LabCode>{`200 OK\n${JSON.stringify(sampleResponse, null, 2)}`}</LabCode>}
      <p className="lab-footnote">This teaches the shape of a request and response; use the Postman Echo steps above to make a real safe practice request in Postman.</p>
    </LabPanel>
  );
}

export function McpPermissionsLab() {
  const [readFiles, setReadFiles] = useState(true);
  const [editFiles, setEditFiles] = useState(false);

  return (
    <LabPanel label="Try it / MCP permissions" title="Choose what an AI tool can do">
      <p>MCP can make tools available to an AI assistant. Try changing these practice permissions and notice how access expands.</p>
      <div className="lab-checks">
        <label><input type="checkbox" checked={readFiles} onChange={(event) => setReadFiles(event.target.checked)} /> Read project files</label>
        <label><input type="checkbox" checked={editFiles} onChange={(event) => setEditFiles(event.target.checked)} /> Edit project files</label>
      </div>
      <LabMessage tone={editFiles ? 'warning' : 'neutral'}>
        {editFiles
          ? 'This pretend assistant can now change files. Review its plan and every edit before accepting anything.'
          : readFiles
            ? 'Read-only access is a safer way to investigate first. The assistant can inspect, but cannot edit in this example.'
            : 'No project access is selected, so the assistant would need you to provide the relevant information.'}
      </LabMessage>
      <p className="lab-footnote">These checkboxes do not connect or grant real permissions.</p>
    </LabPanel>
  );
}

export function DebuggingChooserLab() {
  const [problem, setProblem] = useState('startup');
  const [guess, setGuess] = useState('');
  const expected: Record<string, string> = {
    startup: 'Replit workflow logs',
    browser: 'Browser Console',
    types: 'Type check',
    deploy: 'Vercel Build Logs',
  };
  const problems: Record<string, string> = {
    startup: 'The app will not start.',
    browser: 'A button breaks after the page loads.',
    types: 'The editor marks a value with a TypeScript error.',
    deploy: 'A Vercel deployment fails while building.',
  };

  return (
    <LabPanel label="Try it / debugging" title="Pick the best place to look">
      <p>Match each problem with the tool most likely to show the useful clue.</p>
      <div className="lab-fields">
        <label className="lab-field">Problem
          <select className="practice-input" value={problem} onChange={(event) => { setProblem(event.target.value); setGuess(''); }}>
            {Object.entries(problems).map(([key, text]) => <option key={key} value={key}>{text}</option>)}
          </select>
        </label>
        <label className="lab-field">Where would you look?
          <select className="practice-input" value={guess} onChange={(event) => setGuess(event.target.value)}>
            <option value="">Choose a place…</option>
            {[...new Set(Object.values(expected))].map((place) => <option key={place} value={place}>{place}</option>)}
          </select>
        </label>
      </div>
      {guess && <LabMessage tone={guess === expected[problem] ? 'success' : 'warning'}>
        {guess === expected[problem] ? `Good choice: check ${guess} first.` : `Try ${expected[problem]} first. Different errors show up in different tools.`}
      </LabMessage>}
    </LabPanel>
  );
}

export function GitFlowLab() {
  const [staged, setStaged] = useState(false);
  const [committed, setCommitted] = useState(false);
  const [pushed, setPushed] = useState(false);

  return (
    <LabPanel label="Try it / Git + GitHub" title="Move a pretend edit through Git">
      <p>Practice the order using buttons. This simulator does not run Git commands or change your repository.</p>
      <div className="lab-flow">
        <div><strong>Working copy</strong><span>Edit a file</span><b className="lab-flow-state">Changed</b></div>
        <div><strong>Staging area</strong><span>Choose what to include</span><b className="lab-flow-state">{staged ? 'Staged' : 'Waiting'}</b></div>
        <div><strong>Local history</strong><span>Save a commit</span><b className="lab-flow-state">{committed ? 'Committed' : 'Waiting'}</b></div>
        <div><strong>GitHub</strong><span>Push the commit</span><b className="lab-flow-state">{pushed ? 'Pushed' : 'Waiting'}</b></div>
      </div>
      <div className="lab-actions">
        <button className="lab-button" type="button" onClick={() => { setStaged(true); setCommitted(false); setPushed(false); }}>Stage edit</button>
        <button className="lab-button" type="button" disabled={!staged} onClick={() => { setCommitted(true); setPushed(false); }}>Commit</button>
        <button className="lab-button" type="button" disabled={!committed} onClick={() => setPushed(true)}>Push to GitHub</button>
        <button className="lab-button lab-button-quiet" type="button" onClick={() => { setStaged(false); setCommitted(false); setPushed(false); }}>Reset</button>
      </div>
      <LabMessage tone={pushed ? 'success' : 'neutral'}>
        {pushed ? 'The pretend commit reached the pretend GitHub copy.' : 'Remember: save a commit first, then push it to GitHub.'}
      </LabMessage>
    </LabPanel>
  );
}

const demoRequests = [
  { id: 1, owner: 'You', vehicle: 'Blue coupe', status: 'New' },
  { id: 2, owner: 'Alex', vehicle: 'Red truck', status: 'In progress' },
];

export function AccessControlLab() {
  const [role, setRole] = useState('visitor');
  const visibleRequests = role === 'owner'
    ? demoRequests
    : role === 'customer'
      ? demoRequests.filter((request) => request.owner === 'You')
      : [];

  return (
    <LabPanel label="Try it / Supabase access" title="See why database permissions matter">
      <p>Choose a pretend role to see how an access rule could limit which sample rows are visible.</p>
      <label className="lab-field">Signed-in role
        <select className="practice-input" value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="visitor">Visitor (not signed in)</option>
          <option value="customer">Customer (signed in as “You”)</option>
          <option value="owner">Business owner</option>
        </select>
      </label>
      <div className="lab-table lab-table-two" role="table" aria-label="Sample quote requests">
        <div className="lab-table-row lab-table-head" role="row"><span role="columnheader">Vehicle</span><span role="columnheader">Status</span></div>
        {visibleRequests.map((request) => (
          <div className="lab-table-row" role="row" key={request.id}><span role="cell">{request.vehicle}</span><span role="cell">{request.status}</span></div>
        ))}
      </div>
      <LabMessage tone={role === 'visitor' ? 'warning' : 'success'}>
        {role === 'visitor'
          ? 'No private requests are visible to a visitor.'
          : role === 'customer'
            ? 'A customer sees only their own sample request.'
            : 'The owner role can see all sample requests.'}
      </LabMessage>
      <p className="lab-footnote">This is a visual example, not real security. A real database must enforce access rules itself.</p>
    </LabPanel>
  );
}

type DemoTask = { id: number; title: string; status: 'open' | 'done' };
const startingTasks: DemoTask[] = [
  { id: 1, title: 'Learn SQL', status: 'open' },
  { id: 2, title: 'Test a page', status: 'done' },
];

export function SqlPlaygroundLab() {
  const [tasks, setTasks] = useState(startingTasks);
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('open');
  const [newTask, setNewTask] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const visibleTasks = tasks.filter((task) => filter === 'all' || task.status === filter);
  const query = filter === 'all'
    ? 'SELECT id, title, status FROM tasks;'
    : `SELECT id, title, status FROM tasks WHERE status = '${filter}';`;

  function addTask() {
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [...current, { id: Math.max(0, ...current.map((task) => task.id)) + 1, title, status: 'open' }]);
    setLastQuery(`INSERT INTO tasks (title, status) VALUES ('${title.replace(/'/g, "''")}', 'open');`);
    setNewTask('');
    setFilter('all');
  }

  function toggleTask(id: number) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    const nextStatus = task.status === 'open' ? 'done' : 'open';
    setTasks((current) => current.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    setLastQuery(`UPDATE tasks SET status = '${nextStatus}' WHERE id = ${id};`);
  }

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id));
    setLastQuery(`DELETE FROM tasks WHERE id = ${id};`);
  }

  return (
    <LabPanel label="Try it / SQL" title="Filter and change a pretend table">
      <p>Use the controls to change sample rows. The table and generated SQL update together. Nothing is connected to a database.</p>
      <div className="lab-fields">
        <label className="lab-field">Show rows
          <select className="practice-input" value={filter} onChange={(event) => { setFilter(event.target.value as typeof filter); setLastQuery(''); }}>
            <option value="all">All rows</option>
            <option value="open">Open only</option>
            <option value="done">Done only</option>
          </select>
        </label>
        <label className="lab-field">Add a task
          <input className="practice-input" value={newTask} maxLength={50} onChange={(event) => setNewTask(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addTask(); }} />
        </label>
      </div>
      <div className="lab-actions">
        <button className="lab-button" type="button" onClick={addTask}>Insert sample row</button>
        <button className="lab-button lab-button-quiet" type="button" onClick={() => { setTasks(startingTasks); setFilter('open'); setNewTask(''); setLastQuery(''); }}>Reset sample table</button>
      </div>
      <LabCode>{lastQuery || query}</LabCode>
      <div className="lab-table" role="table" aria-label="Editable sample tasks">
        <div className="lab-table-row lab-table-head" role="row"><span role="columnheader">Task</span><span role="columnheader">Status</span><span role="columnheader">Practice action</span></div>
        {visibleTasks.length === 0
          ? <div className="lab-empty">No rows match this filter.</div>
          : visibleTasks.map((task) => (
            <div className="lab-table-row" role="row" key={task.id}>
              <span role="cell">{task.title}</span>
              <span role="cell">{task.status}</span>
              <span role="cell" className="lab-row-actions">
                <button className="lab-inline-button" type="button" onClick={() => toggleTask(task.id)}>{task.status === 'open' ? 'Mark done' : 'Reopen'}</button>
                <button className="lab-inline-button lab-inline-danger" type="button" onClick={() => deleteTask(task.id)}>Delete</button>
              </span>
            </div>
          ))}
      </div>
      <p className="lab-footnote">Try changing the filter, adding a task, and marking a row done. This simulates SELECT, INSERT, and UPDATE; it resets when you reload.</p>
    </LabPanel>
  );
}

export function VercelSettingsLab() {
  const [rootDirectory, setRootDirectory] = useState('.');
  const [buildCommand, setBuildCommand] = useState('PORT=23599 BASE_PATH=/ pnpm --filter @workspace/edgley-detailing run build');
  const [outputDirectory, setOutputDirectory] = useState('artifacts/edgley-detailing/dist/public');
  const rootIsSafe = rootDirectory.trim() === '' || rootDirectory.trim() === '.';
  const buildLooksRight = buildCommand.includes('@workspace/edgley-detailing') && buildCommand.includes('BASE_PATH=/');
  const outputLooksRight = outputDirectory.trim() === 'artifacts/edgley-detailing/dist/public';

  return (
    <LabPanel label="Try it / Vercel" title="Edit a pretend deployment setup">
      <p>Change these settings to see how Vercel’s build instructions fit together. This does not connect to Vercel or publish the site.</p>
      <div className="lab-fields">
        <label className="lab-field">Root Directory
          <input className="practice-input" value={rootDirectory} onChange={(event) => setRootDirectory(event.target.value)} />
        </label>
        <label className="lab-field">Output Directory
          <input className="practice-input" value={outputDirectory} onChange={(event) => setOutputDirectory(event.target.value)} />
        </label>
      </div>
      <label className="lab-field">Build Command
        <textarea className="practice-input lab-textarea" value={buildCommand} onChange={(event) => setBuildCommand(event.target.value)} />
      </label>
      <LabMessage tone={rootIsSafe && buildLooksRight && outputLooksRight ? 'success' : 'warning'}>
        {rootIsSafe && buildLooksRight && outputLooksRight
          ? 'These settings match the recommended example for this workspace.'
          : !rootIsSafe
            ? 'This folder may hide workspace files such as lib/api-client-react. For this monorepo, keep Root Directory at the repository root (.).'
            : !buildLooksRight
              ? 'Check that the command builds @workspace/edgley-detailing and sets BASE_PATH=/.'
              : 'Check that the output folder points to this app’s built public files.'}
      </LabMessage>
      <p className="lab-footnote">A root directory tells Vercel where to start. An output directory tells it which built files to publish.</p>
    </LabPanel>
  );
}
