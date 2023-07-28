<template>
    <el-result title="404" sub-title="Sorry, request error">
        <template #icon>
            <el-result icon="warning">
            </el-result>
        </template>
        <template #extra>
            <el-button type="primary" @click="Back">返回首页</el-button>
        </template>
    </el-result>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()



const Back=()=>{
    let RoleType =  localStorage.getItem('RoleType')
    if(RoleType=='teacher'){
        router.push('/personalTeacher')
    }else{
        router.push('/index')
    }
    
}
// const data = [{
//     "id": 1, "name": "北京市", "provinceID": "110000000000",
//     "children": [{
//         "id": 1, "name": "市辖区", "cityID": "110100000000", "provinceID": "110000000000",
//         "children": [{ "id": 1, "name": "东城区", "cityID": "110100000000", "areaID": "110101000000",children:[]},
//         ]
//     }]
// }]


// const modifiedData = data.map((item) => {
//     const { city, area, ...rest } = item;
//     rest.children = city.map((cityItem) => {
//         const { area, ...cityRest } = cityItem;
//         cityRest.children = area;
//         return cityRest;
//     });
//     return rest;
// });

// console.log(modifiedData);

</script>

<style lang="less" scoped></style>