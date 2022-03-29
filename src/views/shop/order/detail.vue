<template>
  <el-dialog style="margin-top: -10vh;" :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增' : '订单详情'" width="700px">
    <el-card>
      <div slot="header">
        <span>收货信息</span>
      </div>
      <div class="text item">用户昵称:{{ form.nickname }}</div>
      <div class="text item">收货人: {{ form.real_name }}</div>
      <div class="text item">联系电话: {{ form.user_phone }}</div>
      <div class="text item">收货地址: {{ form.user_address }}</div>
    </el-card>
    <el-card>
      <div slot="header">
        <span>订单信息</span>
      </div>
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="text item">订单编号: {{ form.order_id }}</div>
          <div class="text item">商品总数: {{ form.total_num }}</div>
          <div class="text item">支付邮费: {{ form.total_postage }}</div>
          <div class="text item">实际支付: {{ form.pay_price }}</div>
          <div class="text item">支付方式: 余额</div>
        </el-col>
        <el-col :span="12">
          <div class="text item">订单状态: {{ form.statusInfo }}</div>
          <div class="text item">商品总价: {{ form.total_price }}</div>
          <div class="text item">用户备注: {{ form.mark }}</div>
          <div class="text item">创建时间: {{ parseTime(form.create_time) }}</div>
          <div class="text item">支付时间: {{ parseTime(form.pay_time) }}</div>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header">
        <span>物流信息</span>
      </div>
      <div class="text item">快递公司:{{ form.delivery_name }}</div>
      <div class="text item">快递单号:{{ form.delivery_id }}</div>
      <div style="margin-top: 20px">
      <el-timeline v-if="form.delivery_id && expressInfo.length > 0">
        <el-timeline-item
          v-for="(obj, index) in expressInfo"
          :key="index"
          :timestamp="obj.acceptTime"
          >
          {{obj.acceptStation}}
        </el-timeline-item>
      </el-timeline>
      <el-timeline :reverse="false" v-else>
        <el-timeline-item>
          暂无物流信息
        </el-timeline-item>
      </el-timeline>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <span>备注信息</span>
      </div>
      <div class="text item">{{ form.remark }}</div>
    </el-card>
  </el-dialog>
</template>

<script>
import { add, edit, express } from '@/api/order'
import { parseTime } from '@/utils/index'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false, expressInfo: [],
      form: {
        id: '',
        orderId: '',
        uid: '',
        realName: '',
        userPhone: '',
        userAddress: '',
        cartId: '',
        freightPrice: '',
        totalNum: '',
        totalPrice: '',
        totalPostage: '',
        payPrice: '',
        payPostage: '',
        deductionPrice: '',
        couponId: '',
        couponPrice: '',
        paid: '',
        payTime: '',
        payType: '',
        addTime: '',
        status: '',
        refundStatus: '',
        refundReasonWapImg: '',
        refundReasonWapExplain: '',
        refundReasonTime: '',
        refundReasonWap: '',
        refundReason: '',
        refundPrice: '',
        deliveryName: '',
        deliverySn: '',
        deliveryType: '',
        deliveryId: '',
        gainIntegral: '',
        useIntegral: '',
        backIntegral: '',
        mark: '',
        isDel: '',
        unique: '',
        remark: '',
        merId: '',
        isMerCheck: '',
        combinationId: '',
        pinkId: '',
        cost: '',
        seckillId: '',
        bargainId: '',
        verifyCode: '',
        storeId: '',
        shippingType: '',
        isChannel: '',
        isRemind: '',
        isSystemDel: ''
      },
      rules: {
        unique: [
          { required: true, message: 'please enter', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    parseTime,
    cancel() {
      this.dialog = false
    },
    express() {
      let params ={
        "orderCode": this.form.id,
        "shipperCode": this.form.deliverySn,
        "logisticCode": this.form.deliveryId
      }

      express(params).then(res=>{

        console.log(res)
        this.expressInfo = res.Traces

      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })

    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        orderId: '',
        uid: '',
        realName: '',
        userPhone: '',
        userAddress: '',
        cartId: '',
        freightPrice: '',
        totalNum: '',
        totalPrice: '',
        totalPostage: '',
        payPrice: '',
        payPostage: '',
        deductionPrice: '',
        couponId: '',
        couponPrice: '',
        paid: '',
        payTime: '',
        payType: '',
        addTime: '',
        status: '',
        refundStatus: '',
        refundReasonWapImg: '',
        refundReasonWapExplain: '',
        refundReasonTime: '',
        refundReasonWap: '',
        refundReason: '',
        refundPrice: '',
        deliveryName: '',
        deliveryType: '',
        deliveryId: '',
        gainIntegral: '',
        useIntegral: '',
        backIntegral: '',
        mark: '',
        isDel: '',
        unique: '',
        remark: '',
        merId: '',
        isMerCheck: '',
        combinationId: '',
        pinkId: '',
        cost: '',
        seckillId: '',
        bargainId: '',
        verifyCode: '',
        storeId: '',
        shippingType: '',
        isChannel: '',
        isRemind: '',
        isSystemDel: ''
      }
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 12px;
  }

  .item {
    padding: 6px 0;
  }

</style>
