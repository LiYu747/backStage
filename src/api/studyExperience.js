import { http } from "@/utils/http";
//根据教师id查询学习经历
export const queryUserStudyExperience = (params) => {
    return http.request(
      "get",
      "/teacher/studyExperience/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  //新增学习经历
export const addUserStudyExperience = (data) => {
  return http.request(
    "post",
    "/teacher/studyExperience/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改学习经历
export const editUserStudyExperience = (data) => {
  return http.request(
    "post",
    "/teacher/studyExperience/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除学习经历
export const deleteUserStudyExperience = (data) => {
  return http.request(
    "post",
    "/teacher/studyExperience/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};