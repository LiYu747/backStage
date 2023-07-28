<template>
    <div class="notice-title">
        <div class="notice-one">公告栏详情</div>
    </div>
    <div class="contents">
        <div class="box">
            <!-- <span class="goon"  @click="goback"><img src="../../../assets/Cut-diagram/goon.png" alt=""></span> -->
            <span class="goon"  @click="goback"><img :src="GoBack" alt=""></span>
        </div>
            <div class="head-title">
                <h1 class="My-title">{{ detailsTitle }}</h1>        
            </div>
            <div class="real">
                <div class="My-date"><span>{{detailsTime}}</span> <span></span></div>
            </div>
            <!-- <p class="content">{{ detailscontent }}</p> -->
            <div class="content" v-html="detailscontent"></div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import {findById } from '@/api/project';
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import GoBack from '@/assets/Cut-diagram/goon.png'
const route = useRoute()
onMounted(()=>{
    const id = route.query.item;
    singleID(id)
})

const detailsTitle = ref('')    //标题
const detailsTime = ref('')     //日期
const detailscontent = ref('')  //内容

//把时间戳转化成年月日拼接
const transitionChinaDate = (val) => {
    const date = new Date(val)
    const o = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1, 
        D: date.getDate(), 
    }
    let str = o.Y + '-' + o.M + '-' + o.D
    return str
}

// 通过id查询公告
const singleID = async (id) =>{
    const params ={id:id}
    const {code, msg,result} = await findById(params)
    if(code ==0 && result){
        // console.log(msg,result);
    }else{
        console.log(msg);
    }
   detailsTitle.value = result.headline
   detailsTime.value = transitionChinaDate(result.startTime)
   detailscontent.value = result.subject
//    newImg.value = result.imgUrl
}



const goback = () =>{
    window.history.go(-1);
}
</script>



<style lang="less" scoped>
.notice-title {
    position: relative;
    height: 80px;
    // background-color: rgb(242, 242, 242);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    ::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
        border-bottom: 1px solid rgb(215, 215, 215);
    }

    .notice-one {

        margin-left: 40px;
        font-weight: bold;
        font-family: SourceHanSansCN-Bold;
        font-size: 20px;
        color: #333333;
    }
    
    .notice-tow {
        width: 80px;
        margin-right: 40px;
        .el-button {
            width: 100%;
            color: #fff;
        }
    }
}
.btn{
    width: 30px;
    height: 30px;
    background: #fff;
    border-color: #fff;
}
.contents{
    background-color: #ffffff;
}
.box{
    position: relative;

    .goon{
    position: absolute;
    top: 10px;
    left: 40px;
    cursor:pointer;
    z-index: 10;
    img{
        width: 35px;
    }

}
}

.head-title{
    position: relative;
    width: 100%;
    // // 多行文本超出隐藏
    overflow:hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;

  .My-title{
    text-align: center;
    // word-break: break-all;
    margin:20px;
    width: 1520px;
    height: 50px;
    margin-left: 80px;
  }
  ::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
        border-bottom: 1px solid rgb(215, 215, 215);
    }
}
.real{
    margin: 20px;
    display: flex;
    justify-content: center;
}
.content{
    margin: auto;
    width: 95%;
    height: 500px;
    word-break: break-all; 
    overflow: auto;
    }    
</style>