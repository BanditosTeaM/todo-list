<script>
import database from '../db.json'

export default {
	data() {
		return {
			isModalWindowOpen: false,
			colors: [],
			titles: [],
			tasks: [],
			taskId: null
		}
	},
	mounted() {
		this.fetchData()
	},
	created() {
		this.taskId = this.$route.params.id
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
		},
		fetchTash(id) {
			this.task = this.tasks.find(task => task.id == id)
		}
	}
}
</script>

<template>
	<div>
		<div>
			<!-- <h1 :style="{ color: getColorById(title.color_id) }"></h1> -->
			<hr />
			<h2>{{ getTaskById(taskId) }}</h2>
		</div>
	</div>
</template>
