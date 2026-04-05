const { execSync } = require('child_process');

function run(command, envVariables = {}) {
  try {
    return execSync(command, { encoding: 'utf8', env: { ...process.env, ...envVariables } });
  } catch (error) {
    console.error(`Error executing: ${command}\n`, error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    process.exit(1);
  }
}

console.log("Initializing repository and making initial commit...");
run('git init');
run('git branch -M main');

try {
  run('git remote add origin https://github.com/imharry18/HireX-AI.git');
} catch (e) {
  // Remote might already exist, ignore error
}

// Stage initial critical files
run('git add .gitignore README.md');

// Start date
const startDateStr = '2026-03-24T10:00:00';
const startDate = new Date(startDateStr);
const today = new Date('2026-04-14T10:00:00');

function getFormattedDate(date) {
   // ISO shape => 2026-03-24T10:00:00.000Z
   // we want => "2026-03-24 10:00:00"
   const iso = date.toISOString();
   return iso.replace('T', ' ').substring(0, 19);
}

// We'll give initial commit the exact start date
const initDateStr = getFormattedDate(startDate);
run(`git commit -m "Initial commit"`, {
    GIT_AUTHOR_DATE: initDateStr,
    GIT_COMMITTER_DATE: initDateStr
});

console.log("Staging backend and frontend...");
// We add all, then use git diff to see them, then unstage.
// This perfectly respects .gitignore
run('git add backend frontend'); 

const stagedFilesOutput = run('git diff --name-only --cached');
const filesToCommit = stagedFilesOutput.split('\n').map(f => f.trim()).filter(f => f !== '');

run('git reset'); // Unstage all to prep for iterative scattered commits

// Randomize file list for authentic timeline
const shuffledFiles = filesToCommit.sort(() => 0.5 - Math.random());
console.log(`Found ${shuffledFiles.length} files to commit iteratively.`);

let fileIndex = 0;
// start next day
let currentDate = new Date(startDate.getTime());
currentDate.setDate(currentDate.getDate() + 1); 

while (fileIndex < shuffledFiles.length && currentDate <= today) {
    const dayOfWeek = currentDate.getDay();
    
    // Simulate skipping random days + less activity on weekends
    let skipChance = 0.20; // 20% flat chance
    if (dayOfWeek === 0 || dayOfWeek === 6) skipChance = 0.5; // 50% chance on weekends
    
    if (Math.random() < skipChance) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
    }

    // 1-2 commits per day
    const commitsToday = Math.random() > 0.5 ? 2 : 1;
    
    for (let c = 0; c < commitsToday; c++) {
        if (fileIndex >= shuffledFiles.length) break;
        
        const file = shuffledFiles[fileIndex];
        
        // Random hour between 10am and 5pm
        const randomHour = Math.floor(Math.random() * 8) + 10;
        const randomMinute = Math.floor(Math.random() * 60);
        const randomSecond = Math.floor(Math.random() * 60);
        
        const commitTime = new Date(currentDate.getTime());
        commitTime.setHours(randomHour, randomMinute, randomSecond);
        
        const commitDateStr = getFormattedDate(commitTime);
        
        run(`git add "${file}"`);
        
        let msg = `Update ${file.split('/').pop()}`;
        if (file.toLowerCase().includes('navbar') || file.toLowerCase().includes('footer')) {
             msg = `Polish navigation UI components`;
        } else if (file.toLowerCase().includes('mockdata')) {
             msg = `Update mock validation datasets`;
        } else if (file.toLowerCase().includes('python') || file.toLowerCase().includes('main.py')) {
             msg = `Refactor backend routes`;
        } else if (file.toLowerCase().includes('page.js')) {
             msg = `Enhance core page structure layout`;
        }
        
        run(`git commit -m "${msg}"`, {
            GIT_AUTHOR_DATE: commitDateStr,
            GIT_COMMITTER_DATE: commitDateStr
        });
        
        fileIndex++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
}

// Bundle any leftover files into the final valid day
if (fileIndex < shuffledFiles.length) {
    console.log(`Bundling remaining ${shuffledFiles.length - fileIndex} files...`);
    const remainingFiles = shuffledFiles.slice(fileIndex);
    for (const file of remainingFiles) {
        run(`git add "${file}"`);
    }
    const finalDateStr = getFormattedDate(today);
    run(`git commit -m "Final improvements and configurations"`, {
        GIT_AUTHOR_DATE: finalDateStr,
        GIT_COMMITTER_DATE: finalDateStr
    });
}

console.log("Commits generated. Pushing to GitHub...");
try {
    run('git push -u origin main');
    console.log("Successfully pushed backdated timeline to production!");
} catch (e) {
    console.error("Push failed - this usually means Git needs your authentication details over CLI.");
}
