import env from '../../utils/config/env';
import WebSocket from 'ws';
import { eventCommon, eventWSS } from './event-type';
import logger from '../../utils/config/logger';
import { ICustomWebSocket } from '../../interfaces/websocket';
import HelperCommon from '../../utils/helpers/common';

const port = env.WEB_SOCKET_PORT;
const wss = new WebSocket.Server({
  port,
});
const labelLog = `[websocket/index.js]`;
logger.info(`WebSocket server running on port ${port}`);

wss.on(eventWSS.CONNECTION, (ws: ICustomWebSocket) => {
  const labelLogConnection = `${labelLog} [connection]`;
  const id = HelperCommon.generateGuid();
  logger.info(`${labelLogConnection} client ${id} connected`);
  logger.info(`${labelLogConnection} number client connected ${wss.clients.size}`);
  ws.id = id;
  ws.isAlive = true;
  ws.send(
    JSON.stringify({
      type: eventCommon.CONNECT_SUCCESS,
      socketId: id,
      message: 'Connect Success',
    })
  );

  ws.on(eventWSS.PONG, () => {
    const labelLogPong = `${labelLog} [pong]`;
    logger.info(`${labelLogPong} client deviceId -> ${ws.deviceId} isAlive`);
    ws.isAlive = true;
  });

  ws.on(eventWSS.MESSAGE, (payload: string) => {
    try {
      const labelLogMessage = `${labelLog} [message]`;
      logger.debug(
        `${labelLogMessage} client deviceId -> ${ws.deviceId} send message -> ${payload}`
      );
    } catch (error: any) {
      logger.error(`Something Wrong Event ${eventWSS.MESSAGE} -> ${error.message}`);
      ws.send(JSON.stringify({ type: eventWSS.ERROR, message: error.message }));
      return;
    }
  });

  ws.on(eventWSS.CLOSE, () => {
    const labelLogClose = `${labelLog} [close]`;
    logger.info(`${labelLogClose} disconnect client deviceId -> ${ws.deviceId}`);
    logger.info(`${labelLogClose} number clients after disconnect -> ${wss.clients.size}`);
  });

  ws.on(eventWSS.ERROR, (error: Error) => {
    const labelLogError = `${labelLog} [error]`;
    logger.error(`${labelLogError} client ${ws.id} encountered an error -> ${error?.message}`);
    ws.send(error?.message);
  });
});

const pingInterval = setInterval(() => {
  const wssClients = Array.from(wss.clients).map((x) => x as ICustomWebSocket);
  wssClients.forEach((ws: ICustomWebSocket) => {
    if (!ws.isAlive) {
      logger.info(`${labelLog} [setInterval] Close socket deviceId -> ${ws.deviceId}`);
      ws.close();
      return;
    }
    ws.isAlive = false;
    logger.info(`${labelLog} [setInterval] Ping socket deviceId -> ${ws.deviceId}`);
    ws.ping();
  });
}, 1000 * 30); // 30 seconds

wss.on(eventWSS.CLOSE, () => {
  clearInterval(pingInterval);
});

export default wss;
