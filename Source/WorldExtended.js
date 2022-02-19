"use strict";
class WorldExtended extends World {
    constructor() {
        var placeLevel0 = PlaceLevel.demo("0");
        super("DungeonQuestGame", DateTime.now(), WorldExtended.defnBuild(), [
            placeLevel0
        ]);
    }
    static defnBuild() {
        return new WorldDefn([
            [
                UserInputListener.activityDefn()
            ],
            [
                PlaceLevel.defnBuild()
            ]
        ]);
    }
    toControl() {
        return new ControlNone();
    }
}
