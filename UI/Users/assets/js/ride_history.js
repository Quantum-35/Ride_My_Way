window.onload = function(){
    fetch('https://fix-bugs.herokuapp.com/api/v2/user/myrides', {
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
                    <td class="tbl_td" id='req_status'>${response['accepted']}</td> 
                 </tr>
            `
            document.getElementById('tbl_reqhistdata').innerHTML = output;
            let waiting = document.getElementById('user_ride_history')
            waiting.style.display = 'none'
        })
    })
}