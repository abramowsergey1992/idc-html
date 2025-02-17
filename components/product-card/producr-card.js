
function productsInit(){
	document.querySelectorAll(".card-product:not(._init)").forEach((product)=>{
		product.classList.add('_init')
		const pagi = product.querySelector('.card-product__slider-pagi')
		const slides = product.querySelectorAll('.card-product__slide')
		slides.forEach((slide, index)=>{
			const dot = document.createElement("span");
			dot.classList.add('card-product__slider-pagi-dot')
			pagi.appendChild(dot)
			if(index==0){
				dot.classList.add('_active')
				slide.classList.add('_active')
			}
			slide.addEventListener('mouseover', () => {
				product.querySelectorAll('.card-product__slider-pagi-dot').forEach((tempDot)=>{
					tempDot.classList.remove('_active')
				})
				dot.classList.add('_active')
				
				slides.forEach((tempSlide)=>{
					tempSlide.classList.remove('_active')
				})
				slide.classList.add('_active')
			})
			dot.addEventListener('click', () => {
				product.querySelectorAll('.card-product__slider-pagi-dot').forEach((tempDot)=>{
					tempDot.classList.remove('_active')
				})
				dot.classList.add('_active')
				
				slides.forEach((tempSlide)=>{
					tempSlide.classList.remove('_active')
				})
				slide.classList.add('_active')
			})
		})
	
	})
}

document.querySelectorAll('.js-products-observer').forEach((target)=>{
	let observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === "childList") {
				productsInit()
			}
		});
	});
	let config = { attributes: true, childList: true, characterData: true };
	observer.observe(target, config);
})
productsInit()