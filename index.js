const { Client, Events, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("dotenv").config();

const joinCall = require("./src/joinCall");
const summarize = require("./src/summarize");

const TOKEN = process.env.BOT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ]
});


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


client.login(TOKEN)