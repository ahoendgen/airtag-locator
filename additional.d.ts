declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      FIND_MY_CACHE_LOCATION: ?string;
    }
  }
}
