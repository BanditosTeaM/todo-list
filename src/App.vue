<script>
import modalWindow from './components/modalWindow.vue'
import dotCircle from './components/dotCircle.vue'
import database from './db.json'

export default {
	components: {
		modalWindow,
		dotCircle
	},
	data() {
		return {
			isModalWindowOpen: false,
			colors: [],
			titles: [],
			tasks: []
		}
	},
	mounted() {
		this.fetchData()
	},
	methods: {
		fetchData() {
			this.database = database
			this.colors = database.titleColor
			this.titles = database.titleTask
			this.tasks = database.infoTask
		},
		getColorById(id) {
			const colorObj = this.colors.find(color => color.id === id)
			return colorObj ? colorObj.color : ''
		},

		getTaskById(id) {
			const tasksObj = this.tasks.find(task => task.id === id)
			return tasksObj ? tasksObj.task : ''
		}
	}
}
</script>

<template>
	<div class="container">
		<div class="menu">
			<router-link
				class="allTask"
				to="/"
			>
				<img
					src="./assets/allTask.svg"
					alt=""
				/>
				Все задачи
			</router-link>
			<nav class="menuNav">
				<ul>
					<li
						v-for="title in titles"
						:key="title.id"
					>
						<dotCircle :color="getColorById(title.color_id)" />
						<router-link :to="'/task-info/' + title.text_id">
							{{ title.title }}
						</router-link>
					</li>
				</ul>
			</nav>
			<a @click="isModalWindowOpen = true">+ Добавить папку</a>
			<modalWindow
				v-if="isModalWindowOpen"
				@close="isModalWindowOpen = false"
			/>
		</div>
		<router-view></router-view>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
}

.menu {
	background-color: #f4f6f8;
	width: 400px;
	height: 100vh;
	font-size: 20px;
	font-weight: 400;
	font-family:
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		Oxygen,
		Ubuntu,
		Cantarell,
		'Open Sans',
		'Helvetica Neue',
		sans-serif;
}
hr {
	width: 420px;
	height: 1px;
	border: 0;
	background-color: #f2f2f2;
}
li {
	list-style-type: none;
}
a {
	text-decoration: none;
}
</style>
