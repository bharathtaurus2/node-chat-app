const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should reject non string values', () => {
        var res = isRealString(788);
        expect(res).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('Should allow strings with non-space characters', () => {
        var res = isRealString('Ka gh');
        expect(res).toBe(true);
    });
});