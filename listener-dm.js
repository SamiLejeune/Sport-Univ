const {CREATING,SPORTS,EVENT_MANAGER,MAP_CHANNEL_TYPE_EVENt} = require('./config')
const Event = require('./event')
const botMessage = require('./bot-message')
const Discord = require('discord.js')
const eventEmbed = require('./custom-embed-event')
module.exports = async (client) => {
    client.on('message',(message) => {
        if(message.channel.type === 'dm' && !message.author.bot) {
            if (CREATING.get(message.author.username) != undefined) {
                let event = CREATING.get(message.author.username)
                let status = event.status
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
                    CREATING.set(message.author.username,event)
                    const embed = new Discord.MessageEmbed().setTitle("Donnez le titre de l'évenement : ").setDescription("Exemple : Match 1v1..")
                    message.author.send(embed)
                } else if (status === 2) {
                    event.title = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author.username,event)
                    const embed = new Discord.MessageEmbed().setTitle("Donnez une description à votre évenement : ").setDescription("Exemple : (1h d'entraînement, 30 min de match) (RDV Gare Lille Europe)")
                    message.author.send(embed)
                } else if (status === 3) {
                    event.description = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author.username,event)
                    const embed = new Discord.MessageEmbed().setTitle("Définissez la localisation de l'évenement : ").setDescription("Exemple : lien google ou nom de l'endroit")
                    message.author.send(embed)
                } else if (status === 4) {
                    event.location = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author.username,event)
                    const embed = new Discord.MessageEmbed().setTitle("Choisissez une date : ").setDescription("Exemple : 19/04/2021 à 14h30")
                    message.author.send(embed)
                } else if (status === 5) {
                    event.date = message.content
                    event.status = event.status + 1
                    CREATING.set(message.author.username,event)
                    const embed = eventEmbed(event)
                    message.author.send("Confirmez-vous de vouloir créer cet évenement?")
                    botMessage(client,message.channel.id,embed,['✅','❌'])
                } else { }
            } else {
            }
        }
    })
    client.on('messageReactionAdd',(reaction,user) => {
        const emoji = reaction._emoji.name
        const msg = reaction.message
        if (msg.embeds.length != 0) {
            if (!user.bot && !channelReaction(msg.channel.id)) {
                if (emoji === '✅') {
                    console.log("CREATION EVENT PUBLIC")
                    let event = CREATING.get(user.username)
                    event.id = ""+ Math.floor(Math.random() * 1000000)
                    const channel = client.channels.cache.find(channel => channel.id === MAP_CHANNEL_TYPE_EVENt.get(event.type))
                    channel.send(botMessage(client,channel.id,eventEmbed(event),['✅','❌']))
                    EVENT_MANAGER.addEvent(event)
                } else if (emoji === '❌') {
                    msg.delete()
                    user.send("Vous avez supprimé l'évenement ✅")
                }
            } else if (!user.bot) {
                const embed = msg.embeds[0]
                const event = EVENT_MANAGER.getById(embed.author.name)
                if (emoji === '✅') {
                    event.addAccepted(user.username)
                    msg.edit(eventEmbed(event))
                    msg.reactions.resolve('❌').users.remove(user)
                } else if (emoji === '❌') {
                    event.addDeclined(user.username)
                    msg.edit(eventEmbed(event))
                    msg.reactions.resolve('✅').users.remove(user)
                }
            } else {
    
            }
        }
    })

    client.on('messageReactionRemove',(reaction,user) => {
        const emoji = reaction._emoji.name
        const msg = reaction.message
        if (msg.embeds.length != 0) {
            if (!user.bot) {
                const embed = msg.embeds[0]
                const event = EVENT_MANAGER.getById(embed.author.name)
                if (emoji === '✅') {
                    event.removeAccepted(user.username)
                    msg.edit(eventEmbed(event))
                } else if (emoji === '❌') {
                    event.removeDeclined(user.username)
                    msg.edit(eventEmbed(event))
                }
            }
        }
    })
}

function isValid(str,maximum) {
    if (typeof str != "string") return false // we only process strings!  
    return str <= maximum
}

function channelReaction(channelID) {
    for (const [key, value] of MAP_CHANNEL_TYPE_EVENt) {
        if(value === channelID) {
            return true
        }
    }
    return false
}
