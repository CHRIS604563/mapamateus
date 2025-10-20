let inputEl = document.getElementById("input-el")
let searchEl = document.querySelector("#search-el")
let divafSearchEl = document.querySelector('.divafSearch')
let mapaEl = document.querySelector('.mapa')
let myContainer = document.querySelector('.container')


   window.addEventListener('load', () => {
  const confirmBtn = document.getElementById('confirmLocation');
  const popup = document.getElementById('locationPopup');
  const select = document.getElementById('locationSelect');

  confirmBtn.addEventListener('click', () => {
    const location = select.value;
    if (!location) {
      alert('Por favor, selecione onde você está.');
      return;
    }

    popup.style.display = 'none'; 
    alert(`Você está em: ${location.toUpperCase()}`);
    mapaEl.style.display = 'block'

  })


})


fetch('mapa.html')
.then(resp => resp.text())
.then(html =>{
mapaEl.innerHTML = html
let entradaEl = document.querySelector('.entrance-label')
entradaEl.classList.add('highlight')

})

if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=1024, initial-scale=0.8');
}





searchEl.addEventListener('click',()=>{

fetch('fetch.json')
.then(res => res.json())
.then(data =>{
 let nameEl = data.produtos.map(item => ({
    nome: item.nome,
    preco: item.preco,
    secao:item.secao,
    status:item.emEstoque,
    categoria:item.categoria
    
  }));
    

    let filtered = nameEl.filter(item => item.nome.includes(inputEl.value))
    
  
if(filtered.length > 0){
      divafSearchEl.innerHTML = filtered
      .map(item => {
        let statusText = item.status ? 'Produto Disponível' : 'Produto Indisponível';
        return `
          <div>
          <button class='product-card' onclick='toCheck(event)'>
            <p><strong class='product-name'>${item.nome}</strong></p> - R$${item.preco}
            <p class='item-secao'>
            ${item.secao}
            <p>
            <div class="status">${statusText}</div>
  <input id='input-checkbox'  type="checkbox">
            
          </button>
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



function toCheck(event) {


  
  // Find the closest product card (the button)
  let card = event.target.closest('.product-card');

  let secao = card.querySelector('.item-secao')

  // Then find the checkbox inside that card
  let checkbox = card.querySelector('#input-checkbox');
  // Now check if it's checked
  if (checkbox.checked) {
  console.log(secao.innerHTML)  

   if(secao.textContent.trim() === 'Sessão 1'){
    let myE = mapaEl.querySelector('#s1')
    myE.classList.toggle('highlight')



  }


 else if(secao.textContent.trim() === 'Sessão 2'){
    let myE = mapaEl.querySelector('#s2')
    myE.classList.toggle('highlight')
    


  }
 else if(secao.textContent.trim() === 'Sessão 3'){
    let myE = mapaEl.querySelector('#s3')
    myE.classList.toggle('highlight')


  }


 else if(secao.textContent.trim() === 'Sessão 4'){
    let myE = mapaEl.querySelector('#s4')
    myE.classList.toggle('highlight')



  }
 else if(secao.textContent.trim() === 'Sessão 5'){
    let myE = mapaEl.querySelector('#s5')
    myE.classList.toggle('highlight')



  }


  
else{
myE.style.background = 'white'

}





  }
}



 inputEl.addEventListener("input", () => {
    searchEl.click()
    let val = inputEl.value;
    inputEl.value = val.charAt(0).toUpperCase() + val.slice(1);




  });


