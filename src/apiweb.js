const express = require("express");
const app = express();
const PORT = 3000;
const { format } = require("date-fns-tz");
const {
    listarMensagens
} = require("./database");



async function apiWeb() {
    app.use(express.static("html"));


     app.get("/", (req, res) => {
        res.sendFile(__dirname+"/html/mostralista.html")
     });

    // Rota para mostrar os dados da lista
    app.get("/dados", (req, res) => {
        var response ="";

        const listaPromise = dadosBanco();

         listaPromise.then(lista => {

            lista.forEach((item) => {

                const data=  converterDataParaPtBr(item.data);
                response += `📨 ${item.email}:\n📆 ${ data }\n\n`;
            })

            res.send(response);
        });

    });

    // Inicia o servidor
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:3001`);
    });

    async function dadosBanco() {
        let ls = [];
        ls = await listarMensagens();

        const list = await converterStringParaLista(ls);
        return list;
    }
}



function converterStringParaLista(str) {
    const regex = / 📨 (.+?)\s* 📆 (.+?)-/g;
    const lista = [];
    let match;


    while ((match = regex.exec(str)) !== null) {
        const email = match[1];
        const data = match[2];
        lista.push({ email, data });
    }

    return lista;
}

  function converterDataParaPtBr(dataStr) {

    const data = new Date(dataStr);
    const dataFormatada = format(data, "'Data:' PPPP 'Hora:' HH:mm");
    return dataFormatada;
}
 async function api() {
   await apiWeb();
}
api()
module.exports = { api };
