# Villagers API

A RESTful API built with **Node.js**, **Express**, **Sequelize**, and **SQLite** for managing villagers. This API provides full CRUD (Create, Read, Update, Delete) functionality for a "Villagers" entity with attributes such as Name, Address, Hobby, Gender, and Age. It also includes:

- **Session-based authentication** using `express-session` (with a hardcoded login of username: `admin` and password: `123456`, and a 2-hour session expiry)
- All endpoints are prefixed with `/api`
- **Swagger/OpenAPI documentation** available at `/api-docs` (with route definitions stored in a separate YAML file)

> **Note:** This project uses ES modules. Make sure `"type": "module"` is set in `package.json`.

## ✨ Features

- **CRUD Endpoints:**  
  Create, retrieve, update, and delete villagers.
  
- **Session-based Authentication:**  
  Login/logout endpoints protect the API. Users must be authenticated to access the CRUD endpoints.

- **Swagger Documentation:**  
  Interactive API docs are provided using Swagger UI at `/api-docs`.  
  You can view the full API documentation by running the server and navigating to:  
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

- **Separation of Concerns:**  
  API route definitions are maintained in a separate YAML file for better organization.

## 🛠️ Tech Stack

- **Backend Framework:** [Express](https://expressjs.com/)
- **Language:** [Node.js](https://nodejs.org/) with ES modules (ESM)
- **ORM:** [Sequelize](https://sequelize.org/)
- **Database:** [SQLite](https://www.sqlite.org/index.html) (for development and small apps)
- **Session Management:** [express-session](https://www.npmjs.com/package/express-session)
- **API Documentation:** [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) & [yamljs](https://www.npmjs.com/package/yamljs)
- **Testing:** (Optional) [Vitest](https://vitest.dev/) & [Supertest](https://github.com/visionmedia/supertest)

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/villagers-api.git
cd villagers-api
```

### 2️. Install Dependencies
```sh
npm install
```

### 3️. Run the server
```sh
npm run dev
```
The API will be running at http://localhost:3000/api

### 4. Access Swagger API Documentation
Once the server is running, open your browser and navigate to:

http://localhost:3000/api-docs

You’ll see interactive API documentation that allows you to test the endpoints directly.

## 📁 Project Structure
```graphql
villagers-api/
├── models/
│   ├── index.js           # Sequelize instance and model initialization
│   └── villager.js        # Villager model definition
├── routes/                # (Optional) Separate folder for route definitions
├── swagger.yaml           # OpenAPI/Swagger definitions for your API routes
├── swagger.js             # Loads swagger.yaml and exports the spec
├── app.js                 # Express app with session, CORS, and API routes (prefixed with /api)
├── package.json
├── database.sqlite        # SQLite database file (auto-generated)
└── README.md
```

## 📸 Screenshots
![Villagers](https://github.com/davidimk/villager-crud/blob/main/screenshot.png?raw=true)

