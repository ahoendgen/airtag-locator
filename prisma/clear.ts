import dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

async function main() {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error('DATABASE_URL is not defined');
  }

  let dbFile = process.env.DATABASE_URL.replace('file:', '');

  if (dbFile.startsWith('./')) {
    dbFile = dbFile.replace('./', './prisma/');
  }

  fs.unlinkSync(dbFile);
}

main();
