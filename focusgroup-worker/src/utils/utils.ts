export function isUndefined(obj: Object) {
  return obj === undefined;
}

export function getUUID(): string {
  return crypto.randomUUID();
}

export function isUUIDv4(uuid: string): boolean {
  return (
    uuid.match(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    ) !== null
  );
}

export async function parseBody(request: Request) {
  if (request === undefined) return;

  const bodyString = await request.text();

  if (bodyString === undefined || bodyString.length < 1) return;

  return JSON.parse(bodyString);
}

export function createPostRequest(url: string, bodyJSON: Object): Request {
  url = 'https://' + url;

  return new Request(url, {
    method: 'POST',
    body: JSON.stringify(bodyJSON),
  });
}

export function createJSONResponse(bodyJSON: Object, status: number): Response {
  return new Response(JSON.stringify(bodyJSON), {
    headers: {
      'Content-Type': 'text/json',
    },
    status: status,
  });
}

export function is64HexDigit(str: string) {
  return str.match(/^[0-9a-f]{64}$/) !== null;
}
