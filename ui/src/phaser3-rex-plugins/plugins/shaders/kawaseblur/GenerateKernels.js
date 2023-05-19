var GenerateKernels = function (blur, quality, out) {
    if (out === undefined) {
        out = [];
    }

    out.length = quality;
    for (var i = quality; i > 0; i--) {
        out[i] = blur * (i / quality);
    }
    return out;
}

export default GenerateKernels;