import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'

const STORAGE_TITLE_KEY = 'infoTitle'

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
		initialize() {
			const storedTitles = localStorage.getItem(STORAGE_TITLE_KEY)
			if (!storedTitles) return

			const jsonTitles = JSON.parse(storedTitles)
			if (!jsonTitles) return

			this.title = jsonTitles
		},
		async fetchData() {
			try {
				this.data = await getDatabaseData()
				if (this.title.length === 0) {
					this.title = this.data.titleTask
				}
				this.color = this.data.titleColor
				this.task = this.data.infoTask
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
			this.addToLocalStorage()
		},
		addTitle() {
			this.title.push({
				id: this.title.length + 1,
				colorId: this.colorIDforFolder,
				title: this.inputFolder
			})
			this.addToLocalStorage()
		},
		// addTask(id) {
		// 	this.task.push({
		// 		id: this.task.length + 1,
		// 		taskId: id,
		// 		task: this.inputTask
		// 	})
		// 	this.addToLocalStorage()
		// },
		addToLocalStorage() {
			localStorage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
			const storedTitles = localStorage.getItem(STORAGE_TITLE_KEY)
			this.title = JSON.parse(storedTitles)
			console.log(this.title)
		},

		getColorIdForFolder(id) {
			this.colorIDforFolder = id
		}
	}
})
