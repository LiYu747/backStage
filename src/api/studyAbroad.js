import { http } from "@/utils/http";
//根据教师id查询 海外研修
export const queryUserStudyAbroad = (params) => {
    return http.request(
        "get",
        "/teacher/studyAbroad/findByTeacherId",
        { params },
        {
            isNeedFullRes: false, // 是否需要返回完整的响应对象
            isShowLoading: true, // 是否显示loading
            isNeedToken: true, // 是否需要token
        }
    );
};
//新增海外研修
export const addUserStudyAbroad = (data) => {
    return http.request(
        "post",
        "/teacher/studyAbroad/save",
        { data },
        {
            isNeedFullRes: false, // 是否需要返回完整的响应对象
            isShowLoading: true, // 是否显示loading
            isNeedToken: true, // 是否需要token
        }
    );
};
//修改海外研修
export const editUserStudyAbroad = (data) => {
    return http.request(
        "post",
        "/teacher/domesticTraining/update",
        { data },
        {
            isNeedFullRes: false, // 是否需要返回完整的响应对象
            isShowLoading: true, // 是否显示loading
            isNeedToken: true, // 是否需要token
        }
    );
};
//删除海外研修
export const deleteUserStudyAbroad = (data) => {
    return http.request(
        "post",
        "/teacher/domesticTraining/deleteById",
        { data },
        {
            isNeedFullRes: false, // 是否需要返回完整的响应对象
            isShowLoading: true, // 是否显示loading
            isNeedToken: true, // 是否需要token
        }
    );
};