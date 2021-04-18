class EventManager {

    constructor() {
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event)
    }

    removeEvent(event) {
        for (var i = 0 ; i < this.events.length ; i++) {
            if (this.events[i] === event) {
                this.events.splice(i,1)
            }
        }
    }

    getSpecificType(type) {
        let rtn = new Map()
        for (var [key,value] of this.events) {
            if (key === type) {
                rtn.set(key,value)
            } 
        }
        return rtn;
    }
}

module.exports = EventManager