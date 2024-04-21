const TelegramBot = require("node-telegram-bot-api");
const {
    isHorarioComercial,
    salvarMensagem,
    listarMensagens,
} = require("./database");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function mandaMsgBot() {
    const token = process.env.BOT_TOKEN;
    const bot = new TelegramBot(token, { polling: true });

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;

        if (isHorarioComercial()) {
            bot.sendMessage(
                chatId,
                "Horário comercial! Visite nosso site: https://faesa.br"
            );
        } else {
            if (emailRegex.test(msg.text)) {
                await salvarMensagem(msg.text);
                bot.sendMessage(
                    chatId,
                    `Obrigado! Seu e-mail (${msg.text}) foi cadastrado com sucesso. Em breve entraremos em contato. ✅ 👍`
                );
            } else if (msg.text === "ls") {
                try {
                    const listaDeEmails = await listarMensagens();
                    bot.sendMessage(chatId, listaDeEmails);
                } catch (error) {
                    console.error("Erro ao listar mensagens:", error);
                }
            } else {
                bot.sendMessage(
                    chatId,
                    "Fora do horário comercial! Nosso horário de funcionamento é das 09:00 às 18:00. Por favor, deixe seu e-mail para entrarmos em contato."
                );
            }
        }
    });

    return bot;
}

module.exports = { mandaMsgBot };
