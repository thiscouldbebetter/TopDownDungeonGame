
class Player extends Entity
{
	constructor(pos: Coords)
	{
		var actor = Actor.fromActivityDefnName
		(
			UserInputListener.activityDefn().name
		);

		var animatable = Animatable2.default();

		var collidable = Collidable.fromColliderAndCollideEntities
		(
			Box.fromSize(Coords.ones().multiplyScalar(2)),
			Collidable.collideEntitiesLog
		);

		var drawableVisual = new VisualDeferred
		(
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				var visualImageSource =
					new VisualImageFromLibrary("Movers_Pawn-Gray");

				var imageSource = visualImageSource.image(uwpe.universe);
				var imageSourceSizeInTiles = Coords.fromXY(4, 4);
				var imageSourceSizeInPixels = imageSource.sizeInPixels;
				var tileSizeInPixels =
					imageSourceSizeInPixels.clone().divide(imageSourceSizeInTiles);
				var tileSizeToDraw = tileSizeInPixels.clone().half();

				var visualBuilder = VisualBuilder.Instance();

				var returnValue = visualBuilder.directionalAnimationsFromTiledImage
				(
					visualImageSource,
					imageSource,
					imageSourceSizeInTiles,
					tileSizeToDraw
				);

				return returnValue;
			}
		);
		var drawable =
			Drawable.fromVisualAndRenderingOrder(drawableVisual, -1);

		var locatable = Locatable.fromPos(pos);

		var movable = Movable.fromSpeedMax(2);

		var constrainable = new Constrainable
		([
			new Constraint_Stop(),
			movable.toConstraint(),
			new Constraint_TrimToPlaceSizeXY()
		]);

		super
		(
			Player.name,
			[
				actor,
				animatable,
				collidable,
				constrainable,
				drawable,
				locatable,
				movable
			]
		);
	}
}