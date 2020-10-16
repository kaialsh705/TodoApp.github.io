const taskOperation={
    tasks:[],
    addTask(id,name,disc,date){
        var task=new Task(id,name,date,disc);
        this.tasks.push(task);
        return task;
    },
    searchValue(currentValue){
        return this.tasks.
        filter(taskObject=>taskObject.name.startsWith(currentValue))
    },
    deleteTask(){
        this.tasks=this.tasks.filter(taskObject=>!taskObject.isMark)  
    },
    getTotal:()=>taskOperation.tasks.length,
    
    toggleMarking(id){
        let taskObject=this.tasks.find(taskObject=>taskObject.id==id);
        taskObject.isMark=!taskObject.isMark;
    },
    getMark(){
        return this.tasks.
        filter(taskObject=>taskObject.isMark==true).length ;
    },
    getUnMark(){
        return this.tasks.length - this.getMark();
    },
    getTasks(){
        return this.tasks;
    }
}