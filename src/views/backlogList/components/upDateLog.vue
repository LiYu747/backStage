<template>
    <div>
        <div class="m-t2">
            <div>{{title}}</div>
            <el-form ref="ruleFormRef" :model="fromOption" :validate-on-rule-change="false" 
                label-width="120px" class="demo-ruleForm" size="default">
                <div class="flex flex-w m-t2">
                    <div v-for="(item,index) in formData" class="itemStyle" :style="{width:item.iptWid}" :key="item.id">
                        <el-form-item :label-width="item.width" :label=item.label :prop="item.prop">
                            <div v-if="item.type == 'img'"><img v-if="item.value" :src="item.value" class="imgStyle" alt=""></div>
                            <div v-else-if="item.type == 'upload'" >
                                <div  class="flex al-center" v-if="fromOption[item.prop]">
                                    <el-icon style="margin-right: 5px;"  color="#999999"><Document /></el-icon><div class="m-r1 name"> {{fromOption[item.prop]}}</div>  <el-button type="primary" @click="filesUpload" size="small">下载</el-button>
                                </div>
                                <div v-else style="color: #606266;">
                                   暂无
                                </div>
                            </div>
                            <component v-else  :style="{width:item.inputW}" :class="{'ipt':item.isNew}"  :readonly="true" :disabled='item.disabled'
                                v-model="fromOption[item.prop]" :is="`el-input`"  />
                        </el-form-item>
                    </div>
                    <slot></slot>
                </div>
            </el-form>

        </div>
    </div>
</template>
<script setup>
    import { Document,Close } from "@element-plus/icons";
    import {
        downloadFileBySaveAs
    } from './Examine.js'
    const disabledDate = (time) => {
        return time.getTime() > Date.now()
    }
    const data = reactive({});
    const props = defineProps({
        title: {
            type: String,
            default: "基本信息"
        },
        formData: {
            type: Array,
            required: true,
        },
        attachment:{
            type: String,
            default:''
        }
    })
    //下载附件
    const filesUpload = () => {
        downloadFileBySaveAs(props.attachment, fromOption.value.attachmentName)
    }
    const ruleFormRef = ref(null)
    const fromOption = ref({})
    const setValue = () => {
        let option = {};
        props.formData.map((item) => {
            option[item.prop] = item.value;
        });
        fromOption.value = JSON.parse(JSON.stringify(option));
        console.log('fromOption.value: ', fromOption.value);
    }
    const emit = defineEmits(['select'])
    const changeAdd = (val, idx) => {
        if (idx == 8) return
        if (idx == 6) {
            props.formData[idx + 1].disabled = false
            props.formData[idx + 2].disabled = true
            fromOption.value.district = ''
            fromOption.value.city = ''
        }
        if (idx == 7) {
            props.formData[idx + 1].disabled = false
            fromOption.value.district = ''
        }
        emit('select', val.id, idx)
    }
    watch(() => props.formData, () => {
        setValue();
    }, {
        immediate: true,
    })
    defineExpose({
        ruleFormRef,
        fromOption,
        add(){
            setValue()  
        }
    })
    onMounted(() => {
    });
</script>



<style lang="less" scoped>
    .itemStyle {
        width: 370px;
    }

    .ipt{
      :deep(.el-input__inner){
        color: red;
      }
    }

    .imgStyle{
        width: 80px;
        height: 74px;
    }

    .name{
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    :deep(.el-input__prefix) {
        width: 0;
    }
</style>