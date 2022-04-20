import * as React from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { createRoot } from 'react-dom/client';
import { io, Socket } from 'socket.io-client';
import App from './App';
const TimeRush = React.lazy(() => import('./gamemodes/timeRush/TimeRush'));
const KeepAlive = React.lazy(() => import('./gamemodes/keepAlive/KeepAlive'));
import './index.scss';
import { ServerToClientEvents, ClientsToServerEvents } from '../common/SocketTypes';
import { HashRouter, Routes, Route } from 'react-router-dom';

const firebaseConfig = {
    apiKey: 'AIzaSyBxzywU_485hICgDs5tPbExBKtl7N6XmRA',
    authDomain: 'two-one-dd273.firebaseapp.com',
    projectId: 'two-one-dd273',
    storageBucket: 'two-one-dd273.appspot.com',
    messagingSenderId: '854445191263',
    appId: '1:854445191263:web:ce70e56122c44df470abea',
    measurementId: 'G-B0BH3Z9S46'
};

export const socket: Socket<ServerToClientEvents, ClientsToServerEvents> = io();
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

socket.on('reloadPage', () => {
    window.location.reload();
});

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render((
    <HashRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/time-rush' element={
                    <TimeRush />
                } />
                <Route path='/keep-alive' element={
                    <KeepAlive />
                } />
            </Routes>
        </React.Suspense>
    </HashRouter>
));