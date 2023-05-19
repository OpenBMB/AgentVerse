var DocToHeader = function (doc) {
    var header = doc.data();
    header.headerDocID = doc.id;
    return header;
}

export default DocToHeader;