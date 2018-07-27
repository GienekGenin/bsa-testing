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

    // it('Not expected name header in file.csv', () => {
    //
    // });
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