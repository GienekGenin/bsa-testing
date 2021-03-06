import CartParser from './CartParser';

let parse, validate, parseLine, calcTotal;

beforeEach(() => {
    let parser = new CartParser();
    parse = parser.parse.bind(parser);
    validate = parser.validate.bind(parser);
    parseLine = parser.parseLine.bind(parser);
    calcTotal = parser.calcTotal;
});

describe("CartParser unit tests", () => {
    // Add your unit tests here.
    describe("validate method tests", () => {
        it('Should return [] of errors on valid data', () => {
            let validContent = 'Product name,Price,Quantity\n' +
                'item,1,1';
            expect(validate(validContent)).toEqual([]);
        });

        it('Should return err if not valid header', () => {
            // csv file content with wrong header
            let wrongHeader = 'Product name,Price\n' +
                'item,1,1';

            // err that should be expected
            let err = {
                "column": 2,
                "message": "Expected header to be named \"Quantity\" but received undefined.",
                "row": 0,
                "type": "header",
            };
            expect(validate(wrongHeader)).toEqual([err]);
        });

        it('Should return err if there is not appropriate amount of cells', () => {
            let wrongContent = 'Product name,Price,Quantity\n' +
                'item,1';
            let err = {
                "column": -1,
                "message": "Expected row to have 3 cells but received 2.",
                "row": 1,
                "type": "row",
            };
            expect(validate(wrongContent)).toEqual([err]);
        });

        it('Should return err if not valid type of price or quantity cell', () => {
            // content with negative number in first row and NaN && negative number in second row
            let wrongContent = 'Product name,Price,Quantity\n' +
                'item,-1,1\n' +
                `item,string,-1\n`;
            // err that should be expected
            let errors = [{
                "column": 1,
                "message": "Expected cell to be a positive number but received \"-1\".",
                "row": 1,
                "type": "cell",
            }, {
                "column": 1,
                "message": "Expected cell to be a positive number but received \"string\".",
                "row": 2,
                "type": "cell",
            }, {
                "column": 2,
                "message": "Expected cell to be a positive number but received \"-1\".",
                "row": 2,
                "type": "cell",
            }];
            expect(validate(wrongContent)).toEqual(errors);
        });

        it('Should return err if there is empty cell string', () => {
            let wrongContent = 'Product name,Price,Quantity\n' +
                ',1,1';
            let err = {
                "column": 0,
                "message": "Expected cell to be a nonempty string but received \"\".",
                "row": 1,
                "type": "cell",
            };
            expect(validate(wrongContent)).toEqual([err]);
        });

        it('Should return all possible err on wrong csv file ', () => {
            let wrongContent = 'Product name,Price\n' +
                'item,1\n' +
                'item,1,-1\n' +
                ',1,1';
            let err = [
                {
                    "column": 2,
                    "message": "Expected header to be named \"Quantity\" but received undefined.",
                    "row": 0,
                    "type": "header",
                },
                {
                    "column": -1,
                    "message": "Expected row to have 3 cells but received 2.",
                    "row": 1,
                    "type": "row",
                },
                {
                    "column": 2,
                    "message": "Expected cell to be a positive number but received \"-1\".",
                    "row": 2,
                    "type": "cell",
                },
                {
                    "column": 0,
                    "message": "Expected cell to be a nonempty string but received \"\".",
                    "row": 3,
                    "type": "cell",
                },
            ];
            expect(validate(wrongContent)).toEqual(err);
        });
    });

    describe("parseLine method tests", () => {

        it("Should return rounded value of price", () => {
            const line = 'item,1.000,1';
            expect(parseLine(line).price).toEqual(1);
        });

        it("Should return valid item", () => {
            const line = 'item,1.000,1.000';
            const expected = {
                'name': 'item',
                'price': 1,
                'quantity': 1
            };

            const received = parseLine(line);
            delete received.id;

            expect(received).toEqual(expected);
        })
    });

    describe("calcTotal method tests", () => {

        it("Should return correct total price of all items", () => {
            const items = [
                {
                    name: 'item',
                    price: 1,
                    amount: 1
                },
                {
                    name: 'item',
                    price: 2,
                    amount: 2
                }
            ];
            const line_1 = parseLine(`item,${items[0].price},${items[0].amount}`);
            const line_2 = parseLine(`item,${items[1].price},${items[1].amount}`);
            const expected_sum = 5;

            const result = calcTotal([line_1, line_2]);

            expect(result).toBe(expected_sum);
        })
    });
});

describe("CartParser - integration tests", () => {
    // Add your integration tests here.
    let parser = new CartParser();
    it('Should return error of wrong header', () => {
        expect(() => parser.parse('./samples/test.csv')).toThrow();
    });
});