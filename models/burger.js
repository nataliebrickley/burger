const orm = require("../config/orm.js");

const burger = {
    all: function(cb) {
        orm.all("burgers", res => {
            cb(res)
        });
    },
    create: function(cb) {
        orm.create("burgers", cols, vals, (res) => {
            cb(res);
        })
    },
    update: function(cb) {
        orm.update("burgers", col, condition, (res) => {
            cb(res)
        })
    }
}

module.exports = burger;