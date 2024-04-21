const { PrismaClient } = require("@prisma/client");

// Instancie o cliente Prisma
const prisma = new PrismaClient();

// Função para criar uma mensagem
async function criarMensagem(texto) {
    try {
        const mensagem = await prisma.messagem.create({
            data: {
                texto: texto,
            },
        });
        console.log(`Mensagem "${mensagem.texto}" criada com sucesso.`);
    } catch (error) {
        console.error("Erro ao criar mensagem:", error);
    }
}
async function salvarMensagem(texto) {
    try {
         const mensagem = await prisma.mensagem.create({
             data: {
                 texto: texto,
                
             },
         });
        console.log("Mensagem salva no banco de dados:", mensagem);
    } catch (error) {
        console.error("Erro ao salvar a mensagem:", error);
    }
}

// Função para listar todas as mensagens
async function listarMensagens() {
    try {
        const mensagem = await prisma.mensagem.findMany();
        console.log("Mensagens:");
        mensagem.forEach((mensagem) => {
            console.log(`- ${mensagem.texto}`);
        });
    } catch (error) {
        console.error("Erro ao listar mensagens:", error);
    }
}

// Função principal
async function main() {
    // Criar mensagens
    await salvarMensagem("Olá, mundo!");
    await salvarMensagem("Este é um teste.");

    // Listar mensagens
    await listarMensagens();

    // Fechar conexão com o Prisma
    await prisma.$disconnect();
}

// Executar função principal
main().catch((error) => {
    console.error("Erro inesperado:", error);
    process.exit(1);
});
