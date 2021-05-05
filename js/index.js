const mainCatalog = document.querySelector('.main__catalog');
const mainBtnAdd = document.querySelector('.main__add')
const sortByPrice = document.querySelector('.main__price')
const sortByAge = document.querySelector('.main__age')
const checkboxPrice = document.querySelector('#checkbox_price')
const iconForPrice = document.querySelector('.main__price-icon')
const iconForAge = document.querySelector('.main__age-icon')

let MAX_LOAD_COUNT = 3;
let PRODUCTS_PER_CLICK = 3;

let pushData = (arr) => {
   arr.slice(0, MAX_LOAD_COUNT).map(el => {
      const massageLikeBtn = document.querySelector('main')
      const mainContainer = document.createElement('div')
      const mainImg = document.createElement('img')
      const mainInformAboutItem = document.createElement('div')
      const blockForColor = document.createElement('div')
      const blockForInform = document.createElement('div')
      const price = document.createElement('b')
      const btnSell = document.createElement('div')
      const discount = document.createElement('div')
      const likeBtn = document.createElement('div')
      const catAge = document.createElement('div')
      const catPaws = document.createElement('div')

      mainCatalog.append(mainContainer)
      mainContainer.classList.add('main__container')

      mainContainer.append(mainImg)
      mainImg.classList.add('main__img')
      mainImg.setAttribute('src', el.img)
      mainContainer.append(blockForInform)
      blockForInform.style.padding = '1em'

      mainInformAboutItem.append(blockForColor)
      blockForInform.innerHTML = '<b>' + el.name + '</b>'

      blockForInform.append(mainInformAboutItem)
      mainInformAboutItem.classList.add('main__info-cat')

      blockForColor.append(el.color)
      blockForColor.classList.add('main__item-color')

      catAge.innerHTML = '<b>' + el.age + '</b>' + '</br>' + 'Возраст'
      mainInformAboutItem.append(catAge)

      catPaws.innerHTML = '<b>' + el.paws + '</b>' + '</br>' + 'Кол-во лап'
      mainInformAboutItem.append(catPaws)

      price.append(el.price)
      blockForInform.append(price)
      mainContainer.append(btnSell)

      if (el.sell) {
         btnSell.innerHTML = 'Купить'
         btnSell.classList.add('main__btn-buy')
      }
      else {
         btnSell.innerHTML = 'продано'
         btnSell.classList.add('main__btn-sell')
      }

      if (el.discount) {
         mainContainer.append(discount)
         discount.innerHTML = '- ' + el.discount + '%'
         discount.classList.add('main__discount')
      }
      likeBtn.classList.add('main__btn-like')
      mainContainer.append(likeBtn)

      likeBtn.addEventListener('click', () => {
         const showMassage = document.createElement('div')

         showMassage.classList.add('like__show-message')
         massageLikeBtn.appendChild(showMassage)
         showMassage.innerHTML = 'товар добавлен в корзину'

         setTimeout(() => {
            showMassage.classList.add('like__close-message')
         }, 2000)
      })
   })
}
async function loadData() {
   const dataFromAPI = await fetch('../json/data.json')
   productsData = await dataFromAPI.json();
   pushData(productsData)
}

loadData()
let productsData = [];

mainBtnAdd.addEventListener('click', () => {
   MAX_LOAD_COUNT += PRODUCTS_PER_CLICK
   mainCatalog.innerHTML = ''

   if (MAX_LOAD_COUNT >= productsData.length) {
      const messageEndList = document.createElement('div')
      messageEndList.classList.add('main__message-end-list')
      mainCatalog.appendChild(messageEndList)
      messageEndList.innerHTML = 'товары закончились'

      setTimeout(() => {
         messageEndList.classList.add('like__close-message')
      }, 2000)
   }
   pushData(productsData)
})


sortByPrice.addEventListener('click', () => {
   productsData.sort((a, b) => a.price > b.price ? 1 : -1)
   mainCatalog.innerHTML = ''
   pushData(productsData)

   if (iconForPrice.style.color === 'blue') {
      iconForPrice.style.color = ''
      iconForPrice.innerHTML = '&#8659'
      productsData.sort((a, b) => a.paws > b.paws ? 1 : -1)
      mainCatalog.innerHTML = ''
      pushData(productsData)
      return true
   }
   iconForPrice.innerHTML = '&#8657'
   iconForPrice.style.color = 'blue'
   iconForAge.innerHTML = '&#8659'
   iconForAge.style.color = ''
})

sortByAge.addEventListener('click', () => {
   productsData.sort((a, b) => a.age > b.age ? 1 : -1)
   mainCatalog.innerHTML = ''
   pushData(productsData)

   if (iconForAge.style.color === 'blue') {
      iconForAge.style.color = ''
      iconForAge.innerHTML = '&#8659'
      productsData.sort((a, b) => a.paws > b.paws ? 1 : -1)
      mainCatalog.innerHTML = ''
      pushData(productsData)
      return true
   }
   iconForAge.innerHTML = '&#8657'
   iconForAge.style.color = 'blue'
   iconForPrice.innerHTML = '&#8659'
   iconForPrice.style.color = ''
})