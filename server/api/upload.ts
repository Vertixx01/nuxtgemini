import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS personalities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personality_name TEXT NOT NULL,
  personality_description TEXT,
  personality_image_url TEXT,
  personality_prompt TEXT,
  username TEXT
)`);

export default eventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event);
    const { personality_name, personality_description, personality_image_url, personality_prompt, username } = body;

    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO personalities (personality_name, personality_description, personality_image_url, personality_prompt, username) VALUES (?, ?, ?, ?, ?)`,
        [personality_name, personality_description, personality_image_url, personality_prompt, username],
        function(err) {
          if (err) {
            console.error('Error inserting data', err);
            reject({ error: 'Failed to insert data' });
          } else {
            resolve({ message: 'Personality uploaded successfully', id: this.lastID });
          }
        }
      );
    });
  }
});