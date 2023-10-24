## 6.21.4 (2023-10-24)

### Bug fixes

Support the `offset`, `getCoords`, `overlap`, and `resize` properties on hover tooltips, as long as they aren't given conflicting values when there are multiple active hover tooltips.

Fix a bug that caused tooltips in the default configuration to be positioned incorrectly on Chrome when the editor was transformed.

## 6.21.3 (2023-10-06)

### Bug fixes

Fix an issue that caused `coordsForChar` to return the wrong rectangle for characters after a line wrap in Safari.

Make the context menu work when clicking below the content in a fixed-height editor.

Tooltips that have been put below/above their target position because there is no room on their default side now stay there on further updates.

## 6.21.2 (2023-10-02)

### Bug fixes

Fix a regression that broke dragging text from inside the editor.

## 6.21.1 (2023-10-02)

### Bug fixes

Fix a bug that could corrupt the DOM view for specific changes involving newlines and mark decorations.

## 6.21.0 (2023-09-29)

### Bug fixes

Fix a bug that could cause zero-length widgets at the start of a line to be left in the view even after they were removed.

### New features

`RectangleMarker`'s dimension properties are now public.

## 6.20.2 (2023-09-25)

### Bug fixes

Fix an issue in the way the DOM selection is being read that could break backspacing of widgets on Android.

Fix a bug where the editor could incorrectly computate its transform scale when it was small.

## 6.20.1 (2023-09-22)

### Bug fixes

Fix a crash in plugin event handlers after dynamic reconfiguration.

Fix an issue where, on Chrome, tooltips would no longer use fixed positioning.

## 6.20.0 (2023-09-20)

### Bug fixes

Fix an issue that caused `repositionTooltips` to crash when it was called on an editor without tooltips.

Fix an issue that caused the tooltip system to leave empty nodes in the DOM when an editor using the `parent` option to `tooltips` is destroyed.

Fix a bug that regression mouse interaction with the area of a fixed-size editor that isn't covered by the content.

Fix some issues with the way `moveVertically` behaved for positions on line wrap points.

Fix a bug that could cause the document DOM to be incorrectly updated on some types of viewport changes.

### New features

The new `getDrawSelectionConfig` function returns the `drawSelection` configuration for a given state.

## 6.19.0 (2023-09-14)

### Bug fixes

Make sure the drop cursor is properly cleaned up even when another extension handles the drop event.

Fix a crash related to non-inclusive replacing block decorations.

### New features

The new `EditorView.domEventObservers` (and the corresponding option to view plugins) allows you to register functions that are always called for an event, regardless of whether other handlers handled it.

## 6.18.1 (2023-09-11)

### Bug fixes

Fix an issue where the editor duplicated text when the browser moved content into the focused text node on composition.

Make sure `widgetMarker` is called for gutters on lines covered by a block replace decoration.

Fix an issue where the cursor could be shown in a position that doesn't allow a cursor when the selection is in a block widget.

## 6.18.0 (2023-09-05)

### New features

The new `EditorView.scaleX` and `scaleY` properties return the CSS-transformed scale of the editor (or 1 when not scaled).

The editor now supports being scaled with CSS.

## 6.17.1 (2023-08-31)

### Bug fixes

Don't close the hover tooltip when the pointer moves over empty space caused by line breaks within the hovered range.

Fix a bug where on Chrome Android, if a virtual keyboard was slow to apply a change, the editor could end up dropping it.

Work around an issue where line-wise copy/cut didn't work in Firefox because the browser wasn't firing those events when nothing was selected.

Fix a crash triggered by the way some Android IME systems update the DOM.

Fix a bug that caused replacing a word by an emoji on Chrome Android to be treated as a backspace press.

## 6.17.0 (2023-08-28)

### Bug fixes

Fix a bug that broke hover tooltips when hovering over a widget.

### New features

The new `EditorView.cspNonce` facet can be used to provide a Content Security Policy nonce for the library's generated CSS.

The new `EditorView.bidiIsolatedRanges` can be used to inform the editor about ranges styled as Unicode bidirection isolates, so that it can compute the character order correctly.

`EditorView.dispatch` now also accepts an array of transactions to be applied together in a single view update.

The new `dispatchTransactions` option to `new EditorView` now replaces the old (deprecated but still supported) `dispatch` option in a way that allows multiple transactions to be applied in one update.

Input handlers are now passed an additional argument that they can use to retrieve the default transaction that would be applied for the insertion.

## 6.16.0 (2023-07-31)

### Bug fixes

Fix an issue that made the gutter not stick in place when the editor was in a right-to-left context.

### New features

The new `EditorView.coordsForChar` method returns the client rectangle for a given character in the editor.

## 6.15.3 (2023-07-18)

### Bug fixes

Fix another crash regression for compositions before line breaks.

## 6.15.2 (2023-07-18)

### Bug fixes

Fix the check that made sure compositions are dropped when the selection is moved.

## 6.15.1 (2023-07-18)

### Bug fixes

Fix a regression that could cause the composition content to be drawn incorrectly.

## 6.15.0 (2023-07-17)

### Bug fixes

Fix dragging a selection from inside the current selection on macOS.

Fix an issue that could cause the scroll position to jump wildly

Don't try to scroll fixed-positioned elements into view by scrolling their parent elements.

Fix a bug that caused the cursor to be hidden when showing a placeholder that consisted of the empty string.

Resolve some issues where composition could incorrectly affect nearby replaced content.

### New features

Key bindings can now set a `stopPropagation` field to cause the view to stop the key event propagation when it considers the event handled.

## 6.14.1 (2023-07-06)

### Bug fixes

Fix an issue where scrolling up through line-wrapped text would sometimes cause the scroll position to pop down.

Fix an issue where clicking wouldn't focus the editor on Firefox when it was in an iframe and already the active element of the frame.

Fix a bug that could cause compositions to be disrupted because their surrounding DOM was repurposed for some other piece of content.

Fix a bug where adding content to the editor could inappropriately move the scroll position.

Extend detection of Enter presses on Android to `beforeInput` events with an `"insertLineBreak"` type.

## 6.14.0 (2023-06-23)

### Bug fixes

When dragging text inside the editor, look at the state of Ctrl (or Alt on macOS) at the time of the drop, not the start of drag, to determine whether to move or copy the text.

Fix an issue where having a bunch of padding on lines could cause vertical cursor motion and `posAtCoords` to jump over lines.

### New features

Block widget decorations can now be given an `inlineOrder` option to make them appear in the same ordering as surrounding inline widgets.

## 6.13.2 (2023-06-13)

### Bug fixes

Fix an issue in scroll position stabilization for changes above the visible, where Chrome already does this natively and we ended up compensating twice.

## 6.13.1 (2023-06-12)

### Bug fixes

Fix a bug where the cursor would in some circumstances be drawn on the wrong side of an inline widget.

Fix an issue where `scrollPastEnd` could cause the scroll position of editors that weren't in view to be changed unnecessarily.

## 6.13.0 (2023-06-05)

### Bug fixes

Forbid widget decoration side values bigger than 10000, to prevent them from breaking range ordering invariants.

Fix a bug where differences between widgets' estimated and actual heights could cause the editor to inappropriately move the scroll position.

Avoid another situation in which composition that inserts line breaks could corrupt the editor DOM.

### New features

Inline widgets may now introduce line breaks, if they report this through the `WidgetType.lineBreaks` property.

## 6.12.0 (2023-05-18)

### Bug fixes

Remove an accidentally included `console.log`.

### New features

`EditorViewConfig.dispatch` is now passed the view object as a second argument.

## 6.11.3 (2023-05-17)

### Bug fixes

Make sure pointer selection respects `EditorView.atomicRanges`.

Preserve DOM widgets when their decoration type changes but they otherwise stay in the same place.

Fix a bug in `drawSelection` that could lead to invisible or incorrect selections for a blank line below a block widget.

## 6.11.2 (2023-05-13)

### Bug fixes

Fix a bug where the `crosshairCursor` extension could, when non-native key events were fired, trigger disruptive and needless view updates.

Fix an Android issue where backspacing at the front of a line with widget decorations could replace those decorations with their text content.

Respect scroll margins when scrolling the target of drag-selection into view.

Validate selection offsets reported by the browser, to work around Safari giving us invalid values in some cases.

## 6.11.1 (2023-05-09)

### Bug fixes

Don't preserve the DOM around a composition that spans multiple lines.
## 6.11.0 (2023-05-03)

### New features

Gutters now support a `widgetMarker` option that can be used to add markers next to block widgets.

## 6.10.1 (2023-05-01)

### Bug fixes

Limit cursor height in front of custom placeholder DOM elements.

## 6.10.0 (2023-04-25)

### Bug fixes

Fix a crash in `drawSelection` when a measured position falls on a position that doesn't have corresponding screen coordinates.

Work around unhelpful interaction observer behavior that could cause the editor to not notice it was visible.

Give the cursor next to a line-wrapped placeholder a single-line height.

Make sure drop events below the editable element in a fixed-height editor get handled properly.

### New features

Widget decorations can now define custom `coordsAtPos` methods to control the way the editor computes screen positions at or in the widget.

## 6.9.6 (2023-04-21)

### Bug fixes

Fix an issue where, when escape was pressed followed by a key that the editor handled, followed by tab, the tab would still move focus.

Fix an issue where, in some circumstances, the editor would ignore text changes at the end of a composition.

Allow inline widgets to be updated to a different length via `updateDOM`.

## 6.9.5 (2023-04-17)

### Bug fixes

Avoid disrupting the composition in specific cases where Safari invasively changes the DOM structure in the middle of a composition.

Fix a bug that prevented `destroy` being called on hover tooltips.

Fix a bug where the editor could take focus when content changes required it to restore the DOM selection.

Fix height layout corruption caused by a division by zero.

Make sure styles targeting the editor's focus status are specific enough to not cause them to apply to editors nested inside another focused editor. This will require themes to adjust their selection background styles to match the new specificity.

## 6.9.4 (2023-04-11)

### Bug fixes

Make the editor scroll while dragging a selection near its sides, even if the cursor isn't outside the scrollable element.

Fix a bug that interrupted composition after widgets in some circumstances on Firefox.

Make sure the last change in a composition has its user event set to `input.type.compose`, even if the `compositionend` event fires before the changes are applied.

Make it possible to remove additional selection ranges by clicking on them with ctrl/cmd held, even if they aren't cursors.

Keep widget buffers between widgets and compositions, since removing them confuses IME on macOS Firefox.

Fix a bug where, for DOM changes that put the selection in the middle of the changed range, the editor incorrectly set its selection state.

Fix a bug where `coordsAtPos` could return a coordinates before the line break when querying a line-wrapped position with a positive `side`.

## 6.9.3 (2023-03-21)

### Bug fixes

Work around a Firefox issue that caused `coordsAtPos` to return rectangles with the full line height on empty lines.

Opening a context menu by clicking below the content element but inside the editor now properly shows the browser's menu for editable elements.

Fix an issue that broke composition (especially of Chinese IME) after widget decorations.

Fix an issue that would cause the cursor to jump around during compositions inside nested mark decorations.

## 6.9.2 (2023-03-08)

### Bug fixes

Work around a Firefox CSS bug that caused cursors to stop blinking in a scrolled editor.

Fix an issue in `drawSelection` where the selection extended into the editor's padding.

Fix pasting of links copied from iOS share sheet.

## 6.9.1 (2023-02-17)

### Bug fixes

Improve the way `posAtCoords` picks the side of a widget to return by comparing the coordinates the center of the widget.

Fix an issue where transactions created for the `focusChangeEffect` facet were sometimes not dispatched.

## 6.9.0 (2023-02-15)

### Bug fixes

Fix an issue where inaccurate estimated vertical positions could cause the viewport to not converge in line-wrapped editors.

Don't suppress double-space to period conversion when autocorrect is enabled.

Make sure the measuring code notices when the scaling of the editor is changed, and does a full measure in that case.

### New features

The new `EditorView.focusChangeEffect` facet can be used to dispatch a state effect when the editor is focused or blurred.

## 6.8.1 (2023-02-08)

### Bug fixes

Fix an issue where tooltips that have their height reduced have their height flicker when scrolling or otherwise interacting with the editor.

## 6.8.0 (2023-02-07)

### Bug fixes

Fix a regression that caused clicking on the scrollbar to move the selection.

Fix an issue where focus or blur event handlers that dispatched editor transactions could corrupt the mouse selection state.

Fix a CSS regression that prevented the drop cursor from being positioned properly.

### New features

`WidgetType.updateDOM` is now passed the editor view object.

## 6.7.3 (2023-01-12)

### Bug fixes

Fix a bug in `posAtCoords` that could cause incorrect results for positions to the left of a wrapped line.

## 6.7.2 (2023-01-04)

### Bug fixes

Fix a regression where the cursor didn't restart its blink cycle when moving it with the pointer.

Even without a `key` property, measure request objects that are already scheduled will not be scheduled again by `requestMeasure`.

Fix an issue where keymaps incorrectly interpreted key events that used Ctrl+Alt modifiers to simulate AltGr on Windows.

Fix a bug where line decorations with a different `class` property would be treated as equal.

Fix a bug that caused `drawSelection` to not notice when it was reconfigured.

Fix a crash in the gutter extension caused by sharing of mutable arrays.

Fix a regression that caused touch selection on mobile platforms to not work in an uneditable editor.

Fix a bug where DOM events on the boundary between lines could get assigned to the wrong line.

## 6.7.1 (2022-12-12)

### Bug fixes

Make the editor properly scroll when moving the pointer out of it during drag selection.

Fix a regression where clicking below the content element in an editor with its own height didn't focus the editor.

## 6.7.0 (2022-12-07)

### Bug fixes

Make the editor notice widget height changes to automatically adjust its height information.

Fix an issue where widget buffers could be incorrectly omitted after empty lines.

Fix an issue in content redrawing that could cause `coordsAtPos` to return incorrect results.

### New features

The static `RectangleMarker.forRange` method exposes the logic used by the editor to draw rectangles covering a selection range.

Layers can now provide a `destroy` function to be called when the layer is removed.

The new `highlightWhitespace` extension makes spaces and tabs in the editor visible.

The `highlightTrailingWhitespace` extension can be used to make trailing whitespace stand out.

## 6.6.0 (2022-11-24)

### New features

The `layer` function can now be used to define extensions that draw DOM elements over or below the document text.

Tooltips that are bigger than the available vertical space for them will now have their height set so that they don't stick out of the window. The new `resize` property on `TooltipView` can be used to opt out of this behavior.

## 6.5.1 (2022-11-15)

### Bug fixes

Fix a bug that caused marked unnecessary splitting of mark decoration DOM elements in some cases.

## 6.5.0 (2022-11-14)

### Bug fixes

Fix an issue where key bindings were activated for the wrong key in some situations with non-US keyboards.

### New features

A tooltip's `positioned` callback is now passed the available space for tooltips.

## 6.4.2 (2022-11-10)

### Bug fixes

Typing into a read-only editor no longer moves the cursor.

Fix an issue where hover tooltips were closed when the mouse was moved over them if they had a custom parent element.

Fix an issue where the editor could end up displaying incorrect height measurements (typically after initializing).

## 6.4.1 (2022-11-07)

### Bug fixes

Fix an issue where coordinates next to replaced widgets were returned incorrectly, causing the cursor to be drawn in the wrong place.

Update the `crosshairCursor` state on every mousemove event.

Avoid an issue in the way that the editor enforces cursor associativity that could cause the cursor to get stuck on single-character wrapped lines.

## 6.4.0 (2022-10-18)

### Bug fixes

Avoid an issue where `scrollPastEnd` makes a single-line editor have a vertical scrollbar.

Work around a Chrome bug where it inserts a newline when you press space at the start of a wrapped line.

Align `rectangularSelection`'s behavior with other popular editors by making it create cursors at the end of lines that are too short to touch the rectangle.

Fix an issue where coordinates on mark decoration boundaries were sometimes taken from the wrong side of the position.

Prevent scrolling artifacts caused by attempts to scroll stuff into view when the editor isn't being displayed.

### New features

`TooltipView` objects can now provide a `destroy` method to be called when the tooltip is removed.

## 6.3.1 (2022-10-10)

### Bug fixes

Fix a crash when trying to scroll something into view in an editor that wasn't in the visible DOM.

Fix an issue where `coordsAtPos` returned the coordinates on the wrong side of a widget decoration wrapped in a mark decoration.

Fix an issue where content on long wrapped lines could fail to properly scroll into view.

Fix an issue where DOM change reading on Chrome Android could get confused when a transaction came in right after a beforeinput event for backspace, enter, or delete.

## 6.3.0 (2022-09-28)

### Bug fixes

Reduce the amount of wrap-point jittering when scrolling through a very long wrapped line.

Fix an issue where scrolling to content that wasn't currently drawn due to being on a very long line would often fail to scroll to the right position.

Suppress double-space-adds-period behavior on Chrome Mac when it behaves weirdly next to widget.

### New features

Key binding objects with an `any` property will now add handlers that are called for any key, within the ordering of the keybindings.

## 6.2.5 (2022-09-24)

### Bug fixes

Don't override double/triple tap behavior on touch screen devices, so that the mobile selection menu pops up properly.

Fix an issue where updating the selection could crash on Safari when the editor was hidden.

## 6.2.4 (2022-09-16)

### Bug fixes

Highlight the active line even when there is a selection. Prevent the active line background from obscuring the selection backdrop.

Fix an issue where elements with negative margins would confuse the editor's scrolling-into-view logic.

Fix scrolling to a specific position in an editor that has not been in view yet.

## 6.2.3 (2022-09-08)

### Bug fixes

Fix a bug where cursor motion, when starting from a non-empty selection range, could get stuck on atomic ranges in some circumstances.

Avoid triggering Chrome Android's text-duplication issue when a period is typed in the middle of a word.

## 6.2.2 (2022-08-31)

### Bug fixes

Don't reset the selection for selection change events that were suppressed by a node view.

## 6.2.1 (2022-08-25)

### Bug fixes

Don't use the global `document` variable to track focus, since that doesn't work in another window/frame.

Fix an issue where key handlers that didn't return true were sometimes called twice for the same keypress.

Avoid editing glitches when using deletion keys like ctrl-d on iOS.

Properly treat characters from the 'Arabic Presentation Forms-A' Unicode block as right-to-left.

Work around a Firefox bug that inserts text at the wrong point for specific cross-line selections.

## 6.2.0 (2022-08-05)

### Bug fixes

Fix a bug where `posAtCoords` would return the wrong results for positions to the right of wrapped lines.

### New features

The new `EditorView.setRoot` method can be used when an editor view is moved to a new document or shadow root.

## 6.1.4 (2022-08-04)

### Bug fixes

Make selection-restoration on focus more reliable.

## 6.1.3 (2022-08-03)

### Bug fixes

Fix a bug where a document that contains only non-printing characters would lead to bogus text measurements (and, from those, to crashing).

Make sure differences between estimated and actual block heights don't cause visible scroll glitches.

## 6.1.2 (2022-07-27)

### Bug fixes

Fix an issue where double tapping enter to confirm IME input and insert a newline on iOS would sometimes insert two newlines.

Fix an issue on iOS where a composition could get aborted if the editor scrolled on backspace.

## 6.1.1 (2022-07-25)

### Bug fixes

Make `highlightSpecialChars` replace directional isolate characters by default.

The editor will now try to suppress browsers' native behavior of resetting the selection in the editable content when the editable element is focused (programmatically, with tab, etc).

Fix a CSS issue that made it possible, when the gutters were wide enough, for them to overlap with the content.

## 6.1.0 (2022-07-19)

### New features

`MatchDecorator` now supports a `decorate` option that can be used to customize the way decorations are added for each match.

## 6.0.3 (2022-07-08)

### Bug fixes

Fix a problem where `posAtCoords` could incorrectly return the start of the next line when querying positions between lines.

Fix an issue where registering a high-precedence keymap made keymap handling take precedence over other keydown event handlers.

Ctrl/Cmd-clicking can now remove ranges from a multi-range selection.

## 6.0.2 (2022-06-23)

### Bug fixes

Fix a CSS issue that broke horizontal scroll width stabilization.

Fix a bug where `defaultLineHeight` could get an incorrect value in very narrow editors.

## 6.0.1 (2022-06-17)

### Bug fixes

Avoid DOM selection corruption when the editor doesn't have focus but has selection and updates its content.

Fall back to dispatching by key code when a key event produces a non-ASCII character (so that Cyrillic and Arabic keyboards can still use bindings specified with Latin characters).

## 6.0.0 (2022-06-08)

### New features

The new static `EditorView.findFromDOM` method can be used to retrieve an editor instance from its DOM structure.

Instead of passing a constructed state to the `EditorView` constructor, it is now also possible to inline the configuration options to the state in the view config object.

## 0.20.7 (2022-05-30)

### Bug fixes

Fix an issue on Chrome Android where the DOM could fail to display the actual document after backspace.

Avoid an issue on Chrome Android where DOM changes were sometimes inappropriately replace by a backspace key effect due to spurious beforeinput events.

Fix a problem where the content element's width didn't cover the width of the actual content.

Work around a bug in Chrome 102 which caused wheel scrolling of the editor to be interrupted every few lines.

## 0.20.6 (2022-05-20)

### Bug fixes

Make sure the editor re-measures itself when its attributes are updated.

## 0.20.5 (2022-05-18)

### Bug fixes

Fix an issue where gutter elements without any markers in them would not get the `cm-gutterElement` class assigned.

Fix an issue where DOM event handlers registered by plugins were retained indefinitely, even after the editor was reconfigured.

## 0.20.4 (2022-05-03)

### Bug fixes

Prevent Mac-style behavior of inserting a period when the user inserts two spaces.

Fix an issue where the editor would sometimes not restore the DOM selection when refocused with a selection identical to the one it held when it lost focus.

## 0.20.3 (2022-04-27)

### Bug fixes

Fix a bug where the input handling could crash on repeated (or held) backspace presses on Chrome Android.

## 0.20.2 (2022-04-22)

### New features

The new `hideOn` option to `hoverTooltip` allows more fine-grained control over when the tooltip should hide.

## 0.20.1 (2022-04-20)

### Bug fixes

Remove debug statements that accidentally made it into 0.20.0.

Fix a regression in `moveVertically`.

## 0.20.0 (2022-04-20)

### Breaking changes

The deprecated interfaces `blockAtHeight`, `visualLineAtHeight`, `viewportLines`, `visualLineAt`, `scrollPosIntoView`, `scrollTo`, and `centerOn` were removed from the library.

All decorations are now provided through `EditorView.decorations`, and are part of a single precedence ordering. Decoration sources that need access to the view are provided as functions.

Atomic ranges are now specified through a facet (`EditorView.atomicRanges`).

Scroll margins are now specified through a facet (`EditorView.scrollMargins`).

Plugin fields no longer exist in the library (and are replaced by facets holding function values).

This package no longer re-exports the Range type from @codemirror/state.

### Bug fixes

Fix a bug where zero-length block widgets could cause `viewportLineBlocks` to contain overlapping ranges.

### New features

The new `perLineTextDirection` facet configures whether the editor reads text direction per line, or uses a single direction for the entire editor. `EditorView.textDirectionAt` returns the direction around a given position.

`rectangularSelection` and `crosshairCursor` from @codemirror/rectangular-selection were merged into this package.

This package now exports the tooltip functionality that used to live in @codemirror/tooltip.

The exports from the old @codemirror/panel package are now available from this package.

The exports from the old @codemirror/gutter package are now available from this package.

## 0.19.48 (2022-03-30)

### Bug fixes

Fix an issue where DOM syncing could crash when a DOM node was moved from a parent to a child node (via widgets reusing existing nodes).

To avoid interfering with things like a vim mode too much, the editor will now only activate the tab-to-move-focus escape hatch after an escape press that wasn't handled by an event handler.

Make sure the view measures itself before the page is printed.

Tweak types of view plugin defining functions to avoid TypeScript errors when the plugin value doesn't have any of the interface's properties.

## 0.19.47 (2022-03-08)

### Bug fixes

Fix an issue where block widgets at the start of the viewport could break height computations.

## 0.19.46 (2022-03-03)

### Bug fixes

Fix a bug where block widgets on the edges of viewports could cause the positioning of content to misalign with the gutter and height computations.

Improve cursor height next to widgets.

Fix a bug where mapping positions to screen coordinates could return incorred coordinates during composition.

## 0.19.45 (2022-02-23)

### Bug fixes

Fix an issue where the library failed to call `WidgetType.destroy` on the old widget when replacing a widget with a different widget of the same type.

Fix an issue where the editor would compute DOM positions inside composition contexts incorrectly in some cases, causing the selection to be put in the wrong place and needlessly interrupting compositions.

Fix leaking of resize event handlers.

## 0.19.44 (2022-02-17)

### Bug fixes

Fix a crash that occasionally occurred when drag-selecting in a way that scrolled the editor.

### New features

The new `EditorView.compositionStarted` property indicates whether a composition is starting.

## 0.19.43 (2022-02-16)

### Bug fixes

Fix several issues where editing or composition went wrong due to our zero-width space kludge characters ending up in unexpected places.

Make sure the editor re-measures its dimensions whenever its theme changes.

Fix an issue where some keys on Android phones could leave the editor DOM unsynced with the actual document.

## 0.19.42 (2022-02-05)

### Bug fixes

Fix a regression in cursor position determination after making an edit next to a widget.

## 0.19.41 (2022-02-04)

### Bug fixes

Fix an issue where the editor's view of its content height could go out of sync with the DOM when a line-wrapping editor had its width changed, causing wrapping to change.

Fix a bug that caused the editor to draw way too much content when scrolling to a position in an editor (much) taller than the window.

Report an error when a replace decoration from a plugin crosses a line break, rather than silently ignoring it.

Fix an issue where reading DOM changes was broken when `lineSeparator` contained more than one character.

Make ordering of replace and mark decorations with the same extent and inclusivness more predictable by giving replace decorations precedence.

Fix a bug where, on Chrome, replacement across line boundaries and next to widgets could cause bogus zero-width characters to appear in the content.

## 0.19.40 (2022-01-19)

### Bug fixes

Make composition input properly appear at secondary cursors (except when those are in the DOM node with the composition, in which case the browser won't allow us to intervene without aborting the composition).

Fix a bug that cause the editor to get confused about which content was visible after scrolling something into view.

Fix a bug where the dummy elements rendered around widgets could end up in a separate set of wrapping marks, and thus become visible.

`EditorView.moveVertically` now preserves the `assoc` property of the input range.

Get rid of gaps between selection elements drawn by `drawSelection`.

Fix an issue where replacing text next to a widget might leak bogus zero-width spaces into the document.

Avoid browser selection mishandling when a focused view has `setState` called by eagerly refocusing it.

## 0.19.39 (2022-01-06)

### Bug fixes

Make sure the editor signals a `geometryChanged` update when its width changes.

### New features

`EditorView.darkTheme` can now be queried to figure out whether the editor is using a dark theme.

## 0.19.38 (2022-01-05)

### Bug fixes

Fix a bug that caused line decorations with a `class` property to suppress all other line decorations for that line.

Fix a bug that caused scroll effects to be corrupted when further updates came in before they were applied.

Fix an issue where, depending on which way a floating point rounding error fell, `posAtCoords` (and thus vertical cursor motion) for positions outside of the vertical range of the document might or might not return the start/end of the document.

## 0.19.37 (2021-12-22)

### Bug fixes

Fix regression where plugin replacing decorations that span to the end of the line are ignored.

## 0.19.36 (2021-12-22)

### Bug fixes

Fix a crash in `posAtCoords` when the position lies in a block widget that is rendered but scrolled out of view.

Adding block decorations from a plugin now raises an error. Replacing decorations that cross lines are ignored, when provided by a plugin.

Fix inverted interpretation of the `precise` argument to `posAtCoords`.

## 0.19.35 (2021-12-20)

### Bug fixes

The editor will now handle double-taps as if they are double-clicks, rather than letting the browser's native behavior happen (because the latter often does the wrong thing).

Fix an issue where backspacing out a selection on Chrome Android would sometimes only delete the last character due to event order issues.

`posAtCoords`, without second argument, will no longer return null for positions below or above the document.

## 0.19.34 (2021-12-17)

### Bug fixes

Fix a bug where content line elements would in some cases lose their `cm-line` class.

## 0.19.33 (2021-12-16)

### Breaking changes

`EditorView.scrollTo` and `EditorView.centerOn` are deprecated in favor of `EditorView.scrollIntoView`, and will be removed in the next breaking release.

### Bug fixes

Fix an issue that could cause the editor to unnecessarily interfere with composition (especially visible on macOS Chrome).

A composition started with multiple lines selected will no longer be interruptd by the editor.

### New features

The new `EditorView.scrollIntoView` function allows you to do more fine-grained scrolling.

## 0.19.32 (2021-12-15)

### Bug fixes

Fix a bug where CodeMirror's own event handers would run even after a user-supplied handler called `preventDefault` on an event.

Properly draw selections when negative text-indent is used for soft wrapping.

Fix an issue where `viewportLineBlocks` could hold inaccurate height information when the vertical scaling changed.

Fixes drop cursor positioning when the document is scrolled. Force a content measure when the editor comes into view

Fix a bug that could cause the editor to not measure its layout the first time it came into view.

## 0.19.31 (2021-12-13)

### New features

The package now exports a `dropCursor` extension that draws a cursor at the current drop position when dragging content over the editor.

## 0.19.30 (2021-12-13)

### Bug fixes

Refine Android key event handling to work properly in a GBoard corner case where pressing Enter fires a bunch of spurious deleteContentBackward events.

Fix a crash in `drawSelection` for some kinds of selections.

Prevent a possibility where some content updates causes duplicate text to remain in DOM.

### New features

Support a `maxLength` option to `MatchDecorator` that allows user code to control how far it scans into hidden parts of viewport lines.

## 0.19.29 (2021-12-09)

### Bug fixes

Fix a bug that could cause out-of-view editors to get a nonsensical viewport and fail to scroll into view when asked to.

Fix a bug where  would return 0 when clicking below the content if the last line was replaced with a block widget decoration.

Fix an issue where clicking at the position of the previous cursor in a blurred editor would cause the selection to reset to the start of the document.

Fix an issue where composition could be interrupted if the browser created a new node inside a mark decoration node.

## 0.19.28 (2021-12-08)

### Bug fixes

Fix an issue where pressing Enter on Chrome Android during composition did not fire key handlers for Enter.

Avoid a Chrome bug where the virtual keyboard closes when pressing backspace after a widget.

Fix an issue where the editor could show a horizontal scroll bar even after all lines that caused it had been deleted or changed.

## 0.19.27 (2021-12-06)

### Bug fixes

Fix a bug that could cause `EditorView.plugin` to inappropriately return `null` during plugin initialization.

Fix a bug where a block widget without `estimatedHeight` at the end of the document could fail to be drawn

## 0.19.26 (2021-12-03)

### New features

Widgets can now define a `destroy` method that is called when they are removed from the view.

## 0.19.25 (2021-12-02)

### Bug fixes

Widgets around replaced ranges are now visible when their side does not point towards the replaced range.

A replaced line with a line decoration no longer creates an extra empty line block in the editor.

The `scrollPastEnd` extension will now over-reserve space at the bottom of the editor on startup, to prevent restored scroll positions from being clipped.

### New features

`EditorView.editorAttributes` and `contentAttributes` may now hold functions that produce the attributes.

## 0.19.24 (2021-12-01)

### Bug fixes

Fix a bug where `lineBlockAt`, for queries inside the viewport, would always return the first line in the viewport.

## 0.19.23 (2021-11-30)

### Bug fixes

Fix an issue where after some kinds of changes, `EditorView.viewportLineBlocks` held an out-of-date set of blocks.

### New features

Export `EditorView.documentPadding`, with information about the vertical padding of the document.

## 0.19.22 (2021-11-30)

### Bug fixes

Fix an issue where editors with large vertical padding (for example via `scrollPastEnd`) could sometimes lose their scroll position on Chrome.

Avoid some unnecessary DOM measuring work by more carefully checking whether it is needed.

### New features

The new `elementAtHeight`, `lineBlockAtHeight`, and `lineBlockAt` methods provide a simpler and more efficient replacement for the (now deprecated) `blockAtHeight`, `visualLineAtHeight`, and `visualLineAt` methods.

The editor view now exports a `documentTop` getter that gives you the vertical position of the top of the document. All height info is queried and reported relative to this top.

The editor view's new `viewportLineBlocks` property provides an array of in-viewport line blocks, and replaces the (now deprecated) `viewportLines` method.

## 0.19.21 (2021-11-26)

### Bug fixes

Fix a problem where the DOM update would unnecessarily trigger browser relayouts.

## 0.19.20 (2021-11-19)

### Bug fixes

Run a measure cycle when the editor's size spontaneously changes.

## 0.19.19 (2021-11-17)

### Bug fixes

Fix a bug that caused the precedence of `editorAttributes` and `contentAttributes` to be inverted, making lower-precedence extensions override higher-precedence ones.

## 0.19.18 (2021-11-16)

### Bug fixes

Fix an issue where the editor wasn't aware it was line-wrapping with its own `lineWrapping` extension enabled.

## 0.19.17 (2021-11-16)

### Bug fixes

Avoid an issue where stretches of whitespace on line wrap points could cause the cursor to be placed outside of the content.

## 0.19.16 (2021-11-11)

### Breaking changes

Block replacement decorations now default to inclusive, because non-inclusive block decorations are rarely what you need.

### Bug fixes

Fix an issue that caused block widgets to always have a large side value, making it impossible to show them between to replacement decorations.

Fix a crash that could happen after some types of viewport changes, due to a bug in the block widget view data structure.

## 0.19.15 (2021-11-09)

### Bug fixes

Fix a bug where the editor would think it was invisible when the document body was given screen height and scroll behavior.

Fix selection reading inside a shadow root on iOS.

## 0.19.14 (2021-11-07)

### Bug fixes

Fix an issue where typing into a read-only editor would move the selection.

Fix slowness when backspace is held down on iOS.

## 0.19.13 (2021-11-06)

### Bug fixes

Fix a bug where backspace, enter, and delete would get applied twice on iOS.

## 0.19.12 (2021-11-04)

### Bug fixes

Make sure the workaround for the lost virtual keyboard on Chrome Android also works on slower phones. Slight style change in beforeinput handler

Avoid failure cases in viewport-based rendering of very long lines.

## 0.19.11 (2021-11-03)

### Breaking changes

`EditorView.scrollPosIntoView` has been deprecated. Use the `EditorView.scrollTo` effect instead.

### New features

The new `EditorView.centerOn` effect can be used to scroll a given range to the center of the view.

## 0.19.10 (2021-11-02)

### Bug fixes

Don't crash when `IntersectionObserver` fires its callback without any records. Try to handle some backspace issues on Chrome Android

Using backspace near uneditable widgets on Chrome Android should now be more reliable.

Work around a number of browser bugs by always rendering zero-width spaces around in-content widgets, so that browsers will treat the positions near them as valid cursor positions and not try to run composition across widget boundaries.

Work around bogus composition changes created by Chrome Android after handled backspace presses.

Work around an issue where tapping on an uneditable node in the editor would sometimes fail to show the virtual keyboard on Chrome Android.

Prevent translation services from translating the editor content. Show direction override characters as special chars by default

`specialChars` will now, by default, replace direction override chars, to mitigate https://trojansource.codes/ attacks.

### New features

The editor view will, if `parent` is given but `root` is not, derive the root from the parent element.

Line decorations now accept a `class` property to directly add DOM classes to the line.

## 0.19.9 (2021-10-01)

### Bug fixes

Fix an issue where some kinds of reflows in the surrounding document could move unrendered parts of the editor into view without the editor noticing and updating its viewport.

Fix an occasional crash in the selection drawing extension.

## 0.19.8 (2021-09-26)

### Bug fixes

Fix a bug that could, on DOM changes near block widgets, insert superfluous line breaks.

Make interacting with a destroyed editor view do nothing, rather than crash, to avoid tripping people up with pending timeouts and such.

Make sure `ViewUpdate.viewportChanged` is true whenever `visibleRanges` changes, so that plugins acting only on visible ranges can use it to check when to update.

Fix line-wise cut on empty lines.

## 0.19.7 (2021-09-13)

### Bug fixes

The view is now aware of the new `EditorState.readOnly` property, and suppresses events that modify the document when it is true.

## 0.19.6 (2021-09-10)

### Bug fixes

Remove a `console.log` that slipped into the previous release.

## 0.19.5 (2021-09-09)

### New features

The new `EditorView.scrollTo` effect can be used to scroll a given range into view.

## 0.19.4 (2021-09-01)

### Bug fixes

Fix an issue where lines containing just a widget decoration wrapped in a mark decoration could be displayed with 0 height.

## 0.19.3 (2021-08-25)

### Bug fixes

Fix a view corruption that could happen in situations involving overlapping mark decorations.

## 0.19.2 (2021-08-23)

### New features

The package now exports a `scrollPastEnd` function, which returns an extension that adds space below the document to allow the last line to be scrolled to the top of the editor.

## 0.19.1 (2021-08-11)

### Breaking changes

The view now emits new-style user event annotations for the transactions it generates.

### Bug fixes

Fix a bug where `coordsAtPos` would allow the passed `side` argument to override widget sides, producing incorrect cursor positions.

Fix a bug that could cause content lines to be misaligned in certain situations involving widgets at the end of lines.

Fix an issue where, if the browser decided to modify DOM attributes in the content in response to some editing action, the view failed to reset those again.

## 0.18.19 (2021-07-12)

### Bug fixes

Fix a regression where `EditorView.editable.of(false)` didn't disable editing on Webkit-based browsers.

## 0.18.18 (2021-07-06)

### Bug fixes

Fix a bug that caused `EditorView.moveVertically` to only move by one line, even when given a custom distance, in some cases.

Hide Safari's native bold/italic/underline controls for the content.

Fix a CSS problem that prevented Safari from breaking words longer than the line in line-wrapping mode.

Avoid a problem where composition would be inappropriately abored on Safari.

Fix drag-selection that scrolls the content by dragging past the visible viewport.

### New features

`posAtCoords` now has an imprecise mode where it'll return an approximate position even for parts of the document that aren't currently rendered.

## 0.18.17 (2021-06-14)

### Bug fixes

Make `drawSelection` behave properly when lines are split by block widgets.

Make sure drawn selections that span a single line break don't leave a gap between the lines.

## 0.18.16 (2021-06-03)

### Bug fixes

Fix a crash that could occur when the document changed during mouse selection.

Fix a bug where composition inside styled content would sometimes be inappropriately aborted by editor DOM updates.

### New features

`MouseSelectionStyle.update` may now return true to indicate it should be queried for a new selection after the update.

## 0.18.15 (2021-06-01)

### Bug fixes

Fix a bug that would, in very specific circumstances, cause `posAtCoords` to go into an infinite loop in Safari.

Fix a bug where some types of IME input on Mobile Safari would drop text.

## 0.18.14 (2021-05-28)

### Bug fixes

Fix an issue where the DOM selection was sometimes not properly updated when next to a widget.

Invert the order in which overlapping decorations are drawn so that higher-precedence decorations are nested inside lower-precedence ones (and thus override their styling).

Fix a but in `posAtCoords` where it would in some situations return -1 instead of `null`.

### New features

A new plugin field, `PluginField.atomicRanges`, can be used to cause cursor motion to skip past some ranges of the document.

## 0.18.13 (2021-05-20)

### Bug fixes

Fix a bug that would cause the content DOM update to crash in specific circumstances.

Work around an issue where, after some types of changes, Mobile Safari would ignore Enter presses.

Make iOS enter and backspace handling more robust, so that platform bugs are less likely to break those keys in the editor.

Fix a regression where Esc + Tab no longer allowed the user to exit the editor.

### New features

You can now drop text files into the editor.

## 0.18.12 (2021-05-10)

### Bug fixes

Work around a Mobile Safari bug where, after backspacing out the last character on a line, Enter didn't work anymore.

Work around a problem in Mobile Safari where you couldn't tap to put the cursor at the end of a line that ended in a widget.

## 0.18.11 (2021-04-30)

### Bug fixes

Add an attribute to prevent the Grammarly browser extension from messing with the editor content.

Fix more issues around selection handling a Shadow DOM in Safari.

## 0.18.10 (2021-04-27)

### Bug fixes

Fix a bug where some types of updates wouldn't properly cause marks around the changes to be joined in the DOM.

Fix an issue where the content and gutters in a fixed-height editor could be smaller than the editor height.

Fix a crash on Safari when initializing an editor in an unfocused window.

Fix a bug where the editor would incorrectly conclude it was out of view in some types of absolutely positioned parent elements.

## 0.18.9 (2021-04-23)

### Bug fixes

Fix a crash that occurred when determining DOM coordinates in some specific situations.

Fix a crash when a DOM change that ended at a zero-width view element (widget) removed that element from the DOM.

Disable autocorrect and autocapitalize by default, since in most code-editor contexts they get in the way. You can use `EditorView.contentAttributes` to override this.

Fix a bug that interfered with native touch selection handling on Android.

Fix an unnecessary DOM update after composition that would disrupt touch selection on Android.

Add a workaround for Safari's broken selection reporting when the editor is in a shadow DOM tree.

Fix select-all from the context menu on Safari.

## 0.18.8 (2021-04-19)

### Bug fixes

Handle selection replacements where the inserted text matches the start/end of the replaced text better.

Fix an issue where the editor would miss scroll events when it was placed in a DOM component slot.

## 0.18.7 (2021-04-13)

### Bug fixes

Fix a crash when drag-selecting out of the editor with editable turned off.

Backspace and delete now largely work in an editor without a keymap.

Pressing backspace on iOS should now properly update the virtual keyboard's capitalize and autocorrect state.

Prevent random line-wrapping in (non-wrapping) editors on Mobile Safari.
## 0.18.6 (2021-04-08)

### Bug fixes

Fix an issue in the compiled output that would break the code when minified with terser.

## 0.18.5 (2021-04-07)

### Bug fixes

Improve handling of bidi text with brackets (conforming to Unicode 13's bidi algorithm).

Fix the position where `drawSelection` displays the cursor on bidi boundaries.

## 0.18.4 (2021-04-07)

### Bug fixes

Fix an issue where the default focus ring gets obscured by the gutters and active line.

Fix an issue where the editor believed Chrome Android didn't support the CSS `tab-size` style.

Don't style active lines when there are non-empty selection ranges, so that the active line background doesn't obscure the selection.

Make iOS autocapitalize update properly when you press Enter.

## 0.18.3 (2021-03-19)

### Breaking changes

The outer DOM element now has class `cm-editor` instead of `cm-wrap` (`cm-wrap` will be present as well until 0.19).

### Bug fixes

Improve behavior of `posAtCoords` when the position is near text but not in any character's actual box.

## 0.18.2 (2021-03-19)

### Bug fixes

Triple-clicking now selects the line break after the clicked line (if any).

Fix an issue where the `drawSelection` plugin would fail to draw the top line of the selection when it started in an empty line.

Fix an issue where, at the end of a specific type of composition on iOS, the editor read the DOM before the browser was done updating it.

## 0.18.1 (2021-03-05)

### Bug fixes

Fix an issue where, on iOS, some types of IME would cause the composed content to be deleted when confirming a composition.

## 0.18.0 (2021-03-03)

### Breaking changes

The `themeClass` function and ``-style selectors in themes are no longer supported (prefixing with `cm-` should be done manually now).

Themes must now use `&` (instead of an extra `$`) to target the editor wrapper element.

The editor no longer adds `cm-light` or `cm-dark` classes. Targeting light or dark configurations in base themes should now be done by using a `&light` or `&dark` top-level selector.

## 0.17.13 (2021-03-03)

### Bug fixes

Work around a Firefox bug where it won't draw the cursor when it is between uneditable elements.

Fix a bug that broke built-in mouse event handling.

## 0.17.12 (2021-03-02)

### Bug fixes

Avoid interfering with touch events, to allow native selection behavior.

Fix a bug that broke sub-selectors with multiple `&` placeholders in themes.

## 0.17.11 (2021-02-25)

### Bug fixes

Fix vertical cursor motion on Safari with a larger line-height.

Fix incorrect selection drawing (with `drawSelection`) when the selection spans to just after a soft wrap point.

Fix an issue where compositions on Safari were inappropriately aborted in some circumstances.

The view will now redraw when the `EditorView.phrases` facet changes, to make sure translated text is properly updated.

## 0.17.10 (2021-02-22)

### Bug fixes

Long words without spaces, when line-wrapping is enabled, are now properly broken.

Fix the horizontal position of selections drawn by `drawSelection` in right-to-left editors with a scrollbar.

## 0.17.9 (2021-02-18)

### Bug fixes

Fix an issue where pasting linewise at the start of a line left the cursor before the inserted content.

## 0.17.8 (2021-02-16)

### Bug fixes

Fix a problem where the DOM selection and the editor state could get out of sync in non-editable mode.

Fix a crash when the editor was hidden on Safari, due to `getClientRects` returning an empty list.

Prevent Firefox from making the scrollable element keyboard-focusable.

## 0.17.7 (2021-01-25)

### New features

Add an `EditorView.announce` state effect that can be used to conveniently provide screen reader announcements.

## 0.17.6 (2021-01-22)

### Bug fixes

Avoid creating very high scroll containers for large documents so that we don't overflow the DOM's fixed-precision numbers.

## 0.17.5 (2021-01-15)

### Bug fixes

Fix a bug that would create space-filling placeholders with incorrect height when document is very large.

## 0.17.4 (2021-01-14)

### Bug fixes

The `drawSelection` extension will now reuse cursor DOM nodes when the number of cursors stays the same, allowing some degree of cursor transition animation.

Makes highlighted special characters styleable (``) and fix their default look in dark themes to have appropriate contrast.

### New features

Adds a new `MatchDecorator` helper class which can be used to easily maintain decorations on content that matches a regular expression.

## 0.17.3 (2021-01-06)

### New features

The package now also exports a CommonJS module.

## 0.17.2 (2021-01-04)

### Bug fixes

Work around Chrome problem where the native shift-enter behavior inserts two line breaks.

Make bracket closing and bracket pair removing more reliable on Android.

Fix bad cursor position and superfluous change transactions after pressing enter when in a composition on Android.

Fix issue where the wrong character was deleted when backspacing out a character before an identical copy of that character on Android.

## 0.17.1 (2020-12-30)

### Bug fixes

Fix a bug that prevented `ViewUpdate.focusChanged` from ever being true.

## 0.17.0 (2020-12-29)

### Breaking changes

First numbered release.

