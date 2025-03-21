// npm install express <pacote>
// npm install ejs
//npm install nodemon


//importa o modulo do projeto
const express =  require("express")
const path = require("path")

//configura o express para ser usado
const App = express()
App.set("view engine", "ejs")
// Servindo arquivos estáticos (CSS, imagens, etc.) na pasta 'mvc e depois views'
App.set("views",path.join(__dirname, "mvc/views" ))
App.use(express.static(path.join(__dirname, "public")))


//Endpoint
App.get("/", (req, res) => {
    res.render("index.ejs", {
        nome:"Carrion",
        texto:"esta é uma demonstração"
    }) 
})


//deixar diponivel o serviço
App.listen(3000, () => console.log("servidor ta rodandooooooooooooooooooo"))
