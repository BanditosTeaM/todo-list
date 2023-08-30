<script>
import { useDataStore } from '../store'
import vClickOutside from 'click-outside-vue3'

export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	props: {
		id: {
			type: Number,
			required: true
		},
		seltitle: {
			type: String,
			required: true
		}
	},
	emits: ['close'],
	setup() {
		const dataStore = useDataStore()
		dataStore.fetchData()
		return { dataStore }
	},
	data() {
		return {
			newTitle: this.seltitle,
			error: false
		}
	},

	methods: {
		close() {
			this.$emit('close')
		},
		updateTitle() {
			this.dataStore.updateTitle(this.id, this.newTitle)
			this.close()
		},
		checkInputOnError(value) {
			if (value.trim() === '') {
				this.error = true
			} else {
				this.error = false
				this.updateTitle()
				this.close()
			}
		}
	}
}
</script>

<template>
	<div v-click-outside="close">
		<div class="modalWindow">
			<div class="divButtonClose">
				<button
					class="buttonClose"
					@click="close"
				>
					<img
						src="../assets/image/closeButton.svg"
						alt="X"
					/>
				</button>
			</div>
			<div>
				<input
					v-model="newTitle"
					:maxlength="20"
					class="EditInput"
					type="text"
					placeholder="Новое название папки"
					@keyup.enter="checkInputOnError(newTitle)"
				/>
			</div>

			<div class="buttonEditTitle">
				<button @click="checkInputOnError(newTitle)">Изменить</button>
			</div>
			<p
				v-if="error"
				class="error-message"
			>
				Ошибка: поле ввода пустое
			</p>
		</div>
	</div>
</template>

<style scoped>
.error-message {
	color: red;
	margin-left: 15px;
}
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
.buttonEditTitle {
	border-top: 13px;
	text-align: center;
}
.buttonEditTitle button {
	background-color: #4dd599;
	color: #fff;

	width: 200px;
	height: 33px;
	border-radius: 4px;
	border: 0;
	cursor: pointer;
	margin-top: 10px;
}
.buttonEditTitle button:active {
	background-color: #256e4e;
}
</style>
