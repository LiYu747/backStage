<template>
    <div>
        <div>
            <!-- <backlog ref="vail" title="人员" :formData="priorToTransfer"></backlog> -->
            <Personnel ref="vail" title="人员" :formData="priorToTransfer"></Personnel>
        </div>
        <div>
            <backlog ref="vail1" title="调动后" :formData="formData"></backlog>
        </div>
    </div>
</template>
<script setup>
import backlog from './backlog.vue'
import Personnel from './personnel.vue'
import { transfer, loanedPersonnel } from '../../../api/apply.js'
import {
    timestampToTime,
} from './Examine.js'
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
    flowType: {
        type: String
    }
})
//借调
const getLoanedPersonnel = async (id) => {
    let res = await loanedPersonnel({
        applyId: id
    })
    if (res.code != 0) {
        return
    }
    let info = res.result
    let msgInfo = {
        teacherJobId: info.teacherJobId,
        name: info.name,
        sex: info.sex,
        organizationUnit: info.organizationUnit,
        workName: info.workName,
        idNumber: info.idNumber,
        newWorkName: info.newWorkName,
        newJob: info.newJob,
        newAffiliationDepartment: info.newAffiliationDepartment,
        newAffiliationWork: info.newAffiliationWork,
        newOrganizationUnit: info.newOrganizationUnit,
        loanedPersonnelStartTime: timestampToTime(info.loanedPersonnelStartTime),
        loanedPersonnelEndTime: timestampToTime(info.loanedPersonnelEndTime),
        cause: info.cause,
    }
    assignment(msgInfo)
}
//调动
const getTransfer = async (id) => {
    let res = await transfer({
        applyId: id
    })
    if (res.code != 0) {
        return
    }
    let info = res.result
    if (!info) return
    let msgInfo = {
        teacherJobId: info.teacherJobId,
        name: info.name,
        sex: info.sex,
        organizationUnit: info.organizationUnit,
        workName: info.workName,
        idNumber: info.idNumber,
        newWorkName: info.newWorkName,
        newJob: info.newJob,
        newAffiliationDepartment: info.newAffiliationDepartment,
        newAffiliationWork: info.newAffiliationWork,
        newOrganizationUnit: info.newOrganizationUnit,
        transferTime: timestampToTime(info.transferTime),
        cause: info.cause,
    }
    assignment(msgInfo)
    console.log(res);
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
    vail.value?.add()
    vail1.value?.add()
    console.log(props.priorToTransfer);
}
const data = reactive({});
onMounted(() => {
    if (props.flowType == 'TRANSFER') {
        getTransfer(route.query.id)
    } else {
        console.log(222);
        getLoanedPersonnel(route.query.id)
    }

});
</script>



<style lang="less" scoped>
.information {
    width: 1500px;
    margin-left: 79px;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;

    .information_box {
        width: 500px;
        line-height: 30px;

        .label {
            // font-weight: 600;
            margin-right: 10px;
        }
    }
}
</style>