
var points = new Array(40, 100);
console.log(points);
fetch("http://localhost:3000/products")
.then(res => res.json())
.then(res => {
  let current_page
  let rows = 9
  let box = document.querySelector('.pagination-block')
  let pagin = document.querySelectorAll('.infoproduct__paginNumbers')
  let page_count = Math.ceil(res.length / rows)
  let prev = document.querySelectorAll('.pagination_prev')
  let next = document.querySelectorAll('.pagination_next')
  console.log(pagin);
  function displayList (items,wrapper,rows_per_page,page){
    current_page = page
    activedPageNumber()
    wrapper.innerHTML = ''
    let start = rows_per_page * page // 9
    let end = start + rows_per_page  // 18
    let paginatedItem = items.slice(start,end)
    for(let i = 0; i < paginatedItem.length; i++){
      let item = paginatedItem[i]

      wrapper.innerHTML += `
      <div class="col-4 col-lg-5 col-sm-12">
        <div class="infoproduct__card">
          <div class="infoproduct__img"> <img src=${item.img} alt="food"></div>
          <div class="infoproduct__body"> 
            <div class="infoproduct__title">${item.name}</div>
            <div class="infoproduct__block"> 
              <div class="infoproduct__date">${item.id}</div>
              <button class="infoproduct__button">Подробнее
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM7 9H8V7H7V9Z" fill="#64D370"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      `
    }
  }
  const setUpPagination = () => {
    pagin.forEach(block => block.innerHTML = '')
    for(let i = 1; i <= page_count ;i++){
      paginationButton(i)
    }
  }

  function paginationButton(page){
    pagin.forEach(block => {
      block.innerHTML += `
        <button page-index="${page}" class="pagination-number">${page}</button>
      `
    })
  }
  const activedPageNumber = () =>{
    document.querySelectorAll('.pagination-number').forEach(button => {
      button.classList.remove('active')
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == current_page+1) {
        button.classList.add("active");
      }
    })
  }
  setUpPagination()
  displayList(res,box,rows,0)
  prev.forEach(btn => {
    btn.addEventListener('click', () => {
      if(current_page !== 0){
        displayList(res,box,rows,current_page-1)
      }
      window.scrollTo(0, 0);
    })
  })
  next.forEach(btn => {
    btn.addEventListener('click', () => {
      if(current_page !== Math.floor(res.length/rows)){
        displayList(res,box,rows,current_page+1)
      }
      window.scrollTo(0, 0);
    })
  })
  
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        displayList(res,box,rows,pageIndex-1)
        window.scrollTo(0, 0);
      });
    }
  });
})

document.addEventListener("DOMContentLoaded", function(event) {
  const social = document.querySelector('.social')
  setTimeout(() => {
    social.classList.add('chat')
  },3000)
})
const menuIcon = document.querySelector('.header__menu-icon')
if(menuIcon){
    const menuBody = document.querySelector('.menu')
    menuIcon.addEventListener('click', function(e){
        menuIcon.classList.toggle('_active')
        menuBody.classList.toggle('active')
        document.body.classList.toggle('dark')
    })
}
var splidePhoto = new Splide( '.photoSlide__splide', {
    type     : 'loop',
    drag   : 'free',  
    padding: '39%',
    autoScroll: {
        speed: 1,
    },  
    arrows   : false,
    pagination: false,
    breakpoints: {
      1024: {padding: '31%'},
      428: {padding: '10%'}
    },
} );

splidePhoto.mount( window.splide.Extensions );
//-- Splide

var splide = new Splide( '#image-carousel', {
    type   : 'loop',
    gap    : 800,
    classes: {
		pagination: 'splide__pagination green__pagination',
		page      : 'splide__pagination__page green__point',
        arrows: 'splide__arrows green__arrows',
        arrow: 'splide__arrow green__arrow',
		prev  : 'splide__arrow--prev green__prev',
		next  : 'splide__arrow--next green__next',
    },
} );
splide.mount()

// ------------------------------- FORM --------------------------------------------

const url = 'http://localhost:3000/orders'
const form = document.getElementById('form')
let formData = new FormData(form)
let or = {}
console.log(formData);
for (let key of formData){
  or[key[0]] = key[1]
  console.log(key)
}
form.addEventListener('submit', formSend)

let formReq  = document.querySelectorAll('._req')
for ( let i = 0; i < formReq.length; i++) {
  const input = formReq[i]
  formRemoveError(input)
  input.addEventListener('mouseover', () => {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
  })
  if(input.getAttribute("type") === "checkbox" && input.checked === false){
    formAddError(input)
  } else{
    function formSend(e){
      e.preventDefault();
      let formData = new FormData(form)
      let orders = {}
      console.log(formData);
      for (let key of formData){
          orders[key[0]] = key[1]
      }
      fetch(url, {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(orders)
      })
      .then(res => res.json())
      .then(res => { console.log(res)})
    
      form.reset()
    }
    if(input.value === ''){
      formAddError(input)
    }
  }
}
function formAddError(el){
  el.parentElement.classList.add('_error')
  el.parentElement.classList.remove('_correct')
  el.classList.add('_error')
  el.classList.remove('_correct')
}
function formRemoveError(el){
  el.parentElement.classList.remove('_error')
  el.parentElement.classList.add('_correct')
  el.classList.remove('_error')
  el.classList.add('_correct')
}
let checkbox = document.querySelectorAll('.checkbox__item')
let checkInput = document.querySelectorAll('.checkbox__input')
for ( let i = 0; i < checkbox.length; i++) {
  let check = checkbox[i]
  let input = checkInput[i]
  check.addEventListener('mouseover', () => {
    input.classList.remove('_error')
    check.classList.remove('_error')
  })
}

document.addEventListener("DOMContentLoaded", function(event) {
	const acc = document.getElementsByClassName("faq__block");
	const panel = document.getElementsByClassName('faq__question');
	for (let i = 0; i < acc.length; i++) {
		panel[i].onclick = function() {
			const setClasses = !acc[i].classList.contains('active');
			setClass(acc, 'active', 'remove');
			if (setClasses) {
				acc[i].classList.add("active");
			}
		}
	}
	function setClass(els, className, fnName) {
		for (let i = 0; i < els.length; i++ ) {
			els[i].classList[fnName](className);
		}
	}
});

