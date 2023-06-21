<template>
    <div class="area-component">
        <!-- 省 -->
        <el-select placeholder="请选择省份" v-model="data.province" clearable>
            <el-option v-for="item in province" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        <!-- 市 -->
        <el-select placeholder="请选择城市" style="margin: 0 10px;" :disabled="!data.province"
            v-model="data.city" clearable>
            <el-option v-for="item in cities" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        <!-- 区 -->
        <el-select placeholder="请选择区" :disabled="!data.province || !data.city"
            v-model="data.area" clearable>
            <el-option v-for="item in areas" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
    </div>

</template>
<script setup>
const data = reactive({
    province:"",
    city:"",
    area:"",
});
onMounted(() => {});
</script>



<style lang="less" scoped>
</style>