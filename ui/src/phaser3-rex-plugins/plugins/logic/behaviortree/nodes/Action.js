import BaseNode from './BaseNode.js';
import { ACTION } from '../constants.js';

class Action extends BaseNode {

    constructor(
        {
            name = 'Action',
            title,
            properties,
            services,
        } = {},        
        nodePool
    ) {

        super({
            category: ACTION,
            name,
            title,
            properties,
        });

        if (services) {
            for (var i = 0, cnt = services.length; i < cnt; i++) {
                this.addService(services[i], nodePool);
            }
        }
    }

    addService(node, nodePool) {
        if (typeof (node) === 'string') {  // Node ID
            node = nodePool[node];
        }

        if (this.services === undefined) {
            this.services = [];
        }

        if (this.services.indexOf(node) === -1) {
            this.services.push(node);
            node.setParent(this);
        }

        return this;
    }

    _tick(tick) {
        tick._tickNode(this);

        if (this.services) {
            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
                this.services[i]._tick(tick);
            }
        }

        return this.tick(tick);
    }

};

export default Action;
