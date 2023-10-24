this.primevue = this.primevue || {};
this.primevue.galleria = this.primevue.galleria || {};
this.primevue.galleria.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-galleria-content {\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-galleria-item-wrapper {\n        display: flex;\n        flex-direction: column;\n        position: relative;\n    }\n\n    .p-galleria-item-container {\n        position: relative;\n        display: flex;\n        height: 100%;\n    }\n\n    .p-galleria-item-nav {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n    }\n\n    .p-galleria-item-prev {\n        left: 0;\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n\n    .p-galleria-item-next {\n        right: 0;\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\n    .p-galleria-item {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 100%;\n        width: 100%;\n    }\n\n    .p-galleria-item-nav-onhover .p-galleria-item-nav {\n        pointer-events: none;\n        opacity: 0;\n        transition: opacity 0.2s ease-in-out;\n    }\n\n    .p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav {\n        pointer-events: all;\n        opacity: 1;\n    }\n\n    .p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled {\n        pointer-events: none;\n    }\n\n    .p-galleria-caption {\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n    }\n\n    /* Thumbnails */\n    .p-galleria-thumbnail-wrapper {\n        display: flex;\n        flex-direction: column;\n        overflow: auto;\n        flex-shrink: 0;\n    }\n\n    .p-galleria-thumbnail-prev,\n    .p-galleria-thumbnail-next {\n        align-self: center;\n        flex: 0 0 auto;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-galleria-thumbnail-prev span,\n    .p-galleria-thumbnail-next span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .p-galleria-thumbnail-container {\n        display: flex;\n        flex-direction: row;\n    }\n\n    .p-galleria-thumbnail-items-container {\n        overflow: hidden;\n        width: 100%;\n    }\n\n    .p-galleria-thumbnail-items {\n        display: flex;\n    }\n\n    .p-galleria-thumbnail-item {\n        overflow: auto;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        opacity: 0.5;\n    }\n\n    .p-galleria-thumbnail-item:hover {\n        opacity: 1;\n        transition: opacity 0.3s;\n    }\n\n    .p-galleria-thumbnail-item-current {\n        opacity: 1;\n    }\n\n    /* Positions */\n    /* Thumbnails */\n    .p-galleria-thumbnails-left .p-galleria-content,\n    .p-galleria-thumbnails-right .p-galleria-content {\n        flex-direction: row;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-item-wrapper,\n    .p-galleria-thumbnails-right .p-galleria-item-wrapper {\n        flex-direction: row;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-item-wrapper,\n    .p-galleria-thumbnails-top .p-galleria-item-wrapper {\n        order: 2;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,\n    .p-galleria-thumbnails-top .p-galleria-thumbnail-wrapper {\n        order: 1;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-thumbnail-container,\n    .p-galleria-thumbnails-right .p-galleria-thumbnail-container {\n        flex-direction: column;\n        flex-grow: 1;\n    }\n\n    .p-galleria-thumbnails-left .p-galleria-thumbnail-items,\n    .p-galleria-thumbnails-right .p-galleria-thumbnail-items {\n        flex-direction: column;\n        height: 100%;\n    }\n\n    /* Indicators */\n    .p-galleria-indicators {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-galleria-indicator > button {\n        display: inline-flex;\n        align-items: center;\n    }\n\n    .p-galleria-indicators-left .p-galleria-item-wrapper,\n    .p-galleria-indicators-right .p-galleria-item-wrapper {\n        flex-direction: row;\n        align-items: center;\n    }\n\n    .p-galleria-indicators-left .p-galleria-item-container,\n    .p-galleria-indicators-top .p-galleria-item-container {\n        order: 2;\n    }\n\n    .p-galleria-indicators-left .p-galleria-indicators,\n    .p-galleria-indicators-top .p-galleria-indicators {\n        order: 1;\n    }\n\n    .p-galleria-indicators-left .p-galleria-indicators,\n    .p-galleria-indicators-right .p-galleria-indicators {\n        flex-direction: column;\n    }\n\n    .p-galleria-indicator-onitem .p-galleria-indicators {\n        position: absolute;\n        display: flex;\n        z-index: 1;\n    }\n\n    .p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators {\n        top: 0;\n        left: 0;\n        width: 100%;\n        align-items: flex-start;\n    }\n\n    .p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators {\n        right: 0;\n        top: 0;\n        height: 100%;\n        align-items: flex-end;\n    }\n\n    .p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators {\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        align-items: flex-end;\n    }\n\n    .p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators {\n        left: 0;\n        top: 0;\n        height: 100%;\n        align-items: flex-start;\n    }\n\n    /* FullScreen */\n    .p-galleria-mask {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-galleria-close {\n        position: absolute;\n        top: 0;\n        right: 0;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n    }\n\n    .p-galleria-mask .p-galleria-item-nav {\n        position: fixed;\n        top: 50%;\n        margin-top: -0.5rem;\n    }\n\n    /* Animation */\n    .p-galleria-enter-active {\n        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-galleria-leave-active {\n        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .p-galleria-enter-from,\n    .p-galleria-leave-to {\n        opacity: 0;\n        transform: scale(0.7);\n    }\n\n    .p-galleria-enter-active .p-galleria-item-nav {\n        opacity: 0;\n    }\n\n    /* Keyboard Support */\n    .p-items-hidden .p-galleria-thumbnail-item {\n        visibility: hidden;\n    }\n\n    .p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {\n        visibility: visible;\n    }\n}\n";
    var classes = {
      mask: function mask(_ref) {
        var instance = _ref.instance;
        return ['p-galleria-mask p-component-overlay p-component-overlay-enter', {
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      root: function root(_ref2) {
        var instance = _ref2.instance;
        var thumbnailsPosClass = instance.$attrs.showThumbnails && instance.getPositionClass('p-galleria-thumbnails', instance.$attrs.thumbnailsPosition);
        var indicatorPosClass = instance.$attrs.showIndicators && instance.getPositionClass('p-galleria-indicators', instance.$attrs.indicatorsPosition);
        return ['p-galleria p-component', {
          'p-galleria-fullscreen': instance.$attrs.fullScreen,
          'p-galleria-indicator-onitem': instance.$attrs.showIndicatorsOnItem,
          'p-galleria-item-nav-onhover': instance.$attrs.showItemNavigatorsOnHover && !instance.$attrs.fullScreen
        }, thumbnailsPosClass, indicatorPosClass];
      },
      closeButton: 'p-galleria-close p-link',
      closeIcon: 'p-galleria-close-icon',
      header: 'p-galleria-header',
      content: 'p-galleria-content',
      footer: 'p-galleria-footer',
      itemWrapper: 'p-galleria-item-wrapper',
      itemContainer: 'p-galleria-item-container',
      previousItemButton: function previousItemButton(_ref3) {
        var instance = _ref3.instance;
        return ['p-galleria-item-prev p-galleria-item-nav p-link', {
          'p-disabled': instance.isNavBackwardDisabled()
        }];
      },
      previousItemIcon: 'p-galleria-item-prev-icon',
      item: 'p-galleria-item',
      nextItemButton: function nextItemButton(_ref4) {
        var instance = _ref4.instance;
        return ['p-galleria-item-next p-galleria-item-nav p-link', {
          'p-disabled': instance.isNavForwardDisabled()
        }];
      },
      nextItemIcon: 'p-galleria-item-next-icon',
      caption: 'p-galleria-caption',
      indicators: 'p-galleria-indicators p-reset',
      indicator: function indicator(_ref5) {
        var instance = _ref5.instance,
          index = _ref5.index;
        return ['p-galleria-indicator', {
          'p-highlight': instance.isIndicatorItemActive(index)
        }];
      },
      indicatorButton: 'p-link',
      thumbnailWrapper: 'p-galleria-thumbnail-wrapper',
      thumbnailContainer: 'p-galleria-thumbnail-container',
      previousThumbnailButton: function previousThumbnailButton(_ref6) {
        var instance = _ref6.instance;
        return ['p-galleria-thumbnail-prev p-link', {
          'p-disabled': instance.isNavBackwardDisabled()
        }];
      },
      previousThumbnailIcon: 'p-galleria-thumbnail-prev-icon',
      thumbnailItemsContainer: 'p-galleria-thumbnail-items-container',
      thumbnailItems: 'p-galleria-thumbnail-items',
      thumbnailItem: function thumbnailItem(_ref7) {
        var instance = _ref7.instance,
          index = _ref7.index,
          activeIndex = _ref7.activeIndex;
        return ['p-galleria-thumbnail-item', {
          'p-galleria-thumbnail-item-current': activeIndex === index,
          'p-galleria-thumbnail-item-active': instance.isItemActive(index),
          'p-galleria-thumbnail-item-start': instance.firstItemAciveIndex() === index,
          'p-galleria-thumbnail-item-end': instance.lastItemActiveIndex() === index
        }];
      },
      thumbnailItemContent: 'p-galleria-thumbnail-item-content',
      nextThumbnailButton: function nextThumbnailButton(_ref8) {
        var instance = _ref8.instance;
        return ['p-galleria-thumbnail-next p-link', {
          'p-disabled': instance.isNavForwardDisabled()
        }];
      },
      nextThumbnailIcon: 'p-galleria-thumbnail-next-icon'
    };
    var GalleriaStyle = BaseStyle__default["default"].extend({
      name: 'galleria',
      css: css,
      classes: classes
    });

    return GalleriaStyle;

})(primevue.base.style);
