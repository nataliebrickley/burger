// Import MySQL connection.
const connection = require("../config/connection.js");

const orm = {
    all: function(tableName, cb) {
        let queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }, 
    create: function(tableName, cols, vals, cb) {
        let queryString = "INSERT INTO " + tableName + " (" + cols + ") " + "VALUES (" + printQuestionMarks(vals.length) + ")";
        console.log(queryString)
        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result)
        });
    }, 
    update: function(tableName, col, newVal, condition, cb) {
        let queryString = "UPDATE " + tableName + " SET " + col + " = " + newVal + " WHERE " + condition;
        console.log(queryString)
        connection.query(queryString, (err, result)=>{
          if (err) throw err;
          cb(result);
        })
    },
    // delete: function(tableName, col, val, cb) {
    //   let queryString = "DELETE FROM ?? WHERE ?? = ?";
    //   connection.query(queryString, [tableName, col, val], (err, result) => {
    //     if (err) throw err;
    //     cb(result);
    //   })
    // }
};

function printQuestionMarks(num) {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }


  // Export the orm object for the model.
module.exports = orm;
