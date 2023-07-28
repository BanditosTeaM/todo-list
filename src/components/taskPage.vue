<script>
import database from '../db.json'
import modalWindowTask from './modalWindowTask.vue'

export default {
	components: {
		modalWindowTask
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			isModalWindowTaskOpen: false,
			colors: [],
			titles: [],
			tasks: []
		}
	},

	computed: {
		numberedTaskId() {
			return Number(this.id)
		},
		titleData() {
			const title = this.titles.find(title => title.id === this.numberedTaskId)

			return title ? title.title : ''
		},

		taskData() {
			const task = this.tasks.find(task => task.id === this.numberedTaskId)

			return task ? task.task : ''
		},
		getColorData() {
			const color = this.colors.find(color => color.id === this.numberedTaskId)

			return color ? color.color : ''
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
		}
	}
}
</script>

<template>
	<div>
		<div>
			<h1 :style="{ color: getColorData }">
				{{ titleData }}
			</h1>
			<hr />
			<h2>
				<label class="check">
					<input
						class="checkInput"
						type="checkbox"
					/>
					<span class="checkBox"></span>
					{{ taskData }}
					<button class="deleteTask">
						<img
							src="../assets/hoverClose.svg"
							alt="X"
						/>
					</button>
				</label>
			</h2>
			<a
				class="addTask"
				@click="isModalWindowTaskOpen = true"
			>
				+ Добавить задачу
			</a>
			<modalWindowTask
				v-if="isModalWindowTaskOpen"
				@close="isModalWindowTaskOpen = false"
			/>
		</div>
	</div>
</template>

<style scoped>
.addTask {
	color: #b4b4b4;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.15px;
	cursor: pointer;
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
}
.checkInput:checked + .checkBox {
	background-color: #4dd599;
	box-shadow: 0 0 0 1px #4dd599;
	background-image: url(../assets/checkedTask.svg);
}
.checkInput:focus + .checkBox {
	box-shadow: 0 0 0 2px black;
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
