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
		dataStore.initializeTitle()
		dataStore.initializeTask()
		dataStore.fetchData()
		return { dataStore }
	},

	data() {
		return {
			activeTask: null,
			show: false,
			isModalWindowOpen: false
		}
	},

	methods: {
		onDeleteFolder(id) {
			this.dataStore.deleteFolder(id)
			this.$router.push('/')
		},

		toggleMenu() {
			this.show = !this.show
		},
		closeMenu() {
			this.show = false
		},
		openModalWindow() {
			this.isModalWindowOpen = true
		},
		closeModalWindow() {
			this.isModalWindowOpen = false
		}
	}
}
</script>

<template>
	<div class="container">
		<span
			class="showMenu"
			@click="toggleMenu"
		>
			<img
				v-if="!show"
				src="./assets/image/icons8-menu.svg"
				alt="+"
			/>
			<img
				v-else
				src="./assets/image/addFoldelPlus.svg"
				alt="-"
			/>
		</span>

		<div
			class="menu"
			:class="{ 'menu-open': show }"
		>
			<router-link
				to="/"
				class="allTask"
				@click="closeMenu"
			>
				<img
					src="./assets/image/allTask.svg"
					alt=""
				/>
				Все задачи
			</router-link>

			<nav class="menuNav">
				<ul>
					<li
						v-for="title in dataStore.getTitlesWithTasks"
						:key="title.id"
						@click="closeMenu"
					>
						<router-link
							:to="'/task-info/' + title.id"
							class="titleTask"
						>
							<div class="titleTaskInnerWrapper">
								<dotCircle :color="title.color" />
								{{ title.title }}
							</div>
						</router-link>
						<button
							class="deleteTitle"
							@click="onDeleteFolder(title.id)"
						>
							<svg
								width="11"
								height="11"
								viewBox="0 0 11 11"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z"
								/>
							</svg>
						</button>
					</li>
				</ul>
			</nav>
			<a
				class="openWindow"
				@click="openModalWindow()"
			>
				<img
					src="./assets/image/addFoldelPlus.svg"
					alt="+"
				/>
				Добавить папку
			</a>
			<modalWindow
				v-if="isModalWindowOpen"
				@close="closeModalWindow"
			/>
		</div>
		<router-view class="infoTask"></router-view>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

@font-face {
	font-family: 'Lato';
	src: url('./assets/fonts/Lato-Regular.ttf') format('truetype');
}

.allTask img {
	width: 18px;
	height: 18px;
	flex-shrink: 0;
}
.allTask:hover {
	border-radius: 4px;
	background: #f8f6f4;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

.deleteTitle {
	opacity: 0;
	background: transparent;
	border: 0;
	cursor: pointer;
	position: absolute;
	margin-top: -40px;
	margin-left: 190px;

	fill: #e3e3e3;
}

.deleteTitle img {
	width: 10px;
	height: 10px;
	flex-shrink: 0;
}

.titleTask {
	padding: 5px 10px;
	margin-bottom: 10px;
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
	margin-left: 6px;
	font-family: 'Roboto', sans-serif;
	color: #000;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.15px;
}
li:hover .deleteTitle {
	opacity: 1;
}

.deleteTitle:hover {
	fill: red;
}

li:hover .titleTask {
	border-radius: 4px;
	background: #f8f6f4;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

.titleTask.router-link-active + .deleteTitle {
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
.openWindow img {
	padding-right: 5px;
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
	display: flex;
	align-items: center;
	justify-content: start;
	column-gap: 10px;
	color: #000;
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.2px;
	padding: 5px 10px;
	width: 197px;
	height: 37px;
}

.allTask.router-link-active {
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

.allTask,
.openWindow {
	margin-top: 10px;
	margin-left: 22px;
}

.menu {
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.15px;
	width: 275px;
	min-height: 100vh;
	background-color: #f4f6f8;
}
.showMenu {
	position: absolute;
	z-index: 1;
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
}
.showMenu img {
	height: 20px;
	width: 20px;
	padding-top: 10px;
	padding-right: 10px;
}

ul {
	padding-left: 10px;
}
li {
	list-style-type: none;
	display: inline-blockk;
}
a:active,
a:hover,
a {
	text-decoration: none;
	color: black;
}
@media (max-width: 768px) {
	.showMenu {
		display: block;
		margin-left: 10px;
	}

	.menu {
		display: none;
	}
	.menu-open {
		display: block;
	}
}
@media (max-width: 425px) {
	.menu {
		width: 100%;
	}
	.menu-open {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.showMenu {
		top: 0;
		right: 0;
	}
	.menu-open + .infoTask {
		display: none;
	}
}
</style>
