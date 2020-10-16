function* autoNumberGen(){
    var counter=config.autoIncrement;
    while(true){
        yield counter;
        counter++;
    }
}