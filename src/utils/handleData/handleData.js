//时间戳转标准时间(年月日)
export const transitionDate = (val) => {
    if(!val || val == null) return ''
    const date = new Date(Number(val))
    const o = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1, //month
        D: date.getDate(), //day
    }
    let str = o.Y + '-' + o.M + '-' + o.D
    return str
}
//时间戳转标准时间(年月)
export const transitionDateMonth = (val) => {
    if(!val || val == null) return ''
    const date = new Date(Number(val))
    const o = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1, //month
        D: date.getDate(), //day
    }
    let str = o.Y + '-' + o.M + '-' + o.D
    let newStr = str.slice(0, 6)
    return newStr
}
//时间戳转标准时间(年)
export const transitionDateYear = (val) => {
    if(!val || val == null) return ''
    const date = new Date(Number(val))
    const o = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1, //month
        D: date.getDate(), //day
    }
    let str = o.Y + '-' + o.M + '-' + o.D
    let newStr = str.slice(0, 4)
    return newStr
}
//中国标准时间转换标准时间
export const transitionChinaDate = (val) => {
    if(!val || val == null) return ''
    const date = new Date(val)
    const o = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1, //month
        D: date.getDate(), //day
    }
    let str = o.Y + '-' + o.M + '-' + o.D
    return str
}

//中国标准时间转时间戳
export const transitionJab = (val) => {
    const date = new Date(val) * 1
    return date
}
//用户基本信息数据改动
export const changePersonalDate = (arr, obj) => {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        // console.log(item,"item");
        // 遍历对象的key值
        for (let key of Object.keys(obj)) {
            // console.log(key,"key值");
            // if ( item.opt && !item.time) {
            //     if(item.prop == key){
            //         item.province1 = obj[key] //省份
            //     }else if(item.prop1 == key){
            //         item.province2 = obj[key] //城市
            //     }else if(item.prop3 == key){
            //         item.province3 = obj[key]  //区县
            //     }else if(item.prop2 == key){
            //         item.value = obj[key]  //自定义绑定
            //     }
            //     // console.log( obj[key].name,"是对象");
            // } else if (!item.opt && !item.time) {
            //     if(item.prop2 == key){
            //         item.value = obj[key]
            //     }
            //     // console.log(obj[key],"是字符串");
            // } else if (!item.opt && item.time) {
            //     if(item.prop2 == key){
            //         item.value =transitionDate(obj[key]) 
            //     }
            //     // console.log(obj[key],"是时间");
            // }
            if (item.type == "input") {
                if (item.prop2 == key) {
                    item.value = obj[key]//是输入框或者照片或者单项选择框
                }
            } else if (item.type == "select3") {
                if (item.prop == key) {
                    item.province1 = obj[key] //省份
                    // console.log('obj: ', obj);
                    // console.log(item.prop,'item.province10---------------------------: ', item,obj);
                } else if (item.prop1 == key) {
                    item.province2 = obj[key] //城市
                } else if (item.prop3 == key) {
                    item.province3 = obj[key] //地区
                } else if (item.prop2 == key) {
                    item.value = obj[key]//自定义绑定
                    // console.log(item.value,';item.value');
                }
            } else if (item.type == "date") {
                if (item.prop2 == key) {
                    item.value =transitionDate(obj[key]) //是年月日
                }
            } else if (item.type == "select4") {
                if (item.prop2 == key) {
                    item.value = obj[key]
                    // console.log(item,key, "级联选择框item,key");
                }
            } else if (item.type == "dateMonth") {
                if (item.prop2 == key) {
                    item.value = transitionDateMonth(obj[key])//是年月
                }
                // console.log(item,key, "显示年月item,key");   
            } else if (item.type == "dateYear") {
                if (item.prop2 == key) {
                    item.value = transitionDateYear(obj[key])//是年
                }
                // console.log(item,key, "显示年item,key");
            }else if(item.type == "select2"){
                if (item.prop2 == key) {
                    item.value = obj[key]//二级选项框
                }
                // console.log(item,key, "二级item,key");
            }else if(item.type == "upload"){
                if (item.prop2 == key) {
                    item.value = obj[key]//上传照片
                }
            }else if(item.type == "select"){
                if (item.prop2 == key) {
                    item.value = obj[key]//单选框
                }
            }
        }
    }
}
export const  tarTime = (newAdd) => {
    for(let key in newAdd){
       if(isCustomTimeFormat(newAdd[key])){
         newAdd[key] = transitionJab( newAdd[key])
       }
    }
    return newAdd
 }
 function isCustomTimeFormat(timeString) {
   const regex = /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(.+\)$/;
   const isValidFormat = regex.test(timeString);
   return isValidFormat;
 }