<script>
import { useDataStore } from '../store'
import { mapStores } from 'pinia'
import vClickOutside from 'click-outside-vue3'

export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},
	emits: ['close'],

	data() {
		return {
			inputValue: '',
			error: false
		}
	},
	computed: {
		...mapStores(useDataStore)
	},
	mounted() {
		this.dataStore.fetchData()

		document.addEventListener('keyup', this.onKeyUp)
	},
	unmounted() {
		document.removeEventListener('keyup', this.onKeyUp)
	},
	methods: {
		onKeyUp(event) {
			if (event.key === 'Escape') {
				this.close()
			}
		},
		close() {
			this.$emit('close')
		},
		handlPrevent() {
			if (this.inputValue.trim() === '') {
				return (this.error = true)
			}
			this.error = false
			this.dataStore.addTask(this.inputValue, this.id)
			this.close()
		},
		clearError() {
			this.error = false
		}
	}
}
</script>

<template>
	<div v-click-outside="close">
		<form
			class="modalWindow"
			@submit.prevent="handlPrevent"
		>
			<input
				v-model="inputValue"
				:maxlength="100"
				type="text"
				placeholder="Текст задачи"
				class="inputAddTask"
				:class="{ 'error-message': error }"
				@input="clearError"
			/>
			<div class="buttonsAddTask">
				<button
					type="submit"
					class="addTask"
				>
					Добавить задачу
				</button>
				<button
					type="button"
					class="cancelTask"
					@click="close"
				>
					Отмена
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
.error-message {
	color: red;
}
.inputAddTask {
	width: 415px;
	height: 38px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 1px solid #efefef;
	margin-top: 10px;
	margin-bottom: 10px;
	padding-left: 15px;
	background: #fff;
	outline: none;
}
.inputAddTask:hover {
	border-radius: 4px;
	border: 2px solid black;
	padding-left: 14px;
	margin-bottom: 8px;
}
.error-message {
	border: 1px solid red;
}
.addTask {
	width: 145px;
	height: 34px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 0;
	margin-right: 10px;
	background: #4dd599;
	color: #fff;
	cursor: pointer;
}
.addTask:hover {
	background-color: #42bb87;
}
.cancelTask {
	width: 90px;
	height: 34px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 0;
	background: #f4f6f8;
	color: #9c9c9c;
	cursor: pointer;
}
.cancelTask:hover {
	background-color: #e2dfdf;
}
.addTask:active {
	background-color: #256e4e;
}
.cancelTask:active {
	background-color: #b4b4b4;
}

@media (max-width: 768px) {
	.inputAddTask {
		width: 250px;
	}
}
</style>
