
export const useCollectStore = defineStore(
  'collect',
  () => {
    // 收藏列表
    const collectList = ref([])

    /**
     * 直接设置收藏列表
     */
    const setCollectList = (list = []) => {
      collectList.value = list
    }
    /**
     * 添加收藏
     * @item {Object} 收藏对象
     * @fields {Array} 比较字段
     */
    const addCollect = (item, fields = ['path']) => {
      if (!Array.isArray(fields)) {
        fields = [fields]
      }
      const index = collectList.value.findIndex((i) => {
        let isSame = false
        fields.forEach((field) => {
          if (i[field] === item[field]) {
            isSame = true
          }
        })
        return isSame
      })
      if (index === -1) {
        collectList.value.push(item)
      }
    }
    /**
     * 删除收藏
     * @val {String} 收藏对象的值
     * @field {String} 比较字段
     */
    const removeCollect = (val, field = 'path') => {
      
      const index = collectList.value.findIndex((i) => {
        return i[field] === val
      })
      if (index !== -1) {
        collectList.value.splice(index, 1)
      }
    }
    // 清空收藏
    const clearCollect = () => {
      collectList.value = []
    }
    /**
     * 判断是否收藏
     * @val {String} 收藏对象的值
     * @field {String} 比较字段
     */
    const isCollect = (val, field = 'id') => {
      const index = collectList.value.findIndex((i) => {
        return i[field] === val
      })
      return index !== -1
    }

    return {
      collectList,
      setCollectList,
      addCollect,
      removeCollect,
      clearCollect,
      isCollect,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'collect-key',
          storage: {
            // 存储方式定义
            getItem: (key) => uni.getStorageSync(key), // 获取
            setItem: (key, value) => uni.setStorageSync(key, value), // 存储
            removeItem: (key) => uni.removeStorageSync(key), // 删除
          },
        },
      ],
    },
  }
)
