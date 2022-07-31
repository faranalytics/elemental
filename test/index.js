import { $ } from '../dist/index.js'

(async () => {

    try {

        let template = $('html')(
            $('head')(
                $('title', { id: 'a', class: 'title' })('The Title.')
            ),
            $('body')(
                $('div', { id: 'main' })(
                    $('h1')("Heading"),
                    $('br')(),
                    async (sub) => {
                        return $('div')(
                            $('div')(sub),
                            $('div')('TEST2')
                        )(sub);
                        // throw new Error('TEST1')
                    }
                ),
                $('footer')(),
            ),
            $('script')()
        )

        let result1 = await template('TEST123');

        console.log(result1)

        let result2 = await template('TESTABC');

        console.log(result2)
    }
    catch (e) {
        console.log('catch', e);
    }
})();