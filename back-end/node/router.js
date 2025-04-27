import postMessage from './post-message.js';
import login from './login.js';

function router(req, res) {
    const method = req.method;
    const path = req.url;
    const contentType = req.headers['content-type'];

    switch (path) {
        case '/mensagem': {
            if (method == 'POST' && contentType == 'application/x-www-form-urlencoded') {
                try {
                    postMessage(req, res);
                } catch (err) {
                    console.error("Erro ao realizar POST de mensagem: ", err.message);
                    res.statusCode = 400;
                    res.end();
                }
            } else {
                res.statusCode = 400;
            }
            break;
        };
        case '/login': {
            if (method == 'POST' && contentType == 'application/x-www-form-urlencoded') {
                login(req, res);
            }
            break;
        };
        default: {
            res.statusCode = 400;
            res.end();
        };
    }
} 

export default router;
