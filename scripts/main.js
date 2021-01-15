// import { createMainList as goodsArr } from "./constants.js";
import { storeControl as store } from "./store.js";

function renderMainContent(arrList, sliderItemNumber) {

    // CREATE card 
    function createCard(goodImg = null, name = 'no name', price = null, id = null) {
        let card = document.createElement('div');
        card.classList.add('good');
        card.dataset.id = id;

        let view = document.createElement('div');
        view.classList.add('good_view');

        let image = document.createElement('div');
        image.classList.add('view_image');

        let img = new Image(140, 185);
        img.classList.add('view_img');
        img.src = goodImg;

        let hr = document.createElement('hr');
        hr.classList.add('view_hr');

        image.append(img);
        view.append(image);
        view.append(hr);

        let remove = document.createElement('div');
        remove.classList.add('good_remove');

        let btn = document.createElement('div');
        btn.classList.add('remove_btn');
        btn.dataset.remove = id;

        let btn_p = document.createElement('div');
        btn_p.classList.add('btn_p');
        btn_p.dataset.remove = id;
        btn_p.append('REMOVE FROM LIST');

        btn.append(btn_p);
        remove.append(btn);
        view.append(remove);

        let description = document.createElement('div');
        description.classList.add('good_description');

        let desName = document.createElement('p');
        desName.classList.add('desName');
        desName.append(name);

        let desPrice = document.createElement('span');
        desPrice.classList.add('desPrice');
        desPrice.append(`$${price}`);

        let desBtnWrapper = document.createElement('div');
        desBtnWrapper.classList.add('desBtnWrapper');

        let binWrapper = document.createElement('div');
        binWrapper.classList.add('binWrapper');
        binWrapper.dataset.bin = id;

        let bin = document.createElement('div');
        bin.classList.add('bin_img');
        bin.dataset.bin = id;
        binWrapper.append(bin)

        let shoppingWrapper = document.createElement('div');
        shoppingWrapper.classList.add('shoppingWrapper');
        shoppingWrapper.dataset.shopping = id;

        let shopping = document.createElement('div');
        shopping.classList.add('view_shopping');
        shopping.dataset.shopping = id;

        shoppingWrapper.append(shopping)

        desBtnWrapper.append(binWrapper);
        desBtnWrapper.append(shoppingWrapper);

        description.append(desName);
        description.append(desPrice);
        description.append(desBtnWrapper);

        card.append(view);
        card.append(description);
        list.append(card);
    }

    // DRAW slider bar +
    function createSlider(number) {
        slider.innerHTML = '';
        for (let i = 1; i <= number; i++) {
            let sliderItem = document.createElement('div');
            sliderItem.classList.add(`sliderItem`);
            sliderItem.dataset.item = `${i}`;
            sliderItem.innerText = `${i}`;
            slider.append(sliderItem);
        }
    }

    //DRAW on the Products list +
    function renderList(goodList) {
        list.innerHTML = '';
        goodList.forEach((item, index) => {
            createCard(item.img, item.name, item.price, item.id)
        });
    }

    createSlider(createSliderArr(arrList()).length);
    renderList(createSliderArr(arrList())[sliderItemNumber() - 1]);
    markActiveSliderBar();
}
renderMainContent(store.getStore, store.getStoreNumber);

// CREATE an array for the slider
function createSliderArr(arr) {
    let newArr = Object.assign([], arr);
    let sliderArr = [];
    let a = 0, b = 8;
    for (let i = a, k = i + b; i < newArr.length; i = i + b, k = k + b) {
        if (k > newArr.length) {
            k = newArr.length;
        }
        sliderArr.push(newArr.slice(i, k));
    }
    return sliderArr;
}
//DRAW Active Slider Bar
function markActiveSliderBar() {

    function clearActiveClassSlider() {
        slider.childNodes.forEach((itemI) => {
            itemI.classList.remove('sliderItem-active');

        })
    }
    function setActiveClassSlider() {
        slider.childNodes.forEach((itemI) => {
            if (+itemI.dataset.item === store.getStoreNumber()) {
                itemI.classList.add('sliderItem-active');
            }
        })
    }

    clearActiveClassSlider();
    setActiveClassSlider();
}
//DRAW Basket List 
function buscketControl() {
    // let basketPriceSpan = document.querySelector(".basket_price-span");
    // let basketNumber = document.querySelector(".basket_number");

    function controlBasketListNumber() {
        let numberItems = store.getStoreBasket().length;
        if (numberItems) {
            basketNumber.classList.remove('hideA');
        } else {
            basketNumber.classList.add('hideA');
        }
        basketNumber.innerText = numberItems;
    }

    function controlBasketListPrice() {
        let sum = store.getStorePrice();
        basketPriceSpan.innerText = `$ ${sum}.00`;
    }
    controlBasketListNumber();
    controlBasketListPrice();
}
buscketControl();

// EVENTS* add Event Listener 
document.querySelector('.filter_form').addEventListener('submit', submitForm);
function submitForm() {
    let magnifierText = document.querySelector('.filter_input');
    function creatMagnifierArray() {
        let magnifierArr = store.getStore().filter(item => {
            // доработать точны поиск
            return item.name === magnifierText.value.toUpperCase()
        });
        return magnifierArr;
    }
    console.log(creatMagnifierArray().length);
    if (magnifierText.value === '') {

        document.querySelector('.filter_input').placeholder = '……🖋';
        renderMainContent(store.getStore, store.getStoreNumber);
    } else {
        if (creatMagnifierArray().length) {
            // renderMainContent(creatMagnifierArray, creatMagnifierArray;
            renderMainContent(creatMagnifierArray, store.getStoreNumber);

            document.querySelector('.filter_input').placeholder = document.querySelector('.filter_input').value + ' ☑';
            document.querySelector('.filter_input').value = "";

        } else {
            document.querySelector('.filter_input').placeholder = 'Nothing ☹';
            document.querySelector('.filter_input').value = "";
        }
    }


    // document.querySelector('.filter_input').classList.toggle('filter_input-active');
}

document.querySelector('.magnifier').onclick = function activeInput() {
    document.querySelector('.filter_input').classList.toggle('filter_input-active');
    document.querySelector('.filter_input').focus();
    submitForm()
};


slider.addEventListener('click', function markActiveSliderBarEvent(event) {
    let e = event.target;
    console.log(+e.dataset.item);
    store.setStoreNumber(+e.dataset.item);
    renderMainContent(store.getStore, store.getStoreNumber);
});
let filterClear = document.querySelector('.filter_clear');
filterClear.addEventListener('click', function clearListBtn() {
    store.clearStore();
    store.setStoreNumber(1);
    renderMainContent(store.getStore, store.getStoreNumber);
});

list.addEventListener('click', function removeItemBtn(event) {
    let e = event.target;
    if (e.dataset.remove) {
        store.cleanItemStore(e.dataset.remove);
        if (+store.getStoreNumber() - 1 !== 0) {
            store.setStoreNumber(createSliderArr(store.getStore()).length);
            renderMainContent(store.getStore, store.getStoreNumber);
        } else {
            renderMainContent(store.getStore, store.getStoreNumber);
        }
    }
});

list.addEventListener('click', function addItemBuscket(event) {
    let e = event.target;
    if (e.dataset.shopping) {
        store.addItemBusketStore(e.dataset.shopping);
        buscketControl();
    }
});

list.addEventListener('click', function addItemBuscket(event) {
    let e = event.target;
    if (e.dataset.bin) {
        store.cleanItemPriceStore(e.dataset.bin);
        // store.sumItemsBusket();
        buscketControl();
    }
});




