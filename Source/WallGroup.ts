
class WallGroup extends Entity
{
	constructor(pos: Coords, visual: VisualBase)
	{
		super
		(
			WallGroup.name,
			[
				Drawable.fromVisual(visual),
				Locatable.fromPos(pos)
			]
		);
	}
}