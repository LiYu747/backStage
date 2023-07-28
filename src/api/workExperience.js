import { http } from "@/utils/http";

//查询用户工作经历
export const queryUserWorkExperience = (params) => {
  return http.request(
    "get",
    "/teacher/workExperience/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//新增用户工作经历
export const addUserWorkExperience = (data) => {
  return http.request(
    "post",
    "/teacher/workExperience/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改工作经历情况
export const editUserWorkExperience = (data) => {
  return http.request(
    "post",
    "/teacher/workExperience/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除工作经历情况
export const deleteUserWorkExperience = (data) => {
  return http.request(
    "post",
    "/teacher/workExperience/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//查询用户交流轮岗
export const queryUserWorkShift = (params) => {
    return http.request(
      "get",
      "/teacher/workShift/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //新增用户交流轮岗
  export const addUserWorkShift = (data) => {
    return http.request(
      "post",
      "/teacher/workShift/save",
      { data },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //修改交流轮岗情况
  export const editUserWorkShift = (data) => {
    return http.request(
      "post",
      "/teacher/workShift/update",
      { data },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //删除交流轮岗情况
  export const deleteUserWorkShift = (data) => {
    return http.request(
      "post",
      "/teacher/workShift/deleteById",
      { data },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };