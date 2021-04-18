const {PREFIX} = require('./config')

/*
    const sender = message.author
    const cont = message.content.slice(PREFIX.length).split(" ")
    const args = cont.slice(1)
    const cmd = cont.shift().toUpperCase()

*/
module.exports = (client, aliases ,callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }

    client.on('message', message => {
        try {
            if (message.member.roles.cache.find(r => r.name === "Admin")) {
                const { content } = message
                aliases.forEach(alias => {
                    const cmd = `${PREFIX}${alias}`
                    if (content.startsWith(`${cmd}`) || content === cmd) {
                        console.log(`Running the command ${cmd}`)
                        callback(message)
                    }
                })
            } else {
                //Nothing
            }
        } catch(error) {
        }
    })
}