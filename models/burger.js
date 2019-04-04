const orm = require("../config/orm.js");

const burger = {
    all: function(cb) {
        orm.all("burgers", res => {
            cb(res)
        });
    },
    create: function(cols, vals, cb) {
        orm.create("burgers", cols, vals, (res) => {
            cb(res);
        })
    },
    update: function(col, newVal, condition, cb) {
        orm.update("burgers", col, newVal, condition, (res) => {
            cb(res)
        })
    }
}

module.exports = burger;