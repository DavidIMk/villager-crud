import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import villagerModel from './villager.js';

// Determine __dirname (not available in ES modules by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

const Villager = villagerModel(sequelize);

export { sequelize, Villager };