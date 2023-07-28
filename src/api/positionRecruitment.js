import { http } from "@/utils/http";
//岗位聘任
//查询用户岗位聘任
export const queryUserPositionRecruitment = (params) => {
  return http.request(
    "get",
    "/teacher/positionRecruitment/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//查询用户专业技术职务聘任
export const queryUserTechnicalAppointment = (params) => {
    return http.request(
      "get",
      "/teacher/technicalAppointment/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };

  // 根据教师id查询 担任培训专家情况
  export const expertSituationFindByTeacherId = (params) => {
    return http.request(
      "get",
      "/teacher/expertSituation/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
  // 根据教师id查询 担任评审专家情况
  export const assessmentExpertsFindByTeacherId = (params) => {
    return http.request(
      "get",
      "/teacher/assessmentExperts/findByTeacherId",
      { params },
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };
    // 根据教师id查询 名师工作室负责人情况
    export const teacherWorkRoomFindByTeacherId = (params) => {
      return http.request(
        "get",
        "/teacher/teacherWorkRoom/findByTeacherId",
        { params },
        {
          isNeedFullRes: false, // 是否需要返回完整的响应对象
          isShowLoading: true, // 是否显示loading
          isNeedToken: true, // 是否需要token
        }
      );
    };
     // 根据教师id查询 承担特色课程领衔教师
     export const characteristicCourseTeacher  = (params) => {
      return http.request(
        "get",
        "/teacher/characteristicCourseTeacher/findByTeacherId",
        { params },
        {
          isNeedFullRes: false, // 是否需要返回完整的响应对象
          isShowLoading: true, // 是否显示loading
          isNeedToken: true, // 是否需要token
        }
      );
    };