import { getUUID, is64HexDigit } from '@/utils';
import { Context } from 'hono';

export async function connectRoom(c: Context): Promise<Response> {
  const DO_NAMESPACE: DurableObjectNamespace = c.env.ROOM_DO;
  const id = c.req.param('id');

  if (!is64HexDigit(id)) {
    return c.notFound();
  }

  const obj_id = DO_NAMESPACE.idFromString(id);
  const roomDO = DO_NAMESPACE.get(obj_id);

  return roomDO.fetch(c.req);
}

export async function createNewRoomID(c: Context): Promise<Response> {
  const DO_NAMESPACE: DurableObjectNamespace = c.env.ROOM_DO;
  const id = DO_NAMESPACE.newUniqueId();

  return c.json({ id: id.toString() });
}
