
var Tasks=[];
completedTask=0;
activeTask=0;


const updateStatus=(index)=>{
    Tasks=JSON.parse(localStorage.getItem('task')) ??[];
    completedTask=0;
    activeTask=0;
    Tasks[index]['status'] !== 'Active' ? Tasks[index]['status']='Active' : Tasks[index]['status']='Completed';
    Tasks.map((elem)=>elem.status=='Completed'?completedTask++:activeTask++);
    localStorage.setItem('task', JSON.stringify(Tasks));
    document.getElementById('taskLeft').innerHTML= activeTask
    document.getElementById('completedTask').innerHTML= completedTask
    document.getElementById('activeTask').innerHTML= activeTask
}
const editValue=(index)=>{
    Tasks=JSON.parse(localStorage.getItem('task')) ??[];
    completedTask=0;
    activeTask=0;
    // Tasks[index]['value'] =;
    Tasks.map((elem)=>elem.status=='Completed'?completedTask++:activeTask++);
    localStorage.setItem('task', JSON.stringify(Tasks));
    document.getElementById('taskLeft').innerHTML= activeTask
    document.getElementById('completedTask').innerHTML= completedTask
    document.getElementById('activeTask').innerHTML= activeTask
}

const showTask= ()=>{
    document.getElementsByClassName("taskList")[0].innerHTML="";
    Tasks=JSON.parse(localStorage.getItem('task')) ??[];
    completedTask=0;
    activeTask=0;
    Tasks.map((elem,ind)=>{
        document.getElementsByClassName("taskList")[0].innerHTML+=`<li>
        <input type="checkbox" id="taskCheck" onchange='updateStatus(${ind})'></input>
         <span id="viewTask">${elem.value}</span>
         <button class="btn-primary" type="button" id="editBtn onclick='editValue(${ind})' ">Edit</button>
         <button class="btn-danger" type="button" id="deleteBtn">Delete</button>
        </li>`
    }
    )
    document.getElementById("allTask").innerHTML=Tasks.length
    Tasks.map((elem)=>elem.status=='Completed'?completedTask++:activeTask++);
    document.getElementById('taskLeft').innerHTML= activeTask
    document.getElementById('completedTask').innerHTML= completedTask
    document.getElementById('activeTask').innerHTML= activeTask
    
}
 showTask();
document.querySelector("#addTask").addEventListener("click", function(){
    var taskValue=document.getElementById("taskInput").value
    Tasks.push({value:taskValue,status:'Active'})
    localStorage.setItem('task', JSON.stringify(Tasks));
    showTask();

})



