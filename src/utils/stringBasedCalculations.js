
/*
  원래 유저가 입력한 식을 바탕으로 계산하는 계산기를 만들려고 했는데
  expr-eval이라는 좋은 라이브러리를 찾아버려서 버려진 유틸임.
*/

/**
 * 기본적인 사칙연산을 수행합니다.
 * 처음 숫자, 기호, 마지막 숫자를 넣어주세요.
 * 모든 값을 문자열로 받고, 결과를 문자열로 반환합니다.
 * @param {string} firstNumber 
 * @param {string} operator 
 * @param {string} secondNumber 
 */
function basicOperation(firstNumber, operator, secondNumber) {
  let operators = '+-*/';
  let symbol = operator.replaceAll(' ', '');
  let answer = undefined;
  let number1 = Number(firstNumber);
  let number2 = Number(secondNumber);
  //숫자 예외
  if (number1 == NaN || number2 == NaN) {
    throw new Error(`Wrong numbers : ${firstNumber}, ${secondNumber}`);
  }
  //기호 예외
  if (symbol.length > 1 || operators.includes(symbol) == false || !symbol) {
    throw new Error(`Wrong symbols : ${symbol}`);
  }
  //0으로 나누기 예외
  if (symbol === '/' && number2 === 0) {
    throw new Error(`Divided by Zero : ${number1} ${symbol} ${number2}`);
  }
  //계산
  switch (symbol) {
    case '+':
      answer = number1 + number2;
      break;
    case '-':
      answer = number1 - number2;
      break;
    case '*':
      answer = number1 * number2;
      break;
    case '/':
      answer = number1 / number2;
      break;
  }
  if (answer != undefined) {
    return String(answer);
  }
  else {
    throw new Error(`Operation finished, but answer is undefined. expression : ${firstNumber} ${symbol} ${secondNumber}`);
  }
}

/**
   * 기본적인 기호들의 연산 순서를 무시하고, 
   * 앞에서부터 순서대로 사칙연산을 수행합니다.
   * expression으로 기본적인 숫자와 사칙연산 기호(+-/*)가 담긴
   * 식을 문자열로 넣어주세요.
   * @param {string} expression 
   */
function forwardCalculation(expression) {
  let trimExpression = expression.replaceAll(' ', '');
  let operators = '+-*/';
  let firstNumber = '';
  let middleSymbol = '';
  let secondNumber = '';
  let firstCalcTrigger = true;

  if(!trimExpression) {
    throw new Error(`Wrong expression : ${expression} => ${trimExpression}`);
  }

  for (let value of trimExpression) {
    //숫자일 때
    if (isNaN(value) == false) {
      //첫 계산 전이라면 (firstNumber에 값 넣어야함)
      if (firstCalcTrigger) {
        //입력된 기호가 있다면 (firstNumber 세팅 끝, 계산을 위해 secondNumber에 값을 넣어야함)
        if (middleSymbol) {
          firstCalcTrigger = false;
          secondNumber += value;
        }
        //입력된 기호가 없다면
        else {
          firstNumber += value;
        }
      }
      //첫 계산 이후 (firstNumber 고정)
      else {
        secondNumber += value;
      }
    }
    //기호일 때
    else {
      //입력된 숫자가 없는데 기호가 먼저 들어온 경우
      if (firstNumber == '') {
        throw new Error(`Too early operator : ${value} | expression : ${expression}`);
      }
      //사칙연산 외의 잘못된 기호 입력 예외처리
      if (operators.includes(value) == false) {
        throw new Error(`Invalid operator : ${value} | expression : ${expression}`);
      }
      //이미 입력된 기호가 있다면
      if (middleSymbol) {
        //계산할 숫자가 없는데 기호가 먼저 들어왔음 (기호 중첩)
        if (secondNumber == '') {
          throw new Error(`Nested Operators : ${middleSymbol + value} | expression : ${expression}`);
        }
        //정상적인 계산
        firstNumber = basicOperation(firstNumber, middleSymbol, secondNumber);
        secondNumber = '';
        middleSymbol = value;
      }
      //정상적인 기호
      else {
        middleSymbol = value;
        continue;
      }
    }
  }

  //맨 마지막 문자가 기호일 경우 예외
  if(secondNumber == '') {
    throw new Error(`The last operator is in the wrong place : ${middleSymbol}`);
  }
  //마지막 숫자 계산
  else {
    firstNumber = basicOperation(firstNumber, middleSymbol, secondNumber);
  }

  return firstNumber;
}

/**
 * 후위표기법으로 적힌 식을 연산합니다.
 * @param {string} expression 
 */
function postfixCalculation(expression) {
  let trimExpression = expression.replaceAll(' ', '');
  let operators = '+-*/';
  let stack = [];
  let firstCalcTrigger = true;
}

/**
 * 문자로 적힌 식을 숫자, 문자, 기호로 나눠서 배열에 저장합니다.
 * 각 요소를 앞에서부터 배열에 push 하여 반대로 저장되기 때문에,
 * pop으로 하나씩 꺼내쓰는걸 권장합니다.
 * @param {string} expression 
 */
function expressionStringToArray(expression) {
  let expressionArray = [];

}

export { forwardCalculation }