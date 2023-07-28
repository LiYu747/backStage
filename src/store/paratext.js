export const paratextStore = defineStore(
    "paratext",
    () => {
        // 副文本数据
        const userparatext = ref({});

        // 设置副文本数据
        const setText = (text) =>{
            userparatext.value = text
        };
        return{
            userparatext,
            setText
        }
    },
    {
        persist:{
        key:"user-key"
        } 
    }
  )
  