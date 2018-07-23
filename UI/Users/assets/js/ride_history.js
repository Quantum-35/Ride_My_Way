window.onload = function(){
    let ride_history = document.getElementById('user_ride_history')
    console.log(ride_history.innerHTML)
    ride_history.innerHTML = '<table ><th class="tbl_rows">Name</th><tr><td>Quantum</td></tr></table>'
}