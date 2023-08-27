import storage from '../index'

const STORAGE_TITLE_KEY = 'infoTitle'

function setTitleInStorage(value) {
	storage.setItem(STORAGE_TITLE_KEY, JSON.stringify(value))
}

function getTitleInStorage() {
	return storage.getItem(STORAGE_TITLE_KEY)
}

export default {
	setTitleInStorage,
	getTitleInStorage
}
