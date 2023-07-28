<template>
    <div class="notice-title">
        <div class="notice-one">{{ title }}</div>
    </div>
    <div class="container">
        <div class="title"><span class="certainly">*</span>标题 &nbsp;<el-input v-model="titleipt" placeholder="请输入标题" style="width: 320px;"></el-input></div>
        <div class="time-block">
            <div class="block"><span class="certainly">*</span>有效期&nbsp;
                <el-date-picker @change="endtime=''" :disabled-date="disablstDate" v-model="starttime" type="date" placeholder="选择日期" /> 
                &nbsp;~&nbsp;
                <el-date-picker :disabled-date="disabledDate" v-model="endtime" type="date" placeholder="选择日期" />
            </div>
            <div class="Serial">
                <span class="certainly">*</span>序号 <el-input v-model="numbeript" placeholder="" style="width: 50px;"></el-input>
            </div>          
        </div>
        <div class="Complex" v-if="isShowEditor" >
            <span class="certainly">*</span>正文<Editor :echoData="echoData" :textimage='textimage' @userparat="userparat" />
        </div>
        <div class="notice-tow"><el-button size="large" style="width: 90px;" @click="submit">{{ or }}</el-button></div>
    </div>
</template>
<script setup>
import { projectAdd, projectModify, findById} from '@/api/project'; 
import { useRoute, useRouter } from 'vue-router';
import { paratextStore } from '@/store/paratext'
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import Editor from './editor.vue';
const storetext = paratextStore();
const { userparatext } = storeToRefs(storetext)
const route = useRoute()
const router = useRouter()  

const titleipt = ref('')     //标题
const starttime = ref()      //开始时间  
const endtime = ref()        //结束时间
const numbeript = ref('')    //序号
const contEditor = ref('')   //主题内容   
const textimage = ref()      //富文本图片上传  
const echoData = ref('')     //回显的内容

const title = ref('')
const or = ref('')

const disablstDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}

const disabledDate = (time) => {
        return time.getTime() < transitionJab(starttime.value) 
}

const isShowEditor = computed(()=>{
    return echoData.value || route.query.type === '新增'
})


onMounted(() => {
    const id = route.query.item
    if (route.query.type == '新增') {
        title.value = '公告栏新增'
        or.value = '新增'
    } else {
        title.value = '公告栏编辑'
        or.value = '发布'
        projectAlls(id)
    }
})

const userparat = (val) => {
    contEditor.value = val
}
// 标准时间转时间戳
const transitionJab = (val) => {
    const date = new Date(val) * 1
    return date
}

const setId = ref(0)
// 只是回显
const projectAlls = async (id) => {
    console.log(id);
    // const obj = JSON.parse(id)
    const obj = id
    let res = await findById({ id: obj })
    titleipt.value = res.result.headline
    starttime.value = res.result.startTime
    endtime.value = res.result.endTime
    numbeript.value = res.result.orderId
    echoData.value = res.result.subject                  // 副文本
    setId.value = res.result.id
    console.log(res, res.result.del);
    // console.log(id, '编辑修改回显整个数据对象');
}

// 发布新增 
const submit = async () => {
    if(contEditor.value === "<p><br></p>" ){
        contEditor.value = ''
        // ElMessage.error('请填写完整表单')
  
    }
    if (titleipt.value == '' || starttime.value == undefined || endtime.value == '' || numbeript.value == '' || contEditor.value == '') 
     {
        ElMessage.error('请填写完整表单')
        return;
    }
    if(transitionJab(starttime.value) > transitionJab(endtime.value)){
        ElMessage('开始时间必须小于结束时间');
        return;
    }
    if (!(/(^[1-9]\d*$)/.test(numbeript.value))) {
        ElMessage('序号必须为正整数');
        return;
    } 
    // if(contEditor.value.length > 3900){
    //     console.log(contEditor.value.length);
    //     ElMessage({
    //         message: '文字超出最大限制.',
    //         type: 'warning',
    //     })
    //     return;
    // }
    else {
        if(route.query.type == '新增'){
            ElMessage({
            message: '新增成功.',
            type: 'success',

        })
        }else{
            ElMessage({
            message: '编辑成功.',
            type: 'success',
        })

        }
        
    }
    if (route.query.type == '新增') {
        let res = await projectAdd({
            headline: titleipt.value,
            startTime: transitionJab(starttime.value),
            endTime: transitionJab(endtime.value),
            orderId: numbeript.value, 
            subject: contEditor.value,   
        })
        console.log(res);
        setTimeout(()=>{
            router.back()
        },1000)
    } 
else {
    // 修改

        const projectAllss = async () => {  
            let res = await projectModify({
                headline: titleipt.value,
                startTime: transitionJab(starttime.value),
                endTime: transitionJab(endtime.value),
                orderId: numbeript.value,
                subject: contEditor.value,
                id: setId.value,
            })
            console.log(res);
        }
        projectAllss() 
        // history.go(-1)
        setTimeout(()=>{
            router.back()
        },1000)
       
        // location.reload()
    }
}


</script>



<style lang="less" scoped>
.certainly{
    color: red;
}
.notice-title {
    position: relative;
    height: 80px;
    background-color: rgb(242, 242, 242);
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
}

.container {
    margin: 40px auto;
    width: 95%;
    height: calc(100vh - 230px);
    overflow: auto;
    // background-color: rgb(242, 242, 242);
    // line-height: 60px;
}

.time-block {
    display: flex;
    margin-top: 20px;
    // justify-content: center;
    align-items: center;

    .Serial {
        margin-left: 115px;
    }
}
.notice-tow {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    }
.Complex {
    margin-top: 17px;
    // background-color: beige;
}

.avatar {
    width: 120px;
    height: 120px;
}


.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}


</style>