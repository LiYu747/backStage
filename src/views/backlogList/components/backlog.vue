<template>
    <div>
        <div class="m-t2">
            <div>{{ title }}</div>
            <el-form ref="ruleFormRef" :model="fromOption" :validate-on-rule-change="false" :rules="rulesOpt"
                label-width="120px" class="demo-ruleForm" size="default">
                <div class="flex flex-w m-t2 ">
                    <div v-for="(item, index) in formData" class="itemStyle" :style="{ width: item.iptWid }" :key="item.id">
                        <el-form-item :label-width="item.width" :label=item.label :prop="item.prop">
                            <component v-if="item.type === 'input'" :style="{ width: item.inputW }" :readonly="item.readonly"
                                :disabled='item.disabled' v-model="fromOption[item.prop]" :is="`el-${item.type}`"
                                v-bind="item.attrs" />
                            <div v-if="item.type === 'textarea'" class="textarea">
                                <el-input v-model="fromOption[item.prop]" :rows="3" type="textarea"
                                    :readonly="item.readonly" placeholder="" />
                            </div>
                        </el-form-item>
                    </div>
                    <slot></slot>
                </div>
            </el-form>

        </div>
    </div>
</template>
<script setup>
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
})
const ruleFormRef = ref(null)
const fromOption = ref({})
const rulesOpt = ref({})
const setValue = () => {
    let option = {};
    let rules = {};
    props.formData.map((item) => {
        rules[item.prop] = item.rules;
        option[item.prop] = item.value;
    });
    fromOption.value = JSON.parse(JSON.stringify(option));
    rulesOpt.value = JSON.parse(JSON.stringify(rules));
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
    deep: true
},)


defineExpose({
    ruleFormRef,
    fromOption,
    add() {
        setValue()
    }
})
onMounted(() => { });
</script>



<style lang="less" scoped>
.itemStyle {
    width: 400px;
    height: 50px;
    // flex: 0 0 23.333333%;
}

:deep(.el-input__prefix) {
    width: 0;
}

.textarea {
    width: 100%;
    min-height: 40px;
    border: 10px;
    background-color: antiquewhite;
}
</style>