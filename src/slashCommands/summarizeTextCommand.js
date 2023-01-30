const { SlashCommandBuilder } = require("discord.js");
const summarize = require("../summarize");

const command = new SlashCommandBuilder()
    .setName("summarize-text")
    .setDescription("Summarizes the text in the input")
    .addStringOption(option =>
        option.setName("input")
            .setDescription("the contet to summarize")
            .setMinLength(200)
    )


async function run(interaction){
    interaction.reply("summarizing text, please wait...");

    const content = interaction.options.get("input").value;
    summarize(content)
        .then(res => {
            interaction.editReply(res);
        })
        .catch(err => {
            interaction.editReply(err)
        })
}

const rawData = command.toJSON();


module.exports = {
    command,
    run,
    rawData    
};

