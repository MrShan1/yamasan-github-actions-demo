# 自动化部署：探索GitHub Actions与依赖管理

## 认识GithubActions

**简单了解工作流程文件。工作流程文件通常为yaml文件**

- name:   工作流名称

- on: 工作流的触发器，可以设置多个触发器

- jobs: 工作流中运行的所有作业

  - xxx-job: 名为xxx-job的作业

    - runs-on: 作业运行的机器类型

    - steps: 作业的所有步骤

      ```markdown
      - name: 步骤名称
        uses: 在作业步骤中运行的操作
        run:  在作业步骤中中运行的命令行程序
      ```

**创建GitHub仓库，为实践GithubActions做准备**

- 创建公开仓库
- 在本地项目添加远程仓库
- 在本地添加main分支
- 推送本地代码到远程仓库的main分支

**创建GithubActions的Workflow**

- 创建工作流。创建空的工作流，或使用简单模板创建工作流
- 编写工作流。简单编写，只用来测试
- 提交工作流。Commit changes
- 执行工作流。Actions -> Run workflow



## GithubActions来发布一个vue3基础项目

**编写真实的工作流**

- 步骤1：安装node环境。使用模板Setup Node.js environment，设置node-version, cache, cache-dependency-path
- 步骤2：拉取代码。使用模板Checkout
- 步骤3：安装依赖。pnpm install
- 步骤4：打包构建。pnpm build
- 步骤5：检查生成文件。ubuntu命令：ls -la && ls dist/

**执行工作流**

- 执行工作流，解决node环境安装错误。根据setup-node库的[文档说明](https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#caching-packages-data)，调整工作流配置，`在安装node环境之前，添加Checkout和Setup pnpm的步骤`
- 在on配置中，添加push: branches["main"]，远程提交代码时自动触发工作流

**发布网站**

- 在工作流中添加步骤6：发布网站。使用模板Github pages，设置build_dir和token
- 为工作流添加写入权限。在工作流中，添加permissions: contents: write
- 执行工作流，生成网站所需的资源文件，放在自动创建的分支
- 发布网站。在settings -> pages中，设置要部署的网站，生成部署网站的工作流pages build and deployment，并自动开始执行
- 尝试访问网站。选择部署网站工作流的deploy，点击链接访问网站
- 解决资源路径问题。在项目vite.config.ts中，调整网站的base路径，根据环境变量动态添加网站前缀
- 再次访问网站确认结果
- 将远程代码拉取到本地同步
- 解决下划线资源被忽略问题。在发布网站步骤中，添加配置jekyll: false

