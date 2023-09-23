import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'
import storageTitle from './storage/adapters/title'
import storageTask from './storage/adapters/task'

export const useDataStore = defineStore('data', {
	state: () => ({
		data: [],
		title: [],
		task: []
	}),

	getters: {
		getTitleById: state => id => {
			const title = state.title.find(title => title.id === id)
			if (!title) {
				return null
			}

			const tasks = state.task.filter(task => task.taskId === id)

			return {
				...title,
				tasks
			}
		},

		getTitlesWithTasks: state => {
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

		addTitle(inputValue, color) {
			const maxId = Math.max(0, ...this.title.map(title => title.id))

			this.title.push({
				id: maxId + 1,
				color: color,
				title: inputValue
			})
			storageTitle.setTitleInStorage(this.title)
		},

		addTask(inputValue, taskId) {
			const maxId = Math.max(0, ...this.task.map(task => task.id))

			this.task.push({
				id: maxId + 1,
				taskId: taskId,
				task: inputValue,
				doneTask: false
			})
			storageTask.setTaskInStorage(this.task)
		},

		updateTitle(id, newTitle) {
			const oldTitle = this.title.find(oldTitle => oldTitle.id === id)
			oldTitle.title = newTitle
			storageTitle.setTitleInStorage(this.title)
		},
		updateDoneTask(id) {
			const task = this.task.find(task => task.id === id)
			task.doneTask = !task.doneTask
			storageTask.setTaskInStorage(this.task)
		}
	}
})
