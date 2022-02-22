"use strict";
class WallGroup extends Entity {
    constructor(universe, pos, imageCollidable, imageVisualFloorAndWalls) {
        var name = WallGroup.name + imageCollidable.name;
        var collidableImageSizeInPixels = imageCollidable.sizeInPixels;
        var collidableImageAsDisplay = Display2D.fromImage(imageCollidable);
        var collidableMapCellSource = new MapOfCellsCellSourceDisplay(collidableImageAsDisplay, () => new MapCellObstacle(), (cell, color) => cell.isBlocking = (color.value() <= .5));
        var collidableMap = new MapOfCells(name, collidableImageSizeInPixels, Coords.ones(), // cellSize
        collidableMapCellSource);
        var collidableMapLocated = MapLocated2.fromMap(collidableMap);
        var collidable = Collidable.fromColliderAndCollideEntities(collidableMapLocated, WallGroup.collideEntities);
        var drawableVisual = VisualImageImmediate.fromImage(imageVisualFloorAndWalls);
        var drawable = Drawable.fromVisual(drawableVisual);
        var locatable = Locatable.fromPos(pos);
        super(name, [
            collidable,
            drawable,
            locatable
        ]);
    }
    static collideEntities(uwpe, c) {
        uwpe.universe.collisionHelper.collideEntitiesBackUpDistance(uwpe.entity, uwpe.entity2, 4 // hack - Has to be at least twice move speed.
        );
    }
}
class MapCellObstacle {
    constructor() {
        this.isBlocking = false;
    }
    // Clone.
    clone() { throw new Error("todo"); }
    overwriteWith(other) { throw new Error("todo"); }
}
