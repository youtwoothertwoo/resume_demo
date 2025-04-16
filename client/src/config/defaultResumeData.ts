import type { ResumeData } from '../stores/resume';

export const defaultResumeData: ResumeData = {
  basics: {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    location: '温州市龙湾区',
    summary: '富有创造力和经验的软件工程师，专注于前端开发，具有5年以上的开发经验。擅长Vue.js、React和TypeScript，对用户体验和代码质量有极高的要求。',
    picture: '',
  },
  work: [
    {
      company: '科技有限公司',
      position: '高级前端工程师',
      startDate: '2020-01',
      endDate: '至今',
      description: '负责公司核心产品的前端开发工作，使用Vue3和TypeScript开发高性能的Web应用。优化前端性能，提升用户体验。带领团队完成多个重要项目。',
    },
    {
      company: '互联网公司',
      position: '前端工程师',
      startDate: '2018-06',
      endDate: '2019-12',
      description: '参与电商平台的开发，负责商品展示、购物车等核心功能模块。使用Vue.js开发，实现了良好的用户体验和性能优化。',
    },
  ],
  education: [
    {
      institution: '浙江广厦建设职业技术大学',
      area: '软件工程',
      studyType: '本科',
      startDate: '2014-09',
      endDate: '2018-06',
    },
  ],
  skills: [
    {
      name: '前端开发',
      level: '精通',
      keywords: ['Vue.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      name: '后端开发',
      level: '熟练',
      keywords: ['Node.js', 'Express', 'MongoDB', 'MySQL'],
    },
    {
      name: '开发工具',
      level: '熟练',
      keywords: ['Git', 'Webpack', 'Vite', 'Docker'],
    },
  ],
  projects: [
    {
      name: '企业管理系统',
      description: '基于Vue3和TypeScript开发的企业级管理系统，包含人事管理、财务管理、项目管理等模块。',
      url: 'https://github.com/example/project1',
      startDate: '2021-01',
      endDate: '2021-06',
      technologies: ['Vue3', 'TypeScript', 'Element Plus', 'Vite'],
      highlights: [
        '使用Vue3 Composition API重构，提升代码可维护性',
        '实现动态路由和权限控制',
        '优化首屏加载时间，提升用户体验',
      ],
    },
    {
      name: '电商平台',
      description: '基于Vue.js开发的电商平台，包含商品展示、购物车、订单管理等功能。',
      url: 'https://github.com/example/project2',
      startDate: '2019-03',
      endDate: '2019-08',
      technologies: ['Vue.js', 'Vuex', 'Element UI', 'Webpack'],
      highlights: [
        '实现商品列表的虚拟滚动，优化性能',
        '集成支付功能，支持多种支付方式',
        '实现商品搜索和筛选功能',
      ],
    },
  ],
  sections: ['basics', 'work', 'education', 'skills', 'projects'],
}; 