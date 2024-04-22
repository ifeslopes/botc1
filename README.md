# Desenvolvimento de Aplicações Web II

## Professor: Otávio Lube dos Santos

### Descrição do Desafio

Uma grande empresa atacadista contatou a equipe de desenvolvedores da turma de Dev Web II para o desenvolvimento de um 🤖BOT de atendimento. O BOT, inicialmente, deve funcionar no aplicativo TELEGRAM📱. Ao receber uma mensagem💬, o BOT deve avaliar o horário em que a mensagem foi enviada. Se a mensagem foi enviada em horário comercial (09:00 às 18:00), o  BOT deve informar para o usuário o link: [https://faesa.br](https://faesa.br).

Se a mensagem foi enviada fora do horário comercial, o BOT deve informar o horário de funcionamento da empresa 🕒(09:00 às 18:00) e obter o 📧 e-mail do interessado, para que a empresa possa entrar em contato. Este e-mail deve ser armazenado 📝 em um banco de dados SQLITE, usando o ORM Prisma.

### Tecnologias Utilizadas ✨

- Node.js
- Express
- node-telegram-bot-api
- SQLite
- ORM Prisma
- JavaScript
- HTML
- CSS
- BotFather

### Instalação 🧰

1. **Criação de um Bot no Telegram com BotFather:** 🔨
   - Abra o aplicativo Telegram.
   - Procure por `BotFather`.
   - Inicie uma conversa com `BotFather`.
   - Use o comando `/newbot` para criar um novo bot.
   - Siga as instruções para escolher um nome e um username para o seu bot.
   - Anote o token gerado pelo BotFather.

2. **Configuração do Projeto:** 🔨
   - Clone o repositório ou baixe o zip do projeto.
   - Extraia os arquivos, se necessário.
   - No diretório do projeto, crie um arquivo `.env`.
   - Dentro do arquivo `.env`, cole o token do bot criado no BotFather:
     ```
     BOT_TOKEN=seu_token_aqui
     ```

3. **Instalação das Dependências:** 🔨
   - Abra um terminal e navegue até o diretório do projeto.
   - Execute o comando `npm install` para instalar as dependências do projeto.

4. **Execução do Projeto:** ⚙️
   - Após a instalação das dependências, execute o comando `node index.js` no terminal para iniciar o bot.
5. **diretório  e Arquivos:** 📁
   - 
    ```
    src
        ├── apiweb.js
        ├── bot.js
        ├── database.js
        ├── html
        │   └── mostralista.html
        └── img
            ├── bot1.jpg
            ├── bot2.jpg
            ├── bot3.jpg
            ├── bot4.jpg
            ├── sql1.png
            └── web1.png
     ```


### Funcionamento:

#### Mensagem foi enviada em horário comercial:
```Observação: O horário comercial foi modificado para realizar testes na aplicação ```
![Screenshot](/src/img/bot1.jpg) 
<br>

#### Mensagem foi enviada fora do horário comercial:

![Screenshot](/src/img/bot2.jpg) 

#### Cadastra e-mail:

![Screenshot](/src/img/bot3.jpg) 

#### visualizar e-mail cadastrados no sqlite:

![Screenshot](/botc1/src/img/sql1.png) 

#### visualizar e-mail cadastrados por aplicativo do telegram:

![Screenshot](/src/img/bot4.jpg) 

#### visualizar e-mail cadastrados por uma pagina web:

![Screenshot](/src/img/web1.png) 


---
