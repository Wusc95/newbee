// cartItemIds
const CARTITEMIDS = 'cartItemIds'
export function getCartItemIds() {
    return localStorage.getItem(CARTITEMIDS)
}

export function setCartItemIds(cartItemIds) {
    return localStorage.setItem(CARTITEMIDS, cartItemIds)
}

export function removeCartItemIds() {
    return localStorage.removeItem(CARTITEMIDS)
}