var SetSwatchColor = function (swatch, color) {
    if (!swatch) {
        return;
    }

    if (swatch.setTint) {
        swatch.setTint(color);
    } else if (swatch.setFillStyle) {
        swatch.setFillStyle(color);
    }
}

export default SetSwatchColor;