import GetLines from './GetLines.js';
import SetContentMethods from './SetContentMethods.js';
import GetPageMethods from './GetPageMethods.js';
import ShowMethods from './ShowMethods.js';

var Methods = {   
    getLines: GetLines,
}

Object.assign(
    Methods,
    SetContentMethods,
    GetPageMethods,
    ShowMethods
);

export default Methods;