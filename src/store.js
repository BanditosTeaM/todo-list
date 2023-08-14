import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'

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
		inputTask: ''
	}),
	actions: {
		initializeTitle() {
			const storedTitles = localStorage.getItem(STORAGE_TITLE_KEY)
			if (!storedTitles) return

			const jsonTitles = JSON.parse(storedTitles)
			if (!jsonTitles) return

			this.title = jsonTitles
		},
		initializeTask() {
			const storedTasks = localStorage.getItem(STORAGE_TASK_KEY)
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
			localStorage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},
		deleteTask(id) {
			this.task = this.task.filter(task => task.id !== id)
			localStorage.setItem(STORAGE_TASK_KEY, JSON.stringify(this.task))
		},
		addTitle() {
			this.title.push({
				id: this.title.length + 1,
				colorId: this.colorIDforFolder,
				title: this.inputFolder
			})
			localStorage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},
		addTask(id) {
			this.task.push({
				id: this.task.length + 1,
				taskId: id,
				task: this.inputTask
			})
			localStorage.setItem(STORAGE_TASK_KEY, JSON.stringify(this.task))
		},

		getColorIdForFolder(id) {
			this.colorIDforFolder = id
		}
	}
})
