import { templatesLoader } from 'templatesLoader';
import * as requester from 'requester';

const $contentDiv = $('#content-container');
const url = "https://newsapi.org/v1/articles?source=mtv-news&sortBy=latest&apiKey=b63edb506c9a49659260630cd366c88b";

export function loadHome() {
    templatesLoader.get('home')
        .then(template => {
            return template;
        })
        .then(template => {
            let result = requester.getM(url);
            console.log(result);
            $contentDiv.html(template(result));
        });
}