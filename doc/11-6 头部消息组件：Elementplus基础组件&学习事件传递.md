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

初步实现业务消息组件Notice

- 编写Notice.vue结构，包括Notification + NoticeMessageList
- 使用el-dropdown实现消息弹出，触发方式为click
- 提取Notification的类型到单独的.d.ts文件，方便导入业务消息组件

在notice-message.vue中引入Notice，测试功能

完善NoticeMessageList的el-tab-panel，搭建内容结构

- 使用el-row和el-col进行布局
- 使用el-avatar显示头像
- 使用el-tag显示消息标记



## 事件定义和TS集成优化

创建Iconify.vue基础组件，方便后续引入

### 完善NoticeMessageList组件

完善NoticeMessageList的相关ts定义

- 消息元素的ts定义
- 消息列表的ts定义
- 消息Action的ts定义，也就是按钮组中的按钮
- 消息列表组件本身的ts定义，包含消息列表和消息Action列表

为消息Action按钮添加事件绑定

为消息列表元素添加头像点击事件和消息点击事件

将模板中的测试数据替换为props属性

为部分绑定数据设置默认值。考虑使用Object.assign

将NoticeMessageList的相关ts定义转移至.d.ts文件中，方便引用

### 完善Notice组件

完善Notice的相关ts定义，使用扁平化处理和extends进行优化，避免层级过多

优化传递给Notification的props，使用解构赋值避免不必要的参数传递

将Notice的相关ts定义转移至.d.ts文件中，方便引用



## CSS中的v-bind

优化js变量传递到scoped style的方式，改为使用CSS中的v-bind。自定义style变量+样式透传 的方式不方便，比较冗余。

v-bind中不能使用var()表达式，可以先在js中定义computed，后将computed传递给v-bind
