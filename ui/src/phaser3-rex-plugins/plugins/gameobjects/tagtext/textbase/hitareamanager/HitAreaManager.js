import Pool from '../../../../pool.js';
import Clear from '../../../../utils/object/Clear.js';

const Rectangle = Phaser.Geom.Rectangle;

var RectanglePool = new Pool();
class HitAreaManager {
    constructor() {
        this.hitAreas = [];
    }

    destroy() {
        this.clear();
    }

    clear() {
        // Reuse hitArea(rectangle) later
        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
            Clear(this.hitAreas[i].data);
        }
        RectanglePool.pushMultiple(this.hitAreas);
        return this;
    }

    add(x, y, width, height, data) {
        var rectangle = RectanglePool.pop();
        if (rectangle === null) {
            rectangle = new Rectangle(x, y, width, height);
        } else {
            rectangle.setTo(x, y, width, height);
        }

        rectangle.data = data;

        this.hitAreas.push(rectangle);
        return this;
    }

    getFirst(x, y) {
        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
            var hitArea = this.hitAreas[i];
            if (hitArea.contains(x, y)) {
                return hitArea;
            }
        }
        return null;
    }

    getByKey(key) {
        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
            var hitArea = this.hitAreas[i];
            if (hitArea.data.key === key) {
                return hitArea;
            }
        }
        return null;
    }

    drawBounds(graphics, color, parent) {
        if (color === undefined) {
            color = 0xffffff;
        }

        if (parent) {
            graphics
                .save()
                .scaleCanvas(parent.scaleX, parent.scaleY)
                .rotateCanvas(parent.rotation)
                .translateCanvas(parent.x, parent.y)
        }

        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
            var hitArea = this.hitAreas[i];
            graphics
                .lineStyle(1, color)
                .strokeRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
        }

        if (parent) {
            graphics
                .restore()
        }
        return this;
    }
}
export default HitAreaManager;