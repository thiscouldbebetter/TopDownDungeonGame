"use strict";
class WallGroup extends Entity {
    constructor(pos, image) {
        var collidableImageSizeInPixels = image.sizeInPixels;
        var collidableImageAsDisplay = Display2D.fromImage(image);
        var collidableMapCellSource = new MapOfCellsCellSourceDisplay(collidableImageAsDisplay);
        var collidableMap = 
        // MapOfCells.default();
        new MapOfCells(WallGroup.name, collidableImageSizeInPixels, Coords.ones(), // cellSize
        collidableMapCellSource);
        var collidableMapLocated = MapLocated.fromMap(collidableMap);
        var collidable = Collidable.fromColliderAndCollideEntities(collidableMapLocated, Collidable.collideEntitiesLog);
        var drawableVisual = VisualImageImmediate.fromImage(image);
        var drawable = Drawable.fromVisual(drawableVisual);
        var locatable = Locatable.fromPos(pos);
        super(WallGroup.name, [
            collidable,
            drawable,
            locatable
        ]);
    }
}
