import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

export default eventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM personalities', [], (err, rows) => {
        if (err) {
          console.error('Error fetching data', err);
          reject({ error: 'Failed to fetch data' });
        } else {
          resolve(rows);
        }
      });
    });
  }
});