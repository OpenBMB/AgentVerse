import UniqueItemList from './uniqueitemlist';

export default class UniqueItemListPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: UniqueItemList.IConfig
    ): UniqueItemList;

    add(
        items?: any[]
    ): UniqueItemList;
}