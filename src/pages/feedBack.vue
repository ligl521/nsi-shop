<template>
    <div class="feedBack-com" ref="bg">
        <router-link tag="h4" to="/mine" class="text-center myOrder"><span class="iconfont icon-zuojiantou"></span>反馈</router-link>
        <div class="container-fluid">
            <div class="formContent">
                <!-- <h5 class="question">您在浏览网页时遇到什么问题？ （可多选）</h5>
                <el-checkbox-group @change="getChecked" v-model="checkList">
                    <el-checkbox class="checkBox" label="性能不好,网页卡慢"></el-checkbox>
                    <el-checkbox class="checkBox" label="功能找不到/功能不好用"></el-checkbox>
                    <el-checkbox class="checkBox" label="网页在浏览器中显示错乱"></el-checkbox>
                    <el-checkbox class="checkBox" label="搜索数据不正确"></el-checkbox>
                </el-checkbox-group> -->
                <h5 class="question" style="margin-top:0">您有什么建议？（建议说出具体的问题所在）</h5>
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea1"
                    rows="4">
                </el-input>
                <h5 class="question" style="margin-top:15px;">请留下您的联系方式，我们将会及时通知您问题处理的进展</h5>
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="textarea2">
                </el-input>
            </div>
            <div class="btnContent text-center">
                <a @click="sendFeedback" href="javascript:;" class="btn btn-default">立即发送</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return {
        checkList: [],
        textarea:'国际教育研究院',
        textarea1: '',
        textarea2:'',
        sendTxt:''
      };
    },
    methods:{
        getChecked(){
            // console.log(this.checkList)
            this.textarea=''
            for(let i=0;i<this.checkList.length;i++){
                this.textarea+=this.checkList[i]+';'
            }
        },
        sendFeedback(){
            this.sendTxt=this.textarea+this.textarea1
            const sendData=new URLSearchParams()
            sendData.append('UserName','13546323367@163.com')
            sendData.append('Content',this.sendTxt)
            sendData.append('Contact',this.textarea2)
            this.axios({
                method:'post',
                data:sendData,
                url:'/user/feedback.do'
            }).then((res)=>{
                if(res.data.msg=='反馈成功'){
                    this.$message({
                        message: '反馈成功',
                        type: 'success'
                    });
                    history.go(-1)
                }
            })
        }
    },
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+"px";
    }
}
</script>

<style lang="scss">
    .el-message {
        min-width: 300px !important;
    }
    .feedBack-com{
        background-color: #f7f7f7;
        .myOrder{
            position: relative;
            font-size: 17px;
            height: 35px;
            line-height: 27px;
            border-bottom: 1px solid #eee;
            background-color: #fff;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .formContent{
            margin-top: 10px;
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            .question{
                font-size: 14px;
                font-weight: 500;
                margin-top: 0;
                line-height: 1.5;
            }
            .checkBox{
                display: block;
                margin-left: 0;
                &:last-of-type{
                    margin-bottom: 0;
                }
            }
        }
        .btnContent{
           margin-top: 15px;
        }
    }
</style>
