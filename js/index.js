
let allMembers = [];


function saveData(data){
    window.localStorage.setItem('user', JSON.stringify(data));
}

function getData(){
    return window.localStorage.getItem('user');
}

function displayData(data){
    let menu = document.getElementsByClassName("right-part-pargraphs")[0];
    
    let res = "";
    data.forEach(function (item) {
        res = res + "<div class=\"para\">";
        res = res + "<div><img src=\"images/icon.png\" alt=\"icon\" height=\"42\" width=\"42\"></div>";
        res = res + "<div>"
        res = res + "<div class=\"para-name\">";
        res = res + item.name;
        res = res + "</div>"
        res = res + "<div class=\"para-email-major-role\">"
        res = res + item.email + " / " + item.major + " / " + item.role;
        res = res + "</div>"
        res = res + "<div class=\"over\">"
        res = res + item.bio;
        res = res + "</div>"
        res = res + "</div>"                   
        res = res + "</div>"
  
    });
    menu.innerHTML = res;
  }

function bottomIndex(){
    let botttoCheck = document.getElementsByTagName("form")[0][5];
    let indexInput = document.getElementsByTagName("form")[0][6];
    if(botttoCheck.checked == true){
        indexInput.value = allMembers.length;
        indexInput.readonly = true;
    }else{
        indexInput.value = "";
        indexInput.readonly = false;
    }
}
