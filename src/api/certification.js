import { http } from "@/utils/http";

// 根据教师id查询 教师资格
export const teacherCertification = (params) => {
  return http.request(
    "get",
    "/teacher/teacherCertification/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据教师id查询 教师资格证认定信息
export const teacherCertificationAffirm = (params) => {
    return http.request(
      "get",
      "/teacher/teacherCertificationAffirm/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  // 根据教师id查询 培训学时记录
export const trainingHours = (params) => {
    return http.request(
      "get",
      "/teacher/trainingHours/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
    // 根据教师id查询 证书信息
export const certificateInformation = (params) => {
    return http.request(
      "get",
      "/teacher/certificateInformation/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
      // 根据教师id查询 社会体育指导员证书
export const societySportsGuidanceCertificate = (params) => {
    return http.request(
      "get",
      "/teacher/societySportsGuidanceCertificate/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
        // 根据教师id查询 社会体育指导员技术等级培训信息
export const societySportsGuidanceTrainMessage = (params) => {
    return http.request(
      "get",
      "/teacher/societySportsGuidanceTrainMessage/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
 // 根据教师id查询 等级裁判员信息
export const refereeInformation = (params) => {
    return http.request(
      "get",
      "/teacher/refereeInformation/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
   // 根据教师id查询 国家医药证书
export const nationMedicineCertificate = (params) => {
    return http.request(
      "get",
      "/teacher/nationMedicineCertificate/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
     // 根据教师id查询 国家标准或行业标准
export const governmentStandard = (params) => {
    return http.request(
      "get",
      "/teacher/governmentStandard/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
       // 根据教师id查询 语言能力
export const languageCapacity = (params) => {
    return http.request(
      "get",
      "/teacher/languageCapacity/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };