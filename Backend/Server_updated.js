// Backend/Server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the static frontend from the sibling Frontend folder.
// This assumes the project layout is Job_Seeker/Backend and Job_Seeker/Frontend.
app.use(express.static(path.join(__dirname, "..", "Frontend")));

// ==========================
// MariaDB connection pool
// ==========================
const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// ==========================
// DB connection test
// ==========================
(async () => {
	try {
		const conn = await pool.getConnection();
		console.log("MariaDB connected");
		conn.release();
	} catch (err) {
		console.error(" MariaDB connection failed:", err.message);
		process.exit(1);
	}
})();

// ==========================
// Test route
// ==========================
app.get("/", (req, res) => {
	res.status(200).send("Backend running");
});

// ==========================
// REGISTER
// ==========================
app.post("/api/register", async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			age,
			location,
			sex,
			experience,
			email,
			password,
		} = req.body;

		if (!first_name || !last_name || !email || !password) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const password_hash = await bcrypt.hash(password, 10);

		await pool.query(
			`INSERT INTO Employee
			 (First_Name, Last_Name, Age, Location, Sex, Experience, email, password_hash)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				first_name,
				last_name,
				age ?? null,
				location ?? null,
				sex ?? null,
				experience ?? null,
				email,
				password_hash,
			]
		);

		res.status(201).json({ ok: true });
	} catch (err) {
		if (err.code === "ER_DUP_ENTRY") {
			return res
				.status(409)
				.json({ error: "Email already exists" });
		}

		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

// ==========================
// LOGIN
// ==========================
app.post("/api/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Missing email or password" });
		}

		const [rows] = await pool.query(
			"SELECT id, email, password_hash FROM Employee WHERE email = ?",
			[email]
		);

		if (rows.length === 0) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const user = rows[0];
		const match = await bcrypt.compare(password, user.password_hash);

		if (!match) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		res.json({ ok: true, userId: user.id });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

// ==========================
// DELETE ACCOUNT (by userId)
// ==========================
app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const [result] = await pool.query("DELETE FROM Employee WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ==========================
// Start server after all middleware and routes are registered
// ==========================
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
