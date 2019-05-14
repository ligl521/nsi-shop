<template>
    <div class="courseInfo-com">
        <div class="CourseDetail">
            <p class="courseDesc"><div class="content" v-html="CourseDetail.listDescription"></div></p>
            <div class="more">
                <p class="moreCourse" @click="moreCourse()">查看课程目录<span class="iconfont icon-gengduo"></span></p>
            </div>
        </div>
        <service-detail></service-detail>
    </div>
</template>

<script>
import serviceDetail from '../../pages/serviceDetail'
import {getFcourseDetail} from '@/api/api'
export default {
    components:{
        serviceDetail
    },
    data() {
        return {
            CourseDetail:{},
        }
    },
    methods:{
        courseDetail(){
            getFcourseDetail({
                'listId':localStorage.getItem('courseId')
            }).then((res)=>{
                this.CourseDetail=res.data
            })
        },
        moreCourse(){
            this.$router.push({path:'/detailCourse/chooseCourse/'+localStorage.getItem('courseId')})
        }
    },
    created(){
        this.courseDetail()
    }
}
</script>

<style lang="scss">
.CourseDetail{
    .courseDesc{
        font-size: 20px;
        padding: 0 15px;
        span{
            display: inline-block;
            text-indent: 25px;
            font-size: 14px;
        }
    }
    .more{
        max-height:50px;
        min-height:50px;
        .moreCourse{
            color: #777;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f1f1f1;
            padding: 5px;
            border-radius: 5px;
            width: 90%;
            margin: 0 auto;
        }
    }
    .content{
        p{
            // text-align: center !important;
            img{
                display: inline-block !important;
                max-width: 100%;
                height: auto;
            }
        }
    }
}
</style>
