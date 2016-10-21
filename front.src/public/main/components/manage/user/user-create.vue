<template lang="html">
    <div class="row">
        <div class="col-sm-5 col-sm-offset-2">
            <el-form ref="form" label-width="80px" @submit.prevent="onSubmit">
              <el-form-item label="用户名">
                <el-input v-model='name'></el-input>
              </el-form-item>
              <el-form-item label="登陆名">
                <el-input v-model='loginname'></el-input>
              </el-form-item>
              <el-form-item label="初始密码">
                <el-input v-model='password'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click.native='saveUser' type="primary">立即创建</el-button>
                <el-button @click.native.back='back'>取消</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {

        return {
            name: null,
            loginname: null,
            password: null
        }

    },
    computed: {

    },
    mounted() {

    },
    methods: {
        saveUser: function() {

            console.log(this.$data);

        },
        back: function() {
            this.$router.push('/manage/user/userTable')
        }
    },
    components: {

    }
}
</script>

<style lang="css">

</style>
