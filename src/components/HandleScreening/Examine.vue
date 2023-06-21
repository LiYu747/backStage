<template>
    <div>
        <div class="title">审批（入职）</div>
        <!-- 基本信息 -->
        <div>
            <div>基本信息</div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                size="default">
                <div class="flex flex-w m-t2">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-input v-model="ruleForm.sex" />
                    </el-form-item>
                    <el-form-item label="民族" prop="name">
                        <el-input v-model="ruleForm.nation" />
                    </el-form-item>
                    <el-form-item label="证件类型" prop="name">
                        <el-input v-model="ruleForm.idType" />
                    </el-form-item>
                    <el-form-item label="证件号码" prop="name">
                        <el-input v-model="ruleForm.idCard" />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="name">
                        <el-input v-model="ruleForm.phoneNumber" />
                    </el-form-item>
                    <el-form-item label="所属省市区" prop="name">
                        <el-input v-model="ruleForm.region" />
                    </el-form-item>
                    <el-form-item label="生日" prop="name">
                        <el-input v-model="ruleForm.birthday" />
                    </el-form-item>
                    <el-form-item label="详细地址" prop="name">
                        <el-input v-model="ruleForm.detailedAddress" />
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <!-- 教职工信息 -->
        <div>
            <div>教职工信息</div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                size="default">
                <div class="flex flex-w m-t2">
                    <el-form-item label="工作单位" prop="name">
                        <el-input v-model="ruleForm.workUnit" />
                    </el-form-item>
                    <el-form-item label="岗位" prop="sex">
                        <el-input v-model="ruleForm.station" />
                    </el-form-item>
                    <el-form-item label="部门" prop="name">
                        <el-input v-model="ruleForm.department" />
                    </el-form-item>
                    <el-form-item label="隶属集团">
                        <el-input v-model="ruleForm.group" />
                    </el-form-item>
                    <el-form-item label="编制单位(用工单位)" label-width="150px" prop="name">
                        <el-input v-model="ruleForm.unit" />
                    </el-form-item>
                    <el-form-item label="编制状态" prop="name">
                        <el-input v-model="ruleForm.establishmentStatus" />
                    </el-form-item>
                    <el-form-item label="附件上传">
                        <el-upload v-model:file-list="fileList" class="upload-demo"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                            :limit="3" :on-exceed="handleExceed">
                            <el-button type="primary">文件上传</el-button>
                            <!-- <template #tip>
                          <div class="el-upload__tip">
                            jpg/png files with a size less than 500KB.
                          </div>
                        </template> -->
                        </el-upload>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <!-- 审批情况 -->
        <div>
            <div>审批情况</div>
            <div v-if="isOutstanding" class="flex al-center fz-14 m-l1 m-t2">
                <div class="m-r1">是否通过</div>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link flex ju-between al-center">
                        <div>{{isPass}}</div>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <div v-for="item in passOpt" @click="passBtn(item)" :key="item.id">
                                <el-dropdown-item><div style="width: 60px;" class="flex ju-center">{{item.name}}</div></el-dropdown-item>
                            </div>
                           
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="flex m-t2">
                <span class="fz-14 m-l1 m-r1">审批意见</span>
                <el-input class="textarea" v-model="ruleForm.desc" type="textarea" />
            </div>
            <div v-if="isOutstanding" class="flex m-t2 m-l1">
                <el-button type="primary">提交</el-button>
                <el-button type="primary" plain>取消</el-button>
            </div>
        </div>
        <!-- 流程跟踪 -->
        <div class="m-t2">
            <div>流程跟踪</div>
            <div class="m-t1">
                <el-table ref="multipleTableRef" :data="tableData" border empty-text="暂无数据" style="width: 96%"
                    @selection-change="handleSelectionChange">
                    <el-table-column label="环节">
                        <template #default="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center" label="状态">
                        <template #default="scope"><span class="cur-p"
                                @click="gotoInfo">{{ scope.row.name }}</span></template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center" property="address" label="操作人"
                        show-overflow-tooltip />
                    <el-table-column header-align="center" align="center" property="worker" label="执行时间"
                        show-overflow-tooltip />
                    <el-table-column header-align="center" align="center" property="station" label="意见" width="400"
                        show-overflow-tooltip>
                        <template #default="scope">
                            <el-input v-model="scope.row.station" /></template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center" property="group" label="代办人" width="140"
                        show-overflow-tooltip />
                </el-table>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ArrowDown } from '@element-plus/icons-vue'
    const props = defineProps({
        isOutstanding: {
            type: Boolean,
            default: false
        }
    })
    // 是否通过
    const isPass = ref("")
    const passBtn = (item) => {
        isPass.value = item.name
    }
    const passOpt = ref([
        {
            name:'是',
            id:0
        },
        {
            name:'否',
            id:1
        },
    ])
    const ruleForm = reactive({
        name: "", //姓名
        sex: "", //性别
        nation: "", //民族
        idType: "", ///证件类型
        idCard: "", //证件号码
        phoneNumber: "", ///电话号码
        region: "", //地区
        birthday: "", //生日
        detailedAddress: "", //详细地址
        workUnit: "", //工作单位
        station: "", //岗位
        department: "", //部门
        group: "", //集团
        unit: "", //单位
        establishmentStatus: "", //编制状态
    })
    const rules = reactive({
        name: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }, ],
        sex: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }, ],
    })
    const tableData = ref([{
            date: '起始',
            name: '已完成',
            address: '毛雅婷',
            worker: '2023-05-01 10:20:23',
            station: '',
            group: '毛雅婷',
        },
        {
            date: '起始',
            name: '已完成',
            address: '毛雅婷',
            worker: '2023-05-01 10:20:23',
            station: '',
            group: '毛雅婷',
        },
        {
            date: '起始',
            name: '已完成',
            address: '毛雅婷',
            worker: '2023-05-01 10:20:23',
            station: '',
            group: '毛雅婷',
        },
    ])
    const data = reactive({});
    onMounted(() => {});
</script>



<style lang="less" scoped>
    .title {
        font-size: 20px;
        font-weight: 700;
        margin: 20px 0;
    }

    .textarea {
        width: 1000px;
    }

    .el-dropdown-link{
        width: 200px;
        padding: 0 10px;
        height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
    }
</style>