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
    padding: { left: '39%', right: '39%' },
    autoScroll: {
        speed: 1,
    },  
    arrows   : false,
    pagination: false,
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

const form = document.getElementById('form')
form.addEventListener('submit', formSend)
async function formSend(e){
  e.preventDefault();
  let error = formvalidate(form)
}

function formvalidate(form){
  let error = 0
  let formReq  = document.querySelectorAll('._req')
  for ( let i = 0; i < formReq.length; i++) {
    const input = formReq[i]
    console.log(input.checked);
    formRemoveError(input)
    input.addEventListener('mouseover', () => {
      input.parentElement.classList.remove('_error')
      input.classList.remove('_error')
    })
    if(input.getAttribute("type") === "checkbox" && input.checked === false){
      formAddError(input)
      error++
    } else{
      if (input.value === '' ){
        formAddError(input)
        error++
      }
    }
  }
  return error
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


