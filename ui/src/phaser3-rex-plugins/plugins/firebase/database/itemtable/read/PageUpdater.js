import BaseUpdater from './BaseUpdater.js';
import RowUpdater from './RowUpdater.js';

class PageUpdater extends BaseUpdater {
    constructor(config) {
        super(config);
    }

    startUpdate() {
        this.rootRef.on('child_added', this.addPage, this);
        this.rootRef.on('child_removed', this.removePage, this);
        return this;
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addPage, this);
        this.rootRef.off('child_removed', this.removePage, this);
        return this;
    }

    addPage(snapshot) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setData(key, value);

        this.emit(this.eventNameMap.addkey0, key, value);
    }

    removePage(snapshot) {
        var key = snapshot.key;
        this.removeChild(key);

        this.emit(this.eventNameMap.removekey0, key);
    }

    get childClass() {
        return RowUpdater;
    }
}

export default PageUpdater;