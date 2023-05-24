import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import ObjBank from './ObjBank.js';

const uidKey = ObjBank.uidKey;

class GraphItemData extends ComponentBase {
    constructor(parent, uid) {
        super(parent, { eventEmitter: false });

        ObjBank.add(this, uid); // uid is stored in `this.$uid`
        this.graph = null;
        this.type = undefined;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        if (this.graph) {
            this.graph.remove(this[uidKey]);
        }
        ObjBank.remove(this[uidKey]);
        this.setGraph(null);

        super.shutdown(fromScene);
    }

    setGraph(graph) {
        this.graph = graph;
        if (!graph) {
            this.setType(undefined);
        }
        return this;
    }

    setType(type) {
        if (typeof (type) === 'string') {
            type = OBJTYPE[type];
        }
        this.type = type;
        return this;
    }

    get isVertex() {
        return ((!!this.graph) && (this.type === 0));
    }

    get isEdge() {
        return ((!!this.graph) && (this.type === 1));
    }
}

var methods = {
};
Object.assign(
    GraphItemData.prototype,
    methods
);

const OBJTYPE = {
    vertex: 0,
    edge: 1,
}
export default GraphItemData;