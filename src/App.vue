<script>
import modalWindow from './components/modalWindow.vue'
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
			tasks: []
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
					>
						<label>
							<router-link :to="'/task-info/' + title.id">
								<dotCircle :color="getColorById(title.colorId)" />
								{{ title.title }}
							</router-link>
						</label>
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
img {
	height: 25px;
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
