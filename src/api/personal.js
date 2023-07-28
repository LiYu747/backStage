import { http } from "@/utils/http";

//查询用户基本信息之个人信息
export const queryUserPersonalInfo = (params) => {
  return http.request(
    "get",
    "/teacher/staff/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//新增用户基本信息之个人信息
export const addUserPersonalInfo = (data) => {
  return http.request(
    "post",
    "/teacher/staff/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//根据teacherId查询个人简单信息
export const findTeacherSimpleByTeacherId = (params) => {
  return http.request(
    "get",
    "/teacher/staff/findTeacherSimpleByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改用户基本信息之个人信息
export const editUserPersonalInfo = (data) => {
  return http.request(
    "post",
    "/teacher/staff/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除用户基本信息之个人信息
export const deleteUserPersonalInfo = (data) => {
  return http.request(
    "post",
    "/teacher/staff/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//查询用户基本信息之编制信息
export const queryUserAuthorizedStrengthInfo = (params) => {
  return http.request(
    "get",
    "/teacher/authorizedStrength/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//新增用户基本信息之编制信息
export const addUserAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/authorizedStrength/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改用户基本信息之编制信息
export const editUserAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/authorizedStrength/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除用户基本信息之编制信息
export const deleteUserAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/authorizedStrength/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};


//查询用户基本信息之在编信息
export const queryUserInAuthorizedStrengthInfo = (params) => {
  return http.request(
    "get",
    "/teacher/inAuthorizedStrength/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//新增用户基本信息之在编信息
export const addUserInAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/inAuthorizedStrength/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改用户基本信息之在编信息
export const editUserInAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/inAuthorizedStrength/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除用户基本信息之在编信息
export const deleteUserInAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/inAuthorizedStrength/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//查询用户基本信息之非编信息
export const queryUserNotAuthorizedStrengthInfo = (params) => {
  return http.request(
    "get",
    "/teacher/notAuthorizedStrength/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//新增用户基本信息之非编信息
export const addUserNotAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/notAuthorizedStrength/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改用户基本信息之非编信息
export const editUserNotAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/notAuthorizedStrength/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除用户基本信息之非编信息
export const deleteUserNotAuthorizedStrengthInfo = (data) => {
  return http.request(
    "post",
    "/teacher/notAuthorizedStrength/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//查询用户基本信息之其他信息
export const queryUserElseMessageInfo = (params) => {
  return http.request(
    "get",
    "/teacher/elseMessage/findByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//新增用户基本信息之其他信息
export const addUserElseMessageInfo = (data) => {
  return http.request(
    "post",
    "/teacher/elseMessage/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//修改用户基本信息之其他信息
export const editUserElseMessageInfo = (data) => {
  return http.request(
    "post",
    "/teacher/elseMessage/update",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//删除用户基本信息之其他信息
export const deleteUserElseMessageInfo = (data) => {
  return http.request(
    "post",
    "/teacher/elseMessage/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//根据teacherId查询简介信息
export const queryUserElseInfo = (params) => {
  return http.request(
    "get",
    "/teacher/staff/findIntroductionModelByTeacherId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

