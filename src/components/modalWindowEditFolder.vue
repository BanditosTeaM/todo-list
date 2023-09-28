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
	props: {
		id: {
			type: String,
			required: true
		},
		selectFolder: {
			type: String,
			required: true
		}
	},
	emits: ['close'],

	data() {
		return {
			newFolder: this.selectFolder,
			colors: [],
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

		checkInputOnError(value) {
			if (value.trim() === '') {
				this.error = true
			}
			this.error = false
			this.dataStore.updateFolder(this.id, value, this.defaultColor)
			this.close()
		},
		clearError() {
			this.error = false
		},
		getColor(color) {
			this.defaultColor = color
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
					v-model="newFolder"
					:maxlength="20"
					class="EditInput"
					:class="{ 'error-message': error }"
					type="text"
					placeholder="Новое название папки"
					@input="clearError"
					@keyup.enter="checkInputOnError(newFolder)"
				/>
			</div>
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
			<div class="buttonEditfolder">
				<button @click="checkInputOnError(newFolder)">Изменить</button>
			</div>
		</div>
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
