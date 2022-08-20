const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
import * as index from './index.js'
import * as sceneryHandler from './sceneryHandler.js'
import {rooms} from './suggestions.js'

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];


    if(userData){

        //enter klickad
        //Kalla till rätt våning och rum
        if(e.keyCode == 13){
            index.load('Models/Våning' + rooms[userData].floor + '.glb', 0.1, 0, -20, 0, 0) 
            index.moveHighlighter(rooms[userData].position)

            //rooms är en nyckelvärdetabell där rummet (userdata) används som nyckel
            //värdet är ett objekt med position och våning
        } 

        icon.onclick = ()=>{
            //här kallas om man klickar på ett suggestion.
            
        }

        emptyArray = Object.keys(rooms).filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        //console.log("...")
        //index.load('Models/' + selectData + '.glb')
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


//__________________________________________________
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    document.getElementById("myDropdown").classList.toggle("show");

    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  







