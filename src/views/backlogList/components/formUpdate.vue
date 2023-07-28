<template>
    <div class="m-t1 m-b1">
        <el-table :span-method="objectSpanMethod" :data="tableContent" border>
            <!-- 表格业务内容列 -->
            <template v-for="(item, index) in list.tableHeader" :key="index">
                <el-table-column v-if="item.type == 'date'" :prop="item.prop2" :label="item.label" header-align="center"
                    align="center">
                    <template #default="scope">
                        <el-tag v-if="item.isNew">新</el-tag>
                        {{  transitionDate(scope.row[item.prop2]) }}
                    </template>
                </el-table-column>
                <el-table-column v-else :prop="item.prop2" :label="item.label" header-align="center" align="center">
                    <template #default="scope">
                        <div :class="{'changeColor':index > 3&&scope.row.isNew}">{{ scope.row[item.prop2] }}</div>
                       
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script setup>
    const data = reactive({});
    onMounted(() => {});
    const props = defineProps({
        tableContent:{
            type: Array,
            default:[]
        }
    })
    defineExpose({
        exportAdd 
 })
 function exportAdd (){
    getSpanArr()
 }
    watch(()=>props.tableContent,()=> {
        getSpanArr()
    })
    const objectSpanMethod = ({
        row,
        column,
        rowIndex,
        columnIndex
    }) => {
        return spanArr[rowIndex * colFields.length + columnIndex];
    }
    const spanArr = [] //存储合并单元格的开始位置  
    const colFields = [
        "semester",
        "teachingSituation",
        "partJob",
        "hour",
        "section",
        "course",
        "classType",
        "jointClass",
    ]
    const getSpanArr = () => {
        let table = props.tableContent
        for (let i = 0; i < table.length; i++) {
            let row = i;
            // let col = i % this.colCount;
            if (row === 0) {
                // i 表示行 j表示列
                for (let j = 0; j < colFields.length; j++) {
                    spanArr[i * colFields.length + j] = {
                        rowspan: 1,
                        colspan: 1,
                    };
                }
            } else {
                for (let j = 0; j < colFields.length; j++) {
                    // 当前和上一次的一样
                    //  合并所有列的相同数据单元格
                    if (
                        colFields[j] == "semester" ||
                        colFields[j] == "teachingSituation" ||
                        colFields[j] == "partJob" ||
                        colFields[j] == "hour"
                    ) { // 指定合并哪些列

                        if (
                            table[row]["semester"] !==
                            table[row - 1]["semester"]
                        ) { // 哪些不合并:School不一样的,不合并
                            spanArr[row * colFields.length + j] = {
                                rowspan: 1,
                                colspan: 1,
                            };
                        } else if (
                            table[row][colFields[j]] ===
                            table[row - 1][colFields[j]]
                        ) {
                            let beforeItem =
                                spanArr[(row - 1) * colFields.length + j];
                            spanArr[row * colFields.length + j] = {
                                rowspan: 1 + beforeItem.rowspan, // 合并几列
                                colspan: 1, // 合并几行
                            };
                            beforeItem.rowspan = 0;
                            beforeItem.colspan = 0;
                        } else {
                            // rowspan 和 colspan 都为1表格此单元格不合并
                            spanArr[row * colFields.length + j] = {
                                rowspan: 1,
                                colspan: 1,
                            };
                        }
                    }


                }
            }
        }
        // 对数据进行倒序
        let stack = [];
        for (let i = 0; i < colFields.length; i++) {
            for (let j = 0; j < table.length; j++) {
                // console.log("i=" + i + " j=" + j);
                // i 表示列 j表示行
                if (j === 0) {
                    if (spanArr[j * colFields.length + i].rowspan === 0) {
                        stack.push(spanArr[j * colFields.length + i]);
                    }
                } else {
                    if (spanArr[j * colFields.length + i]) {
                        if (spanArr[j * colFields.length + i].rowspan === 0) {
                            stack.push(spanArr[j * colFields.length + i]);
                        } else {
                            stack.push(spanArr[j * colFields.length + i]);
                            while (stack.length > 0) {
                                let pop = stack.pop();
                                let len = stack.length;
                                spanArr[(j - len) * colFields.length + i] = pop;
                            }
                        }
                    }
                }
            }
        }
        // console.log(spanArr);
    }
    const list = ref({
        info: '教育教学',
        isBtn: false,
        isOperate: true,
        isAnnex: true,
        allPage: 0,
        number: 1,
        size: 10,
        tableHeader: [{
                prop2: "semester",
                label: "学期",
                value: "",
                type: "input",
                isMust: false,
                isDisable: true,
            },
            {
                prop2: "teachingSituation",
                label: "任教状况",
                value: "",
                type: "select",
                isMust: false,
                isDisable: false,
                rules: [{
                    required: true,
                    message: '请选择任教状况',
                    trigger: 'blur'
                }, ],
                opt: [],
                sName: {},
            },
            {
                prop2: "partJob",
                label: "兼任工作",
                value: "",
                type: "select",
                isMust: false,
                isDisable: false,
                // rules: [
                //   { required: true, message: '请选择授课日期', trigger: 'blur' },
                // ],
                opt: [],
                sName: {},
            },
            {
                prop2: "hour",
                label: "课时",
                value: "",
                type: "number",
                isMust: false,
                isDisable: false,
                rules: [{
                    required: true,
                    message: '请选择授课日期',
                    trigger: 'blur'
                }, ],
            },
            {
                prop2: "section",
                label: "任教学段",
                value: "",
                type: "select",
                isMust: true,
                isDisable: false,
                rules: [{
                    required: true,
                    message: '请选择任教学段',
                    trigger: 'blur'
                }, ],
                opt: [],
                sName: {},
            },
            {
                prop2: "course", //第二级
                label: "任教课程",
                value: "",
                type: "select2",
                isMust: true,
                isDisable: false,
                rules: [{
                    required: true,
                    message: '请选择授课日期',
                    trigger: 'blur'
                }, ],
                classNum: {
                    value1: '',
                    value2: ''
                },
                opt: [], //第一级
                opt2: [], //第二级
            },

            {
                prop2: "classType",
                label: "任教班级类型",
                value: "",
                type: "select",
                isMust: true,
                isDisable: false,
                rules: [{
                    required: true,
                    message: '请选择任教班级类型',
                    trigger: 'blur'
                }, ],
                opt: [],
                sName: {},
            },
            {
                prop2: "jointClass",
                label: "任教班级",
                // isClass: true,
                value: "",
                type: "addFunction",
                isMust: false,
                isDisable: false,
                rules: [{
                    required: true,
                    message: '请选择任教班级',
                    trigger: 'blur'
                }, ],
                addPush: {
                    prop2: "grade",
                    value1: "",
                    value2: "",
                },
                remMsg: {}, //年级
                classMsg: {}, //班级
                opt: [], //年级
                gradeList: [], //班级
            },
        ],
        tableContent: [],
        // allPage:Number,

    })
</script>



<style lang="less" scoped>
    .changeColor{
        color: red;
    }
</style>