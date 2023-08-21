<script>
import { useDataStore } from '../store'

export default {
	setup() {
		// TODO: Same with App.vue
		const dataStore = useDataStore()
		dataStore.fetchData()
		dataStore.initializeTask()
		return { dataStore }
	},
	data() {
		return {
			// TODO: Remove not used var
			isModalWindowOpen: false
		}
	},
	methods: {
		// TODO: Delete it after integrate colors to title
		getColorById(id) {
			const colorObj = this.dataStore.color.find(color => color.id === id)
			return colorObj ? colorObj.color : '#000'
		},

		getTaskById(id) {
			// U have in store method for it
			const tasksObj = this.dataStore.task.find(task => task.taskId === id)
			return tasksObj ? tasksObj.task : ''
		}
	}
}
</script>
<template>
	<div>
		<div
			v-for="title in dataStore.getTitleTasksWithInfoTasks"
			:key="title.id"
			class="taskList"
		>
			<h1 :style="{ color: getColorById(title.colorId) }">
				{{ title.title }}
			</h1>
			<hr />
			<div v-if="getTaskById(title.id)">
				<h2
					v-for="task in title.tasks"
					:key="task.id"
				>
					<label>
						<input
							class="checkInput"
							type="checkbox"
						/>
						<span class="checkBox"></span>
						{{ task.task }}
					</label>
				</h2>
			</div>
			<div v-else>Задач нету</div>
		</div>
	</div>
</template>

<style scoped>
@font-face {
	font-family: 'Lato';
	src: url('../assets/fonts/Lato-Regular.ttf') format('truetype');
}
@font-face {
	font-family: 'Montserrat';
	src: url('../assets/fonts/Montserrat-Regular.ttf') format('truetype');
}
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
	margin-right: 15px;
}
.checkInput:checked + .checkBox {
	background-color: #4dd599;
	box-shadow: 0 0 0 1px #4dd599;
	background-image: url(../assets/checkedTask.svg);
}
.checkInput:focus + .checkBox {
	box-shadow: 0 0 0 1px black;
}
h1 {
	font-family: 'Montserrat', sans-serif;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}
h2 {
	display: block;
	color: #000;
	font-family: 'Lato', sans-serif;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-top: 40px;
}
hr {
	width: 420px;
	height: 1px;
	flex-shrink: 0;
	border: 0;
	background-color: #f2f2f2;
	margin-top: 20px;
	margin-bottom: 35px;
}
@media (max-width: 780px) {
	hr {
		width: 300px;
	}
}
@media (max-width: 425px) {
	hr {
		width: 250px;
		margin-left: -10px;
	}
}
</style>
