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
        console.log(data[0]['car model'])
        let output = '';
        data.forEach(response=>{
            console.log(response['car model'])
            // car_name.innerHTML = response['car model']
            output += `<div class='ft_ride_offers'>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Car model: </span>${response['car model']} <br>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Origin: </span>${response['origin']}<br>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Destination: </span>${response['destination']}<br>
                        <span style='color: rgba(2, 49, 49, 0.753);'>Driver's name: </span>${response['driver name']}<br>
                        <button  id="detail_model_sec" onclick='get_details()' class="model_details">Details</button> 
                        <button id='btn_join' class="model_details" onclick="alert('Thank you For choosing this car')">Join</button>
                    </div>`;
            console.log(output)
        })
        document.getElementById('center_cards').innerHTML = output;
    })
    
}

function get_details(){
    console.log('hello world')
}