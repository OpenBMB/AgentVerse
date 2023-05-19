import GetValue from '../../utils/object/GetValue.js';
import LoadMethods from './LoadMethods.js';

class PageLoader {
    constructor(config) {
        this.items = [];
        this.startIndex = 0;
        this.pageIndex = 0;
        this.isFullPage = false;
        this.setItemCount(GetValue(config, 'itemCount', 100));
        this.setQuery(GetValue(config, 'query', undefined));
    }

    setItemCount(itemCount) {
        this.itemCount = itemCount;
        this.pageIndex = Math.floor(this.startIndex / itemCount);
        return this;
    }

    setQuery(query) {
        this.query = query;
        return this;
    }

    getItem(i) {
        return this.items[i - this.startIndex];
    }

    findFirst(key, value) {
        for (var i, cnt = this.items.length; i < cnt; i++) {
            if (this.items[i].get(key) === value) {
                return i + this.startIndex;
            }
        }
        return -1;
    }

}

Object.assign(
    PageLoader.prototype,
    LoadMethods
);

export default PageLoader;