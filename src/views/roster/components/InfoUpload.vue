<template>
    <div>
        <el-dialog v-model="Visible" align-center title="导入数据" width="50%" center>
            <el-upload class="upload-demo" :auto-upload="false" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple v-model:file-list="fileList">
                <el-icon class="el-icon--upload">
                    <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                    点击上传或拖动至此处
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        上传文件
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="Visible = false">取消</el-button>
                    <el-button type="primary" >
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
    import {
        UploadFilled
    } from '@element-plus/icons-vue'
    import {
        uploadHandler
    } from '@/utils/filesUpload/qiniuUpload'
    const data = reactive({});
    const fileList = ref([])
    const submit = () => {
        console.log(fileList.value);
        return
        uploadHandler(file.file, {}, function (speed) {
            console.log('onspeed', speed);
            showLoadingToast({
                message: '上传中...',
                forbidClick: true,
                duration: 0
            });
        }).then(function (data) {
            console.log('then', data);
            data.fileType = checkUrlType(data.url)
            fileList.value.push(data);
            closeToast()
        }).catch(function (err) {
            closeToast()
            showToast({
                message: '上传失败',
                iconSize: '5.6vw',
                icon: 'clear',
            });
            console.log('catch', err);
        });
    }
    const Visible = ref(false)
    defineExpose({
        add() {
            Visible.value = !Visible.value
        }
    })
    onMounted(() => {});
</script>



<style lang="less" scoped>
</style>