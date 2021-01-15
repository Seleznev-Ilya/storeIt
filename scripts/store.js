import { createMainList as list } from "./constants.js";

function setMainParameters() {
    if (!localStorage.getItem('mainList')) {
        localStorage.setItem('mainList', JSON.stringify(list()));
    }
    if (!localStorage.getItem('sliderNumber')) {
        localStorage.setItem('sliderNumber', JSON.stringify(1));
    }
    if (!localStorage.getItem('basketList')) {
        localStorage.setItem('basketList', JSON.stringify([]));
    }
    if (!localStorage.getItem('basketListPrice')) {
        localStorage.setItem('basketListPrice', JSON.stringify(0));
    }
}
setMainParameters();


export const storeControl = {
    getStorePrice() {
        return JSON.parse(localStorage.getItem('basketListPrice'));
    },
    setStorePrice(num = 0) {
        localStorage.setItem('basketListPrice', JSON.stringify(num));
    },
    getStore() {
        return JSON.parse(localStorage.getItem('mainList'));
    },
    setStore(arr) {
        localStorage.setItem('mainList', JSON.stringify(arr));
    },
    getStoreNumber() {
        return JSON.parse(localStorage.getItem('sliderNumber'));
    },
    setStoreNumber(num) {
        localStorage.setItem('sliderNumber', JSON.stringify(num));
    },
    getStoreBasket() {
        return JSON.parse(localStorage.getItem('basketList'));
    },
    setStoreBasket(value = []) {
        localStorage.setItem('basketList', JSON.stringify(value));
    },
    clearStore(value = []) {
        localStorage.setItem('mainList', JSON.stringify(value));
    },
    cleanItemStore(key) {
        let newArr = this.getStore().filter(item => {
            return item.id !== +key;
        });
        this.setStore(newArr);
    },
    addItemBusketStore(key) {
        let newArr = this.getStore().filter(item => {
            return item.id === +key;
        });
        let oldArr = this.getStoreBasket();
        oldArr = oldArr.concat(newArr);
        this.setStoreBasket(oldArr);

        this.sumItemsBusket();
    },
    sumItemsBusket() {
        let priceSum = this.getStoreBasket().reduce((t, { price }) => t + price, 0);
        this.setStorePrice(priceSum);
    },
    cleanItemPriceStore(key) {
        let oldArr = this.getStoreBasket();
        for (let i = 0; i < oldArr.length; i++) {
            if (oldArr[i].id === +key) {
                oldArr.splice(i, 1);
                break;
            }
        }
        this.setStoreBasket(oldArr);
        this.sumItemsBusket();
    },

}
