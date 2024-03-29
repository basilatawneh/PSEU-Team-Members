
let allMembers = [];

let index;

function saveData(data){
    window.localStorage.setItem('user', JSON.stringify(data));
}

function getData(){
    allMembers = JSON.parse(window.localStorage.getItem('user'));
    return allMembers;
}

function displayData(data){
    let menu = document.getElementsByClassName("right-part-pargraphs")[0];
    let items = document.getElementsByClassName('right-header-part-right')[0];
    let res = "";
    data.forEach(function (item) {
        res = res + "<div onclick = 'showDataOnPopup( this.id)' id = '" + item.email + "'class=\"para\">";
        res = res + "<div><img src=\"images/icon.png\" alt=\"icon\" height=\"42\" width=\"42\"></div>";
        res = res + "<div>"
        res = res + "<div class=\"para-name\">";
        res = res + item.name;
        res = res + "</div>"
        res = res + "<div class=\"para-email-major-role\">"
        res = res + "<span>" + item.email + "</span> / ";
        res = res + "<span>" + item.major + "</span> / ";
        res = res + "<span>" + item.role + "</span> / ";;
        res = res + "</div>"
        res = res + "<div class=\"over\">"
        res = res + item.bio;
        res = res + "</div>"
        res = res + "</div>"                   
        res = res + "</div>"
  
    });
    items.innerHTML = data.length;
    if(data.length>1)
        items.innerHTML += " items"
    else
        items.innerHTML += " items"
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

function getTheTime(){
    let today = new Date();

    let time = ""//today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if(today.getHours()<10)
        time += "0" + today.getHours() + ":";
    else
        time += today.getHours() + ":";
    
    if(today.getMinutes()<10)
        time += "0" + today.getMinutes() + ":";
    else
        time += today.getMinutes() + ":";
    
    if(today.getSeconds()<10)
        time += "0" + today.getSeconds();
    else
        time += today.getSeconds();
    
    return time;
}
function addMember (){
    allMembers = getData();

    let name = document.getElementsByTagName("form")[0][0].value;
    let email = document.getElementsByTagName("form")[0][1].value;
    let major = document.getElementsByTagName("form")[0][2].value;
    let role = document.getElementsByTagName("form")[0][3].value;
    let bio = document.getElementsByTagName("form")[0][4].value;
    let index = document.getElementsByTagName("form")[0][6].value;
    index = parseInt(index);
    if(index <= 0 || index >allMembers.length +1){
        alert("your index is incorect pleas chois index between 0 -" + allMembers.length);
        return ;
    }
    
    for (let item of allMembers){
        if(item.email == email){
            alert("your email " +email +" is found please enter another one :)");
            return ;
        }
    }
    let time = getTheTime();
    let member = {
        "name": name,
        "email": email,
        "major": major,
        "role": role,
        "bio": bio,
        "time": time
    }
    allMembers.splice( index-1, 0, member);
    displayData(allMembers)
    saveData(allMembers)
  
  }
function FilterMajorRole(data){
    let major = document.getElementsByName('major_filter')[0];
    let role = document.getElementsByName("role_filter")[0];
   
    let filteredData = [];
    data.forEach(function (item) {
  
      if(major.value != "" && role.value != ""){
          if(item.major == major.value && item.role == role.value)
            filteredData.push(item);  
      }
      else if(major.value != ""){
        if(item.major == major.value)
          filteredData.push(item);
        
      }
      else if(role.value != ""){
        if( item.role == role.value)
          filteredData.push(item);
        
      }else 
      filteredData.push(item);
    });
  
    return filteredData;
    
}
function sortItems(data){
    let soryBy = document.getElementsByName("sort")[0] ;
  
    if(soryBy.value == 0)
    data.sort((a,b) => (a.name > b.name ? 1 : -1));
    else if(soryBy.value == 1)
    data.sort((a,b) => (a.name < b.name ? 1 : -1));
    else if(soryBy.value == 2)
    data.sort((a,b) => (a.time > b.time ? 1 : -1));
    else if(soryBy.value == 3)
    data.sort((a,b) => (a.time < b.time ? 1 : -1));
    return data;
   /// displayData(data2);
}
function searchByName(data){
    let name = document.getElementById("search-name");
    let ans = [];
    
    if(name.value.length>0){
      data.forEach(function (item){
        
        if(item.name.indexOf(name.value) != -1)
        ans.push(item);
      });
      return (ans)
    }else return data;
  
}
function Filter(){
    allMembers = getData();
    let res = FilterMajorRole(allMembers);
    res = searchByName(res);
    res = sortItems(res);
  
    displayData(res);
}
function findTheElement(data,aim){
    let index = -1;
    for(let ind in data ){
        if(data[ind].email == aim){
            index = ind;
            break; 
        }
    }
    return index;
}
function showDataOnPopup(id){
    let name = document.getElementById("popup_name") ;
    let email = document.getElementById("popup_email") ;
    let major = document.getElementById("popup_major") ;
    let role = document.getElementById("popup_role") ;
    let bio = document.getElementById("popup_bio") ;
    index =findTheElement(allMembers,id);
    name.innerHTML = allMembers[index].name;
    email.value = id;
    major.value = allMembers[index].major;
    role.value = allMembers[index].role;
    bio.value = allMembers[index].bio;

    let popup =document.getElementsByClassName("hidden")[0];
    popup.style.display = "block"
}
function closePopup(){
    let popup =document.getElementsByClassName("hidden")[0];
    popup.style.display = "none"
}
function deletitem(){
    let email = document.getElementById("popup_email") ;
    allMembers.splice(index,1);
    saveData(allMembers);
    getData();
    displayData(allMembers);
    closePopup();
}
function edit(){
    let email = document.getElementById("popup_email") ;
    let major = document.getElementById("popup_major") ;
    let role = document.getElementById("popup_role") ;
    let bio = document.getElementById("popup_bio") ;
    //index =findTheElement(allMembers,email.value);

    let newIndex = findTheElement(allMembers,email.value);
    if(newIndex != -1 && newIndex != index){
        alert("your email " +email.value +" is found please enter another one :)");
        return ;
    }
    if(bio.value.length < 500) {
        alert("The bio size short please add more content :)");
        return ;
    }
    if(bio.value.length > 1500) {
        alert("The bio size larg please remove more content :)");
        return ;
    }
    allMembers[index].email = email.value;
    allMembers[index].major = major.value;
    allMembers[index].role = role.value;
    allMembers[index].bio = bio.value;

    saveData(allMembers);
    getData();
    displayData(allMembers);
    closePopup();

}