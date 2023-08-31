import AppendData from './data/pngappender/AppendData';
import ExtractData from './data/pngappender/ExtractData';

declare var Methods: {
    append: typeof AppendData,
    extract: typeof ExtractData
};

export default Methods;