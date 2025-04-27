document.addEventListener('DOMContentLoaded', () => {
    const cookies = document.cookie.split(';');
    let usr = cookies.find((c) => {
        return c.startsWith('usr=');
    })

    if (usr) {
        console.log('LOGADO COMO: ', usr.split('=')[1]);
    }
});
