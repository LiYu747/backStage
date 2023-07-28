export const personalInformationStore = defineStore(
  "personal",
  () => {
    // 用户名字
    const personalInfo = ref({});

    // 设置用户名字
    const setPersonalInfo = (info) => {
      personalInfo.value = info;
    };
    // 报送接口基本信息的id
    const applyId = ref([
      { id: null },
      { id: null },
      { id: null },
      { id: null },
      { id: null },
    ])
    //设置报送基本信息的id
    const setApplyId = (id, idx) => {
      // console.log('oid',applyId.value);
      // console.log('id, idx: ', id, idx,applyId.value[2].id);
      applyId.value[idx].id = id;
      // console.log('applyId.value: ', applyId.value);
    };
    //给后端传的数据
    const userInfo = ref({})
    //设置给后端传的数据
    const setUserInfo = (info) => {
      userInfo.value = info;
    };
    //新数据
    const newUserInfo = ref({})
    //设置新数据
    const setNewUserInfo= (info) => {
      newUserInfo.value = info;
    };
    return {
      personalInfo,
      setPersonalInfo,
      applyId,
      setApplyId,
      userInfo,
      setUserInfo,
      newUserInfo,
      setNewUserInfo,
    };
  },

  {
    persist: {
      key: "personal-key",
    },
  }
);
