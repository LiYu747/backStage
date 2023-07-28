import { http } from "@/utils/http";

// 根据教师id查询 教师的项目(课题)
export const projectTopic = (params) => {
  return http.request(
    "get",
    "/teacher/projectTopic/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 骨干教师情况
export const backboneTeacher = (params) => {
  return http.request(
    "get",
    "/teacher/backboneTeacher/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 指导学生参加获奖
export const instructStudentsAward = (params) => {
  return http.request(
    "get",
    "/teacher/instructStudentsAward/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 奖励
export const award = (params) => {
  return http.request(
    "get",
    "/teacher/award/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 荣誉称号
export const honoraryTitle = (params) => {
  return http.request(
    "get",
    "/teacher/honoraryTitle/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 班主任荣誉
export const classTeacherHonor = (params) => {
  return http.request(
    "get",
    "/teacher/classTeacherHonor/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询  先进班集体荣誉
export const advancedClass = (params) => {
  return http.request(
    "get",
    "/teacher/advancedClass/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询  入选人才项目
export const talentProject = (params) => {
  return http.request(
    "get",
    "/teacher/talentProject/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询  著作
export const production = (params) => {
  return http.request(
    "get",
    "/teacher/production/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询  论文案例
export const thesisCase = (params) => {
  return http.request(
    "get",
    "/teacher/thesisCase/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询  文艺作品
export const literaryWorks = (params) => {
  return http.request(
    "get",
    "/teacher/literaryWorks/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询  专利或软件著作权
export const patent = (params) => {
  return http.request(
    "get",
    "/teacher/patent/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询  咨询报告或研究报告
export const studyReport = (params) => {
  return http.request(
    "get",
    "/teacher/studyReport/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
