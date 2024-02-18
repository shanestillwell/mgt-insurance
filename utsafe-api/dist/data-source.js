"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Quote_1 = require("./entity/Quote");
exports.AppDataSource = new typeorm_1.DataSource({
    url: process.env.DATABASE_URL,
    type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "postgres",
    // database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Quote_1.Quote],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map