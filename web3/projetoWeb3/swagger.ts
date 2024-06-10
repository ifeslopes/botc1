const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: '1.0.0',
        title: 'DESENVOLVIMENTO DE APLICAÇÕES WEB II  C2, C3',
        description:
            ' Este projeto consiste na criação de uma API de co utilizando o padrão MVC, implementando modelos existentes no Prisma Quickstart e adicionando um modelo para Comentários. Além disso, será desenvolvido um mecanismo de autenticação via Tokens JWT para a API',
        contact: {
            name: 'API Support',
            url: 'https://github.com/howardroatti',
            email: 'https://github.com/howardroatti',
        },
    },
    servers: [
        {
            url: 'http://localhost:3005',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            // Definindo os schemas de Comment
            Comment: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    content: { type: 'string', example: 'This is a comment.' },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-05-18T12:34:56Z',
                    },
                    postId: { type: 'integer', example: 1 },
                    authorId: { type: 'integer', example: 1 },
                },
            },
            CommentCreate: {
                content: 'This is a comment.',
                postId: 1,
                authorId: 1,
            },

            // Definindo os schemas de Post
            Post: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    title: { type: 'string', example: 'Post Title' },
                    content: {
                        type: 'string',
                        example: 'This is the content of the post.',
                    },
                    published: { type: 'boolean', example: false },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-05-18T12:34:56Z',
                    },
                    authorId: { type: 'integer', example: 1 },
                },
            },
            PostCreate: {
                title: 'Post Title',
                content: 'This is the content of the post.',
                authorId: 1,
            },

            // Definindo os schemas de User
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    email: { type: 'string', example: 'user@example.com' },
                    name: { type: 'string', example: 'John Doe' },
                    senha: { type: 'string', example: '1234' },
                },
            },
            UserCreate: {
                email: 'user@example.com',
                name: 'John Doe',
                password: '123',
            },
            Autenticacao: {
                type: 'object',
                properties: {
                    auth: { type: 'boolean', example: true },
                    status: { type: 'integer', example: 200 },
                    profissional: {
                        type: 'object',
                        properties: {
                            idProfissional: { type: 'integer', example: 1 },
                            nome: { type: 'string', example: '1' },
                            cpf: { type: 'string', example: '2' },
                            funcao: { type: 'string', example: '3' },
                            email: { type: 'string', example: 'novo' },
                            password: {
                                type: 'string',
                                example:
                                    '$2b$10$PrdniTrjj3cRGgyfjHlKIez1VrqDIYPhnkXNNJFIIaSzWjIPzUfYS',
                            },
                            nivelAcesso: { type: 'string', example: '1' },
                        },
                    },
                    success: { type: 'boolean', example: true },
                    token: {
                        type: 'string',
                        example:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IjEiLCJuaXZlbEFjZXNzbyI6IjEiLCJpYXQiOjE3MTcwOTA1ODksImV4cCI6MTcxNzA5MjM4OX0.OhP7hJhmJwXR8rzzBuVAnl6gxF44AkQGRVNF7vA4wls',
                    },
                    message: { type: 'string', example: 'Login bem sucedido.' },
                },
            },

            AutenticacaoLogin: {
                email: 'profissional@gmail.com',
                password: 'senha123',
            },
        },
    },
};


const outputFile = './swagger-output.json';
const endpointsFiles = [
    './src/routes/CommentRoutes.ts', 
    './src/routes/PostRoutes.ts', 
    './src/routes/UserRoutes.ts', 
    './src/routes/AuthRoutes.ts',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.ts'); // Arquivo principal do projeto
});
