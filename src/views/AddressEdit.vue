<template>
  <div class="address-edit">
    <s-header :title="`${type == 'add'?'新增地址':'编辑地址'}`"></s-header>
    <div class="edit-box">
      <van-address-edit
        class="edit"
        :area-list="areaList"
        :address-info="addressInfo"
        :show-delete="type == 'edit'"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader.vue";
export default {
  name: "AddressEdit",
  props: ["type","from","addressId"],
  data() {
    return {
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      searchResult: [],
      addressInfo: {}
    };
  },
  created() {},
  async mounted() {
    let _province_list = {};
    let _city_list = {};
    let _county_list = {};
    this.$cityTools.getLev1().forEach(p => {
      _province_list[p.id] = p.text;
      this.$cityTools.getLev2(p.id).forEach(c => {
        _city_list[c.id] = c.text;
        this.$cityTools.getLev3(c.id).forEach(q => {
          _county_list[q.id] = q.text;
        });
      });
    });
    this.areaList.province_list = _province_list;
    this.areaList.city_list = _city_list;
    this.areaList.county_list = _county_list;

    // this.from = this.from || ""; 
    if (this.type == "edit") {
      const { data: addressDetail } = await this.$api.address.getAddressDetail({
        params: { addressId: this.addressId }
      });
      console.log(addressDetail,'666666666666666666')
      let _areaCode = "";
      const province = this.$cityTools.getLev1();
      Object.entries(this.areaList.county_list).forEach(([id, text]) => {
        // 找出当前对应的区
        if (text == addressDetail.regionName) {
          // 找到区对应的几个省份
          const provinceIndex = province.findIndex(
            item => item.id.substr(0, 2) == id.substr(0, 2)
          );
          // 找到区对应的几个市区
          const cityItem = Object.entries(this.areaList.city_list).filter(
            ([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4)
          )[0];
          // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
          if (
            province[provinceIndex].text == addressDetail.provinceName &&
            cityItem[1] == addressDetail.cityName
          ) {
            _areaCode = id;
          }
        }
      });
      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.userPhone,
        province: addressDetail.provinceName,
        city: addressDetail.cityName,
        county: addressDetail.regionName,
        addressDetail: addressDetail.detailAddress,
        areaCode: _areaCode,
        isDefault: !!addressDetail.defaultFlag
      };
      console.log(this.addressInfo,'777')
    }
  },
  methods: {
    async onSave(content) {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0
      };
      if (this.type == "edit") {
        params["addressId"] = this.addressId;
      }
      const { message } =
        (await this.type) == "add"
          ? this.$api.address.addAddress({ data: params })
          : this.$api.address.editAddress({ data: params });
      this.$toast.success("保存成功");
      setTimeout(() => {
        // this.$router.push({ path: `address?from=${this.from}` });
        this.$router.push({
          name: "address",
          query: {
            from: this.from
          }
        });
      }, 1000);
    },
    async onDelete() {
      const { data } = await this.$api.address.deleteAddress(this.addressId);
      this.$toast.success("删除成功");
      setTimeout(() => {
        this.$router.push({
          name: "address"
        });
      }, 1000);
    }
  },
  components: {
    sHeader
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.address-edit {
  .edit-box {
    margin-top: 44px;
    .van-address-edit {
      .van-button--danger {
        background: @primary;
        border-color: @primary;
      }
      .van-switch--on {
        background: @primary;
      }
    }
  }
}
</style>