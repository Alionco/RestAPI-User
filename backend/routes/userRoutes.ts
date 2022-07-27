const express = require("express");
/*
    Router (ou middleware) é a função que tem acesso ao request, response e executa alguma coisa, além de passar para a proxima função.
    Ex:

       This example shows a route and its handler function (middleware system). The function handles GET requests to the /user/:id path.

                       rota      função middleware
                        |               |
                        |               |
            app.get('/user/:id', (req, res, next) => {
                res.send('USER')
            })

    Aqui, a rota ja vem "iniciada" a partir do arquivo server.ts. Lá, a chamada app.use(...) já indica o caminho inicial da rota que vai ser usada aqui.

    A função também pode ser importada para facilitar o código. Essas funções ficarão em um arquivo controller.

    Idealmente, cada recurso da minha API vai ter um arquivo de rota.

*/
const router = express.Router();

const userController = require("../controllers/userController");


router.get("/", userController.getUsers);
    // É possível criar toda a funcionalidade dessa função callback aqui mesmo, mas é uma boa prática separar ela e colocar em um arquivo controller.ts. A função depois é importada pra cá e chamada aqui.

router.get("/:id", userController.getUserDetails);
    // É possível criar toda a funcionalidade dessa função callback aqui mesmo, mas é uma boa prática separar ela e colocar em um arquivo controller.ts. A função depois é importada pra cá e chamada aqui.

router.post("/register", userController.registerUser);
    // É possível criar toda a funcionalidade dessa função callback aqui mesmo, mas é uma boa prática separar ela e colocar em um arquivo controller.ts. A função depois é importada pra cá e chamada aqui.

router.post("/login", userController.loginUser);
    // É possível criar toda a funcionalidade dessa função callback aqui mesmo, mas é uma boa prática separar ela e colocar em um arquivo controller.ts. A função depois é importada pra cá e chamada aqui.

router.put("/:id", userController.updateUser);
    // É possível criar toda a funcionalidade dessa função callback aqui mesmo, mas é uma boa prática separar ela e colocar em um arquivo controller.ts. A função depois é importada pra cá e chamada aqui.

router.delete("/:id", userController.deleteUser);
    // É possível criar toda a funcionalidade dessa função callback aqui mesmo, mas é uma boa prática separar ela e colocar em um arquivo controller.ts. A função depois é importada pra cá e chamada aqui.

export = router; // exporta para o server.ts e é utilizado no comando app.use(...)