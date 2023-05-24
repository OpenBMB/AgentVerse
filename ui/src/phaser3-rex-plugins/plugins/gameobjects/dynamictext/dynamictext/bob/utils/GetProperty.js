var GetProperty = function (name, config, defaultConfig) {
    if (config.hasOwnProperty(name)) {
        return config[name];
    } else {
        return defaultConfig[name];
    }
}

export default GetProperty;