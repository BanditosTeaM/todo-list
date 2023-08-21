import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'
import storage from './storage/index'

// TODO: Move it to config
const STORAGE_TITLE_KEY = 'infoTitle'
const STORAGE_TASK_KEY = 'infoTask'

export const useDataStore = defineStore('data', {
	state: () => ({
		data: [],
		title: [],
		// TODO: Remove color and intergrate in in title
		color: [],
		task: [],
		colorIDforFolder: '',
		// TODO: Why inputFolder its all store variable? It local var in allTitle()
		inputFolder: '',
		// TODO: Same as inputFolder
		inputTask: '',
		// TODO: Move open/close logic to component
		isModalWindowOpen: false
	}),

	getters: {
		/* 
			TODO: Rename getTaskForIdTitle
			This method get all tasks from store by taskId(connected title ID)

			We not get task for id title
			We get all tasks by titleId(now taskId)

			EX: getTasksByTitleId
		*/
		getTaskForIdTitle: state => {
			return id => state.task.filter(task => task.taskId === id)
		},

		/*
			TODO: Rename getTitleTasksWithInfoTasks

			This method transform all title's to title's with "tasks" field for output

			EX: getTitlesWithIntegratedTasks
			or
			getTitlesWithTasks
			or
			...
		*/
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
			/*
				Why our store has access to storage? What
			*/
			const storedTitles = storage.getItem(STORAGE_TITLE_KEY)
			/*
				INFO: We not need it check if really 
				getItem return `null` or `stringified object`

					// JSON.parse on `stringified object` return object
				JSON.parse on null return `null`
			*/
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

		// TODO: Move it func on top of `actions` for some structure
		async fetchData() {
			try {
				this.data = await getDatabaseData()

				if (this.title.length === 0) {
					this.title = this.data.titleTask
				}

				if (this.task.length === 0) {
					this.task = this.data.infoTask
				}

				// TODO: Why color is not in localstorage?
				this.color = this.data.titleColor
			} catch (error) {
				/*
					TODO: We need get it message only on not good fetch data from server 
					But not on errors in store
				*/
				console.error('Ошибка при загрузке данных:', error)
			}
		},

		deleteFolder(id) {
			this.title = this.title.filter(title => title.id !== id)

			/* 
				TODO: Why our store has access to storage by some magic key? 
				Create adapter for it

				Looks like setTitlesInStorage(this.title)
			*/
			storage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},

		deleteTask(id) {
			this.task = this.task.filter(task => task.id !== id)

			// TODO: Remove debug console.log
			console.log('Вы удалили задачу с id: ' + id)

			// TODO: Why our store has access to storage by some magic key?
			storage.setItem(STORAGE_TASK_KEY, JSON.stringify(this.task))
		},

		/*
			addTitle should has two params:
			1. name
			2. colorId

			Please, not use VUE reactivity for store variables as u do it
		*/
		addTitle() {
			// TODO: Transform inputFolder to local variable
			// TODO: Use `===` instead of `==`. I add it in eslint rules
			if (this.inputFolder.length == 0 || this.inputFolder == ' ') {
				// TODO: Remove magic variable. Move it to config
				this.inputFolder = 'Новая папка'
			}

			/*
				Why max title id is not id of last title element?

				And we can get all id's of titles and use Math.max()

				EX: Math.max(0, ...this.title.map(title => title.id))

				We dont need check on this.title.length > 0
			*/
			const maxId =
				this.title.length > 0
					? this.title.reduce((max, title) => Math.max(max, title.id), 0)
					: 0

			this.title.push({
				id: maxId + 1,
				// TODO: Trahsform colorIDforFolder to function param
				colorId: this.colorIDforFolder,
				// TODO: Trahsform inputFolder to function param
				title: this.inputFolder
			})

			// TODO: Why our store has access to storage by some magic key?
			storage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},

		/* 
			XXX: Look addTitle

			TODO: Rename id to `taskId` or better `titleId`
		*/
		addTask(id) {
			if (this.inputTask.length == 0 || this.inputTask == ' ') {
				// TODO: Move it to config
				this.inputTask = 'Новая задача'
			}

			// XXX: Look addTitle
			const maxId =
				this.task.length > 0
					? this.task.reduce((max, task) => Math.max(max, task.id), 0)
					: 0

			this.task.push({
				id: maxId + 1,
				taskId: id,
				task: this.inputTask
			})

			// TODO: Why our store has access to storage by some magic key?
			storage.setItem(STORAGE_TASK_KEY, JSON.stringify(this.task))
		},

		// TODO: Its not get. Its set. In really we dont need `colorIDforFolder`
		getColorIdForFolder(id) {
			this.colorIDforFolder = id
		},

		updateTitle(id, newTitle) {
			this.title[id - 1].title = newTitle

			// TODO: Why our store has access to storage by some magic key?
			storage.setItem(STORAGE_TITLE_KEY, JSON.stringify(this.title))
		},

		// TODO: Move open/close logic to component
		openWindowFolder() {
			this.isModalWindowOpen = true
		},

		// TODO: Move open/close logic to component
		closeWindowFolder() {
			this.isModalWindowOpen = false
		}
	}
})
