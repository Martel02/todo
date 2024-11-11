import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import e from 'express';
import { hash } from 'crypto';

const __dirname = import.meta.dirname;

const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, '../todo.sql'), 'utf8');
  pool.query(sql);
};

const insertTestUser = (email, password) => {
  hash(password, 10, (error, hashedPassword) => {
    [email, hashedPassword];
  })
}

export { initializeTestDb };