const Discord = require('discord.js')

module.exports = (evenement) => {
    const embed = new Discord.MessageEmbed()
    embed.setTitle(evenement.title)
    embed.setTimestamp(new Date())
    embed.setAuthor(evenement.id)
    embed.addField("Type de l'évenement", evenement.type)
    embed.addField("Lieu", evenement.location)
    embed.addField("Date", evenement.date)
    embed.setDescription(evenement.description)
    embed.setFooter("Crée par " + evenement.createur)
    let acc = ""
    let dec = ""
    evenement.accepted.forEach(e => {acc+= e + "\n"})
    evenement.declined.forEach(e => {dec+= e + "\n"})
    if (acc == "") acc = "-"
    if (dec == "") dec = "-"
    embed.addField("Accepted", acc, true)
    embed.addField("Declined", dec, true)
    return embed
}