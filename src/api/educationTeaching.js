import { http } from "@/utils/http";
//查询教育教学
export const queryUserEducationTeaching = (params) => {
    return http.request(
      "get",
      "/teacher/educationTeaching/findById",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //根据学期id集合查询教育教学
  export const queryUserEducationSemesterIds = (params) => {
    return http.request(
      "get",
      "/teacher/educationTeaching/findAllBySemesterIds",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //新增教育教学
export const addUserEducationTeaching = (data) => {
  return http.request(
    "post",
    "/teacher/educationTeaching/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改教育教学
export const editUserEducationTeaching = (data) => {
  return http.request(
    "post",
    "/teacher/educationTeaching/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除教育教学
export const deleteUserEducationTeaching = (data) => {
  return http.request(
    "post",
    "/teacher/educationTeaching/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

