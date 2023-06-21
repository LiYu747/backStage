<template>
    <div class="contentBox">
        <div class="infoBox flex-d al-center">
            <div><img src="../assets/headPortrait.png" class="headPortrait" alt=""></div>
            <div class="name">肖文正老师</div>
            <div class="flex al-center m-14">
                <span>中山</span>
                <div class="line"></div>
                <span>信息技术老师</span>
            </div>
            <div class="m-14">工作单位：<span>中山市教育技术中心</span></div>
            <div class="m-14">编制单位：<span>中山新世纪中心学校</span></div>
            <div class="goUser cur-p">进入个人中心</div>
        </div>
        <div class="myFunOpt">
            <div class="funTitle flex al-center ju-between">
                <div>我的待办</div>
                <div class="goDispose cur-p">去处理</div>
            </div>
            <div>
                <div class="funItem flex al-center"  v-for="item in list" :key="item.id">
                    <div class="flex-d al-center itemName ">
                        {{item.name}}
                        <span class="itemMun">{{item.mun}}</span>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    const data = reactive({});
    const list = ref([{
            name: '我发起的',
            mun: '16'
        },
        {
            name: '我未处理',
            mun: '21'
        },
        {
            name: '我已处理',
            mun: '108'
        },
    ])
    onMounted(() => {});
</script>



<style lang="less" scoped>
    .contentBox {
        margin-left: 16px;
        width: 390px;
    }

    .infoBox {
        width: 100%;
        height: 396px;
        background: #ffffff;
        border-radius: 8px;
        font-family: SourceHanSansCN-Regular;
        font-size: 16px;
        color: #999999;

        .headPortrait {
            width: 144px;
            height: 144px;
            margin-top: 36px;
        }

        .line{
            width: 1px;
            height: 16px;
            background: #999999;
            margin: 0 6px;
            margin-top: 2px;
        }

        .name {
            margin-top: 10px;
            font-family: SourceHanSansCN-Bold;
            font-size: 22px;
            color: #333333;
            font-weight: bold;
        }

        .m-14 {
            margin-top: 10px;
        }

        .goUser {
            margin-top: 28px;
            font-size: 16px;
            color: #007aff;
            font-size: 16px;
        }
    }

    .myFunOpt {
        margin-top: 24px;
        height: 499px;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        padding: 0 23px 0 30px;

        .funTitle {
            margin-top: 28px;
            font-size: 20px;
            font-weight: bold;
            color: #333333;
        }

        .goDispose {
            font-size: 16px;
            color: #999999;
            font-weight: normal;
        }

        .funItem {
            margin-top: 24px;
            width: 336px;
            height: 115px;
            background-color: #f2f3fb;
            border-radius: 15px;
        }

        .itemName {
            margin-left: 50px;
            font-size: 20px;
            color: #01246a;
        }

        .itemMun{
            font-weight: bold;
            font-size: 36px;
        }
    }
</style>