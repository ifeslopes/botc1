const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function isHorarioComercial() {
    const horaAtual = new Date().getHours();
    return horaAtual >= 9 && horaAtual < 18;
}

async function salvarMensagem(texto) {
    try {
        const mensagem = await prisma.mensagem.create({
            data: {
                texto: texto,
                createdAt: new Date(),
            },
        });
        console.log("Mensagem salva no banco de dados:", mensagem);
    } catch (error) {
        console.error("Erro ao salvar a mensagem:", error);
    }
}

async function listarMensagens() {
    try {
        const mensagens = await prisma.mensagem.findMany();
        let listaFormatada = "";
        mensagens.forEach((mensagem) => {
            listaFormatada += `\n\n 📨 ${
                mensagem.texto
            } \n 📆 ${mensagem.createdAt.toString().split("GMT")[0].trim()}-`;
        });

        return listaFormatada;
    } catch (error) {
        console.error("Erro ao listar mensagens:", error);
    }
}

async function main(bot) {
    await bot;
    await prisma.$disconnect();
}

module.exports = { isHorarioComercial, salvarMensagem, listarMensagens, main };
