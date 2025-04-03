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
import { onMounted } from 'vue'
import { getHouseListService, addHouseService } from '@/api/HouseApi'






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
    await addHouseService(form);
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








onMounted(async () => {
    try {
        const response: any = await getHouseListService();
        console.log(response);
        tableData.value = response;
    } catch (error) {
        console.error('获取房屋数据失败', error)
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
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="id" label="房屋编号" width="150" />
                <el-table-column prop="name" label="房屋名" width="180" />
                <el-table-column prop="area" label="房屋大小" width="180" />
                <el-table-column prop="roomNumber" label="房屋位置" width="300" />
                <el-table-column prop="type" label="房屋类型" width="180" />
                <el-table-column prop="atTime" label="房屋到期时间" width="600" />
                <el-table-column fixed="right" label="Operations" min-width="200">
                    <template #default>
                        <el-button type="primary" size="small" @click="handleClick">
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

.admin-body-main-table-content-title {

    display: flex;
    align-items: center;
    justify-content: flex-end;

    height: 50px;
    padding: 10px;
    border-bottom: solid 0.8px rgb(217, 207, 207);
}
</style>
