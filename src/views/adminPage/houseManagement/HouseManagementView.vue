<script setup lang="ts">
// import { ElMessage } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
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
import { getHouseListService, addHouseService, removeUserService, updateHouseService, removeHouseService } from '@/api/HouseApi'

import { addUnitsService, getUnitsService, deleteUnitsService } from '@/api/Unit'


// 搜索框的单选项
const radio1 = ref('address')
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
    Unit: {} as any,
    elevator: "",
    address: "",
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
})
let getUnitResponse: any = ref([]);

// 添加房屋信息
const onClick = async () => {
    loading.value = true
    form.elevator = form.Unit.buildingType
    form.address = form.Unit.buildingName + form.Unit.name
    console.log(form)
    await addHouseService(form);
    loading.value = false
    dialog.value = false

    const response: any = await getHouseListService();
    console.log("aaa");
    console.log(response);
    // 遍历response对象数组，为其对象添加live属性，如果对象中的userid属性为null，则live的值为未入住，如果为非null，则live的值为已入住
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未入住'
        } else {
            item.live = '已入住'
        }
    })
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
    await removeUserService(id)
    ElMessage({
        message: '已经移除户主',
        type: 'success',
    })
    // 重新加载此路由
    // router.push('/admin/HouseManagement')
    const response: any = await getHouseListService();
    console.log("aaa");
    console.log(response);
    // 遍历response对象数组，为其对象添加live属性，如果对象中的userid属性为null，则live的值为未入住，如果为非null，则live的值为已入住
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未入住'
        } else {
            item.live = '已入住'
        }
    })
    console.log(response);
    tableData.value = response;

}

const updateHouse = async (id: any) => {
    console.log(id);
}

const deleteHouse = async (id: any) => {
    console.log(id);
    await removeHouseService(id);
    ElMessage({
        message: '删除成功',
        type: 'success',
    })

    const response: any = await getHouseListService();
    console.log("aaa");
    console.log(response);
    // 遍历response对象数组，为其对象添加live属性，如果对象中的userid属性为null，则live的值为未入住，如果为非null，则live的值为已入住
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未入住'
        } else {
            item.live = '已入住'
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
        const response: any = await getHouseListService();
        console.log("aaa");
        console.log(response);
        // 遍历response对象数组，为其对象添加live属性，如果对象中的userid属性为null，则live的值为未入住，如果为非null，则live的值为已入住
        response.forEach((item: any) => {
            if (item.userid === null) {
                item.live = '未入住'
            } else {
                item.live = '已入住'
            }
        })
        console.log(response);
        tableData.value = response;


        len.value = tableData.value.length;
        total.value = tableData.value.length;



        // 获取楼栋单元信息
        getUnitResponse.value = await getUnitsService();
        console.log(getUnitResponse.value);
    } catch (error) {
        console.error('获取房屋数据失败', error)
    }
})

const searchData = async () => {
    console.log(radio1.value);
    console.log(input2.value);

    // const response: any = await getBillListService();
    const response: any = await getHouseListService();
    console.log("aaa");
    console.log(response);
    // 遍历response对象数组，为其对象添加live属性，如果对象中的userid属性为null，则live的值为未入住，如果为非null，则live的值为已入住
    response.forEach((item: any) => {
        if (item.userid === null) {
            item.live = '未入住'
        } else {
            item.live = '已入住'
        }
    })
    console.log(response);



    console.log(response);
    // 我现在需要在response数组对象中过滤数据，radio1为过滤时的属性，input2为过滤时用户输入的内容
    const responseFilter = response.filter((item: any) => {
        if (radio1.value === "address") {
            return item.address.includes(input2.value);
        } else if (radio1.value === "roomNumber") {
            return item.roomNumber.includes(input2.value);
        } else if (radio1.value === "elevator") {
            return item.elevator.includes(input2.value);
        } else if (radio1.value === "live") {
            return item.live.includes(input2.value);
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
                            <el-radio-button label="隶属楼栋" value="address" />
                            <el-radio-button label="房间号" value="roomNumber" />
                            <el-radio-button label="电梯房" value="elevator" />
                            <el-radio-button label="入住情况" value="live" />
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
                                <el-form-item label="房屋昵称" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="房屋大小" :label-width="formLabelWidth">
                                    <el-input v-model="form.area" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="房间号" :label-width="formLabelWidth">
                                    <el-input v-model="form.roomNumber" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="所属楼栋" :label-width="formLabelWidth">
                                    <!-- <el-input v-model="form.roomNumber" autocomplete="off" /> -->
                                    <el-select v-model="form.Unit" value-key="id" placeholder="Please select activity area">
                                        <!-- 遍历getUserResponse数组 -->
                                        <el-option v-for="item in getUnitResponse" :key="item.id"
                                            :label="item.buildingName + item.name" :value="item" />
                                        <!-- <el-option label="Area1" value="shanghai" />
                                    <el-option label="Area2" value="beijing" /> -->
                                    </el-select>
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
            </div>
            <el-table :data="tableDataPage" style="width: 100%">
                <!-- <el-table-column fixed prop="id" label="#" width="150" /> -->
                <el-table-column fixed prop="address" label="隶属楼栋" width="150" />
                <el-table-column prop="roomNumber" label="房间号" width="150" />
                <el-table-column prop="elevator" label="是否为电梯房" width="150" />
                <el-table-column prop="area" label="房屋大小" width="150" />
                <el-table-column prop="live" label="房屋入住情况" width="150" />
                <el-table-column prop="username" label="户主名称" width="150" />
                <el-table-column prop="phone" label="户主电话" width="180" />
                <el-table-column prop="name" label="房屋昵称" width="180" />
                <el-table-column prop="type" label="房屋类型" width="180" />
                <el-table-column prop="atTime" label="房屋到期时间" width="600" />
                <el-table-column fixed="right" label="操作" min-width="220">
                    <template #default="scope">
                        <!-- <el-button type="primary" size="small" @click="handleClick">
                            分配房屋并授权
                        </el-button> -->
                        <el-button @click="moveUser(scope.row.id)" type="primary" size="small">移除户主</el-button>
                        <el-button @click="router.push({ path: '/admin/updateHouse', query: { houseId: scope.row.id } })"
                            type="primary" size="small">修改</el-button>
                        <el-button @click="deleteHouse(scope.row.id)" type="primary" size="small">删除</el-button>
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
