import { http } from "@/utils/http";
//查询承担市外支教任务情况
export const queryUserSupportEducation = (params) => {
    return http.request(
      "get",
      "/teacher/supportEducation/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //新增承担市外支教任务情况
export const addUserSupportEducation = (data) => {
  return http.request(
    "post",
    "/teacher/supportEducation/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改承担市外支教任务情况
export const editUserSupportEducation = (data) => {
  return http.request(
    "post",
    "/teacher/supportEducation/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除承担市外支教任务情况
export const deleteUserSupportEducation = (data) => {
  return http.request(
    "post",
    "/teacher/supportEducation/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};