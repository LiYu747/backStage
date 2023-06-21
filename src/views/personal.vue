<script setup>
import { ref, reactive, onMounted } from 'vue'
import { teacherPersonalInfoENUM, organizationENUM, tableList } from "@/utils/enum"
onMounted(() => {

})
const data = reactive({
    teacherInfoList: [
        { category: "基本信息" },
        { category: "教育教学" },
        { category: "学习经历" },
        { category: "工作经历" },
        { category: "岗位聘任信息" },
        { category: "考核信息" },
        { category: "资格证" },
        { category: "奖励荣誉" },
        { category: "著作专利" },
        { category: "家庭信息" },
        { category: "师德信息" },
    ]
})

const goNotice = () => {
    console.log("系统公告");
}
const goSubmitted = () => {
    console.log("我的报送");
}
const Edit = () => {
    console.log("编辑");
}
const Submitted = () => {
    console.log("报送");
}

</script>
<template>
    <div class="personal">
        <div class="personal_header">
            <div class="personal_header_title">
                首页
            </div>
            <div class="personal_header_btn">
                <el-button type="primary" @click="goNotice">系统公告</el-button>
                <el-button type="primary" @click="goSubmitted">我的报送</el-button>
            </div>
        </div>
        <div class="personal_content">
            <div class="personal_list">
                <el-table :data="data.teacherInfoList" border :show-header="false" style="width:180px">
                    <el-table-column align="center" prop="category" width="180" />
                </el-table>
            </div>
            <div class="personal_baseInfo">
                <div class="personal_baseInfo_title">基本信息</div>
                <div class="info_box">
                    <div class="personal_personalInfo_title">个人信息</div>
                    <div>
                        <el-button @click="Edit">编辑</el-button>
                        <el-button @click="Submitted">报送</el-button>
                    </div>
                </div>
                <div class="personal_table">
                    <el-descriptions border :column="2">
                        <el-descriptions-item v-for="(item, index) in teacherPersonalInfoENUM" :key="item.id"
                            :label="item.label" align="center">{{ item.value }}</el-descriptions-item>
                    </el-descriptions>
                </div>
                <ShowList v-for="(item, index) in organizationENUM" :key="index" :info="item.title" :List="item.children" />
                <Table v-for="(item, index) in tableList" :key="index" :title="item.title" :tableData="item.children" />
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.personal {
    width: 100%;

    .personal_header {
        margin: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .personal_header_title {
            width: 180px;
            text-align: center;
        }

        .personal_header_btn {
            display: flex;
        }
    }

    .personal_content {
        display: flex;
        margin: 0 10px;

        .personal_baseInfo {
            display: flex;
            flex: 1;
            flex-direction: column;

            .personal_baseInfo_title {
                margin-left: 6px;
                font-size: 20px;
                font-weight: bold;
            }

            .info_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 10px;

                .personal_personalInfo_title {
                    position: relative;
                    margin-left: 22px;
                    font-size: 16px;
                }

                .personal_personalInfo_title::before {
                    position: absolute;
                    content: "";
                    left: -10px;
                    top: 4px;
                    width: 3px;
                    height: 14px;
                    background-color: #666;
                }
            }

            .personal_table {
                margin-top: 10px;
            }
        }
    }
}
</style>