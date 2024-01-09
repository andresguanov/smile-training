/**
 * Función que convierte un objeto en query params
 * @author José Bernardo Bernal Cabrera <bernardo.bernal@alegra.com>
 * @param obj Objeto génerico para convertir
 * @returns Cadena con el resultado de la conversión, en caso de ser un objeto vacío retorna una cadena vacía
 */
export function convertObjectToQueryParams(obj: any) {
  let params = '';
  const keys = Object.keys(obj);
  if (keys.length > 0) {
    const key = keys[0];
    params += `?${key}=${obj[key as keyof typeof obj]}`;
    keys.shift();
    for (const key of keys) {
      params += `&${key}=${obj[key as keyof typeof obj]}`;
    }
  }
  return params;
}

/**
 * Retorna un string con el valor de la cookie solicitada
 * @author José Bernardo Bernal Cabrera <bernardo.bernal@alegra.com>
 * @param name Nombre de la cookie a obtener
 * @returns Valor de la cookie o undefined en caso de no encontrarla
 */
export function getCookie(name?: string): string | undefined {
  if (name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }
  return undefined;
}
