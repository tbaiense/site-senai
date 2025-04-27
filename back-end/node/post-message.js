import { Buffer } from 'node:buffer';
import dbo from './dbo.js';

function Message(body) {
    this.nome = body.get('nome');
    this.email = body.get('email');
    this.assunto = body.get('assunto');
    this.curso = body.get('curso');
    this.mensagemAdicional = body.get('mensagem-adic');
}

function postMessage (req, res) {
    const buffers = [];
    
    req.on('data', (chunk) => {
        buffers.push(chunk);
    });

    req.on('end', () => {
        if (buffers.length > 0) {
            const body = new URLSearchParams(Buffer.concat(buffers).toString());
            console.log('data', body);
            const msg = new Message(body);
            dbo.mensagem.insert(msg);
            res.statusCode = 303;
            res.setHeader('Location', req.headers['referer'] + '?response=sucess');

            res.end();
        } else {
            throw new Error('request body is empty');
        }
    });
} 

export default postMessage; 
