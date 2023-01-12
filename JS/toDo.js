
var Tasks=[];
completedTask=0;
activeTask=0;


const updateStatus=(index)=>{
    var checkboxElem=document.getElementById(`taskCheck${index}`)
    if(checkboxElem.getAttribute('type')=='checkbox'){
        Tasks=JSON.parse(localStorage.getItem('task')) ??[];
        // completedTask=0;
        // activeTask=0;
        if(Tasks[index]['status'] !== 'Active'){
            Tasks[index]['status']='Active'
            activeTask++ 
            completedTask--
        } else{
            Tasks[index]['status']='Completed';
            completedTask++;
            activeTask--;
        }
        
        localStorage.setItem('task', JSON.stringify(Tasks));
        document.getElementById('taskLeft').innerHTML= activeTask
        document.getElementById('completedTask').innerHTML= completedTask
        document.getElementById('activeTask').innerHTML= activeTask
    }
}
const editValue=(ind)=>{
    var checkboxElem=document.getElementById(`taskCheck${ind}`)
    var spanElem=document.getElementById(`viewTask${ind}`)
    var editElem=document.getElementById(`editBtn${ind}`)
    var deleteElem=document.getElementById(`deleteBtn${ind}`)
    var saveElem=document.getElementById(`saveBtn${ind}`)
    var cancelElem=document.getElementById(`cancelBtn${ind}`)
    checkboxElem.setAttribute("type", "text");
    checkboxElem.setAttribute("value", "");
    spanElem.setAttribute("class","invisible");
    editElem.setAttribute("class","btn-primary float-end mx-2 invisible");
    deleteElem.setAttribute("class","btn-danger float-end mx-2 invisible");
    saveElem.setAttribute("class","btn-primary float-end mx-2 visible");
    cancelElem.setAttribute("class","btn-danger float-end mx-2 visible");
}

const saveValue=(ind)=>{
    var checkboxElem=document.getElementById(`taskCheck${ind}`)
    var editInpElem=document.getElementById(`taskCheck${ind}`)
    var spanElem=document.getElementById(`viewTask${ind}`)
    var editElem=document.getElementById(`editBtn${ind}`)
    var deleteElem=document.getElementById(`deleteBtn${ind}`)
    var saveElem=document.getElementById(`saveBtn${ind}`)
    var cancelElem=document.getElementById(`cancelBtn${ind}`)
    Tasks[ind]['value']=editInpElem.value
    spanElem.innerHTML=editInpElem.value
    spanElem.setAttribute("class","visible");
    
    localStorage.setItem('task', JSON.stringify(Tasks));
    checkboxElem.setAttribute("type", "checkbox");
    editElem.setAttribute("class","btn-primary  float-end mx-2 visible");
    deleteElem.setAttribute("class","btn-danger  float-end mx-2 visible");
    saveElem.setAttribute("class","btn-primary  float-end mx-2 invisible");
    cancelElem.setAttribute("class","btn-danger  float-end mx-2 invisible");
    
}
const cancelValue=(ind)=>{
    var checkboxElem=document.getElementById(`taskCheck${ind}`)
    var editElem=document.getElementById(`taskCheck${ind}`)
    var spanElem=document.getElementById(`viewTask${ind}`)
    var editElem=document.getElementById(`editBtn${ind}`)
    var deleteElem=document.getElementById(`deleteBtn${ind}`)
    var saveElem=document.getElementById(`saveBtn${ind}`)
    var cancelElem=document.getElementById(`cancelBtn${ind}`)
    spanElem.setAttribute("class","visible");
    checkboxElem.setAttribute("type", "checkbox");
    editElem.setAttribute("class","btn-primary float-end mx-2   visible");
    deleteElem.setAttribute("class","btn-danger float-end mx-2   visible");
    saveElem.setAttribute("class","btn-primary float-end mx-2  invisible");
    cancelElem.setAttribute("class","btn-danger float-end mx-2 invisible");
}

const deleteValue=(ind)=>{
    Tasks.splice(ind,1);
    localStorage.setItem('task', JSON.stringify(Tasks));
    showTask();
};
const showTask= ()=>{
    document.getElementsByClassName("taskList")[0].innerHTML="";
    Tasks=JSON.parse(localStorage.getItem('task')) ??[];
    completedTask=0;
    activeTask=0;
    Tasks.map((elem,ind)=>{
        document.getElementsByClassName("taskList")[0].innerHTML+=`<div class="card my-2 mx-3 style="width:80%">
        <div class="card-body">
            <input type="checkbox" id="taskCheck${ind}" onchange='updateStatus(${ind})'></input>
            <span class="visible" id="viewTask${ind}">${elem.value}</span>
                <button class="btn-danger  float-end mx-2 visible" type="button" id="deleteBtn${ind}" onclick="deleteValue(${ind})" >Delete</button>
                <button class="btn-primary float-end mx-2 visible" type="button" id="editBtn${ind}" onclick="editValue(${ind})">Edit</button>
                <button class="btn-danger float-end mx-2 invisible"  type="button" id="cancelBtn${ind}" onclick="cancelValue(${ind})">&times</button>
                <button class="btn-primary float-end mx-2 invisible"  type="button" id="saveBtn${ind}" onclick="saveValue(${ind})">Save</button>
            </div>
      </div>
        

        `
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
    document.getElementById("taskInput").value=""
    showTask();

})

document.querySelector('#clear').addEventListener("click", function(){
    Tasks.splice(0,Tasks.length);
    localStorage.setItem('task', JSON.stringify(Tasks));
    showTask();
})



