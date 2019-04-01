class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var usr = this.users.filter((user) => user.id === id);
        
        if(usr) {
            var users = this.users.filter((user) => user.id !== id);
            this.users = users;
        }
        return usr[0];
    }

    getUser(id) {
        var user = this.users.filter((user) => user.id === id);
        return user[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};