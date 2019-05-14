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
                <!-- <el-alert style="width:80%;margin:0 auto 20px;background-color:#fff;"
                    title="电子发票将会发送至该邮箱，请准确填写！"
                    type="info">
                </el-alert> -->
                <el-form-item label="发票类型" style="margin-bottom:15px;">
                    <el-select v-model="form.typeselect" placeholder="请选择发票类型">
                    <el-option label="咨询费" value="咨询费"></el-option>
                    <el-option label="会议费" value="会议费"></el-option>
                    <el-option label="会议服务费" value="会议服务费"></el-option>
                    </el-select>
                </el-form-item>
                <el-alert style="width:75%;margin:0 auto 20px;"
                    title="发票类型：暂时无法提供书籍类发票"
                    type="info">
                </el-alert>
                <el-form-item>
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {createInvoice} from '@/api/api'
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
                typeselect:'咨询费'
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
        onSubmit() {
            // console.log('submit!');
            this.$refs['form'].validate((val)=>{
                let userinvoicename=this.form.name
                let userinvoicenum=this.form.paragraph
                let userbillingtype=this.form.typeselect
                let usermail=this.form.email
                let username=this.form.uname
                let userordernum=this.form.orderNum
                let managemoney=this.form.price

                createInvoice({
                    userinvoicename:userinvoicename,
                    userinvoicenum:userinvoicenum,
                    userbillingtype:userbillingtype,
                    usermail:usermail,
                    username:username,
                    userordernum:userordernum,
                    managemoney:managemoney
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
                            message: '网络错误，请稍后重试',
                            type: 'error',
                            duration:1500
                        })
                    }
                })
            })
        }
    },
    mounted(){
        this.form.orderNum=localStorage.getItem('orderNo')
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
