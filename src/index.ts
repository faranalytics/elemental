function $(tag: string, attr?: object): (...nodes: Array<string | Function>) => ((it: any) => Promise<string>) {

    if (typeof attr == `object`) {
        var sattr: string = Object.entries(attr).map(([key, value]) => {
            return `${key}="${value}"`;
        }).join(` `);

        var openingTag = `<${tag}${attr ? ` ${sattr}` : ``}>`;
    }
    else {
        var openingTag = `<${tag}>`;
    }

    let closingTag = `</${tag}>`;

    return function (...nodes: Array<string | Function>): ((it: any) => Promise<string>) {

        if (nodes.length) {

            return async function (it: any): Promise<string> {

                return `${openingTag}${(await Promise.all(nodes.map(async (node: string | Function) => {

                    if (typeof node == `string`) {
                        return node;
                    }
                    else if (typeof node == `function`) {

                        let render: string = await node(it);

                        if (typeof render == `string`) {
                            return render;
                        }
                        else {
                            throw new Error(
                                `Expected a string; however, a ${typeof render} was returned instead.`
                            );
                        }
                    }
                    else {
                        throw new Error(
                            `Expected a string or function; however, a ${typeof node} was encountered instead.`
                        );
                    }
                }))).join(``)
                    }${closingTag}`
            }
        }
        else {
            return async function() { return openingTag};
        }
    }
}

let el = $;

export { $, el };

