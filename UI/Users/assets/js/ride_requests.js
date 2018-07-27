window.onload = function(){
    fetch('https://fix-bugs.herokuapp.com/api/v2/requests', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+window.localStorage.getItem('token')
        }
    })
    .then(res=>res.json())
    .then(data => {
        let output = `
                <tr>
                    <th class="tbl_rows">#</th>
                    <th class="tbl_rows">Destination</th>
                    <th class="tbl_rows">Pickup</th>
                    <th class="tbl_rows">Pickup Time</th>
                    <th class="tbl_rows">Ride Id</th>
                    <th class="tbl_rows">Accepted</th>
                </tr>
        `
        num = parseInt(0) 
        data.map(response =>{
            num = num + parseInt(1)
            output += `
                <tr class = 'tbl_rowm'> 
                    <td class="tbl_td">${num}</td> 
                    <td class="tbl_td">${response['destination']}</td> 
                    <td class="tbl_td">${response['pickup']}</td> 
                    <td class="tbl_td">${response['pickuptime']}</td> 
                    <td class="tbl_td">${response['ride id']}</td> 
                    <td class="tbl_td" style='width:5%;'>
                        <button class='btn_tbl_accept' onclick="return ride_accept(${response['ride id']}, ${response['request id']})">Accept</button>
                        <button class='btn_tbl_rej' id=btn_reject_ride onclick="return ride_reject(${response['ride id']}, ${response['request id']})")>Reject</button>
                    </td> 
                 </tr>
            `
        })
        document.getElementById('tbl_reqdata').innerHTML = output;
        let waiting = document.getElementById('user_ride_request')
        waiting.style.display = 'none'

    })
}


function ride_accept(ride_id, request_id){
    console.log('Accept ride id '+ ride_id + ' request id '+request_id)
    fetch(`https://fix-bugs.herokuapp.com/api/v2/rides/${ride_id}/requests/${request_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                "accepted": "true"
            })
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data)
            document.getElementById('wrong_details').style.display = 'none'
            document.getElementById('correct_details').style.display='block';
            document.getElementById('correct_details').innerHTML = data.message
            setTimeout(function(){document.getElementById('correct_details').style.display='none'}, 4000)
        })
}
ride_reject = (ride_id, request_id) => {
    console.log('Accept ride id '+ ride_id + ' request id '+request_id)
    fetch(`https://fix-bugs.herokuapp.com/api/v2/rides/${ride_id}/requests/${request_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                "accepted": "false"
            })
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data)
            document.getElementById('correct_details').style.display = 'none'
            document.getElementById('wrong_details').style.display='block';
            document.getElementById('wrong_details').innerHTML = data.message
            setTimeout(function(){document.getElementById('wrong_details').style.display='none'}, 4000)
        })
}