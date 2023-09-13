<script>
import modalWindow from './components/modalWindowFolder.vue'
import dotCircle from './components/dotCircle.vue'
import storageLink from './storage/adapters/link'
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
			isModalWindowOpen: false,
			activeLink: null
		}
	},
	mounted() {
		const storageActiveLink = storageLink.getActiveLinkInStorage()
		if (storageActiveLink) {
			this.activeLink = JSON.parse(storageActiveLink)
		}
	},

	methods: {
		setActiveLink(link) {
			this.activeLink = link
			storageLink.setActiveLinkInStorage(link)
		},
		onDeleteFolder(id) {
			if (id === this.activeLink) {
				this.dataStore.deleteFolder(id)
				storageLink.removeActiveLinkInStorage()
				this.$router.push('/')
				return
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
			<svg
				v-if="!show"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 30 30"
				width="20"
				height="20"
			>
				<path
					d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"
				/>
			</svg>

			<svg
				v-else
				width="20"
				height="20"
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
				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="7C7C7C"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
					/>
				</svg>

				Все задачи
			</router-link>

			<nav class="menuNav">
				<ul>
					<li
						v-for="title in dataStore.getTitlesWithTasks"
						:key="title.id"
						@click="
							() => {
								closeMenu
								setActiveLink(title.id)
							}
						"
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
								width="10"
								height="10"
								viewBox="0 0 11 11"
								fill="#E3E3E3"
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
				<svg
					width="12"
					height="12"
					fill="black"
					viewBox="0 0 12 12"
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

.deleteTitle {
	opacity: 0;
	background: transparent;
	border: 0;
	cursor: pointer;
	position: absolute;
	margin-top: -40px;
	margin-left: 190px;
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
.titleTask.router-link-active + .deleteTitle {
	opacity: 1;
}
li:hover .titleTask {
	border-radius: 4px;
	background: #f8f6f4;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

li .titleTask.router-link-active {
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
	padding-right: 5px;
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
