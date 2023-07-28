<template>
    <div>
        <div class="m-t2">
            <div>{{ title }}</div>
            <el-form ref="ruleFormRef" :model="fromOption" :validate-on-rule-change="false" :rules="rulesOpt"
                label-width="120px" class="demo-ruleForm" size="default">
                <div class="flex flex-w m-t2">
                    <div v-for="(item, index) in formData" class="itemStyle" :style="{ width: item.iptWid }" :key="item.id">
                        <el-form-item :label-width="item.width" :label=item.label :prop="item.prop">
                            <component v-if="item.type === 'input'" :disabled='item.disabled' class="w-50 m-2"
                                v-model="fromOption[item.prop]" :is="`el-${item.type}`" v-bind="item.attrs"
                                :suffix-icon="Search" @input="linkage" />
                            <!-- <el-input v-model="fromOption[item.prop]" class="w-50 m-2" @change="linkage" :suffix-icon="Search" /> -->
                        </el-form-item>
                        <!-- 提示表格 -->
                        <div class="table" v-if="show">
                            <el-table ref="multipleTableRef" :data="tableData" :header-cell-style="{
                                background: '#D7D7D7',
                                borderColor: '#000'
                            }" border empty-text="暂无数据" style="width: 100%" @row-click="theSelected">

                                <el-table-column header-align="center" align="center" property="name" label="姓名"
                                    show-overflow-tooltip />
                                <el-table-column header-align="center" align="center" property="organizationUnit"
                                    label="组织架构" show-overflow-tooltip width="420" />
                                <el-table-column header-align="center" align="center" property="workName"
                                    label="部门" show-overflow-tooltip />
                            </el-table>


                            <div class="bottom">
                                <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                                    :small="small" :background="background" layout="total,  prev, pager, next, jumper"
                                    :total="total" @current-change="handleCurrentChange">
                                </el-pagination>
                            </div>

                        </div>
                    </div>

                    <slot></slot>
                </div>
            </el-form>
            <div class="information" v-if="nameobj.name != ''">
                <div class="information_box">
                    <text class="label">工号</text>
                    <text class="content">{{ nameobj.teacherJobId }}</text>
                </div>
                <div class="information_box">
                    <text class="label">姓名</text>
                    <text class="content">{{ nameobj.name }}</text>
                </div>
                <div class="information_box">
                    <text class="label">性别</text>
                    <text class="content">{{ nameobj.sex }}</text>
                </div>
                <div class="information_box">
                    <text class="label">编制单位(用工单位)</text>
                    <text class="content">{{ nameobj.organizationUnit }}</text>
                </div>
                <div class="information_box">
                    <text class="label">工作单位</text> 
                    <text class="content">{{ nameobj.workName }}</text>
                </div>
                <div class="information_box">
                    <text class="label">证件号码</text>
                    <text class="content">{{ nameobj.idNumber }}</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { findByKeyword } from '@/api/roster'

const props = defineProps({
    title: {
        type: String,
        default: "基本信息"
    },
    formData: {
        type: Array,
        required: true,
    },
});
const show = ref(false)
const nameobj = ref({
    id: '',
    teacherJobId:'',
    name: '',
    sex: '',
    organizationUnit: '',
    // unit: '',
    workName:'',
    idNumber: ''
});

const tableData = ref([])

const emit = defineEmits(['ObtainVal',])

//人员
const top_name = ref('')

//默认第几页
const total = ref(null)
//默认第几页
const currentPage4 = ref(1)
// 分页器配置
// 每页显示条目个数
const pageSize4 = ref(5)
//第几页
const page = ref(0)
const small = ref(false)
const background = ref(true)
//点击第几页
const handleCurrentChange = (val) => {
    console.log('val: ', val);
    page.value = val-1
    linkage(top_name.value)
}



const linkage = async (name) => {
    console.log('name: ', name);
    top_name.value = name;

    const { result } = await findByKeyword({
        keyword: name,
        page: page.value,
        size: pageSize4.value
    })
    console.log("res", result);
    if (result) {
        tableData.value = result.content
        total.value = result.totalElements
    }

    // console.log('23', fromOption.value.name);
    if (fromOption.value.name != '') {
        show.value = true
    } else {
        show.value = false
    }
}
const theSelected = (e) => {
    fromOption.value.name = e.name
    nameobj.value = e
    nameobj.value.id = e.teacherId
    show.value = false;
    emit('ObtainVal', e)
}

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


watch(() => props.formData, () => {
    setValue();
}, {
    immediate: true,
})
defineExpose({
    ruleFormRef,
    fromOption
})
onMounted(() => { });
</script>



<style lang="less" scoped>
.itemStyle {
    width: 300px;
    position: relative;

    .table {
        width: 879px;
        border: 1px solid;
        position: absolute;
        top: 34px;
        left: 120px;
        background-color: #fff;
        z-index: 999;

        .bottom {

            border: 1px red;
            width: 627px;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }
}

:deep(.el-input__prefix) {
    width: 0;
}

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
            font-weight: 600;
            margin-right: 10px;
        }
    }
}

.flex {}
</style>