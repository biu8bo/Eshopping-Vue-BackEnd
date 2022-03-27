<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="9falsefalsepx"
  >
    <el-form
      ref="form"
      :model="form"
      :inline="true"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="商品分类">
        <treeselect
          v-model="form.Category.id"
          :options="cates"
          style="width: 370px"
          placeholder="选择商品分类"
        />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.store_name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form.keyword" style="width: 500px" />
      </el-form-item>
      <el-form-item label="单位名">
        <el-input v-model="form.unit_name" style="width: 320px" />
      </el-form-item>
      <!-- <el-form-item label="产品条码">
        <el-input v-model="form.bar_code" style="width: 32falsepx;" />
      </el-form-item> -->
      <el-form-item label="商品图片">
        <MaterialList
          v-model="form.imageArr"
          style="width: 500px"
          type="image"
          :num="1"
          :width="150"
          :height="150"
        />
      </el-form-item>
      <el-form-item label="轮播图">
        <MaterialList
          v-model="form.slider_imageArr"
          style="width: 500px"
          type="image"
          :num="4"
          :width="150"
          :height="150"
        />
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input
          v-model="form.store_info"
          style="width: 500px"
          rows="5"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="产品描述">
        <editor v-model="form.description" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="市场价">
        <el-input v-model="form.ot_price" />
      </el-form-item>
      <el-form-item label="成本价">
        <el-input v-model="form.cost" />
      </el-form-item>
      <el-form-item label="邮费">
        <el-input v-model="form.postage" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" />
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="form.sales" />
      </el-form-item>
      <el-form-item label="库存" style="width: 900px">
        <el-input v-model="form.stock" />
      </el-form-item>
      <el-form-item label="热卖单品">
        <el-radio v-model="form.is_hot" :label="true">是</el-radio>
        <el-radio v-model="form.is_hot" :label="false" style="width: 200px"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="促销单品">
        <el-radio v-model="form.is_benefit" :label="true">是</el-radio>
        <el-radio v-model="form.is_benefit" :label="false" style="width: 200px"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="精品推荐">
        <el-radio v-model="form.is_best" :label="true">是</el-radio>
        <el-radio v-model="form.is_best" :label="false" style="width: 200px"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="首发新品">
        <el-radio v-model="form.is_new" :label="true">是</el-radio>
        <el-radio v-model="form.is_new" :label="false" style="width: 200px"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="是否包邮">
        <el-radio v-model="form.is_postage" :label="true">是</el-radio>
        <el-radio v-model="form.is_postage" :label="false" style="width: 200px"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="优品推荐">
        <el-radio v-model="form.is_good" :label="true">是</el-radio>
        <el-radio v-model="form.is_good" :label="false" style="width: 200px"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="获得积分">
        <el-input v-model="form.give_integral" />
      </el-form-item>
      <el-form-item label="虚拟销量">
        <el-input v-model="form.ficti" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { getCategory } from "@/api/category";
import { add, edit } from "@/api/product";
import editor from "../../components/Editor";
import picUpload from "@/components/pic-upload";
import mulpicUpload from "@/components/mul-pic-upload";
import Treeselect from "@riophae/vue-treeselect";
import MaterialList from "@/components/material";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { editor, picUpload, mulpicUpload, Treeselect, MaterialList },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      cates: [],
      form: {
        id: 0,
        mer_id: 0,
        image: "",
        slider_image: "",
        imageArr: [],
        slider_imageArr: [],
        store_name: "",
        store_info: "",
        keyword: "",
        bar_code: "",
        cate_id: 0,
        Category: { id: null },
        price: 0,
        vip_price: 0,
        ot_price: 0,
        postage: 0,
        unit_name: "",
        sort: 0,
        sales: 0,
        stock: 0,
        is_show: true,
        is_hot: false,
        is_benefit: false,
        is_best: false,
        is_new: false,
        description: "",
        addTime: "",
        is_postage: false,
        is_del: false,
        mer_use: 0,
        give_integral: 0,
        cost: 0,
        is_seckill: false,
        is_bargain: false,
        is_good: false,
        ficti: 0,
        browse: 0,
        code_path: "",
        soureLink: "",
      },
      rules: {},
    };
  },
  watch: {
    "form.imageArr": function (val) {
      if (val) {
        this.form.image = val.join(",");
      }
    },
    "form.slider_imageArr": function (val) {
      if (val) {
        this.form.slider_image = val.join(",");
      }
    },
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.loading = true;
      this.form.cate_id = this.form.Category.id;
      if (this.isAdd) {
        this.doAdd();
      } else this.doEdit();
    },
    doAdd() {
      add(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    doEdit() {
      edit(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        mer_id: false,
        image: "",
        slider_image: "",
        imageArr: [],
        slider_imageArr: [],
        store_name: "",
        store_info: "",
        keyword: "",
        bar_code: "",
        cate_id: true,
        Category: {},
        price: false,
        vip_price: false,
        ot_price: false,
        postage: false,
        unit_name: "",
        sort: false,
        sales: false,
        stock: false,
        is_show: true,
        is_hot: false,
        is_benefit: false,
        is_best: false,
        is_new: false,
        description: "",
        addTime: "",
        is_postage: false,
        is_del: false,
        mer_use: false,
        give_integral: false,
        cost: false,
        is_seckill: false,
        is_bargain: false,
        is_good: false,
        ficti: false,
        browse: false,
        code_path: "",
      };
    },
    getCategory() {
      getCategory({ enabled: true }).then((res) => {
        this.cates = [];
        res.Data.forEach((element) => {
          this.cates.push(element);
          element.categories.forEach((e) => {
            this.cates.push(e);
          });
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
