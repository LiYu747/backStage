<template>
    <div>人员</div>
    <div class="information">
        <div class="information_box" v-for="s in list">
            <text class="label">{{ s.label }}:</text>
            <text class="content">{{ s.value }}</text>
        </div>
    </div>
</template>

<script setup>

const arr = ref([])
const props = defineProps({
    formData: {
        type: Array,
        required: true,
    },
})
const  list = ref([]) 
defineExpose({
    add() {
        list.value  = props.formData
    }
})

</script>

<style lang="less" scoped>
.information {
    width: 1500px;
    margin-left: 79px;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;

    .information_box {
        width: 500px;
        line-height: 30px;

        .label {
            // font-weight: 600;
            margin-right: 10px;
        }
    }
}
</style>