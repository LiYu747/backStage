import { http } from '@/utils/http/index'
import  domain from '@/utils/http/domain'
// https://api.ebag-test.readboy.com/education-cube
// qiniu Token
export const qiniuToken = (params) => {
  return http.request(
    'get',
    `${domain.otherServer}/v1/upload/qiniu/info`, 
    {params},
     {isUpload:true}
  )
} 


