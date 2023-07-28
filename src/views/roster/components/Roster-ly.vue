<template>
  <div>
    <div class="flex flex-w">
      <div
        v-for="(item, index) in formData"
        class="flex al-center m-b1"
        :style="{ width: item.iptWid }"
        :key="index"
      >
        <div class="itemName">{{ item.name }}</div>
        <div class="itemStyle">
          <component
            v-if="item.type === 'input'"
            :disabled="item.disabled"
            v-model="item.value"
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            :label="item.title"
          />
          <component
            v-else-if="item.type === 'cascader'"
            style="width: 100%"
            :show-all-levels="false"
            :props="{
              label: item.opttitle == 'one' ? 'name' : 'title',
              value: item.opttitle == 'one' ? 'name' : 'title',
              checkStrictly: true,
            }"
            v-model="item.value"
            :is="`el-${item.type}`"
            :options="item.opt"
            :disabled="item.disabled"
            :label="item.title"
            clearable
          />
          <component
            v-else-if="item.type === 'select'"
            v-model="item.value"
            :is="`el-${item.type}`"
            :disabled="item.disabled"
            :label="item.title"
            clearable 
          >
            <el-option
              v-for="(opt,index) in item.opt"
              :key="index"
              :label="opt.name"
              :value="opt.name"
            />
          </component>
          <component
            prefix-icon="none"
            v-model="item.value"
            :disabled-date="disabledDate"
            type="date"
            :editable="false"
            :clearable="true"
            v-else-if="item.type === 'date-picker'"
            :is="`el-${item.type}`"
            :label="item.title"
          >
          </component>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const disabledDate = (time) => {
  return props.isDisabled ? false : time.getTime() > Date.now();
};
const data = reactive({});
const props = defineProps({
  formData: {
    type: Array,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
watch(
  () => props.formData,
  () => {
    console.log(
      "🚀 ~ file: Roster-ly.vue:34 ~ props.formData:",
      props.formData
    );
  },
  {
    immediate: true,
  }
);
onMounted(() => {});
</script>



<style lang="less" scoped>
.itemStyle {
  width: 140px;
}

.itemName {
  padding: 0 10px;
}

:deep(.el-input__prefix) {
  width: 0;
}
</style>