import storage from '../index'

const STORAGE_TASK_KEY = 'infoTask'

function setTaskInStorage(value) {
	storage.setItem(STORAGE_TASK_KEY, JSON.stringify(value))
}

function getTaskInStorage() {
	return storage.getItem(STORAGE_TASK_KEY)
}

export default {
	setTaskInStorage,
	getTaskInStorage
}
