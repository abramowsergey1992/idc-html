document.querySelectorAll('.products-wrap__sort').forEach((wrap)=>{
	wrap.querySelectorAll('.products-wrap__sort-open').forEach((openBtn)=>{
		openBtn.addEventListener('click', () => {
			wrap.classList.toggle('_open')
		})
	})
	wrap.querySelectorAll('.products-wrap__sort-close').forEach((closeBtn)=>{
		closeBtn.addEventListener('click', () => {
			wrap.classList.remove('_open')
		})
	})

	window.addEventListener('click', function(e){   
		if (!wrap.contains(e.target)){
			wrap.classList.remove('_open')
		}
	});
	wrap.querySelectorAll('.products-wrap__popup-option').forEach((option)=>{
		option.addEventListener('click',()=>{
			
			wrap.classList.remove('_open')
			wrap.querySelector('.products-wrap__sort-open span').innerText = option.querySelector('span').innerText
			console.log('CallBack: сортировка изменилась')
		})
	})
})
document.querySelectorAll('.products-wrap').forEach((wrap)=>{
	const popup = wrap.querySelector('.products-wrap__filter')
	wrap.querySelectorAll('.products-wrap__filter-open').forEach((openBtn)=>{
		openBtn.addEventListener('click', () => {
			popup.classList.toggle('_open')
		})
	})
	wrap.querySelectorAll('.products-wrap__filter-overlay,.products-wrap__filter-close').forEach((closeBtn)=>{
		closeBtn.addEventListener('click', () => {
			popup.classList.remove('_open')
		})
	})
})
