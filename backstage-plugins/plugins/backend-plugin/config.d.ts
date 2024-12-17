export interface Config {
  backend: {
    port: {
      api: {
        baseUrl: string;
        auth: {
          clientId: string;
          clientSecret: string;
        };
      };
    };
  };
}
