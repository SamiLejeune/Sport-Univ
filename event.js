const botMessage = require('./bot-message');
const {MAP_CATEGORY_ID,MODIFY_OBJECT,EVENT_MANAGER} = require('./config')
class Event {
    constructor(title="",type=1,description="",location="",date="",status=1,createur="",accepted = [],declined = [], id = 0,channelId = "") {
        this.id = id
        this.status = status
        this.title = title;
        this.type = type;
        this.description = description;
        this.location = location;
        this.date = date;
        this.createur = createur
        this.accepted = accepted
        this.declined = declined
        this.channelId = channelId
    }

    show() {
        let desc = "Titre : " + this.title + "\n" + "Type : " + this.type + "\n" + "Description : " + this.description + "\n" + 
        "Lieu : " + this.location + "\n" + "Date : " + this.date + "\n" + "Createur : " + this.createur + "\n";
        console.log(desc)
    }

    addAccepted(person) {
        this.accepted.push(person)
    }

    addDeclined(person) {
        this.declined.push(person)
    }

    removeAccepted(person){
        for (var i = 0 ; i < this.accepted.length ; i++) {
            if (this.accepted[i]=== person) {
                this.accepted.splice(i,1)
            }
        }
    }

    removeDeclined(person){
        for (var i = 0 ; i < this.declined.length ; i++) {
            if (this.declined[i]=== person) {
                this.declined.splice(i,1)
            }
        }
    }
    /*Fonction permettant de créer le channel qui est spécifique à l'évenement
      Par défaut, personne ne peut voir ce salon, à part les admins et les encadrants    
    */
    createSpecificChannel(client) {
        let message = MODIFY_OBJECT.MESSAGE
        //CREATION DU CHANNEL DANS LA BONNE CATEGORIE
        message.guild.channels.create(this.title, {
            parent: MAP_CATEGORY_ID.get(this.type),
            permissionOverwrites: [
                {
                    id: '821674587481571388', //everyone
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: '821675698258706443', //admin
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: '821682296046354452', //encadrant
                    allow: ['VIEW_CHANNEL']
                },
            ]
        }).then(result => {
            //ENVOI DU MESSAGE EXPLICATIF
            let recap = "Bonjour !\nVous avez accès à ce channel étant donné que vous participez à l'évenement suivant :\n"
            recap+="Titre : " + this.title + "\n"
            recap+="Description : " + this.description + "\n"
            recap+="Createur : " + this.createur + "\n"
            recap+="Localisation de l'évenement : " + this.location + "\n" 
            recap+="Date de l'évenement : " + this.date + "\n"
            recap+="\nAinsi, vous pouvez discuter du prochain évenement avec les participants directement ici ^^'\nBon sport à vous et bon courage !"
            result.send(botMessage(client,result.id,recap))
            this.channelId = result.id
            EVENT_MANAGER.addEvent(this)
        })
    }
}

module.exports = Event;
