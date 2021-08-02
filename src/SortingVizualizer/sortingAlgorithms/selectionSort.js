export function getSelectionSortAnimation(array)
{
    const animation =[]
    const n= array.length
    for(let i=0 ;i<n-1; i++)
    {
        let min = i;

        //search for min element in the range i+1 to n-1
        for(let j=i+1 ;j<n ;j++)
        {
            if( array[j] < array[min] ) min = j;
            animation.push([j,min])
            animation.push([j,min])
            animation.push([j,min,array[j], array[min]])
        }

        // swap min element with element at index i
        array[i] += array[min] - (array[min] = array[i]);
        animation.push([i,min])
        animation.push([i,min])
        animation.push([i,min, array[i], array[min]])

    }
    return animation
}