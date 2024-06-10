import { Request, Response } from 'express';
import UserDataBaseService from '../service/UserDataBaseService';

class UserController {
    constructor() {}

    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserDataBaseService.listDBUsers();
            res.json({
                status: 200,
                users: users,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Não foi possível listar os usuários',
            });
        }
        /*
    #swagger.security = [{
            "bearerAuth": []
    }]
     #swagger.tags = ['User']
            #swagger.summary = 'Obter todos os usuários'
            #swagger.description = 'Recupera uma lista de todos os usuários'

             #swagger.responses[200] = {
      description: 'Uma lista de usuários',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
          }
        }
      }
    }}
    */
    }

    async getUserById(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            res.status(500).json({
                status: 500,
                message: 'Id do usuário não encontrado',
            });
            return;
        }

        try {
            const user = await UserDataBaseService.getUserById(parseInt(id));

            if (!user) {
                res.status(404).json({
                    status: 404,
                    message: 'Usuário não encontrado',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                user: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Erro ao buscar o usuário',
            });
        }

        /*
    #swagger.security = [{
            "bearerAuth": []
    }]
     #swagger.tags = ['User']
            #swagger.summary = 'Obter usuário por ID'
            #swagger.description = 'Recupera um usuário por ID '
             #swagger.responses[200] = {
      description: 'Retorna um usuário',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
          }
        }
      }
    }}
    */
    }

    async getUserByEmail(req: Request, res: Response) {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({
                status: 400,
                message: 'Email do usuário não fornecido',
            });
            return;
        }

        try {
            const users = await UserDataBaseService.getUserByEmail(
                email as string
            );

            if (!users || users.length === 0) {
                res.status(404).json({
                    status: 404,
                    message: 'Usuário não encontrado',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                users: users,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 500,
                message: 'Erro ao buscar o usuário',
            });
        }

        /*
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.tags = ['User']
    #swagger.summary = 'Obter usuário por email'
    #swagger.description = 'Recupera usuários cujo email contém os caracteres fornecidos'
     #swagger.responses[200] = {
      description: 'Retorna um usuário',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
          }
        }
      }
    }}
   */
    }

    async postUser(req: Request, res: Response) {
        const userData = req.body;

        if (!userData.email || !userData.password) {
            res.status(400).json({
                status: 400,
                message: 'Preencha todos os campos obrigatórios',
            });
            return;
        }

        try {
            const newUser = await UserDataBaseService.insertDBUser(userData);
            res.status(201).json({
                status: 201,
                user: newUser,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Erro ao criar o usuário',
            });
        }
        /*
    
     #swagger.tags = ['User']
            #swagger.summary = ' Criar um novo usuário'
            #swagger.description = 'Cria um novo usuário com os dados fornecidos'

            #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Usuário criado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" }
        }
      }
    }
     */
    }

    async putUser(req: Request, res: Response) {
        const id = req.params.id;
        const userData = req.body;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Id do usuário não encontrado',
            });
            return;
        }

        if (!userData.email || !userData.password) {
            res.status(400).json({
                status: 400,
                message: 'Preencha todos os campos obrigatórios',
            });
            return;
        }

        try {
            const updatedUser = await UserDataBaseService.updateDBUser(
                userData,
                parseInt(id)
            );
            res.status(200).json({
                status: 200,
                updatedUser: updatedUser,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Erro ao atualizar o usuário',
            });
        }

        /*
     #swagger.tags = ['User']
            #swagger.summary = 'Atualizar usuário por ID'
            #swagger.description = 'Atualiza um usuário com o ID fornecido'

              #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserCreate"
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Usuário atualizado com sucesso',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" }
        }
      }
    }
    #swagger.security = [{
            "bearerAuth": []
    }] */
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Id do usuário não encontrado',
            });
            return;
        }

        try {
            await UserDataBaseService.deleteDBUser(parseInt(id));
            res.status(200).json({
                status: 200,
                message: 'Usuário deletado com sucesso',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Erro ao excluir o usuário',
            });
        }

        /*
     #swagger.tags = ['User']
            #swagger.summary = 'Excluir usuário por ID'
            #swagger.description = 'Exclui um usuário com o ID fornecido.'
    #swagger.security = [{
            "bearerAuth": []
    }] */
    }
}

export default new UserController();
