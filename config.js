const EventManager = require("./event-manager");

exports.TOKEN="";
exports.PREFIX="!";
exports.SPORTS= ['Football','Basketball','Running','Tennis','Skatepark']
exports.CREATING= new Map()
exports.EVENT_MANAGER = new EventManager()
const TYPE_CHANNEL = [["Football","824213420655247390"],["Basketball","824213676213927986"],["Running","825424689454645259"],["Skatepark","824215985950162994"],["Tennis","824213693821747200"]]
const CATEGORY_ID = [["Football","821742706275254312"],["Basketball","831071015328546868"],["Running","831070971859304478"],["Skatepark","829359983945580614"],["Tennis","831070885175230474"]]
exports.MAP_CHANNEL_TYPE_EVENt = new Map(TYPE_CHANNEL)
exports.MAP_CATEGORY_ID = new Map(CATEGORY_ID)

var MODIFY_OBJECT = {
    MESSAGE : ""
}

exports.MODIFY_OBJECT = MODIFY_OBJECT;