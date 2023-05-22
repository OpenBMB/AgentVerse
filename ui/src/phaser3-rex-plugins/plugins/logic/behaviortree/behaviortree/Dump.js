import { BreadthFirstSearch } from './Traversal.js';
import { ACTION, COMPOSITE, DECORATOR } from '../constants.js';
import DeepClone from '../../../utils/object/DeepClone.js';
import { GetSerialNumber } from '../utils/CreateID.js'

var Dump = function () {
    var data = {
        sn: GetSerialNumber(),
        id: this.id,
        title: this.title,
        description: this.description,
        root: (this.root) ? this.root.id : null,
        properties: DeepClone(this.properties),
        nodes: [],
    };

    if (!this.root) {
        return data;
    }

    var nodes = [];
    BreadthFirstSearch(this.root, function (child) {
        nodes.push(child);
    })

    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var node = nodes[i];

        var spec = {
            id: node.id,
            name: node.name,
            title: node.title,
            description: node.description,
            properties: DeepClone(node.properties)
        };

        switch (node.category) {
            case COMPOSITE:
                spec.children = node.children.map((child) => child.id);

                if (node.services) {
                    spec.services = node.services.map((child) => child.id);
                }

                break;

            case DECORATOR:
                if (node.child) {
                    spec.child = node.child.id;
                }

                break;

            case ACTION:
                if (node.services) {
                    spec.services = node.services.map((child) => child.id);
                }

                break;
        }

        data.nodes.push(spec);
    }

    return data;
}

export default Dump;