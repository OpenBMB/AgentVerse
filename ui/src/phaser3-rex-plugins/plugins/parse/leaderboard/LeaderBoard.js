import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import Post from './Post.js';;
import LoadMethods from './LoadMethods.js';
import GetScore from './GetScore.js';
import GetRank from './GetRank.js';
import DeleteMethods from './DeleteMethods.js';
import GetQueryMethods from './GetQueryMethods.js';
import PageLoader from '../pageloader/PageLoader.js';

class LeaderBoard {
    constructor(config) {
        this.setClassName(GetValue(config, 'className', 'Item'));

        this.userInfo = { userID: undefined, userName: undefined };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', undefined));
        this.setBoardID(GetValue(config, 'boardID', undefined));
        this.setTag(GetValue(config, 'tag', undefined));
        this.setTimeFilters(GetValue(config, 'timeFilters', false));
        this.setTimeFilterType(GetValue(config, 'timeFilterType', 'year'));

        this.page = new PageLoader({
            itemCount: GetValue(config, 'pageItemCount', 100)
        });
        this.resetQueryFlag = true;
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setClassName(className) {
        this.resetQueryFlag = true;
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    setUser(userID, userName) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
            this.userName = userName;
        }
        return this;
    }

    setBoardID(boardID) {
        this.resetQueryFlag |= (this.boardID !== boardID);
        this.boardID = boardID;
        return this;
    }

    setTag(tag) {
        this.resetQueryFlag |= (this.tag !== tag);
        this.tag = tag;
        return this;
    }

    setTimeFilters(filters) {
        if (filters === false) {
            this.timeFilters = false;
        } else { // filters is true, or a plain object
            this.timeFilters = {
                d: GetValue(filters, 'day', true),
                w: GetValue(filters, 'week', true),
                m: GetValue(filters, 'month', true),
                y: GetValue(filters, 'year', true)
            }
        }
        return this;
    }

    setTimeFilterType(type) {
        this.resetQueryFlag |= (this.timeFilterType !== type);
        this.timeFilterType = type;
        return this;
    }

    setPageItemCount(count) {
        this.page.setItemCount(count);
        return this;
    }

    get baseQuery() {
        return new Parse.Query(this.customClass);
    }

    get pageIndex() {
        return this.page.pageIndex;
    }

    get isFirstPage() {
        return (this.page.pageIndex === 0);
    }

    get isLastPage() {
        return (this.page.isFullPage === false);
    }
}

var methods = {
    post: Post,
    getScore: GetScore,
    getRank: GetRank
}

Object.assign(
    LeaderBoard.prototype,
    methods,
    GetQueryMethods,
    LoadMethods,
    DeleteMethods
);

export default LeaderBoard;