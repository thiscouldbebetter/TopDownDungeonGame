
class WorldExtended extends World
{
	constructor()
	{
		var placeLevel0 = PlaceLevel.demo("0");

		var places =
		[
			placeLevel0
		];

		super
		(
			"DungeonQuestGame",
			DateTime.now(),
			WorldExtended.defnBuild(),
			(placeName: string) => places.find(x => x.name == placeName), // placeGetByName
			placeLevel0.name // placeInitial
		);
	}

	static defnBuild(): WorldDefn
	{
		return new WorldDefn
		([
			[
				UserInputListener.activityDefn()
			],
			[
				PlaceLevel.defnBuild()
			]
		]);
	}

	toControl(): ControlBase
	{
		return new ControlNone();
	}
}
