

import * as THREE from '../three.js-master/build/three.module.js'

export let rooms = {}

let file = (await fetch('TextFiles/theRoomData.txt')).text().then(

    result => {

        let roomsStrings = result.split("\n")
        roomsStrings.forEach(element => {
            const room = element.split(',')
            rooms[room[0]] = {
                floor: room[1],
                position: new THREE.Vector3(room[2], room[3], room[4])
            }
        });
    }   
)



/*
document.getElementById('file').onchange = function(){
    
    //let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function(progressEvent){
        //________________
        let roomsStrings = this.result.split("\n")
        roomsStrings.forEach(element => {
            const room = element.split(',')
            console.log(room)
            rooms[room[0]] = {
                floor: room[1],
                position: new THREE.Vector3(room[2], room[3], room[4])
            }

            console.log(rooms)
        });
        
    };
    reader.readAsText(file);
};*/



  

/*
  const desk = {
    height: "4 feet",
    weight: "30 pounds",
    color: "brown",
    material: "wood",
  };

*/