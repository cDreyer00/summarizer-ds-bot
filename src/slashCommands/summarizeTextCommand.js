const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("summarize-text")
        .setDescription("Summarizes the text in the input")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("the contet to summarize")
                .setMinLength(200)
        ),
        async run(interacion){
            console.log('INTERACTION')
            console.log(interaction);
        }
};

