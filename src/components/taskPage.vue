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
	emits: ['close'],
	setup() {
		const dataStore = useDataStore()

		return {
			dataStore
		}
	},

	data() {
		return {
			isModalWindowTaskOpen: false,
			isModalWindowEditTitleOpen: false,
			selectedTitle: ''
		}
	},
	computed: {
		numberedTaskId() {
			return Number(this.id)
		},

		checkVisibleTask() {
			const visibleTask = this.dataStore.task.find(
				vTask => vTask.taskId === this.numberedTaskId
			)
			return visibleTask ? visibleTask.taskId : ''
		},
		getObjectById() {
			return this.dataStore.getTitleById(this.numberedTaskId)
		}
	},
	methods: {
		selectTitle(title) {
			this.isModalWindowEditTitleOpen = true
			this.selectedTitle = title
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>
<template>
	<div>
		<div class="titlePart">
			<h2
				class="title"
				:style="{ color: getObjectById.color }"
			>
				{{ getObjectById.title }}
			</h2>
			<button
				class="editButton"
				@click="selectTitle(getObjectById.title)"
			>
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="#DFDFDF"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z"
					/>
				</svg>
			</button>
		</div>
		<modalWindowEditTitle
			v-if="isModalWindowEditTitleOpen"
			:id="numberedTaskId"
			:seltitle="selectedTitle"
			@close="isModalWindowEditTitleOpen = false"
		/>
		<hr />
		<div v-if="getObjectById.tasks.length !== 0">
			<div
				v-for="task in getObjectById.tasks"
				:key="task.id"
				class="taskPart"
			>
				<label class="check">
					<input
						class="checkInput"
						type="checkbox"
						:checked="task.doneTask"
						@change="dataStore.updateDoneTask(task.id)"
					/>
					<span
						class="checkBox"
						@change="dataStore.updateDoneTask(task.id)"
					></span>
					{{ task.task }}
					<button
						class="deleteTask"
						@click="dataStore.deleteTask(task.id)"
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 11 11"
							fill="#E3E3E3"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z"
							/>
						</svg>
					</button>
				</label>
			</div>
		</div>
		<div v-else>
			<div class="taskPart">Мой голубчик, задач нету</div>
		</div>

		<a
			class="addTask"
			@click="isModalWindowTaskOpen = true"
		>
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6 1V11"
					stroke="#868686"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M1 6H11"
					stroke="#868686"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>

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
	margin-left: auto;
	padding-top: 15px;
}

.check:hover .deleteTask {
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
.titlePart:hover .editButton {
	opacity: 1;
}
.check:hover .checkBox {
	box-shadow: 0 0 0 2px black;
	z-index: 1;
}

.titlePart {
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
.editButton {
	opacity: 0;
	background-color: white;
	border: 0;
	cursor: pointer;
	margin-left: 15px;
}
.editButton:focus-visible {
	outline: none;
}
.title {
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
