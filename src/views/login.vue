<script setup>
import {
  setToken
} from '../utils/auth.js'
import {
  userLogin,
  apiPost
} from "@/api/admin";

import {
  ElMessage
} from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = reactive({});
onMounted(() => { });
const formLabelAlign = ref({
  name: "局端管理员",
  role: "bureau_administrator",
  thirdUserId: "ce001"
})
let result1 = [
  { name: '局端管理员', thirdUserId: "ce001", role: "bureau_administrator" },
  { name: '校端管理员', thirdUserId: "ce002", role: "school_administrator" },
  { name: '教师', thirdUserId: "ce003", role: "teacher" },
]
const login = async () => {
  const data = {
    name: formLabelAlign.value.name,
    role: formLabelAlign.value.role,
    sex: "男",
    thirdUserId: formLabelAlign.value.thirdUserId
  }
  const { code, msg, result } = ({} = await userLogin(data));
  if (code === 0) {

    console.log("get api test成功", result);


    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    localStorage.setItem('RoleType', result.teacher.roles[0].code)
    localStorage.setItem('teacherid', result.teacher.id)
    setToken(result.token)
    if (result.teacher.roles[0].code == 'teacher') {
      router.push('/personal')
    } else {
      router.push('/')
    }


  } else {
    console.log("get api test失败", msg);
  }
};
</script>
<template>
  <div class="loginBox flex-d al-center ju-center">
    <el-form label-width="60px" :model="formLabelAlign" style="max-width: 460px">
      <el-form-item la label="姓名">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="formLabelAlign.role" />
      </el-form-item>
      <el-form-item label="用户id">
        <el-input v-model="formLabelAlign.thirdUserId" />
      </el-form-item>
    </el-form>
    <el-button type="primary" class="m-t2 m-l2" @click="login" style="width: 240px;">登录</el-button>
  </div>
</template>



<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 100vh;

  .box {
    width: 300px;
  }
}

.text {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
}
</style>