import { Buffer } from 'node:buffer';
import dbo from './dbo.js';

function User (body) {
    if (body instanceof URLSearchParams) {
        this.email = body.get('email');
        this.password = body.get('password');
    } else {
        this.id = body.id;
        this.email = body.email;
        this.password = body.password;
    }
}

function login (req, res) {
    const buffers = [];

    req.on('data', (chunk) => {
        buffers.push(chunk);
    });

    req.on('end', async () => {
        const url = new URL(req.headers['referer']);
        res.statusCode = 303;

        if (buffers.length > 0) {
            const body = new URLSearchParams(Buffer.concat(buffers).toString());
            const usr = new User(body);
            const rs = await dbo.usuario.get(usr);

            if (rs.length > 0) {
                res.setHeader('Set-Cookie', `usr=${usr.email}; Domain=${url.host}`);
                res.setHeader('Location', url.origin);
            } else {
                res.setHeader('Location', url.href + '?response=failed');
            }
        } else {
            res.setHeader('Location', url.href + '?response=failed');
        }
        res.end();
    });
}

export { User };

export default login;


