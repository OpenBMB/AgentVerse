import GetHexagonMap from './GetHexagonMap';
import GetTriangleMap from './GetTriangleMap';
import GetParallelogramMap from './GetParallelogramMap';

type Methods = {
    hexagon: typeof GetHexagonMap,
    triangle: typeof GetTriangleMap,
    parallelogram: typeof GetParallelogramMap
}

export default Methods;