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
// import { getBillListService, addBillService, deleteBillService } from '@/api/BillApi'
import { getAllUserService } from '@/api/UserApi'
import { getbilltypeService, addbilltypeService, deletebilltypeService } from '@/api/BillTypeApi'

// 搜索框的单选项
const radio1 = ref('name')
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
    amount: '',
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
    // form.userid = form.user.id
    // form.username = form.user.username
    console.log(form);
    await addbilltypeService(form);
    loading.value = false
    dialog.value = false


    const response: any = await getbilltypeService();
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
        const response: any = await getbilltypeService();
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
    await deletebilltypeService(id);
    ElMessage({
        message: '删除成功',
        type: 'success',
    })

    const response: any = await getbilltypeService();
    console.log(response);
    tableData.value = response;


    len.value = tableData.value.length;
    total.value = tableData.value.length;
}


const searchData = async () => {
    console.log(radio1.value);
    console.log(input2.value);

    const response: any = await getbilltypeService();
    console.log(response);
    // 我现在需要在response数组对象中过滤数据，radio1为过滤时的属性，input2为过滤时用户输入的内容
    const responseFilter = response.filter((item: any) => {
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
                            <el-radio-button label="账单名" value="name" />
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
                    <el-drawer v-model="dialog" title="添加账单" :before-close="handleClose" direction="ltr"
                        class="demo-drawer">
                        <div class="demo-drawer__content">
                            <el-form :model="form">
                                <el-form-item label="账单名" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="默认金额" :label-width="formLabelWidth">
                                    <el-input v-model="form.amount" autocomplete="off" />
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
                <el-table-column fixed prop="id" label="账单编号" width="360" />
                <el-table-column prop="name" label="账单名" width="450" />
                <el-table-column prop="amount" label="标准价格" width="600" />
                <el-table-column fixed="right" label="操作" min-width="150">
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
