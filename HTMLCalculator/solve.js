let firstNumber = [];
let operator = undefined;
let secondNumber = [];
$(() => {
    
    let inputs = $(`input:button`);
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener(`click`, calculate);
    }


    function calculate(event) {
       let currentNumber = event.target.value;
        if(currentNumber == `back`) {
            removeLastNumber();
        }else  if(currentNumber == `=` && firstNumber.length > 0 && 
            operator != undefined && secondNumber.length > 0) {
            calculateResult();
        } else if(currentNumber == `C`) {
            clear(); 
        }else if(firstNumber.length > 0 && secondNumber.length == 0 && operator == undefined &&
            (currentNumber == `+` || currentNumber == `-` || currentNumber == `%` 
                || currentNumber == `÷` || currentNumber == `x`) ) {
         operator = currentNumber;
         $(`#firstRows-result`).val(firstNumber.join(``) + ` ${operator}`);
         $(`#firstRows-input`).val(``);     

        } else if(firstNumber.length >= 0 && operator == undefined) {
            calculateFirstNumber();

        } else if (firstNumber.length > 0 && operator) {
           calculateSecondNumber();
        } 


    function calculateResult() {
        let result = ``;
        switch(operator) {
            case `+`:
            result = +(firstNumber.join(``)) + +(secondNumber.join(``));
            break;
            case `-`:
            result = +(firstNumber.join(``)) - +(secondNumber.join(``));
            break;
            case `x`:
            result = +(firstNumber.join(``)) * +(secondNumber.join(``));
            break;
            case `÷`:
            result = +(firstNumber.join(``)) / +(secondNumber.join(``));
            case `%`:
            result = +((firstNumber.join(``)) * +(secondNumber.join(``)) / 100);
            break;
        };

        $(`#firstRows-result`).val(firstNumber.join(``) + ` ${operator} ` + secondNumber.join(``));
        $(`#firstRows-input`).val(result);
    }

    function calculateSecondNumber() {
        if(currentNumber != `+` && currentNumber != `-` && currentNumber != `x`
            && currentNumber != `÷` && currentNumber != `=` && currentNumber != `%`) {
            if(currentNumber == `.` &&  !firstNumber.includes(`.`)) {
                secondNumber.push(`.`);
            } else {
                secondNumber.push(currentNumber);
            }
            $(`#firstRows-input`).val(secondNumber.join(``));
        };
    };

    function calculateFirstNumber() {
        if(currentNumber != `+` && currentNumber != `-` && currentNumber != `x`
            && currentNumber != `÷` && currentNumber != `=` && currentNumber != `%`) {
            if(currentNumber == `.`) {
                if(!firstNumber.includes(`.`)){
                    firstNumber.push(`.`);
                }
            } else {
                firstNumber.push(currentNumber);
            }
            $(`#firstRows-input`).val(firstNumber.join(``));
        };
    };


    function clear() {
        firstNumber=[];
        secondNumber=[];
        operator = undefined;
        $(`#firstRows-result`).val(``);
        $(`#firstRows-input`).val(``);   
    };
    
    function removeLastNumber() {
        let currentInput =   $(`#firstRows-input`).val().slice(0, - 1);
        $(`#firstRows-input`).val(currentInput);
            if(operator== undefined) {
                firstNumber.pop();
            } else {
                secondNumber.pop();
            }
    }
    };

    
}) ;




   
