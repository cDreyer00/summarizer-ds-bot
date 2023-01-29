const { Client, Events, GatewayIntentBits, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

const joinCall = require("./src/joinCall");
const summarize = require("./src/summarize");
const { run } = require("./src/slashCommands/summarizeTextCommand");

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildIntegrations,
    ]
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on(Events.ClientReady, (client) => {
    console.log(`LOGGED IN AS ${client.user.tag}`);
})

client.on(Events.MessageCreate, async (message) => {
    if (message.author.id == client.user.id) return;

    const content = message.content;

    if (!content) return

    message.reply("summarizing text, please wait...")
    summarize(content)
        .then(res => {
            message.reply(res);
        })
        .catch(err => {
            message.reply(err)
        })
})


client.on(Events.InteractionCreate, async (interaction) => {
    console.log("interaction again");
})

async function registerCommands() {

    const commands = [
        {
            name: 'summarize-text',
            description: 'summrize a text in the input field'
        }
    ];

    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, "1063252691037454377"), {
            body: commands,
        });
        console.log("commands registered");
    } catch (err) {
        console.log("ERROR: ", err)
    }
}
registerCommands();

client.login(TOKEN)