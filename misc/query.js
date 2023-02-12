const config = require(`./config.json`)	

const connection = require('mysql2').createConnection({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
});

connection.end()

function retryQuery(connection,  query, retries = 3, interval = 1000) {
    return new Promise((resolve, reject) => {
      function attempt() {
        connection.query(query, (error, results) => {
          if (error) {
            if (retries === 0) {
              reject(error);
              return;
            }
            console.log(`Query failed, retrying in ${interval}ms...`);
            setTimeout(() => {
              retries--;
              attempt();
            }, interval);
          } else {
            resolve(results);
          }
        });
      }
      attempt();
    });
}
  
query(connection, 'SELECT * FROM people')
.then((results) => {
    console.log(results);
}).catch((error) => {});