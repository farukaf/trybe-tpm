declare namespace NodeJS {
  export interface ProcessEnv { 
    RABBITMQ_CONNSTR: string
    EXCHANGE_NAME: string
    QUEUE_NAME: string
  }
}
