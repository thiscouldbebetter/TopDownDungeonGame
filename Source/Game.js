"use strict";
class Game {
    constructor(contentDirectoryPath) {
        this.contentDirectoryPath = contentDirectoryPath;
    }
    main() {
        // It may be necessary to clear local storage to prevent errors on
        // deserialization of existing saved items after the schema changes.
        // localStorage.clear();
        var mediaFilePaths = this.mediaFilePathsBuild();
        var mediaLibrary = MediaLibrary.fromFilePaths("../Content/", mediaFilePaths);
        var displaySizesAvailable = [
            new Coords(400, 300, 1),
            new Coords(640, 480, 1),
            new Coords(800, 600, 1),
            new Coords(1200, 900, 1),
            // Wrap.
            new Coords(200, 150, 1),
        ];
        var display = new Display2D(displaySizesAvailable, new FontNameAndHeight("Font", 10), Color.byName("Gray"), Color.byName("White"), // colorFore, colorBack
        null);
        var timerHelper = new TimerHelper(20);
        var controlBuilder = ControlBuilder.default();
        var worldCreator = WorldCreator.fromWorldCreate(() => new WorldExtended());
        var universe = Universe.create("Game", "0.0.0-20220219-0000", // version
        timerHelper, display, mediaLibrary, controlBuilder, worldCreator);
        universe.initialize(() => { universe.start(); });
    }
    mediaFilePathsBuild() {
        var contentDirectoryPath = this.contentDirectoryPath;
        var fontDirectoryPath = contentDirectoryPath + "Fonts/";
        var imageDirectoryPath = contentDirectoryPath + "Images/";
        var imageTitlesDirectoryPath = imageDirectoryPath + "Titles/";
        var soundEffectDirectoryPath = contentDirectoryPath + "Audio/Effects/";
        var soundMusicDirectoryPath = contentDirectoryPath + "Audio/Music/";
        var textStringDirectoryPath = contentDirectoryPath + "Text/";
        var videoDirectoryPath = contentDirectoryPath + "Video/";
        var levelsDirectoryPath = imageDirectoryPath + "Levels/";
        var moversDirectoryPath = imageDirectoryPath + "Movers/";
        var mediaFilePaths = [
            imageTitlesDirectoryPath + "Opening.png",
            imageTitlesDirectoryPath + "Producer.png",
            imageTitlesDirectoryPath + "Title.png",
            levelsDirectoryPath + "0/Collidable.png",
            levelsDirectoryPath + "0/Visual.png",
            moversDirectoryPath + "Pawn-Gray.png",
            soundEffectDirectoryPath + "Sound.wav",
            soundMusicDirectoryPath + "Music.mp3",
            soundMusicDirectoryPath + "Producer.mp3",
            soundMusicDirectoryPath + "Title.mp3",
            videoDirectoryPath + "Movie.webm",
            fontDirectoryPath + "Font.ttf",
            textStringDirectoryPath + "Instructions.txt",
        ];
        return mediaFilePaths;
    }
}
