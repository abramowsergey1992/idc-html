document.querySelectorAll('[popup-add-open]').forEach((btn)=>{
	btn.addEventListener('click',(e) =>{
		e.preventDefault()
		const popup = document.querySelector('.popup-add');
		popup.classList.add('_open')
	})
})
document.onclick = function(event) {
    var el = event.target;
	if (el.className == "popup-add__close") {
		console.log('eeee')
		const popup = el.closest('.popup-add');
		popup.classList.remove('_open')
    }
    if (el.className == "popup-add__product-basket-sub") {
		const popup = el.closest('.popup-add');
		const count = popup.querySelector('.popup-add__product-basket-count');
		if(count.value >1){
			count.value =  parseInt(count.value) - 1
		}else{
			popup.classList.add('_delete-active')
		}
    }
	if (el.className == "popup-add__product-basket-add") {
		const popup = el.closest('.popup-add');
		const count = popup.querySelector('.popup-add__product-basket-count');
		count.value = parseInt(count.value) + 1
		popup.classList.remove('_delete-active')
    }
};