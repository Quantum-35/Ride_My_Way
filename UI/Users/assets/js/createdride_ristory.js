window.onload = function(){
    fetch('https://fix-bugs.herokuapp.com/api/v2/users/ride', {
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
                    <th class="tbl_rows">Car model</th>
                    <th class="tbl_rows">Origin</th>
                    <th class="tbl_rows">Destination</th>
                    <th class="tbl_rows">Depature</th>
                    <th class="tbl_rows">Number of seats</th>
                    <th class="tbl_rows">Driver's name</th>
                    <th class="tbl_rows"> Action</th>
                </tr>
        `
        num = parseInt(0) 
        data.map(response =>{
            num = num + parseInt(1)
            output += `
                <tr class = 'tbl_rowm'> 
                    <td class="tbl_td">${num}</td> 
                    <td class="tbl_td">${response['car model']}</td> 
                    <td class="tbl_td">${response['origin']}</td> 
                    <td class="tbl_td">${response['destination']}</td> 
                    <td class="tbl_td" id='req_status'>${response['depature']}</td> 
                    <td class="tbl_td" id='req_status'>${response['Number of seats']}</td> 
                    <td class="tbl_td" id='req_status'>${response['driver name']}</td>
                    <td class="tbl_td" id='req_status'>
                        <span class='delete_ride'>
                        <img class='img_delete_ride' title="Delete Ride" src="https://res.cloudinary.com/dwzyiea6h/image/upload/v1533215216/ride%20my%20way/trash_icon.png" 
                             alt="delete icon" style='width:20px; margin-left:40%; cursor:pointer;' onclick='return delete_req(${response['ride id']})'>
                        </span>
                    </td>  
                 </tr>
            `
            document.getElementById('tbl_reqhistdata').innerHTML = output;
            let waiting = document.getElementById('user_ride_history')
            waiting.style.display = 'none'
        })
    })
}

function delete_req (ride_id){
    console.log('Do you want to delete ride id '+ ride_id)
}