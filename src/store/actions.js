import Vue from 'vue'
export default {
    async updateCart(ctx) {
        const { data } = await Vue.prototype.$api.cart.getCart();
        console.log(data, 'updateCart')
        ctx.commit('addCart', {
            count: data.length || 0
        })
    }
}