const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var temp = {
            from: 'alice@wonderland.com',
            text: 'Adventure!'
        }
        var user = generateMessage(temp.from, temp.text);
        expect(user.from).toBe(temp.from);
        expect(user.text).toBe(temp.text);
        expect(typeof user.createdAt).toBe('number');
    });
});