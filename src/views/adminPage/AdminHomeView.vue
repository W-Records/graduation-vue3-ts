<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()


// 侧边导航
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    if (key === '11') {
        console.log("11触发了")
        router.push('/admin/PersonnelManagement')
    }
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}







// 退出登录
const handleLogout = () => {
    ElMessage.success('退出成功')
    router.push('/login')
}
</script>

<template>
    <div class="admin-container">
        <div class="admin-head">
            <div style="margin-left: 18px;font-size: 20px;font-weight: 600;">后台.社区管理系统 🐱‍🐉</div>
            <div style="margin-right: 18px; display: flex; align-items: center;">
                <el-dropdown trigger="click">
                    <div class="user-name">欢迎您😀</div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="admin-body">
            <div class="admin-body-aside">

                <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                    default-active="11" text-color="#fff" @open="handleOpen" @close="handleClose">

                    <el-menu-item index="11">
                        <RouterLink to="/admin/PersonnelManagement" style="text-decoration: none;color: inherit;">
                            <el-icon><icon-menu /></el-icon>
                            <span>社区人员管理</span>
                        </RouterLink>
                    </el-menu-item>

                    <!-- <el-menu-item index="13">
                        <RouterLink to="/admin/carManagement" style="text-decoration: none;color: inherit;">
                            <el-icon><icon-menu /></el-icon>
                            <span>车辆管理</span>
                        </RouterLink>
                    </el-menu-item> -->
                    <el-sub-menu index="13">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>车位管理</span>
                        </template>
                        <el-menu-item index="13-1">
                            <RouterLink to="/admin/carManagement" style="text-decoration: none;color: inherit;">
                                <span>普通车位</span>
                            </RouterLink>
                        </el-menu-item>
                        <el-menu-item index="13-2">
                            <RouterLink to="/admin/FireCarManagementView" style="text-decoration: none;color: inherit;">
                                <span>消防车位</span>
                            </RouterLink>
                        </el-menu-item>
                        <!-- <el-menu-item index="17-1">普通车位</el-menu-item>
                        <el-menu-item index="17-2">消防车位</el-menu-item> -->
                    </el-sub-menu>

                    <!-- <el-menu-item index="12">
                        <RouterLink to="/admin/HouseManagement" style="text-decoration: none;color: inherit;">
                            <el-icon><icon-menu /></el-icon>
                            <span>房屋管理</span>
                        </RouterLink>
                    </el-menu-item> -->
                    <el-sub-menu index="12">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>房屋系统</span>
                        </template>
                        <el-menu-item index="12-1">
                            <RouterLink to="/admin/buildingManagementView" style="text-decoration: none;color: inherit;">
                                <span>楼栋管理</span>
                            </RouterLink>
                        </el-menu-item>
                        <el-menu-item index="12-2">
                            <RouterLink to="/admin/UnitManagementView" style="text-decoration: none;color: inherit;">
                                <span>单元管理</span>
                            </RouterLink>
                        </el-menu-item>
                        <el-menu-item index="12-3">
                            <RouterLink to="/admin/HouseManagement" style="text-decoration: none;color: inherit;">
                                <span>房屋管理</span>
                            </RouterLink>
                        </el-menu-item>
                    </el-sub-menu>


                    <!-- <el-menu-item index="14">
                        <RouterLink to="/admin/BillManagement" style="text-decoration: none;color: inherit;">
                            <el-icon><icon-menu /></el-icon>
                            <span>用户账单</span>
                        </RouterLink>
                    </el-menu-item> -->
                    <el-sub-menu index="14">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>账单系统</span>
                        </template>
                        <el-menu-item index="14-1">
                            <RouterLink to="/admin/BillTypeManagementView" style="text-decoration: none;color: inherit;">
                                <span>账单类型</span>
                            </RouterLink>
                        </el-menu-item>
                        <el-menu-item index="14-2">
                            <RouterLink to="/admin/BillManagement" style="text-decoration: none;color: inherit;">
                                <span>用户账单</span>
                            </RouterLink>
                        </el-menu-item>
                    </el-sub-menu>


                    <el-menu-item index="15">
                        <RouterLink to="/admin/RepairManagement" style="text-decoration: none;color: inherit;">
                            <el-icon><icon-menu /></el-icon>
                            <span>用户报修</span>
                        </RouterLink>
                    </el-menu-item>

                    <el-menu-item index="16">
                        <RouterLink to="/admin/NoticeManagement" style="text-decoration: none;color: inherit;">
                            <el-icon><icon-menu /></el-icon>
                            <span>社区公告</span>
                        </RouterLink>
                    </el-menu-item>

                    <!-- <el-sub-menu index="17">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>车辆管理</span>
                        </template>
                        <el-menu-item index="17-1">普通车位</el-menu-item>
                        <el-menu-item index="17-2">消防车位</el-menu-item>
                    </el-sub-menu> -->

                    <!-- <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>社区人员管理</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item two</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu> -->
                    <!-- <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>Navigator Two</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>Navigator Three</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>Navigator Four</span>
                    </el-menu-item> -->
                </el-menu>
            </div>
            <div class="admin-body-main">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin-head {
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: solid 0.5px rgb(148, 139, 139);
}

.admin-body {
    display: flex;
    height: calc(100vh - 90px);
}

.admin-body-aside {
    height: 100%;
    background-color: #545c64;
    /* border: solid; */
}

.admin-body-main {
    height: 100%;
    /* 自动扩展以填充剩余空间 */
    flex: 1;

    display: flex;
    justify-content: center;
    /* border: solid red; */
}

.admin-body-main-table {
    width: 1310px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border: solid 0.8px rgb(217, 207, 207);
}

.admin-body-main-table-pagination {
    display: flex;
    align-items: center;

    height: 50px;
    padding: 10px;
    border: solid 0.8px rgb(217, 207, 207);
}

.user-name {
    color: black;
    font-size: 16px;
}
</style>
