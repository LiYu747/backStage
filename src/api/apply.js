import { http } from "@/utils/http";

// 新增申请
export const  applySave= (data) => {
  return http.request(
    "post",
    "/teacher/apply/save",
    { data }, 
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//待办列表
export const  backlogFindAll= (params) => {
    return http.request(
      "get",
      "/teacher/apply/findUntreated", 
      { params }, 
      {
        isNeedFullRes: false, // 是否需要返回完整的响应对象
        isShowLoading: true, // 是否显示loading
        isNeedToken: true, // 是否需要token
      }
    );
  };

//审批详情
export const  findByApplyId = (params) => {
  return http.request(
    "get",
    "/teacher/entry/findByApplyId", 
    { params }, 
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//是否通过
export const  isPassAudit = (data) => {
  return http.request(
    "post",
    "/teacher/apply/audit", 
    { data }, 
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//批量审批
export const  batchAudit = (data) => {
  return http.request(
    "post",
    "/teacher/apply/batchAudit", 
    { data }, 
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//根据id查询异步任务
export const  asyncTask = (params) => {
  return http.request(
    "get",
    "/common/asyncTask/findById", 
    { params }, 
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//审核日志Audit log
export const auditLog = (params) => {
  return http.request(
    "get",
    "/teacher/apply/findByApplyId",  
    { params }, 
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//查字典dictionaries
export const findDictionaries = (params) => {
  return http.request(
    "get",
    "/teacher/dict/findByParentId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//根据级别查询地区
export const findByLevel = (params) => {
  return http.request(
    "get",
    "/teacher/area/findByLevel",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 根据父ID询地区
export const findByPid = (params) => {
  return http.request(
    "get",
    "/teacher/area/findByPid",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 已办列表
export const Handled = (params) => {
  return http.request(
    "get",
    "/teacher/apply/findHandled",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 我的报送
export const Initiated = (params) => {
  return http.request(
    "get",
    "/teacher/apply/findInitiated",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 课外详情
export const afterSchoolStaff = (params) => {
  return http.request(
    "get",
    "/teacher/afterSchoolStaff/findByApplyId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
// 调动
export const transfer = (params) => {
  return http.request(
    "get",
    "/teacher/transfer/findByApplyId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

//借调
export const loanedPersonnel = (params) => {
  return http.request(
    "get",
    "/teacher/loanedPersonnel/findByApplyId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//离退
export const retire = (params) => {
  return http.request(
    "get",
    "/teacher/retire/findByApplyId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//长病假
export const sickLeave = (params) => {
  return http.request(
    "get",
    "/teacher/sickLeave/findByApplyId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//产假
export const maternityLeave = (params) => {
  return http.request(
    "get",
    "/teacher/maternityLeave/findByApplyId",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//更新之前
export const findByTeacherId = (teacherName,params) => {
  console.log(teacherName);
  return http.request(
    "get",
    `teacher/${teacherName}/findByTeacherId`,
    {params},
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//更新之后
export const findById = (params) => {
  return http.request(
    "get",
    "/teacher/apply/findById",
    { params },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};
//表格
export const formByTeacherId = (teacherName,params) => {
  return http.request(
    "get",
    `teacher/${teacherName}/findById`,
    {params},
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};

  
  
