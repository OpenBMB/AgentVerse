import * as Nodes from '../nodes';
import { GetSerialNumber, SetSerialNumber } from '../utils/CreateID.js'

var Load = function (data, names) {
    var sn = data.sn;
    if (sn != null) {
        SetSerialNumber(Math.max(GetSerialNumber(), sn))
    }

    names = names || {};

    this.title = data.title || this.title;
    this.description = data.description || this.description;
    this.properties = data.properties || this.properties;

    var nodeData = data.nodes;
    var nodes = {};
    for (var i = nodeData.length - 1; i >= 0; i--) {
        // Create nodes from bottom to top
        var spec = nodeData[i],
            className = spec.name;

        var Cls;
        if (className in names) {
            // Look for the name in custom nodes
            Cls = names[className];
        } else if (className in Nodes) {
            // Look for the name in default nodes
            Cls = Nodes[className];
        } else {
            // Invalid node name
            throw new EvalError(`BehaviorTree.load: Invalid node name "${className}".`);
        }

        var config = {};
        if (spec.hasOwnProperty('children')) {
            config.children = spec.children;
        }
        if (spec.hasOwnProperty('child')) {
            config.child = spec.child;
        }
        if (spec.hasOwnProperty('services')) {
            config.services = spec.services;
        }

        config = Object.assign(
            config,
            spec.properties,
        )

        var node = new Cls(config, nodes);
        node.id = spec.id || node.id;
        node.title = spec.title || node.title;
        node.description = spec.description || node.description;
        node.properties = spec.properties || node.properties;

        nodes[node.id] = node;
    }

    this.root = nodes[data.root];

    return this;
}

export default Load;