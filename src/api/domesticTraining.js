import { http } from "@/utils/http";
//查询国内培训
export const queryUserDomesticTraining = (params) => {
    return http.request(
      "get",
      "/teacher/domesticTraining/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //新增国内培训
export const addUserDomesticTraining = (data) => {
  return http.request(
    "post",
    "/teacher/domesticTraining/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改国内培训
export const editUserDomesticTraining = (data) => {
  return http.request(
    "post",
    "/teacher/domesticTraining/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除国内培训
export const deleteUserDomesticTraining = (data) => {
  return http.request(
    "post",
    "/teacher/domesticTraining/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};