<template>
    <div class="flowBox m-t2 m-l2">
        <div class="flowTitle">申请流程</div>
        <div class="flex m-t3">
            <div v-for="(item,index) in list" @click="gotoFun(item)" class="flex-d al-center itemSty cur-p" :key="item.id">
                <div class="icon">
                    <img :src="item.Url" alt="">
                </div>
                <div class="itemName" >{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const data = reactive({});
    const list = ref([{
            name: '入职',
            path:'/entry',
            Url:require('../../assets/Cut-diagram/entry.png')
        },
        {
            name: '调动',
            path:'/mobilize',
            Url:require('../../assets/Cut-diagram/mobilize.png')
        },
        {
            name: '借调',
            path:'/second',
            Url:require('../../assets/Cut-diagram/second.png')
        },
        {
            name: '离退',
            path:'/depart',
            Url:require('../../assets/Cut-diagram/Retreat.png')
        },
        {
            name: '长病假',
            path:'/sick_leave',
            Url:require('../../assets/Cut-diagram/Longsickleave.png')
        },
        {
            name: '产假',
            path:'/maternity_leave',
            Url:require('../../assets/Cut-diagram/maternityleave.png')
        },
        {
            name: '添加课后服务人员',
            path:'/Add_waitstaff',
            Url:require('../../assets/Cut-diagram/Addafterschoolservicepersonnel.png')
        },
    ])
    const gotoFun = (item) => {
        router.push(item.path)
    }
    onMounted(() => {});
</script>



<style lang="less" scoped>
 

    .flowTitle {
        font-weight: bold;
        font-family: SourceHanSansCN-Bold;
        font-size: 20px;
        color: #333333;
    }

    .itemSty {
        // background-color: red;
        margin-right: 66px;
    }
    .icon {
        width: 54px;
        height: 54px;
        background: #f7f7f7;
        border-radius: 50%;
    }

    .itemName {
        margin-top: 22px;
        font-size: 16px;
        color: #333333;
    }
    .itemSty:nth-child(1){
        .itemName{
            margin-left: 6px;
        }
    }

    .itemSty:nth-child(2){
        .itemName{
            margin-left: 7px;
        }
    }
    .itemSty:nth-child(3){
        .itemName{
            margin-left: 4px;
        }
    }
    .itemSty:nth-child(4){
        .itemName{
            margin-left: 7px;
        }
    }
    .itemSty:nth-child(5){
        .itemName{
            margin-left: 11px;
        }
    }
    .itemSty:nth-child(6){
        .itemName{
            margin-left: 24px;
        }
    }
    .itemSty:nth-child(7){
        .itemName{
            margin-left: 17px;
        }
    }

    .changeName {
        color: #999999;
    }
</style>