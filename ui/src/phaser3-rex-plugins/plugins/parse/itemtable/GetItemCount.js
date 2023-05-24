var GetItemCount = function (query) {
    if (query === undefined) {
        query = this.baseQuery;
    }
    return query.count();
}
export default GetItemCount;