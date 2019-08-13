<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleid?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题: ">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <quill-editor :options="editorOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: ">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">3张图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 使用选择图片组件 -->

          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道: ">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="articleid">
          <el-button type="primary" @click="submit(false)">修改</el-button>
          <el-button @click="submit(true)">纯如草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">发表</el-button>
          <el-button @click="update(true)">纯如草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        content: null,
        title: null,
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      articleid: null
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleid = null
        this.articleForm = {
          content: null,
          title: null,
          channel_id: null,
          cover: {
            type: 1,
            images: []
          },
          articleid: null
        }
      }
    }
  },
  created () {
    this.articleid = this.$route.query.id
    if (this.articleid) {
      this.getArticle()
    }
  },
  methods: {
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleid)
      this.articleForm = data
    },
    changeType () {
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      // 发请求
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // 跳转内容管理
      this.$router.push('/article')
    },
    async  update (draft) {
      await this.$http.put(`articles/${this.articleid}?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '修改.存入草稿成功' : '修改成功')
      // 跳转内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'>
</style>
