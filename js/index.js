const body = document.querySelector('body')
const mainCatalog = document.querySelector('.main__catalog');
const mainBtnAdd = document.querySelector('.main__add')
const sortByPriceBtn = document.querySelector('.main__price')
const sortByAgeBtn = document.querySelector('.main__age')
const checkboxPrice = document.querySelector('#checkbox_price')
const iconForPrice = document.querySelector('.main__price-icon')
const iconForAge = document.querySelector('.main__age-icon')
const footerBtn = document.querySelector('.footer__button')
const popup = document.querySelector('.popup')
const popupText = document.querySelector('.popup__text')
const popupBodyBtn = document.querySelector('.popup__area')
const popupCloseBtn = document.querySelector('.popup__close')
const burgerBtnClose = document.querySelector('.burger__btn-close')
const burgerBlock = document.querySelector('.burger')
const burgerBtnOpen = document.querySelector('.btn-burger')
const burgerBtnDefoult = document.querySelector('.btn-burger__defolt')
const mainAddItems = document.querySelector('.main__add-items')
const like = document.querySelector('.like')

let productsData = [];
let MAX_LOAD_COUNT = 3;
const PRODUCTS_PER_CLICK = 9;

popupBodyBtn.addEventListener('click', popupBody)

sortByPriceBtn.addEventListener('click', sortByPrice)

sortByAgeBtn.addEventListener('click', sortByAge)

footerBtn.addEventListener('click', footerPopup)

popupCloseBtn.addEventListener('click', popupClose)

burgerBtnOpen.addEventListener('click', openBurger)

burgerBtnClose.addEventListener('click', closeBurger)

mainBtnAdd.addEventListener('click', mainAdd)

let pushData = (arr) => {
   let itemsLength = productsData.length - MAX_LOAD_COUNT
   let productClick = PRODUCTS_PER_CLICK
   if (itemsLength <= 0) itemsLength = 0;
   if (itemsLength <= PRODUCTS_PER_CLICK) productClick = itemsLength

   mainAddItems.innerHTML = 'Показать еще ' + productClick + ' (' + itemsLength + ')'

   arr.slice(0, MAX_LOAD_COUNT).map(el => {
      generateCard(el)
   })
}
async function loadData() {
   const dataFromAPI = await fetch('../json/data.json')
   productsData = await dataFromAPI.json();
   pushData(productsData)
}

function generateCard(el) {
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

   likeBtn.addEventListener('click', likeMassage)

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

   function likeMassage() {
      const showMassage = document.createElement('div')

      showMassage.classList.add('like__show-message')
      like.append(showMassage)
      showMassage.innerHTML = 'товар добавлен в корзину'

      setTimeout(() => {
         showMassage.classList.add('like__close-message')
      }, 2000)
   }
}

function mainAdd() {
   MAX_LOAD_COUNT += PRODUCTS_PER_CLICK
   mainCatalog.innerHTML = ''

   if (MAX_LOAD_COUNT >= productsData.length) {
      const messageEndList = document.createElement('div')
      messageEndList.classList.add('like__show-message')
      like.appendChild(messageEndList)
      messageEndList.style.color = 'red'
      messageEndList.innerHTML = 'товары закончились'

      setTimeout(() => {
         messageEndList.classList.add('like__close-message')
      }, 2000)
   }
   pushData(productsData)
}

function footerPopup() {
   popup.classList.add('popup__open')
   let sec = 2;
   popupText.innerHTML = sec + 1
   let popupSec = setInterval(() => {
      popupText.innerHTML = sec
      if (sec <= 0) {
         clearInterval(popupSec)
      }
      sec--
   }, 1000)

   setTimeout(() => popup.classList.remove('popup__open'), 3000)

}

function popupClose() { popup.classList.remove('popup__open') }

function openBurger() {
   burgerBlock.classList.add('burger__show')
   burgerBlock.classList.remove('burger__close')
   burgerBtnDefoult.classList.add('btn-burger__active')
}

function closeBurger() {
   burgerBlock.classList.add('burger__close')
   burgerBlock.classList.remove('burger__show')
   burgerBtnDefoult.classList.remove('btn-burger__active')
}

function sortByAge() {
   productsData.sort((a, b) => a.age > b.age ? 1 : -1)
   mainCatalog.innerHTML = ''
   pushData(productsData)

   if (iconForAge.style.color === 'blue') {
      iconForAge.style.color = ''
      iconForAge.innerHTML = '&#9660'
      productsData.sort((a, b) => a.paws > b.paws ? 1 : -1)
      mainCatalog.innerHTML = ''
      pushData(productsData)
      return true
   }
   iconForAge.innerHTML = '&#9650'
   iconForAge.style.color = 'blue'
   iconForPrice.innerHTML = '&#9660'
   iconForPrice.style.color = ''
}

function sortByPrice() {
   productsData.sort((a, b) => a.price > b.price ? 1 : -1)
   mainCatalog.innerHTML = ''
   pushData(productsData)

   if (iconForPrice.style.color === 'blue') {
      iconForPrice.style.color = ''
      iconForPrice.innerHTML = '&#9660'
      productsData.sort((a, b) => a.paws > b.paws ? 1 : -1)
      mainCatalog.innerHTML = ''
      pushData(productsData)
      return true
   }
   iconForPrice.innerHTML = '&#9650'
   iconForPrice.style.color = 'blue'
   iconForAge.innerHTML = '&#9660'
   iconForAge.style.color = ''
}

function popupBody() { popup.classList.remove('popup__open') }

loadData()