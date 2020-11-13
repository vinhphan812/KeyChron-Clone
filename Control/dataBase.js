const fs = require('fs');
const pathUser = "./database/users.json";
const pathDB = "./database/dataTest.json"

function rData(path = pathDB) {
     return new Promise(async(resolve, reject) => {
          try {
               fs.readFile(path, { encoding: 'utf8' }, function(err, data) {
                    if (err) return reject("read file error");
                    resolve(JSON.parse(data));
               })
          } catch (error) {
               reject("read File error");
          }
     })
}

function wData(path = pathDB, data) {
     return new Promise(async(resolve, reject) => {
          try {
               fs.writeFile(path, JSON.stringify(data), (error) => {
                    if (error) return reject(error);
                    resolve("sucess");
               })
          } catch (error) {
               reject("write File error");
          }
     })
}

class dataBase {
     contructor() {}
     getData() {
          return new Promise((resolve, reject) => {
               try {
                    return rData().then(data => resolve(data)).catch(error => reject(error));
               } catch (error) {
                    reject("read data error");
               }
          })
     }
     getProducts() {
          return new Promise((resolve, reject) => {
               try {
                    return rData().then(data => resolve(data.products)).catch(err => reject(err));
               } catch (error) {
                    reject(error);
               }
          })
     }
     getUser() {
          return new Promise(async(resolve, reject) => {
               try {
                    return await rData(pathUser).then(data => resolve(data)).catch(err => reject(err));
               } catch (error) {
                    reject(error);
               }
          })
     }
     addUser(info = { user, pass, name, email }) {
          return new Promise(async(resolve, reject) => {
               rData(pathUser).then((data) => {
                    data.users.push(info);
                    wData(pathUser, data).then((data) => {
                         resolve('success');
                    }).catch(err => reject(err));
               }).catch((err) => {
                    reject(err);
               })
          })
     }
}

module.exports = dataBase;