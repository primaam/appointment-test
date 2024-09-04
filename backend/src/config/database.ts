import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    database: "appointment_db",
    username: "admin",
    password: "admin",
    port: 5432,
    logging: false,
    define:{
        underscored: true,
        freezeTableName: true
    }
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });
