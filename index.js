require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Executar função principal
main().catch((error) => {
    console.error("Erro inesperado:", error);
    process.exit(1);
});

async function mandaMsgBot(bot) {
    bot.on("message", (msg) => {
        const chatId = msg.chat.id;

        if (isHorarioComercial()) {
            bot.sendMessage(
                chatId,
                "Horário comercial! Visite nosso site: https://faesa.br"
            );
        } else {
            if (emailRegex.test(msg.text)) {
                salvarMensagem(msg.text);
                bot.sendMessage(
                    chatId,
                    `Obrigado! Seu e-mail (${msg.text}) foi cadastrado com sucesso. Em breve entraremos em contato. ✅ 👍`
                );
                return "";
            }
           if (msg.text === "ls") {
               // lista os email cadatrados
               (async () => {
                   try {
                       const listaDeEmails = await listarMensagens();
                        bot.sendMessage(chatId, listaDeEmails);
                      
                   } catch (error) {
                       console.error("Erro ao listar mensagens:", error);
                   }
               })();
               return"";
           }


            bot.sendMessage(
                chatId,
                "Fora do horário comercial! Nosso horário de funcionamento é das 09:00 às 18:00. Por favor, deixe seu e-mail para entrarmos em contato."
            );
        }
    });
}

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
        const mensagem = await prisma.mensagem.findMany();
        let listaFormatada = "";
         mensagem.forEach((mensagem) => {
            listaFormatada += `\n- ${mensagem.texto}`;
        });
        return listaFormatada;
    } catch (error) {
        console.error("Erro ao listar mensagens:", error);
    }
}

// Função principal
async function main() {
    await mandaMsgBot(bot);
    await prisma.$disconnect();
}
