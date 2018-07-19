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
        console.log(data)
        num = parseInt(0) 
        data.map(response =>{
            console.log(response)
            num = num + parseInt(1)
            output += `
                <tr class = 'tbl_rowm'> 
                    <td class="tbl_td">${num}</td> 
                    <td class="tbl_td">${response['destination']}</td> 
                    <td class="tbl_td">${response['pickup']}</td> 
                    <td class="tbl_td">${response['pickuptime']}</td> 
                    <td class="tbl_td">${response['ride id']}</td> 
                    <td class="tbl_td" style='width:5%;'>
                        <button class='btn_tbl_accept' onclick=ride_accept()>Accept</button>
                        <button class='btn_tbl_rej' id=btn_reject_ride>Reject</button>
                    </td> 
                 </tr>
            `
        })
        document.getElementById('tbl_reqdata').innerHTML = output;

    })
}


function ride_accept(){
    console.log('Button')
}