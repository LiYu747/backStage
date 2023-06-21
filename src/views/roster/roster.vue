<template>
    <div>
        <div class="rosterBox flex">
            <!-- 左边内容 -->
            <div class="leftBox">
                <el-input class="ipt" v-model="input" placeholder="搜索节点" :prefix-icon="Search" clearable />
                <div class="m-t1">
                    <el-tree :data="data" getCurrentKey highlight-current accordion @node-click="add" :props="props" :height="208" />
                </div>
            </div>
            <!-- 右边内容 -->
            <div class="rightBox" :style="{width: clientWidth+'px'}">
                <div class="title">标题</div>
                <div class="screenBox flex al-center">
                    <div v-for="item in searchTil" class="flex al-center" :key="item.id">
                        <span class="m-r2">{{item.name}}</span>
                        <div>
                            <!-- 输入框 -->
                            <el-input v-if="item.type == 'ipt'" class="screenIpt m-r2" v-model="item.value" placeholder="" />
                            <!-- 下拉选择 -->
                            <el-dropdown v-if="item.type == 'dropdown'" trigger="click">
                                <div class="link flex al-center m-r2  cur-p">
                                    <div class="linkVal">{{item.value}}</div>
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </div>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <div v-for="item in List" @click="menuAdd(item)" :key="item.id">
                                            <el-dropdown-item>{{item.name}}</el-dropdown-item>
                                        </div>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <!-- 时间选择 -->
                            <div v-if="item.type == 'time'" class="picker ">
                               <el-date-picker
                                    v-model="item.value"
                                    type="date"
                                    placeholder="选择时间"
                                    class="cur-p"
                                  />
                               
                            </div>
                        </div>
                    </div>
                    <div class="moreText cur-p" @click="moreAdd">更多</div>
                    <div>
                        <el-button type="primary">搜索</el-button>
                    </div>
                </div>
                <div class="flex al-center m-t1">
                    <span class="m-r2">筛选条件方案</span>
                    <el-dropdown trigger="click">
                        <div class="el-dropdown-link cur-p">
                            <div class="value">{{value}}</div>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <div v-for="item in List" @click="menuAdd(item)" :key="item.id">
                                    <el-dropdown-item>{{item.name}}</el-dropdown-item>
                                </div>
                                
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <ScreenForm ref="reference"></ScreenForm>
                <ListForm></ListForm>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        Search,
        ArrowDown,
    } from '@element-plus/icons-vue'
    import ScreenForm from '../roster/components/ScreenForm.vue'
    import ListForm from '../roster/components/ListForm.vue'
    const input = ref('')
    const props = {
        children: 'children',
        label: 'label',
    }
    const value = ref('')
    const List = ref([
        {name:'教龄10+的老师',id:0},
        {name:'50岁以上的老师',id:0},
    ])
    const menuAdd = (item) => {
       value.value = item.name
    }
    const add = (e,X) => {
         console.log(X);
    }
    const timeVal = ref('')
    const searchTil = ref([{
            name: '姓名',
            value: '',
            type:"ipt"
        },
        {
            name: '工作单位',
            value: '',
            type:"ipt"
        },
        {
            name: '编制状态',
            value: '',
            type:"dropdown"
        },
        {
            name: '时间',
            value: '',
            type:"time"
        }
    ])
    const data = [{
            label: 'Level one 1',
            children: [{
                label: 'Level two 1-1',
                children: [{
                    label: 'Level three 1-1-1',
                }, ],
            }, ],
        },
        {
            label: 'Level one 2',
            children: [{
                    label: 'Level two 2-1',
                    children: [{
                        label: 'Level three 2-1-1',
                    }, ],
                },
                {
                    label: 'Level two 2-2',
                    children: [{
                        label: 'Level three 2-2-1',
                    }, ],
                },
            ],
        },
        {
            label: 'Level one 3',
            children: [{
                    label: 'Level two 3-1',
                    children: [{
                        label: 'Level three 3-1-1',
                    }, ],
                },
                {
                    label: 'Level two 3-2',
                    children: [{
                        label: 'Level three 3-2-1',
                    }, ],
                },
            ],
        },
    ]
    const reference = ref(null)
    const moreAdd = () => { 
        reference.value?.add()
    }

    const clientWidth = ref(0)
 onMounted(() => {
    clientWidth.value = document.body.clientWidth - 600
    window.onresize = () => {
            return (() => {
                //窗口缩放自动获取页面宽高
                window.fullWidth = document.documentElement.clientWidth;
                clientWidth.value = window.fullWidth-600; //宽
            })()
        }
 });
</script>

<style lang="less" scoped>
    .rosterBox {
        width: 100%;
        height: 100%;
    }

    .leftBox {
        width: 260px;
        padding: 0 10px;
        height: calc(100vh - 110px);
        overflow: auto;
        border-right: 1px solid #dcdfe6;

        .ipt {
            margin-top: 10px;
        }
    }

    .rightBox {
        padding: 20px;
        height: calc(100vh - 150px);
        overflow: auto;
       width: 100%;
        .screenBox {
            width: 100%;
            height: 50px;
        }

        .screenIpt {
            width: 140px;
        }

        .link{
            width: 140px;
            height: 30px;  
            border: 1px solid #dcdfe6;
            border-radius: 2px;
        }
     :deep(.el-date-editor){
        width: 140px;
     }

        .linkVal{
            width: 110px;
        }

        .moreText {
            margin: 0 50px;
            color: #75B9FF;
        }

        .el-dropdown-link{
            padding: 6px 10px;
            border: 1px solid #666;
            border-radius: 20px;
            display: flex;
           
        }
        .value{
                min-width: 60px;  
                height: 100%;
            }
    }
</style>