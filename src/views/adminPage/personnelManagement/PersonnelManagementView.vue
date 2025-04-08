<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getAllUserService } from '@/api/UserApi'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
// 表格
const handleClick = () => {
    console.log('click')
}

const tableData = ref([]);








const distributtionHouse = (id: any) => {
    router.push({ name: 'distributionHouse', params: { id } })
}









onMounted(async () => {
    try {
        const response: any = await getAllUserService();
        // console.log(response);

        tableData.value = response.map((user: any) => {
            let hasHouse = "";
            let hasCarport = "";
            let authentication = "未授权";
            if (user.roles == "user") {
                authentication = "已授权";
            }

            // console.log(user.carport_msgs);
            if (user.carport_msgs.length > 0) {
                user.carport_msgs.forEach((element: any) => {
                    hasCarport = element.name + " " + hasCarport;
                });
            }
            else {
                hasCarport = "无车位";
            }
            // console.log(user.house_msgs);
            if (user.house_msgs.length > 0) {
                user.house_msgs.forEach((element: any) => {
                    hasHouse = element.name + " " + hasHouse;
                });
            }
            else {
                hasHouse = "无房屋";
            }





            return {
                ...user,
                hasHouse,
                hasCarport,
                isDrawerOpen: false, // 每行独立的抽屉状态
                authentication
            }
        });

        console.log(tableData.value);

    } catch (error) {
        console.error('获取房屋数据失败', error)
    }
})
</script>

<template>
    <div class="admin-body-main-table">
        <div class="admin-body-main-table-content">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="id" label="用户编号" width="150" />
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="phone" label="手机号" width="180" />
                <el-table-column prop="authentication" label="是否社区内人员" width="180" />
                <el-table-column prop="hasHouse" label="房屋" width="180" />
                <el-table-column prop="hasCarport" label="车位" width="300" />
                <el-table-column prop="createdAt" label="注册日期" width="600" />
                <el-table-column fixed="right" label="Operations" min-width="200">
                    <template #default="scope">
                        <!-- @click="scope.row.isDrawerOpen = true" -->
                        <el-button type="primary" size="small" @click="distributtionHouse(scope.row.id)">
                            分配房屋并授权
                        </el-button>
                        <el-button type="primary" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="admin-body-main-table-pagination">
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<style scoped>
.admin-body-main-table-pagination {
    display: flex;
    align-items: center;

    height: 50px;
    padding: 10px;
    border: solid 0.8px rgb(217, 207, 207);
}
</style>
