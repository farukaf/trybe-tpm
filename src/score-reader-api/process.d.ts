declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_ID: string
    GITHUB_SECRET: string 
    RABBITMQ_CONNSTR: string
    EXCHANGE_NAME: string
  }
}
