// global localStorage

function setItem(name, value) {
	localStorage.setItem(name, value)
}

function getItem(name) {
	return localStorage.getItem(name)
}
function removeItem(name) {
	return localStorage.removeItem(name)
}

export default {
	setItem,
	getItem,
	removeItem
}
