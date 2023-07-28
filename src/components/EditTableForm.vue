<script setup>
import { ref, reactive, onMounted } from 'vue'
const props = defineProps({
    //表单的标题
    title: {
        type: String
    },
    // 表头
    formHeader: {
        type: Array,
        default: () => [],
    },
    //编辑数据
    content: {
        type: Object,
        // required: true
    },
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
const dialogFormVisible = ref(false)
defineExpose({
    editUpLose() {
        dialogFormVisible.value = true
    }
})
</script>


<template>
    <div>
        <!-- 编辑弹框 -->
        <el-dialog v-model="dialogFormVisible" :title="title">
            <el-form :model="content" ref="formRef" :rules="rulesOpts">
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

<style lang='less' scoped></style>