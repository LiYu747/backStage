import { http } from "@/utils/http";

//根据父Id查询字典
export const queryUserParentId = (params) => {
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

//根据节点Id查询字典
export const queryUserNodeId = (params) => {
    return http.request(
        "get",
        "/teacher/dict/findByNodeId",
        { params },
        {
            isNeedFullRes: false, // 是否需要返回完整的响应对象
            isShowLoading: true, // 是否显示loading
            isNeedToken: true, // 是否需要token
        }
    );
};

//根据节点Id查询地区
export const queryAreaFindById = (params) => {
    return http.request(
        "get",
        "/teacher/area/findById",
        { params },
        {
            isNeedFullRes: false, // 是否需要返回完整的响应对象
            isShowLoading: true, // 是否显示loading
            isNeedToken: true, // 是否需要token
        }
    );
};

//根据级别查询地区
export const queryAreaFindByLevel = (params) => {
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

//根据父ID询地区
export const queryAreaFindByPid = (params) => {
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

//读书郎查询部门和用人单位
export const queryOrganizationTree =  (params) => {
    return http.request(
        "get",
        "/dsl/organization/organizationTree",
        { params },
        {
            isNeedFullRes: false, // 是否需要返回完整的响应对象
            isShowLoading: true, // 是否显示loading
            isNeedToken: true, // 是否需要token
        }
    );
};
//读书郎查询省市区

