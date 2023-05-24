class MainBoardReference {
    constructor(miniBoard) {
        this.miniBoard = miniBoard;
        this.set(null);
    }
    set(mainBoard, tileX, tileY) {
        if (!mainBoard) {
            mainBoard = null;
            tileX = null;
            tileY = null;
        }
        this.mainBoard = mainBoard;
        this.tileX = tileX;
        this.tileY = tileY;
    }
}
export default MainBoardReference;