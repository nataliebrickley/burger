// Import MySQL connection.
const connection = require("../config/connection.js");

const orm = {
    all: function(tableName, cb) {
        let queryString = "SELECT * FROM" + tableName + ";";
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }, 
    create: function(tableName, cols, vals, cb) {
        let queryString = "INSERT INTO " + tableName + " (" + cols + ") " + "VALUES (" + printQuestionMarks(vals.length) + ")";
        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result)
        });
    }, 
    update: function(tableName, col, condition, cb) {
        let queryString = "UPDATE " + tableName + " SET" + objToSql(col) + " WHERE" + condition;
        connection.query(queryString, (err, result)=>{
          if (err) throw err;
          cb(result);
        })
    },
    delete: function(tableName, col, val, cb) {
      let queryString = "DELETE FROM ?? WHERE ?? = ?";
      connection.query(queryString, [tableName, col, val], (err, result) => {
        if (err) throw err;
        cb(result);
      })
    }
};

function printQuestionMarks(num) {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

  // Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    const arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

  // Export the orm object for the model.
module.exports = orm;
