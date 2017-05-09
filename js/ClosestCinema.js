import { constantManager } from 'constants';

class ClosestCinema {

    constructor() {
        this.cinemaNames = constantManager.getCinemasNames();
        this.locations = constantManager.getLocations();
        this.closestLocation = {};
    }

    fIndClosestCinema() {
        let cinemas = constantManager.getCinemas();

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