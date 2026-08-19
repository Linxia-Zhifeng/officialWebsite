import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteSeo, type SeoMeta } from '../composables/useSeo'

/** 各路由的 SEO 元信息 */
const seoMap: Record<string, SeoMeta> = {
  home: {
    title: '首页',
    description: '林下之风科技，专注于企业数字化服务的软件开发公司。如林稳固、如风高效，为企业打造稳固、高效的定制化数字化解决方案。',
    keywords: '定制软件开发,企业数字化解决方案,数字化转型,软件外包,北京软件开发'
  },
  services: {
    title: '业务服务',
    description: '林下之风科技业务服务：定制软件系统开发、Web与移动端开发、数字化转型咨询、技术运维与迭代。深入业务场景，匹配企业真实发展需求。',
    keywords: '定制软件系统开发,Web开发,移动端开发,APP开发,小程序开发,数字化转型咨询,技术运维'
  },
  capabilities: {
    title: '技术能力',
    description: '林下之风科技技术能力：覆盖全栈开发、产品设计、测试运维全链路，严谨代码规范与多层级测试校验，保障系统稳定可依赖。',
    keywords: '全栈开发,技术能力,Vue开发,TypeScript,系统架构,测试运维'
  },
  cases: {
    title: '客户案例',
    description: '林下之风科技落地案例：制造业生产管理系统、连锁零售会员体系、物流调度平台、SaaS协作工具，用成果说话。',
    keywords: '客户案例,制造业系统,零售会员系统,物流调度,SaaS工具,软件开发案例'
  },
  about: {
    title: '关于我们',
    description: '林下之风科技，取名"林下之风"，秉持清雅、扎实、从容的做事态度。核心团队拥有多年软件开发与行业落地经验，致力于成为企业长期可信赖的技术伙伴。',
    keywords: '关于林下之风,软件开发公司,技术伙伴,北京科技公司'
  },
  contact: {
    title: '联系我们',
    description: '联系林下之风科技：地址北京市海淀区中关村科技园区，电话400-888-8888，邮箱contact@linxiafeng.com。开启定制化软件开发合作。',
    keywords: '联系林下之风,软件开发合作,免费需求咨询,北京软件外包'
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: 'nav.home', seo: seoMap.home }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../pages/ServicesPage.vue'),
    meta: { title: 'nav.services', seo: seoMap.services }
  },
  {
    path: '/capabilities',
    name: 'capabilities',
    component: () => import('../pages/CapabilitiesPage.vue'),
    meta: { title: 'nav.capabilities', seo: seoMap.capabilities }
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('../pages/CasesPage.vue'),
    meta: { title: 'nav.cases', seo: seoMap.cases }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: { title: 'nav.about', seo: seoMap.about }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue'),
    meta: { title: 'nav.contact', seo: seoMap.contact }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 路由切换时动态更新 SEO 元信息
router.afterEach((to) => {
  applyRouteSeo(to)
})

export default router
