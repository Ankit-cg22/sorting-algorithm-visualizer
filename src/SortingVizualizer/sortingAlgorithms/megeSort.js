export function getMergeSortAnimation(array){
    const animation = [] ;
    if(array.length <= 1) return array;

    const auxArray = array.slice(); 
    mergeSortHelper(array , 0 , array.length -1 , auxArray , animation  )

    return animation;

}


function mergeSortHelper(
    array , startInd , endInd , auxArray , animation
){
    if( startInd  === endInd )return ;
    const middleInd = Math.floor( (startInd  + endInd) /2)

    //split into two halves
    mergeSortHelper(auxArray , startInd , middleInd , array , animation)
    mergeSortHelper(auxArray , middleInd+1 , endInd , array , animation)

    merge(array , startInd ,middleInd, endInd , auxArray , animation)

    // we treat the two halves of the auxArray as the two sorted arrays we need to merge
}



function merge(
    array , startInd ,middleInd, endInd , auxArray , animation
){
    let k = startInd
    let i = startInd
    let j = middleInd + 1

    while( i<=middleInd && j<=endInd)
    {
        // we push it to the animation array so that we can change color of the two we are currently compairing

        // push the pair first time : to change their color
        animation.push([i,j]) 
        
        // push the pair second time : to revert back their color
        animation.push([i,j])
        
        if( auxArray[i] <= auxArray[j]){

            // we require the correct element for kth index of main array
            // ith index element of auxilliary array is the correct element for kth index of main array
            // so we over write the kth index of main array with the ith index of aux array

            // this line indicates at kth index of main array , we want the value of ith element of aux array
            // we will use this pair , to make the value at kth index of main array = auxArray[i]
            //pushing into animation , we can change the heights of the bars
            animation.push( [k,auxArray[i]])

            array[k++] = auxArray[i++] // overwriting value in the main array
        }else{

            // same as i but here for jth index of auxilliary array
            animation.push( [k, auxArray[j]])
            array[k++]= auxArray[j++];
        }                 
       
    }

    while(i<=middleInd)
    {
        // same idea as before 
        //  the two indices we are compairing , push them into the animation array(once to change color , once to revert back the colors)
        // then overwrite the data in main array with the appropriate data from the auxilliary array

        animation.push([i,i]) // first color change
        animation.push([i,i]) // revert back to og color

        animation.push( [k , auxArray[i]]) // height update
        array[k++] = auxArray[i++]
    }

    while(j<=endInd)
    {
        // same idea as before 
        //  the two indices we are compairing , push them into the animation array(once to change color , once to revert back the colors)
        // then overwrite the data in main array with the appropriate data from the auxilliary array

        animation.push([j,j])
        animation.push([j,j])

        animation.push( [k , auxArray[j]])
        array[k++] = auxArray[j++]
    }



}


  
 
