import { $ } from '../dist/index.js'

(async () => {

    try {

        let content = $('div')

        let template = $('html')(
            $('head')(
                $('title', { id: 'a', class: 'title' })('The Title.')
            ),
            $('body')(
                $('div', { id: 'main' })(
                    $('h1')("Heading"),
                    $('br')(),
                    $('div')(
                        content,
                        $('div')("TEST2")
                    ),
                    $('footer')(),
                ),
                $('script')()
            )
        )

        content("TEST-123");

        let result1 = await template();

        console.log(result1)

        // let result2 = await template('TESTABC');

        // console.log(result2)
    }
    catch (e) {
        console.log('catch', e);
    }
})();