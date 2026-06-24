import { questions } from "./questions";
export function shuffleArray(arrParam){
    let arr = arrParam.slice(),
        length = arr.length,
        temp,
        i;

    while(length){
        i = Math.floor(Math.random() * length--);

        temp = arr[length];
        arr[length] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

export function getQuestions(){
    
}