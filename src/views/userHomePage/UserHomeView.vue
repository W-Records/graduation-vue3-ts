<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'


import { reactive, ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'

const formLabelWidth = '80px'

// 个人信息 UserInformation
let timerUserInformation: any;
const dialogUserInformation = ref(false)
const loadingUserInformation = ref(false)
const formUserInformation = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const onClickUserInformation = () => {
    loadingUserInformation.value = true
    setTimeout(() => {
        loadingUserInformation.value = false
        dialogUserInformation.value = false
    }, 400)
}
const handleCloseUserInformation = (done) => {
    if (loadingUserInformation.value) {
        return
    }
    ElMessageBox.confirm('Do you want to submit?')
        .then(() => {
            loadingUserInformation.value = true
            timerUserInformation = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                    loadingUserInformation.value = false
                }, 400)
            }, 2000)
        })
        .catch(() => {
            // catch error
        })
}
const cancelFormUserInformation = () => {
    loadingUserInformation.value = false
    dialogUserInformation.value = false
    clearTimeout(timerUserInformation)
}
// -------个人信息 UserInformation




// 我的维修
const handleClick = () => {
    console.log('click')
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
]
// -----------我的维修





const router = useRouter()

// 模拟用户数据
const user = reactive({
    name: '张三',
    phone: '13812345678',
    address: '朝阳小区1栋2单元301',
    balance: 1500,
    dueFee: 80
})

// 模拟车位信息
const parkingInfo = reactive({
    status: true,
    number: 'A-001'
})

// 模拟公告列表
const notices = reactive([
    {
        id: 1,
        title: '关于物业费调整的通知',
        content: '自2025年4月起，物业费调整为每月150元',
        time: '2025-03-15'
    },
    {
        id: 2,
        title: '社区安全升级公告',
        content: '新增人脸识别门禁系统，3月20日启用',
        time: '2025-03-10'
    }
])

// 退出登录
const handleLogout = () => {
    ElMessage.success('退出成功')
    router.push('/login')
}





// 导入 我测试axios是否成功
import { getUserListService } from '@/api/UserApi.ts'



// B站的头部鼠标跟随移动动画
import { onMounted } from 'vue';
import BilibiliJS from './bilibiliAnimation/bilibili.js'
onMounted(async () => {

    // 我测试axios是否成功
    const res = await getUserListService();
    console.log(res);



    BilibiliJS();
});
// ---------B站头部鼠标移动动画到这里为止







</script>

<template>
    <div class="home-container">
        <!-- <div id="MyappBiliBili">loading...</div> -->
        <!-- <div id="selectBox"></div> -->





        <!-- 顶部导航栏 -->
        <el-header id="MyappBiliBili" class="header">
            <div class="logo">社区管理系统 🐱‍🐉</div>
            <div class="user-info">
                <el-dropdown trigger="click">
                    <span class="user-name">欢迎您😀，{{ user.name }}</span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>

        <!-- 主体内容 -->
        <el-main class="content">
            <el-row :gutter="20">
                <!-- 个人信息 -->
                <el-col :span="6">
                    <div class="my-card-container">
                        <!-- <el-card shadow="hover" class="module-card"> -->
                        <!-- <template #header> -->
                        <div class="Mycard-header">个人信息 🐸</div>
                        <!-- </template> -->
                        <div class="Mycard-content">
                            <div class="info-item Mycard-itemH">
                                <span>姓名：</span>{{ user.name }}
                            </div>
                            <div class="info-item">
                                <span>电话：</span>{{ user.phone }}
                            </div>
                            <!-- <div class="info-item">
                                <span>地址：</span>{{ user.address }}
                            </div> -->
                            <!-- <el-button type="primary" @click="$router.push('/profile')">查看/编辑</el-button> -->
                            <!-- 个人信息 -->
                            <!-- <el-button type="primary" plain @click="dialogUserInformation = true">查看/编辑</el-button> -->
                            <el-drawer v-model="dialogUserInformation" title="个人信息 🐱‍🏍"
                                :before-close="handleCloseUserInformation" direction="ltr" class="demo-drawer">
                                <div class="demo-drawer__content">
                                    <el-form :model="formUserInformation">
                                        <el-form-item label="Name" :label-width="formLabelWidth">
                                            <el-input v-model="formUserInformation.name" autocomplete="off" />
                                        </el-form-item>
                                        <el-form-item label="Area" :label-width="formLabelWidth">
                                            <el-select v-model="formUserInformation.region"
                                                placeholder="Please select activity area">
                                                <el-option label="Area1" value="shanghai" />
                                                <el-option label="Area2" value="beijing" />
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                    <div class="demo-drawer__footer">
                                        <el-button @click="cancelFormUserInformation">Cancel</el-button>
                                        <el-button type="primary" :loading="loadingUserInformation"
                                            @click="onClickUserInformation">
                                            {{ loadingUserInformation ? 'Submitting ...' : 'Submit' }}
                                        </el-button>
                                    </div>
                                </div>
                            </el-drawer>
                        </div>
                        <!-- </el-card> -->
                    </div>
                </el-col>

                <!-- 车位信息 -->
                <el-col :span="6">
                    <div class="my-card-container">
                        <!-- <el-card shadow="hover" class="module-card"> -->
                        <!-- <template #header> -->
                        <div class="Mycard-header">车位信息</div>
                        <!-- </template> -->
                        <div class="Mycard-content">
                            <div class="info-item Mycard-itemH">
                                <span>当前车位：</span>{{ parkingInfo.status ? '已购买' : '未购买' }}
                            </div>
                            <div v-if="parkingInfo.status" class="info-item">
                                <span>车位编号：</span>{{ parkingInfo.number }}
                            </div>
                            <!-- <el-button type="primary" @click="$router.push('/parking')">查看车位</el-button> -->

                            <!-- <el-button text @click="table = true">Open Drawer with nested table</el-button> -->

                        </div>
                        <!-- </el-card> -->
                    </div>
                </el-col>



                <!-- 缴费信息 -->
                <el-col :span="6">
                    <div class="my-card-container">
                        <!-- <el-card shadow="hover" class="module-card"> -->
                        <!-- <template #header> -->
                        <div class="Mycard-header">缴费信息</div>
                        <!-- </template> -->
                        <div class="Mycard-content">
                            <div class="info-item Mycard-itemH">
                                <span>账户余额：</span>{{ user.balance }} 元
                            </div>
                            <div class="info-item">
                                <span>待缴费用：</span>{{ user.dueFee }} 元
                            </div>
                            <!-- <el-button type="primary" @click="$router.push('/payment')">立即缴费</el-button> -->
                        </div>
                        <!-- </el-card> -->
                    </div>
                </el-col>

                <!-- 设备报修 -->
                <el-col :span="6">
                    <div class="my-card-container">
                        <!-- <el-card shadow="hover" class="module-card"> -->
                        <!-- <template #header> -->
                        <div class="Mycard-header">设备报修</div>
                        <!-- </template> -->
                        <div class="Mycard-content">
                            <div class="info-item Mycard-itemH">
                                <span>账户余额：</span>{{ user.balance }} 元
                            </div>
                            <div class="info-item">
                                <span>待缴费用：</span>{{ user.dueFee }} 元
                            </div>
                            <!-- <el-button type="primary" @click="$router.push('/repair')">提交报修申请</el-button> -->
                        </div>
                        <!-- </el-card> -->
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="fourCard">
                        <div class="fourCarditem swing">
                            <div>
                                <div>
                                    <img src="@/assets/钱包.svg" alt="" style="width: 40px;">
                                </div>
                                <div>新维修</div>
                            </div>
                        </div>
                        <div class="fourCarditem swing">
                            <div>
                                <div>
                                    <img src="@/assets/钱包.svg" alt="" style="width: 40px;">
                                </div>
                                <div>买车位</div>
                            </div>
                        </div>
                        <div class="fourCarditem swing">
                            <div>
                                <div>
                                    <img src="@/assets/钱包.svg" alt="" style="width: 40px;">
                                </div>
                                <div>看账单</div>
                            </div>
                        </div>
                        <div class="fourCarditem swing">
                            <div>
                                <div>
                                    <img src="@/assets/钱包.svg" alt="" style="width: 40px;">
                                </div>
                                <div>改信息</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <el-card shadow="hover" class="notice-card">
                            <template #header>
                                <div class="card-header">我的维修</div>
                            </template>
                            <div class="">
                                <el-table :data="tableData" height="187" style="width: 100%">
                                    <el-table-column fixed prop="date" label="Date" width="150" />
                                    <el-table-column prop="name" label="Name" width="120" />
                                    <el-table-column prop="state" label="State" width="120" />
                                    <el-table-column prop="city" label="City" width="120" />
                                    <el-table-column prop="address" label="Address" width="600" />
                                    <el-table-column prop="zip" label="Zip" width="120" />
                                    <el-table-column fixed="right" label="Operations" min-width="120">
                                        <template #default>
                                            <el-button link type="primary" size="small" @click="handleClick">
                                                Detail
                                            </el-button>
                                            <el-button link type="primary" size="small">Edit</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="noticeAll">
                        <el-timeline style="max-width: 610px">
                            <el-timeline-item timestamp="2018/4/12" placement="top">
                                <el-card>
                                    <h4>关于物业费调整的通知</h4>
                                    <p>自2025年4月起，物业费调整为每月150元</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/3" placement="top">
                                <el-card>
                                    <h4>社区安全升级公告</h4>
                                    <p>新增人脸识别门禁系统，3月20日启用</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                                <el-card>
                                    <h4>Update Github template</h4>
                                    <p>Tom committed 2018/4/2 20:46</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                                <el-card>
                                    <h4>Update Github template</h4>
                                    <p>Tom committed 2018/4/2 20:46</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/2" placement="top">
                                <el-card>
                                    <h4>Update Github template</h4>
                                    <p>Tom committed 2018/4/2 20:46</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                    <!-- <el-card shadow="hover" class="notice-card">
                        <template #header>
                            <div class="card-header">最新公告</div>
                        </template>
                        <div class="notice-list">
                            <div v-for="notice in notices" :key="notice.id" class="notice-item">
                                <div class="notice-title">{{ notice.title }}</div>
                                <div class="notice-content">{{ notice.content }}</div>
                                <div class="notice-time">{{ notice.time }}</div>
                            </div>
                        </div>
                    </el-card> -->
                </el-col>
            </el-row>

            <!-- <el-row :gutter="20">
                公告信息
                <el-col :xs="24" :sm="24" :md="24">
                    <el-card shadow="hover" class="notice-card">
                        <template #header>
                            <div class="card-header">最新公告</div>
                        </template>
                        <div class="notice-list">
                            <div v-for="notice in notices" :key="notice.id" class="notice-item">
                                <div class="notice-title">{{ notice.title }}</div>
                                <div class="notice-content">{{ notice.content }}</div>
                                <div class="notice-time">{{ notice.time }}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row> -->
        </el-main>
    </div>
</template>

<style scoped>
.my-card-container {
    border-radius: 20px;
    border: solid 0.8px #e4e7ed;
    margin-bottom: 15px;
    transition: box-shadow 0.3s ease;
    /* 添加过渡效果 */
}

.my-card-container:hover {
    box-shadow: 0 0px 25px rgba(116, 149, 179, 0.2);
    /* 鼠标悬停时增加阴影 */
}

.swing:hover {
    animation: swing .4s infinite linear both;
}

@keyframes swing {
    20% {
        transform: rotate3d(0, 0, 1, 5deg);
    }

    40% {
        transform: rotate3d(0, 0, 1, -3deg);
    }

    60% {
        transform: rotate3d(0, 0, 1, 2deg);
    }

    80% {
        transform: rotate3d(0, 0, 1, -1deg);
    }

    to {
        transform: rotate3d(0, 0, 1, 0deg);
    }
}







.noticeAll {
    /* max-width: 600px; */
    /* 保持原有的宽度限制 */
    max-height: 396px;
    /* 设置一个固定的高度 */
    overflow-y: auto;
    /* 允许垂直滚动 */

    background-image:
        url('@/assets/4d37acea06841ace858f27cab3a5596d9fdd8354.png@1c.webp'),
        url('@/assets/d4d4569741806055f36c4d9140bdd7069a50ec09.png@1c.webp');
    /* 替换为你的图片路径 */
    background-size: 160%;
    /* 背景图片覆盖整个元素 */
    background-position:
        -196px 285px,
        -166px 0px;
    /* 背景图片居中 */
    background-repeat: no-repeat;
    /* 背景图片不重复 */
}

/* 自定义滚动条样式 */
.noticeAll::-webkit-scrollbar {
    width: 6px;
    /* 滚动条宽度 */
}

.noticeAll::-webkit-scrollbar-track {
    background: white;
    /* 轨道背景色 */
}

.noticeAll::-webkit-scrollbar-thumb {
    background: rgb(232, 226, 226);
    /* 滑块背景色 */
    border-radius: 10px;
    /* 滑块圆角 */
}

.noticeAll::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* 滑块悬停背景色 */
}

.noticeAll::-webkit-scrollbar-button {
    background: #ddd;
    /* 按钮背景色 */
    display: none;
    /* 隐藏按钮 */
}




.fourCard {
    gap: 10px;
    display: flex;
    margin-bottom: 20px;
}

.fourCard>div {
    width: 250px;
    height: 90px;
    border-radius: 8px;


    border: solid rgb(230, 221, 221) 0.5px;
}

.fourCarditem {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 添加底部阴影 */
    transition: box-shadow 0.3s ease;
    /* 添加过渡效果 */
}

.fourCarditem:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* 鼠标悬浮时增加阴影 */
}


.home-container {
    min-height: 100vh;
    /* background-color: #f5f7fa; */
}

.header {
    height: 75px;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 25px;
    color: white;
    font-weight: 600;

    z-index: 1000;
}

.user-info {
    display: flex;
    align-items: center;
    z-index: 1000;
}

.user-name {
    cursor: pointer;
    margin-right: 10px;
    /* font-weight: 550; */
    font-size: 16px;
    color: white;
}

.content {
    padding: 20px;
}

.module-card {
    margin-bottom: 15px;
    border-radius: 20px;
}

.card-header {
    font-size: 16px;
    color: #333;
    font-weight: 500;
}

.Mycard-header {
    font-size: 16px;
    color: #333;
    font-weight: 500;

    padding: 16px;
    border-bottom: solid 0.8px #e4e7ed;
}

.Mycard-content {
    padding: 16px;
}

.Mycard-itemH {
    margin-bottom: 12px;
}

.info-item {
    /* margin-bottom: 12px; */
    /* line-height: 5; */
}

.notice-card {
    /* margin-top: 20px; */
}

.notice-list {
    max-height: 300px;
    overflow-y: auto;
}

.notice-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.notice-title {
    font-weight: 600;
    margin-bottom: 5px;
}

.notice-time {
    color: #999;
    font-size: 12px;
    margin-top: 5px;
}

/* 响应式布局 */
@media (max-width: 768px) {
    .module-card {
        margin-bottom: 15px;
    }
}




/* B站头部鼠标动画css */
#MyappBiliBili {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    min-width: 1000px;
    /* min-height: 155px; */
    /* height: 10vw; */
    /* max-height: 240px; */

    height: 110px;
}

.layer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    user-select: none;
    pointer-events: none;
}

#selectBox>button {
    margin-right: 1em;
}

/* ---------B站动画到这里为止 */
</style>
