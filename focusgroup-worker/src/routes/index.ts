import { getUUID, isUUIDv4 } from '@/utils';
import { Hono } from 'hono';

import { connectRoom, createNewRoomID } from '@/handlers/roomHandler';
import { getStatusText } from 'hono/utils/http-status';

const router = new Hono<Bindings>();

router.get('/room/:id', connectRoom);
router.get('/room/newId', createNewRoomID);

router.notFound((c) => c.json({ message: 'Not Found' }, 404));

export { router };
