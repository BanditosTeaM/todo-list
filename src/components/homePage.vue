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
			const tasksObj = this.tasks.find(task => task.taskId === id)
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
			<h1 :style="{ color: getColorById(title.colorId) }">
				{{ title.title }}
			</h1>
			<hr />

			<h2>
				<label>
					<input
						class="checkInput"
						type="checkbox"
					/>
					<span class="checkBox"></span>
					{{ getTaskById(title.taskId) }}
				</label>
			</h2>
		</div>
	</div>
</template>

<style scoped>
.checkInput {
	position: absolute;
	-webkit-appearance: none;
	appearance: none;
}
.checkBox {
	display: inline-block;
	height: 20px;
	width: 20px;
	box-shadow: 0 0 0 3px #e8e8e8;
	border-radius: 10px;
	background-color: white;
}
.checkInput:checked + .checkBox {
	background-color: #4dd599;
	box-shadow: 0 0 0 2px #4dd599;
	background-image: url(../assets/checkedTask.svg);
}
.checkInput:focus + .checkBox {
	box-shadow: 0 0 0 3px black;
}
h1 {
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
	font-size: 40px;
}
h2 {
	font-size: 27px;
	font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
		'Lucida Sans', Arial, sans-serif;
}
hr {
	width: 420px;
	height: 1px;
	border: 0;
	background-color: #f2f2f2;
}
</style>
