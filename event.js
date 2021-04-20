class Event {
    constructor(title="",type=1,description="",location="",date="",status=1,createur="",accepted = [],declined = [], id = 0) {
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
}

module.exports = Event;
