import OverlapSizer from '../overlapsizer/OverlapSizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BadgeKeys = {
    leftTop: 'left-top', centerTop: 'center-top', rightTop: 'right-top',
    leftCenter: 'left-center', center: 'center', rightCenter: 'right-center',
    leftBottom: 'left-bottom', centerBottom: 'center-bottom', rightBottom: 'right-bottom'
}

class Badge extends OverlapSizer {
    constructor(scene, config) {
        // Create sizer  
        super(scene, config);
        this.type = 'rexBadge';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }
        this.addChildrenMap('background', background);

        // Base item
        var main = GetValue(config, 'main', undefined);
        if (main) {
            this.add(main, {
                key: 'main',
                align: 'center',
                expand: false,
            })
        }
        this.addChildrenMap('main', main);

        // Badges
        for (var key in BadgeKeys) {
            var badge = GetValue(config, key, undefined);
            if (badge) {
                this.add(badge, {
                    key: key,
                    align: BadgeKeys[key],
                    expand: false,
                })
                this.addChildrenMap(key, badge);
            }            
        }
    }
}

export default Badge;