const { joinVoiceChannel } = require("@discordjs/voice")

function joinCall(channel) {

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false

    })

    return connection;
}

module.exports = joinCall;