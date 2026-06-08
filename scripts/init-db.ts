import postgres from 'postgres';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import path from 'path';
 
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function init() {
  const email = 'xlceor6@gmail.com';
  const plainPassword = '1231234siCon';
  
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  
  try {
    await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING
    `;
    console.log(`User ${email} initialized.`);
  } catch (e) {
    console.error('Error creating user:', e);
  }
  process.exit();
}
 
init();