export default{
    addCart(state,payload){
        console.log(state,payload,'addCart')
        state.cartCount = payload.count
    }
}