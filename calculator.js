let calculator = document.querySelector('.main-container')
let displayContainer = document.querySelector('#display-container')

let displayUpperHalf = document.createElement('div')
displayUpperHalf.setAttribute('id', 'upper')

let calFunctions = ['C','Del','/','%',7,8,9,'x',4,5,6,'-',1,2,3,'+','',0,'.','=']

let calcState = {
    firstNum: [],
    secondNum: [],
    result: null,
    operator: null,
    isWaitingOnSecondNum: false,
    isComplete: false,
    toPercent(){return this.firstNum.reduce((t,v) => t + v,0)/100}
}

function createCalc(){
    const cleanedSym = calFunctions.filter(c => c !== ',')
    addBtns(cleanedSym)
}

const clearState = () => {
    calcState.firstNum =  [],
    calcState.secondNum = [],
    calcState.result = '',
    calcState.operator = null,
    calcState.isWaitingOnSecondNum = false,
    calcState.isComplete = false
}

const add = (a,b) => a + b
const subtract = (a,b) => b - a
const multiply = (a,b) => a * b
const divide = (a,b) => b / a

function addBtns(sym){
    let num = 0
    for(let x = 5; x > 0; x--){
        let btnContainer = document.createElement('div')
        btnContainer.setAttribute('class', 'btn-container')
        calculator.append(btnContainer)
        for(let y = 4; y > 0; y--){
            const btn = document.createElement('button')
            btn.innerText = `${sym[num]}`
            btn.value = `${sym[num]}`

            if(btn.innerText === '='){
                btn.setAttribute('id', 'equal')
            } else if(btn.innerText === 'C'){
                btn.setAttribute('id','clear')
            } else if(btn.innerText === 'Del'){
                btn.setAttribute('id','del')
            } else if((typeof(sym[num]) === 'number') || (btn.innerText === '.')){
                btn.setAttribute('class', 'num')
            } else {
                btn.setAttribute('class', 'func')
            }
            btnContainer.append(btn)
            num++
        }

        
        btnContainer.addEventListener('click', e => {
            let clear = document.querySelector('#clear')
            let equal = document.querySelector('#equal')

            if((e.target.className === 'num') && (calcState.isWaitingOnSecondNum)){
                calcState.secondNum.push(e.target.innerText)
                post(calcState.secondNum.join(''))
                calcState.isComplete = true
            } else if((e.target.className === 'num')){
                calcState.firstNum.push(e.target.innerText)
                post(calcState.firstNum.join(''))
            }
            
            if((e.target.className === 'func')){
                if(calcState.isComplete){
                    operate(calcState.operator,parseFloat(calcState.firstNum.join('')),parseFloat(calcState.secondNum.join('')))
                    calcState.firstNum = calcState.result.toString().split('')
                    calcState.secondNum = []
                } 
                calcState.operator = e.target.innerText
                calcState.isWaitingOnSecondNum = true
            }
                
            // if((e.target.id === 'equal') && (calcState.isComplete)){
            //     operate(calcState.operator,parseFloat(calcState.firstNum.join('')),parseFloat(calcState.secondNum.join('')))
            //     calcState.firstNum = calcState.result.toString().split('')
            //     calcState.secondNum = []
            //     calcState.isComplete = false
            // } 

            equal.addEventListener('click', () =>{
                if(calcState.isComplete){
                    operate(calcState.operator,parseFloat(calcState.firstNum.join('')),parseFloat(calcState.secondNum.join('')))
                    calcState.firstNum = calcState.result.toString().split('')
                    calcState.secondNum = []
                    calcState.isComplete = false
                    console.log(calcState)
                }
            })


            clear.addEventListener('click', () =>{
                post('')
                clearState()
            })


            if((e.target.id === 'del') && (!calcState.isWaitingOnSecondNum)){
                calcState.firstNum.pop().split(' ')
                post(calcState.firstNum.join(''))
            } else if((e.target.id === 'del') && (calcState.isWaitingOnSecondNum)){
                calcState.secondNum.pop().split(' ')
                post(calcState.secondNum.join(''))
            }

        })
    }  
    
}

function post(r){
    displayUpperHalf.innerText = ''
    displayUpperHalf.innerText = `${r}`
}

function operate(op,n1,n2){
    switch (op) {
        case '+':
            calcState.result = add(n1,n2)
            post(calcState.result)
            break;
        case '-':
            calcState.result = subtract(n2,n1)
            post(calcState.result)
            break;
        case '/':
            calcState.result = divide(n2,n1)
            post(calcState.result)
            break;     
        case 'x':
            calcState.result = multiply(n1,n2)
            post(calcState.result)
            break;   
        default:
                break;
    }    
}




createCalc()
displayContainer.append(displayUpperHalf)