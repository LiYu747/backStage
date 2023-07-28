import { http } from "@/utils/http";

// 根据教师id查询 年度考核结果
export const annualAssessment = (params) => {
  return http.request(
    "get",
    "/teacher/annualAssessment/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

// 根据教师id查询 家庭成员及重要社会关系
export const familyTies = (params) => {
  return http.request(
    "get",
    "/teacher/familyTies/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 师德考核
export const teacherMeritAssess = (params) => {
  return http.request(
    "get",
    "/teacher/teacherMeritAssess/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 处分信息
export const disciplinaryInformation = (params) => {
  return http.request(
    "get",
    "/teacher/disciplinaryInformation/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
