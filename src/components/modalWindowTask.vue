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
			type: Number,
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
		this.dataStore.fetchData(),
			document.addEventListener('keyup', event => {
				if (event.key === 'Escape') {
					this.close()
				}
			})
	},
	unmounted() {
		document.addEventListener('keyup', event => {
			if (event.key === 'Escape') {
				this.close()
			}
		})
	},
	methods: {
		close() {
			this.$emit('close')
		},
		checkInputOnError() {
			if (this.inputValue.trim() === '') {
				this.error = true
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
		<div class="modalWindow">
			<div>
				<input
					v-model="inputValue"
					:maxlength="100"
					type="text"
					placeholder="Текст задачи"
					class="inputAddTask"
					:class="{ 'error-message': error }"
					@input="clearError"
					@keyup.enter="checkInputOnError"
				/>
			</div>
			<div class="buttonsAddTask">
				<button
					class="addTask"
					@click="checkInputOnError"
				>
					Добавить задачу
				</button>
				<button
					class="cancelTask"
					@click="close"
				>
					Отмена
				</button>
			</div>
		</div>
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
