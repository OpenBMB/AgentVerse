import DeepClone from '../../object/DeepClone.js';

var SetBaseTexture = function (key, baseFrameName, columns, rows) {
    if (Array.isArray(baseFrameName)) {
        rows = columns;
        columns = baseFrameName;
        baseFrameName = undefined;
    }

    if (baseFrameName == null) {
        baseFrameName = '__BASE';
    }

    if ((typeof (columns) === 'number') && (arguments.length >= 6)) {
        columns = [arguments[2], undefined, arguments[3]];
        rows = [arguments[4], undefined, arguments[5]];
    } else {
        columns = DeepClone(columns);
        rows = DeepClone(rows);
    }

    this.textureKey = key;
    this.baseFrameName = baseFrameName;
    this.columns.data = columns;
    this.columns.count = (columns) ? columns.length : 0;
    this.columns.stretch = 0;
    this.columns.minWidth = 0;
    this.columns.scale = 1;
    this.rows.data = rows;
    this.rows.count = (rows) ? rows.length : 0;
    this.rows.stretch = 0;
    this.rows.minHeight = 0;
    this.rows.scale = 1;

    var texture = this.scene.sys.textures.get(key);
    if (!texture) {
        this.clear();
        return this;
    }
    if (!columns || !rows) {
        this.clear();
        return this;
    }

    // Get remainder width/height for unknown width/height
    var baseFrame = texture.get(baseFrameName);
    var remainderTextureWidth = baseFrame.width;
    var unknownColumnWidthCount = 0;
    for (var i = 0, cnt = columns.length; i < cnt; i++) {
        if (columns[i] === undefined) {
            unknownColumnWidthCount++;
        } else if (typeof (columns[i]) === 'number') {
            remainderTextureWidth -= columns[i];
        } else {
            remainderTextureWidth -= columns[i].width;
        }
    }
    var unknownColumnWidth = remainderTextureWidth / unknownColumnWidthCount;

    var remainderTextureHeight = baseFrame.height;
    var unknownRowHeightCount = 0;
    for (var i = 0, cnt = rows.length; i < cnt; i++) {
        if (rows[i] === undefined) {
            unknownRowHeightCount++;
        } else if (typeof (rows[i]) === 'number') {
            remainderTextureHeight -= rows[i];
        } else {
            remainderTextureHeight -= rows[i].width;
        }
    }
    var unknownRowHeight = remainderTextureHeight / unknownRowHeightCount;

    var row, col, rowHeight, colWidth, frameName;
    var offsetX = 0, offsetY = 0;
    for (var j = 0, jcnt = rows.length; j < jcnt; j++) {
        // Unknown height
        if (rows[j] === undefined) {
            rows[j] = unknownRowHeight;
        }

        if (typeof (rows[j]) === 'number') {
            rows[j] = {
                height: rows[j],
                stretch: (j % 2),
            }
        }

        row = rows[j];
        rowHeight = row.height;

        this.rows.stretch += (row.stretch | 0);
        this.rows.minHeight += (row.stretch > 0) ? 0 : rowHeight;

        offsetX = 0;
        for (var i = 0, icnt = columns.length; i < icnt; i++) {
            // Unknown width
            if (columns[i] === undefined) {
                columns[i] = unknownColumnWidth;
            }

            if (typeof (columns[i]) === 'number') {
                columns[i] = {
                    width: columns[i],
                    stretch: (i % 2),
                }
            }

            col = columns[i];
            colWidth = col.width;

            if (j === 0) {
                this.columns.stretch += (col.stretch | 0);
                this.columns.minWidth += (col.stretch > 0) ? 0 : colWidth;
            }

            if ((colWidth >= 1) && (rowHeight >= 1)) {
                frameName = this.getFrameNameCallback(i, j, baseFrameName);
                var frameNameType = typeof (frameName);
                if ((frameNameType === 'string') || (frameNameType === 'number')) {
                    texture.add(
                        frameName, 0,
                        (offsetX + baseFrame.cutX), (offsetY + baseFrame.cutY),
                        colWidth, rowHeight
                    );
                    // Do nothing if frameName is existed
                }
            } else {
                // console.warn(`Size of Grid(${i},${j}) = ${colWidth}x${rowHeight}, which is invalid`);
            }
            offsetX += colWidth;
        }
        offsetY += rowHeight;
    }

    this.updateTexture();
    return this;
}

export default SetBaseTexture;