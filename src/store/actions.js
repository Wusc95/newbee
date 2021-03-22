import Vue from 'vue'
export default {
    async updateCart(ctx) {
        const { data } = await Vue.prototype.$api.cart.getCart();
        ctx.commit('addCart', {
            count: data.length || 0
        })
    }
}