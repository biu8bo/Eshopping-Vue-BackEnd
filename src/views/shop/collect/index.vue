<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
    
      <el-button
        type="danger"
        class="filter-item"
        size="mini"
        icon="el-icon-refresh"
        @click="toQuery"
      >刷新</el-button>
    </div>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="data.collect.id" label="id" />
      <el-table-column prop="data.collect.uid" label="用户ID" />
      <el-table-column prop="user.nickname" label="用户名" />
      <el-table-column prop="data.product.id" label="商品ID" />
      <el-table-column prop="data.product.store_name" label="商品名称" />
      <el-table-column ref="table" prop="data.product.image" label="商品图片">
        <template slot-scope="scope">
          <a :href="scope.row.data.product.image" style="color: #42b983" target="_blank"><img :src="scope.row.data.product.image" alt="点击打开" class="el-avatar"></a>
        </template>
      </el-table-column>
      <el-table-column prop="user.phone" label="手机号码" />

      <el-table-column :show-overflow-tooltip="true" prop="data.collect.create_time" label="创建日期">
        <template slot-scope="scope">
          <span>{{ (scope.row.data.collect.create_time)|formatTime }}</span>
        </template>
      </el-table-column>
            <el-table-column label="状态" align="center">
        <template>
            <el-tag v-if="Type == 'collect'" type="warning" style="cursor: pointer">收藏</el-tag>
            <el-tag v-else style="cursor: pointer" type="danger">足迹</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          
            <el-tag v-if="scope.row.data.collect.is_del == false" style="cursor: pointer" :type="''">未删除</el-tag>
            <el-tag v-else style="cursor: pointer" :type=" 'info' ">已删除</el-tag>
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
import initData from '@/mixins/crud'
import { formatTime } from '@/utils/index'
export default {
  mixins: [initData],
  data() {
    return {
      Type: 'collect',
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  filters:{
      formatTime(data){
          return formatTime(new Date(data),'{y}-{m}-{d}')
      }
  },
  methods: {
    
    beforeInit() {
      this.url = 'api/getAllCollectInfo'
      this.params = { page: this.page, limit: this.size,  type: this.Type }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
    
      return true
    }
  }
}
</script>

<style scoped>

</style>
