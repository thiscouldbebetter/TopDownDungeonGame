
class WallGroup extends Entity
{
	constructor(universe: Universe, pos: Coords, image: Image2)
	{
		var name = WallGroup.name + image.name;
		var collidableImageSizeInPixels = image.sizeInPixels;
		var collidableImageAsDisplay =
			Display2D.fromImage(image);
		var collidableMapCellSource = new MapOfCellsCellSourceDisplay
		(
			collidableImageAsDisplay,
			() => new MapCellObstacle(),
			(cell: MapCellObstacle, color: Color) =>
				cell.isBlocking = (color.value() <= .5)
		);
		var collidableMap =
			new MapOfCells
			(
				name,
				collidableImageSizeInPixels,
				Coords.ones(), // cellSize
				collidableMapCellSource
			);
		var collidableMapLocated =
			MapLocated2.fromMap(collidableMap);
		var collidable = Collidable.fromColliderAndCollideEntities
		(
			collidableMapLocated, WallGroup.collideEntities
		);

		var drawableVisual = VisualImageImmediate.fromImage
		(
			image
		);
		var drawable = Drawable.fromVisual(drawableVisual);

		var locatable = Locatable.fromPos(pos);

		super
		(
			name,
			[
				collidable,
				drawable,
				locatable
			]
		);
	}

	static collideEntities(uwpe: UniverseWorldPlaceEntities, c: Collision): void
	{
		uwpe.universe.collisionHelper.collideEntitiesBackUpDistance
		(
			uwpe.entity, uwpe.entity2, 4 // hack - Has to be at least twice move speed.
		);
	}

}

class MapCellObstacle implements MapCell
{
	isBlocking: boolean;

	constructor()
	{
		this.isBlocking = false;
	}

	// Clone.

	clone(): MapCellObstacle { throw new Error("todo"); }
	overwriteWith(other: MapCellObstacle): MapCellObstacle { throw new Error("todo"); }
}