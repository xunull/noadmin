<template lang="html">
    <div class="row">
        <div class="col-sm-6 col-sm-offset-2">
            <el-form ref="form" label-width="80px" @submit.prevent="onSubmit">
              <el-form-item label="角色名">
                <el-input v-model='name'></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model='description'></el-input>
              </el-form-item>
              <el-form-item label="父角色">
                  <el-select v-model="parent">
                      <el-option
                          v-for="item in options"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click.native='saveRole' type="primary">立即创建</el-button>
                <el-button @click.native.back='back'>取消</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {

        var roleOptions = [];

        this.$http.get('/api/role/all').then((response) => {
            // this.$data.meetings = response.body;
            if (response.body.ok) {
                console.log(response.body);

                var temp = [];
                response.body.data.forEach(function(value, index) {
                    temp.push({
                        value: value._id,
                        label: value.name
                    })
                })

                roleOptions.push(...temp);
            } else {
                console.log(response.body.msg);
            }

        }, (response) => {
            console.log(response);
        });

        return {
            options: roleOptions,
            parent: null,
            name: null,
            description: null
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        saveRole: function() {

            console.log(this.$data);

            this.$http.post('/api/role/save', {
                name: this.$data.name,
                description: this.$data.description,
                parent: this.$data.parent
            }).then((response) => {

            }, (response) => {

            });

        },
        back:function() {
            this.$router.push('/manage/role/roleTable')
        }
    },
    components: {

    }
}
</script>

<style lang="css">

</style>
