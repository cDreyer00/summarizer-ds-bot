const { Client, Events, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("dotenv").config();

const wait = require("cdreyer-utilities");

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

    const guild = client.guilds.cache.get("1063252691037454377")
    const channel = guild.channels.cache.find(channel => channel.name == "Geral");
    joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
    })    
    1063252691624669197
})

client.on(Events.MessageCreate, async (message) => {
    
})


client.login(TOKEN)