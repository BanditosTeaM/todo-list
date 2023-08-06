<script>
import modalWindow from './components/modalWindowFolder.vue'
import dotCircle from './components/dotCircle.vue'
import { useDataStore } from './store'

export default {
	components: {
		modalWindow,
		dotCircle
	},
	setup() {
		const dataStore = useDataStore()
		dataStore.fetchData()
		dataStore.initialize()
		return { dataStore }
	},
	data() {
		return {
			isModalWindowOpen: false,
			activeTask: null
		}
	},
	methods: {
		getColorById(id) {
			const colorObj = this.dataStore.color.find(color => color.id === id)
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
			<router-link
				to="/"
				class="allTask"
			>
				<img
					src="./assets/allTask.svg"
					alt=""
				/>
				Все задачи
			</router-link>

			<nav class="menuNav">
				<ul>
					<li
						v-for="title in dataStore.title"
						:key="title.id"
					>
						<router-link
							:to="'/task-info/' + title.id"
							class="titleTask"
						>
							<div class="titleTaskInnerWrapper">
								<dotCircle :color="getColorById(title.colorId)" />
								{{ title.title }}
							</div>
							<button
								class="deleteTask"
								@click="dataStore.deleteFolder(title.id)"
							>
								<img
									src="./assets/hoverClose.svg"
									alt="X"
								/>
							</button>
						</router-link>
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
.titleTask {
	padding: 5px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 200px;
	height: 35px;
}
.titleTaskInnerWrapper {
	display: flex;
	align-items: center;
	column-gap: 10px;
}
.titleTask:hover .deleteTask {
	opacity: 1;
}
.titleTask.router-link-active .deleteTask {
	background: #fff;
	opacity: 1;
}

.titleTask.router-link-active {
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

.allTask {
	padding: 5px 10px;

	width: 200px;
	height: 35px;

	display: flex;
	align-items: center;
	justify-content: start;

	column-gap: 10px;
}

.allTask.router-link-active {
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
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
