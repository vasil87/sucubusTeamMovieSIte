class MyRouter {
    constructor() {
        //we use array to push all url that we have
        this._routes = [];
    }

    on(url, callback) {
        //push the url and the callback in the array;
        //return this gives the ability to chain
        this._routes.push({ targetUrl: url, callback: callback });
        return this;
    }

    navigate() {
        //this removes the # from the url 
        const currentUrl = location.hash.slice(2);

        for (const { targetUrl, callback }
            of this._routes) {
            const params = MyRouter.matchUrls(currentUrl, targetUrl);
            if (params) {
                callback(params);
                break;
            }
        }
    }

    //check if onUrl and the current url match 
    static matchUrls(currentUrl, targetUrl) {
        //split currentUrl on /
        const currentUrlWords = currentUrl.split(/\//g);
        //split targetUrl on /
        const targetUrlWord = targetUrl.split(/\//g);

        //if target and current are with differen length return false -> no match
        if (targetUrlWord.length !== currentUrlWords.length) {
            return false;
        }

        //params wich we need 
        const params = {};
        const len = currentUrlWords.length;

        //we need to check every word from both target and current url for match 
        //if all match we will return params if any else will return empty object 
        for (let i = 0; i < len; i += 1) {
            if (targetUrlWord[i][0] !== ':') {
                if (currentUrlWords[i] !== targetUrlWord[i]) {
                    return false;
                }
            } else {
                const paramName = targetUrlWord[i].slice(1);
                params[paramName] = decodeURIComponent(currentUrlWords[i]);
            }
        }

        return params;
    }
}

export { MyRouter };