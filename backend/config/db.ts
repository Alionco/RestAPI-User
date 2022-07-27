const mongoose = require("mongoose"); 
// Interface de conexão com o banco de dados MongoDB. Daria para usar a Mongo Shell diretamente, mas o Mongoose oferece recursos adicionais importantes, como schemas.

const connectDB = async () => { // todas as funções do Mongoose são assíncronas! Lidar com DB exige await!
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); //essa variavel de ambiente está em .env E O LINK PRO MONGO DB DEVE ESPECIFICAR O BD QUE VC VAI USAR!. Aqui é /usuarios
        console.log("Conectado: " + conn.connection.host); // mongoose.connect retorna um objeto
    } catch(error) {
        console.log(error);
        process.exit(1); //em caso de erro, terminar o processo
    }
}

export = connectDB;
