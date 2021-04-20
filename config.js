const EventManager = require("./event-manager");

exports.TOKEN="";
exports.PREFIX="!";
exports.SPORTS= ['Football','Basketball','Running','Tennis','Skatepark']
exports.CREATING= new Map()
exports.EVENT_MANAGER = new EventManager()
const TYPE_CHANNEL = [["Football","826957028597301268"],["Basketball","826957028597301268"],["Running","826957028597301268"],["Skatepark","826957028597301268"],["Tennis","826957028597301268"]]
exports.MAP_CHANNEL_TYPE_EVENt = new Map(TYPE_CHANNEL)