export const ENV_SERVICE = Symbol('ENV_SERVICE');

export interface IEnvService {
  api: {
    nodeEnv: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  firebase: {
    projectId: string;
    privateKey: string;
    clientEmail: string;
  };
}
