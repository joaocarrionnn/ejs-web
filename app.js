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



// Rota de login
app.post("/login", (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha; 



  // Verifica se os campos estão vazios ou se a consulta não encontrou o usuário
  if (usuario === "" || senha === "") {
    res.render("error.ejs", { 
        mensagem: "Usuário ou senha inválidos!"
    });
  }



  // Consulta o banco de dados
  connection.query(
    "SELECT * FROM login WHERE usuario = ? AND senha = ?",
    [usuario, senha],
    (err, results) => {

      // Se não encontrar o usuário ou senha no banco
      if (results.length === 0) {
        res.render("error.ejs", { 
           mensagem: "Usuário ou senha inválidos!" 
        });
      }

      // Se o login for bem-sucedido, renderiza a página 'conta.ejs'  
       res.render("conta.ejs");
    }
  );
});


app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
