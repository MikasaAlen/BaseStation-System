<template>
  <el-dialog
    width="30%"
    title="密码修改"
    :visible="visible"
    @close="handleCancelUpdate"
    class="update-pwd"
  >
    <el-form
      label-position="left"
      label-width="80px"
      ref="form"
      :rules="rules"
      :model="pwd"
    >
      <el-form-item label="旧密码" prop="old">
        <el-input size="small" v-model="pwd.old" />
      </el-form-item>
      <el-form-item label="新密码" prop="new">
        <el-input size="small" v-model="pwd.new" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
			<el-button @click="handleCancelUpdate">取 消</el-button>
			<el-button @click="handleUpdatePWD" type="primary">确 定</el-button>
		</span>
  </el-dialog>
</template>

<script>

  export default {
    props: ["visible"],
    data: () => ({
      pwd: {
        old: "",
        new: ""
      },
      rules: {
        old: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur"
          }
        ],
        new: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur"
          }
        ]
      }
    }),
    methods: {
      // 取消更改密码
      handleCancelUpdate() {
        this.pwd.old = "";
        this.pwd.new = "";
        this.$emit("close");
      },
      // 更改密码
      handleUpdatePWD() {
        var data = this.pwd.new
        if(this.pwd.new!="" && this.pwd.old!="") {
          this.$emit("UpdatedPWD",data)
        }

      }
    }
  };
</script>
