import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const __dirname = import.meta.dirname;

const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, '../todo.sql'), 'utf8');
  pool.query(sql);
};

const insertTestUser = (email, password) => {
  hash(password, 10, (error, hashedPassword) => {
    pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', 
      [email, hashedPassword]);
  })
}

const getToken = (email) => {
  return jwt.sign({user: email}, process.env.JWT_SECRET_KEY);
}

export { initializeTestDb, insertTestUser, getToken };