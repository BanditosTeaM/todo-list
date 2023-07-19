import { createRouter, createWebHashHistory } from 'vue-router'
import homePageComponent from './components/homePage.vue'
import taskPageComponent from './components/taskPage.vue'

export default createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePageComponent
		},
		{
			path: '/task-info/:id',
			component: taskPageComponent,
			props: true
		}
	]
})
