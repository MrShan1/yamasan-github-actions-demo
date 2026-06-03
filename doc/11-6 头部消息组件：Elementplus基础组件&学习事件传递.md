# Elementplus基础组件&学习事件传递

## 扩展基础组件Badge，自定义属性

新建业务组件notice-message.vue，尝试调用Badage组件

新建基础组件Notification.vue，扩展Badge组件

- 使用Iconify图标作为slot
- 定义组件props的ts类型，在BadgeProps类型的基础上进行扩展
- props主要分为icon样式设置和bage样式设置
- 尝试自定义设置badge颜色。通过自定义style变量+样式透传，或直接绑定color(新版)
- 尝试自定义设置badge尺寸。通过自定义style变量+样式透传，或直接绑定badge-style(新版)



## 使用缩放控制badge尺寸

使用font-size控制badge尺寸是有极限的，小于12px不生效

添加scale属性，基于scale()控制badge尺寸

添加translateX的动态转换函数。scale变化时，translateX也要随着改变，两者为线性关系

绑定Badge的style，添加scale和translateX的局部变量

在scoped style中，使用scale和translateX变量，设置Badge的transform属性

在notice-message.vue中，测试scale变化时，Badge的缩放是否正确

