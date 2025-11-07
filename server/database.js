const mysql = require('mysql');
const Sequelize = require("sequelize");

var config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
};

if(process.env.NODE_ENV === 'production') {
  console.log('Running from cloud. Connecting to DB through GCP socket.');
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}
else {
  console.log('Running from localhost. Connecting to DB directly.');
  config.host = process.env.DB_HOST;
}

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error)=> {
  console.error('Unable to connect to the database: ', error);
});

sequelize.sync();

module.exports = sequelize;