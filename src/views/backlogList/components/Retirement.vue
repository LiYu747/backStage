<template>
    <div>
        <div>
            <div>
                <!-- <backlog ref="vail" title="人员" :formData="priorToTransfer"></backlog> -->
                <Personnel ref="vail"  :formData="priorToTransfer"></Personnel>
            </div>
        </div>
        <div>
            <backlog ref="vail1" :title="title" :formData="formData"></backlog>
        </div>
    </div>
</template>
<script setup>
     import {
        timestampToTime,
    } from './Examine.js'
    import backlog from './backlog.vue'
    import Personnel from './personnel.vue'
    import {retire, sickLeave, maternityLeave} from '../../../api/apply.js'
    import { useRoute } from 'vue-router'
    const route = useRoute()
     const props = defineProps({
        formData: {
            type: Array,
            default: []
        },
        priorToTransfer: {
            type: Array,
            default: []
        },
        title:{
            type: String,
            default:''
        },
        flowType:String
    })
    //离退
    const getRetire = async(id) => {
     let res = await retire({
        applyId:id
     })
     if (res.code != 0) {
            return
        }
        let info = res.result
        let msgInfo = {
            teacherJobId:info.teacherJobId,
            name:info.name,
            sex:info.sex,
            organizationUnit:info.organizationUnit,
            workName:info.workName,
            idNumber:info.idNumber,
            retireType:info.retireType,
            retireTime:timestampToTime(info.retireTime),
            cause:info.cause,
        }
        assignment(msgInfo)
        console.log(info);
    }
    // 长病假
    const getSickLeave = async(id) => {
      let res = await sickLeave({
        applyId:id
      })
      if (res.code != 0) {
            return
        }
        let info = res.result
        let msgInfo = {
            teacherJobId:info.teacherJobId,
            name:info.name,
            sex:info.sex?info.sex.name:'',
            organizationUnit:info.organizationUnit,
            workName:info.workName,
            idNumber:info.idNumber,
            retireTime:timestampToTime(info.retireTime),
            cause:info.cause,
        }
        assignment(msgInfo)
    }
    //产假
    const getMaternityLeave = async(id) => {
        let res = await maternityLeave({
            applyId:id
        })
        if (res.code != 0) {
            return
        }
        let info = res.result
        let msgInfo = {
            teacherJobId:info.teacherJobId,
            name:info.name,
            sex:info.sex,
            organizationUnit:info.organizationUnit,
            workName:info.workName,
            idNumber:info.idNumber,
            maternityLeaveStartTime:timestampToTime(info.maternityLeaveStartTime),
            cause:info.cause,
        }
        assignment(msgInfo)
    }
    const vail = ref(null)
    const vail1 = ref(null)
    const assignment = (info) => {
        props.formData.map(item => {
            item.value = info[item.prop]
        })
        props.priorToTransfer.map(item => {
            item.value = info[item.prop]
        })
        vail.value ?.add()
        vail1.value ?.add()
        // console.log(formData.value);
    }
    const data = reactive({});
    onMounted(() => {
        if(props.flowType == 'RETIRE'){
            console.log(11);
            getRetire(route.query.id)
        }else if(props.flowType == 'SICK_LEAVE'){
            getSickLeave(route.query.id)
        }else{
            getMaternityLeave(route.query.id)
        }
       
    });
</script>



<style lang="less" scoped>
</style>