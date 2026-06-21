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



## 自定义封装ECharts组件及响应式调整

不用第三方插件，实现手动封装ECharts组件

- 在components/Chart下，创建Charts.vue，图表容器标记为chartRef
- 为Charts设置props的类型，props中有options, width, height, autoresize
- 在onMounted中，初始化echarts的实例，chartInstanceRef？？？
- 创建chartStyle，合并attrs.style和width, height，最后绑定到图表style属性上
- 在pages/chart.vue中，创建Charts的测试用例，传入option，测试展示效果

实现autoresize功能：页面尺寸变化时，图表自动重绘

- 创建resize函数，调用chartInstance.resize()
- 创建resize函数的节流函数resizeFn。使用useThrottleFn
- 在onMounted中，监听window的resize事件，页面尺寸变化时执行resizeFn
- 在onBeforeUnMount中，销毁chartInstance，并注销resize监听事件

chartRef和chartInstanceRef ，要使用ShallowRef，避免属性的深层次监听

用户更新option时，应重新设置option。使用watch监听option变化，重新setOpiton()

在pages/chart.vue中，测试option更新效果

使用emit事件暴露chartInstance，后续交由用户控制，比转发emit+expose要简单很多



## 三款富文本编辑器推荐：TuiEditor&Vditor&Milkdown

了解Quill，所见即所得，但不支持md

了解TuiEditor，支持md，最新版本适配vue,react

了解Vditor，支持md，支持JavaScript, vue, react

了解Milkdown，支持md，但只支持ESModule，无法通过cdn引入



## 自定义富文本编辑器组件：集成Vditor

创建Editor组件

- 安装Vditor。参考Vditor官方的[使用文档](https://ld246.com/article/1549638745630#---%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3)
- 在components/Editor下创建Editor.vue，引入Vditor相关组件和样式
- 在onMounted中，初始化Vditor实例editorInstance
- 在pages下创建editor.vue，引入Editor，测试富文本组件展示效果

处理Editor组件的props：TS定义、默认值

- 为Editor添加props的TS定义。和以往不同，使用reference方法引入Vditor。reference三斜线指令是比较旧的用法，了解即可，现在一般用 import type
- 定义defineProps，使用props的TS定义
- 为Editor添加props的默认值。根据Vditor的类型注释，使用AI工具生成默认值大对象
- 在初始化Vditor实例时，将默认值大对象与prop.options合并后传入

处理Editor组件的Vditor实例：实例暴露、实例注销

- 在onMounted中，使用emit的方式，通过init事件将editorInstance传递出来，交由用户控制
- 在onBeforeUnmount中，注销editorInstance

通过v-model简化文本同步：文本编辑、文本变动监听

- 在Editor中，通过defineModel定义modelvalue，用于同步文本变动
- 在实例的options中，添加钩子函数after和input，文本变动时更新modelvalue
- 如果用户也传了after和input，则对其包装后手动触发
- 使用watch监听modelvalue，用户在外部更新modelvalue变动时，更新实例的value。记得对比实例的旧value，有变化时才更新。

调整默认值设置

- rtl: false 从左向右输入
- mode: 推荐ir模式，类似与typora使用
- minHeight: 400 设置最小高度

实现更新视图配置：例如组件语言

- 将Vditor实例的初始化处理，提取到至initEditor函数中
- onMounted时，调用initEditor()
- 使用watch监听props.options变动，变动时更新视图配置
  - 使用historyRef缓存Vditor实例的value
  - 注销Vditor实例
  - 重新生成Vditor实例
  - 在after钩子中，将historyRef的value重新设置给实例。记得setValue时，第二个参数设为true，清空历史堆栈，这样可以避免报错
- 在editor.vue中，测试修改options.lang时，富文本组件的变化

