function calc(kg,weight){
    let result = (kg * 1000) / weight;
    return Math.round(result * 300);
  }
 
function calcProduct(){
    const inputPackage = document.getElementById('package');
    const packageValue = parseFloat(inputPackage.value);
    const result = document.getElementById('result');
    let calcResult = packageValue * 300;
    if (!isNaN(calcResult)){
        result.textContent = `Результат штук: ${calcResult}`;
    }else{
        result.textContent = 'Пожалуйста, введите корректное значение в упаковках.';
    }
}
  function calculateDefective() {
    const inputKg = document.getElementById('defective_products');
    const result = document.getElementById('result_defective');
    const selectWeight = document.getElementById('select_type');
    const kgValue = parseFloat(inputKg.value);
    const selectedWeight = parseFloat(selectWeight.value);
    if (!isNaN(kgValue)) {
      const calculatedResult = calc(kgValue,selectedWeight);
      result.textContent = `Результат штук: ${calculatedResult}`;
     
    } else {
      result.textContent = 'Пожалуйста, введите корректное значение в килограммах.';
    }
  
  }

  function generalResult() {
    const resultProduct = document.getElementById('result');
    const resultDefective = document.getElementById('result_defective');
    const generalResultElement = document.getElementById('general_result');

    let productResult = parseFloat(resultProduct.textContent.replace('Результат штук: ', ''));
    let defectiveResult = parseFloat(resultDefective.textContent.replace('Результат штук: ', ''));

    if (!isNaN(productResult) && !isNaN(defectiveResult)) {
      generalResultElement.textContent = `Общий результат штук: ${productResult + defectiveResult}`;
    } 
    else if(!isNaN(productResult) && isNaN(defectiveResult)){
        generalResultElement.textContent = 'Ошибка: Пожалуйста, введите корректные значения в килограммах.';
    }
    else if(isNaN(productResult) && !isNaN(defectiveResult)){
        generalResultElement.textContent = 'Ошибка: Пожалуйста, введите корректные значения в упаковках.';
    }
    else{
      generalResultElement.textContent = 'Ошибка: Пожалуйста, введите корректные значения в килограммах и упаковках.';
    }
  }
