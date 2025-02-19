// app.js
import express from "express";
import cors from "cors";
import session from "express-session";
import { sequelize, Villager } from "./models/index.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware: parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Setup session middleware with 2-hour expiry
app.use(
  session({
    secret: "random",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 hours in milliseconds
  })
);

// Serve Swagger UI docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123456") {
    req.session.user = { username };
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Logout endpoint
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Could not log out" });
    res.json({ message: "Logout successful" });
  });
});

// Middleware to check for authenticated sessions
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized. Please log in." });
  }
}

// CRUD Endpoints for Villagers

app.get("/api/villagers", isAuthenticated, async (req, res) => {
  try {
    const villagers = await Villager.findAll();
    res.json(villagers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/villagers/:id", isAuthenticated, async (req, res) => {
  try {
    const villager = await Villager.findByPk(req.params.id);
    if (!villager) return res.status(404).json({ error: "Villager not found" });
    res.json(villager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/villagers", isAuthenticated, async (req, res) => {
  try {
    const { name, address, hobby, gender, age } = req.body;
    const villager = await Villager.create({
      name,
      address,
      hobby,
      gender,
      age,
    });
    res.status(201).json(villager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/villagers/:id", isAuthenticated, async (req, res) => {
  try {
    const villager = await Villager.findByPk(req.params.id);
    if (!villager) return res.status(404).json({ error: "Villager not found" });
    const { name, address, hobby, gender, age } = req.body;
    await villager.update({ name, address, hobby, gender, age });
    res.json(villager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/villagers/:id", isAuthenticated, async (req, res) => {
  try {
    const villager = await Villager.findByPk(req.params.id);
    if (!villager) return res.status(404).json({ error: "Villager not found" });
    await villager.destroy();
    res.json({ message: "Villager deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
