<script>
import modalWindow from './components/modalWindowFolder.vue'
import dotCircle from './components/dotCircle.vue'
import database from './db.json'
import { useDataStore } from './store'

export default {
	components: {
		modalWindow,
		dotCircle
	},
	setup() {
		const dataStore = useDataStore()
		dataStore.fetchData()
		console.log(dataStore.title)
		return { dataStore }
	},
	data() {
		return {
			isModalWindowOpen: false,
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
	{{ console.log(dataStore.title) }}
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
@font-face {
	font-family: 'Lato';
	src: url('./assets/fonts/Lato-Regular.ttf') format('truetype');
}
.deleteTask {
	opacity: 0;
	background-color: #f4f6f8;
	border: 0;
	cursor: pointer;
	float: right;
	padding-top: 13px;
}
.allTask img {
	width: 18px;
	height: 18px;
	flex-shrink: 0;
}
.deleteTask img {
	width: 10px;
	height: 10px;
	flex-shrink: 0;
}
.titleTask:hover .deleteTask {
	opacity: 1;
}
.titleTask.active .deleteTask {
	background: #fff;
	opacity: 1;
}
.titleTask {
	width: 200px;
	height: 35px;
	flex-shrink: 0;
}
.titleTask.active {
	width: 200px;
	height: 37px;
	flex-shrink: 0;
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}
.menuNav {
	margin-left: 10px;
}
.openWindow {
	color: #767676;
	font-family: 'Lato', sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	letter-spacing: 0.15px;
	cursor: pointer;
}
.openWindow:hover {
	color: #767676;
}
.infoTask {
	margin-left: 56px;
}
.container {
	display: flex;
	flex-direction: row;
}
.allTask,
.openWindow {
	margin-top: 10px;
	margin-left: 25px;
}
.menu {
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.15px;
	background-color: #f4f6f8;
	width: 275px;
	height: 100vh;
}
ul {
	padding-left: 10px;
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
