const mainCatalog = document.querySelector('.main__catalog');
const mainBtnAdd = document.querySelector('.main__add')
const sortByPrice = document.querySelector('.main__price')

let paginNum = 3
let count = 0

mainBtnAdd.addEventListener('click', () => {
   paginNum += 3
   cats()
   console.log(paginNum)
})

async function cats() {
   let getDataFromServer = await fetch('../json/data.json');
   let getDataFromJson = await getDataFromServer.json()
   return getDataFromJson
}
cats().then((arr) => {


   arr.map(el => {
      if (count == paginNum) {
         console.log(count)
         return true
      }
      count += 1


      const massageLikeBtn = document.querySelector('main')
      const mainContainer = document.createElement('div')
      const mainImg = document.createElement('img')
      const mainInformAboutItem = document.createElement('div')
      const blockForColor = document.createElement('div')
      const blockForInform = document.createElement('div')
      const price = document.createElement('b')
      const btnSell = document.createElement('div')
      const discount = document.createElement('div')

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
      mainInformAboutItem.classList.add('main__info_cat')

      blockForColor.append(el.color)
      blockForColor.style.width = '33%'

      const catAge = document.createElement('div')
      catAge.innerHTML = '<b>' + el.age + '</b>' + '</br>' + 'Возраст'
      mainInformAboutItem.append(catAge)

      const catPaws = document.createElement('div')
      catPaws.innerHTML = '<b>' + el.paws + '</b>' + '</br>' + 'Кол-во лап'
      mainInformAboutItem.append(catPaws)

      price.append(el.price)
      blockForInform.append(price)

      mainContainer.append(btnSell)

      if (el.sell) {
         btnSell.innerHTML = 'Купить'
         btnSell.classList.add('main__btn--bye')
      }
      else {
         btnSell.innerHTML = 'продано'
         btnSell.classList.add('main__btn--sell')
      }

      if (el.discount) {
         mainContainer.append(discount)
         discount.innerHTML = '- ' + el.discount + '%'
         discount.classList.add('main__discount')
      }

      const likeBtn = document.createElement('div')
      likeBtn.classList.add('main__btn--like')
      mainContainer.append(likeBtn)

      likeBtn.addEventListener('click', () => {
         const showMassage = document.createElement('div')
         showMassage.classList.add('like__showMassage')
         massageLikeBtn.appendChild(showMassage)
         showMassage.innerHTML = 'товар добавлен в корзину'

         setTimeout(() => {
            showMassage.remove()
         }, 2000)
      })
   })
})

sortByPrice.addEventListener('click', () => {
   mainCatalog.sort()
})
