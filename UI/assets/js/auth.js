document.getElementById('sig_form').addEventListener('submit', sig_form);
var signup = document.getElementById('btn_signup')


signup.onclick= function(){
    let name = document.getElementById('txt_username').value;
    let email = document.getElementById('txt_email').value;
    let password = document.getElementById('pass_pasword').value
    let confirm_pass = document.getElementById('conf_password').value

    fetch('https://fix-bugs.herokuapp.com/api/v2/auth/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": name,
            "email": email,
            "address": '126 kitale',
            "password": password,
            "confirm_password": confirm_pass})
    })
    .then(res => res.json())
    .then(data => {
        if(data.message === 'failed'){
            document.getElementById('correct_details').innerHTML=data.message
        }else{
            document.getElementById('wrong_details').innerHTML= data.message
        }
    })
}