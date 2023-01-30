const { Client, Events, GatewayIntentBits, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

const joinCall = require("./src/joinCall");
const summarizeCommand = require("./src/slashCommands/summarizeTextCommand");

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


client.on(Events.ClientReady, (client) => {
    console.log(`LOGGED IN AS ${client.user.tag}`);
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