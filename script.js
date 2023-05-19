const forgot = document.querySelector('span#forgotPass')
const login = document.querySelector('span#login')
const register = document.querySelector('span#register')

const telaLogin = document.querySelector('div#telaLogin')
const telaForgot = document.querySelector('div#telaForgot')
const telaRegister = document.querySelector('div#telaRegister')



function singlePage(num = 2) {
  // ForgotPassword
  if (num == 1) {
    telaLogin.style.display = `none`
    telaRegister.style.display = `none`
    telaForgot.style.display = `flex`
  }
  // Register
  else if (num == 2) {
    telaLogin.style.display = `none`
    telaRegister.style.display = `flex`
    telaForgot.style.display = `none`
  }
  // Login
  else if (num == 3) {
    telaLogin.style.display = `flex`
    telaRegister.style.display = `none`
    telaForgot.style.display = `none`
  }
}
singlePage()

const dados = {
  usuarios: [
    {
      id: 1,
      username: 'admim',
      password: 'admim',
      email: 'admim@admim.com'
    },
    {
      id: 2,
      username: 'fabiojr0',
      password: '12345678',
      email: 'dev.fabio.junior@gmail.com'
    }
  ],
  createUser(userInfos) {
    const id = userInfos.id;
    const idData = Date.now();
    dados.usuarios.push({
      id: id || idData,
      username: userInfos.username,
      password: userInfos.password,
      email: userInfos.email
    });
  },
  changePassword(id, newPassword) {
    const passwordEdit = dados.usuarios.find((user) => {
      return user.id === Number(id);
    });
    passwordEdit.password = newPassword
  },
  verifyUser(username, password) {
    const h3 = document.querySelector('#h3login');
    const usuario = dados.usuarios.find((user) => {
      return user.username === username;
    });
    if (usuario) {
      if (password === usuario.password) {
        h3.style.color = `green`;
        h3.innerHTML = `Logado com sucesso!`
        return true
      }
      else {
        h3.style.color = `red`
        h3.innerHTML = `Senha ou usuário incorretos!`
        return false
      }
    }
    else {
      h3.style.color = `red`
      h3.innerHTML = `Usuário inexistente!`
      return false
    }
  }
};

// dados.createUser({username: 'pedro127', password: 'admim123', email: 'rogerio@ceni.com'})
// dados.changePassword(2, '21412515')
// dados.verifyUser({id: 1, username: 'admim', password: 'admim'})
console.log(dados.usuarios)

const usuarioRegistro = document.querySelector('input#usernameRegister');
const senhaRegistro = document.querySelector('input#passwordRegister');
const senhaConfRegistro = document.querySelector('input#passwordConfirmRegister');
const emailRegistro = document.querySelector('input#emailRegister');


//Create account
document.querySelector('form.register').addEventListener('submit', function registerControl(infos) {
  infos.preventDefault();
  const h3 = document.querySelector('#h3register');
  const username = usuarioRegistro.value;
  const password = senhaRegistro.value;
  const passwordConfirm = senhaConfRegistro.value;
  const email = emailRegistro.value;
  var usernameConfirm = true
  for(var i = 0; i < dados.usuarios.length;i++){
    if(username !== dados.usuarios[i].username){
      usernameConfirm = true
    }else {
      usernameConfirm = false
      break;
    }
    
  }

  if (username.length >= 5 && usernameConfirm) {
    if (verifyPassword(password, passwordConfirm)) {
      if(verifyEmail(email)){
        dados.createUser({ username: username, password: password, email: email });
        console.log(dados.usuarios);
        h3.style.color = 'green';
        h3.innerHTML = "Registrado com sucesso!"
        usuarioRegistro.value = '';
        senhaRegistro.value = '';
        senhaConfRegistro.value = '';
        emailRegistro.value = '';
      }
      else{
        h3.style.color = 'red';
        h3.innerHTML = "Email inválido!"
      }
    }

  }
  else {
    if(usernameConfirm){
      h3.style.color = 'red';
      h3.innerHTML = "O nome de usuário deve ter pelo menos 5 caracteres!"
    }else{
      h3.style.color = 'red';
      h3.innerHTML = "O nome de usuário já existe!"
    }
    
  }


});

//Clear inputs
const clearButtons = document.querySelectorAll('input.clear');
for (var i = 0; i < clearButtons.length; i++) {
  clearButtons[i].addEventListener('click', function clearControl() {
    usuarioRegistro.value = '';
    senhaRegistro.value = '';
    senhaConfRegistro.value = '';
    emailRegistro.value = '';
    emailEsqueci.value = '';
    usuarioLogin.value = '';
    senhaLogin.value = '';
  });
};



//Login in account
const usuarioLogin = document.querySelector('input#usernameLogin');
const senhaLogin = document.querySelector('input#passwordLogin');

document.querySelector('form.login').addEventListener('submit', function registerControl(infos) {
  infos.preventDefault();
  const username = usuarioLogin.value;
  const password = senhaLogin.value;
  const boolean = dados.verifyUser(username, password);

  if (boolean === true) {
    usuarioLogin.value = '';
    senhaLogin.value = '';
  };
});

// Forgot password
const emailEsqueci = document.querySelector('input#emailForgot');

document.querySelector('form.forgot').addEventListener('submit', function registerControl(infos) {
  infos.preventDefault();
  const email = emailEsqueci.value;
  const h3 = document.querySelector('#h3forgot');
  if(verifyEmail(email)){
      
      h3.innerHTML = `Email enviado com sucesso!`;
      h3.style.color = "green";
      emailEsqueci.value = '';
  }
  else{
    h3.style.color = 'red';
    h3.innerHTML = "Email inválido!"
  }
});

function verifyPassword(password, passwordConfirm) {
  const h3 = document.querySelector('#h3register');
  const letrasMaiusculas = /[A-Z]/;
  const letrasMinusculas = /[a-z]/;
  const numeros = /[0-9]/;
  const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_|.|;|:|~]/;
  if (password.length >= 8) {
    if (numeros.test(password)) {
      if (letrasMaiusculas.test(password)) {
        if (letrasMinusculas.test(password)) {
          if (caracteresEspeciais.test(password)) {
            if (password === passwordConfirm) {
              return true
            }
            else {
              h3.style.color = 'red';
              h3.innerHTML = "As senhas não conferem!"
            }
          }
          else{
            h3.style.color = 'red';
            h3.innerHTML = "A senha deve ter um caracter especial!"
          }
        }
        else {
          h3.style.color = 'red';
          h3.innerHTML = "A senha deve ter uma letra minúscula!"
        }
      }
      else {
        h3.style.color = 'red';
        h3.innerHTML = "A senha deve ter uma letra MAIÚSCULA!"
      }
    }
  }
  else {
    h3.style.color = 'red';
    h3.innerHTML = "A senha deve ter pelo menos 8 caracteres!"
  }
}

function verifyEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}