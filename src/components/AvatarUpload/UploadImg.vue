<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { uploadHandler } from '@/utils/filesUpload/qiniuUpload'//照片上传
//照片上传
const fileList = ref([])
</script>
<template>
    <div>
        <el-upload class="avatar-uploader" :limit="1" v-model:file-list="fileList" list-type="picture-card" action="#"
            :auto-upload="false" @handleStart="handleStart">
          <template  #file="{ file }">
                <img :src="file.url" class="avatar" />
            </template>
            <el-icon  class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>

<style lang='less' scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>