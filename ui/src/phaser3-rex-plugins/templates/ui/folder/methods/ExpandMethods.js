export default {
    expand(duration) {
        if (this.expanded === true) {
            return this;
        }

        if (duration === undefined) {
            duration = this.transitionDuration;
        }

        this.expanded = true;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        this.show(child);

        var layoutTarget = (this.reLayoutTarget) ? this.reLayoutTarget : this.getTopmostSizer();
        layoutTarget.layout();

        title.emit('folder.expand', duration, this);
        child.emit('folder.expand', duration, this);
        this.emit('expand.start', this);

        this.childTransition
            .once('open', function () {
                this.emit('expand.complete', this);
            }, this)
            .requestOpen(null, duration);

        return this;
    },

    collapse(duration) {
        if (this.expanded === false) {
            return this;
        }

        if (duration === undefined) {
            duration = this.transitionDuration;
        }

        this.expanded = false;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        title.emit('folder.collapse', duration, this);
        child.emit('folder.collapse', duration, this);
        this.emit('collapse.start', this);

        this.childTransition
            .once('close', function () {
                this.setChildScale(child, 1, 1).hide(child);

                var layoutTarget = (this.reLayoutTarget) ? this.reLayoutTarget : this.getTopmostSizer();
                layoutTarget.layout();

                this.emit('collapse.complete', this);
            }, this)
            .requestClose(null, duration);

        return this;
    },

    toggle(duration) {
        if (this.expanded) {
            this.collapse(duration);
        } else {
            this.expand(duration);
        }

        return this;
    }
}