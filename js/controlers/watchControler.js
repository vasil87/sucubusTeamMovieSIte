import * as data from 'data';
import { templatesLoader } from 'templatesLoader';
import { ClosestCinema } from 'closestCinema';

const $contentDiv = $('#content-container');

export function openNearestCinema() {
    templatesLoader.get('nearestCinema')
        .then(template => {
            $contentDiv.html(template());
        });
    let searchCinema = new ClosestCinema();
    searchCinema.fIndClosestCinema();
}