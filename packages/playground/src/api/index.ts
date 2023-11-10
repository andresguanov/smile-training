import ENVIRONMENT from '../../environment.json';
import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';

import { getCookie } from '@/functions';

// Types
import { EnvFile } from '../../types';

const environment = ENVIRONMENT as EnvFile;

// Si se requiere probar en testing reemplazar por el valor local
const env = import.meta.env.VITE_APP_ENVIROMENT;

// Nombre de la cookie de donde se obtendra el token de usuario
const COOKIE_NAME = environment[env].COOKIE_TOKEN;

// URL de la API de Alegra
const API_URL = environment[env].BASE_API_URL;

// Token de usuario para la API de Alegra
export const TOKEN = getCookie(COOKIE_NAME);

/**
 * Realiza una petición a la API de Alegra
 * @author José Bernardo Bernal Cabrera <bernardo.bernal@alegra.com>
 * @param url Dirección del recurso
 * @param method Método empleado para realizar el request
 * @param data Cuerpo de la petición
 * @template T Tipo del cuerpo de la petición
 * @template U Tipo de la respuesta
 * @returns Promesa con el resultado de la petición
 * @see {@link https://developer.alegra.com/ [API Alegra]} Para consultar la documentación
 */
export function makeAlegraAPIRequest<T = any, U = any>(
  url: string,
  method: Method = 'GET',
  data: T | undefined = undefined
): AxiosPromise<U> {
  if (!API_URL) {
    throw new Error('No está definida la key BASE_API_URL en el archivo environment.json', {
      cause: `Key BASE_API_URL is not defined in ${new URL(
        '../environment.json',
        import.meta.url
      )} `,
    });
  }
  if (!TOKEN) {
    throw new Error('No está definido el token de autenticación', {
      cause: `The cookie ${COOKIE_NAME} is not defined`,
    });
  }

  const config: AxiosRequestConfig = {
    method: method,
    url: `${API_URL}v1${url}`,
    headers: {
      authorization: `Bearer ${TOKEN}`,
      'X-Data-Source': 'alegra-smile',
    },
  };
  if (data) {
    config.data = { ...data };
  }
  return axios(config);
}
