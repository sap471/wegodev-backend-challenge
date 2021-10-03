import "reflect-metadata";
import {
  getConnectionOptions,
  ConnectionOptions,
  createConnection,
} from "typeorm";
import { User } from "./entities/User";
import { isDev } from "./utils/constans";

const getOptions = async (): Promise<ConnectionOptions> => {
  let connectionOptions: ConnectionOptions;

  connectionOptions = {
    type: "postgres",
    synchronize: true,
    logging: false,
    extra: {
      ssl: true,
    },
    entities: ["dist/entities/*.*"],
  };

  if (process.env.DATABASE) {
    Object.assign(connectionOptions, { url: process.env.DATABASE });
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

export const startDatabase = async (): Promise<void> => {
  const typeOrmConfig = await getOptions();
  await createConnection(typeOrmConfig);
};
