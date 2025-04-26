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
import { getRepairListService, updateStatusService, deleteRepairService } from '@/api/RepairApi'






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
    area: "",
    roomNumber: "",
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    address: '',
})

// 添加房屋信息
const onClick = async () => {
    loading.value = true
    // await addHouseService(form);
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
        const response: any = await getRepairListService();
        console.log(response);
        tableData.value = response;

        len.value = tableData.value.length;
        total.value = tableData.value.length;
    } catch (error) {
        console.error('获取房屋数据失败', error)
    }
})


const completedProcessing = async (id: any) => {
    console.log(id);
    await updateStatusService(id)
    ElMessage({
        message: '操作完成',
        type: 'success',
    })

    const response: any = await getRepairListService();
    console.log(response);
    tableData.value = response;
}

const deleteRepair = async (id: any) => {
    console.log(id);
    await deleteRepairService(id)
    ElMessage({
        message: '删除成功',
        type: 'success',
    })

    const response: any = await getRepairListService();
    console.log(response);
    tableData.value = response;
}


</script>

<template>
    <div class="admin-body-main-table">
        <div class="admin-body-main-table-content">
            <div class="admin-body-main-table-content-title">
                <!-- <el-button @click="dialog = true" type="primary" :icon="Plus" circle /> -->
                <!-- <el-button text @click="dialog = true">Open Drawer with nested form</el-button> -->
                <el-drawer v-model="dialog" title="添加房屋" :before-close="handleClose" direction="ltr" class="demo-drawer">
                    <div class="demo-drawer__content">
                        <el-form :model="form">
                            <el-form-item label="房屋名" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="房屋大小" :label-width="formLabelWidth">
                                <el-input v-model="form.area" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="房屋地址" :label-width="formLabelWidth">
                                <el-input v-model="form.roomNumber" autocomplete="off" />
                            </el-form-item>
                            <!-- <el-form-item label="Area" :label-width="formLabelWidth">
                                <el-select v-model="form.region" placeholder="Please select activity area">
                                    <el-option label="Area1" value="shanghai" />
                                    <el-option label="Area2" value="beijing" />
                                </el-select>
                            </el-form-item> -->
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
                <el-table-column fixed prop="id" label="报修编号" width="200" />
                <el-table-column prop="content" label="报修内容" width="300" />
                <el-table-column prop="username" label="用户名" width="200" />
                <el-table-column prop="status" label="是否已处理" width="200" />
                <el-table-column prop="createTime" label="报修单创建时间" width="600" />
                <!-- <el-table-column prop="atTime" label="房屋到期时间" width="600" /> -->
                <el-table-column fixed="right" label="Operations" min-width="200">
                    <template #default="scope">
                        <!-- <el-button type="primary" size="small" @click="handleClick">
                            分配房屋并授权
                        </el-button> -->
                        <el-button @click="completedProcessing(scope.row.id)" type="primary" size="small">完成处理</el-button>
                        <el-button @click="deleteRepair(scope.row.id)" type="primary" size="small">删除</el-button>
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
