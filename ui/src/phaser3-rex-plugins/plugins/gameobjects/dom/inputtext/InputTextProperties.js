const ElementProperties = {
    id: ['id', undefined],
    text: ['value', undefined],
    maxLength: ['maxLength', undefined],
    minLength: ['minLength', undefined],
    placeholder: ['placeholder', undefined],
    tooltip: ['title', undefined],
    readOnly: ['readOnly', false],
    spellCheck: ['spellcheck', false],
    autoComplete: ['autocomplete', 'off'],
};

const StyleProperties = {
    align: ['textAlign', undefined],
    paddingLeft: ['padding-left', undefined],
    paddingRight: ['padding-right', undefined],
    paddingTop: ['padding-top', undefined],
    paddingBottom: ['padding-bottom', undefined],
    fontFamily: ['fontFamily', undefined],
    fontSize: ['font-size', undefined],
    color: ['color', '#ffffff'],
    backgroundColor: ['backgroundColor', 'transparent'],
    border: ['border', 0],
    borderColor: ['borderColor', 'transparent'],
    outline: ['outline', 'none'],
    direction: ['direction', undefined]
};

const ElementEvents = {
    input: 'textchange',

    click: 'click',
    dblclick: 'dblclick',

    mousedown: 'pointerdown',
    mousemove: 'pointermove',
    mouseup: 'pointerup',

    touchstart: 'pointerdown',
    touchmove: 'pointermove',
    touchend: 'pointerup',

    keydown: 'keydown',
    keyup: 'keyup',
    keypress: 'keypress',

    compositionstart: 'compositionStart',
    compositionend: 'compositionEnd',
    compositionupdate: 'compositionUpdate',

    focus: 'focus',
    blur: 'blur',

    select: 'select',
};


export {
    ElementProperties,
    StyleProperties,
    ElementEvents
};