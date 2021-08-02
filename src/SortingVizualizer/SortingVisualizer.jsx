import React, { Component } from 'react'
import { getMergeSortAnimation } from './sortingAlgorithms/megeSort';
import './SortingVisualizer.css'
import { getBubbleSortAnimation } from './sortingAlgorithms/bubbleSort';
import { getInsertionSortAnimation } from './sortingAlgorithms/insertionSort';
import { getQuickSortAnimation } from './sortingAlgorithms/quickSort';
import {getSelectionSortAnimation} from './sortingAlgorithms/selectionSort';

// const arrayAmount =250;
const barsBoxHeight= window.innerHeight * 0.8;
const barsBoxWidth = window.innerWidth * 0.9;
const PRIMARY_COLOR = "turquoise"
const SECONDARY_COLOR = "orange"
const FINAL_COLOR ="green"
// const ANIMATION_SPEED_MS = 500/ arrayAmount

export default class SortingVisualizer extends Component {

    constructor(props){
        super(props)

        this.state={
            array : [],
            arrayAmount : 50 , 
            animationSpeed : 500,      
        }
    }

    componentDidMount() {
        this.resetArray();
      }


    // create an array of 1000 elements
    resetArray(){
        const array = [];

        for(let i=0 ;i<this.state.arrayAmount ;i++)
        {
            array.push(randomVal(10, barsBoxHeight));
            // we take 10 as min value , cause we will set height of bar = value
            // considering values like 1 , 2 ,3 ..., height of the bar will be very less , so not much visible
        }

        // to set the color of bars back to PRIMARY after we hit generate new array after sorting once
        
        const arrayBars = document.getElementsByClassName('array-bar') //all the bars
        
        for(let i=0;i<arrayBars.length;i++)
        {
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor = PRIMARY_COLOR
        }
        

        this.setState({array })
    }

    bubbleSort(){
        const animation = getBubbleSortAnimation(this.state.array)
        this.animateSwap(animation)
        
    }

    mergeSort(){
        const animation = getMergeSortAnimation(this.state.array);
        this.animate(animation)
        
    }

    quickSort(){
        const animation=getQuickSortAnimation(this.state.array);
        this.animateSwap(animation)
        
    }

    insertionSort(){
        const animation = getInsertionSortAnimation(this.state.array)
        this.animateSwap(animation)
        
    }

    selectionSort(){
        const animation = getSelectionSortAnimation(this.state.array)
        this.animateSwap(animation)
        
    }

    
    // arrayResise(e){
    //     this.setState({ arrayAmount : e.target.value})
    //     this.resetArray()
    // }

    animate(animation)
    {
        for(let i=0;i<animation.length;i++){

            const arrayBars = document.getElementsByClassName('array-bar') //all the bars

            const isColorChange = (i % 3) !== 2;
            // for each pair we make 3 pushed into the animation array
            // 1) compairing them first time ; (i%3 == 0)
            // 2) compairing over , revert color ; ( i%3 ==1)
            // 3) index k and the prefered height of the two( the smaller one ,  because we are sorting in ascending order  )
            
            // 1 , 2 => for color change
            // 3 => for height update

            if(isColorChange)
            {
                // i= 0 or 1 => animate the color changes indicating that we are compairing a pair

                const [barOneInd , barTwoInd] = animation[i]
                const barOneStyle = arrayBars[barOneInd].style;
                const barTwoStyle = arrayBars[barTwoInd].style;

                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                // i!=2 , we checked it in isColorChange
                // i = 0 : pair pushed first time -> compairing , change color
                // i=1 : compairing ended , change back to og color

                setTimeout( () => {
                    barOneStyle.backgroundColor = color 
                    barTwoStyle.backgroundColor = color
                } , i*((5000 - this.state.animationSpeed)/ this.state.arrayAmount))

            }else{

                // i==2 , animate the newHeight( this is not the final height , it is the preffered height after current stage of sorting) 
                //  we got the pair [k,auxArray[i]]
                // so change the height of bar at index k to auxArray[i]

                setTimeout( () => {
                    const [barOneInd , newHeight] = animation[i]
                    const barOneStyle = arrayBars[barOneInd].style
                    barOneStyle.height = `${newHeight}px`
                } , i*((5000 - this.state.animationSpeed)/ this.state.arrayAmount))
            }
        }

        setTimeout( () => {
            this.finalDisplay();
        } , (animation.length+1)*((5000 - this.state.animationSpeed)/ this.state.arrayAmount))
    }
   
    animateSwap(animation)
    {
        for(let i=0;i<animation.length;i++){

            const arrayBars = document.getElementsByClassName('array-bar') //all the bars

            const isColorChange = i % 3 !== 2;

            if(isColorChange)
            {

                const [barOneInd , barTwoInd] = animation[i]
                const barOneStyle = arrayBars[barOneInd].style;
                const barTwoStyle = arrayBars[barTwoInd].style;

                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        
                setTimeout( () => {
                    barOneStyle.backgroundColor = color 
                    barTwoStyle.backgroundColor = color
                } , i*((5000 - this.state.animationSpeed)/ this.state.arrayAmount))

            }else{


                setTimeout( () => {
                    const [barOneInd , barTwoInd , barOneHeight , barTwoHeight] = animation[i]
                    const barOneStyle = arrayBars[barOneInd].style
                    const barTwoStyle = arrayBars[barTwoInd].style
                    barOneStyle.height = `${barOneHeight}px`
                    barTwoStyle.height = `${barTwoHeight}px`
                } , i*((5000 - this.state.animationSpeed)/ this.state.arrayAmount))
            }
        }
        setTimeout( () => {
            this.finalDisplay();
        } , (animation.length+1)*((5000 - this.state.animationSpeed)/ this.state.arrayAmount))
    }

    finalDisplay()
    {
        // const arrayBars = document.getElementsByClassName('array-bar') //all the bars
        
        // for(let i=0;i<arrayBars.length;i++)
        // {
        //     const barStyle = arrayBars[i].style;
        //     barStyle.backgroundColor = FINAL_COLOR;
        // }
    }


    resizeArrayAmount(newArrayAmount)
    {
        this.setState({ arrayAmount : newArrayAmount })
        this.resetArray()
    }
    resizeSpeed(newSpeed)
    {
        this.setState({ animationSpeed : newSpeed })

    }


    render() {
        const array = this.state.array;
        console.log("arrayAmout " , this.state.arrayAmount)
        return (
            <div>
                <div className="header">
                         <div className="title">
                             <h1>Sorting Algorithm Visualizer</h1>
                         </div>

                        {/* button to generate new array */}
                        <div className="controls">
                                <div className="buttons">
                                    <button onClick={() => this.resetArray()}>
                                        Generate new array
                                    </button>
                                    {/* <input type="number" name ={this.state.arrayAmount} onChange={(e)=>this.arrayResise(e)} /> */}
                                    <button onClick={() => this.bubbleSort()}>
                                        Bubble Sort
                                    </button>
                                    <button onClick={() => this.insertionSort()} >
                                        Insertion Sort
                                    </button>
                                    <button onClick={() => this.selectionSort()} >
                                        Selection Sort
                                    </button>
                                    <button onClick={() => this.mergeSort()} >
                                        Merge Sort
                                    </button>
                                    <button onClick={() => this.quickSort()}    >
                                        Quick Sort
                                    </button>
                                </div>
                            
                            <div className="slider">
                                <div className="amount">
                                    <label for="bars">Amount of bars:</label>
                                    <input className="slide" type="range" id="bars" name="bars" min="10" max="200" onInput={(e)=>this.resizeArrayAmount(e.target.value)} ></input>
                                </div>

                                <div className="speed">
                                <label for="bars">Animation Speed :</label>
                                    <input className="slide" type="range" id="bars" name="bars" min="250" max="1000" onInput={(e)=>this.resizeSpeed(e.target.value)} ></input>
                                </div>
                            </div>
                        </div>
                       
                </div>

                <div className="bars" style ={{ height : barsBoxHeight , width: barsBoxWidth }}>
                    {array.map((val,idx) => {
                        return (
                            <div className="array-bar" key={idx}
                            style={{height : `${val}px`,
                                    width: (barsBoxWidth - (this.state.arrayAmount-1) )/this.state.arrayAmount,
                                }}>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}


 // funtion to create random elements in a given range
 function randomVal(a , b) {
    //generate a random value between a and b , both included

    return Math.floor(Math.random() * (a - b + 1) + b);
  }
