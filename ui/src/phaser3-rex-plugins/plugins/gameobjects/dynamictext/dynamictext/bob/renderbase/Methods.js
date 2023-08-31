import RenderMethods from './RenderMethods.js';
import Contains from './Contains.js';
import GetWorldPosition from './GetWorldPosition.js';

var Methods = {
    contains: Contains,
    getWorldPosition: GetWorldPosition,
}

Object.assign(
    Methods,
    RenderMethods
)

export default Methods;