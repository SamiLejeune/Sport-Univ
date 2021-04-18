const Discord = require('discord.js')
const bot = new Discord.Client()
const {TOKEN,SPORTS,CREATING} = require('./config')
const command = require('./command')
const botMessage = require('./bot-message')
const Event = require('./event')
const listening = require('./listener-dm')

bot.login(TOKEN)

bot.on('ready', function () {
    //let eve = new Event("Basket 1v1","Basket","Petit basket 1v1","Parc du Héron","16/04/2021 à 15h00")
    console.log("Starting bot")
    listening(bot)
    command(bot,'ping',(message) => {
        message.channel.send("Pong !")
    })
    command(bot,'reload', () => {
        process.exit(1)
    })
    command(bot,'rl', () => {
        process.exit(1)
    })
    command(bot,'status', (message) => {
      message.channel.send("Je suis actif !")
    })
    command(bot,'test', (message) => {
        botMessage(bot, '826957028597301268','Let\'s go',['✅','❌'])
    })
    command(bot,'event',(message) => {
        if (message.channel.type === 'dm') {
        } else {
            let i = 1
            let choiceType = ""
            SPORTS.forEach(e => choiceType += i++ + ". " + e + "\n")
            const embed = new Discord.MessageEmbed().setTitle("Choisissez le type de l'évenement : ").setDescription(choiceType)
            message.author.send(embed)
            //Permet de stocker le fait qu'une personne a commencé à créer un évenement
            let event = new Event()
            event.createur = message.member.nickname
            CREATING.set(message.author,event)
        }
    }
    )
})



