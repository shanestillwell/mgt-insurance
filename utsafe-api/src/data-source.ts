import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Quote } from "./entity/Quote"

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: "postgres",
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "postgres",
  // database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Quote],
  migrations: [],
  subscribers: [],
})
