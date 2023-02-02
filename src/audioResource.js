const { createDefaultAudioReceiveStreamOptions, VoiceReceiver } = require("@discordjs/voice");

const defaultARSOptions = createDefaultAudioReceiveStreamOptions();

function createARS(voiceConnection) {
    try {
        const ars = new VoiceReceiver(voiceConnection);
        ars.subscribe("307306899567542273", defaultARSOptions);

        ars.onUdpMessage((msg) => {
            console.log("test")
        })
    } catch (e) {
        throw e.message
    }

}

module.exports = { createARS };