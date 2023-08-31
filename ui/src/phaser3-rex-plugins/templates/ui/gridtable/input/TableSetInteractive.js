import PointerUpDownCell from './PointerUpDownCell.js';
import OverCell from './OverCell.js';
import ClickCell from './ClickCell.js';
import TapCell from './TapCell.js';
import PressCell from './PressCell.js';
import SwipeCell from './SwipeCell.js';

var TableSetInteractive = function (table, tableConfig) {
    table.setInteractive();
    
    PointerUpDownCell.call(this, table, tableConfig);
    OverCell.call(this, table, tableConfig);
    ClickCell.call(this, table, tableConfig);
    TapCell.call(this, table, tableConfig);
    PressCell.call(this, table, tableConfig);
    SwipeCell.call(this, table, tableConfig);
}

export default TableSetInteractive;