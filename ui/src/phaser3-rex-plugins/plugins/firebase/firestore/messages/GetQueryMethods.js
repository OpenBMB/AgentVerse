var Methods = {
    getReceiverQuery(receiverID) {
        if (receiverID === undefined) {
            receiverID = this.receiverID;
        }
        var query = this.rootRef;
        query = (receiverID !== undefined) ? query.where('receiverID', '==', receiverID) : query;
        return query;
    },

    getPageQuery(receiverID) {
        var baseQuery = this.getReceiverQuery(receiverID);
        var nextPageQuery = baseQuery.orderBy('timestamp');
        var prevPageQuery = baseQuery.orderBy('timestamp', 'desc');
        return {
            next: nextPageQuery,
            previous: prevPageQuery
        }
    }
}

export default Methods;