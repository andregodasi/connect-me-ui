import { api } from './api';

export async function sendHail({
  toUserUUID,
  message,
}: {
  toUserUUID: string;
  message: string;
}) {
  return api.post('/send-message', { toUserUUID, message });
}
