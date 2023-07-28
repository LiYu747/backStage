import { http } from "@/utils/http";

//查询用户公开课
export const queryUserOpenClass = (params) => {
  return http.request(
    "get",
    "/teacher/openClass/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//新增用户公开课
export const addUserOpenClass = (data) => {
  return http.request(
    "post",
    "/teacher/openClass/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改承担公开课等情况
export const editUserOpenClass = (data) => {
  return http.request(
    "post",
    "/teacher/openClass/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除承担公开课等情况
export const deleteUserOpenClass = (data) => {
  return http.request(
    "post",
    "/teacher/openClass/findByTeacherId",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};