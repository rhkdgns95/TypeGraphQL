import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  logging: true,
  synchronize: true,
  database: "typegraphql",
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "qwe123123",
  entities: ["src/entities/*.*"]
};

export default connectionOptions;