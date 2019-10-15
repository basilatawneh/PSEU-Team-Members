
let allMembers = [];


function saveData(data){
    window.localStorage.setItem('user', JSON.stringify(data));
}

function getData(){
    return window.localStorage.getItem('user');
}
