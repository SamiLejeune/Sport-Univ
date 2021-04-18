class Event {
    constructor(title="",type=1,description="",location="",date="",status=1,createur="") {
        this.status = status
        this.title = title;
        this.type = type;
        this.description = description;
        this.location = location;
        this.date = date;
        this.createur = createur
    }

    show() {
        let desc = "Titre : " + this.title + "\n" + "Type : " + this.type + "\n" + "Description : " + this.description + "\n" + 
        "Lieu : " + this.location + "\n" + "Date : " + this.date + "\n" + "Createur : " + this.createur + "\n";
        console.log(desc)
    }
}

module.exports = Event;
