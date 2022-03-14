"use strict";
class WorldExtended extends World {
    constructor() {
        var placeLevel0 = PlaceLevel.demo("0");
        var places = [
            placeLevel0
        ];
        super("DungeonQuestGame", DateTime.now(), WorldExtended.defnBuild(), (placeName) => places.find(x => x.name == placeName), // placeGetByName
        placeLevel0.name // placeInitial
        );
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
