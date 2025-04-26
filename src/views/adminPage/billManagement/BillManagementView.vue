<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Plus,
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { getBillListService, addBillService, deleteBillService } from '@/api/BillApi'
import { getAllUserService } from '@/api/UserApi'





// 表格
const handleClick = () => {
    console.log('click')
}

const tableData = ref([]);



// 抽屉弹出框
import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const formLabelWidth = '80px'
let timer: any


const dialog = ref(false)
const loading = ref(false)

const form = reactive({
    name: '',
    price: "",
    status: "未缴费",
    user: {} as any,
    userid: "",
    username: "",
})

// 添加房屋信息
const onClick = async () => {
    loading.value = true
    // await addBillService(form);
    form.userid = form.user.id
    form.username = form.user.username
    console.log(form);
    await addBillService(form);
    loading.value = false
    dialog.value = false
}

const handleClose = (done: any) => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('Do you want to submit?')
        .then(() => {
            loading.value = true
            timer = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                    loading.value = false
                }, 400)
            }, 2000)
        })
        .catch(() => {
            // catch error
        })
}

const cancelForm = () => {
    loading.value = false
    dialog.value = false
    clearTimeout(timer)
}
// -------------------抽屉弹出框 到这里为止





let getUserResponse: any = ref([]);



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
        const response: any = await getBillListService();
        console.log(response);
        tableData.value = response;


        len.value = tableData.value.length;
        total.value = tableData.value.length;



        // 获取用户
        getUserResponse.value = await getAllUserService();
        console.log(getUserResponse.value);

    } catch (error) {
        console.error('获取房屋数据失败', error)
    }
})


const deleteBill = async (id: any) => {
    console.log(id);
    await deleteBillService(id);
    ElMessage({
        message: '删除成功',
        type: 'success',
    })

    const response: any = await getBillListService();
    console.log(response);
    tableData.value = response;
}

</script>

<template>
    <div class="admin-body-main-table">
        <div class="admin-body-main-table-content">
            <div class="admin-body-main-table-content-title">
                <el-button @click="dialog = true" type="primary" :icon="Plus" circle />
                <!-- <el-button text @click="dialog = true">Open Drawer with nested form</el-button> -->
                <el-drawer v-model="dialog" title="添加账单" :before-close="handleClose" direction="ltr" class="demo-drawer">
                    <div class="demo-drawer__content">
                        <el-form :model="form">
                            <el-form-item label="账单名" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="账单金额" :label-width="formLabelWidth">
                                <el-input v-model="form.price" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-select v-model="form.user" value-key="id" placeholder="Please select activity area">
                                    <!-- 遍历getUserResponse数组 -->
                                    <el-option v-for="item in getUserResponse" :key="item.id" :label="item.username"
                                        :value="item" />
                                    <!-- <el-option label="Area1" value="shanghai" />
                                    <el-option label="Area2" value="beijing" /> -->
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div class="demo-drawer__footer">
                            <el-button @click="cancelForm">Cancel</el-button>
                            <el-button type="primary" :loading="loading" @click="onClick">
                                {{ loading ? 'Submitting ...' : 'Submit' }}
                            </el-button>
                        </div>
                    </div>
                </el-drawer>
            </div>
            <el-table :data="tableDataPage" style="width: 100%">
                <el-table-column fixed prop="id" label="账单编号" width="230" />
                <el-table-column prop="name" label="账单名" width="230" />
                <el-table-column prop="price" label="账单价格" width="230" />
                <el-table-column prop="username" label="用户名" width="230" />
                <el-table-column prop="status" label="账单状态" width="600" />
                <el-table-column fixed="right" label="Operations" min-width="150">
                    <template #default="scope">
                        <!-- <el-button type="primary" size="small" @click="handleClick">
                            分配房屋并授权
                        </el-button> -->
                        <el-button @click="deleteBill(scope.row.id)" type="primary" size="small">删除</el-button>
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
    justify-content: flex-end;

    height: 50px;
    padding: 10px;
    border-bottom: solid 0.8px rgb(217, 207, 207);
}
</style>
