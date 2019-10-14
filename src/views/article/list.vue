<template>
  <div class="m-container m-view--list">
    <div>
      <Button type="primary" @click="showAddArticle">创建文章</Button>
    </div>
    <div>
      <i-table
        class="no-outside-border"
        stripe
        :columns="articleColumns"
        :data="articleList"
        no-data-text="暂无数据，请先创建文章"
      />
    </div>
    <!--分页-->
    <div class="m-page">
      <Page
        class="f-fr"
        size="small"
        :current="pageInfo.page"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        @on-change="onPageChange"
        show-total
      ></Page>
    </div>
    <!--新建文章-->
    <Modal
      ref="articleModal"
      v-model="modal.article"
      :title="modal.articleType === 'add' ? '新建文章' : '编辑文章'"
      :mask-closable="false"
      loading
      transfer
      @on-ok="submitForm"
    >
      <ArticleForm
        ref="articleForm"
        v-if="modal.article"
        :data="currentArticle"
        :formType="modal.articleType"
      ></ArticleForm>
    </Modal>
  </div>
</template>

<script>
/* 接口 */
import { getArticleList, deleteArticle } from '@/api/article';

export default {
  components: {
    ArticleForm: () => import('@/components/article/article-form.vue'),
  },
  props: {},
  data() {
    return {
      articleList: [],
      /* 过滤 */
      filter: {
        keyword: '',
      },
      /* 分页信息 */
      pageInfo: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
      modal: {
        article: false,
        articleType: 'add',
      },
      currentArticle: {},
      // 表格结构
      articleColumns: [
        {
          type: 'index',
          width: 50,
        },
        {
          title: '文章名',
          key: 'name',
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, { row }) => (
              <div class="table_action">
                <span
                  class="clickable"
                  onClick={() => {
                    this.showEditArticle(row);
                  }}
                >
                  编辑
                </span>
                <span
                  class="clickable--error"
                  onClick={() => {
                    this.confirmDeleteArticle(row.id);
                  }}
                >
                  删除
                </span>
              </div>
          ),
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleList();
  },
  mounted() {},
  methods: {
    /**
     * 获取文章列表
     */
    getArticleList() {
      getArticleList({
        projectId: this.$projectId,
        keyword: this.filter.keyword,
        page: this.pageInfo.page,
        pageSize: this.pageInfo.pageSize,
      }).then((response) => {
        this.articleList = response.data.items || [];
        // 更新分页信息
        this.pageInfo.total = response.data.pageInfo.total;
        this.pageInfo.page = response.data.pageInfo.page;
      });
    },
    /**
     * 切换页面
     * @param {Number} page  当前选中页
     */
    onPageChange(page) {
      this.pageInfo.page = page;
      this.getArticleList();
    },
    /**
     * 搜索
     */
    onSearch() {
      this.pageInfo.page = 1;
      this.getArticleList();
    },
    /**
     * 显示新建弹框
     */
    showAddArticle() {
      this.modal.articleType = 'add';
      this.modal.article = true;
    },
    /**
     * 显示编辑弹框
     */
    showEditArticle(data) {
      this.currentArticle = data;
      this.modal.articleType = 'edit';
      this.modal.article = true;
    },
    /**
     * 删除二次确认弹框
     */
    confirmDeleteArticle(id) {
      this.$Modal.confirm({
        title: '删除',
        content: '确定删除此文章吗？',
        okType: 'error',
        onOk: () => {
          this.deleteArticle(id);
        },
      });
    },
    /**
     * 删除
     */
    deleteArticle(id) {
      deleteArticle({
        id,
      }).then(() => {
        this.getArticleList();
        this.$Message.success('删除成功');
      });
    },
    /**
     * 提交表单
     */
    async submitForm() {
      /* 模态框 */
      const { articleModal } = this.$refs;
      /* 表单 */
      const { articleForm } = this.$refs;
      /* 校验表单 */
      if (!(await articleForm.validateForm())) {
        articleModal.buttonLoading = false;
        return;
      }
      articleForm
        .submitForm()
        .then(() => {
          // 返回结果处理
          this.modal.article = false;
          this.getArticleList();
        })
        .catch(() => {
          articleModal.buttonLoading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
