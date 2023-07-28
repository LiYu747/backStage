<script setup>
    import { classEduClass } from "@/api/dsl.js"; 
    import { ref, reactive, onMounted } from 'vue'
    import { addUserOpenClass, editUserOpenClass } from "@/api/openClass.js"; //公开课
    import { queryUserParentId} from "@/api/dict.js";//用户字典信息
    import lodash from 'lodash'
    import { ElMessage } from 'element-plus'
    onMounted(() => {
        // SelectType()
    })
    const emit = defineEmits(['isHead','changeFist','newly'])
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
        Myform: {
        type: Array,
        // required: true
    },
    titles: {
        type: String,
        // required: true
    },
        newData:{
          type:Array,
          default:[]
        },//班级数组
    })
    
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
        let Header =  props.formHeader.slice(0,4)
        Header.map((item) => {
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
        fromOptions.value = lodash.cloneDeep(option);
        rulesOpts.value = lodash.cloneDeep(rules);
        // console.log(fromOptions.value, "rulesOpt.value")
    }
    // 处理数据
    const increase = ref([])
    const addDispose = async() => {
    let val = props.formHeader.slice(4, -1);
    let list = []
    props.newData.map( item => {
        let msgData = {
           list: lodash.cloneDeep(val)
        }
        msgData.list[0].value = item.section
        msgData.list[1].classNum.value1 = item.section
        msgData.list[1].classNum.value2 = item.course
        msgData.list[2].value = item.classType
        msgData.list[3].addPush.value1 = item.class
        msgData.list[3].addPush.value2 = item.jointClass
        msgData.list[3].remMsg = item.remMsg?item.remMsg:{}
        list.push(msgData);
    })
    increase.value = list
    let ids = []
    props.newData.map( opt => {
        if(opt.remMsg&&opt.remMsg.gradeId){
            ids.push(opt.remMsg.gradeId)
            return
        }
        ids.push(opt.gradeModel.gradeKey) 
    })
    let resData = await Promise.all(
        ids.map(async item => {
                const res = await  classEduClass({
                gradeId:  item
            })
                return res.data.data.data
            })
    )
    resData.forEach( (item,index) =>{
        list[index].list[3].gradeList = item
    })
    increase.value = list
    }
    watch(()=>props.newData ,()=>{
        addDispose()
    })
    const fromList = ref([])
    watch(() => props.formHeader, () => {
        // console.log(props.formHeader, 'formHeader');
        fromList.value =  props.formHeader.slice(0,4)
        setValue();
    }, {
        immediate: true,
    })
    watch(() => props.content, () => {
        if (props.dialogType == 'edit') {
            fromOptions.value = lodash.cloneDeep(props.content)
            addDispose()
        }else{
            fromOptions.value = {}
        }
    }, { deep: true });
    
    const CancelBtn = () => {
        dialogFormVisible.value = false;
    }
    //新增或者编辑 确定
    const formRef = ref(null)
    const ConfirmBtn = async() => {
        //编辑
        let oneVerify = await formRef.value.validate((valid, fields) => {
            if (valid) {
                return true
            } else {
                return false
            }
        })
      if(!oneVerify){
        ElMessage({
            message: '请完善表单信息',
            type: 'warning',
        })
        return
      }
        compile()
    }
    // 新增
    const newly = () => {
        emit('newly',fromOptions.value,props.formIndex)
        dialogFormVisible.value = false;
    }
    // 判断用户是否填写完成了
    const isFillIn = () => {
        let res = []
         increase.value.map( item => {
           let arr = {
            section : item.list[0].value,
            course : item.list[1].classNum.value2,
            classType : item.list[2].value,
            class : item.list[3].addPush.value2
           }
           res.push(arr)
        })
        let flag = true
         res.forEach( item => {
            if(!item.class||!item.classType||!item.course||!item.section){
                flag = false
                return
            }
        })
        return flag
    }
    // 编辑
    const compile = () => {
       if( !isFillIn()){
        ElMessage({
            message: '请完善表单信息',
            type: 'warning',
        })
        return
       }
         dialogFormVisible.value = false;
        emit('isHead', fromOptions.value,increase.value)
       
    }
    
    const transTime = (val) => {
        if(isCustomTimeFormat(val)){
            return val + ''
        }else {
            return val
        }
    }
    function isCustomTimeFormat(timeString) {
      const regex = /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(.+\)$/;
      const isValidFormat = regex.test(timeString);
      return isValidFormat;
    }
    //一个下拉框选择哪一项
    const clickOption = (item, index) => {
        // console.log(item, index, "单选框选择哪一项");
    
    }
    //增加选择
    const addition = () => {
      let val = props.formHeader.slice(4, -1);
      let msgData = {
      list:  lodash.cloneDeep(val)
      }
      increase.value.push(msgData)
    }
    const changeOpt = async( item , index) => {
        increase.value[index].list[3].addPush.value2 = ''
        increase.value[index].list[3].remMsg = item
        increase.value[index].list[3].classKey = item.gradeId
        let res = await classEduClass({
            gradeId:  item.gradeId
        })
        let resData = res.data.data.data
        increase.value[index].list[3].gradeList = resData
    }
    const  changeClassOpt = (item,index) => {
        increase.value[index].list[3].classMsg = item
    }
    
    //两级选项第一级
    const changeFist = async(item,index) => {
        let res =  await queryUserParentId({ parentId: item.id})
        increase.value[index].list[1].opt2 = res.result
    }
    const getnum = (a, index) => {
    props.Myform[0].tableHeader[index].value = a;
}
let TeacherEthics_Arr ={
    '03': 'hour',
}
watch(() => props.Myform, () => {
    let arr = props.Myform
    for (let i = 0; i < props.Myform.length; i++) {
        for (let s = 0; s < arr[i].tableHeader.length; s++) {
            if (arr[i].tableHeader[s].value == 'blank') {
                // console.log('props.titles: ', props.titles);
                if (props.titles == '教育教学') {
                    fromOptions.value[TeacherEthics_Arr[i + '' + s]] = null
                }
            }
        }
    }
}, { deep: true });
    const dialogFormVisible = ref(false)
    defineExpose({
        upLose() {
            dialogFormVisible.value = true
        }
    })
    </script>
    <template>
        <div>
            <el-dialog   destroy-on-close v-model="dialogFormVisible" :title="title">
                <div class="dialogBox">
                    <el-form :model="fromOptions" ref="formRef" :rules="rulesOpts">
                        <el-form-item v-for="(item, index) in fromList" :key="index" :label="item.label" 
                            :prop="item.prop2">
                            <template v-if="item.type === 'input'">
                                <el-input v-model="fromOptions[item.prop2]" :disabled="item.isDisable"></el-input>
                            </template>
                            <template v-if="item.type === 'number'">
                                <el-input-number v-model="fromOptions[item.prop2]" @change="getnum(fromOptions[item.prop2], index)" :disabled="item.isDisable" />
                            </template>
                            <template v-if="item.type === 'organization'">
                                <el-cascader v-model="fromOptions[item.prop2]" :options="item.opt"
                                :props="{ label: 'title', value: 'title', checkStrictly:true, }" :show-all-levels="false" />
        
                            </template>
                            <template v-if="item.type === 'select'">
                                <el-select v-model="fromOptions[item.prop2]" :disabled="item.isDisable">
                                    <el-option v-for="(item2, index2) in item.opt" @click="clickOption(item2, index)"
                                        :label="item2.name" :value="item2.name" :key="item2.id" />
                                </el-select>
                            </template>
                        </el-form-item>
                        <!-- increase -->
                       <div class="flex">
                        <div  class="addBox">
                            <div v-for="(items,index) in increase" :key="items.id">
                              <el-card class="m-b1">
                                <el-form-item v-for="(item) in items.list" class="labelStyle" :key="item.id" :label="item.label" :prop="item.prop2">
                                    <template v-if="item.type === 'input'">
                                        <el-input v-model="item.value" :disabled="item.isDisable"></el-input>
                                    </template>
                                    <template v-if="item.type === 'number'">
                                        <el-input-number v-model="item.value" :min="0" :disabled="item.isDisable" />
                                    </template>
                                    <template v-if="item.type === 'organization'">
                                        <el-cascader v-model="item.value" :options="item.opt"
                                        :props="{ label: 'title', value: 'title', checkStrictly:true, }" :show-all-levels="false" />
                                    </template>
                                    <template v-if="item.type === 'select'">
                                        <el-select v-model="item.value" :disabled="item.isDisable">
                                            <el-option v-for="(item2, index2) in item.opt" @click="clickOption(item2, index)"
                                                :label="item2.name" :value="item2.name" :key="item2.id" />
                                        </el-select>
                                    </template>
                                    <template v-if="item.type === 'select2'">
                                        <el-select  v-model="item.classNum.value1">
                                            <el-option v-for="(item2, index2) in item.opt" @click="changeFist(item2,index)" :label="item2.name" :value="item2.name"
                                                :key="item2.id" />
                                        </el-select>
                                        <el-select v-model="item.classNum.value2" :disabled="item.isDisable"  class="selectMiddle">
                                            <el-option v-for="(item3, index3) in item.opt2"
                                                :label="item3.name" :value="item3.name" :key="item3.name" />
                                        </el-select>
                                    </template>
                                    <template v-if="item.type === 'addFunction'">
                                     <div class="flex">
                                            <el-select v-model="item.addPush.value1">
                                                <el-option v-for="(item2, index2) in item.opt" @click="changeOpt(item2,index)"
                                                    :label="item2.gradeName" :value="item2.gradeName" :key="item2.id" />
                                            </el-select>
                                            <el-select v-model="item.addPush.value2">
                                                <el-option v-for="(item2, index2) in item.gradeList"  @click="changeClassOpt(item2,index)"
                                                    :label="item2.className" :value="item2.className" :key="item2.id" />
                                            </el-select>
                                    </div>
                                    </template>
                                </el-form-item>
                              </el-card>
                            </div>
                        </div>
                       <div class="btnBox flex-d">
                        <el-button class="m-l2 m-b1" @click="addition" type="primary">添加</el-button>
                       </div>
                       </div>
                   
                    </el-form>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="CancelBtn">取消</el-button>
                        <el-button type="primary" @click="ConfirmBtn">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </template>
    
    <style lang='less' scoped>
     /* 修改对话框高度 */
   
    .addBox{
        width: 64%;
    }
    .btnBox{
        justify-content: flex-end;
    }
    .dialogBox{
    max-height: 60vh;
    overflow: auto;
}
   .labelStyle:before{
    content: "*";
    color: var(--el-color-danger);
    margin-right: 4px;
    margin-top: 6px;
   }
    </style>