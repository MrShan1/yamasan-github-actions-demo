# 头部消息组件：Elementplus基础组件&学习事件传递

## 扩展基础组件Badge，自定义属性

新建业务组件notice-message.vue，尝试调用Badage组件

新建基础组件Notification.vue，扩展Badge组件

- 使用Iconify图标作为slot
- 定义组件props的ts类型，在BadgeProps类型的基础上进行扩展
- props主要分为icon样式设置和bage样式设置
- 尝试自定义设置badge颜色。通过自定义style变量+样式透传，或直接绑定color(新版)
- 尝试自定义设置badge尺寸。通过自定义style变量+样式透传，或直接绑定badge-style(新版)



## 使用缩放控制Badge尺寸

使用font-size控制badge尺寸是有极限的，小于12px不生效

添加scale属性，基于scale()控制badge尺寸

添加translateX的动态转换函数。scale变化时，translateX也要随着改变，两者为线性关系

绑定Badge的style，添加scale和translateX的局部变量

在scoped style中，使用scale和translateX变量，设置Badge的transform属性

在notice-message.vue中，测试scale变化时，Badge的缩放是否正确



## 弹出列表样式

准备实现功能完整的业务消息组件，包括消息提示 + 消息列表弹出

创建业务消息组件Notice.vue、消息列表组件NoticeMessageList.vue

初步实现消息列表组件组件

- 编写NoticeMessageList.vue结构，主要包括el-tabs + el-button-group
- el-tabs包含若干个el-tab-panel，显示不同类型的消息
- el-button-group包含两个按钮：清空、更多，为按钮添加对应的图标

初步实现业务消息组件

- 编写Notice.vue结构，包括Notification + NoticeMessageList
- 使用el-dropdown实现消息弹出，触发方式为click
- 提取Notification的类型到单独的.d.ts文件，方便导入业务消息组件

在notice-message.vue中引入Notice，测试功能

完善NoticeMessageList的el-tab-panel，搭建内容结构

- 使用el-row和el-col进行布局
- 使用el-avatar显示头像
- 使用el-tag显示消息标记
