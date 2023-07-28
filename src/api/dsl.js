import { http } from "@/utils/http";
import domain from "@/utils/http/domain";
const { eduAdminServer,accountCenterServer } = domain;
import Axios from "axios";

//查询学期列表 
export const getSemester = (params) => {
    return Axios({
      method: 'get',
      url: `${eduAdminServer}/api/v1/u/school/semester`,
      params: params,
      headers: {
        'Authorization': localStorage.getItem('dslToken')
      }
    });
};

//根据字典类型查询字典数据
export const queryDictByType = (params) => { 
    return Axios({
      method: 'get',
      url: `${eduAdminServer}/api/v1/u/dict/value/query-list-by-type`,
      params: params,
      headers: {
        'Authorization': localStorage.getItem('dslToken')
      }
    });
};

//退出登录
export const logout = (params) => {
    return Axios({
      method: 'post',
      url: `${accountCenterServer}/v1/sso/logout`,
      params: params,
      headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('dslToken')
      }
    });
};
// 根据学校id查询年级
export const gradeSchoolId = (schoolId) => { 
  return Axios({
    method: 'get',
    url: `${eduAdminServer}/api/v1/u/school/grade/${schoolId}`,
    headers: {
      'Authorization':'Bearer ' +  localStorage.getItem('dslToken')
    }
  });
};
// 查询班级列表
export const classEduClass = (params) => { 
  return Axios({
    method: 'get',
    url: `${eduAdminServer}/api/v1/u/school/class`,
    params: params,
    headers: {
      'Authorization':'Bearer ' +  localStorage.getItem('dslToken')
    }
  });
};
// 通过学校id获取学段
export const schoolStage = (params) => { 
  return Axios({
    method: 'get',
    url: `${eduAdminServer}/api/v1/u/organization/school/stage`,
    params: params,
    headers: {
      'Authorization':'Bearer ' +  localStorage.getItem('dslToken')
    }
  });
};


//读书郎  接口  查询部门和用人单位
export const organization_Arr =  (params) => {
  return Axios({
    method: 'get',
    url: `${eduAdminServer}/api/v1/o/organization/tree`,
    params: params,
    headers: {
      'Authorization':'Bearer ' +  localStorage.getItem('dslToken')
    }
  });
};