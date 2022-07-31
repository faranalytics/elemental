"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.el = exports.$ = void 0;
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
    return function (...nodes) {
        if (nodes.length) {
            return async function (it) {
                return `${openingTag}${(await Promise.all(nodes.map(async (node) => {
                    if (typeof node == `string`) {
                        return node;
                    }
                    else if (typeof node == `function`) {
                        let render = await node(it);
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
            return openingTag;
        }
    };
}
exports.$ = $;
let el = $;
exports.el = el;
