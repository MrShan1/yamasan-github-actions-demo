import type { VditorOptions } from './types'

// VDITOR_VERSION 由 vditor 包注入，运行时 CDN 形如：
// https://unpkg.com/vditor@3.11.2
const VDITOR_CDN = 'https://unpkg.com/vditor@3.11.2'

export const defaultOptions: VditorOptions = {
  // 基础配置
  rtl: false, // RTL，无注释默认值，源码 false
  undoDelay: 800, // 历史记录间隔，源码 800（类型注释未写）
  value: '', // 编辑器初始化值
  debugger: false, // 是否显示日志
  typewriterMode: false, // 是否启用打字机模式
  height: 'auto', // 编辑器总高度
  minHeight: 400, // 编辑器最小高度（你的业务需求，非 vditor 内置默认）
  width: 'auto', // 编辑器总宽度
  placeholder: '', // 输入区域为空时的提示
  lang: 'zh_CN', // 多语言
  mode: 'ir', // 编辑模式：源码/文档默认 'ir'（类型注释写 'wysiwyg'）
  theme: 'classic', // 主题
  icon: 'ant', // 图标风格
  cdn: VDITOR_CDN, // 自建 CDN 地址

  // 全屏
  fullscreen: {
    index: 90, // 全屏层级
  },

  // 工具栏（字符串简写，初始化时 vditor 会自动补全 icon/hotkey 等）
  toolbar: [
    'emoji',
    'headings',
    'bold',
    'italic',
    'strike',
    'link',
    '|',
    'list',
    'ordered-list',
    'check',
    'outdent',
    'indent',
    '|',
    'quote',
    'line',
    'code',
    'inline-code',
    'insert-before',
    'insert-after',
    '|',
    'upload',
    'record',
    'table',
    '|',
    'undo',
    'redo',
    '|',
    'fullscreen',
    'edit-mode',
    {
      name: 'more',
      toolbar: [
        'both',
        'code-theme',
        'content-theme',
        'export',
        'outline',
        'preview',
        'devtools',
        'info',
        'help',
      ],
    },
  ],

  toolbarConfig: {
    hide: false, // 是否隐藏工具栏
    pin: false, // 是否固定工具栏
  },

  // 计数器
  counter: {
    enable: false, // 是否启用计数器
    type: 'markdown', // 统计类型
    // max: undefined,
  },

  // 缓存
  cache: {
    enable: true, // 是否使用 localStorage
    id: '', // ⚠️ 必填：使用 HTMLElement 初始化时需设置唯一 id
  },

  // 预览
  preview: {
    delay: 1000, // 预览 debounce 毫秒间隔
    maxWidth: 800, // 预览区域最大宽度（类型注释 768，源码 800）
    mode: 'both', // 显示模式
    actions: ['desktop', 'tablet', 'mobile', 'mp-wechat', 'zhihu'],
    hljs: {
      defaultLang: '', // 未指定语言时的默认语言
      lineNumber: false, // 是否启用行号
      style: 'github', // 代码风格
      enable: true, // 是否启用代码高亮
    },
    math: {
      inlineDigit: false, // 内联公式 $ 后是否允许数字
      macros: {}, // MathJax 宏定义
      engine: 'KaTeX', // 数学公式渲染引擎
    },
    markdown: {
      autoSpace: false, // 自动空格
      paragraphBeginningSpace: false, // 段落开头空两格
      fixTermTypo: false, // 自动矫正术语
      toc: false, // 插入目录
      footnotes: true, // 脚注
      codeBlockPreview: true, // wysiwyg & ir 模式代码块渲染
      mathBlockPreview: true, // wysiwyg & ir 模式数学公式渲染
      sanitize: true, // 过滤 XSS
      linkBase: '', // 链接相对路径前缀
      linkPrefix: '', // 链接强制前缀
      listStyle: false, // 列表添加标记
      mark: false, // mark 标记
      gfmAutoLink: true, // 自动链接（文档有，类型注释无）
    },
    theme: {
      current: 'light', // 当前内容主题
      list: {
        'ant-design': 'Ant Design',
        dark: 'Dark',
        light: 'Light',
        wechat: 'WeChat',
      },
      path: `${VDITOR_CDN}/dist/css/content-theme`,
    },
    render: {
      media: {
        enable: true, // 是否启用多媒体渲染
      },
    },
  },

  // 链接
  link: {
    isOpen: true, // 是否打开链接地址
  },

  // 图片
  image: {
    isPreview: true, // 是否预览图片
  },

  // 提示/表情
  hint: {
    parse: true, // 是否进行 md 解析（文档默认 true）
    delay: 200, // 提示 debounce 毫秒间隔
    emoji: {
      '+1': '👍',
      '-1': '👎',
      confused: '😕',
      eyes: '👀️',
      heart: '❤️',
      rocket: '🚀️',
      smile: '😄',
      tada: '🎉️',
    },
    emojiPath: `${VDITOR_CDN}/dist/images/emoji`,
    extend: [],
  },

  // 评论（仅 wysiwyg 模式）
  comment: {
    enable: false,
  },

  // 大纲
  outline: {
    enable: false, // 初始化是否展现大纲
    position: 'left', // 大纲位置
  },

  // 拖拽调整大小
  resize: {
    enable: false, // 是否支持大小拖拽
    position: 'bottom', // 拖拽栏位置
  },

  // 上传
  upload: {
    url: '', // 上传 url，为空不触发上传
    max: 10 * 1024 * 1024, // 最大 10MB
    linkToImgUrl: '',
    withCredentials: false, // 跨站点访问控制
    multiple: true, // 是否允许多文件上传
    fieldName: 'file[]', // 上传字段名
    extraData: {},
    filename: (name: string) => name.replace(/\W/g, ''), // 文件名安全处理
  },

  // 样式类名
  classes: {
    preview: '',
  },
}
