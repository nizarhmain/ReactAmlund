export default function generatePageIndex(index){
    var values = [];
    for(var i=0; i<index; i++){
        values[i] = i+1;
    }
    return values;
}