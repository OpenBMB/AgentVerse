var GetPropertyPath = function (parentPath, property) {
    return (parentPath === '') ? property : `${parentPath}.${property}`;
}
export default GetPropertyPath;