/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Polygon from './Polygon.js';
import Clone from './Clone.js';
import Contains from './Contains.js';
import ContainsPoint from './ContainsPoint.js';
import GetAABB from './GetAABB.js';
import GetNumberArray from './GetNumberArray.js';
import GetPoints from './GetPoints.js';
import Perimeter from './Perimeter.js';
import Reverse from './Reverse.js';
import Smooth from './Smooth.js';

Polygon.Clone = Clone;
Polygon.Contains = Contains;
Polygon.ContainsPoint = ContainsPoint;
Polygon.GetAABB = GetAABB;
Polygon.GetNumberArray = GetNumberArray;
Polygon.GetPoints = GetPoints;
Polygon.Perimeter = Perimeter;
Polygon.Reverse = Reverse;
Polygon.Smooth = Smooth;

export default Polygon;
