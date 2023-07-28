<template>
    <div>
        <!-- 基本信息 -->
        <div>
            <backlog ref="vail" :formData="formData"></backlog>
        </div>
        <!-- 教职工信息 -->
        <div v-if="!noStaff">
            <backlog ref="vail1" title="教职工信息" :formData="infoData">
                <el-form-item label="附件">
                    <div class="flex al-center">
                        <div v-for="item in downloadList" class=" flex al-center" :key="item.id">
                            <el-icon style="margin-right: 5px;"  color="#999999"><Document /></el-icon>   <div class="m-r1"> {{item.fileName}}</div>  <el-button type="primary" @click="filesUpload(item)" size="small">下载</el-button>
                        </div>
                       
                    </div>
                </el-form-item>
            </backlog>
        </div>
    </div>
</template>
<script setup>
 import {
        passOpt,
        timestampToTime,
        judgeProcess,
        judgeState,
        downloadFileBySaveAs
    } from './Examine.js'
    import { Document,Close } from "@element-plus/icons";
    import backlog from './backlog.vue'
    import {
        findByApplyId,
        afterSchoolStaff
    } from '../../../api/apply.js'
    import {
        useRoute,useRouter
    } from 'vue-router'
    const route = useRoute()
    const router = useRouter()
    const props = defineProps({
        formData:{
            type:Array,
            default:[]
        },
        infoData:{
            type:Array,
            default:[]
        },
        noStaff:{
            type:Boolean,
            default:false
        },
        flowType:{
            type:String,
        }
     })
      //下载
      const filesUpload = (value) => {
        downloadFileBySaveAs(value.file, value.fileName)
    }
      //附件列表
      const downloadList = ref([])
     //绑定值
     const vail = ref(null)
    const vail1 = ref(null)
    const assignment = (info) => {
        props.formData.map(item => {
            item.value = info[item.prop]
        })
        props.infoData.map(item => {
            item.value = info[item.prop]
        })
        vail.value ?.add()
        vail1.value ?.add()
        // console.log(formData.value);
    }
     //课后服务
     const getAfterSchoolStaff= async(id) => {
        let res = await afterSchoolStaff({
            applyId: id
        })
        if (res.code != 0) {
            return
        }
        let info = res.result
        if(!info) return
        let msgInfo = {
            name: info.name,
            sex: info.sex,
            nation: info.nation,
            idType: info.idType,
            idCard: info.idNumber,
            phoneNumber: info.phone,
            region: info.birthplaceProvince, 
            city:info.birthplaceCity,
            district: info.birthplaceDistrict, 
            birthday: timestampToTime(info.birthTime),
            detailedAddress: info.address,
        }
        assignment(msgInfo)
     }
        // /获取入职数据
        const getByApply = async (id) => {
        let res = await findByApplyId({
            applyId: id
        })
        if (res.code != 0) {
            return
        }
        let info = res.result
        if(!info) return
        downloadList.value = info.applyAnnexModels
        let msgInfo = {
            name: info.name,
            sex: info.sex,
            nation: info.nation,
            idType: info.idType,
            idCard: info.idNumber,
            phoneNumber: info.phone,
            region: info.birthplaceProvince, 
            city:info.birthplaceCity,
            district: info.birthplaceDistrict, 
            birthday: timestampToTime(info.birthTime),
            detailedAddress: info.address,
            workUnit: info.workName,
            station: info.jobCategory,
            department: info.affiliationDepartment,
            group: info.affiliationWork ,
            unit: info.organizationUnit,
            establishmentStatus: info.authorizedStrengthState,
        }
        assignment(msgInfo)
    }
    const data = reactive({});
    onMounted(() => {
        if(props.flowType == 'ENTRY'){
            getByApply(route.query.id)
        }else{
            getAfterSchoolStaff(route.query.id)
        }
      
    });
</script>



<style lang="less" scoped>
</style>