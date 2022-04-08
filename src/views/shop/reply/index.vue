<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 新增 -->
      <el-button
        type="danger"
        class="filter-item"
        size="mini"
        icon="el-icon-refresh"
        @click="toQuery"
        >刷新</el-button
      >
    </div>
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%">
      <el-table-column prop="info.reply.id" label="ID" />
      <el-table-column prop="user.nickname" label="用户" />
      <el-table-column prop="info.product.store_name" label="商品信息" />
      <el-table-column prop="info.reply.product_score" label="商品分数">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.info.reply.product_score"
            disabled
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="info.reply.service_score" label="服务分数">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.info.reply.service_score"
            disabled
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="info.reply.comment" label="评论内容" />
      <el-table-column prop="" label="评论图片">
        <template slot-scope="scope">
          <div v-if="scope.row.info.reply.pics">
            <a
              v-for="(pic, index) in handlePic(scope.row.info.reply.pics)"
              :key="index"
              :href="pic"
              style="color: #42b983"
              target="_blank"
            >
              <img :src="pic" alt="点击打开" class="el-avatar" />
            </a>
          </div>
          <div v-else>无图</div>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="评论时间">
        <template slot-scope="scope">
          <span>{{
            formatTime(new Date(scope.row.info.reply.create_time))
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          checkPermission([
            'admin',
            'YXSTOREPRODUCTREPLY_ALL',
            'YXSTOREPRODUCTREPLY_EDIT',
            'YXSTOREPRODUCTREPLY_DELETE',
          ])
        "
        label="操作"
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            :ref="scope.row.info.reply.id"
            v-permission="[
              'admin',
              'YXSTOREPRODUCTREPLY_ALL',
              'YXSTOREPRODUCTREPLY_DELETE',
            ]"
            placement="top"
            width="180"
          >
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="$refs[scope.row.info.reply.id].doClose()"
                >取消</el-button
              >
              <el-button
                :loading="delLoading"
                type="primary"
                size="mini"
                @click="subDelete(scope.row.info.reply.id)"
                >确定</el-button
              >
            </div>
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/crud";
import { del } from "@/api/reply";
import eForm from "./form";
import { formatTime } from "@/utils/index";
export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    handlePic(pics) {
      return pics.split(",");
    },
    formatTime,
    checkPermission,
    beforeInit() {
      this.url = "api/productReply";
      const sort = "id,desc";
      this.params = { page: this.page, limit: this.size, sort: sort };
      return true;
    },
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then((res) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.dleChangePage();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500,
          });
        })
        .catch((err) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(data) {
      this.isAdd = false;
      const _this = this.$refs.form;
      _this.form = {
        id: data.id,
        uid: data.uid,
        oid: data.oid,
        unique: data.unique,
        productId: data.productId,
        replyType: data.replyType,
        productScore: data.productScore,
        serviceScore: data.serviceScore,
        comment: data.comment,
        pics: data.pics,
        addTime: data.addTime,
        merchantReplyContent: data.merchantReplyContent,
        merchantReplyTime: data.merchantReplyTime,
        isDel: data.isDel,
        isReply: data.isReply,
      };
      _this.dialog = true;
    },
  },
};
</script>

<style scoped>
</style>
