const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((erro) => {
    if (erro) {
        console.log("Erro MySQL:", erro);
    } else {
        console.log("MySQL conectado!");
    }
});

app.get("/chamados", (req, res) => {

    const sql = "SELECT * FROM chamados ORDER BY id DESC";

    db.query(sql, (erro, resultado) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });
});

app.post("/chamados", (req, res) => {

    const { nome, setor, solicitacao } = req.body;

    const sql = `
        INSERT INTO chamados (nome, setor, solicitacao)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nome, setor, solicitacao], (erro, resultado) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        res.json({
            mensagem: "Chamado cadastrado!"
        });
    });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor rodando na porta 3000");
});