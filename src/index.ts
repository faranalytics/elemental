class Elemental {

    public r: any;
    public promise: Promise<string>;

    constructor() {

        this.promise = new Promise((r, j) => {
            this.r = r;
        });
    }
}

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

    function el(this: Elemental, ...nodes: Array<string | Function>): ((it: any) => Promise<string>) {

        this.r();

        if (nodes.length) {

            return async (sub: any): Promise<string> => {

                return `${openingTag}${(await Promise.all(nodes.map(async (node: string | Function) => {

                    if (typeof node == `string`) {
                        
                        return node;
                    }
                    else if (typeof node == `function`) {

                        let render: string = await node(sub);

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
            return async function () { return openingTag };
        }
    }

    let elemental = new Elemental();

    return el.bind(elemental);
}

let el = $;

export { $, el };

