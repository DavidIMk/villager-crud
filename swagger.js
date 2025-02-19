// swagger.js
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine __dirname since it isn't available in ES modules by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the swagger.yaml file
const swaggerSpec = YAML.load(path.join(__dirname, 'swagger.yaml'));

export default swaggerSpec;