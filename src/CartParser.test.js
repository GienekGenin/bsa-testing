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


    it('Should return err if there is not expected header', () => {

        // csv file content with wrong header
        let wrongHeader = 'Product name,Price,Quantit\n' +
            'Condimentum aliquet,13.90,1';

        // err that should be expected
        let err = {
            "column": 2,
            "message": "Expected header to be named \"Quantity\" but received Quantit.",
            "row": 0,
            "type": "header",
        };
        expect(validate(wrongHeader)).toEqual([err]);
    });

    it('Should return err if there is negative number', () => {
        // content with negative number
        let wrongContent = 'Product name,Price,Quantity\n' +
            'Mollis consequat,9.00,-2';
        // err that should be expected
        let err = {
            "column": 2,
            "message": "Expected cell to be a positive number but received \"-2\".",
            "row": 1,
            "type": "cell",
        };
        expect(validate(wrongContent)).toEqual([err]);
    });

    // it('Test appropriate amount of cells', () => {
    //     let wrongContent = 'Product name,Price,Quantity\n' +
    //         'Mollis consequat,9.00,-2';
    //     expect(validate(wrongContent)).toEqual([]);
    // });
    //
    // it('Test cell is empty', () => {
    //
    // });
    //
    // good one

});

describe("CartParser - integration tests", () => {
    // Add your integration tests here.

});