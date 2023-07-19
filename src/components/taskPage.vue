<script>
import database from '../db.json'

export default {
	props: {
		id: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			isModalWindowOpen: false,
			colors: [],
			titles: [],
			tasks: []
		}
	},

	computed: {
		numberedTaskId() {
			return Number(this.id)
		},

		taskData() {
			const task = this.tasks.find(task => task.id === this.numberedTaskId)

			return task ? task.task : ''
		}
	},

	mounted() {
		this.fetchData()
	},

	methods: {
		fetchData() {
			// this.database = database
			this.colors = database.titleColor
			this.titles = database.titleTask
			this.tasks = database.infoTask
		},

		getColorById(id) {
			const colorObj = this.colors.find(color => color.id === id)
			return colorObj ? colorObj.color : ''
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
			<h2>{{ taskData }}</h2>
		</div>
	</div>
</template>
