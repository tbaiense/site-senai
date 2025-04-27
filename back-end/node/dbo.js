import mysqlx from '@mysql/xdevapi';

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
        get: (usr) => {

        }
    }
};

export default dbo;
