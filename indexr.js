require("dotenv").config();
const { mandaMsgBot } = require("./src/bot");
const { main } = require("./src/database");

async function startApp() {
    const bot = await mandaMsgBot();
    await main(bot);
}

startApp().catch((error) => {
    console.error("Erro inesperado:", error);
    process.exit(1);
});
