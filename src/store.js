import { defineStore } from 'pinia'
import storageFolder from './storage/adapters/folder'
import storageTask from './storage/adapters/task'

export const useDataStore = defineStore('data', {
	state: () => ({
		folders: [],
		tasks: []
	}),

	getters: {
		getFolderById: state => id => {
			if (!state.folders && !Array.isArray(state.folders)) {
				return null
			}
			const folder = state.folders.find(folder => folder._id === id)
			if (!folder) {
				return null
			}

			const tasks = state.tasks.filter(task => task.folderID === id)

			return {
				...folder,
				tasks
			}
		},

		getFoldersWithTasks: state => {
			if (!state.folders && !Array.isArray(state.folders)) {
				return []
			}
			return state.folders.map(folder => {
				const tasks = state.tasks.filter(task => task.folderID === folder._id)
				return {
					...folder,
					tasks
				}
			})
		}
	},

	actions: {
		async fetchData() {
			try {
				if (this.folders.length === 0) {
					this.folders = await fetch(
						'https://todo-api-cyan.vercel.app/folder/'
					).then(response => response.json())
				}

				if (this.tasks.length === 0) {
					this.tasks = await fetch(
						'https://todo-api-cyan.vercel.app/task/'
					).then(response => response.json())
				}
			} catch (error) {
				if (error.response && error.response.status === 500) {
					console.error('Ошибка при загрузке данных с сервера:', error.message)
				} else {
					console.error('Другая ошибка:', error)
				}
			}
		},
		initializeFolder() {
			const jsonfolders = JSON.parse(storageFolder.getFolderInStorage())
			if (!jsonfolders) return
			this.folders = jsonfolders
		},

		initializeTask() {
			const jsonTasks = JSON.parse(storageTask.getTaskInStorage())
			if (!jsonTasks) return

			this.tasks = jsonTasks
		},

		deleteFolder(id) {
			fetch(`https://todo-api-cyan.vercel.app/folder/${id}`, {
				method: 'DELETE'
			})
			this.folders = this.folders.filter(folder => folder._id !== id)
			storageFolder.setFolderInStorage(this.folders)
		},

		deleteTask(id) {
			fetch(`https://todo-api-cyan.vercel.app/task/${id}`, {
				method: 'DELETE'
			})
			this.task = this.tasks.filter(task => task._id !== id)
			storageTask.setTaskInStorage(this.tasks)
		},

		addFolder(inputValue, color) {
			const addFolder = {
				name: inputValue,
				color: color
			}

			fetch('https://todo-api-cyan.vercel.app/folder/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(addFolder)
			})
				.then(response => response.json())
				.then(data => {
					this.folders.push({
						_id: data._id,
						color: data.color,
						name: data.name
					})
					storageFolder.setFolderInStorage(this.folders)
				})
		},

		addTask(inputValue, taskId) {
			const addTask = {
				folderID: taskId,
				text: inputValue
			}

			fetch('https://todo-api-cyan.vercel.app/task/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(addTask)
			})
				.then(response => response.json())
				.then(data => {
					this.tasks.push({
						_id: data._id,
						folderID: data.folderID,
						text: data.text,
						done: data.done
					})
					storageTask.setTaskInStorage(this.tasks)
				})
		},

		updateFolder(id, newFolder, newColor) {
			const oldFolder = this.folders.find(oldFolder => oldFolder._id === id)
			oldFolder.name = newFolder
			oldFolder.color = newColor

			const putFolder = {
				name: oldFolder.name,
				color: oldFolder.color
			}

			fetch(`https://todo-api-cyan.vercel.app/folder/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(putFolder)
			}).then(response => response.json())

			storageFolder.setFolderInStorage(this.folders)
		},

		updateTask(id, newTask) {
			const oldTask = this.tasks.find(oldTask => oldTask._id === id)
			oldTask.text = newTask
			const putTask = {
				text: oldTask.text
			}

			fetch(`https://todo-api-cyan.vercel.app/task/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(putTask)
			}).then(response => response.json())
			storageTask.setTaskInStorage(this.tasks)
		},

		updateDoneTask(id) {
			const task = this.tasks.find(task => task._id === id)
			task.done = !task.done

			const putTask = {
				done: task.done
			}

			fetch(`https://todo-api-cyan.vercel.app/task/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(putTask)
			}).then(response => response.json())

			storageTask.setTaskInStorage(this.tasks)
		}
	}
})
