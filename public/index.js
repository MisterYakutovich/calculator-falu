
function calc(kg,weight){
    let result = (kg * 1000) / weight;
    return Math.round(result * 300);
  }

function calcProduct(){
    const inputPackage = document.getElementById('package');
    const packageValue = parseFloat(inputPackage.value);
    const result = document.getElementById('result');
    let calcResult = packageValue * 300;
    if (!isNaN(calcResult) && packageValue>=0){
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
    if (!isNaN(kgValue) && kgValue>=0) {
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

function sendData(){
    const inputPackage = document.getElementById('package');
    const packageValue = parseFloat(inputPackage.value);
    const resultProduct = document.getElementById('result').textContent.replace('Результат штук: ', '');
    const resultDefective = document.getElementById('result_defective').textContent.replace('Результат штук: ', '');
    const generalResultElement = document.getElementById('general_result').textContent.replace('Общий результат штук: ', '');
  
    const data = {
        productResult: parseInt(resultProduct, 10), 
        defectiveResult: parseInt(resultDefective, 10),
        calcResult: parseInt(generalResultElement, 10),
        package1: parseInt(packageValue,10)
    };

const url ="https://calculator-falu.vercel.app/api/data"
//const url = "http://localhost:5000/api/data"
  fetch(url,{
    method:"POST",
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data),

  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Сеть не ответила,скорей всего не полные данные'); 
  }
  return response.json();
  })
  .then(data => {
    console.log('Успех:', data); 
})
.catch((error) => {
    console.error('Ошибка:', error); 
});
}

function openModal() {
  const inputPackage = document.getElementById('package');
  const packageValue = parseFloat(inputPackage.value);
  const resultProduct = document.getElementById('result').textContent.replace('Результат штук: ', '');
  const resultDefective = document.getElementById('result_defective').textContent.replace('Результат штук: ', '');
  const generalResultElement = document.getElementById('general_result').textContent.replace('Общий результат штук: ', '');

  const modalWrapper = document.querySelector('.modal-wrapper');
  const modalContent = document.querySelector('.modal-content');
  modalWrapper.style.visibility = 'visible';
  modalWrapper.style.opacity = '1';
  modalContent.style.transform='translateY(0) rotate(0)';

  const data = {
    productResult: parseInt(resultProduct, 10), 
    defectiveResult: parseInt(resultDefective, 10),
    calcResult: parseInt(generalResultElement, 10),
    package1: parseInt(packageValue,10)
};

if (isNaN(data.productResult) || isNaN(data.defectiveResult) || isNaN(data.calcResult) || isNaN(data.package1)) {
  const error= document.getElementById("error");
  const okay=document.getElementById('okay');
  error.style.color = "red";
  error.textContent = "НЕ ПОЛНЫЕ ДАННЫЕ!";
  error.style.fontSize="25px"
  const one = document.getElementById("1");
  one.textContent =`Колличество штук в упаковке: ${data.productResult}`;
  one.style.fontSize="25px"
  isNaN(data.productResult) ?  one.style.color="red" :  one.style.color="green"
 
  const two = document.getElementById("2"); 
  two.textContent =`Колличество штук брака: ${data.defectiveResult}`;
  two.style.fontSize="25px"
  isNaN(data.defectiveResult) ? two.style.color="red" :  two.style.color="green"
 
  const three = document.getElementById("3"); 
  three.textContent =`Общее колличество полуфабриката: ${data.calcResult}`;
  three.style.fontSize="25px"
  isNaN(data.calcResult) ?  three.style.color="red" :  three.style.color="green"
 
  const four = document.getElementById("4"); 
  four.textContent =`Колличество упаковок: ${data.package1}`;
  four.style.fontSize="25px"
  isNaN(data.package1) ?  four.style.color="red" :  four.style.color="green"

  okay.disabled = true;
  okay.style.opacity = 0.5;
  okay.style.cursor = "not-allowed";
 }else{
  error.style.color = "green";
  error.style.textAlign = "center";
  error.style.fontSize="25px"
  error.textContent = "ВЫ МОЖЕТЕ ОТПРАВИТЬ НА СЕРВЕР!";

  const one = document.getElementById("1");
  one.textContent =`Колличество штук в упаковке: ${data.productResult}`;
  one.style.fontSize="25px"
  one.style.color="green"
 
  const two = document.getElementById("2"); 
  two.textContent =`Колличество штук брака: ${data.defectiveResult}`;
  two.style.fontSize="25px"
  two.style.color="green"
 
  const three = document.getElementById("3"); 
  three.textContent =`Общее колличество полуфабриката: ${data.calcResult}`;
  three.style.fontSize="25px"
  three.style.color="green"
 
  const four = document.getElementById("4"); 
  four.textContent =`Колличество упаковок: ${data.package1}`;
  four.style.fontSize="25px"
  four.style.color="green"

  okay.disabled = false;
  okay.style.opacity = 1;
  okay.style.cursor = "pointer";
 }
 
 okay.addEventListener('click', () => {
   closeModal();
   showSuccessMessage();
 });
 
}
function closeModal(){
  const modalWrapper = document.querySelector('.modal-wrapper');
  const modalContent = document.querySelector('.modal-content');
  modalWrapper.style.visibility = 'hidden';
  modalWrapper.style.opacity = '0';
  modalContent.style.transform = 'perspective(500px) translateY(-100%) rotateX(45deg)';
}

function showSuccessMessage() {
  const successMessage = document.getElementById('success-message'); 
  if (successMessage) {
    successMessage.textContent = 'Данные успешно отправлены!';
    successMessage.style.display = 'block'; 

    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000); 
  } else {
    console.error("Элемент с id='success-message' не найден!");
  }
}

