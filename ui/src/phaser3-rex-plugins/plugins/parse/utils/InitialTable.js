var InitialTable = function (item) {
    return item.save()
        .then(function (result) {
            return result.destroy();
        })
}

export default InitialTable;