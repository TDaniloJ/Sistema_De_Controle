const form = {
    email: () => document.getElementById('floatingInput'),
    password: () => document.getElementById('floatingPassword'),
}

function login() {
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        location.href = "./dashboard.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if(error.code == 'auth/invalid-credential') {
        return "Usuário ou senha incorreto"
    } 
    return error.message;
}