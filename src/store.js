import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
	state: () => ({
		title: [],
		color: []
	}),
	actions: {
		async fetchData() {
			try {
				const res = await fetch('/db.json')
				const data = await res.json()
				this.title = data.titleTask
				this.color = res.titleColor
				console.log(res)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}
	}
})
