require('dotenv-safe').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const { PrismaClient } = require('@prisma/client');
// Instancie o cliente Prisma
const prisma = new PrismaClient();

// Função para salvar mensagem no banco de dados
async function salvarMensagem(textoDaMensagem) {
    try {
        // Crie uma nova entrada de mensagem no banco de dados usando o método create do Prisma
        const mensagemSalva = await prisma.message.create({
            data: {
                texto: textoDaMensagem,
                data: new Date()
            }
        });

        console.log('Mensagem salva:', mensagemSalva);
        return mensagemSalva;
    } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
        throw error;
    }
}

// Exemplo de uso
const textoDaMensagem = "Olá, mundo!";
salvarMensagem(textoDaMensagem);
