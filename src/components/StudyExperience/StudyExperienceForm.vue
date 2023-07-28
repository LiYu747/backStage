<script setup>
import { ref, reactive, onMounted } from 'vue'
import { addUserOpenClass, editUserOpenClass } from "@/api/openClass.js"; //公开课
onMounted(() => {
    // SelectType()
})
const props = defineProps({
    //子组件接收父组件传递过来的值

    //是否展示表单
    //表单的标题
    title: {
        type: String
    },
    //表格标题内容及表头
    tableData: {
        type: Array,
        default: () => [],
    },
    // 表头
    formHeader: {
        type: Array,
        default: () => [],
    },
    //点击哪一个新增表单索引
    formIndex: {
        type: Number,
        // required: true
    },
    //判断是编辑还是新增
    dialogType: {
        type: String,
        // required: true
    },
    //编辑数据
    content: {
        type: Object,
        // required: true
    },
    //判断编辑
    dialogTypes: {
        type: Boolean,
        // required: true
    },
})
// //使用父组件传递过来的值
// const { tableData, formHeader } = toRefs(props)
//定义数据
const tableForm = reactive({
    newObj: {},
    applyInfoList: ["course",]
})
//验证规则数据处理
const fromOptions = ref({})
const rulesOpts = ref({})
const setValue = () => {
    let option = {};
    let rules = {};
    props.formHeader.map((item) => {
        // console.log(item,"表格item");
        // return
        rules[item.prop2] = item.rules;
        if (item.type == 'select3') {
            option[item.prop] = item.value;
            option[item.prop1] = item.value;
            option[item.prop2] = item.value;
        } else if (item.type == 'select2') {
            option[item.prop] = item.value;
            option[item.prop2] = item.value;
        }
        option[item.prop2] = item.value;
    });
    fromOptions.value = JSON.parse(JSON.stringify(option));
    rulesOpts.value = JSON.parse(JSON.stringify(rules));
    // console.log(fromOptions.value, "rulesOpt.value");
}
watch(() => props.formHeader, () => {
    setValue();
}, {
    immediate: true,
})
// watch(() => props.dialogType, (newValue, oldValue) => {
//     console.log('侦听的数据发生变化时执行', newValue,oldValue);
//     if(newValue==="edit"){
//         fromOptions.value = props.content
//     }
// }, { deep: true });
// const SelectType = ()=>{
//     if(props.dialogType=='edit'){
//         props.dialogTypes = true
//         fromOptions.value = props.content
//     }
// }
const formRef = ref(null)
const CancelBtn = () => {
    console.log("取消");
    dialogFormVisible.value = false;
}
//新增确定
const ConfirmBtn = (formEl) => {
    for (let [key, value] of Object.entries(fromOptions.value)) {
        //判断是否有值(报送后端只要修改的数据)
        if (value !== null && value !== undefined && value !== '') {
            tableForm.newObj[key] = value;
        }
    }
    //处理省市区数据(多个下拉框后端只要最后一个下拉框的数据)
    tableForm.applyInfoList.forEach(item => {
        delete tableForm.newObj[item];
    });
    console.log(tableForm.newObj, "tableForm.newObj");
    return
    dialogFormVisible.value = false;
}

// 新增公开课
const addOpenClass = async () => {
    const add = reactive({
        applyType: "UPDATE",
        //targetId: 1,//新增不传，编辑传当前对象id
        targetName: "OpenClass",
        // teacherName: "唐小倩",
        variables: tableForm.newObj
    })
    const { code, msg, result } = ({} = await addUserOpenClass({ ...add }))
    // if (code === 0 && result) {
    //     tableList[2].children[1].tableContent = result
    // }
    console.log(code, msg, result, "新增公开课");
}
// 编辑公开课
const editOpenClass = async () => {
    const edit = reactive({
        applyType: "UPDATE",
        targetId: 1,//新增不传，编辑传当前对象id
        targetName: "OpenClass",
        // teacherName: "唐小倩",
        variables: tableForm.newObj
    })
    const { code, msg, result } = ({} = await editUserOpenClass({ ...edit }))
    // if (code === 0 && result) {
    //     tableList[2].children[1].tableContent = result
    // }
    console.log(code, msg, result, "编辑公开课");
}
//一个下拉框选择哪一项
const clickOption = (item, index) => {
    // baseInfoList[0].children[0].showHeader[index].sName = item
    // formListData.sData.push(baseInfoList[0].children[0].showHeader[index].sName)
    console.log(item, index, "单选框选择哪一项");

}
const dialogFormVisible = ref(false)
defineExpose({
    upLose() {
        dialogFormVisible.value = true
    }
})
</script>
<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="title">
            <el-form :model="fromOptions" ref="formRef" :rules="rulesOpts">
                <el-form-item v-for="(item, index) in formHeader" :key="index" :label="item.label" :required="item.isMust"
                    :prop="item.prop2">
                    <template v-if="item.type === 'input'">
                        <el-input v-model="fromOptions[item.prop2]" :disabled="item.isDisable"></el-input>
                    </template>
                    <template v-if="item.type === 'dateYear'">
                        <el-date-picker v-model="fromOptions[item.prop2]" type="year" :disabled="item.isDisable" />
                    </template>
                    <template v-if="item.type === 'dateMonth'">
                        <el-date-picker v-model="fromOptions[item.prop2]" type="month" :disabled="item.isDisable" />
                    </template>
                    <template v-if="item.type === 'date'">
                        <el-date-picker v-model="fromOptions[item.prop2]" type="date" :disabled="item.isDisable" />
                    </template>
                    <template v-if="item.type === 'number'">
                        <el-input-number v-model="fromOptions[item.prop2]" :min="0" :disabled="item.isDisable" />
                    </template>
                    <template v-if="item.type === 'select'">
                        <el-select v-model="fromOptions[item.prop2]" :disabled="item.isDisable">
                            <el-option v-for="(item2, index2) in item.opt" @click="clickOption(item2, index)"
                                :label="item2.name" :value="item2.id" :key="item2.id" />
                        </el-select>
                    </template>
                    <template v-if="item.type === 'select2'">
                        <el-select @change="changeFist($event, index)" v-model="fromOptions[item.prop1]"
                            :disabled="item.isDisable">
                            <el-option v-for="(item2, index2) in item.opt" :label="item2.name" :value="item2.id"
                                :key="item2.id" />
                        </el-select>
                        <el-select v-model="fromOptions[item.prop2]" class="selectMiddle">
                            <el-option @click="clickS(item3, index)" v-for="(item3, index3) in item.opt2"
                                :label="item3.name" :value="item3.id" :key="item3.id" />
                        </el-select>
                    </template>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="CancelBtn">取消</el-button>
                    <el-button type="primary" @click="ConfirmBtn(formRef)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang='less' scoped>
// 修改对话框高度
:deep(.el-dialog) {
    height: 70vh;
    overflow: hidden;
    overflow-y: auto;
}
</style>