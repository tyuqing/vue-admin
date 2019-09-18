<template>
  <div>
    <i-form ref="form" :model="formData" :label-width="90" :rules="rules">
      <FormItem label="文章名:" prop="name">
        <i-input v-model="formData.name" placeholder="请输入文章名" />
      </FormItem>
    </i-form>
  </div>
</template>

<script>
// 接口
import { addArticle, updateArticle } from '@/api/article';
/**
 * 初始化表单
 */
function initFormData() {
  return {
    name: '',
  };
}

export default {
  components: {},
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    data: Object,
  },
  data() {
    // 表单内容初始化
    let formData = {};
    if (this.formType === 'add') {
      formData = initFormData();
    } else {
      formData = JSON.parse(JSON.stringify(this.data));
    }
    return {
      formData,
      /* 模块列表 */
      moduleList: [],
      rules: {
        name: [{ required: true, message: '文章名', trigger: 'blur' }],
      },
      priorityList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 校验表单
     */
    async validateForm() {
      const pValidate = new Promise((resolve) => {
        this.$refs.form.validate((_valid) => {
          resolve(_valid);
        });
      });
      const valid = await pValidate;
      return valid;
    },
    /**
     * 提交表单
     */
    submitForm() {
      if (this.formType === 'add') {
        // 新增
        return addArticle({
          name: this.formData.name,
        }).then((response) => {
          this.$Message.success('创建成功');
          return response;
        });
      }
      // 更新
      return updateArticle({
        id: this.formData.id,
        name: this.formData.name,
      }).then((response) => {
        this.$Message.success('更新成功');
        return response;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
