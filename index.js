const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function () {
    console.log("Le bot est connecté!")
})

bot.on('message', message => {
    if (message.content === '!event') {
        message.guild.channels.create("Mazette")
        
    }
})

bot.login('ODI2OTQ4NTk2NDYwODE0MzY2.YGT55Q.niLqiMqhIWKpkrd9DBvq0IAT3wc')
