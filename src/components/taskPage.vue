<script>
import modalWindowTask from './modalWindowTask.vue'
import modalWindowEditTask from './modalWindowEditTask.vue'
import modalWindowEditFolder from './modalWindowEditFolder.vue'
import editWindowIcon from '../assets/image/editFolder.svg'
import deleteTaskIcon from '../assets/image/hoverClose.svg'
import addFolderIcon from '../assets/image/addFoldelPlus.svg'
import { mapStores } from 'pinia'
import { useDataStore } from '../store'

export default {
	components: {
		modalWindowTask,
		modalWindowEditTask,
		modalWindowEditFolder,
		editWindowIcon,
		deleteTaskIcon,
		addFolderIcon
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},
	emits: ['close'],

	data() {
		return {
			isModalWindowTaskOpen: false,
			isModalWindowEditFolderOpen: false,
			isModalWindowEditTask: false,
			selectedTask: '',
			selectedFolder: ''
		}
	},

	computed: {
		...mapStores(useDataStore),
		numberedTaskId() {
			return this.id
		},

		checkVisibleTask() {
			const visibleTask = this.dataStore.task.find(
				vTask => vTask.taskId === this.numberedTaskId
			)
			return visibleTask ? visibleTask.taskId : ''
		},
		getObjectById() {
			return this.dataStore.getFolderById(this.numberedTaskId)
		}
	},
	methods: {
		selectTitleFolder(folder) {
			this.isModalWindowEditFolderOpen = true
			this.selectedFolder = folder
		},
		selectTask(task) {
			this.isModalWindowEditTask = true
			this.selectedTask = task
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>
<template>
	<div>
		<div class="folderPart">
			<h2
				class="folder"
				:style="{ color: getObjectById ? getObjectById.color : 'black' }"
			>
				{{ getObjectById ? getObjectById.name : 'Новая папка' }}
			</h2>
			<button
				class="editButton"
				@click="selectTitleFolder(getObjectById.name)"
			>
				<editWindowIcon />
			</button>
		</div>
		<modalWindowEditFolder
			v-if="isModalWindowEditFolderOpen"
			:id="numberedTaskId"
			:selfolder="selectedFolder"
			@close="isModalWindowEditFolderOpen = false"
		/>
		<hr />
		<div v-if="getObjectById.tasks.length !== 0">
			<div
				v-for="task in getObjectById.tasks"
				:key="task._id"
				class="taskPart"
			>
				<label class="check">
					<input
						class="checkInput"
						type="checkbox"
						:checked="task.done"
						@change="dataStore.updateDoneTask(task._id)"
					/>
					<span
						class="checkBox"
						@change="dataStore.updateDoneTask(task._id)"
					></span>
					{{ task.text }}
					<button
						class="editButton"
						@click="selectTask(task.text)"
					>
						<editWindowIcon />
					</button>

					<button
						class="deleteTask"
						@click="dataStore.deleteTask(task._id)"
					>
						<deleteTaskIcon />
					</button>
				</label>
				<modalWindowEditTask
					v-if="isModalWindowEditTask"
					:id="task._id"
					:seltask="selectedTask"
					@close="isModalWindowEditTask = false"
				/>
			</div>
		</div>
		<div v-else>
			<div class="taskPart">Мой голубчик, задач нету</div>
		</div>

		<a
			class="addTask"
			@click="isModalWindowTaskOpen = true"
		>
			<addFolderIcon />
			Добавить задачу
		</a>
		<modalWindowTask
			v-if="isModalWindowTaskOpen"
			:id="numberedTaskId"
			@close="isModalWindowTaskOpen = false"
		/>
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
	margin-top: -30px;
}

.deleteTask {
	opacity: 0;
	background: transparent;
	border: 0;
	cursor: pointer;
	padding-top: 15px;
}
.editButton {
	opacity: 0;
	background-color: white;
	border: 0;
	cursor: pointer;
	margin-left: auto;
	padding-top: 15px;
}
.deleteTask svg {
	height: 15px;
	width: 15px;
}
.addTask svg {
	width: 15px;
	height: 15px;
}
.check:hover .deleteTask {
	opacity: 1;
}
.check:hover .editButton {
	opacity: 1;
}
.check {
	display: flex;
	align-items: center;
	cursor: pointer;
}
.checkInput {
	position: absolute;
	-webkit-appearance: none;
	appearance: none;
}
.checkBox {
	display: inline-block;
	cursor: pointer;
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
	background-image: url(../assets/image/checkedTask.svg);
}
.checkInput:focus + .checkBox {
	box-shadow: 0 0 0 2px black;
}
.folderPart:hover .editButton {
	opacity: 1;
}
.check:hover .checkBox {
	box-shadow: 0 0 0 2px black;
	z-index: 1;
}

.folderPart {
	display: inline-block;
}
.taskPart {
	color: #000;
	font-family: 'Lato', sans-serif;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 20px;
}

.editButton:focus-visible {
	outline: none;
}
.folder {
	display: inline-block;
	font-family: 'Montserrat', sans-serif;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-top: 15px;
	margin-bottom: 0px;
}

hr {
	width: 420px;
	height: 1px;
	flex-shrink: 0;
	border: 0;
	background-color: #f2f2f2;
	margin-top: 20px;
	margin-bottom: 30px;
	margin-left: 0;
}
@media (max-width: 768px) {
	hr {
		width: 250px;
	}
}
</style>
