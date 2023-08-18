import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'
import storage from './storage/index'

const STORAGE_TITLE_KEY = 'infoTitle'
const STORAGE_TASK_KEY = 'infoTask'

export const useDataStore = defineStore('data', {
	state: () => ({
		data: [],
		title: [],
		color: [],
		task: [],
		colorIDforFolder: '',
		inputFolder: '',
		inputTask: '',
		isModalWindowOpen: false
	}),
	getters: {
		getTaskForIdTitle: state => {
			return id => state.task.filter(task => task.taskId === id)
		},
		getTitleTasksWithInfoTasks: state => {
			return state.title.map(title => {
				const tasks = state.task.filter(task => task.taskId === title.id)
				return {
					...title,
					tasks
				}
			})
		}
	},

	actions: {
		initializeTitle() {
			const storedTitles = storage.getItem(STORAGE_TITLE_KEY)
			if (!storedTitles) return

			const jsonTitles = JSON.parse(storedTitles)
			if (!jsonTitles) return

			this.title = jsonTitles
		},
		initializeTask() {
			const storedTasks = storage.getItem(STORAGE_TASK_KEY)
			if (!storedTasks) return

			const jsonTasks = JSON.parse(storedTasks)
			if (!jsonTasks) return

			this.task = jsonTasks
		},
		async fetchData() {
			try {
				this.data = await getDatabaseData()
				if (this.title.length === 0) {
					this.title = this.data.titleTask
				}
				if (this.task.length === 0) {
					this.task = this.data.infoTask
				}
				this.color = this.data.titleColor
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		},
		deleteFolder(id) {
			this.title = this.title.filter(title => title.id !== id)
			storage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},
		deleteTask(id) {
			this.task = this.task.filter(task => task.id !== id)
			storage.setItem(STORAGE_TASK_KEY, JSON.stringify(this.task))
		},
		addTitle() {
			if (this.inputFolder.length == 0 || this.inputFolder == ' ') {
				this.inputFolder = 'Новая папка'
			}
			const maxId =
				this.title.length > 0
					? this.title.reduce((max, title) => Math.max(max, title.id), 0)
					: 0

			this.title.push({
				id: maxId + 1,
				colorId: this.colorIDforFolder,
				title: this.inputFolder
			})
			storage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},
		addTask(id) {
			if (this.inputTask.length == 0 || this.inputTask == ' ') {
				this.inputTask = 'Новая задача'
			}
			const maxId =
				this.task.length > 0
					? this.task.reduce((max, task) => Math.max(max, task.id), 0)
					: 0
			this.task.push({
				id: maxId + 1,
				taskId: id,
				task: this.inputTask
			})
			storage.setItem(STORAGE_TASK_KEY, JSON.stringify(this.task))
		},
		getColorIdForFolder(id) {
			this.colorIDforFolder = id
		},
		updateTitle(id, newTitle) {
			this.title[id - 1].title = newTitle
			storage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},
		openWindowFolder() {
			this.isModalWindowOpen = true
		},
		closeWindowFolder() {
			this.isModalWindowOpen = false
		}
	}
})
