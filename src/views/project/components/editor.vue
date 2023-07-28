<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { uploadHandler } from '@/utils/filesUpload/qiniuUpload'
import {paratextStore} from '@/store/paratext'
const storetext = paratextStore();
const {userparatext} = storeToRefs(storetext)


const props = defineProps({
  showType: {
    type: String,
    default: 'edit',
  },
  showDlg: {
    type: Boolean,
    default: false,
  },
  echoData:{
    type:String,
    default:'',
  }
})

const emit = defineEmits(['userparat'])


const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');

// 模拟 ajax 异步获取内容
onMounted(() => {
  // userparatext.value = valueHtml.value
  // console.log( userparatext.value);
});
const contEditor = ref()      //图片上传
const handleUpload = (file,insertFn)=>{
  // console.log("file",file)

  uploadHandler(file, {}).then((data) => {
        console.log('data', data);
        contEditor.value = data.url
        // 添加视频封面
        console.log(data.url);
        const postCover = `${data.url}?vframe/jpg/offset/1/w/1000/h/675`
        insertFn(data.url,postCover)
    })


}
const toolbarConfig = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "请输入内容...",
MENU_CONF: {
        uploadImage: {   //上传图片配置
          customUpload: handleUpload, //上传接口地址
          // fieldName: 'file', //上传文件名
          // methods: 'post',
          // metaWithUrl: true, // 参数拼接到 url 上
          
        },
        uploadVideo: {  //上传视频配置
          customUpload: handleUpload
        }
      }
    }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});



const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  // valueHtml.value = props.echoData
  valueHtml.value =  props.echoData
  // console.log( editor)
//   editor.config.customUploadImg = function (resultFiles, insertImgFn) {
//     // resultFiles 是 input 中选中的文件列表
//     // insertImgFn 是获取图片 url 后，插入到编辑器的方法

//     // 上传图片，返回结果，将图片插入到编辑器中
//     console.log("resultFiles",resultFiles)
//     // insertImgFn(imgUrl)
// }
};
const test = ()=>{
  console.log(valueHtml)
}
const handleChange = (editor) => {
  
  // console.log(valueHtml.value);
  // console.log(props.echoData);
  // let  userparatext = editor.getHtml().replace(/<[^>]+>/g, "")
  let  userparatext = editor.getHtml()
      // console.log('change:', editor.getHtml());
      // console.log(userparatext);
      emit('userparat', userparatext)
    };

// editorConfig.MENU_CONF['uploadImage'] = {
//     // 上传图片的配置，必填，否则上传图片会报错。
//     server: '/api/upload',
// }
</script>

<template>
  <el-card shadow="never"  style="width: 99%;
    height: 500px;  overflow: auto">
    <div class="wangeditor">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 400px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onChange="handleChange"
        @onCreated="handleCreated"
      />
    </div>
    <div>
    </div>
  </el-card>
</template>
