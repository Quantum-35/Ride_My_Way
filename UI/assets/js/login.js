var usrlogin = document.getElementById('btn_user_login')

// User Login
usrlogin.onclick = function(){
    let email = document.getElementById('txt_logn_email').value;
    let password = document.getElementById('txt_lgn_password').value;
    fetch('https://fix-bugs.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "email": email,
                "password": password})
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.status === 'failed'){
            document.getElementById('log_wrong_details').style.display='block';
            document.getElementById('log_wrong_details').innerHTML=data.message

            document.getElementById('log_correct_details').style.display='none';
        }else{
            document.getElementById('log_correct_details').style.display='block';

            document.getElementById('log_correct_details').innerHTML= data.message

            document.getElementById('log_wrong_details').style.display='none';
            // stores tokens to the machines local storage
            window.localStorage.setItem('token', data.token)
            redirect: window.location.replace("./Users/users.html") 
        }
    })
}