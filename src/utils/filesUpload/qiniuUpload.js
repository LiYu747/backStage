import { qiniuToken } from "../../api/upload/upload";
import * as QiNiu from "qiniu-js";
import { ElLoading } from 'element-plus'

// 需用户登录，头部携带token请求
// 获取七牛token
const getUploadToken2 = async function () {
  // store.state.userInfo.id ||
  const result = await qiniuToken({  
    F_uid:"01202877352560015375",
    F_file_count: 1,
  });
  if (result && result.F_responseNo === 10000) {
    return result;
  } else {
    throw new Error("暂未登录");
  }
};

const getUploadToken = async function () {
  // store.state.userInfo.id ||
  const result ={
    "F_base_key": "zhuji/education/cube/",
    "F_resource_domain": "https://rbebag-zy-test.strongwind.cn",
    "F_resource_ids": [
        "01203052643940028962" 
    ],
    "F_responseMsg": "成功",
    "F_responseNo": 10000,
    "F_upload_token": "lc9DXtSdiV3WA6N5-h7r3OGyOBIE0P-lJApRXpMt:uhuir5bjOfcIzBTk2LHpA077GY8=:eyJzY29wZSI6InJiLWViYWctdGVzdCIsImRlYWRsaW5lIjoxNjg1Nzc2Nzk0LCJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcIm1pbWVUeXBlXCI6XCIkKG1pbWVUeXBlKVwiLFwiZnNpemVcIjokKGZzaXplKSxcImZuYW1lXCI6XCIkKGZuYW1lKVwifSJ9"
};
 
  if (result && result.F_responseNo === 10000) {
    return result;
  } else {
    throw new Error("暂未登录");
  }
};
// 上传文件
export const uploadHandler = async function (
  file,
  options,
  onSpeed = () => {}
) {
  // onSpeed : 上传进度，回调
  let params = {
    path: "educational-feedback/", // 自定义路径 如：educational-feedback/
    putExtra: { mimeType: file.type },
    config: null,
    width: 1600,
    height: 900,
    min: 1,
    video: false,
  };
  params = { ...params, ...options };
  let token = null;
  try {
    token = await getUploadToken2();
  } catch (err) {
    // return Promise.reject(new Error('暂未登录'));
    throw new Error('暂未登录');
  }
  // console.log(token);

  // if (!token) return Promise.reject(new Error('暂未登录'));
  const { F_resource_domain, F_base_key, F_upload_token, F_resource_ids } = token;
  const observable = QiNiu.upload(
    file,
    `${F_base_key}${params.path}${F_resource_ids[0]}.${file.name.split('.').pop()}`,
    F_upload_token,
    params.putExtra,
    params.config
  );
  console.log('observable--', observable);
  const loading  = ElLoading.service({
    lock: true,
    text: '上传中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  return new Promise((resole, reject) => {
    observable.subscribe(
      (next) => {
        // console.log('上传中--', next);
        onSpeed(next);
        
      },
      (error) => {
        loading.close()
        // console.log('上传错误--', error);
        reject(error);
      },
      (data) => {
        loading.close()
        // console.log('成功----', data);
        resole({
          name: file.name,
          size: data.fsize,
          type: data.mimeType,
          url: `${F_resource_domain}/${data.key}`,
          cover: params.video
            ? `${F_resource_domain}/${data.key}?vframe/jpg/offset/${params.min}/w/${params.width}/h/${params.height}/`
            : "",
        });
     
      }
    );
  });
};

// 浙里办上传拍照和图片
export const ZlbUploadPhoto = async function () {
  return new Promise((resole, reject) => {
    ZWJSBridge.onReady(() => {
      ZWJSBridge.chooseImage({ upload: false })
        .then((result) => {
          resole(result);
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    });
  });
};
