<template>
    <div class="chooseCourse-com">
        <h4 class="title">课程目录</h4>
        <div class="container">
            <ul class="courseList">
                <li @click="getCourseAddress(item.courseAddress,index,item.pattern)" :class="{'isActive':active===index}" v-for="(item,index) in list" :key="index"><span class="index">{{index+1}}.</span>{{item.courseName}}<span class="free" v-if="item.pattern==1">试看</span><span class="time">{{item.duration}}</span></li>
            </ul>
        </div>
        <div class="buyAbout">
            <div class="content">
                <!-- <p class="text-center title">购买须知</p> -->
                <ul>
                    <li>● 此课程一经购买成功，概不支持退款</li>
                    <li>● 购买后观看有效期为1年</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {getCourseDetail} from '@/api/api'
import Bus from '@/assets/js/Bus'
export default {
    data(){
        return{
            list:[],
            active:0
        }
    },
    methods:{
        getCourseAddress(url,index,pattern){
            let courseInfo={
                url,
                pattern
            }
            this.active=index
            // console.log(url)
            Bus.$emit("getSourse",courseInfo)
        },
        getList(){
            getCourseDetail({
                listId:localStorage.getItem('courseId')
            }).then(res=>{
                this.list=res.data.courseLists
                // console.log(res.data.courseLists)
            })
        }
    },
    mounted(){
        this.getList()
    }
}
</script>

<style lang="scss">
    .chooseCourse-com{
        .title{
            padding-left: 10px;
            color: #232323;
            font-weight: 600;
            font-size: 16px;
            height: 40px;
            line-height: 40px;
            position: relative;
            margin-top: 5px;
            margin-bottom: 0;
            &::before{
                content: "";
                display: block;
                position: absolute;
                left: 0;
                top: 12px;
                width: 3px;
                height: 16px;
                background-color: goldenrod
            }
        }
        .courseList{
            list-style: none;
            padding-left: 0;
            li{
                display: flex;
                width: 100%;
                // height: 40px;
                line-height: 1.5;
                padding: 15px 0;
                border-bottom: 1px solid #eee;
                color: #232323;
                font-size: 15px;
                padding-right: 60px;
                position: relative;
                .index{
                    margin-right: 5px;
                    color: goldenrod;
                    font-weight: 400;
                }
                .time{
                    position: absolute;
                    right: 0;
                    color: #ccc;
                }
            }
            .isActive{
                color: goldenrod;
            }
            .free{
                margin-left: 8px;
                background-color: goldenrod;
                color: #fff;
                border-radius: 4px;
                display: inline-block;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                padding: 0 8px;
                position: relative;
                top:0;
                flex:0 0 auto;
            }
        }

    }
</style>
