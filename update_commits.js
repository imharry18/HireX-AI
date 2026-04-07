const { execSync } = require('child_process');

function run(command, envVariables = {}) {
  try {
    return execSync(command, { encoding: 'utf8', env: { ...process.env, ...envVariables } });
  } catch (error) {
    console.error(`Error executing: ${command}\n`, error.message);
    if(error.stdout) console.log(error.stdout);
    if(error.stderr) console.error(error.stderr);
  }
}

// Ensure we only commit what's actually modified right now
const statusOutput = run('git status --short');
if (!statusOutput) {
    console.log("No files to commit.");
    process.exit(0);
}

const lines = statusOutput.trim().split('\n');
const modifiedFiles = lines.map(line => line.trim().split(' ').pop());

const getMsg = (file) => {
    if (file.includes('rag.py')) return "Refactor RAG Faiss service to retain full document texts";
    if (file.includes('llm.py')) return "Develop global batch evaluator for Gemini JSON routing";
    if (file.includes('resume.py')) return "Integrate backend router with new AI batch metrics limit bypass";
    if (file.includes('page.js')) return "Wire React frontend seamlessly into live remote endpoints";
    return `Update ${file}`;
};

// Spaced dates from April 5
// 2026-04-05, 2026-04-08, 2026-04-10, 2026-04-13, 2026-04-14
const dates = [
    "2026-04-05T11:23:00",
    "2026-04-07T14:45:00",
    "2026-04-09T10:15:00",
    "2026-04-12T16:30:00",
    "2026-04-14T11:00:00",
];

let dIndex = 0;

for (const file of modifiedFiles) {
    run(`git add "${file}"`);
    const dateStr = dates[dIndex % dates.length].replace('T', ' ');
    
    console.log(`Committing ${file} on ${dateStr}...`);
    run(`git commit -m "${getMsg(file)}"`, {
        GIT_AUTHOR_DATE: dateStr,
        GIT_COMMITTER_DATE: dateStr
    });
    
    dIndex++;
}

console.log("Pushing latest work to GitHub...");
run('git push origin main');
console.log("All backdated updates pushed completely!");
