const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};


let sequelize;
// if (configaws) {

//   sequelize = new Sequelize(
//     configaws.database,
//     configaws.username,
//     configaws.password,
//     { 
//       host: "userauth.c3havwwevu6a.us-east-1.rds.amazonaws.com",
//       port: 5432,
        
//       logging: console.log,
//       maxConcurrentQueries: 100,
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl:'Amazon RDS'
//       },
//       pool: { maxConnections: 5, maxIdleTime: 30},
//       language: 'en'
//     }
//   );

// } else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
// }

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
