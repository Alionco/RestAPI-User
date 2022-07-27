import { isNamedExportBindings } from "typescript";

/*

    Este é o arquivo de controle das funções callback das rotas. As funções são chamadas daqui por questões de boas práticas.

    "Middlewares são funções que são executados durante o ciclo de request -> response"

*/
const bcrypt = require("bcryptjs");
const User = require("../models/userModel"); // import do modelo de usuario
 
const userController = { //como funciona essa construção? várias funções dentro da mesma? uma constante que guarda funções?
    
    // @desc    GET users
    // @rota    /api/users

    async getUsers(req:any, res:any) { // usando async por ser uma função que vai interagir com o BD
        const users = await User.find(); // funcao do schema mongoose de Usuario. Vai retornar todos os usuarios
        let response: any[] = [];
        users.forEach((element:any) => {
            response.push(element.name);
        });
        res.status(200).json(users); // funcao que vai ser executada quando uma request GET for recebida.
    },

    // rota que devolve todos os dados do usuario em especifico
    async getUserDetails(req:any, res:any) {
        const user = await User.findById(req.params.id);
        if(user) {
            res.status(200).json({user});
        } else {
            res.status(400).json({msg:"Usuario nao encontrado"});
        }
    },

    // @desc    (POST) register user
    // @rota    /api/users

    async registerUser(req:any, res:any) { // usando async por ser uma função que vai interagir com o BD
        const {name, email, password} = req.body;

        // verifica se todos os campos foram preenchidos
        if( !name || !email || !password) {
            req.status(400).json({msg: "Por favor preencha todos os campos"});
        }

        // verifica se o email ja nao exista no BD
        const userExist = await User.findOne({email});
        if(userExist) {
            res.status(400).json({msg:"Email ja cadastrado"});
        }

        // encripta a senha antes de armazenar no BD

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // cria o obj usuario novo

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if(user) {
            console.log("usuario criado");
            console.log(user);
            res.status(200).json(user);  
        } else {
            res.status(400).json({msg:"Usuario nao criado"});
        }
    },

    // @desc    (POST) login user
    // @rota    /api/users/login
    
    async loginUser(req:any, res:any) { // usando async por ser uma função que vai interagir com o BD
        const {email, password} = req.body;

        // checa se o usuario existe no BD E compara a senha digitada com a senha armazenada no BD usando bcrypt.compare()
        const userExist = await User.findOne({email});
        const passwordCheck = await bcrypt.compare(password, userExist.password);
        if(userExist && passwordCheck) {
            console.log("entrou");
            res.status(200).json(userExist);
        } else {
            res.status(400).json({msg:" Senha ou email inválidos"});
        }
    },

    async updateUser(req:any, res:any) { // usando async por ser uma função que vai interagir com o BD
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(user);
    },

    // @desc    DELETE Usuario
    // @rota    /api/users/:id

    async deleteUser(req:any, res:any) { // usando async por ser uma função que vai interagir com o BD
        const user = await User.findById(req.params.id);
        if(!user) {
            res.status(400);
            throw new Error("Usuario nao encontrado para delete");
        }
        user.remove();
        res.status(200).json({msg:"delete Usuario " + req.params.id}); // funcao que vai ser executada quando uma request DELETE for recebida. A ROTA É DIFERENTE POIS PRECISA DE UM ID PARA DAR UPDATE!
    }
}

export = userController;