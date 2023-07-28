<template>
    <div class="contentBox">
        <div class="infoBox flex-d al-center">
            <div class="headPortrait" >
                 <img :src="headimg">                      
            </div>
            <div class="name">{{tea.name}}老师</div>
            <div class="flex al-center m-14">
                <span>{{area}}</span>
                    <div class="line" v-if="isShowEditor"></div>
                    <span v-if="isShowEditor">{{ tea.km}}老师</span>
            </div>
            <div class="m-14">工作单位：<span>{{worknam}}</span></div>
            <div class="m-14">编制单位：<span>{{organizat}}</span></div>
            <div class="goUser cur-p" @click="goUser">进入个人中心</div>
        </div>
        <div class="myFunOpt">
            <div class="funTitle flex al-center ju-between">
                <div>我的待办</div>
                <div class="goDispose cur-p" @click="GO">去处理</div>
            </div>
            <div>
                <div class="funItem flex al-center" v-for="item in list" :key="item.id">
                    <div class="flex-d al-center itemName ">
                        {{ item.name }}
                        <span class="itemMun">{{ item.mun }}</span>
                    </div>
                    <div class="My-list">
                        <img :src="item.Url" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Result } from 'postcss';
import { useRouter } from 'vue-router'
import {queryUserElseInfo} from '@/api/personal'
import Login from '@/views/login.vue';
import ImgBoy from "@/assets/Cut-diagram/male.png"
import ImgGirl from "@/assets/Cut-diagram/female.png"

const props = defineProps({
    mynums: Object
})

const router = useRouter()
const list = ref([])
const res = ref({})
const tea = ref({})
const ret = ref({})
const teachID = ref()
const isShowEditor =ref(false)
const goUser = () => {
    router.push('/personal')
}
const GO = () => {
    router.push('/backlogList')
}
watch(() => props.mynums, () => {
    list.value = [{
        name: '我发起的',
        mun: props.mynums.initiated,
        Url:require('../assets/Cut-diagram/Initiatedit.png')
    },
    {
        name: '我未处理',
        mun: props.mynums.untreated,
        Url:require('../assets/Cut-diagram/Ihaveprocessed.png')
    },
    {
        name: '我已处理',
        mun: props.mynums.handled,
        Url:require('../assets/Cut-diagram/Ihaventprocesdityet.png')
    },
    ]
})
onMounted(() => {
    // queryUserInfo()
    // getUserAuthorizedStrength()
    // realAvatar()
    queryUsersInfo()
});
let req = ref()
let img = ref()
const headimg = ref()
const area = ref('暂无区域')
const worknam = ref('暂无工作单位')
const organizat = ref('暂无编制单位')
//查询用户基本信息之个人信息
// const queryUserInfo = async () => {
//     req = JSON.parse(localStorage.getItem('userInfo'))
//     teachID.value = req.id
//     const { code, msg, result } = await queryUserPersonalInfo({teacherId: teachID.value})
//     res.value = result
//     if(code == 0 && result){
//         if(result.headImg != null){
//             headimg.value = result.headImg
//         }else{
//         const sex = req?.staffModel?.sex || '男'
//         headimg.value=  sex == '男'? ImgBoy :ImgGirl   
//         }
//     }else{
//         console.log(msg);
//     }
// }

// 查询用户基本信息之非编信息
// const getUserAuthorizedStrength = async () => {
//     const {code,msg,result} = await queryUserAuthorizedStrengthInfo({teacherId: teachID.value});
//     if (code == 0 && result) {
//         ret.value = result
//         console.log(ret.value,'result');
//     }else{
//         console.log(msg);
//     }
// };


//根据teacherId查询简介信息
const  queryUsersInfo =  async () =>{
    req = JSON.parse(localStorage.getItem('userInfo'))
    // qqq = JSON.parse()
    // console.log(req,'本地');
    teachID.value = req.id
    const { code, msg, result } = await queryUserElseInfo({teacherId:teachID.value})
    if(code == 0 && result){
        tea.value = result
        tea.value.km = result.courses ? result.courses[0] :''
        console.log(result);
        if(result.headImg != null){
            headimg.value = result.headImg
        }else{
        const sex = tea.value.sex || '男'
        headimg.value = sex == '男'?  ImgBoy :ImgGirl  
        }
        if(result.birthplaceCity != null){
            // console.log(result.birthplaceCity);
            area.value = result.birthplaceCity  
        }else{
            console.log('为空');
        }if(result.courses != null){
            isShowEditor= true
        }
        if(result.workName != null){
            // console.log('工作单位',result.workName );
            worknam.value = result.workName
        }if(result.organizationUnit != null){
            // console.log('编制单位',result.organizationUnit);
            organizat.value = result.organizationUnit
        }
    }else{
        console.log(msg);
    }
}
</script>



<style lang="less" scoped>
.contentBox {
    margin-left: 16px;
    width: 390px;
}

.infoBox {
    width: 100%;
    height: 396px;
    background: #ffffff;
    border-radius: 8px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    color: #999999;

    .headPortrait {
        width: 144px;
        height: 144px;
        margin-top: 36px;
img{
    width: 150px;
    border-radius: 50%;
}
    }

    .line {
        width: 1px;
        height: 16px;
        background: #999999;
        margin: 0 6px;
        margin-top: 2px;
    }

    .name {
        margin-top: 10px;
        font-family: SourceHanSansCN-Bold;
        font-size: 22px;
        color: #333333;
        font-weight: bold;
    }

    .m-14 {
        margin-top: 10px;
    }

    .goUser {
        margin-top: 28px;
        font-size: 16px;
        color: #007aff;
        font-size: 16px;
    }
}

.myFunOpt {
    margin-top: 24px;
    height: 499px;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    padding: 0 23px 0 30px;

    .funTitle {
        margin-top: 28px;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
    }

    .goDispose {
        font-size: 16px;
        color: #999999;
        font-weight: normal;
    }

    .funItem {
        margin-top: 24px;
        width: 336px;
        height: 115px;
        background-color: #f2f3fb;
        border-radius: 15px;
    }

    .itemName {
        margin-left: 50px;
        font-size: 20px;
        color: #01246a;
    }

    .itemMun {
        font-weight: bold;
        font-size: 36px;
    }
    .My-list{
        margin-top: 25px;
        margin-left: 68px;
    }
}
</style>