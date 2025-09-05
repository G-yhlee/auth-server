import { Sequelize } from "sequelize";
import { config } from "./db.config.env";
const env = process.env.NODE_ENV || "development";

const databaseName = {
  challenge: "amons_system_challenge",
  sgj4: "amons_system_sgj4",
  gps: "amons_system_gps",
  common: "amons_common",
};

const { user, password, host, port } =
  config.database[env as "development" | "production"];

const genSequelize = (databaseName: string) =>
  new Sequelize(databaseName, user, password, {
    host: host,
    port: port,
    dialect: "mysql",
    pool: {
      max: 100,
      acquire: 30000,
      idle: 10000,
    },
    // timezone: "Asia/Seoul",
  });

const sequelize = {
  challenge: genSequelize(databaseName.sgj4), //genSequelize(databaseName.challenge),
  gps: genSequelize(databaseName.gps),
  sgj4: genSequelize(databaseName.sgj4),
  common: genSequelize(databaseName.common),
};

export { sequelize };
