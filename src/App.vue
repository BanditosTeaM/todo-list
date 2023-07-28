<script>
import modalWindow from './components/modalWindowFolder.vue'
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
			tasks: [],
			activeTask: null
		}
	},
	mounted() {
		this.fetchData()
	},
	methods: {
		fetchData() {
			this.colors = database.titleColor
			this.titles = database.titleTask
			this.tasks = database.infoTask
		},
		getColorById(id) {
			const colorObj = this.colors.find(color => color.id === id)
			return colorObj ? colorObj.color : ''
		},
		changeBackground(id) {
			if (this.activeTask === id) {
				this.activeItem = null
			} else {
				this.activeTask = id
			}
		}
	}
}
</script>

<template>
	<div class="container">
		<div class="menu">
			<div class="allTask">
				<router-link to="/">
					<img
						src="./assets/allTask.svg"
						alt=""
					/>
					Все задачи
				</router-link>
			</div>

			<nav class="menuNav">
				<ul>
					<li
						v-for="title in titles"
						:key="title.id"
						class="titleTask"
						:class="{ active: activeTask === title.id }"
						@click="changeBackground(title.id)"
					>
						<router-link :to="'/task-info/' + title.id">
							<dotCircle :color="getColorById(title.colorId)" />
							{{ title.title }}
						</router-link>
						<button class="deleteTask">
							<img
								src="./assets/hoverClose.svg"
								alt="X"
							/>
						</button>
					</li>
				</ul>
			</nav>
			<a
				class="openWindow"
				@click="isModalWindowOpen = true"
			>
				+ Добавить папку
			</a>
			<modalWindow
				v-if="isModalWindowOpen"
				@close="isModalWindowOpen = false"
			/>
		</div>
		<router-view class="infoTask"></router-view>
	</div>
</template>

<style scoped>
.deleteTask {
	opacity: 0;
	background-color: #f4f6f8;
	border: 0;
	cursor: pointer;
	float: right;
	padding-top: 13px;
}
img {
	height: 25px;
}
.deleteTask img {
	height: 15px;
	width: 15px;
}
.titleTask:hover .deleteTask {
	opacity: 1;
}
.titleTask.active .deleteTask {
	background: #fff;
	opacity: 1;
}
.menuNav {
	margin-left: 10px;
}
.openWindow {
	cursor: pointer;
}
.infoTask {
	margin-left: 50px;
}
.container {
	display: flex;
	flex-direction: row;
}
.allTask,
.openWindow,
.titleTask {
	margin-top: 10px;
	margin-left: 15px;
}

.titleTask.active {
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

.menu {
	font-size: 27px;
	font-weight: 600;
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
	background-color: #f4f6f8;
	width: 400px;
	height: 100vh;
}

li {
	list-style-type: none;
}
a:active,
a:hover,
a {
	text-decoration: none;
	color: black;
}
</style>
