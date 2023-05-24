const FaceIndexMap = ['front', 'back'];

export default {
    enterPerspectiveMode() {
        if (this.isInPerspectiveMode) {
            return this;
        }

        // Set card's visible to true
        this.setChildVisible(this.perspectiveCard, true);
        // Snapshot front and back children to card's faces
        this.snapshotFace(0);
        this.snapshotFace(1);
        // Set front and back children's visible to false
        this.setChildVisible(this.childrenMap.front, false);
        this.setChildVisible(this.childrenMap.back, false);
        // Reset size of card
        this.perspectiveCard.setSize(this.width, this.height);

        return this;
    },

    exitPerspectiveMode() {
        if (!this.isInPerspectiveMode) {
            return this;
        }

        // Set card's visible to false
        this.setChildVisible(this.perspectiveCard, false);
        // Set front or back children's visible to true, according to card's face
        var isFrontFace = (this.perspectiveCard.face === 0);
        this.setChildVisible(this.childrenMap.front, isFrontFace);
        this.setChildVisible(this.childrenMap.back, !isFrontFace);

        return this;
    },

    setSnapshotPadding(padding) {
        this.snapshotPadding = padding;
        return this;
    },

    snapshotFace(face) {
        if (typeof (face) === 'number') {
            face = FaceIndexMap[face];
        }

        var cardFace = this.perspectiveCard.faces[face];
        var faceChild = this.childrenMap[face];

        cardFace.rt.clear();

        var faceChildVisibleSave = faceChild.visible;
        faceChild.visible = true;

        var gameObjects = (faceChild.isRexContainerLite) ? faceChild.getAllVisibleChildren() : faceChild;
        cardFace.snapshot(
            gameObjects,
            { padding: this.snapshotPadding }
        );

        faceChild.visible = faceChildVisibleSave;

        return this;
    }

}