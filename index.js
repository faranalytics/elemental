
class Root {
    constructor(tag) {
        this.contents = [`<${tag}>`]
    }

    async render(sub) {

        return (await Promise.all(this.contents.map(async (value) => {

            if (typeof value == 'function') {
                return value(sub);
            }

            return value;
        }))).join('');
    }
}

function $(tag, attr) {

    return function (..._nodes) {

        let root = new Root(tag);

        for (let node of _nodes) {

            if (typeof node == 'string' || typeof node == 'function') {
                root.contents.push(node);
            }
            else {
                root.contents.push(...node.contents);
            }
        }

        root.contents.push(`</${tag}>`);

        return root;
    }
}


(async () => {

    let main = $('div', { id: 'main' })(
        $('h1')("Heading"),
        async (sub) => sub
    );

    let template = $('html')(
        $('head')(
            $('title')('The Title.')
        ),
        $('body')(
            main,
            $('footer')(),
        ),
        $('script')()
    )

    let result1 = await template.render('TEST123');

    console.log(result1)

    let result2 = await template.render('TESTABC');

    console.log(result2)
})();
