// server.js
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        estudiante: {
            nombre: "DENNYS ALEXANDER MENJIVAR ALVARADO",
            expediente: "25728",
            codigo: "MA22I04001",
        },
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
    });
});

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "12345",
    database: process.env.DB_NAME || "parcial_db",
});

app.get("/estudiantes", async (_req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, nombre, expediente, codigo, fecha_registro FROM estudiantes ORDER BY id"
        );
        res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, error: "Error consultando estudiantes" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`API escuchando en http://0.0.0.0:${PORT}`);
});
