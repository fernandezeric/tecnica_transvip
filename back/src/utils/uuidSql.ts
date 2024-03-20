import { connectionDB } from '../db/mysql'

/**
 * Para obtener una UUID sin repetir codigo, utils al insertar datos nuevos.
 * Tener una UUID para luego buscar el nuevo elemento.
 */
export const getUUID = async (): Promise<string> => {
  const [uuidToDish] = await connectionDB.query('SELECT UUID() uuid;')
  const [{ uuid }] = uuidToDish

  return uuid
}
