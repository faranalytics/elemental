
class Doc {
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

        let doc = new Doc(tag);

        for (let node of _nodes) {

            if (typeof node == 'string' || typeof node == 'function') {
                doc.contents.push(node);
            }
            else {
                doc.contents.push(...node.contents);
            }
        }

        doc.contents.push(`<\\${tag}>`);

        return doc;
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
