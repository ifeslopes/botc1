require("dotenv").config();
const { mandaMsgBot } = require("./src/bot");
const { main } = require("./src/database");
const { api } = require("./src/apiweb");
// const express = require("express");


async function startApp() {
   
    const bot = await mandaMsgBot();
    await main(bot);
    //await api();

}

startApp().catch((error) => {
    console.error("Erro inesperado:", error);
    process.exit(1);
});
