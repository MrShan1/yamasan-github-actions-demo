# 功能性组件：集成ECharts图表、富文本编辑器、音视频组件

## 集成ECharts：第三方图表组件vue-charts

使用pnpm安装echarts和vue-echarts

在pages下创建chart.vue，引入vue-echarts的demo，用于测试图表展示效果

为demo设置autoresize属性，让图表尺寸自适应

在components/charts下创建VueEcharts.vue组件，将demo移入组件中，测试效果

创建.d.ts文件，从vue-echarts源码中搬运props相关的类型定义代码，复杂的事情简单做！位置参考：src/ECharts.ts

修改VueEcharts，将option从外侧传递，并进行类型适配

调整theme的实现方式，在组件props中添加theme，并设值类型和默认值

调整theme属性的灵活性，theme如果为自定义颜色，将值绑定到style上

添加heigth属性，设置类型和默认值，允许数字和字符串，添加height的解析逻辑



## VueCharts简化属性项的传递

实现图表组件的动态引入：根据props选择引入的组件

- 调整组件库的导入方式，将charts和components全量导入
- 添加charts属性，必传，设置默认值为['PieChart']
- 添加components属性，设置默认值为常用的components名称
- 调整use的使用方式，动态选择chart，平铺components组件
- 测试动态图表，将chart参数改为BarChart，调整option，测试展示效果

简化属性传递：根据option自动选择要引入的组件

- 要引入的组件分为三类：charts、components、features
- 添加map.ts，编写三类组件的名称map。从vue-echarts源码中搬运相关map信息，位置参考：demo/utils/codegen.ts
- 创建onBeforeMount钩子函数，用于后续解析和导入，这样做性能比较好？
- 解析option，提取要引入组件的名称。提取方法参考demo/utils/codegen.ts
- 根据组件名称，动态导入组件，并使用use注册

