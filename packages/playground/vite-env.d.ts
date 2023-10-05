/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_ENVIROMENT: 'local' | 'testing' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
