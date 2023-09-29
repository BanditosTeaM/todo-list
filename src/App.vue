<script>
import modalWindow from './components/modalWindowFolder.vue'
import dotCircle from './components/dotCircle.vue'
import allTaskIcon from './assets/image/allTask.svg'
import menuIcon from './assets/image/icons8-menu.svg'
import addFolderIcon from './assets/image/addFoldelPlus.svg'
import deleteFolderIcon from './assets/image/hoverClose.svg'
import { mapStores } from 'pinia'
import { useDataStore } from './store'

export default {
	components: {
		modalWindow,
		dotCircle,
		allTaskIcon,
		menuIcon,
		addFolderIcon,
		deleteFolderIcon
	},

	data() {
		return {
			show: false,
			isModalWindowOpen: false
		}
	},

	computed: {
		...mapStores(useDataStore)
	},

	mounted() {
		this.dataStore.initializeFolder()
		this.dataStore.initializeTask()
		this.dataStore.fetchData()
	},

	methods: {
		onDeleteFolder(id) {
			const paramId = this.$route?.params?.id

			if (paramId && id === paramId) {
				this.$router.push('/')
			}

			this.dataStore.deleteFolder(id)
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
			<menuIcon v-if="!show" />
			<addFolderIcon v-else />
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
				<allTaskIcon />
				Все задачи
			</router-link>

			<nav class="menuNav">
				<ul>
					<li
						v-for="folder in dataStore.getFoldersWithTasks"
						:key="folder._id"
						@click="closeMenu"
					>
						<router-link
							:to="'/task-info/' + folder._id"
							class="folderTask"
						>
							<div class="folderTaskInnerWrapper">
								<dotCircle :color="folder.color" />
								{{ folder.name }}
							</div>
						</router-link>
						<button
							class="deletefolder"
							@click="onDeleteFolder(folder._id)"
						>
							<deleteFolderIcon />
						</button>
					</li>
				</ul>
			</nav>
			<a
				class="openWindow"
				@click="openModalWindow()"
			>
				<addFolderIcon />

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

.allTask:hover {
	border-radius: 4px;
	background: #f8f6f4;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

.deletefolder {
	opacity: 0;
	background: transparent;
	border: 0;
	cursor: pointer;
	position: absolute;
	margin-top: -40px;
	margin-left: 190px;
}

.folderTask {
	padding: 5px 10px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 200px;
	height: 35px;
}
.folderTaskInnerWrapper {
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
li:hover .deletefolder {
	opacity: 1;
}
.folderTask.router-link-active + .deletefolder {
	opacity: 1;
}
li:hover .folderTask {
	border-radius: 4px;
	background: #f8f6f4;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

li .folderTask.router-link-active {
	width: 200px;
	height: 37px;
	flex-shrink: 0;
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
	z-index: 10;
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
	padding-left: 10px;
	cursor: pointer;
}

.openWindow svg {
	width: 12px;
	height: 12px;
	padding-right: 5px;
}
.openWindow:hover svg {
	stroke: black;
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
.showMenu svg {
	padding-top: 10px;
	padding-right: 10px;
}

ul {
	padding-left: 10px;
}
li {
	list-style-type: none;
	display: inline-blockk;
	position: relative;
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
