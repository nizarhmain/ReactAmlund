export function generatePageIndex(index){
    var values = [];
    for(var i=0; i<index; i++){
        values[i] = i+1;
    }
    return values;
}

export function generateNewIndexes(index, pages){
     var newValues = [];

     if(index < 5 ) {
                    for(var i=0; i<pages; i++){
                                newValues[i] = i+1;
                   }
                   return newValues;
     }

    for(var i=0; i<index; i++){
                        if(index == 1 || index == 2 || index == 3) {
                                for(var i=0; i<5; i++){
                                newValues[i] = i+1;
                            }
                               return newValues;
                        } else {
        newValues[0] = i-2;
        newValues[1] = i-1;
        newValues[2] = i;
        newValues[3] = i+1;
        newValues[4] = i+2;
                   }
            }
    return newValues;
}