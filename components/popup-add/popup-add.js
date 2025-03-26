document.querySelectorAll('[popup-add-open]').forEach((btn)=>{
	
	btn.addEventListener('click',(e) =>{
		e.preventDefault()
		fetch('towar.json', {
			method: 'GET', 
			// body: JSON.stringify({}), 
			headers: {
			  'Content-type': 'application/json; charset=UTF-8',
			},
		  })
			.then((response) => response.json())
			.then((data) => {
				if(data.status="ok"){
					console.log('')
					document.querySelector('.popup-add__products').innerHTML =  data.html;
					document.querySelector('.popup-add')?.classList.add('_open') 
				}
		})
		
	})
})
document.onclick = function(event) {
    var el = event.target;
	if (el.className == "popup-add__close") {
		const popup = el.closest('.popup-add');
		popup.classList.remove('_open')
    }
    if (el.className == "popup-add__product-basket-sub") {
		const product = el.closest('.popup-add__product');
		const count = product.querySelector('.popup-add__product-basket-count');
		fetch('towar.json', {
			method: 'GET', 
			// body: JSON.stringify({}), 
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status="ok"){
				if(count.value >1){
					count.value =  parseInt(count.value) - 1
				}else{
					product.classList.add('_delete-active')
				}
			}
		});
    }
	if (el.className == "popup-add__product-basket-add") {
		const product = el.closest('.popup-add__product');
		const count = product.querySelector('.popup-add__product-basket-count');
		fetch('towar.json', {
			method: 'GET', 
			// body: JSON.stringify({}), 
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status="ok"){
				count.value = parseInt(count.value) + 1
				product.classList.remove('_delete-active')
			}
		});
		
    }

	if (el.className == "popup-add__product-basket-delete") {
		
		const popup = el.closest('.popup-add');
		fetch('towar.json', {
			method: 'GET', 
			// body: JSON.stringify({}), 
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.status="ok"){
				//действия при удалении товара
				popup.classList.remove('_open')
			}
		});
		
    }
};