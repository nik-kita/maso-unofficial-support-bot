declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      DOMAIN: string;
      PORT: string;
    }
  }
}

export { };
