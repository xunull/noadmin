<template lang="html">
    <div class="row">
        <div class="col-sm-6 col-sm-offset-2">
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">角色名</label>
                <div class="col-sm-10">
                  <input v-model='name' type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">角色描述</label>
                <div class="col-sm-10">
                  <input v-model='description' type="password" class="form-control" id="inputPassword3" placeholder="Password">
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">父角色</label>
                <div class="col-sm-10">
                    <template>
                        <el-select v-model="parent">
                            <el-option
                                v-for="item in options"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                  </template>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <el-button type="primary" @click.native='saveRole'>
                        创建角色
                    </el-button>
                </div>
              </div>
            </form>
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

        }
    },
    components: {

    }
}
</script>

<style lang="css">

</style>
