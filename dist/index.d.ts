declare function $(tag: string, attr?: object): (...nodes: Array<string | Function>) => ((it: any) => Promise<string>);
declare let el: typeof $;
export { $, el };
