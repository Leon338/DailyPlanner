import { isUndefined } from '@/utils';

export async function register(username: string, password: string) {
  if (isUndefined(username) || isUndefined(password)) {
    return;
  }
}

export async function login(username: string, password: string) {
  if (isUndefined(username) || isUndefined(password)) {
    return;
  }
}
