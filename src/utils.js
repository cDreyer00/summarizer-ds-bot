function getGuild(client, guildName){
    try{
        return client.guilds.cache.find(guild => guild.name === guildName);
    }catch(e){
        return e.message;
    }
}

function getChannel(client, channelName){
    try{
        return client.channels.cache.find(channel => channel.name === channelName);
    }catch(e){
        return e.message;
    }
}

module.exports = {
    getGuild,
    getChannel
}