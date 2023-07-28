<template>
    <div>
        <div class="m-t2">
            <div>{{title}}</div>
            <el-form ref="ruleFormRef" :model="fromOption" :validate-on-rule-change="false" :rules="rulesOpt"
                label-width="120px" class="demo-ruleForm" size="default">
                <div class="flex flex-w m-t2">
                    <div v-for="(item,index) in formData" class="itemStyle" :style="{width:item.iptWid}" :key="item.id">
                        <el-form-item :label-width="item.width" :label=item.label :prop="item.prop">
                            <component v-if="item.type === 'input'" :disabled='item.disabled'
                                v-model="fromOption[item.prop]" :is="`el-${item.type}`" v-bind="item.attrs" />
                                <component v-if="item.type === 'textarea'" type="textarea" :disabled='item.disabled'
                                v-model="fromOption[item.prop]" :is="`el-${item.type}`" v-bind="item.attrs" />
                            <component v-else-if="item.type==='cascader'"    style="width: 100%;"  :show-all-levels="false" :props="{label:item.title?item.title:'name',value:item.title?item.title:'name',checkStrictly: item.Any_layer,}"
                                v-model="fromOption[item.prop]" :is="`el-${item.type}`" :options="item.opt"
                                :disabled='item.disabled' />
                                <component v-else-if="item.type==='region'"  style="width: 100%;"  :props="{label:item.title?item.title:'name',value:item.title?item.title:'name'}"
                                v-model="fromOption[item.prop]" :is="`el-cascader`" :options="item.opt"
                                :disabled='item.disabled' />
                            <component v-else-if="item.type==='select'" style="width: 100%;" v-model="fromOption[item.prop]"
                                :is="`el-${item.type}`" :disabled='item.disabled'>
                                <el-option v-for="opt in item.opt" @click="changeAdd(opt,index)" :key="opt.id"
                                    :label="opt.name" :value="opt.name" />
                            </component>
                            <component prefix-icon="none"  v-model="fromOption[item.prop]"
                                :disabled-date="disabledDate"  type="date" :editable="false" :clearable="false"
                                v-else-if="item.type==='date-picker'" :is="`el-${item.type}`">
                            </component>
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
        return props.isDisabled ? false : time.getTime() > Date.now()
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
        isDisabled:{
            type:Boolean,
            default:false
        },
        isFinite:{
            type:Boolean,
            default:false
        }
        
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
        rulesOpt.value = rules
    }
    const emit = defineEmits(['select'])
    const changeAdd = (val, idx) => {
        return
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
        fromOption
    })
    onMounted(() => {});
</script>



<style lang="less" scoped>
    .itemStyle {
        width: 300px;
    }

    :deep(.el-input__prefix) {
        width: 0;
    }
</style>