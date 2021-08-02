export function getBubbleSortAnimation(array)
{
    const animation = [];
    const auxArray = array.slice()

    for(let i=0;i<auxArray.length ;i++)
    {
        let flag = true;
        for(let j=0;j<auxArray.length - i - 1 ; j++)
        {
            animation.push([j,j+1])
            animation.push([j,j+1])
            if(  auxArray[j+1] < auxArray[j])
            {
                if(flag === true)flag = false;
                let temp = auxArray[j]
                auxArray[j] = auxArray[j+1]
                auxArray[j+1]=temp

            }
            animation.push([j , j+1 ,auxArray[j], auxArray[j+1] ])
            
        }
        if(flag === true)break;
    }
   
    return animation;
}