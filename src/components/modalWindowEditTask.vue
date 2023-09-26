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
		seltask: {
			type: String,
			required: true
		}
	},
	emits: ['close'],

	data() {
		return {
			newTask: this.seltask,
			error: false
		}
	},
	computed: {
		...mapStores(useDataStore)
	},
	mounted() {
		this.dataStore.fetchData()

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

		checkInputOnError(value) {
			if (value.trim() === '') {
				this.error = true
			} else {
				this.error = false
				this.dataStore.updateTask(this.id, value)
				this.close()
			}
		},
		clearError() {
			this.error = false
		}
	}
}
</script>

<template>
	<div v-click-outside="close">
		<div
			class="modalWindow"
			@keyup.esc="close"
		>
			<div class="divButtonClose">
				<button
					class="buttonClose"
					@click="close"
				>
					<closeWindowIcon />
				</button>
			</div>
			<div>
				<input
					v-model="newTask"
					:maxlength="100"
					class="EditInput"
					:class="{ 'error-message': error }"
					type="text"
					placeholder="Новое название задачи"
					@input="clearError"
					@keyup.enter="checkInputOnError(newTask)"
				/>
			</div>

			<div class="buttonEditfolder">
				<button @click="checkInputOnError(newTask)">Изменить</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modalWindow {
	position: absolute;
	background-color: #f4f6f8;
	height: 130px;
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
	border-top: 13px;
	text-align: center;
}
.buttonEditfolder button {
	background-color: #4dd599;
	color: #fff;
	width: 200px;
	height: 33px;
	border-radius: 4px;
	border: 0;
	cursor: pointer;
	margin-top: 10px;
}
.buttonEditfolder button:active {
	background-color: #256e4e;
}
.buttonEditfolder button:hover {
	background-color: #42bb87;
}
</style>
