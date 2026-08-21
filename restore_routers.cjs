const fs = require('fs');
const content = fs.readFileSync('C:/Users/jrbri/.gemini/antigravity/brain/c6fa54c5-02d8-4baf-8243-e12e573d5200/.agents/agents/file-writer/agent.md', 'utf8');
const parts = content.split('FILE ');
for (let p of parts) {
  if (p.includes('routers.ts')) {
    const code = p.split('```typescript')[1].split('```')[0].trim();
    fs.writeFileSync('server/routers.ts', code);
    console.log('RESTORED!');
  }
}
