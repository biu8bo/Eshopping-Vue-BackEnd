<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
      <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
        <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >新增</el-button>
        <el-button
          type="danger"
          class="filter-item"
          size="mini"
          icon="el-icon-refresh"
          @click="toQuery"
        >刷新</el-button>
      </div>
    </div>
    <!--表单组件-->
    <eForm ref="form" :isAdd="isAdd" />
    <eAttr ref="form2" :isAttr="isAttr" />
    <killForm ref="form4" :isAdd="isAdd" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="Product.id" label="商品id" />
      <el-table-column ref="table" prop="Product.image" label="商品图片">
        <template slot-scope="scope">
          <a :href="scope.row.Product.image" style="color: #42b983" target="_blank"><img :src="scope.row.Product.image" alt="点击打开" class="el-avatar"></a>
        </template>
      </el-table-column>
      <el-table-column prop="Product.store_name" label="商品名称" />
      <el-table-column prop="Category.cate_name" label="分类名称" />
      <el-table-column prop="Product.price" label="商品价格" />
      <el-table-column prop="Product.sales" label="销量" />
      <el-table-column prop="Product.stock" label="库存" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div @click="onSale(scope.row.Product.id,scope.row.Product.is_show)">
            <el-tag v-if="scope.row.Product.is_show === true" style="cursor: pointer" :type="''">已上架</el-tag>
            <el-tag v-else style="cursor: pointer" :type=" 'info' ">已下架</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="205px" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="danger" size="mini" @click="attr(scope.row)">规格属性</el-button>
          <el-dropdown size="mini" split-button type="primary" trigger="click">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="edit(scope.row)"
                >编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-popover
                  :ref="scope.row.Product.id"
                  placement="top"
                  width="180"
                >
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.Product.id].doClose()">取消</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.Product.id)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </el-popover>
              </el-dropdown-item>

              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="primary"
                  @click="editD(scope.row)"
                >开启秒杀</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/crud'
import { del, onsale } from '@/api/product'
import eForm from './form'
import eAttr from './attr'
import killForm from '@/views/activity/seckill/form'

export default {
  components: { eForm, eAttr, killForm },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      visible: false,
      queryTypeOptions: [
        { key: 'store_name', display_name: '商品名称' }
      ],
      isAttr: false
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = 'api/getAllProduct'
      this.params = { page: this.page, limit: this.size,is_show:true}
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del({id}).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    onSale(id, status) {
      this.$confirm(`确定进行[${status ? '下架' : '上架'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          onsale({id ,status: !status }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.init()
              }
            })
          })
        })
        .catch(() => { })
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
      this.$refs.form.getCategory()
    },
    edit(TData) {
      let data = TData.Product
      this.isAdd = false
      const _this = this.$refs.form
      _this.getCategory()
      _this.form = {
        id: data.id,
        mer_id: data.mer_id,
        image: data.image,
        slider_image: data.slider_image,
        imageArr: data.image.split(','),
        slider_imageArr: data.slider_image.split(','),
        store_name: data.store_name,
        store_info: data.store_info,
        keyword: data.keyword,
        bar_code: data.bar_code,
        Category: {id:TData.Category.id}|| {id:null},
        price: data.price,
        vip_price: data.vip_price,
        ot_price: data.ot_price,
        postage: data.postage,
        unit_name: data.unit_name,
        sort: data.sort,
        sales: data.sales,
        stock: data.stock,
        is_show: data.is_show,
        is_hot: data.is_hot,
        is_benefit: data.is_benefit,
        is_best: data.is_best,
        is_new: data.is_new,
        description: data.description,
        addTime: data.addTime,
        is_postage: data.is_postage,
        is_del: data.is_del,
        mer_use: data.mer_use,
        give_integral: data.give_integral,
        cost: data.cost,
        is_seckill: data.is_seckill,
        is_bargain: data.is_bargain,
        is_good: data.is_good,
        ficti: data.ficti,
        browse: data.browse,
        code_path: data.code_path,
        soure_link: data.soure_link
      }
      _this.dialog = true
    },
    editD(TData) {
      let data = TData.Product
      this.isAdd = false
      const _this = this.$refs.form4
      _this.form = {
        productId: data.id,
        mer_id: data.mer_id,
        image: data.image,
        images: data.slider_image,
        imageArr: data.slider_image.split(','),
        slider_imageArr: data.slider_image.split(','),
        title: data.store_name,
        info: data.store_info,
        postage: data.postage,
        unit_name: data.unit_name,
        sort: data.sort,
        sales: data.sales,
        stock: data.stock,
        is_show: data.is_show,
        status: 1,
        is_hot: data.is_hot,
        description: data.description,
        is_postage: data.is_postage,
        people: 0,
        price: 0.01,
        effectiveTime: 24,
        ot_price: data.ot_price,
        cost: data.cost,
        num: 1,
        give_integral: 0,
        is_del: 0,
        browse: 0
      }
      _this.dialog = true
    },
    attr(TData) {
    let data = TData.Product
      this.isAttr = false
      const _this = this.$refs.form2
      _this.form = {
        id: data.id,
        mer_id: data.mer_id,
        image: data.image,
        slider_image: data.slider_image,
        store_name: data.store_name,
        store_info: data.store_info,
        keyword: data.keyword,
        bar_code: data.bar_code,
        storeCategory: data.storeCategory,
        price: data.price,
        vip_price: data.vip_price,
        ot_price: data.ot_price,
        postage: data.postage,
        unit_name: data.unit_name,
        sort: data.sort,
        sales: data.sales,
        stock: data.stock,
        is_show: data.is_show,
        is_hot: data.is_hot,
        is_benefit: data.is_benefit,
        is_best: data.is_best,
        is_new: data.is_new,
        description: data.description,
        add_time: data.add_time,
        is_postage: data.is_postage,
        is_del: data.is_del,
        mer_use: data.mer_use,
        give_integral: data.give_integral,
        cost: data.cost,
        is_seckill: data.is_seckill,
        is_bargain: data.is_bargain,
        is_good: data.is_good,
        ficti: data.ficti,
        browse: data.browse,
        code_path: data.code_path,
        soure_link: data.soure_link
      }
      _this.dialog = true
      this.$refs.form2.getAttrs(data.id)
    }
  }
}
</script>

<style scoped>

</style>
