<template lang="html">
    <div class="row">
        <div class="col-sm-5 col-sm-offset-2">
            <el-form ref="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model='username'></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model='password'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click.native='saveUser' type="primary">登陆</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
var kshellEmitter = require('./lib/kshellSocketio').socket;

export default {
    data() {

        return {
            username: null,
            password: null
        }

    },
    computed: {

    },
    mounted() {

    },
    methods: {
        saveUser: function() {

            if(socket.connected) {
                this.$http.post('/kshell/login', {
                    username: this.$data.username,
                    password: this.$data.password,
                    socketid:socket.id
                }).then(function(response) {
                    console.log(response);
                }, function(response) {
                    console.log(response);
                });
            } else {
                alert('未连接到服务端,请稍后再试');
            }

        }
    },
    components: {

    }
}
</script>

<style lang="css">

</style>
