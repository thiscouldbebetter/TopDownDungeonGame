
class PlaceLevel extends PlaceZoned
{
	constructor
	(
		name: string,
		zones: Zone[]
	)
	{
		var zonesByName = ArrayHelper.addLookupsByName(zones);

		super
		(
			name,
			PlaceLevel.defnBuild().name,
			Box.create().containOthers(zones.map(x => x.bounds)).size,
			"Player", // entityToFollowName,
			zones[0].name, // zoneStartName
			// zoneGetByName
			(zoneName: string) =>
			{
				return zonesByName.get(zoneName);
			},
			// zoneAtPos
			(posToCheck: Coords) =>
			{
				return zones.find(x => x.bounds.containsPointXY(posToCheck));
			}
		);

		var zoneStart = this.zoneStart();
		var zoneStartCenter = zoneStart.bounds.center;
		var player = new Player(zoneStartCenter.clone());
		this.entityToSpawnAdd(player);

		var camera = Camera.fromEntitiesInViewSort
		(
			Camera.entitiesSortByZThenY
		);
		var cameraEntity = camera.toEntity();
		cameraEntity.constrainable().constraintAdd
		(
			new Constraint_Multiple
			([
				new Constraint_AttachToEntityWithName(Player.name),
				new Constraint_Transform
				(
					new Transform_Translate
					(
						new Coords(0, 0, 0 - camera.focalLength)
					)
				)
			])
		);
		this.entityToSpawnAdd(cameraEntity);

	}

	static demo(levelName: string): PlaceLevel
	{
		var zoneSize = Coords.fromXY(400, 300);

		var visualImageForLevel = new VisualImageFromLibrary
		(
			"Levels_" + levelName
		);

		var placeSizeInZones = Coords.fromXY(2, 2);

		var zonePosInZones = Coords.create();

		var zones = new Array<Zone>();

		for (var y = 0; y < placeSizeInZones.y; y++)
		{
			zonePosInZones.y = y;

			for (var x = 0; x < placeSizeInZones.x; x++)
			{
				zonePosInZones.x = x;

				var zoneBounds = Box.fromMinAndSize
				(
					zonePosInZones.clone().multiply(zoneSize), zoneSize
				);

				var zonesAdjacentNames = [];

				var neighborPosInZones = Coords.create();
				var neighborOffsetInZones = Coords.create();
				for (var yOffset = -1; yOffset <= 1; yOffset++)
				{
					neighborOffsetInZones.y = yOffset;

					for (var xOffset = -1; xOffset <= 1; xOffset++)
					{
						neighborOffsetInZones.x = xOffset;

						if (neighborOffsetInZones.magnitude() != 0)
						{
							neighborPosInZones.overwriteWith
							(
								neighborOffsetInZones
							).add
							(
								zonePosInZones
							);

							if (neighborPosInZones.isInRangeMaxExclusiveXY(placeSizeInZones))
							{
								var neighborName = neighborPosInZones.toStringXY();

								zonesAdjacentNames.push(neighborName);
							}
						}
					}
				}

				var zoneName = zonePosInZones.toStringXY();

				var zone = new Zone
				(
					zoneName,
					zoneBounds,
					zonesAdjacentNames,
					// entities
					[
						new WallGroup
						(
							zoneSize.clone().half(),
							new VisualImageScaledPartial
							(
								zoneBounds,
								zoneSize,
								visualImageForLevel
							)
						)
					]
				);

				zones.push(zone);
			}
		}

		var placeLevel0 = new PlaceLevel
		(
			"Level" + levelName,
			zones
		);

		return placeLevel0;

	}

	static defnBuild(): PlaceDefn
	{
		var actionDisplayRecorderStartStop =
			DisplayRecorder.actionStartStop();
		var actionShowMenu = Action.Instances().ShowMenuSettings;

		var actionAccelerateDown = Movable.actionAccelerateDown();
		var actionAccelerateLeft = Movable.actionAccelerateLeft();
		var actionAccelerateRight = Movable.actionAccelerateRight();
		var actionAccelerateUp = Movable.actionAccelerateUp();

		var actions =
		[
			actionDisplayRecorderStartStop,
			actionShowMenu,
			actionAccelerateDown,
			actionAccelerateLeft,
			actionAccelerateRight,
			actionAccelerateUp
		];

		var inputNames = Input.Names();

		var actionToInputsMappings =
		[
			new ActionToInputsMapping
			(
				actionDisplayRecorderStartStop.name, [ "~" ], true // inactivate
			),

			ActionToInputsMapping.fromActionNameAndInputName
			(
				actionShowMenu.name, inputNames.Escape
			)
		];

		actionToInputsMappings = actionToInputsMappings.concat
		(
			[
				[ actionAccelerateDown.name, inputNames.ArrowDown ],
				[ actionAccelerateLeft.name, inputNames.ArrowLeft ],
				[ actionAccelerateRight.name, inputNames.ArrowRight ],
				[ actionAccelerateUp.name, inputNames.ArrowUp ]
			].map
			(
				x =>
					ActionToInputsMapping.fromActionNameAndInputName
					(
						x[0], x[1]
					)
			)
		);

		var entityPropertyNamesToProcess: string[] =
		[
			Actor.name,
			Collidable.name,
			Constrainable.name,
			Locatable.name
		];

		return PlaceDefn.from5
		(
			PlaceLevel.name,
			"Music_Music", // soundForMusicName
			actions,
			actionToInputsMappings,
			entityPropertyNamesToProcess
		);
	}
}
