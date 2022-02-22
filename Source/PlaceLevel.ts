
class PlaceLevel extends PlaceZoned
{
	image: Image2;

	zones: Zone[];
	zonesByName: Map<string, Zone>;

	sizeInZones: Coords;

	constructor
	(
		name: string,
		size: Coords,
		sizeInZones: Coords,
		player: Player
	)
	{
		super
		(
			name,
			PlaceLevel.defnBuild().name,
			size,
			"Player", // entityToFollowName,
			(zoneName: string) =>
			{
				return this.zonesByName.get(zoneName);
			},
			// zoneAtPos
			(posToCheck: Coords) =>
			{
				return this.zones.find(x => x.bounds.containsPointXY(posToCheck));
			}
		);

		this.sizeInZones = sizeInZones;

		this.entityToSpawnAdd(player);

		var camera = Camera.fromEntitiesInViewSort
		(
			Camera.entitiesSortByRenderingOrderThenZThenY
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
		return new PlaceLevel
		(
			levelName,
			Coords.fromXY(800, 600), // size
			new Coords(2, 2, 1), // sizeInTiles
			new Player(Coords.fromXY(200, 150))
		);
	}

	initialize(uwpe: UniverseWorldPlaceEntities): void
	{
		var zoneSize = this.size.clone().divide(this.sizeInZones);

		var visualImageForLevelCollidable = new VisualImageFromLibrary
		(
			"Levels_" + this.name + "_Collidable"
		);

		var visualImageForLevelVisual = new VisualImageFromLibrary
		(
			"Levels_" + this.name + "_Visual"
		);

		var imageForLevelCollidable = 
			visualImageForLevelCollidable.image(uwpe.universe);
		var imageForLevelVisual =
			visualImageForLevelVisual.image(uwpe.universe);

		var imagesForZonesCollidable =
			imageForLevelCollidable.toTiles(this.sizeInZones);
		var imagesForZonesVisual =
			imageForLevelVisual.toTiles(this.sizeInZones);

		var zonePosInZones = Coords.create();

		var zones = new Array<Zone>();

		for (var y = 0; y < this.sizeInZones.y; y++)
		{
			zonePosInZones.y = y;

			for (var x = 0; x < this.sizeInZones.x; x++)
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

							var isNeighborInMapBounds =
								neighborPosInZones.isInRangeMaxExclusiveXY(this.sizeInZones);

							if (isNeighborInMapBounds)
							{
								var neighborName = neighborPosInZones.toStringXY();

								zonesAdjacentNames.push(neighborName);
							}
						}
					}
				}

				var zoneName = zonePosInZones.toStringXY();

				var imageForZoneCollidable =
					imagesForZonesCollidable[y][x];
				var imageForZoneVisual =
					imagesForZonesVisual[y][x];

				var zoneWallGroup = new WallGroup
				(
					uwpe.universe,
					zoneSize.clone().half(),
					imageForZoneCollidable,
					imageForZoneVisual
				);

				var zone = new Zone
				(
					zoneName,
					zoneBounds,
					zonesAdjacentNames,
					// entities
					[
						zoneWallGroup
					]
				);

				zones.push(zone);
			}
		}

		this.zones = zones;
		this.zonesByName = ArrayHelper.addLookupsByName(this.zones);
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
