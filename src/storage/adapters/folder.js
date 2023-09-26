import storage from '../index'

const STORAGE_folder_KEY = 'infoFolder'

function setFolderInStorage(value) {
	storage.setItem(STORAGE_folder_KEY, JSON.stringify(value))
}

function getFolderInStorage() {
	return storage.getItem(STORAGE_folder_KEY)
}

export default {
	setFolderInStorage,
	getFolderInStorage
}
