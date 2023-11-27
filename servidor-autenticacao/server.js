const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = "secretpassword";

app.use(cors());

app.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = user;
    next();
  });
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verificação de usuário/senha simplificada (substitua por uma lógica segura)
  if (username === "usuario" && password === "senha") {
    const user = { username };

    jwt.sign({ user }, SECRET_KEY, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao criar token" });
      }

      res.json({ token });
    });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
});

app.get("/protegido", verifyToken, (req, res) => {
  res.json({ message: "Rota protegida acessada com sucesso!", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
