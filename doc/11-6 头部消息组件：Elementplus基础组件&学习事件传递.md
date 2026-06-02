# Elementplus基础组件&学习事件传递

## 扩展基础组件Badge，自定义属性

新建业务组件notice-message.vue，尝试调用Badage组件

新建基础组件Notification.vue，扩展Badge组件

- 使用Iconify图标作为slot
- 定义组件props的ts类型，在BadgeProps类型的基础上进行扩展
- props主要分为icon样式设置和bage样式设置
- 尝试自定义设置badge颜色。通过自定义style变量+样式透传，或直接绑定color(新版)
- 尝试自定义设置badge尺寸。通过自定义style变量+样式透传，或直接绑定badge-style(新版)

