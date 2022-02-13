function selectElement(element){
   return document.querySelector(element);
}

function selectElementAll(element){
   return document.querySelectorAll(element);
}

let id = 1;
let arrProducts = [];
let editID = null;

//lendo dados
function readData(){
   let nameProduct = selectElement('#product').value;
   let priceProduct = selectElement('#price').value;
   return new Product(id, nameProduct, priceProduct);
}

//Main
selectElement('#btn-save').addEventListener('click', () => {
   let product = readData();
   if(validateFields(product)){
      if(editID == null){
         addProduct(product);
      }else{
         editProduct(editID, product);
      }
   }
   clearInputs();
   showScreen();
});

//Mostrando dados na tela
function showScreen(){
   let tbody = selectElement('#tbody');
   tbody.innerText = "";

   arrProducts.forEach((element, index) =>{
      let tr = tbody.insertRow();
      let td_id = tr.insertCell();
      td_id.classList.add('center');
      let td_product = tr.insertCell();
      let td_price = tr.insertCell();
      let td_actions = tr.insertCell();
      td_actions.classList.add('center');

      let iconEdit = document.createElement('i');
      iconEdit.classList.add('fa-solid');
      iconEdit.classList.add('fa-pen-to-square');
      let iconDelete = document.createElement('i');
      iconDelete.classList.add('fa-solid');
      iconDelete.classList.add('fa-trash-can');

      iconDelete.setAttribute('onclick', `deleteProduct(${element.id})`);
      iconEdit.setAttribute('onclick', `prepareEditProduct(${JSON.stringify(element)})`);

      td_id.innerText = element.id;
      td_product.innerText = element.name;
      td_price.innerText = `R$ ${element.price}`;
      td_actions.appendChild(iconEdit);
      td_actions.appendChild(iconDelete);
      
   })
}

//Adicionando produtos no array
function addProduct(product){
   product.price = parseFloat(product.price);
   arrProducts.push(product);
   id++;
}

//Removendo produtos
function deleteProduct(id){
   let tbody = selectElement('#tbody');
   if(confirm('Deseja realmente exluir o produto com ID ' + id + '?')){
      arrProducts.forEach((element, index) => {
         if(element.id == id){
            arrProducts.slice(index, 1);
            tbody.deleteRow(index);
         }
      });
   }
}

//preparando edição do produto
function prepareEditProduct(objJson){
   editID = objJson._id;
   selectElement('#product').value = objJson._name;
   selectElement('#price').value = objJson._price;
   selectElement('#btn-save').innerText = "Atualizar";
}

//Editando produto
function editProduct(id, product){
   arrProducts.forEach((element, index) => {
      if(element.id == id){
         element.name = product.name;
         element.price = product.price;
      }
   });
}

//Limpando inputs
function clearInputs(){
   selectElement('#product').value = '';
   selectElement('#price').value = '';
   selectElement('#btn-save').innerText = "Salvar";
   editID = null;
}

//Verificando dados
function validateFields(obj){
   let msg = '';
   if(obj.name == ''){
      msg += "- O campo Produto não pode ser vazio\n";
   }
   if(obj.price == ''){
      msg += "- O campo Preço não pode ser vazio\n";
   }

   if(msg != ''){
      alert(msg);
      return false;
   }
   //passou
   return true;
}