# 功能性组件：集成ECharts图表、富文本编辑器、音视频组件

## 集成ECharts：第三方图表组件vue-charts

使用pnpm安装echarts和vue-echarts

在pages下创建chart.vue，引入vue-echarts的demo，用于测试图表展示效果

为demo设置autoresize属性，让图表尺寸自适应

在components/charts下创建VueEcharts.vue组件，将demo移入组件中，测试效果

创建.d.ts文件，从vue-echarts源码中搬运props相关的类型定义代码，复杂的事情简单做！

修改VueEcharts，将option从外侧传递，并进行类型适配

调整theme的实现方式，在组件props中添加theme，并设值类型和默认值

调整theme属性的灵活性，theme如果为自定义颜色，将值绑定到style上

添加heigth属性，设置类型和默认值，允许数字和字符串，添加height的解析逻辑

