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
function filterCatalogToggleVisible(wrap){
	let i = 0;
	const container = wrap.querySelector('.bx-filter-block')
	const items = wrap.querySelectorAll('.checkbox')
	items.forEach((item)=>{		
		if(item.classList.contains('_filter-hidden')==false){
			if(i<3){
				i++;
				item.classList.remove('_visible-hidden')
			} else {
				item.classList.add('_visible-hidden')
			}
		}else{
			item.classList.remove('_visible-hidden')
		}
	})

	if(wrap.querySelectorAll('.checkbox._visible-hidden').length<1){
		wrap.classList.add('_not-more')
	}else{
		wrap.classList.remove('_not-more')
	}
	setTimeout(()=>{
		wrap.style.setProperty("--w-height",container.offsetHeight +'px' );
	},100)
}
document.querySelectorAll('.bx-filter-box').forEach((wrap)=>{
	const items = wrap.querySelectorAll('.checkbox')
	const toggle = wrap.querySelector('.bx-filter-box__visible-toggle')
	const search = wrap.querySelector('.bx-filter-box__search')
	const container = wrap.querySelector('.bx-filter-block')
	filterCatalogToggleVisible(wrap)
	toggle?.addEventListener('click',(e)=>{
		wrap.classList.toggle('_all-visible')
		setTimeout(()=>{
			wrap.style.setProperty("--w-height",container.offsetHeight +'px' );
		},100)
	})
	search?.addEventListener('keyup',(e)=>{
		items.forEach((item)=>{
			if(search.value=="" || item.querySelector('.bx-filter-param-text').getAttribute('title').toUpperCase().indexOf(search.value.toUpperCase())>=0) {
				item.classList.remove('_filter-hidden')
			}else{
				item.classList.add('_filter-hidden')
			}
		})
		filterCatalogToggleVisible(wrap)
	})
})