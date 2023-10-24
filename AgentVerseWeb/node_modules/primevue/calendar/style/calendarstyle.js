this.primevue = this.primevue || {};
this.primevue.calendar = this.primevue.calendar || {};
this.primevue.calendar.style = (function (BaseStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    var css = "\n@layer primevue {\n    .p-calendar {\n        display: inline-flex;\n        max-width: 100%;\n    }\n\n    .p-calendar .p-inputtext {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n\n    .p-calendar-w-btn .p-inputtext {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\n    .p-calendar-w-btn .p-datepicker-trigger {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n\n    /* Fluid */\n    .p-fluid .p-calendar {\n        display: flex;\n    }\n\n    .p-fluid .p-calendar .p-inputtext {\n        width: 1%;\n    }\n\n    /* Datepicker */\n    .p-calendar .p-datepicker {\n        min-width: 100%;\n    }\n\n    .p-datepicker {\n        width: auto;\n    }\n\n    .p-datepicker-inline {\n        display: inline-block;\n        overflow-x: auto;\n    }\n\n    /* Header */\n    .p-datepicker-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-datepicker-header .p-datepicker-title {\n        margin: 0 auto;\n    }\n\n    .p-datepicker-prev,\n    .p-datepicker-next {\n        cursor: pointer;\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Multiple Month DatePicker */\n    .p-datepicker-multiple-month .p-datepicker-group-container {\n        display: flex;\n    }\n\n    .p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group {\n        flex: 1 1 auto;\n    }\n\n    /* DatePicker Table */\n    .p-datepicker table {\n        width: 100%;\n        border-collapse: collapse;\n    }\n\n    .p-datepicker td > span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        margin: 0 auto;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Month Picker */\n    .p-monthpicker-month {\n        width: 33.3%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /* Year Picker */\n    .p-yearpicker-year {\n        width: 50%;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    /*  Button Bar */\n    .p-datepicker-buttonbar {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n\n    /* Time Picker */\n    .p-timepicker {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .p-timepicker button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        overflow: hidden;\n        position: relative;\n    }\n\n    .p-timepicker > div {\n        display: flex;\n        align-items: center;\n        flex-direction: column;\n    }\n\n    /* Touch UI */\n    .p-datepicker-touch-ui,\n    .p-calendar .p-datepicker-touch-ui {\n        min-width: 80vw;\n    }\n}\n";
    var inlineStyles = {
      root: function root(_ref) {
        var props = _ref.props;
        return {
          position: props.appendTo === 'self' ? 'relative' : undefined
        };
      }
    };
    var classes = {
      root: function root(_ref2) {
        var props = _ref2.props,
          state = _ref2.state;
        return ['p-calendar p-component p-inputwrapper', {
          'p-calendar-w-btn': props.showIcon,
          'p-calendar-timeonly': props.timeOnly,
          'p-calendar-disabled': props.disabled,
          'p-inputwrapper-filled': props.modelValue,
          'p-inputwrapper-focus': state.focused,
          'p-focus': state.focused || state.overlayVisible
        }];
      },
      input: 'p-inputtext p-component',
      dropdownButton: 'p-datepicker-trigger',
      panel: function panel(_ref3) {
        var instance = _ref3.instance,
          props = _ref3.props,
          state = _ref3.state;
        return ['p-datepicker p-component', {
          'p-datepicker-inline': props.inline,
          'p-disabled': props.disabled,
          'p-datepicker-timeonly': props.timeOnly,
          'p-datepicker-multiple-month': props.numberOfMonths > 1,
          'p-datepicker-monthpicker': state.currentView === 'month',
          'p-datepicker-yearpicker': state.currentView === 'year',
          'p-datepicker-touch-ui': props.touchUI,
          'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': instance.$primevue.config.ripple === false
        }];
      },
      groupContainer: 'p-datepicker-group-container',
      group: 'p-datepicker-group',
      header: 'p-datepicker-header',
      previousButton: 'p-datepicker-prev p-link',
      previousIcon: 'p-datepicker-prev-icon',
      title: 'p-datepicker-title',
      monthTitle: 'p-datepicker-month p-link',
      yearTitle: 'p-datepicker-year p-link',
      decadeTitle: 'p-datepicker-decade',
      nextButton: 'p-datepicker-next p-link',
      nextIcon: 'p-datepicker-next-icon',
      container: 'p-datepicker-calendar-container',
      table: 'p-datepicker-calendar',
      weekHeader: 'p-datepicker-weekheader p-disabled',
      weekNumber: 'p-datepicker-weeknumber',
      weekLabelContainer: 'p-disabled',
      day: function day(_ref4) {
        var date = _ref4.date;
        return [{
          'p-datepicker-other-month': date.otherMonth,
          'p-datepicker-today': date.today
        }];
      },
      dayLabel: function dayLabel(_ref5) {
        var instance = _ref5.instance,
          date = _ref5.date;
        return [{
          'p-highlight': instance.isSelected(date) && date.selectable,
          'p-disabled': !date.selectable
        }];
      },
      monthPicker: 'p-monthpicker',
      month: function month(_ref6) {
        var instance = _ref6.instance,
          _month = _ref6.month,
          index = _ref6.index;
        return ['p-monthpicker-month', {
          'p-highlight': instance.isMonthSelected(index),
          'p-disabled': !_month.selectable
        }];
      },
      yearPicker: 'p-yearpicker',
      year: function year(_ref7) {
        var instance = _ref7.instance,
          _year = _ref7.year;
        return ['p-yearpicker-year', {
          'p-highlight': instance.isYearSelected(_year.value),
          'p-disabled': !_year.selectable
        }];
      },
      timePicker: 'p-timepicker',
      hourPicker: 'p-hour-picker',
      incrementButton: 'p-link',
      decrementButton: 'p-link',
      separatorContainer: 'p-separator',
      minutePicker: 'p-minute-picker',
      secondPicker: 'p-second-picker',
      ampmPicker: 'p-ampm-picker',
      buttonbar: 'p-datepicker-buttonbar',
      todayButton: 'p-button-text',
      clearButton: 'p-button-text'
    };
    var CalendarStyle = BaseStyle__default["default"].extend({
      name: 'calendar',
      css: css,
      classes: classes,
      inlineStyles: inlineStyles
    });

    return CalendarStyle;

})(primevue.base.style);
