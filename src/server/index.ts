import express from 'express';
import { Server } from 'socket.io';
import compression from 'compression';
import { createServer } from 'http';
import { resolve } from 'path';
import runInDevMode from './runInDevMode';
import { ClientsToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from '../common/SocketTypes';

const port = 31415;
const distPath = resolve(process.cwd(), 'build/dist');

export const app = express();
const httpServer = createServer(app);
export const io = new Server<ClientsToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, { });

if(process.env.__DEV__) runInDevMode(distPath);

app.use(compression());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`${distPath}/index.html`);
});

app.use(express.static(distPath));

httpServer.listen(port, () => {
    console.log(`Online on port ${port} !`);
});