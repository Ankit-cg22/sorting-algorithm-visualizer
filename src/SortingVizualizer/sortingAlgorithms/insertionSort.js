export function getInsertionSortAnimation(array)
{
    const animation=[]

    for(let i=0 ;i<array.length;i++)
    {
        let val = array[i];
        let key = i;
        while(key>0 && array[key-1] > val)
        {
            animation.push([key,key-1])
            animation.push([key,key-1])

            array[key] = array[key-1];

            animation.push([key , key-1 ,array[key-1] , val ])
            key--;
        }

        array[key] = val;

        animation.push([key , key])        
        animation.push([key , key])        
        animation.push([key ,  key , val, val])
    }   

    return animation
}