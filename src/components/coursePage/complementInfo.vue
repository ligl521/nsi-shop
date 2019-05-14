<template>
    <div class="complementInfo-com animated">
        <div class="infoBox">
            <h4 class="title text-center"><i class="el-icon-warning warning"></i>&nbsp;请补全信息以完成购买<span class="close el-icon-error" @click="hideBox"></span></h4>
            <!-- <div class="form text-center">
                <input type="text" class="txt" placeholder="姓名">
                <input type="text" class="txt" placeholder="公司">
                <input type="text" class="txt" placeholder="邮箱">
                <a href="javascript:;" class="btn btn-danger apply">提交</a>
            </div> -->
            <el-form class="text-center" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" @blur="checkEmail"></el-input>
                </el-form-item>
                <el-form-item label="公司" prop="campany">
                    <el-input v-model="ruleForm.campany"></el-input>
                </el-form-item>
                <p class="tips">{{tips}}</p>
                <el-button href="javascript:;" type="primary" class="apply" @click="toapply" icon="el-icon-check" round>提交</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import {complementInfo,checkEmailIsLogin} from '@/api/api'
export default {
    data() {
        return {
            tips:'',
            isShow:true,
            ruleForm: {
                name:'',
                campany:'',
                email:''
            },
            rules:{
                name:[
                    {required:true,message:'请输入姓名',tigger:'blur'}
                ],
                campany:[
                    {required:true,message:'请输入公司名称',tigger:'blur'}
                ],
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                    // {validator:checkEmail,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        checkEmail(){
            if(this.ruleForm.email!=''){
                checkEmailIsLogin({
                    UserMail: this.ruleForm.email
                }).then(res=>{
                    if(res.code===1){
                        this.tips="您的邮箱已注册，将为您绑定微信账号"
                    }else{
                        this.tips=""
                    }
                })
            }
        },
        hideBox(){
            this.isShow=false
            this.$emit('hideCom',this.isShow)
        },
        toapply(){
           this.$refs['ruleForm'].validate((val)=>{
               if(val){
                   let name=this.ruleForm.name
                   let campany=this.ruleForm.campany
                   let email=this.ruleForm.email
                   let openId=localStorage.getItem('openId')
                   localStorage.setItem('email',email)
                //    console.log(name,campany,email)
                 complementInfo({
                        username:email,
                        userTurename:name,
                        userOrganization:campany,
                        wechatid:openId,
                        'unionId':localStorage.getItem('unionid')
                    }).then(res=>{
                        if(res.code===0){
                            this.$message({
                                message: '信息提交成功',
                                type: 'success'
                            });
                        }
                        this.$router.push({name:'courseOrder'})
                    })
               }
           })
        },

    },
    mounted(){
        
    }
}
</script>

<style lang="scss">
    .complementInfo-com{
        position: fixed;
        z-index: 100;
        bottom: 8px;
        min-height: 320px;
        background-color: #FFF;
        width: 96%;
        left: 50%;
        margin-left: -48%;
        // border-top: 2px solid #e33626;
        box-shadow: 0 -3px 10px rgba(46, 46, 46, 0.2);
        padding:15px 20px 15px;
        border-radius: 10px;
        .title{
            font-size: 15px;
            font-weight: 600;
            color: #232323;
            position: relative;
            margin-top: 0;
            margin-bottom: 20px;
            .warning{
                color: goldenrod;
            }
        }
        .close{
            position: absolute;
            right: -8px;
            top: -5px;
            font-size: 20px;
            color: #242424;
        }
        .txt{
            display: block;
            border: none;
            border-bottom: 1px solid #ccc;
            width: 100%;
            height: 35px;
            line-height: 35px;
            margin: 15px 0;
            font-size: 16px;
            padding-left: 10px;
            outline: none;
        }
        .apply{
            // margin-top: 15px;
            margin: 0 auto;
            position: relative;
            transition: all .3s ease-in-out;
        }
        .tips{
            color: rgb(46, 184, 4);
            font-size: 12px;
            font-weight: 600;
        }
    }
</style>
