<template>
    <div class="invoice-page" ref="bg">
        <router-link tag="h4" to="/orderState/all" class="text-center myOrder"><span class="iconfont icon-zuojiantou"></span>申请发票</router-link>
        <div class="form">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="订单编号">
                    <el-input v-model="form.orderNum" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="实付金额">
                    <el-input v-model="form.price" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发票类型">
                    <el-input v-model="form.typeselect" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发票抬头" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="企业税号" prop="paragraph">
                    <el-input v-model="form.paragraph"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="uname">
                    <el-input v-model="form.uname"></el-input>
                </el-form-item>
                <el-form-item label="接收邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="发票类型" style="margin-bottom:15px;">
                    <el-select v-model="form.typeselect" placeholder="请选择发票类型">
                    <el-option label="印刷品" value="印刷品"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-alert style="width:80%;margin:0 auto 20px;background-color:#fff;"
                    title="电子发票将会发送至该邮箱，请准确填写！"
                    type="info">
                </el-alert> -->
                <el-form-item>
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit('form')">提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {createInvoice,getCheckInvoice} from '@/api/api'
export default {
    data() {
        return {
            orderNum:'',
            price:'',
            form: {
                orderNum: '',
                price:'',
                name: '',
                uname:'',
                email:'',
                paragraph: '',
                typeselect:'印刷品'
            },
            rules:{
                uname:[
                    {required:true,message:'请输入姓名',tigger:'blur'}
                ],
                name:[
                    {required:true,message:'请输入抬头',tigger:'blur'}
                ],
                paragraph:[
                    {required:true,message:'请输入企业税号',tigger:'blur'}
                ],
                email:[
                    { required: true, message: '电子发票将会发送至该邮箱，请准确填写！', trigger: 'blur' },
                    { type: 'email', message: '电子发票将会发送至该邮箱，请准确填写！', trigger: ['blur', 'change'] },
                ]
            }
        }
    },
    methods:{
        cancel(){
            history.back()
        },
        onSubmit(form) {
            this.$refs[form].validate((val)=>{
              if(val){
                let userinvoicename=this.form.name
                let userinvoicenum=this.form.paragraph
                let userbillingtype=this.form.typeselect
                let usermail=this.form.email
                let username=this.form.uname
                let userordernum=this.form.orderNum
                let managemoney=this.form.price
                createInvoice({
                    userInvoiceName:userinvoicename,
                    userInvoiceNum:userinvoicenum,
                    userBillingType:userbillingtype,
                    usermail:usermail,
                    username:username,
                    userOrderNum:userordernum,
                    manageMoney:managemoney,
                    invoiceType:1,
                    wechatId:localStorage.getItem('openId'),
                }).then(res=>{
                    // console.log(res.data)
                    if(res.code==0){
                        this.$message({
                            message: '申请成功，一个工作日电子发票将发送至您的邮箱，请注意查收',
                            type: 'success'
                        })
                        history.go(-1)
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration:1500
                        })
                    }
                })
              }else{
                alert("请填写完整表单！！");
                return false;
              }
            })
        }
    },
    mounted(){
      this.form.orderNum=localStorage.getItem('orderNo')
        getCheckInvoice({
          orderNo:this.form.orderNum
        }).then(res => {
          if(res.code == "1"){
            this.$message({
              message: '发票已提交申请,请耐心等候',
              type: 'error',
              duration:3000
            })
            this.$router.push('/orderState/confirm');
          }
          console.log(res)
        })
        this.form.price=localStorage.getItem('total_price')
        this.$refs.bg.style.minHeight=(window.innerHeight-60)+"px"
    }
}
</script>

<style lang="scss">
    .invoice-page{
        background-color: #f7f7f7;
        .myOrder{
            position: relative;
            font-size: 17px;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #eee;
            margin-bottom: 0;
            padding-bottom: 10px;
            margin-top: 0;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .form{
            padding: 10px;
            padding-right: 20px;
            padding-top: 20px;
            background-color: #fff;
        }
    }
</style>
