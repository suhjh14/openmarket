/**
 * Created by jihoon on 2016. 11. 6..
 */
function User(obj) {
    this.name = obj.name;
    this.age = obj.age;
    this.card = obj.card;
}

User.prototype.info = function info() {
    console.log(this.name);
    console.log(this.age);
    console.log(this.card);
};


module.exports = User;

