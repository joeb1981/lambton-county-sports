const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });
const sql = postgres(process.env.DATABASE_URL);
sql`SELECT id, email, role FROM users`.then(res => {
  console.log(res);
  process.exit(0);
});
