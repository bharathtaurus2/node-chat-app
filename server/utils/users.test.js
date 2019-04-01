const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users  = new Users();
        users.users = [{
          id: 1,
          name: 'Mike',
          room: 'Node Course'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React Course'
        }, {
            id: 3,
            name: 'Lily',
            room: 'Node Course'
        }];
    });

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: 233,
            name: 'dummy',
            room: 'office'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should remove a user', () => {
        var id = 2;
        var user = users.removeUser(id);
        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a non-exitent user', () => {
        var id = 6;
        var user = users.removeUser(id);
        expect(user).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () => {
        var id = 3;
        var user = users.getUser(id);
        expect(user.id).toBe(id);
    });

    it('Should not return invalid user', () => {
        var id = 4;
        var user = users.getUser(id);
        expect(user).toBe(undefined);
    });

    it('Should return names for node course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']); 
    });
});