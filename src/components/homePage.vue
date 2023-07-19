<script>
import database from '../db.json'

export default {
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
	<div>
		<div
			v-for="title in titles"
			:key="title.id"
			class="taskList"
		>
			<h1 :style="{ color: getColorById(title.color_id) }">
				{{ title.title }}
			</h1>
			<hr />
			<h2>{{ getTaskById(title.text_id) }}</h2>
		</div>
	</div>
</template>
