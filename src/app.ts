import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

// For CORS
var cors = require("cors");

const port = process.env.PORT || 8080;
const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const router = require("./router");
app.use("/api", router);

// Start server
app.listen(port, () => {
	return console.log(`Express server is listening at port ${port}`);
});
