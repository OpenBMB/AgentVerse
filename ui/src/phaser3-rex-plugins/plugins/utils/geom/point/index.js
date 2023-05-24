/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Point from './Point.js';
import Ceil from './Ceil.js';
import Clone from './Clone.js';
import CopyFrom from './CopyFrom.js';
import Equals from './Equals.js';
import Floor from './Floor.js';
import GetCentroid from './GetCentroid.js';
import GetMagnitude from './GetMagnitude.js';
import GetMagnitudeSq from './GetMagnitudeSq.js';
import GetRectangleFromPoints from './GetRectangleFromPoints.js';
import Interpolate from './Interpolate.js';
import Invert from './Invert.js';
import Negative from './Negative.js';
import Project from './Project.js';
import ProjectUnit from './ProjectUnit.js';
import SetMagnitude from './SetMagnitude.js';

Point.Ceil = Ceil;
Point.Clone = Clone;
Point.CopyFrom = CopyFrom;
Point.Equals = Equals;
Point.Floor = Floor;
Point.GetCentroid = GetCentroid;
Point.GetMagnitude = GetMagnitude;
Point.GetMagnitudeSq = GetMagnitudeSq;
Point.GetRectangleFromPoints = GetRectangleFromPoints;
Point.Interpolate = Interpolate;
Point.Invert = Invert;
Point.Negative = Negative;
Point.Project = Project;
Point.ProjectUnit = ProjectUnit;
Point.SetMagnitude = SetMagnitude;

export default Point;
