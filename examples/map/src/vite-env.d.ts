/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NG_CLIENT_ID: string
  readonly NG_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
