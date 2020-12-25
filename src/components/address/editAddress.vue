<template>
    <div class="editAddress-com" ref="editAddress">
        <h4 class="order-title text-center"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>编辑收货地址<span class="addAddress" @click="saveAddress">保存</span></h4>
        <div class="formBox" v-loading="loading">
            <div class="inputBox">
                <input class="txt" type="text" readonly onfocus="this.blur()" placeholder="所在地区" @click="showSelectBox" :value="addressVal">
            </div>
            <div class="inputBox">
                <input class="txt" type="text" @click="close" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" ref="area03" :value="addressDetail">
            </div>
            <div class="inputBox">
                <input class="txt" type="text" @click="close" placeholder="收货人" ref="usr" :value="name">
            </div>
            <div class="inputBox">
                <input class="txt" type="number" @click="close" placeholder="手机号码" ref="tel" :value="phoneVal" onkeyup="value=value.replace(/[^\d]/g,'')">
            </div>
        </div>
        <!-- 省市级三级联动 -->
        <choose-address class="selectArea" v-if="showSelectArea" @showSelectArea="close" @getUsrArea="showUsrArea"/>
    </div>
</template>

<script>
import chooseAddress from '@/components/address/chooseAddress';
import {editAddress,getAddress,createAddress,detail} from '@/api/api';
import {Debounce} from '@/assets/js/common'
import {getUsrInfo} from '@/assets/js/common'
export default {
    data() {
        return {
            showSelectArea:false,
            usrArea:{},
            name:'',
            phoneVal:'',
            province:'',
            city:'',
            district:'',
            addressDetail:'',
            addressVal:'',
            loading:true
        }
    },
    components:{
        chooseAddress
    },
    methods:{
        backPrePage(){
            history.back(-1)
        },
        showSelectBox(){
            this.showSelectArea=true
        },
        close(){
            this.showSelectArea=false
        },
        showUsrArea(val){
            this.usrArea=val
            this.province=val.province
            this.city=val.city
            this.district=val.district
            this.addressVal=val.province+' '+val.city+' '+val.district
        },
        saveAddress:Debounce(function(){
            let name=this.$refs.usr.value
            let phoneVal=this.$refs.tel.value
            let area01=this.province
            let area02=this.city+this.district
            let area03=this.$refs.area03.value
            let openId=localStorage.getItem('openId')
            // console.log(name,phoneVal,area01,area02,area03)
            if(name!=''&&phoneVal!=''&&area01!=''&&area02!=''&&area03!=''){
                if(phoneVal.length!=11){
                    this.$message({
                        message: '手机格式不正确',
                        type: 'error'
                    });
                }else{
                    createAddress({
                        'unionId':localStorage.getItem('unionid'),
                        wechatid:openId,
                        receivename:name,
                        receivephone:phoneVal,
                        receivearea01:area01,
                        receivearea02:area02,
                        receivearea03:area03,
                    }).then(res=>{
                        this.$message({
                            message: '地址添加成功',
                            type: 'success'
                        });
                        history.go(-1)
                    })
                }
            }else{
                 this.$message({
                    message: '请将收货信息补全',
                    type: 'error'
                });
            }
        })
    },
    created(){
        getUsrInfo('https%3a%2f%2fwww.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html%23%2feditAddress')
        console.log(this.$route.query.id)
        detail({
           id:this.$route.query.id
        }).then(res=>{
            console.log(res)
            this.loading=false
            // 0成功 1失败
            let code=res.code
            let receiver=res.data
            if(code===0){
                this.name=receiver.receivename
                this.phoneVal=receiver.receivephone
                this.province=receiver.receivearea01
                this.city=receiver.receivearea02
                this.addressDetail=receiver.receivearea03
                this.addressVal=this.province === undefined?'':this.province +' '+this.city=== undefined?'':this.city
            }else{}
        })
    },
    mounted(){
        this.$refs.editAddress.style.minHeight=(window.outerHeight-45)+'px';
    }
}
</script>

<style lang="scss">
    .el-message{
        min-width: 300px !important;
    }
    .editAddress-com{
        .order-title{
            height: 50px;
            line-height: 50px;
            color: #333;
            background-color: #f9f9f9;
            margin-top: 0;
            position: relative;
            .back{
                position: absolute;
                left: 15px;
            }
            .addAddress{
                position: absolute;
                right: 15px;
                font-size: 14px;
                color: orangered;
                font-weight: 500;
            }
        }
        .formBox{
            padding:0 0 15px 0;
            position: relative;
        }
        .txt{
            padding: 15px 10px;
            color: #666;
            width: 100%;
            border: none;
            outline: none;
            border-bottom: 1px solid #eee;
        }
        .selectArea{
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            z-index: 100;
        }
    }
</style>
