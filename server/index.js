import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV;

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const pool = openDb();

  pool.query('SELECT * FROM task', (error, results) => {
    if (error) {
      return res.status(500).json({error: error.message});
    }
    return res.status(200).json(results.rows);
  })
});

app.post('/create', (req, res) => {
  const pool = openDb();

  pool.query('INSERT INTO task (description) VALUES ($1) returning *', 
    [req.body.description], 
    (error, results) => {
      if (error) {
        return res.status(500).json({error: error.message});
      }
      return res.status(200).send({id: results.rows[0].id});
    }
  );
});

app.delete('/delete/:id', (req, res) => {
  const pool = openDb();
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM task WHERE id = $1', 
    [id], 
    (error, result) => {
      if (error) {
        return res.status(500).json({error: error.message});
      }
      return res.status(200).json({id: id});
    }
  );
});

const openDb = () => {
  const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.NODE_ENV === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })
  return pool
}

const pool = openDb();

export { pool };

app.listen(port);