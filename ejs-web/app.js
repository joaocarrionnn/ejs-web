// npm install express <pacote>
// npm install ejs
//npm install nodemon



// Importa os módulos
const express = require("express");
const path = require("path");
const mysql = require("mysql2");

// Configura o express
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "mvc/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conecta ao banco de dados
const connection = mysql.createPool({
  host: "127.0.0.1", 
  user: "root", 
  database: "meu_login", 
  password: "" 
});



// Conecta ao banco
connection.on("connection", () => {
  console.log("Conectado ao banco de dados!");
});



// Rota principal
app.get("/", (req, res) => {
  res.render("index.ejs");
});



app.post("/login", (req, res) => {
  const usuario = req.body.usuario;
  const email = req.body.email;
  const senha = req.body.senha;

  // Verifica se os campos estão vazios
  if (usuario === "" || email === "" || senha === "") {
    res.render("error.ejs", { 
      mensagem: "Usuário, email ou senha inválidos!" 
    });
    return;
  }

  // Consulta o banco de dados para verificar o usuário, email e senha
  connection.query(
    "SELECT * FROM login WHERE usuario = ? AND email = ? AND senha = ?",
    [usuario, email, senha],
    (err, results) => {
      // Se não encontrar o usuário, email ou senha no banco
      if (results.length === 0) {
        res.render("error.ejs", { 
          mensagem: "Usuário, email ou senha inválidos!" 
        });
      }

      // Se o login for bem-sucedido, redireciona para a página da conta
      res.render("conta.ejs");
    }
  );
});


// Rota para a página com a tabela de usuários
app.get("/login", (req, res) => {
  // Consulta o banco de dados para buscar todos os usuários
  connection.query("SELECT * FROM login", (err, results) => {
    if (err) {
      console.log(err);
      res.render("error.ejs", { mensagem: "Erro ao carregar os usuários." });
      return;
    }

    // Renderiza a página "conta.ejs" passando os resultados da consulta
    res.render("conta.ejs", { usuarios: results });
  });
});


app.post("/adicionar", (req, res) => {
  const { nome, email } = req.body;

  connection.query(
    "INSERT INTO login (usuario, email) VALUES (?, ?)", [nome, email],
    (err, results) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao adicionar usuário" });
        return;
      }
      // Retorna o novo usuário adicionado com id
      res.status(200).json({ id: results.insertId, usuario: nome, email: email });
    }
  );
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));






















