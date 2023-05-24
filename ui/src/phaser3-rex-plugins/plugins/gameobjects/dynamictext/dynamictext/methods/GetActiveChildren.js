const GetAll = Phaser.Utils.Array.GetAll;

var GetActiveChildren = function () {
    return GetAll(this.children, 'active', true);
}

export default GetActiveChildren;