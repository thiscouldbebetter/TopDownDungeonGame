
class Player extends Entity
{
	constructor(pos: Coords)
	{
		var actor = Actor.fromActivityDefnName
		(
			UserInputListener.activityDefn().name
		);

		var drawable = Drawable.default();

		var locatable = Locatable.fromPos(pos.zSet(-1));

		var movable = Movable.fromSpeedMax(1);

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
				constrainable,
				drawable,
				locatable,
				movable
			]
		);
	}
}