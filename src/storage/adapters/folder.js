import storage from '../index'

const STORAGE_FOLDER_KEY = 'infoFolder'

function setFolderInStorage(value) {
	storage.setItem(STORAGE_FOLDER_KEY, JSON.stringify(value))
}

function getFolderInStorage() {
	return storage.getItem(STORAGE_FOLDER_KEY)
}

export default {
	setFolderInStorage,
	getFolderInStorage
}
