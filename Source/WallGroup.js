"use strict";
class WallGroup extends Entity {
    constructor(pos, visual) {
        super(WallGroup.name, [
            Drawable.fromVisual(visual),
            Locatable.fromPos(pos)
        ]);
    }
}
