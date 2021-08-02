
export function getQuickSortAnimation(array)
{
    const animation=[];

    quickSortHelper(array , 0 , array.length-1,animation)

    return animation
}


function quickSortHelper(array , start , end , animation)
{
  if(start < end)
  {
    let pivot = partition(array , start , end, animation);
    quickSortHelper(array , start , pivot-1,animation);
    quickSortHelper(array , pivot+1 , end,animation);
  }
}

function partition( array ,  start ,  end , animation)
{
  let k=start-1;

    let  pivot = end;

  for(let i=start ;i<end;i++)
  {
    animation.push([i,pivot])
    animation.push([i,pivot])

    if(array[i] <= array[pivot])
    {
      k++;
      array[i] += array[k] - (array[k] = array[i]);
      animation.push([i,k, array[i], array[k] ])

    }else animation.push([i, pivot, array[i], array[pivot] ])

  } 
  k++;
  array[k] += array[pivot] - (array[pivot] = array[k]);
  animation.push([k , pivot])        
  animation.push([k , pivot])        
  animation.push([k,pivot , array[k] , array[pivot]])

  return k; 

}