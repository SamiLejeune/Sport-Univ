const {CREATING,SPORTS,EVENT_MANAGER} = require('./config')
const Event = require('./event')
const botMessage = require('./bot-message')
const Discord = require('discord.js')

module.exports = async (client) => {
    let channel;
    client.on('message',(message) => {
        if(message.channel.type === 'dm' && !message.author.bot) {
            if (CREATING.get(message.author) != undefined) {
                let event = CREATING.get(message.author)
                let status = event.status
                channel = message.channel
                //message.author.send("Vous avez répondu " + message.content).catch(error => {})
                /*
                STEP 1 => TYPE
                STEP 2 => TITLE
                STEP 3 => DESCRIPTION
                STEP 4 => LOCATION
                STEP 5 => DATE
                */
                if (status === 1 && isValid(message.content,SPORTS.length)) {
                    event.type = SPORTS[message.content-1]
                    event.status = event.status + 1
                    CREATING.set(message.author,event)
                    const embed = new Discord.MessageEmbed().setTitle("Donnez le titre de l'évenement : ").setDescription("Exemple : Match 1v1..")
                    message.author.send(embed)
                } else if (status === 2) {
                    event.title = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author,event)
                    const embed = new Discord.MessageEmbed().setTitle("Donnez une description à votre évenement : ").setDescription("Exemple : (1h d'entraînement, 30 min de match) (RDV Gare Lille Europe)")
                    message.author.send(embed)
                } else if (status === 3) {
                    event.description = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author,event)
                    const embed = new Discord.MessageEmbed().setTitle("Définissez la localisation de l'évenement : ").setDescription("Exemple : lien google ou nom de l'endroit")
                    message.author.send(embed)
                } else if (status === 4) {
                    event.location = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author,event)
                    const embed = new Discord.MessageEmbed().setTitle("Choisissez une date : ").setDescription("Exemple : 19/04/2021 à 14h30")
                    message.author.send(embed)
                } else if (status === 5) {
                    event.date = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author,event)
                    const embed = new Discord.MessageEmbed()
                    embed.setTitle(event.title)
                    embed.setTimestamp(new Date())
                    embed.setAuthor(event.createur,message.author.avatarURL())
                    embed.addField("Type de l'évenement",event.type)
                    embed.addField("Lieu",event.location)
                    embed.addField("Date",event.date)
                    embed.setDescription(event.description)
                    embed.addField("OUI","Personne",true)
                    embed.addField("NON","Personne",true)
                    message.author.send("Confirmez-vous de vouloir créer cet évenement?")
                    botMessage(client,message.channel.id,embed,['✅','❌'])
                } else { }
            }
        }
    })
    client.on('messageReactionAdd',(reaction,user) => {
        const emoji = reaction._emoji.name
        const msg = reaction.message
        if (!user.bot) {
            if (emoji === '✅') {
                console.log("CREATION EVENT PUBLIC")
            } else if (emoji === '❌') {
                msg.delete()
                user.send("Vous avez supprimé l'évenement ✅")
            }
        }
    })
}

function isValid(str,maximum) {
    if (typeof str != "string") return false // we only process strings!  
    return str <= maximum
}