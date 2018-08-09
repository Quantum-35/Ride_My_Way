window.onload = function(){
    fetch('https://fix-bugs.herokuapp.com/api/v2/rides',{
        method: 'GET',
        headers:{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+window.localStorage.getItem('token')
    }
    })
    .then(res=>res.json())
    .then(data =>{
        console.log(data)
        let output = '';
        data.forEach(response=>{
            // car_name.innerHTML = response['car model']
            output += `<div class='ft_ride_offers'>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Car model: </span>${response['car model']} <br>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Origin: </span>${response['origin']}<br>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Destination: </span>${response['destination']}<br>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Driver's name: </span>${response['driver name']}<br>
                        <button  id="detail_model_sec" onclick="get_details(${response['ride id']})" class="model_details">Details</button> 
                        <button id='btn_join' class="model_details" onclick="join_ride(${response['ride id']})">Join</button>
                    </div>`;
        })
        document.getElementById('center_cards').innerHTML = output;
        let waiting = document.getElementById('user_ride_request')
        waiting.style.display = 'none'
    })
    
}

function join_ride(ride_id){
    let req_modal = document.getElementById('id01')
    req_modal.style.display = 'block';
    let btn_req_joine = document.getElementById('btn_req_ridejoin')
    btn_req_joine.onclick = function(){
        let pickup_location = document.getElementById('req_pickuploc').value;
        let req_destination = document.getElementById('req_destination').value;
        let req_pickuptime = document.getElementById('req_pickuptime').value;
        fetch(`https://fix-bugs.herokuapp.com/api/v2/rides/${ride_id}/requests`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                "pickup": pickup_location,
                "destination": req_destination,
                "pickuptime": req_pickuptime
            })
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.status === 'failed'){
                document.getElementById('wrong_details').style.display='block';
                document.getElementById('wrong_details').innerHTML=data.message
    
                document.getElementById('correct_details').style.display='none';
            }else{
                document.getElementById('correct_details').style.display='block';
    
                document.getElementById('correct_details').innerHTML= 'Request Successfully Created'
    
                document.getElementById('wrong_details').style.display='none';
                setTimeout(function(){document.getElementById('id01').style.display='none'}, 2000)
            }
        })
    }
}

function get_details(ride_id){
    document.getElementById('id02').style.display = 'block'
    fetch(`https://fix-bugs.herokuapp.com/api/v2/rides/${ride_id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+window.localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById('get_ride_loader_details').style.display = 'none'
        let output = '';
        // car_name.innerHTML = response['car model']
        output += `<div class='ft_ride_details'>
                    <h3 style='margin-left: 40%;'>Ride Details</h3> <hr>
                    <span style='color: rgba(2, 49, 49, 0.753); font:30px bold;'>Car model: </span>&nbsp;${data['car_model']} <br>
                    <span style='color: rgba(2, 49, 49, 0.753); font:30px bold;'>Origin: </span>&nbsp;${data['origin']}<br>
                    <span style='color: rgba(2, 49, 49, 0.753); font:30px bold;'>Destination: </span>&nbsp;${data['destination']}<br>
                    <span style='color: rgba(2, 49, 49, 0.753); font:30px bold;'>Driver's name: </span>&nbsp;${data['driver name']}<br>
                    <span style='color: rgba(2, 49, 49, 0.753); font:30px bold;'>Depature Time: </span>&nbsp;${data['depature']} hrs<br>
                    <span style='color: rgba(2, 49, 49, 0.753); font:30px bold;'>Available Seats: </span>&nbsp;${data['seats']}<br>
                    <button onclick="document.getElementById('id02').style.display='none'">Close</button>
                </div>`;
        document.getElementById('get_ride_details').innerHTML = output;
    })
}