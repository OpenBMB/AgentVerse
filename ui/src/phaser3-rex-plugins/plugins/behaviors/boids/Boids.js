import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import AddSeparationForce from './AddSeparationForce.js';
import AddAlignmentForce from './AddAlignmentForce.js';
import AddCohesionForce from './AddCohesionForce.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;

class Boids extends ComponentBase {
    constructor(parent, config) {
        super(parent, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this.output = new Vector2();
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setSeparationParameters(GetValue(o, 'separation.weight', 0), GetValue(o, 'separation.distance', Infinity));
        this.setCohesionParameters(GetValue(o, 'cohesion.weight', 0), GetValue(o, 'cohesion.distance', Infinity));
        this.setAlignmentParameters(GetValue(o, 'alignment.weight', 0), GetValue(o, 'alignment.distance', Infinity));
        return this;
    }

    setSeparationParameters(weight, distance) {
        this.separationWeight = weight;
        this.separationDistance = distance;
        return this;
    }

    setCohesionParameters(weight, distance) {
        this.cohesionWeight = weight;
        this.cohesionDistance = distance;
        return this;
    }

    setAlignmentParameters(weight, distance) {
        this.alignmentWeight = weight;
        this.alignmentDistance = distance;
        return this;
    }

    update(neighbors) {
        this.output.reset();
        AddSeparationForce(this.parent, neighbors, this.separationWeight, this.separationDistance, this.output);
        AddCohesionForce(this.parent, neighbors, this.cohesionWeight, this.cohesionDistance, this.output);
        AddAlignmentForce(this.parent, neighbors, this.alignmentWeight, this.alignmentDistance, this.output);
        return this;
    }

    addSeparationForce(neighbors, separationWeight, separationDistance, output) {
        if (separationWeight === undefined) {
            separationWeight = this.separationWeight;
        }
        if (separationDistance === undefined) {
            separationDistance = this.separationDistance;
        }
        AddSeparationForce(this.parent, neighbors, separationWeight, separationDistance, output);
        return this;
    }

    addAlignmentForce(neighbors, alignmentWeight, output) {
        if (alignmentWeight === undefined) {
            alignmentWeight = this.alignmentWeight;
        }
        AddAlignmentForce(this.parent, neighbors, alignmentWeight, output);
        return this;
    }

    addCohesionForce(neighbors, cohesionWeight, cohesionDistance, output) {
        if (cohesionWeight === undefined) {
            cohesionWeight = this.cohesionWeight;
        }
        if (cohesionDistance === undefined) {
            cohesionDistance = this.cohesionDistance;
        }
        AddCohesionForce(this.parent, neighbors, cohesionWeight, cohesionDistance, output);
        return this;
    }
}

export default Boids;