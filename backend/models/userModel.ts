// esse arquivo define o esquema (os campos) do recurso Usuario

const mongoose = require("mongoose"); //import de mongoose para criar schemas

//o schema usuario vai ter um campo text do tipo String e que nao pode ser nulo (é required)
// por ser um schema do mongoose, ele ja vai ter várias funções q facilitam na hora de criar, deletar, etc


// ATENÇÃO!!!! O NOME DO CAMPO NA REQUISIÇÃO TEM QUE SER O MESMO DO SCHEMA! EX: SE FOR DAR UM POST, O CAMPO TEM Q SER "text"! SE NÃO O MONGOOSE RECLAMA!
const usuarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor adicione um nome ao usuario"]
    },
    email: {
        type: String, 
        required: [true, "Por favor adicione um email ao usuario"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Por favor adicione uma senha ao usuario"],
    },

}, {
    timestamps: true, // esse outro parametro cria timestamps automaticamente (created at e updated at)
})


export = mongoose.model("Usuario", usuarioSchema);