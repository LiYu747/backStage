import { http } from "@/utils/http";

  //退出登录
export const outLogin = (data) => {
  return http.request(
    "post",
    "/common/logouting",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
