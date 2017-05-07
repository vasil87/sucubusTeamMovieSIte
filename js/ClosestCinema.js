class ClosestCinema {

    constructor() {
        this.cinemaNames = {
            ParkCenterSofia: "http://kino.bg/mobile/programme/theater/theaterId/22",
            MallOfSofia: "http://kino.bg/mobile/programme/theater/theaterId/5",
            ArenaSofiaWest: "http://kino.bg/mobile/programme/theater/theaterId/7",
            BulgariaMall: "http://kino.bg/mobile/programme/theater/theaterId/19",
            ArenaMladost: "http://kino.bg/mobile/programme/theater/theaterId/6",
            ParadiseCenter: "http://kino.bg/mobile/programme/theater/theaterId/20",
            TheMall: "http://kino.bg/mobile/programme/theater/theaterId/8"
        }

        this.locations = {
            ParkCenterSofia: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6e63153c1d7c6200!2sPark+Center+Sofia!5e0!3m2!1sen!2sbg!4v1493300501185",
            MallOfSofia: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46918.29301495382!2d23.31595200813481!3d42.69539201543781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x469a377d552251e0!2sMall+Of+Sofia!5e0!3m2!1sen!2sbg!4v1493300702787",
            ArenaSofiaWest: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb975176565a32584!2sArena+-+Sofia+West!5e0!3m2!1sen!2sbg!4v1493299941067",
            BulgariaMall: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1f7afd1f0e07f9b2!2sBulgaria+Mall!5e0!3m2!1sen!2sbg!4v1493300647248",
            ArenaMladost: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46943.265816061576!2d23.325565045244193!3d42.66232777510358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbeb112d1042d0ab3!2sArena+Mladost!5e0!3m2!1sen!2sbg!4v1493300780457",
            ParadiseCenter: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46915.5287065136!2d23.254325573808643!3d42.69905071624422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x968e1b14857aa12d!2sParadise+Center!5e0!3m2!1sen!2sbg!4v1493300601978",
            TheMall: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46943.41008501763!2d23.326149677210942!3d42.662136701410155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x86473ac52d6dfadb!2z0KLQtdGF0L3QvtC_0L7Qu9C40YEgVGhlTWFsbA!5e0!3m2!1sen!2sbg!4v1493300823977"
        }

        this.closestLocation = {};
    }

    fIndClosestCinema() {

        let cinemas = (function getCinemas() {

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

            let cinemas = [];
            cinemas.push(theMall, paradiseCenter, arenaMladost, bulgariaMall, arenaSofiaWest, mallOfSofia, parkCenterSofia);
            return cinemas;
        })();

        // {lat:42.6923348,long:23.3134108}
        // {lat:42.6514364,long:23.3765614}
        // {lat:42.661863,long:23.3143247}
        // {lat:42.6566932,long:23.3188958}
        // {lat:42.6760466,long:23.2864641}

        let myPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                resolve(pos);
            })
        });

        function calculateDistance(firstLocation, secondLocation) {
            let latDif = (secondLocation.lat - firstLocation.lat);
            let longDif = (secondLocation.long - firstLocation.long);
            let distance = Math.sqrt((latDif * latDif) + (longDif * longDif));
            return distance;
        }

        function getClosestCinema(myLocation) {
            let minDistance;
            let closestCinema;

            cinemas.forEach(cinema => {
                let currentDistance = calculateDistance(myLocation, cinema);

                if (minDistance == undefined || currentDistance < minDistance) {
                    minDistance = currentDistance;
                    closestCinema = cinema;
                }
            })

            return closestCinema;
        }

        function parseLocation(pos) {

            let resultLocation = {};
            resultLocation.lat = pos.coords.latitude;
            resultLocation.long = pos.coords.longitude;

            return resultLocation;
        }

        myPromise
            .then(parseLocation)
            .then(currentLocation => {
                this.closestLocation = getClosestCinema(currentLocation);
                return this.closestLocation;
            })
            .then(result => {
                let url = this.cinemaNames[result.name];
                let loc = this.locations[result.name];

                return {
                    u: url,
                    loc: loc
                }
            })
            .then(resultObject => {
                let iframe = document.getElementById("inner-site");
                iframe.src = resultObject.u;
                let iframeLocation = document.getElementById("right-site");
                iframeLocation.src = resultObject.loc;
            })
    }
}

export { ClosestCinema };