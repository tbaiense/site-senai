import http  from 'node:http';
import router from './router.js';

const app = http.createServer((req, res) => {
    try {
        router(req, res);
    } catch (err) {
        console.error(err.message);
        res.end();
    }
});


app.listen(3000, '127.1.0.3');

