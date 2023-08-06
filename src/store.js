import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'

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
		async fetchData() {
			try {
				this.data = await getDatabaseData()
				this.title = this.data.titleTask
				this.color = this.data.titleColor
				this.task = this.data.infoTask
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		},
		deleteFolder(id) {
			this.title = this.title.filter(title => title.id !== id)
			localStorage.setItem('infoTitle', JSON.stringify(this.title))
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
			localStorage.setItem('infoTitle', JSON.stringify(this.title))
			const storedTitles = localStorage.getItem('infoTitle')
			this.title = JSON.parse(storedTitles)
			console.log(this.title)
		},

		getColorIdForFolder(id) {
			this.colorIDforFolder = id
		}
	}
})
