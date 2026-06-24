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
