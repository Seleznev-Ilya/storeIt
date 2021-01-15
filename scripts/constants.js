export const HEADER = {
    mywishlist: "MY WISHLIST",
};
const brands = ['iphone', 'samsung', 'xiaomi', 'oneplus', 'iphone max', 'samsung s21', 'samsung s22', 'xiaomi redme', 'oneplus new', 'iphone xe'];
export function createMainList() {

    const MAIN_LIST = [];
    for (let i = 1; i <= 20; i++) {
        let goods = new function () {

            this.id = Math.round(i + (new Date().getTime() + (i / (i + 1.2))) * (.000065 * i) / 2.3);
            this.name = `${brands[Math.floor(Math.random() * 10)].toUpperCase()}`;
            this.price = i * 100 * .62 + 53;
            this.img = `../../images/phones/${i}.webp`;

        };
        MAIN_LIST.push(goods);
    }
    return MAIN_LIST;
}

