const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('Should generate the correct location message', () => {
        var temp = {
            from: 'tester',
            latitude: 1,
            longitude: 1
        }

        var message = generateLocationMessage(temp.from, temp.latitude, temp.longitude);
        expect(message.from).toBe(temp.from);
        expect(message.url).toBe(`http://www.google.com/maps?q=${temp.latitude},${temp.longitude}`);
        expect(typeof message.createdAt).toBe('number');
    });
});