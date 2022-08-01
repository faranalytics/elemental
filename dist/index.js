class Elemental {
    r;
    promise;
    constructor() {
        this.promise = new Promise((r, j) => {
            this.r = r;
        });
    }
}
function $(tag, attr) {
    if (typeof attr == `object`) {
        var sattr = Object.entries(attr).map(([key, value]) => {
            return `${key}="${value}"`;
        }).join(` `);
        var openingTag = `<${tag}${attr ? ` ${sattr}` : ``}>`;
    }
    else {
        var openingTag = `<${tag}>`;
    }
    let closingTag = `</${tag}>`;
    function el(...nodes) {
        this.r();
        if (nodes.length) {
            return async (sub) => {
                return `${openingTag}${(await Promise.all(nodes.map(async (node) => {
                    if (typeof node == `string`) {
                        return node;
                    }
                    else if (typeof node == `function`) {
                        let render = await node(sub);
                        if (typeof render == `string`) {
                            return render;
                        }
                        else {
                            throw new Error(`Expected a string; however, a ${typeof render} was returned instead.`);
                        }
                    }
                    else {
                        throw new Error(`Expected a string or function; however, a ${typeof node} was encountered instead.`);
                    }
                }))).join(``)}${closingTag}`;
            };
        }
        else {
            return async function () { return openingTag; };
        }
    }
    let elemental = new Elemental();
    return el.bind(elemental);
}
let el = $;
export { $, el };
