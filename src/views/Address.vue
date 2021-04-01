<template>
  <div class="addressInfo">
    <s-header title="地址管理" :back="'user'"></s-header>
    <div class="address-item">
      <van-address-list
        v-if="from !== 'mine'"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
      <van-address-list
        v-else
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>
<script>
import sHeader from "@/components/SimpleHeader.vue";
export default {
  name: "addressInfo",
  props: ["from","cartItemIds"],
  data() {
    return {
      chosenAddressId: "1",
      list: []
    };
  },
  created() {
    this.getAddressList();
  },
  methods: {
    // 获取地址列表
    async getAddressList() {
      const { data } = await this.$api.address.getAddressList();
      this.list = data.map(item => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
          isDefault: !!item.defaultFlag
        };
      });
    },
    onAdd() {
      this.$router.push({
          name:'address-edit',
          query:{
              type:'add',
              from:this.from
          }
      })
    },
    onEdit(item, index) {
      this.$router.push({
        name:'address-edit',
        query:{
          type:'edit',
          addressId:item.id,
          from:this.from
        }
      })
    },
    select(item,index) {
      this.$router.push({
        name:'create-order',
        query:{
          addressId:item.id,
          from:this.from
        }
      })
    }
  },
  components: {
    sHeader
  }
};
</script>

<style lang="less" scoped>
.addressInfo {
  .address-item {
    margin-top: 44px;
  }
}
</style>