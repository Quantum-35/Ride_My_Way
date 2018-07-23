let offer_ride = document.getElementById('btn_offer_ride')

offer_ride.onclick = function(){
    let car_model = document.getElementById('txt_cr_carmodel').value;
    let origin = document.getElementById('txt_cr_origin').value;
    let destination = document.getElementById('txt_cr_destination').value;
    let depature = document.getElementById('txt_cr_depature').value;
    let seats_num = document.getElementById('txt_cr_no_seats').value
    let drivers_name = document.getElementById('txt_cr_driversname').value 
    fetch('https://fix-bugs.herokuapp.com/api/v2/users/rides',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
			'Authorization': 'Bearer '+window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "car_model": car_model,
            "depature": depature,
            "destination": destination,
            "driver_name": drivers_name,
            "origin": origin,
            "seats": seats_num
        })
    })
    .then(res=> res.json())
    .then(data => {
        console.log(data)
        if(data.status === 'failed'){
            document.getElementById('wrong_details').style.display='block';
            document.getElementById('wrong_details').innerHTML=data.message

            document.getElementById('correct_details').style.display='none';
        }else{
            document.getElementById('correct_details').style.display='block';

            document.getElementById('correct_details').innerHTML= data.message

            document.getElementById('wrong_details').style.display='none'; 
        }
    })
}