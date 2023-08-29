import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'
import storageTitle from './storage/adapters/title'
import storageTask from './storage/adapters/task'
import variables from './variables'

export const useDataStore = defineStore('data', {
	state: () => ({
		data: [],
		title: [],
		color: [],
		task: [],
		colorIDforFolder: ''
	}),

	getters: {
		getAllById: state => {
			return id =>
				state.title
					.filter(title => title.id === id)
					.map(title => {
						const tasks = state.task.filter(task => task.taskId === id)
						const colors = state.color.filter(
							color => color.id === title.colorId
						)
						return {
							...title,
							tasks,
							colors
						}
					})
		},

		getTitlesWithTasks: state => {
			return state.title.map(title => {
				const tasks = state.task.filter(task => task.taskId === title.id)
				const color =
					state.color.find(color => color.id === title.colorId)?.color || '#000'

				return {
					...title,
					tasks,
					color
				}
			})
		}
	},

	actions: {
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
				if (error.response.status === 500) {
					console.error('Ошибка при загрузке данных с сервера:', error.message)
				} else {
					console.error('Другая ошибка:', error)
				}
			}
		},
		initializeTitle() {
			const jsonTitles = JSON.parse(storageTitle.getTitleInStorage())
			if (!jsonTitles) return
			this.title = jsonTitles
		},

		initializeTask() {
			const jsonTasks = JSON.parse(storageTask.getTaskInStorage())
			if (!jsonTasks) return

			this.task = jsonTasks
		},

		deleteFolder(id) {
			this.title = this.title.filter(title => title.id !== id)
			storageTitle.setTitleInStorage(this.title)
		},

		deleteTask(id) {
			this.task = this.task.filter(task => task.id !== id)
			storageTask.setTaskInStorage(this.task)
		},

		addTitle(inputValue, id) {
			if (id === '') {
				id = this.color[5].id
			}
			const maxId = Math.max(0, ...this.title.map(title => title.id))

			this.title.push({
				id: maxId + 1,
				colorId: id,
				title: inputValue
			})
			storageTitle.setTitleInStorage(this.title)
		},

		addTask(inputValue, taskId) {
			const maxId = Math.max(0, ...this.task.map(task => task.id))

			this.task.push({
				id: maxId + 1,
				taskId: taskId,
				task: inputValue
			})
			storageTask.setTaskInStorage(this.task)
		},

		updateTitle(id, newTitle) {
			const oldTitle = this.title.find(oldTitle => oldTitle.id === id)
			oldTitle.title = newTitle
			storageTitle.setTitleInStorage(this.title)
		}
	}
})
