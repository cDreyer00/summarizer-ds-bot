const { Client, Events, GatewayIntentBits, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

const joinCall = require("./joinCall");
const summarizeCommand = require("./slashCommands/summarizeTextCommand");
const { getGuild, getChannel } = require("./utils");
const { createAudioResource } = require("@discordjs/voice");
const { createARS } = require("./audioResource");
const Transcriber = require("discord-speech-to-text");
const makeSummary = require("./makeSummary");


const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const transcriber = new Transcriber("O4VNJA2AP47YHBGF2PMUNAIIQ343Q2NL")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildIntegrations,
    ]
});

let summarazing = false;

client.on(Events.ClientReady, (client) => {
    console.log(`LOGGED IN AS ${client.user.tag}`);

    const channel = getChannel(client, "Geral");
    const voiceConnection = joinCall(channel)
    voiceConnection.receiver.speaking.on("start", (userId) => {
        transcriber.listen(voiceConnection.receiver, userId, client.users.cache.get(userId))
            .then(async (data) => {
            if(!data.transcript.text || summarazing)return;
            summarazing = true;
            
            let text = data.transcript.text;
            //let user = data.user;

            
            console.log("ORIGINAL ========");
            console.log(text);
            console.log("SUMMARIZED ========");
            console.log(await makeSummary(text));

        })
    })
    //createARS(voiceConnection);
})

client.on(Events.MessageCreate, async (message) => {
    if (message.author.id == client.user.id) return;

    const content = message.content;

    if (!content) return
})


client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'summarize-text') {
        summarizeCommand.run(interaction);
    }
})

const rest = new REST({ version: '10' }).setToken(TOKEN);

// async function registerCommands() {
//     const commands = [{
//         name: summarizeCommand.command.name,
//         description: summarizeCommand.command.description,
//         options: summarizeCommand.rawData.options
//     }];

//     try {
//         await rest.put(Routes.applicationGuildCommands(CLIENT_ID, "1063252691037454377"), {
//             body: commands,
//         });
//         console.log("commands registered");
//     } catch (err) {
//         console.log("ERROR: ", err)
//     }
// }
// registerCommands();

client.login(TOKEN)