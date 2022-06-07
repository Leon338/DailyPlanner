import { RoomDurableObject } from './do/roomDurableObject';
import { Board } from './models';
import { createPostRequest } from './utils';

import { SHA256 } from 'crypto-js';

import { Hono } from 'hono';
// import { basicAuth } from 'hono/basic-auth';

import { router } from './routes';

/*export async function handleRequest(
  request: Request,
  env: Bindings,
  context: ExecutionContext
): Promise<Response> {
  const { AUTH_DO, ROOM_DO } = env;

  const url = new URL(request.url);
  const { pathname } = url;

  const authId = AUTH_DO.idFromName('AUTH');
  const auth = AUTH_DO.get(authId);


  switch(pathname) {
    case '/login'
  }

  const req = createPostRequest('login', {
    username: 'Leon',
    password: 'MySecretPassword',
  });
  return auth.fetch(req);
}

const worker: ExportedHandler<Bindings> = {
  async fetch(request: Request, env: Bindings, context: ExecutionContext) {
    return handleRequest(request, env, context);
  },
};*/

/*
const app = new Hono();

app.get('/', (c) => c.text(SHA256('password').toString()));
app.notFound((c) => c.json({ message: 'Not Found' }, 404));

app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
);

app.use(
  '/auth/*',
  jwt({
    secret: 'it-is-very-secret',
    alg: 'SHA-256',
  })
);

app.get('/auth/page', (c) => {
  return c.text('You are authorized');
});

*/

export { RoomDurableObject } from './do';

export default router;

//export default worker;
