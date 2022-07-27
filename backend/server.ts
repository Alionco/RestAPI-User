/*

    O inicio do processo de criação do app é dado da seguinte forma:
        1. chamada "npm init" no terminal, escolhendo como entrypoint o arquivo principal do server (no caso, server.ts), já que o padrao é index.js (isso vai constar no package.json)
        2. instalar as dependencias com "npm install <<pacote>>" (Veja as dependencias como "bibliotecas" com diferentes funcionalidades que serão usadas na aplicação). No caso, foram usados express, dotenv, mongoose, ts-node e nodemon (este ultimo com flag -D, só para desenvolvimento). Uma chamada de "npm i" instala todos os pacotes que ja constam no package.json e é bom quando vc vai dar pull em algum projeto ja inicializado.        
        3. Adicionar um script ao arquivo package.json. Esse arquivo contem as informações sobre a aplicação. No bloco de scripts, podemos adicionar um script novo  "dev": "nodemon ./backend/server.ts". Quando a gente der o comando "npm run dev", o script dev vai ser executado e chamar o nodemon, que é uma ferramenta que facilita pra desenvolver (nao precisa ficar abrindo e fechando a aplicação no terminal, o nodemon fica escutando as alterações no arquivo e ja reinicia sozinho)

    Depois, so começar a montar o backend!

    TO DO: VER COMO FICAM OS ARQUIVOS DO GITIGNORE (NODE_MODULES E .ENV) DEI PUSH EM TUDO SEM QUERER!

    OBS: PRA MATAR O DOCKER:
        sudo docker ps
        sudo docker kill <<ids dos containers>>

        ou

        dar sudo docker-compose down no ensalamento

    OBS: VOU PULAR A PARTE DE ERROR HANDLING DO PRIMEIRO VIDEO! E TAMBEM DE ASYNC HANDLER DO EXPRESS! E TAMBÉM A PARTE DE GERAR UM JASON WEB TOKEN PARA USUARIO

    OBS: o arquivo .env também vai no gitignore.

    PARA COLOCAR O MONGODB NO AR:
        sudo mongod OU sudo mongod --dbpath ~/data/db/ EM CASA
        mongo (em outro terminal) para se conectar ao db
            ou
        conectar com o mongocompass usando a URL do mongodb local que está no .env

        Executar a aplicação também vai conectar ela no banco de dados

*/

const express = require("express"); //express é um framework Node prara web e serve para trabalhar com as requisicoes HTTP
const dotenv = require("dotenv").config(); // usado para utilizar as variaveis de ambiente constante no arquivo .env
const connectDB = require("./config/db"); // import da função de conexão com o banco de dados
connectDB(); //chamada da função de conexxão

const port = process.env.PORT || 3000; // escolha da porta a ser usada na aplicação. Pode ser da variavel de ambiente ou uma fixa, se a primeira nao for encontrada.
const app = express();
app.use(express.json()); // é o parser do campo body para raw JSON.
app.use(express.urlencoded({extended: false})) // tambem usado para parse de requisicoes com JSON

app.listen(port, () => {console.log("Servidor ligado na porta", port)}); // listen() é a função que inicia a comunicação. O app vai escutar a porta escolhida. Sem ela, nao há comunicação

/* 
    app.use(<<rota inicial>>, require(<<arquivo de rotas>>));
    Para que as rotas nao fiquem acumuladas nesse arquivo, foi criado um diretorio /routes e um arquivo routes.ts. O ideal é que cada "rota" tenha seu arquivo associado. Por ex: uma rota /api/usuarios, outra rota /api/clientes... etc.

    A explicação sobre as rotas está no arquivo de rotas.

*/
app.use("/api/users", require("./routes/userRoutes"));
