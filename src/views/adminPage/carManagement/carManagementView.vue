<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
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
import { getCarListService, addCarService, removeUserIdService, removeCarportService } from '@/api/CarApi'






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
    type: '',
})

// 添加车位信息
const onClick = async () => {
    loading.value = true
    await addCarService(form);
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





const moveUser = async (id: any) => {
    console.log(id);
    await removeUserIdService(id)
    ElMessage({
        message: '已经移除户主',
        type: 'success',
    })
    const response: any = await getCarListService();
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未有车'
        } else {
            item.live = '已有车'
        }
    })
    console.log(response);
    tableData.value = response;
}

const deleteCarport = async (id: any) => {
    console.log(id);
    await removeCarportService(id)
    ElMessage({
        message: '已经删除车位',
        type: 'success',
    })
    const response: any = await getCarListService();
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未有车'
        } else {
            item.live = '已有车'
        }
    })
    console.log(response);
    tableData.value = response;
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
        const response: any = await getCarListService();
        response.forEach((item: any) => {
            if (item.userid === null) {
                item.live = '未有车'
            } else {
                item.live = '已有车'
            }
        })
        console.log(response);
        tableData.value = response;

        len.value = tableData.value.length;
        total.value = tableData.value.length;
    } catch (error) {
        console.error('获取车辆数据失败', error)
    }
})
</script>

<template>
    <div class="admin-body-main-table">
        <div class="admin-body-main-table-content">
            <div class="admin-body-main-table-content-title">
                <el-button @click="dialog = true" type="primary" :icon="Plus" circle />
                <!-- <el-button text @click="dialog = true">Open Drawer with nested form</el-button> -->
                <el-drawer v-model="dialog" title="添加房屋" :before-close="handleClose" direction="ltr" class="demo-drawer">
                    <div class="demo-drawer__content">
                        <el-form :model="form">
                            <el-form-item label="车位名" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="类型" :label-width="formLabelWidth">
                                <el-select v-model="form.type" placeholder="Please select activity area">
                                    <el-option label="普通车位" value="普通车位" />
                                    <el-option label="消防车位" value="消防车位" />
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
                <el-table-column fixed prop="id" label="车辆编号" width="220" />
                <el-table-column prop="name" label="车辆名" width="220" />
                <el-table-column prop="live" label="车位状态" width="220" />
                <el-table-column prop="type" label="车辆类型" width="220" />
                <el-table-column prop="atTime" label="到期时间" width="400" />
                <el-table-column fixed="right" label="Operations" min-width="220">
                    <template #default="scope">
                        <!-- <el-button type="primary" size="small" @click="handleClick">
                            分配房屋并授权
                        </el-button> -->
                        <el-button @click="moveUser(scope.row.id)" type="primary" size="small">移除户主</el-button>
                        <el-button @click="router.push({ path: '/admin/updateCarport', query: { carId: scope.row.id } })"
                            type="primary" size="small">修改</el-button>
                        <el-button @click="deleteCarport(scope.row.id)" type="primary" size="small">删除</el-button>
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
