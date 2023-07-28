import { http } from '@/utils/http/index'
import  domain from '@/utils/http/domain'
// https://api.ebag-test.readboy.com/education-cube
// qiniu Token
export const qiniuToken = (params) => {
  return http.request(
    'get',
    `${domain.otherServer}/v1/upload/qiniu/info`, 
    {params},
    {
      isNeedFullRes: false, // 是否需要返回完整的响应对象
      isShowLoading: true, // 是否显示loading
      isNeedToken: true, // 是否需要token
      isUpload:true
    },
  )
} 


