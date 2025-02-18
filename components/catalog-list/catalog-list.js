function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

document.querySelectorAll('.catalog-card').forEach((card)=>{
	const list = card.querySelector('.catalog-card__list');
	if(!list) 
		return false;
	const category = list.querySelectorAll('li')
	if(category.length>9){
		const more = document.createElement("div");
		more.classList.add('catalog-card__more-category')
		more.innerText = `еще ${category.length-9} ${declOfNum(category.length - 9,["категория","категории","категорий"])}`
		more.addEventListener('click',()=>{
			card.classList.toggle('_open-category')
		})
		list.after(more)
	}
})