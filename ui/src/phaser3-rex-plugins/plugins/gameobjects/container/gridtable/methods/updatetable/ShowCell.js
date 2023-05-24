var ShowCell = function (cell) {
    // Attach container to cell by cell.setContainer(container) under this event
    var reusedCellContainer = null;
    var cellContainer = cell.getContainer();
    if (cellContainer) {
        reusedCellContainer = cellContainer;
        cell.popContainer();
    } else if (this.cellContainersPool) {
        reusedCellContainer = this.cellContainersPool.getFirstDead();
        if (reusedCellContainer !== null) { // Reuse this game object
            reusedCellContainer.setActive(true).setVisible(true);
        }
    }

    this.emit('cellvisible', cell, reusedCellContainer, this);

    if (this.cellContainersPool) {
        var cellContainer = cell.getContainer();
        if (cellContainer) {
            if (reusedCellContainer === null) {
                this.cellContainersPool.add(cellContainer); // New cell container, add to pool
            } else if (reusedCellContainer !== cellContainer) {
                // Why reusedCellContainer is not equal to cellContainer?
                this.cellContainersPool.add(cellContainer); // New cell container, add to pool
                this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
            }
        } else { // No cell container added
            if (reusedCellContainer !== null) {
                this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
            }
        }
    }
}

export default ShowCell;