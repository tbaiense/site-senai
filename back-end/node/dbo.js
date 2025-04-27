import mysqlx from '@mysql/xdevapi';
import { User } from './login.js';

const config = {
    host: '127.0.0.1',
    port: 33060,
    user: 'root',
    password: 'root',
    schema: 'senai'
};

function getConnection() {
    return mysqlx.getSession(config); // retorna Promise de objeto Session
}

const dbo = {
    mensagem: {
        insert: (msg) => {
            getConnection()
                .then((session) => {
                    session
                        .sql(`INSERT INTO mensagem (nome, email, assunto, curso_matricula, mensagem_adic) VALUES (?, ? ,? , ?, ?)`).bind(msg.nome, msg.email, msg.assunto, msg.curso, msg.mensagemAdicional)
                            .execute()
                            .then(() => {
                                console.log('enviado!');
                            });
                });
        },
    },

    usuario: {
        get: async (usr) => {
            return await getConnection()
                .then( async session => {
                    return await session.sql('SELECT id, email, senha FROM usuario WHERE email = ? AND senha = ? LIMIT 1').bind(usr.email, usr.password)
                        .execute()
                        .then( rs => {
                            const resp = [];
                            if (rs.hasData()) {
                                const row = rs.fetchOne();

                                const obj = {
                                    id: row[0],
                                    email: row[1],
                                    senha: row[2]
                                }

                                const usrFound = new User(obj);
                                resp.push(usrFound);
                            }
                            return resp;
                        });
                });
        }
    }
};

export default dbo;
