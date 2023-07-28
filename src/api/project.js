import { http } from "@/utils/http";
//  显示所有公告栏
export const projectfindAll = (params) => {
  return http.request(
    "get",
    "/teacher/announcement/findAll",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//  显示所有启用公告
export const findAllByDel = (params) => {
  return http.request(
    "get",
    "/teacher/announcement/findAllByDel",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//  新增公告
export const projectAdd = (data) => {
  return http.request(
    "post",
    "/teacher/announcement/save",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//  根据ID删除公告
export const projectDelete = (data) => {
  return http.request(
    "post",
    "/teacher/announcement/deleteById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//   显示启用的公告栏
export const projectEnable = (params) => {
  return http.request(
    "get",
    "/teacher/announcement/findAllByDel",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//   根据ID修改一条公告
export const projectModify = (data) => {
  return http.request(
    "post",
    "/teacher/announcement/updateById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//   停用或启用一条公告栏
export const projectOr = (data) => {
  return http.request(
    "post",
    "/teacher/announcement/updateDelById",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//  我的待办
export const findToDo = (params) => {
  return http.request(
    "get",
    "/teacher/statistics/homePage/findToDo",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

// 根据ID查询公告
export const findById = (params) => {
  return http.request(
    "get",
    "/teacher/announcement/findById",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
