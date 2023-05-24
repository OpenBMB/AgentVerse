import { GetAllItems } from './CharacterQueryMethods.js';

var GetAllData = function () {
    return GetAllItems(this.characterCollection);
}

export default GetAllData;