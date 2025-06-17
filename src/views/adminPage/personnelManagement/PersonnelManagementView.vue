<script setup lang="ts">
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Plus,
} from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getAllUserService, deleteUserService } from '@/api/UserApi'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
// 表格
const handleClick = () => {
    console.log('click')
}

const tableData = ref([]);



// 搜索框的单选项
const radio1 = ref('username')
const input2 = ref('')




const distributtionHouse = (id: any) => {
    router.push({ name: 'distributionHouse', params: { id } })
}




// 删除人员函数
const deleteUser = (id: any) => {
    ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            // 删除用户
            console.log(id);
            await deleteUserService(id)

            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}



// 分页
import { computed } from 'vue';
const currentPage = ref(1);
const pageSize = ref(8);
const len = ref(tableData.value.length);
console.log("长度");
console.log(tableData.value);
console.log(tableData.value.length);
const total = ref(len);

// 计算当前页数据
const tableDataPage = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tableData.value.slice(start, end);
});
const handlePageChange = (page: any) => {
    currentPage.value = page;
    // 刷新表格数据
};

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


        len.value = tableData.value.length;
        total.value = tableData.value.length;

    } catch (error) {
        console.error('获取房屋数据失败', error)
    }
})

const searchData = async () => {
    console.log(radio1.value);
    console.log(input2.value);
    let responseOK;

    // const response: any = await getBillListService();
    const response: any = await getAllUserService();
    // console.log(response);

    responseOK = response.map((user: any) => {
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



    console.log(response);
    // 我现在需要在response数组对象中过滤数据，radio1为过滤时的属性，input2为过滤时用户输入的内容
    const responseFilter = responseOK.filter((item: any) => {
        if (radio1.value === "name") {
            return item.name.includes(input2.value);
        } else if (radio1.value === "username") {
            return item.username.includes(input2.value);
        } else if (radio1.value === "status") {
            return item.status.includes(input2.value);
        }
    });
    console.log(responseFilter);
    tableData.value = responseFilter;


    len.value = tableData.value.length;
    total.value = tableData.value.length;
}
</script>

<template>
    <div class="admin-body-main-table">
        <div class="admin-body-main-table-content">
            <div class="admin-body-main-table-content-title">
                <div>
                    <div class="admin-body-main-table-content-title-search">
                        <el-radio-group v-model="radio1" size="large" fill="#6cf">
                            <!-- <el-radio-button label="账单名" value="name" /> -->
                            <el-radio-button label="用户名" value="username" />
                            <!-- <el-radio-button label="账单状态" value="status" /> -->
                        </el-radio-group>
                        <div style="margin-left: 40px">
                            <el-input v-model="input2" style="width: 240px" placeholder="根据按钮选项搜索" :prefix-icon="Search" />
                            <el-button @click="searchData()" style="margin-left: 6px" type="primary" round
                                size="small">搜索</el-button>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <el-table :data="tableDataPage" style="width: 100%">
                <el-table-column fixed prop="id" label="用户编号" width="150" />
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="phone" label="手机号" width="180" />
                <el-table-column prop="authentication" label="是否社区内人员" width="180" />
                <el-table-column prop="hasHouse" label="房屋" width="180" />
                <el-table-column prop="hasCarport" label="车位" width="300" />
                <el-table-column prop="createdAt" label="注册日期" width="600" />
                <el-table-column fixed="right" label="操作" min-width="255">
                    <template #default="scope">
                        <!-- @click="scope.row.isDrawerOpen = true" -->
                        <el-button type="primary" size="small" @click="distributtionHouse(scope.row.id)">
                            分配房屋并授权
                        </el-button>
                        <el-button
                            @click="router.push({ path: '/admin/EditPersonnerButton', query: { userId: scope.row.id } })"
                            type="primary" size="small">修改</el-button>

                        <el-button @click="deleteUser(scope.row.id)" type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="admin-body-main-table-pagination">
            <el-pagination :current-page="currentPage" :page-size="pageSize" :total="total"
                @current-change="handlePageChange" background layout="prev, pager, next" />
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

.admin-body-main-table-content-title {

    display: flex;
    align-items: center;
    /* justify-content: flex-end; */
    justify-content: space-between;

    height: 60px;
    padding: 10px;
    border-bottom: solid 0.8px rgb(217, 207, 207);
}

.admin-body-main-table-content-title-search {
    display: flex;
    align-items: center;
}
</style>
