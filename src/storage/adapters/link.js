import storage from '../index'

const STORAGE_LINK_KEY = 'activeLink'

function setActiveLinkInStorage(value) {
	storage.setItem(STORAGE_LINK_KEY, JSON.stringify(value))
}

function getActiveLinkInStorage() {
	return storage.getItem(STORAGE_LINK_KEY)
}
function removeActiveLinkInStorage() {
	return storage.removeItem(STORAGE_LINK_KEY)
}

export default {
	setActiveLinkInStorage,
	getActiveLinkInStorage,
	removeActiveLinkInStorage
}
