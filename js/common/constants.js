class ConstantsManager {
    getWords() {
        const keyWords = ["hero", "last", "ball", "sport", "flower", "thor", "superman", "justice",
            "the", "one", "two", "now", "you", "see", "kill", "die", "reborn", "regeneration", "degeneration", "power", "air",
            "earth", "magic", "spell", "show", "shot", "family", "shot", "store", "tears", "joy", "furious", "fast",
            "river", "pray", "music", "kingdom", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
            "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "edge", "tommorow", "yesterday", "house", "smile",
            "laser", "spider", "man", "super", "sun", "genious", "smart", "movie", "ghost", "shell", "plastic", "skin", "live",
            "pirates", "pirate", "drink", "rage", "against", "civil", "war", "captain", "white", "yellow",
            "green", "red", "blue", "pink", "black", "purple", "orange",
            "user", "plot", "type", "title", "year", "season", "episode", "actors", "celebrities", "events", "comedy",
            "horror", "action", "adventure", "animation", "war", "romance", "war", "post", "die", "hard", "never", "surrender", "prince",
            "reasons", "why", "guardians", "riddick", "harry", "Los", "Babylon", "xXx", "Pitch Black", "blood", "bone", "slaive"
            // "football", "cash", "money", "sex", "guns", "lord", "rings", "of", "on", "out", "to", "let", "dogs", "dog", "dog`s", "hell",
            // "heaven", "boy", "blade", "runner", "smile", "age", "avengers", "transformers", "cars", "car", "truck", "trucks",
            // "airplane", "airplanes", "flight", "danger", "scary", "redemtion", "ressurection", "beginning", "end", "final",
            // "fetch", "style", "300", "7", "2", "3", "1", "12", "17", "23", "1000", "words", "cop", "hills",
            // "Let's Be Cops", "The Final Girls", "The Tourist", "Transcendence", "Money Monster", "money", "monster",
            // "Mirror mirror", "King", "Arthur", "Alien", "Annabelle", "Despicable", "Me", "Cars 3", "Everything", "Wanted", "Smith",
            // "Bonnie", "Dogs", "Labyrinth", "Doctor", "Ted", "And", "hunter", "first", "second", "third", "Millionaire", "return",
            // "Beauty", "Beast", "John", "wall", "angry", "happy", "excited", "men", "man", "women", "woman", "Bill", "Mountain",
            // "Bridge", "all", "President", "Young", "old", "Famous", "almost", "Holy", "Lion", "Bull", "Poppins", "day", "North", "West",
            // "by", "story", "Sunset", "dark", "bright", "Mind", "Eternal", "Driver", "kid", "child", "children", "good", "bad", "will", "be",
            // "am", "are", "is", "about", "big", "small", "park", "window", "door", "Usual", "like", "hate", "some", "any", "hot", "cold",
            // "Private", "Titanic", "Matrix", "toy", "Fight", "Shining", "when", "or", "but", "how", "stop", "start", "American", "Empire",
            // "back", "Strike", "Bride", "Princess", "Over", "Nest", "Graduate", "Breakfast", "lunch", "dinner", "rain", "sound", "Silence",
            // "town", "city", "life", "Wonderful", "Hall", "Apocalypse", "wind", "Lost", "Future", "star", "space", "extra"
        ];

        return keyWords;
    }

    getLocations() {
        const cinemas = {
            ParkCenterSofia: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6e63153c1d7c6200!2sPark+Center+Sofia!5e0!3m2!1sen!2sbg!4v1493300501185",
            MallOfSofia: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46918.29301495382!2d23.31595200813481!3d42.69539201543781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x469a377d552251e0!2sMall+Of+Sofia!5e0!3m2!1sen!2sbg!4v1493300702787",
            ArenaSofiaWest: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb975176565a32584!2sArena+-+Sofia+West!5e0!3m2!1sen!2sbg!4v1493299941067",
            BulgariaMall: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1f7afd1f0e07f9b2!2sBulgaria+Mall!5e0!3m2!1sen!2sbg!4v1493300647248",
            ArenaMladost: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46943.265816061576!2d23.325565045244193!3d42.66232777510358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbeb112d1042d0ab3!2sArena+Mladost!5e0!3m2!1sen!2sbg!4v1493300780457",
            ParadiseCenter: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x968e1b14857aa12d!2sParadise+Center!5e0!3m2!1sen!2sbg!4v1493300601978",
            TheMall: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46943.41008501763!2d23.326149677210942!3d42.662136701410155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x86473ac52d6dfadb!2z0KLQtdGF0L3QvtC_0L7Qu9C40YEgVGhlTWFsbA!5e0!3m2!1sen!2sbg!4v1493300823977"
        }

        return cinemas;
    }

    getCinemasNames() {
        const locations = {
            ParkCenterSofia: "https://www.google.bg/search?q=%25http://kino.bg/mobile/programme/theater/theaterId/22&gws_rd=cr&ei=QnYQWeOcKYbD6QT8vILgBw",
            MallOfSofia: "https://www.google.bg/search?q=%25http://kino.bg/mobile/programme/theater/theaterId/5&gws_rd=cr&ei=NnYQWaXsDYbw6ASxiY2YDw",
            ArenaSofiaWest: "https://www.google.bg/search?q=%25http://kino.bg/mobile/programme/theater/theaterId/7&gws_rd=cr&ei=U3YQWYaPI4GR6ASc65XYBg",
            BulgariaMall: "https://www.google.bg/search?q=%25http://kino.bg/mobile/programme/theater/theaterId/19&gws_rd=cr&ei=X3YQWY6-MsOg6ATTyLGACQ",
            ArenaMladost: "https://www.google.bg/search?q=%25http://kino.bg/mobile/programme/theater/theaterId/6&gws_rd=cr&ei=cHYQWajEEsXt6ASet4noBg",
            ParadiseCenter: "https://www.google.bg/search?q=%25http://kino.bg/mobile/programme/theater/theaterId/20&gws_rd=cr&ei=e3YQWa2nIabP6ATX_pDwDg",
            TheMall: "https://www.google.bg/search?q=%25http://kino.bg/mobile/programme/theater/theaterId/8&gws_rd=cr&ei=iHYQWYN25troBIb2srAJ"
        }

        return locations;
    }

    getCinemas() {
        let parkCenterSofia = {
            name: "ParkCenterSofia",
            lat: 42.6789322,
            long: 23.318601
        };

        let mallOfSofia = {
            name: "MallOfSofia",
            lat: 42.6982035,
            long: 23.3063034
        };

        let arenaSofiaWest = {
            name: "ArenaSofiaWest",
            lat: 42.7050411,
            long: 23.2877785
        };

        let bulgariaMall = {
            name: "BulgariaMall",
            lat: 42.6643515,
            long: 23.2868163
        };

        let arenaMladost = {
            name: "ArenaMladost",
            lat: 42.6241931,
            long: 23.3742093
        };

        let paradiseCenter = {
            name: "ParadiseCenter",
            lat: 42.65862,
            long: 23.3136756
        };

        let theMall = {
            name: "TheMall",
            lat: 42.6610185,
            long: 23.3806639
        };

        const cinemas = [];
        cinemas.push(theMall, paradiseCenter, arenaMladost, bulgariaMall, arenaSofiaWest, mallOfSofia, parkCenterSofia);
        return cinemas;
    }
}

let constantManager = new ConstantsManager();

export { constantManager };