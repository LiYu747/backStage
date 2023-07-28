<template>
    <div class="auth">
        <img class="iconimg" :src="iconimg" />
        <label class="tips-label">{{ tips }}</label>
    </div>
</template>

<script>
import {codeLogin} from "@/api/admin";
import { setLocalStorage } from '@/utils/index.js'
import {removeToken,getToken,setToken,getAuthUrl} from '../utils/auth'
import develop_icon from "@/assets/no-data-icon/loading-html.svg";
import error_icon from "@/assets/no-data-icon/no-permission.svg";
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export default {
  name: "Home",
  components: {},
  data() {
    return {
      iconimg: develop_icon,
      code: "",
      tips: "授权登录中...",
    };
  },
  created() {
    localStorage.clear();
    sessionStorage.clear();
  },
  mounted() {
    let queryInfo = this.$route.query;
    let code1 = GetQueryString("code");
    this.code = code1;

    // let client_id = process.env.VUE_DSL_CLIENTID ? process.env.VUE_DSL_CLIENTID : "1686712036882";
    // let account_center_url = process.env.VUE_DSL_ACCOUNT_CENTER_URL ? process.env.VUE_DSL_ACCOUNT_CENTER_URL : "https://account-center-test.readboy.com";
    let redirect_uri = `${window.location.origin}${window.location.pathname}#/auth`;
    redirect_uri = encodeURIComponent(redirect_uri);
    // let url = `${account_center_url}/v1/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`;

    let url = getAuthUrl();

    if (code1) {
      console.log('授权登录中: ' + redirect_uri);
      this.codeLogin(redirect_uri);
    } else {
      location.href = url;
    }
  },
  methods: {
    // async getTeachInfo(params) {
    //   const { code, result, msg } = await api.getOwnInfo(params);
    //   if (code == 0) {
    //   } else {
    //     console.log(msg);
    //   }
    // },
    async codeLogin() {
      let _self = this;
      let redirect_uri = `${window.location.origin}${window.location.pathname}#/auth`;
      const { code, result, msg } = await codeLogin({
        code: this.code,
        redirectUri: redirect_uri
      });
      if (code == 0 && result.teacher?.roles.length > 0) {
        localStorage.setItem('RoleType', result.teacher.roles[0].code)
        // localStorage.setItem('RoleType', 'teacher')
        localStorage.setItem('dslToken', result.dslToken)
        setToken(result.token)
        setLocalStorage('userInfo', result.teacher)
        let uploadToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwib3JpZ2luIjowLCJpZCI6IjAxMjAzMDM2OTY5NzQwMDg3NTAyIiwibmlja05hbWUiOiLpmYjms73lrociLCJidWZmZXJUaW1lIjo4NjQwMCwiZXhwIjoxNjkxMDUxNzYzLCJpc3MiOiJyZCIsIm5iZiI6MTY5MDQ0NTk2M30.NUOpYNhpH72L2hYM2ofHed5s-s99urYIXXNh8KihUbA"
      //  let uploadToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxNjg2NzEyMDM2ODgyIiwiZXhwIjoxNjg5Njk1NTI1LCJzdWIiOiIzMDMzNzY5NzEwNDU5MjY3In0.r0f29qcKebZUI1mNreqlJSl-rOhG3ZjSePv-lbhGujnHJGGUuxq5DfIsyzqDBKuIK0kJB4vRLIJaNpc-ew3JCA"
        setLocalStorage('uploadToken',uploadToken)
        if (result.teacher.roles[0].code == 'teacher') {
          // router.push('/personal')
          this.$router.replace('/personalTeacher');
        } else {
          // router.push('/')
          this.$router.replace('/index');
        }
        
      } else {
        _self.iconimg = error_icon;
        _self.tips = `您当前暂无权限访问此页面，请联系学校管理员授权[ERROR:${code}]`;
      }
    }
  },
};
</script>

<style lang="less" scoped>
.auth {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.iconimg {
  height: 275px;
  width: 275px;
}
.tips-label {
  font-size: 24px;
  margin-top: 0.5rem;
  color: #d6d6d6;
}
</style>
