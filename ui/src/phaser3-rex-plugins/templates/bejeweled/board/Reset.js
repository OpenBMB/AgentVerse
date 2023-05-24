/* 
1. Destroy all chess
2. Fill chess
3. Break match3
*/

var Reset = function() {
    // Destroy all chess
    this.board.removeAllChess();
    // Fill chess (with initial symbol map)
    this.fill(this.initSymbolsMap);
    // Break match3
    this.breakMatch3();
}

export default Reset;