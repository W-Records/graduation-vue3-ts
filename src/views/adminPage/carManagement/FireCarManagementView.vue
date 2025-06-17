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



// 搜索框的单选项
const radio1 = ref('updown')
const input2 = ref('')


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
    updown: '',
})

// 添加车位信息
const onClick = async () => {
    loading.value = true
    await addCarService(form);
    loading.value = false
    dialog.value = false

    let response: any = await getCarListService();
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未有车'
        } else {
            item.live = '已有车'
        }
    })
    // 只留下type为消防车位的对象
    response = response.filter((item: any) => item.type === '消防车位');
    console.log(response);
    tableData.value = response;

    len.value = tableData.value.length;
    total.value = tableData.value.length;
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
    let response: any = await getCarListService();
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未有车'
        } else {
            item.live = '已有车'
        }
    })
    // 只留下type为消防车位的对象
    response = response.filter((item: any) => item.type === '消防车位');
    console.log(response);
    tableData.value = response;

    len.value = tableData.value.length;
    total.value = tableData.value.length;
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
        let response: any = await getCarListService();
        response.forEach((item: any) => {
            if (item.userid === null) {
                item.live = '未有车'
            } else {
                item.live = '已有车'
            }
        })
        // 只留下type为消防车位的对象
        response = response.filter((item: any) => item.type === '消防车位');
        console.log(response);
        tableData.value = response;

        len.value = tableData.value.length;
        total.value = tableData.value.length;
    } catch (error) {
        console.error('获取车辆数据失败', error)
    }
})


const searchData = async () => {
    console.log(radio1.value);
    console.log(input2.value);

    // const response: any = await getBillListService();
    let response: any = await getCarListService();
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未有车'
        } else {
            item.live = '已有车'
        }
    })
    // 只留下type为消防车位的对象
    response = response.filter((item: any) => item.type === '消防车位');
    console.log(response);


    console.log(response);
    // 我现在需要在response数组对象中过滤数据，radio1为过滤时的属性，input2为过滤时用户输入的内容
    const responseFilter = response.filter((item: any) => {
        if (radio1.value === "live") {
            return item.live.includes(input2.value);
        } else if (radio1.value === "updown") {
            return item.updown.includes(input2.value);
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
                            <!-- <el-radio-button label="车位状态" value="live" /> -->
                            <el-radio-button label="类型" value="updown" />
                            <!-- <el-radio-button label="用户名" value="username" />
                            <el-radio-button label="账单状态" value="status" /> -->
                        </el-radio-group>
                        <div style="margin-left: 40px">
                            <el-input v-model="input2" style="width: 240px" placeholder="根据按钮选项搜索" :prefix-icon="Search" />
                            <el-button @click="searchData()" style="margin-left: 6px" type="primary" round
                                size="small">搜索</el-button>
                        </div>
                    </div>
                </div>
                <div>
                    <el-button @click="dialog = true" type="primary" :icon="Plus" circle />
                    <!-- <el-button text @click="dialog = true">Open Drawer with nested form</el-button> -->
                    <el-drawer v-model="dialog" title="添加房屋" :before-close="handleClose" direction="ltr"
                        class="demo-drawer">
                        <div class="demo-drawer__content">
                            <el-form :model="form">
                                <el-form-item label="车位名" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="类型" :label-width="formLabelWidth">
                                    <el-select v-model="form.updown" placeholder="地上还是地下">
                                        <el-option label="地上" value="地上" />
                                        <el-option label="地下" value="地下" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="车位性质" :label-width="formLabelWidth">
                                    <el-select v-model="form.type" placeholder="">
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
            </div>
            <el-table :data="tableDataPage" style="width: 100%">
                <el-table-column fixed prop="id" label="#" width="200" />
                <el-table-column prop="name" label="车位名" width="290" />
                <el-table-column prop="type" label="车位属性" width="290" />
                <el-table-column prop="updown" label="类型" width="270" />
                <el-table-column prop="live" label="车位状态" width="610" />
                <!-- <el-table-column prop="atTime" label="到期时间" width="400" /> -->
                <el-table-column fixed="right" label="操作" min-width="150">
                    <template #default="scope">
                        <!-- <el-button type="primary" size="small" @click="handleClick">
                            分配房屋并授权
                        </el-button> -->
                        <!-- <el-button @click="moveUser(scope.row.id)" type="primary" size="small">移除户主</el-button> -->
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
.admin-body-main-table-content-title-search {
    display: flex;
    align-items: center;
}

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
    justify-content: space-between;

    height: 60px;
    padding: 10px;
    border-bottom: solid 0.8px rgb(217, 207, 207);
}
</style>
