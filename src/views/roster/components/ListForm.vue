<template>
    <div>
        <div class="titleBox flex">
            <div class="title" v-for="(item,index) in data.titleList" :key="item.id">
                <el-button type="primary" @click="upAdd(index)">{{item}}</el-button>
            </div>
        </div>
        <div class="m-t1">
            <el-table ref="multipleTableRef" :data="tableData" border empty-text="暂无数据" style="width: 100%"
                :scrollbar-always-on="true" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40" />
                <el-table-column label="教职工号" width="90">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column  label="姓名" width="80" >
                    <template #default="scope"><span class="cur-p" @click="gotoInfo">{{ scope.row.name }}</span></template>
                </el-table-column>
                <el-table-column property="address" label="性别" width="80" show-overflow-tooltip />
                <el-table-column property="worker" label="工作单位" width="180" show-overflow-tooltip />
                <el-table-column property="station" label="岗位" width="100" show-overflow-tooltip />
                <el-table-column property="group" label="隶属集团" width="180" show-overflow-tooltip />
                <el-table-column property="organizationUnit" label="编制单位" width="160" show-overflow-tooltip />
                <el-table-column property="type" label="编制类型" sortable width="160" show-overflow-tooltip />
                <el-table-column property="state" label="编制状态" width="90" show-overflow-tooltip />
                <el-table-column property="age" label="年龄" width="60" show-overflow-tooltip />
                <el-table-column property="tell" label="联系电话" width="130" show-overflow-tooltip />
                <el-table-column property="idCard" label="证件号码" width="180" show-overflow-tooltip />
                <el-table-column header-align="center" align="center" label="操作" show-overflow-tooltip>
                    <template #default="scope">
                        <el-button type="primary" size="small"> {{ scope.row.edit }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex m-t2 ju-center">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :small="small" :background="background"
                layout="total,  prev, pager, next, jumper" :total="60" 
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <InfoUpload ref="reference"></InfoUpload>
    </div>
</template>
<script setup>
    import InfoUpload from '../components/InfoUpload.vue'
    import * as XLSX from "xlsx";
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router'; 
    const router = useRouter()
    //默认第几页
    const currentPage4 = ref(1)
    // 分页器配置
    // 每页显示条目个数
    const pageSize4 = ref(20)
    //第几页
    const page = ref(1)
    const small = ref(false)
    const background = ref(true)
    //点击第几页
    const handleCurrentChange = (val) => {
        console.log(`current page: ${val}`)
        page.value = val
        if(val == 1){
            tableData.value = onePage
        }else{
            tableData.value = listData
        }

    }
    //去个人详情页面
    const gotoInfo = () => {
        router.push({
            path:'/personal',
            query:{userId:0}
        })
    }
    //选中的数据
    const selectionData = ref([])
    const handleSelectionChange = (val) => {
        selectionData.value = val
    }
    //导入数据
    const reference = ref(null)
    const upAdd = (idx) => {
        if (idx == 0) {
            reference.value?.add()
        } else {
            // 导出数据
            if (selectionData.value.length == 0) {
                ElMessage({
                    message: '请先选择导出的数据',
                    type: 'warning',
                })
                return
            }
            selectionData.value.map(item => {
                delete item.edit
            })
            // 创建一个新的工作簿
            const workbook = XLSX.utils.book_new();
            // 创建一个新的工作表
            const worksheet = XLSX.utils.json_to_sheet(selectionData.value);
            XLSX.utils.sheet_add_aoa(worksheet, [
                ["", "姓名", "性别", "工作单位", "岗位", "隶属集团", "编制单位", "编制类型", "编制状态", "年龄", "联系电话", "证件号码"]
            ], {
                origin: "A1"
            });
            // 将工作表附加到工作簿，并将工作表命名为students
            XLSX.utils.book_append_sheet(workbook, worksheet, "students");
            // 导出工作簿，并命名导出文件名为Presidents.xlsx
            XLSX.writeFile(workbook, "userInfo.xlsx");
        }
    }
    const data = reactive({
        titleList: ['信息导入', '导出数据'],
    });
    const listData = [{
            date: '100003',
            name: '李钰',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '中山市坦洲爱华学校',
            organizationUnit: '中山市石岐中学',
            type: "事业单位人员编制",
            state: '在编',
            age: '48',
            tell: "18219001234",
            idCard: '330625197311260001',
            edit: '编辑'
        },
        {
            date: '100004',
            name: '李永',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市建勋中学',
            type: "临时人员",
            state: '非编',
            age: '32',
            tell: "18219003156",
            idCard: '330625197311260002',
            edit: '编辑'
        },
        {
            date: '100005',
            name: '汤唯',
            address: '女',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市坦洲爱华学校',
            type: "非编",
            state: '离退',
            age: '64',
            tell: "18219001254",
            idCard: '330625197311260003',
            edit: '编辑'
        },]
    const onePage = [{
            date: '100003',
            name: '石浩林',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '中山市坦洲爱华学校',
            organizationUnit: '中山市石岐中学',
            type: "事业单位人员编制",
            state: '在编',
            age: '48',
            tell: "18219001234",
            idCard: '330625197311260001',
            edit: '编辑'
        },
        {
            date: '100004',
            name: '李永尉',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市建勋中学',
            type: "临时人员",
            state: '非编',
            age: '32',
            tell: "18219003156",
            idCard: '330625197311260002',
            edit: '编辑'
        },
        {
            date: '100005',
            name: '汤楚榆',
            address: '女',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市坦洲爱华学校',
            type: "非编",
            state: '离退',
            age: '64',
            tell: "18219001254",
            idCard: '330625197311260003',
            edit: '编辑'
        },
        {
            date: '100003',
            name: '石浩林',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '中山市坦洲爱华学校',
            organizationUnit: '中山市石岐中学',
            type: "事业单位人员编制",
            state: '在编',
            age: '48',
            tell: "18219001234",
            idCard: '330625197311260001',
            edit: '编辑'
        },
        {
            date: '100004',
            name: '李永尉',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市建勋中学',
            type: "临时人员",
            state: '非编',
            age: '32',
            tell: "18219003156",
            idCard: '330625197311260002',
            edit: '编辑'
        },
        {
            date: '100005',
            name: '汤楚榆',
            address: '女',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市坦洲爱华学校',
            type: "非编",
            state: '离退',
            age: '64',
            tell: "18219001254",
            idCard: '330625197311260003',
            edit: '编辑'
        },
        {
            date: '100003',
            name: '石浩林',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '中山市坦洲爱华学校',
            organizationUnit: '中山市石岐中学',
            type: "事业单位人员编制",
            state: '在编',
            age: '48',
            tell: "18219001234",
            idCard: '330625197311260001',
            edit: '编辑'
        },
        {
            date: '100004',
            name: '李永尉',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市建勋中学',
            type: "临时人员",
            state: '非编',
            age: '32',
            tell: "18219003156",
            idCard: '330625197311260002',
            edit: '编辑'
        },
        {
            date: '100005',
            name: '汤楚榆',
            address: '女',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '',
            organizationUnit: '中山市坦洲爱华学校',
            type: "非编",
            state: '离退',
            age: '64',
            tell: "18219001254",
            idCard: '330625197311260003',
            edit: '编辑'
        },
        {
            date: '100003',
            name: '石浩林',
            address: '男',
            worker: '中山市坦洲爱华学校',
            station: '教职工',
            group: '中山市坦洲爱华学校',
            organizationUnit: '中山市石岐中学',
            type: "事业单位人员编制",
            state: '在编',
            age: '48',
            tell: "18219001234",
            idCard: '330625197311260001',
            edit: '编辑'
        },
]
    const tableData = ref(onePage)
   onMounted(() => {});
</script>


<style lang="less" scoped>
    .titleBox {
        margin-top: 20px;

        .title {
            margin-right: 16px;
        }
    }
</style>