<template>
  <div class="address-edit">
      编辑地址
  </div>
</template>

<script>
export default {
    name:'AddressEdit',
    props:["cartItemIds"],
    data() {
        return {
            
        }
    },
    created() {
        console.log(this.cartItemIds)
    },
}
</script>

<style>

</style>