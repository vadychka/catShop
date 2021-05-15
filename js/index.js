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
const itemsLlength = document.querySelector('.items__length')

let productsData = [];
let MAX_LOAD_COUNT = 3;
const PRODUCTS_PER_CLICK = 9;

sortByPriceBtn.addEventListener('click', sortByPriceClick)
sortByAgeBtn.addEventListener('click', sortByAgeClick)
footerBtn.addEventListener('click', openPopupClick)
popupBodyBtn.addEventListener('click', closePopupClick)
popupCloseBtn.addEventListener('click', closePopupClick)
burgerBtnOpen.addEventListener('click', openBurgerClick)
burgerBtnClose.addEventListener('click', closeBurgerClick)
mainBtnAdd.addEventListener('click', loadMoreProduct)

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
   itemsLlength.innerHTML = productsData.length
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
      generateToste('white', 'товар добавлен в корзину')
   }
}

function generateToste(type, text) {
   const messageEndList = document.createElement('div')
   messageEndList.classList.add('like__show-message')
   like.appendChild(messageEndList)
   messageEndList.style.color = type
   messageEndList.innerHTML = text
   setTimeout(() => {
      messageEndList.classList.add('like__close-message')
   }, 2000)
}
function loadMoreProduct() {
   MAX_LOAD_COUNT += PRODUCTS_PER_CLICK
   mainCatalog.innerHTML = ''

   if (MAX_LOAD_COUNT >= productsData.length) {
      generateToste('red', 'товары закончились')
   }
   pushData(productsData)
}

function openBurgerClick() {
   burgerBlock.classList.add('burger__show')
   burgerBlock.classList.remove('burger__close')
   burgerBtnDefoult.classList.add('btn-burger__active')
}

function closeBurgerClick() {
   burgerBlock.classList.add('burger__close')
   burgerBlock.classList.remove('burger__show')
   burgerBtnDefoult.classList.remove('btn-burger__active')
}

function sortUnActive(icon) {
   icon.style.color = ''
   icon.innerHTML = '&#9660'
   productsData.sort((a, b) => a.paws > b.paws ? 1 : -1)
   mainCatalog.innerHTML = ''
   pushData(productsData)
}

function sortByAgeClick() {
   productsData.sort((a, b) => a.age > b.age ? 1 : -1)
   mainCatalog.innerHTML = ''
   pushData(productsData)

   if (iconForAge.style.color === 'blue') {
      sortUnActive(iconForAge)
   } else {
      iconForAge.innerHTML = '&#9650'
      iconForAge.style.color = 'blue'
      iconForPrice.innerHTML = '&#9660'
      iconForPrice.style.color = ''
   }
}

function sortByPriceClick() {
   productsData.sort((a, b) => a.price > b.price ? 1 : -1)
   mainCatalog.innerHTML = ''
   pushData(productsData)

   if (iconForPrice.style.color === 'blue') {
      sortUnActive(iconForPrice)
   } else {
      iconForPrice.innerHTML = '&#9650'
      iconForPrice.style.color = 'blue'
      iconForAge.innerHTML = '&#9660'
      iconForAge.style.color = ''
   }
}

function closePopupClick() {
   popup.classList.remove('popup__open')
}

function openPopupClick() {
   popup.classList.add('popup__open')
   let sec = 3;
   popupText.innerHTML = sec
   let popupSec = setInterval(() => {
      if (sec <= 0 || !popup.classList.contains('popup__open')) {
         popup.classList.remove('popup__open')
         clearInterval(popupSec)
         sec = 3
      }
      popupText.innerHTML = --sec
   }, 1000)
}

loadData()