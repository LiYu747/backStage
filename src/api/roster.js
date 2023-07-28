import { http } from "@/utils/http";

// 查询所有花名册信息
export const findAllRoster = (data) => {
  return http.request(
    "post",
    "/teacher/roster/findAll",
    { data },
  );
};
// 条件查询花名册信息
export const findCondition = (data) => {
    return http.request(
      "post",
      "/teacher/roster/find",
      { data },
    );
  };
  
// 根据关键字查询个人信息
export const findByKeyword = (params) => {
  return http.request(
    "get",
    "/teacher/staff/findByKeyword",
    { params },
  );
};

// 花名册条件查询
export const rosterFindBy = (data) => {
  return http.request(
    "post",
    `/teacher/roster/findBy?page=${data.page}&size=${data.size}`,
    { data },
  );
};

// 筛选条件方案删除
export const deleteById = (data) => {
  return http.request(
    "post",
    `/teacher/queryPlan/deleteById`,
    { data },
  );
};

// 花名册条件保存
export const queryPlanSave = (data) => {
  return http.request(
    "post",
    `/teacher/queryPlan/save`,
    { data },
  );
};
// 获取筛选条件方案
export const findByTeacherId = (params) => {
  return http.request(
    "get",
    "/teacher/queryPlan/findByTeacherId",
    { params },
  );
};

// 查询组织机构
export const organizationTree = (params) => {
  return http.request(
    "get",
    "/dsl/organization/organizationTree",
    { params },
  );
};

// 查询省市区
export const findRegion = (params) => {
  return http.request(
    "get",
    "/dsl/organization/findRegion",
    { params },
  );
};
// 获取导入名单
export const findByAsyncTaskId = (params) => {
  return http.request(
    "get",
    "/teacher/roster/findByAsyncTaskId",
    { params },
  );
};
// 名单校验
export const listVerification = (data) => {
  return http.request(
    "post",
    "/teacher/roster/listVerification",
    { data },
  );
};
// 导入名单
export const importList = (data) => {
  return http.request(
    "post",
    "/teacher/roster/importList",
    { data },
  );
};
// 条件查询不分页
export const findAllBy = (data) => {
  return http.request(
    "post",
    "/teacher/roster/findAllBy",
    { data },
  );
};




