# 自动化部署：探索GitHub Actions与依赖管理

## 认识GithubActions

**简单了解工作流程文件。工作流程文件通常为yml文件**

- name: 工作流名称

- on: 工作流的触发器，可以设置多个触发器

- jobs: 工作流中运行的所有作业
  - xxx-job: 名为xxx-job的作业
    - runs-on: 作业运行的机器类型

    - steps: 作业的所有步骤

      ```markdown
      - name: 步骤名称
        uses: 在作业步骤中运行的操作
        run: 在作业步骤中中运行的命令行程序
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

- 发布网站。在settings -> pages中，设置要部署的网站，选择Deploy from branch，生成部署网站的工作流pages build and deployment，并自动开始执行

- 尝试访问网站。选择部署网站工作流的deploy，点击链接访问网站

- 将远程代码拉取到本地同步

**解决发布问题**

- 解决资源路径问题。在项目vite.config.ts中，调整网站的base路径，根据环境变量动态添加Github Pages网站前缀
- 解决下划线资源被忽略问题。在发布网站步骤中，添加配置jekyll: false
- 解决history路由不支持问题。添加build:actions脚本，在脚本中添加环境变量VITE_ACTIONS，Github Pages时使用hash模式

## 实践GithubActions：template项目发布静态站

**调整网站发布流程**

- 修改网站发布方式。在settings -> pages中，修改为GitHub Actions。Jekyll对静态资源加载不友好
- 调整工作流配置。参照Vite的 [GitHub Pages](https://cn.vitejs.dev/guide/static-deploy#github-pages) 说明，添加permissions、concurrency配置，在job中添加environment配置，调整GitHub Pages相关步骤的配置
- 执行工作流。构建完成后，会直接发布网站，访问网站查看资源加载情况

**实现网站前缀的动态设置**

- 添加提取仓库名称步骤。添加install步骤后，添加一个步骤，通过shell指令获取环境变量 [GITHUB_REPOSITORY](https://docs.github.com/zh/actions/reference/workflows-and-actions/variables)，并截取仓库名称 `REPO_NAME`，将其写入 `GITHUB_ENV` 中。参考[设置环境变量](https://docs.github.com/zh/actions/reference/workflows-and-actions/workflow-commands#setting-an-environment-variable)
- 在build步骤中添加环境变量。在env中添加环境变量 `BASE_PATH`，利用 `env.REPO_NAME`设置网站前缀
- 在vite.config.ts中，根据env.BASE_PATH，调整网站前缀base的设置
- 执行工作流，确认网站前缀改为动态后，网站资源访问依然生效
- 临时修改仓库名，手动触发工作流，确认网站资源访问依然生效，然后还原仓库名

**优化git提交记录**

- 使用git rebase删除无用的提交记录，优化GitHub上的提交历史，相对干净一些
- `git rebase -i head~9 `，意思是，可以对最近 9 个提交进行交互式变基，让你可以修改、合并、重新排序或删除它们。
- 你可以将 `pick` 修改为其他命令。pick：`保留这个提交，不变`；squash：`合并到前一个提交，并合并提交信息`，fixup：`合并到前一个提交，但丢弃该提交的提交信息`
- 使用强制提交，优化远端提交历史。`git push origin main -f`，直接用自己的本地提交覆盖远程分支，丢失远程独有的提交



## GithubPages自定义域名开启HTTPS

购买互联网域名。在阿里云购买一个互联网域名，我的域名放在Cloudflare上管理

在GitHub上添加此域名。在用户Settings/Pages中，将购买的域名添加进去，确认GitHub的`DNS TXT`记录，包括`主机记录（Host）`和`记录值（Value）`

在Cloudflare添加GitHub的`DNS TXT`记录。在[CloudFlare/DNS/记录](https://dash.cloudflare.com/d128c846bfc879322ae2398516c8240e/yamasan.top/dns/records)中，添加TXT记录，填写`DNS TXT`的两个记录，用于**GitHub验证你对这个域名的所有权**，使用完可以删除

在GitHub上验证域名所有权。在用户Settings/pages中，点击Verify，确认验证结果

在Cloudflare添加子域名的`CNAME`记录。在[CloudFlare/DNS/记录](https://dash.cloudflare.com/d128c846bfc879322ae2398516c8240e/yamasan.top/dns/records)中，添加CNAME记录，名称为 `vue3-dev-demo`，目标为`<user>.github.io`，将您的子域指向站点的默认域名。这条记录是网站能够被正常访问的基础，**必须永久保留**。详情参考GitHub的[配置子域](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)

自定义仓库的子域名。在仓库Settings/Pages中，在互联网域名的基础上，自定义一个子域名：`vue3-dev-demo.yamasan.top`，点击保存（等待DNS检查通过后），然后尝试访问改网站

调整工作流，解决资源路径前缀问题。在工作流中，移除提取仓库名称的步骤；调整项目的vite.config.ts，修改base设置，不再需要资源前缀

设置网站快捷访问。在仓库首页，点击右上角设置图标，在Website中添加网站的互联网域名，方便直接访问



## [扩展]Dependabot更新项目依赖

**了解Dependabot的概念和作用**。参考[什么是 Dependabot？](https://docs.github.com/zh/code-security/concepts/supply-chain-security/supply-chain-security#what-is-dependabot)，[关于 Dependabot](https://docs.github.com/zh/code-security/tutorials/secure-your-dependencies/dependabot-quickstart#关于-dependabot)

**启用bot的自动警报和安全更新**。在仓库/Settings/Advanced Security中，启用`Dependabot security updates`，`Dependabot alerts`也会被自动启用，然后bot会自动提交警报和安全更新pr。参考[为你的存储库启用 Dependabot](https://docs.github.com/zh/code-security/tutorials/secure-your-dependencies/dependabot-quickstart#为你的存储库启用-dependabot)

**确认bot的自动提交<u>依赖更新pr</u>功能**。bot启用后，如果有警报和安全相关的依赖更新，会在仓库/Pull requests中看到bot提交的pr，可以手动或自动合并pr

**设置bot的自动批准pr功能**。在仓库的.github/workflows中，创建一个新的工作流dependabot.yml，编写自动批准pr的工作流并保存。内容参考[自动批准拉取请求](https://docs.github.com/zh/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions#automatically-approving-a-pull-request)

**启用bot的自动版本更新**。在仓库/Settings/Advanced Security中，启用`Dependabot security updates`，配置版本更新用的工作流yml，配置`package-ecosystem`、`schedule`等，然后保存提交，并确认配置校验通过。配置项参考[Dependabot 选项参考](https://docs.github.com/zh/code-security/reference/supply-chain-security/dependabot-options-reference)

**提高工作流的读写权限，使bot工作流生效**。在仓库/Settings/Actions/General中，找到Workflow permissions，修改工作流权限，允许读写，允许创建和批准pr

**手动合并bot批准的pr**。bot批准pr后，在仓库/Pull requests中，手动将bot批准的pr合并到仓库，选择直接merge。也可以选择squash and merge，不生成合并提交信息，适合小更新

**了解仓库分支保护规则设置**。在仓库/Settings/Rules/Rulesets中，可以为分支添加保护规则，例如设置pr的审批人数，至少n个人审批通过后才可以合并；在仓库/Settings/Branches中，也可以看到创建好的分支保护规则，可以进行再次编辑。

**了解bot的自动合并pr功能**。参考[在拉取请求上启用自动合并](https://docs.github.com/zh/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions#enabling-automerge-on-a-pull-request)。`不推荐，一般手动合并`

