<script>
import { useDataStore } from '../store'
import { mapStores } from 'pinia'
import closeWindowIcon from '../assets/image/closeButton.svg'
import vClickOutside from 'click-outside-vue3'
import colors from '../api/colors'

export default {
	components: {
		closeWindowIcon
	},
	directives: {
		clickOutside: vClickOutside.directive
	},
	emits: ['close'],

	data() {
		return {
			colors: [],
			inputValue: '',
			colorFolder: '',
			defaultColor: '#000',
			error: false
		}
	},
	computed: {
		...mapStores(useDataStore)
	},
	mounted() {
		this.dataStore.fetchData()

		this.colors = colors
		this.defaultColor = colors[0]

		this.popupItem = this.$el

		this.$el.focus()

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
		getColor(color) {
			this.defaultColor = color
		},
		handlPrevent() {
			if (this.inputValue.trim() === '') {
				return (this.error = true)
			}
			this.error = false
			this.dataStore.addFolder(this.inputValue, this.defaultColor)

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
			<button
				type="button"
				class="buttonClose"
				@click="close"
			>
				<closeWindowIcon />
			</button>
			<input
				v-model="inputValue"
				:maxlength="17"
				class="InputFolder"
				type="text"
				placeholder="Название папки"
				:class="{ 'error-message': error }"
				@input="clearError"
			/>
			<div>
				<label
					v-for="color in colors"
					:key="color"
					class="circle-div"
				>
					<input
						v-model="defaultColor"
						class="circle-input"
						type="radio"
						name="circle-radio"
						:value="color"
					/>
					<span
						class="circle-span"
						:style="{ backgroundColor: color }"
						@click="getColor(color)"
					></span>
				</label>
			</div>
			<button
				class="buttonAddFolder"
				type="submit"
			>
				Добавить
			</button>
		</form>
	</div>
</template>

<style scoped>
.circle-div:first-child {
	padding-left: 13px;
}
.circle-div:first-child .circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px #525252;
}
.circle-div {
	display: inline-block;
	margin-top: 13px;
}

.circle-input {
	position: absolute;
	-webkit-appearance: none;
	appearance: none;
}
.circle-span {
	display: inline-block;
	height: 20px;
	width: 20px;
	border-radius: 20px;
	cursor: pointer;
	margin-left: 5px;
}
.circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px #525252;
}
.modalWindow {
	position: relative;
	background-color: #ffffff;
	height: 160px;
	width: 235px;
	border-radius: 10px;
	margin-top: 25px;
	margin-left: 30px;
}
.InputFolder {
	width: 200px;
	height: 32px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 1px solid #efefef;
	box-sizing: border-box;
	margin-top: 15px;
	margin-left: 15px;
	padding-left: 15px;
	outline: none;
}
.InputFolder:hover {
	border: 2px solid black;
	border-radius: 4px;
	margin-left: 14px;
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
	height: 32px;
	outline: none;
	border: 0;
	background: transparent;
	float: right;
	cursor: pointer;
}
.buttonClose svg:hover {
	fill: black;
}

.buttonAddFolder {
	color: #fff;
	background-color: #4dd599;
	width: 200px;
	height: 37px;
	border-radius: 4px;
	border: 0;
	cursor: pointer;
	margin-top: 10px;
	margin-left: 17px;
}
.buttonAddFolder:active {
	background-color: #256e4e;
}
.buttonAddFolder:hover {
	background-color: #42bb87;
}
</style>
