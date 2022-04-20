import { watch } from 'fs';
import { io } from '.';

export default function runInDevMode(distPath: string) {
    console.log('Dev mode');
    watch(distPath).on('change', () => io.emit('reloadPage'));
}