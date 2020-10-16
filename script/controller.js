window.addEventListener('load',init);
var iterator;
function init(){
    iterator = autoNumberGen();
    printTaskId();
    bindEvents();
    updateCounts();
    document.querySelector('#searchdiv').classList.add('hide');
}
const printTaskId=()=>document.querySelector('#txetId').innerText=iterator.next().value;

function bindEvents(){
    document.querySelector('#add')
    .addEventListener('click',addNewTask);
    document.querySelector('#delete')
    .addEventListener('click',deleteTask);
    document.querySelector('#search')
    .addEventListener('click',searchToggle);
    document.querySelector("#searchbox").
    addEventListener('keyup',searchTask);
    document.querySelector("#localSave").
    addEventListener('click',localsave);
    document.querySelector('#loadlocal').
    addEventListener('click',loadlocal);
    document.querySelector('#sort').
    addEventListener('click',sort);
    document.querySelector('#save').
    addEventListener('click',save);
    

}
function save(){
    dbOperation.add(taskOperation.tasks);
}
function sort(){
    taskOperation.tasks.sort((first,second)=>
        first.name.localeCompare(second.name));
    printTable(taskOperation.tasks);
    updateCounts();
    printTaskId();
}
function loadlocal(){
    if(window.localStorage){
        if(window.localStorage.tasks){
            var obj = JSON.parse(localStorage.tasks);
                let tasks = obj.tasks;
                printTable(tasks);
                taskOperation.tasks = tasks;
                updateCounts();
        }
        else{
            alert("No Data to Show");
        }
    }
    else{
        alert("Ur Browser is Outdated...");
    }
}
function localsave(){
    if(window.localStorage){
        var obj={"tasks":taskOperation.tasks};
        localStorage.tasks=JSON.stringify(obj);
        alert("data store...")
    }else{
        alert("data not store...")
    }
}
function searchTask(){
    let currentValue=this.value;
    console.log("current value is",currentValue);
    var searchValue=taskOperation.searchValue(currentValue);
    if (searchValue.length>0) {
        printTable(searchValue);
    } else {
        alert("value not found");   
    }
    updateCounts();
}
function searchToggle(){
    document.querySelector('#searchdiv').classList.toggle('hide')
}
function deleteTask(){
    taskOperation.deleteTask();
    let tasks = taskOperation.getTasks();
    printTable(tasks);
    updateCounts();
}
function printTable(tasks){
    document.querySelector('#theadDisc').innerHTML = '';
    tasks.forEach(taskObject=>printTask(taskObject));
}
function updateCounts(){
    document.querySelector('#total').innerText
     = taskOperation.getTotal();
     document.querySelector('#mark').innerText
     = taskOperation.getMark();
     document.querySelector('#unmark').innerText
     = taskOperation.getUnMark();

}
function addNewTask(){
    var id = document.querySelector('#txetId').innerText;
    var name = document.querySelector('#txetName').value;
    var disc = document.querySelector('#textDisc').value;
    var date=document.querySelector("#txetDate").value
    var task=taskOperation.addTask(id,name,date,disc);
    updateCounts();
    printTaskId();
    printTask(task);
    // var taskList = taskOperation.getTasks(); // get array
   // var lastRecord = taskList[taskList.length-1];
}

function toggleMark(){
    var id = this.getAttribute('tid');
    let iTag = this;
    let tr = iTag.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    taskOperation.toggleMarking(id);
    updateCounts();
}

function edit(){
    var id = this.getAttribute('tid');
    console.log('Edit Call', id);
}

function createIcon(className, fn, currentId){
    //let image = document.createElement('img');
    //image.src= url;
    //image.className = 'size';
    let image = document.createElement('i');
    image.classList.add('hand');
    image.classList.add(config.icons.base);

    image.classList.add(className);
    image.classList.add(config.icons.margin);
    image.addEventListener('click',fn);
    image.setAttribute('tid',currentId);
    return image;
}

function printTask(task){
    var tbody = document.querySelector('#theadDisc');
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in task){
        if(key=='isMark'){
            continue;
        }
        tr.insertCell(index).innerText = task[key];
        index++;
    }
    let currentId = task.id;
    let td = tr.insertCell(index);
    td.appendChild(createIcon(config.icons.edit,edit, currentId));
    td.appendChild(createIcon(config.icons.trash,toggleMark, currentId));

    //td.appendChild(createIcon(config.paths.images.edit));
    //td.appendChild(createIcon(config.paths.images.trash));

}
