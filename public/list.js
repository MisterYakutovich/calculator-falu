async function getData() {
    const url = "https://calculator-falu.vercel.app/api/get";
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
            tableBody.appendChild(row);         
               });
       
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
getData();
