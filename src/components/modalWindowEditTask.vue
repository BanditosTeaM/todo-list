<script>
import { useDataStore } from '../store'
import { mapStores } from 'pinia'
import closeWindowIcon from '../assets/image/closeButton.svg'
import vClickOutside from 'click-outside-vue3'

export default {
	components: {
		closeWindowIcon
	},
	directives: {
		clickOutside: vClickOutside.directive
	},
	props: {
		id: {
			type: String,
			required: true
		},
		selectTask: {
			type: String,
			required: true
		}
	},
	emits: ['close'],

	data() {
		return {
			newTask: this.selectTask,
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

		checkInputOnError(value) {
			if (value.trim() === '') {
				return (this.error = true)
			}
			this.error = false
			this.dataStore.updateTask(this.id, value)
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
			@submit.prevent="checkInputOnError(newTask)"
		>
			<button
				type="button"
				class="buttonClose"
				@click="close"
			>
				<closeWindowIcon />
			</button>
			<input
				v-model="newTask"
				:maxlength="100"
				class="EditInput"
				:class="{ 'error-message': error }"
				type="text"
				placeholder="Новое название задачи"
				@input="clearError"
			/>

			<button
				class="buttonEditfolder"
				type="submit"
			>
				Изменить
			</button>
		</form>
	</div>
</template>

<style scoped>
.modalWindow {
	position: absolute;
	background-color: #f4f6f8;
	height: 110px;
	width: 235px;
	border-radius: 10px;
	margin-top: 10px;
	margin-left: 40px;
}
.EditInput {
	width: 200px;
	height: 32px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 1px solid #efefef;
	box-sizing: border-box;
	margin-left: 17px;
	padding-left: 15px;
	margin-top: 20px;
	outline: none;
}
.EditInput:hover {
	border-radius: 4px;
	border: 2px solid black;
	margin-left: 16px;
}

.error-message {
	border: 1px solid red;
}
.buttonClose {
	transform: translate(720%, -50%);
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 30px;
	outline: none;
	border: 0;
	background: transparent;
	float: right;
	cursor: pointer;
}
.buttonClose svg:hover {
	fill: black;
}

.buttonEditfolder {
	background-color: #4dd599;
	color: #fff;
	width: 200px;
	height: 33px;
	border-radius: 4px;
	border: 0;
	cursor: pointer;
	margin-top: 10px;
	margin-left: 17px;
}
.buttonEditfolder:active {
	background-color: #256e4e;
}
.buttonEditfolder:hover {
	background-color: #42bb87;
}
</style>
