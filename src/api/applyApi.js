import { http } from "@/utils/http";
//申请报送接口
export const UserApplyInfo = (data) => {
    return http.request(
      "post",
      "/teacher/apply/save",
      { data },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };