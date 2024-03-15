import {  initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push,onValue,remove} from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appsetting={databaseURL:"https://to-do-8dfa8-default-rtdb.firebaseio.com/"}
const app= initializeApp (appsetting)
const database=getDatabase(app)
const doDB=ref(database,"list")

const inputel=document.getElementById("inp")
const addb=document.getElementById("addbt")
const shopel=document.getElementById("act")
addb.addEventListener("click",function(){
    let inputvalue=inputel.value
    push(doDB,inputvalue)
    clear()
    
})
onValue(doDB,function(snapshot){
    if(snapshot.exists()){
        let itemarray=Object.entries (snapshot.val())
        clearel()
       
        for(let i=0;i<itemarray.length;i++){
            let currentitem =itemarray[i]
            let currentitemid=currentitem[0]
            let currentitemvalue=currentitem[1]
            append(currentitem)
        }
    }
    else{
        shopel.innerHTML="No items here......yet" 
    }
   
})
function clear(){
    inputel.value=""
}
function clearel(){
    shopel.innerHTML=""
}
function append(item){
   let itemID=item[0]
   let itemValue=item[1]
   let newel=document.createElement("li")
   newel.textContent=itemValue
   newel.addEventListener("click",function(){
    let exact =ref(database,`list/${itemID}`)
    remove(exact)
   })
   shopel.append(newel)
}
