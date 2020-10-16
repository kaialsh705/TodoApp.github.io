const dbOperation={

    // loadAllRecords(){
    //     var promise= fs.collection('tasks').get();
    //     return promise;
    //     //var promise= fs.collection('tasks').get();
    //     // promise.then(querySnapShot=>{
    //     //     querySnapShot.forEach(doc=>{
    //     //         console.log('Doc is ',doc.data());
    //     //     })
    //     // }).catch(err=>{
    //     //     console.log('Error is ',err);
    //     // })
    // },
    
    // loadByCriteria(name){
    //     var promise = fs.collection('tasks').where("name","==",name).get();
    //     promise.then(querySnapShot=>{
    //         querySnapShot.forEach(doc=>{
    //             console.log('Doc is ',doc.data());
    //         })
    //     }).catch(err=>{
    //         console.log('Error is ',err);
    //     })
    // },
    add(tasks){
        tasks.forEach((taskObject)=>{
            fs.collection('tasks').doc(taskObject.id).set({
             id:taskObject.id, 
             name:taskObject.name
            }) // add, update
            //var pr =  fs.collection('tasks').doc(taskObject.id).delete(object);
            .then(function() {
             console.log("Document successfully written!");
         })
         .catch(function(error) {
             console.error("Error writing document: ", error);
         });
 
     }
        )}
}