import 'dotenv/config';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Recreate __dirname functionality for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default new DataSource({
  type: 'postgres', 
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
  synchronize: false,
});