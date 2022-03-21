<template>
  <div class="app-container">

    <div>
       <el-button icon="el-icon-plus" @click="showAdd" type="primary" size="small">新增</el-button>
    </div>
    <!--表单组件-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeDialog"
      :visible.sync="show"
      :title="isEdit ? '编辑' : '添加'"
      width="500px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="分类名称">
          <el-input v-model="form.cate_name" style="width: 370px" />
        </el-form-item>
        <el-form-item label="分类图片">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :file-list="filelist"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.pic" :src="form.pic" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.is_show" style="width: 178px">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" style="width: 370px" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0" label="上级分类" prop="pid">
          <treeselect
            v-model="form.pid"
            :options="treeListData"
            style="width: 370px"
            placeholder="选择上级分类"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="false" type="primary" @click="submit"
          >确认
        </el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="loading"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :data="cateList"
      row-key="id"
      @select="selectChange"
      @select-all="selectAllChange"
      @selection-change="selectionChangeHandler"
    >
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column label="名称" prop="cate_name" />
      <el-table-column label="状态" align="center" prop="is_show">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.is_show === true" :type="''">显示</el-tag>
            <el-tag v-else :type="'info'">隐藏</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" sortable />
      <el-table-column
        v-permission="[
          'admin',
          'YXSTORECATEGORY_EDIT',
          'YXSTORECATEGORY_DELETE',
        ]"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="toEdit(scope.row)"
          />

          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            @confirm="doDelete(scope.row.id)"
            icon-color="red"
            :title="'确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！'"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getCategory,
  editCategory,
  delCategory,
  addCategory,
} from "@/api/category";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import picUpload from "@/components/pic-upload";
import MaterialList from "@/components/material";

export default {
  name: "Dept",
  components: {
    Treeselect,
    picUpload,
    MaterialList,
  },
  data() {
    return {
      picArr: [],
      depts: [],
      filelist: [],
      rules: {
        cateName: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      cateList: [],
      treeListData: [],
      show: false,
      form: {},
      loading: false,
      isEdit: false,
      permission: {
        add: ["admin", "YXSTORECATEGORY_CREATE"],
        edit: ["admin", "YXSTORECATEGORY_EDIT"],
        del: ["admin", "YXSTORECATEGORY_DELETE"],
      },
      enabledTypeOptions: [
        { key: "true", display_name: "正常" },
        { key: "false", display_name: "禁用" },
      ],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    checkboxT(row, rowIndex) {
      return row.id !== 1;
    },
    showAdd(){
      this.isEdit=false;
      this.form={pid:0};
      this.show=true;
      this.filelist =[{}]
    },
    //删除
    doDelete(id) {
      delCategory({
        id,
      }).then((e) => {
        this.getCategory();
      });
    },
    //上传成功后
    handleAvatarSuccess(res, file) {
      //更新图片列表
      this.filelist[0].url = res.Data;
      this.form.pic = res.Data;
      this.$forceUpdate()
    },
    //编辑
    toEdit(item) {
      this.form = item;

      this.isEdit=true;
      this.filelist.push({ name: "jpg", url: item.pic });
      this.show = true;
    },
    submit() {
      if (this.isEdit) {
        editCategory(this.form).then(e=>{
          this.getCategory();
          this.show=false;
          this.$message.success("保存成功")
        })
      }else{
        addCategory(this.form).then(e=>{
          this.getCategory();
           this.show=false;
          this.$message.success("保存成功")
        })
      }
    },
    //取消 关闭模态框
    cancel() {
      this.show = false;
      this.form = {};
    },
    closeDialog() {
      this.cancel();
    },
    selectChange() {},
    selectionChangeHandler() {},
    selectAllChange() {},

    getCategory() {
      getCategory().then((e) => {
        this.treeListData=[];
        this.cateList=[];
        e.Data.forEach((element) => {
          let item = element;
          item.children = [];
          element.categories.forEach((x) => {
            item.children.push(x);
          });
          this.cateList.push(item);
        });
        //创建数据框下拉列表
        this.treeListData.push({
          id: 0,
          children: this.cateList,
          label: "顶级分类",
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
