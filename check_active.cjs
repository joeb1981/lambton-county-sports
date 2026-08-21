const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });
const sql = postgres(process.env.DATABASE_URL);
sql`SELECT sport_name, is_active FROM sports_programs`.then(res => {
  const counts = {};
  res.forEach(r => {
    if (r.is_active) counts[r.sport_name] = (counts[r.sport_name] || 0) + 1;
  });
  console.log(counts);
  process.exit(0);
});
