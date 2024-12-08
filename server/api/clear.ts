import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

export default eventHandler(async (event) => {
    if (event.req.method === 'POST') {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM personalities', [], function(err) {
                if (err) {
                    console.error('Error inserting data', err);
                    reject({ error: 'Failed to clear data' });
                } else {
                    resolve({ message: 'Data cleared successfully' });
                }
            });
        });
    }
});