var usrlogin = document.getElementById('btn_user_login')

// User Login
usrlogin.onclick = function(){
    let email = document.getElementById('txt_logn_email').value;
    let password = document.getElementById('txt_lgn_password').value;
    console.log('hello world')
    // fetch('https://fix-bugs.herokuapp.com/api/v2/auth/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //             "email": email,
    //             "password": password})
    // })
    // .then(res=>res.json())
    // .then(data=>console.log(data))
}