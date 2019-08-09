//mysqlConfig.js
var mysql = require('mysql');
var config = require('./defaultConfig');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            console.log('err', err)
                            reject(err)
                        } else {
                            console.log('rows', rows)
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
   findUserData: function (name) {
        let _sql = `select * from users where username="${name}";`
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
        let _sql = "INSERT INTO users(userid,username,password) VALUES(?,?,?)"
         return allServices.query(_sql, obj)
     },
     checkPassWord: (obj) => {
        let _sql = `select * from users where username=${obj.username} and password=${obj.password}`
        return allServices.query(_sql, obj)
     }
}

module.exports = allServices;