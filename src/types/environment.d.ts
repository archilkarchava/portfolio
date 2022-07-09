declare namespace NodeJS {
  type Env = ReturnType<typeof import('../../validateEnv')>
  export interface ProcessEnv extends Env {}
}
