export default CreateProxyContext;

declare namespace CreateProxyContext {
    interface IConfig {
        has: (target: Object, key: string) => boolean;
        get:  (target: Object, key: string) => any;
    }
}

declare var CreateProxyContext: (
    config: CreateProxyContext.IConfig,
    baseContext?: Object
) => typeof Proxy;