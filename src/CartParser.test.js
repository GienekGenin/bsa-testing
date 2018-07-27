import CartParser from './CartParser';

let parse, validate, content;
beforeEach(() => {
    let parser = new CartParser();
    parse = parser.parse;
    validate = parser.validate.bind(parser);
    content = parser.readFile('./samples/cart.csv');
});

describe("CartParser validation method", () => {
    // Add your unit tests here.

    it('Should return [] if file.csv if a valid file', () => {
        expect(validate(content)).toEqual([]);
    });

    let wrongHeader = 'Product name,Price,Quantit\n' +
        'Mollis consequat,9.00,2\n' +
        'Tvoluptatem,10.32,1\n' +
        'Scelerisque lacinia,18.90,1\n' +
        'Consectetur adipiscing,28.72,10\n' +
        'Condimentum aliquet,13.90,1';

    let err = {
        "column": 2,
        "message": "Expected header to be named \"Quantity\" but received Quantit.",
        "row": 0,
        "type": "header",
    };

    it('Not expected name header in file.csv', () => {
        expect(validate(wrongHeader)).toEqual([err]);
    });
    //
    // it('Test appropriate amount of cells', () => {
    //
    // });
    //
    // it('Test cell is empty', () => {
    //
    // });
    //
    // it('Negative number in cell', () => {
    //
    // });
});

describe("CartParser - integration tests", () => {
    // Add your integration tests here.

});