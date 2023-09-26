import { defineStore } from 'pinia'
import storageFolder from './storage/adapters/folder'
import storageTask from './storage/adapters/task'

export const useDataStore = defineStore('data', {
	state: () => ({
		folder: [],
		task: []
	}),

	getters: {
		getFolderById: state => id => {
			if (!state.folder && !Array.isArray(state.folder)) {
				return []
			}
			const folder = state.folder.find(folder => folder._id === id)
			if (!folder) {
				return null
			}

			const tasks = state.task.filter(task => task.folderID === id)

			return {
				...folder,
				tasks
			}
		},

		getFoldersWithTasks: state => {
			if (!state.folder && !Array.isArray(state.folder)) {
				return []
			}
			return state.folder.map(folder => {
				const tasks = state.task.filter(task => task.folderID === folder._id)
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
				if (this.folder.length === 0) {
					this.folder = await fetch('http://localhost:3001/api/folder/').then(
						response => response.json()
					)
				}

				if (this.task.length === 0) {
					this.task = await fetch('http://localhost:3001/api/task/').then(
						response => response.json()
					)
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
			this.folder = jsonfolders
		},

		initializeTask() {
			const jsonTasks = JSON.parse(storageTask.getTaskInStorage())
			if (!jsonTasks) return

			this.task = jsonTasks
		},

		deleteFolder(id) {
			fetch(`http://localhost:3001/api/folder/${id}`, {
				method: 'DELETE'
			})
			this.folder = this.folder.filter(folder => folder._id !== id)
			storageFolder.setFolderInStorage(this.folder)
		},

		deleteTask(id) {
			fetch(`http://localhost:3001/api/task/${id}`, {
				method: 'DELETE'
			})
			this.task = this.task.filter(task => task._id !== id)
			storageTask.setTaskInStorage(this.task)
		},

		addFolder(inputValue, color) {
			const addFolder = {
				name: inputValue,
				color: color
			}

			fetch('http://localhost:3001/api/folder/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(addFolder)
			})
				.then(response => response.json())
				.then(data => {
					this.folder.push({
						_id: data._id,
						color: data.color,
						name: data.name
					})
					storageFolder.setFolderInStorage(this.folder)
				})
		},

		addTask(inputValue, taskId) {
			const addTask = {
				folderID: taskId,
				text: inputValue
			}

			fetch('http://localhost:3001/api/task/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(addTask)
			})
				.then(response => response.json())
				.then(data => {
					this.task.push({
						_id: data._id,
						folderID: data.folderID,
						text: data.text,
						done: data.done
					})
					storageTask.setTaskInStorage(this.task)
				})
		},

		updateFolder(id, newFolder, newColor) {
			const oldFolder = this.folder.find(oldFolder => oldFolder._id === id)
			oldFolder.name = newFolder
			oldFolder.color = newColor

			const putFolder = {
				name: oldFolder.name,
				color: oldFolder.color
			}

			fetch(`http://localhost:3001/api/folder/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(putFolder)
			}).then(response => response.json())

			storageFolder.setFolderInStorage(this.folder)
		},

		updateTask(id, newTask) {
			const oldTask = this.task.find(oldTask => oldTask._id === id)
			oldTask.text = newTask
			const putTask = {
				text: oldTask.text
			}

			fetch(`http://localhost:3001/api/task/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(putTask)
			}).then(response => response.json())
			storageTask.setTaskInStorage(this.task)
		},

		updateDoneTask(id) {
			const task = this.task.find(task => task._id === id)
			task.done = !task.done

			const putTask = {
				done: task.done
			}

			fetch(`http://localhost:3001/api/task/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(putTask)
			}).then(response => response.json())

			storageTask.setTaskInStorage(this.task)
		}
	}
})
