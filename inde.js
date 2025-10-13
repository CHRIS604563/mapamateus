let inputEl = document.getElementById("input-el")
let searchEl = document.querySelector("#search-el")
let divafSearchEl = document.querySelector('.divafSearch')


searchEl.addEventListener('click',()=>{

fetch('fetch.json')
.then(res => res.json())
.then(data =>{
 let nameEl = data.produtos.map(item => ({
    nome: item.nome,
    preco: item.preco,
    secao:item.secao,
    status:item.emEstoque
  }));
    

    let filtered = nameEl.filter(item => item.nome.includes(inputEl.value))
    
  
if(filtered.length > 0){
      divafSearchEl.innerHTML = filtered
      .map(item => {
        let statusText = item.status ? 'Produto Disponível' : 'Produto Indisponível';
        return `
          <div>
            <strong>${item.nome}</strong> - R$${item.preco}<br>
            ${item.secao}<br>
            <div class="status">${statusText}</div>
            <hr>
          </div>
        `;
      })
      .join('');
}

else{

divafSearchEl.innerHTML = '<strong>Produto Indisponível</strong>'

}



    if (inputEl.value === '') {
      divafSearchEl.innerHTML = '';
    }

    
})


.catch(err => console.log(err))


})



 inputEl.addEventListener("input", () => {
    searchEl.click()
    let val = inputEl.value;
    inputEl.value = val.charAt(0).toUpperCase() + val.slice(1);





  });
