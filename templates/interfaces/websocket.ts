import WebSocket from 'ws';

export class ICustomWebSocket extends WebSocket {
  id: string;
  isAlive: boolean;
  deviceId?: string;
}

export class PayloadMessage {
  type: string;
  data: {
    message: string;
    [key: string]: string | number;
  };
}
