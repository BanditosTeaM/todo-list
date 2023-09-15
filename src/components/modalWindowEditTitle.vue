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
			type: Number,
			required: true
		},
		seltitle: {
			type: String,
			required: true
		}
	},
	emits: ['close'],

	data() {
		return {
			newTitle: this.seltitle,
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
				this.dataStore.updateTitle(this.id, value)
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
					v-model="newTitle"
					:maxlength="20"
					class="EditInput"
					:class="{ 'error-message': error }"
					type="text"
					placeholder="Новое название папки"
					@input="clearError"
					@keyup.enter="checkInputOnError(newTitle)"
				/>
			</div>

			<div class="buttonEditTitle">
				<button @click="checkInputOnError(newTitle)">Изменить</button>
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
.buttonEditTitle button:hover {
	background-color: #42bb87;
}
</style>
