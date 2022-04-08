<template>
  <div class="app-container">
    <el-form>
      <el-form-item label-width="150px" label="轮播图管理">
        <MaterialList
          v-model="silderImg"
          style="display: inline-block"
          type="image"
          :num="5"
          :width="150"
          :height="150"
        />
        <el-button
          type="primary"
          style="margin-left: 15px"
          @click="onSaveBanner"
          >立即保存</el-button
        >
      </el-form-item>
      <el-form-item label="商城通知" label-width="150px">
        <el-input style="width:380px"  :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="notifyValue"></el-input>
        <el-button
          type="primary"
          style="margin-left: 15px"
          @click="onSaveNotify"
          >立即保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MaterialList from "@/components/material";
import { getBanner, saveBanner, saveNotify, getNotify } from "@/api/config";
export default {
  components: { MaterialList },
  data() {
    return {
      //轮播图
      silderImg: [],
      notifyValue: "",
    };
  },
  created() {
    this.getBanner();
    this.getNotify()
  },
  methods: {
    onSaveNotify() {
      saveNotify({tips:this.notifyValue}).then((e) => {
        this.$notify({
          title: "保存成功",
          type: "success",
          duration: 2500,
        });
      });
    },
    getNotify() {
      getNotify().then((e) => {
        this.notifyValue = e.Data.value;
      });
    },
    getBanner() {
      getBanner().then((e) => {
        e.Data.forEach((element) => {
          this.silderImg.push(element.pic);
        });
      });
    },
    onSaveBanner() {
      saveBanner(this.silderImg).then((e) => {
        this.$notify({
          title: "保存成功",
          type: "success",
          duration: 2500,
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  /deep/ .el-form-item__label {
    font-size: 15px;
  }
  /deep/.el-form-item__content {
    display: flex;
    align-items: center;
  }
}
</style>