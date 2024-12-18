export interface Config {
  port: {
    api: {
      baseUrl: string;
      /**
       * @deepVisibility secret
       */
      auth: {
        clientId: string;
        clientSecret: string;
      };
    };
  };
}
