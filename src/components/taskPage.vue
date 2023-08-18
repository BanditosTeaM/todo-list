<script>
import modalWindowTask from './modalWindowTask.vue'
import modalWindowEditTitle from './modalWindowEditTitle.vue'
import { useDataStore } from '../store'

export default {
	components: {
		modalWindowTask,
		modalWindowEditTitle
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},
	setup() {
		const dataStore = useDataStore()
		dataStore.fetchData()
		dataStore.initializeTask()
		return { dataStore }
	},

	data() {
		return {
			isModalWindowTaskOpen: false,
			isModalWindowEditTitleOpen: false
		}
	},
	computed: {
		numberedTaskId() {
			return Number(this.id)
		},
		titleData() {
			const title = this.dataStore.title.find(
				title => title.id === this.numberedTaskId
			)

			return title ? title.title : ''
		},

		taskData() {
			const task = this.dataStore.task.find(
				task => task.taskId === this.numberedTaskId
			)
			return task ? task.task : ''
		},
		getColorData() {
			const idcolor = this.dataStore.title.find(
				title => title.id === this.numberedTaskId
			)
			const color = this.dataStore.color.find(
				color => color.id === idcolor.colorId
			)
			return color ? color.color : '#000'
		},
		checkVisibleTask() {
			const visibleTask = this.dataStore.task.find(
				vTask => vTask.taskId === this.numberedTaskId
			)
			return visibleTask ? visibleTask.taskId : ''
		}
	},
	methods: {
		getIdTask(id) {
			const idTask = this.dataStore.task.find(taskID => taskID.taskId === id)
			return idTask ? idTask.id : 'Не найдено'
		}
	}
}
</script>
<template>
	<div>
		<div>
			<div class="titlePart">
				<h1 :style="{ color: getColorData }">
					{{ titleData }}
				</h1>
				<button
					class="editButton"
					@click="isModalWindowEditTitleOpen = true"
				>
					<img
						src="../assets/editTitle.svg"
						alt="EditSvg"
					/>
				</button>
			</div>
			<modalWindowEditTitle
				v-if="isModalWindowEditTitleOpen"
				:id="numberedTaskId"
				@close="isModalWindowEditTitleOpen = false"
			/>
			<hr />
			<div v-if="checkVisibleTask">
				<h2
					v-for="task in dataStore.getTaskForIdTitle(numberedTaskId)"
					:key="task.id"
				>
					<label class="check">
						<input
							class="checkInput"
							type="checkbox"
						/>
						<span class="checkBox"></span>
						{{ task.task }}
						<button
							class="deleteTask"
							@click="dataStore.deleteTask(getIdTask(numberedTaskId))"
						>
							<img
								src="../assets/hoverClose.svg"
								alt="X"
							/>
						</button>
					</label>
				</h2>
			</div>
			<div v-else>
				<h2>Мой голубчик, задач нету</h2>
			</div>

			<a
				class="addTask"
				@click="isModalWindowTaskOpen = true"
			>
				+ Добавить задачу
			</a>
			<modalWindowTask
				v-if="isModalWindowTaskOpen"
				:id="numberedTaskId"
				@close="isModalWindowTaskOpen = false"
			/>
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
.addTask {
	color: #b4b4b4;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.15px;
	cursor: pointer;
	margin-top: 20px;
}

.deleteTask {
	opacity: 0;
	background-color: white;
	border: 0;
	cursor: pointer;
	float: right;
	padding-top: 13px;
}
.deleteTask img {
	height: 15px;
	width: 15px;
}
.check:hover .deleteTask {
	opacity: 1;
}
.check {
	display: block;
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
	box-shadow: 0 0 0 2px black;
}
.titlePart:hover .editButton {
	opacity: 1;
}

.editButton {
	opacity: 0;
	background-color: white;
	border: 0;
	cursor: pointer;
	margin-left: 15px;
}
h1 {
	display: inline-block;
	font-family: 'Montserrat', sans-serif;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}
h2 {
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
</style>
