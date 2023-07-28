<template>
    <div class="notice-title">
        <div class="notice-one">公告栏设置</div>
        <div class="notice-tow"> <el-button @click="addData" type="primary" size="large">新增</el-button></div>
    </div>
    <div class="form">
        <el-table :data="tableData" border style="width:98%; margin:50px auto;">
            <el-table-column prop="headline" label="标题"></el-table-column>
            <el-table-column prop="startTime" label="有效期从" width="250" align="center"></el-table-column>
            <el-table-column prop="endTime" label="有效期至" width="250" align="center"></el-table-column>
            <el-table-column prop="del" label="状态" width="150" align="center">
                <template #default="scope"> 
                    <el-switch v-model="scope.row.del" class="ml-2" inline-prompt @click="yorn(scope.row.id)" style="--el-switch-on-color:#ff4949 ;
                    --el-switch-off-color:#13ce66" active-text="禁用" inactive-text="启用" />
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="250" align="center">
                <template #default="scope">
                    <div class="button-btn">
                        <el-button class="lef" type="primary" @click="edits(scope.row)">编辑</el-button>
                        <el-button class="rig" type="danger" @click="delan(scope.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="page">
        <div class="block">
            <div class="demo-pagination-block">
                <div class="demonstration"/>
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]"
                    :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { projectfindAll, projectOr, projectDelete } from '@/api/project'
import { ElMessage, ElMessageBox } from 'element-plus'  //确认取消弹出框
const router = useRouter(); //传
const tableData = ref([])
onMounted(() => {
    projectAll()
});
//把时间戳转化成年月日拼接
const transitionChinaDate = (val) => {
    const date = new Date(val)
    const o = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1, 
        D: date.getDate(), 
    }
    let str = o.Y + '-' + o.M + '-' + o.D
    return str
}
// 分頁
const currentPage = ref(1)  //  当前第几页
const pageSize = ref(5)    // 每页显示多少条 
const total = ref(0)      // 所有总数
const background = ref(true)
const handleCurrentChange = () => {  // 点击当前更改页码
    projectAll()
}
const handleSizeChange = () => {     // 每页显示几条  
    currentPage.value = 1       //初始化
    projectAll()
}
// 查询公告
const projectAll = async () => {
    const params = {    //配置分页
        page: currentPage.value - 1,
        size: pageSize.value,
        sort: 'startTime,desc',
    }
    const { result, code, msg } = await projectfindAll(params)
    if (code == 0 && result) { 
        result.content.forEach(v => {
           v.startTime = transitionChinaDate(v.startTime)
           v.endTime = transitionChinaDate(v.endTime)
        });
            total.value = result.totalElements
            // console.log('页码总数',result.totalElements,'result.totalElements', total.value,'total.value');
            tableData.value = result.content
            // console.log(result.content,'字段result.content');
            // console.log(tableData.value,'字段tableData.value');
    } else {
        console.log(msg, '失败');
    }
    
}

// 状态启用/禁用
const yorn = async (id)=>{
    // let res = await projectOr({id:id})
    // console.log(res);
    const {code,msg,result} = await projectOr({id:id})
    if(code == 0 && result){
console.log(msg,result);
    }else{
        console.log(msg);
    }
   
}

// 新增数据
const addData = () => {
    router.push({ path: '/projectedit' ,query:{type:"新增"}})
}
// 编辑跳转
const edits = (item) => {
    // router.push({ path: '/projectedit',query:{type:"编辑", item:JSON.stringify(item)}})//对象转成字符串
    router.push({ path: '/projectedit',query:{type:"编辑", item:item.id}})
}
// 刪除
const delan = async (id) => {
    ElMessageBox.confirm(
        '您确定要删除这条数据吗',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            const { code, msg, result } = await projectDelete({id:id})
            if (code == 0 && result) {
                console.log('删除成功', result);
                projectAll()
            } else {
                console.log('删除失败', msg);
            }

            ElMessage({
                type: 'success',
                message: '已删除',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        }) 
}


</script>



<style lang="less" scoped>

.notice-title {
    position: relative;
    height: 80px;
    background-color: rgb(242, 242, 242);
    display: flex;
    justify-content: space-between;
    // align-items: center;
    box-sizing: border-box;
    ::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
        border-bottom: 1px solid rgb(215, 215, 215);
    }

    .notice-one {
        margin: 12px 21px;
        font-family: SourceHanSansCN-Bold;
        font-size: 20px;
        font-weight: 700;
    
    }

    .notice-tow {
        width: 80px;
        margin-right: 20px;
        margin-top: 20px;
        .el-button {
            width: 100%;
            color: #fff;
        }
    }
}

.button-btn {
    display: flex;
    justify-content: space-between;

    .lef {
        margin-left: 20px;
    }

    .rig {
        margin-right: 20px;
    }
}

.page {
    position: fixed;
    top: 80%;
    left: 45%;
    z-index: 99;
}
</style>