import { defineStore } from 'pinia'
import { getDatabaseData } from './api/getDatabaseOld'

export const useDataStore = defineStore('data', {
	state: () => ({
		title: [],
		color: []
	}),
	actions: {
		async fetchData() {
			try {
				const data = await getDatabaseData()

				this.title = data.titleTask
				this.color = data.titleColor
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}
	}
})
