const Discord = require('discord.js')
const bot = new Discord.Client()
const {TOKEN} = require('./config')
const command = require('./command')

bot.login(TOKEN)

bot.on('ready', function () {
    console.log("Starting bot")
    command(bot,'ping',(message) => {
        message.channel.send("Pong !")
    })
    command(bot,'reload', () => {
        process.exit(1)
    })
    command(bot,'status', (message) => {
      message.channel.send("Je suis actif !")
    })
})



