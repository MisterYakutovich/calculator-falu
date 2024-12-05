let packagingsId;
let defectId;
let semiFinishedProductId;

 // Создаем элементы модального окна
 const modal = document.createElement('div');
 modal.id = 'myModal';
 modal.className = 'modal';

 const modalContent = document.createElement('div');
 modalContent.className = 'modal-content';

 const closeSpan = document.createElement('span');
 closeSpan.id = 'closeModal';
 closeSpan.className = 'close';
 closeSpan.innerHTML = '&times;'; 

 const form = document.createElement('form');
 form.id = 'editForm';

 // Создаем первую часть формы (Упаковки)
 const formContainer1 = document.createElement('div');
 formContainer1.className = 'form-container_1';
 
 const formData1 = document.createElement('div');
 formData1.className = 'form-container_data_1';
 const title1 = document.createElement('h3');
 title1.className = 'form-container_data_1_title';
 title1.innerText = 'Упаковки';
 
 const label1 = document.createElement('label');
 label1.setAttribute('for', 'quantity');
 const input1 = document.createElement('input');
 input1.type = 'text';
 input1.id = 'quantity';
 input1.name = 'quantity';
 input1.required = true;

 formData1.appendChild(title1);
 formData1.appendChild(label1);
 formData1.appendChild(input1);
 formContainer1.appendChild(formData1);

 // Создаем вторую часть формы (Штук в упаковке)
 const formData2 = document.createElement('div');
 formData2.className = 'form-container_data_2';
 const title2 = document.createElement('h3');
 title2.className = 'form-container_data_2_title';
 title2.innerText = 'Штук в упаковке';
 
 const label2 = document.createElement('label');
 label2.setAttribute('for', 'pieces_pkg');
 const input2 = document.createElement('input');
 input2.type = 'text';
 input2.id = 'pieces_pkg';
 input2.name = 'pieces_pkg';
 input2.required = true;

 formData2.appendChild(title2);
 formData2.appendChild(label2);
 formData2.appendChild(input2);
 
 const saveButton1 = document.createElement('button');
 saveButton1.type = 'button';
 saveButton1.className = 'save-button';
 saveButton1.id = 'saveButton';
 saveButton1.innerText = 'Сохранить';
 
 formContainer1.appendChild(formData2);
 formContainer1.appendChild(saveButton1);
 form.appendChild(formContainer1);

 // Создаем третью часть формы (Брак штук)
 const formContainer2 = document.createElement('div');
 formContainer2.className = 'form-container_2';
 
 const formData3 = document.createElement('div');
 formData3.className = 'form-container_data_3';
 const title3 = document.createElement('h3');
 title3.className = 'form-container_data_3_title';
 title3.innerText = 'Брак штук';
 
 const label3 = document.createElement('label');
 label3.setAttribute('for', 'defect');
 const input3 = document.createElement('input');
 input3.type = 'text';
 input3.id = 'defect';
 input3.name = 'defect';
 input3.required = true;

 formData3.appendChild(title3);
 formData3.appendChild(label3);
 formData3.appendChild(input3);
 
 const saveButtonDefect = document.createElement('button');
 saveButtonDefect.type = 'button';
 saveButtonDefect.className = 'save-button_defect';
 saveButtonDefect.id = 'saveButtonDefect';
 saveButtonDefect.innerText = 'Сохранить';
 
 formContainer2.appendChild(formData3);
 formContainer2.appendChild(saveButtonDefect);
 form.appendChild(formContainer2);

 // Создаем четвертую часть формы (Штук полуфабриката)
 const formContainer3 = document.createElement('div');
 formContainer3.className = 'form-container_3';
 
 const formData4 = document.createElement('div');
 formData4.className = 'form-container_data_4';
 const title4 = document.createElement('h3');
 title4.className = 'form-container_data_4_title';
 title4.innerText = 'Штук полуфабриката';
 
 const label4 = document.createElement('label');
 label4.setAttribute('for', 'semiFinishedCell');
 const input4 = document.createElement('input');
 input4.type = 'text';
 input4.id = 'semiFinishedCell';
 input4.name = 'semiFinishedCell';
 input4.required = true;

 formData4.appendChild(title4);
 formData4.appendChild(label4);
 formData4.appendChild(input4);
 
 const saveButtonSemiFinished = document.createElement('button');
 saveButtonSemiFinished.type = 'button';
 saveButtonSemiFinished.className = 'save-button_SemiFinishedProducts';
 saveButtonSemiFinished.id = 'saveButtonSemiFinishedProducts';
 saveButtonSemiFinished.innerText = 'Сохранить';
 
 formContainer3.appendChild(formData4);
 formContainer3.appendChild(saveButtonSemiFinished);
 form.appendChild(formContainer3);

 modalContent.appendChild(closeSpan);
 modalContent.appendChild(form);
 modal.appendChild(modalContent);
 document.body.appendChild(modal);

function openModal(data) {
  document.getElementById('quantity').value = data.packagings.quantity;
  document.getElementById('pieces_pkg').value = data.packagings.quantity_in_pieces_pkg;
  document.getElementById('defect').value = data.defects.quantity_in_pieces_defect;
  document.getElementById('semiFinishedCell').value = data.semiFinishedProducts.totalQuantity;
  modal.style.display = "block";
  packagingsId = data.packagings.id;
  defectId = data.defects.id;
  semiFinishedProductId= data.semiFinishedProducts.id;
}

async function saveDataPackagings() {
  const updatedData = {
      quantity: document.getElementById('quantity').value,
      quantity_in_pieces_pkg: document.getElementById('pieces_pkg').value,
  };
 
  try {
    const url = `https://calculator-falu.vercel.app/api/${packagingsId}`
    //const url = `http://localhost:5000/api/${packagingsId}`
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || `Ошибка при обновлении данных (HTTP ${response.status})`;
        throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Данные успешно обновлены:', result);
    console.log('Данные для обновления:', updatedData);
    closeModal();
    getData(); 
} catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    alert('Ошибка при обновлении данных. Пожалуйста, попробуйте еще раз.'); 
}
}

async function saveDataDefects() {
  const updatedDataDefects = {
      quantity_in_pieces_defect: document.getElementById('defect').value,
  };
 
  try {
   // const url = `http://localhost:5000/api/${defectId}`
    const url = `https://calculator-falu.vercel.app/api/${defectId}`
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataDefects),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || `Ошибка при обновлении данных (HTTP ${response.status})`;
        throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Данные успешно обновлены:', result);
    console.log('Данные для обновления:', updatedDataDefects);
    closeModal();
    getData(); 
} catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    alert('Ошибка при обновлении данных. Пожалуйста, попробуйте еще раз.'); 
}
}

async function saveDataSemiFinishedProduct() {
  const updatedDataSemiFinishedProduct = {
      totalQuantity: document.getElementById('semiFinishedCell').value,  
  };
 
  try {
   // const url = `http://localhost:5000/api/${semiFinishedProductId}`
    const url = `https://calculator-falu.vercel.app/api/${semiFinishedProductId}`
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataSemiFinishedProduct),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || `Ошибка при обновлении данных (HTTP ${response.status})`;
        throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Данные успешно обновлены:', result);
    console.log('Данные для обновления:', updatedDataSemiFinishedProduct);
    closeModal();
    getData(); 
} catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    alert('Ошибка при обновлении данных. Пожалуйста, попробуйте еще раз.'); 
}
}

async function getData() {
    const url = "https://calculator-falu.vercel.app/api/get";
   //const url = "http://localhost:5000/api/get"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Сеть не ответила');
        }
        const data = await response.json();  
        const tableBody = document.getElementById('data-body');
       
        tableBody.innerHTML = ''; 
        data.packagings.map((item,index) => {
        const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = item.createdAt; 
            row.appendChild(dateCell);

            const quantity= document.createElement('td');
            quantity.textContent = item.quantity; 
            row.appendChild(quantity);

            const quantity_in_pieces_pkg = document.createElement('td');
            quantity_in_pieces_pkg.textContent = item.quantity_in_pieces_pkg; 
            row.appendChild(quantity_in_pieces_pkg);
           
            const defectCell = document.createElement('td');
            if(data.defects[index]){
              defectCell.textContent = data.defects[index].quantity_in_pieces_defect;
            }else{
              defectCell.textContent='N/A'
            }
            row.appendChild(defectCell);
          
            const semiFinishedCell = document.createElement('td');
            if (data.semiFinishedProducts[index]){
              semiFinishedCell.textContent=data.semiFinishedProducts[index].totalQuantity;
            }        
            row.appendChild(semiFinishedCell);    
            const update_button=document.createElement('td')
            const button=document.createElement('button')
            update_button.appendChild(button);
            button.textContent="Обновить" 
            button.classList.add("update-button"); 
            button.setAttribute('data-index',`${index}`)
            row.appendChild(update_button)
            tableBody.appendChild(row);  
            const items={
              packagings:item,
              semiFinishedProducts:data.semiFinishedProducts[index],
              defects:data.defects[index]
            }
            const id = button.dataset.index
            button.addEventListener('click', () => openModal(items,id)); 
           
               });
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
getData();

function closeModal() {
  modal.style.display = "none";
  document.getElementById('quantity').value = '';
  document.getElementById('pieces_pkg').value = '';
  document.getElementById('defect').value = '';
  document.getElementById('semiFinishedCell').value = '';
}

closeSpan.onclick = function() {
  closeModal();
};
saveButton.onclick = function() {
  saveDataPackagings();
}
saveButtonDefect.onclick = function() {
  saveDataDefects();
}
saveButtonSemiFinishedProducts.onclick = function() {
  saveDataSemiFinishedProduct();
}