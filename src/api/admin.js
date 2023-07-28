import { http } from "@/utils/http";
//登录获取token
export const userLogin = (data) => {
  return http.request(
    "post",
    "/teacher/login",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: false, // 是否需要token
    }
  );
};

export const codeLogin = (data) => {
  return http.request(
    "post",
    "/teacher/loginByCode",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: false, // 是否需要token
    }
  );
};

export const apiPost = (data) => {
  return http.request(
    "post",
    "/back/galleryType/findAll",
    { data },
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
    }
  );
};


