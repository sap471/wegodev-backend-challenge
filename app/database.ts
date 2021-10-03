import "reflect-metadata";
import {
  getConnectionOptions,
  ConnectionOptions,
  createConnection,
} from "typeorm";

const getOptions = async (): Promise<ConnectionOptions> => {
  let connectionOptions: ConnectionOptions;

  connectionOptions = {
    type: "postgres",
    synchronize: true,
    logging: false,
    entities: ["dist/entities/*.*"],
    ssl: {
      rejectUnauthorized: false,
    },
  };

  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

export const startDatabase = async (): Promise<void> => {
  const typeOrmConfig = await getOptions();
  await createConnection(typeOrmConfig);
};
