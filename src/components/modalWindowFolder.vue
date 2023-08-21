<script>
import { useDataStore } from '../store'
import vClickOutside from 'click-outside-vue3'

export default {
	directives: {
		clickOutside: vClickOutside.directive
	},
	emits: ['close'],
	setup() {
		const dataStore = useDataStore()
		dataStore.fetchData()
		return { dataStore }
	},
	mounted() {
		this.popupItem = this.$el
		this.$el.focus()
	},
	methods: {
		close() {
			this.$emit('close')
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
						src="../assets/closeButton.svg"
						alt="X"
					/>
				</button>
			</div>
			<div>
				<input
					v-model="dataStore.inputFolder"
					:maxlength="17"
					class="InputFolder"
					type="text"
					placeholder="Название папки"
				/>
			</div>

			<label
				v-for="circle in dataStore.color"
				:key="circle.id"
				class="circle-div"
			>
				<input
					class="circle-input"
					type="radio"
					name="circle-radio"
				/>
				<span
					class="circle-span"
					:style="{ backgroundColor: circle.color }"
					@click="dataStore.getColorIdForFolder(circle.id)"
				></span>
			</label>

			<div class="buttonAddFolder">
				<button @click="dataStore.addTitle()">Добавить</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.circle-div {
	display: inline-block;
	margin-top: 13px;
	margin-left: 8.6px;
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
}
.circle-input:checked + .circle-span {
	box-shadow: 0 0 0 2px #525252;
}
.modalWindow {
	background-color: #ffffff;
	height: 150px;
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
	margin-left: 15px;
	padding-left: 15px;
	outline: none;
}
.buttonClose {
	display: block;
	width: 30px;
	height: 32;
	outline: none;
	border: 0;
	background: transparent;
	float: right;
	cursor: pointer;
}
.buttonAddFolder {
	border-top: 13px;
	text-align: center;
}
.buttonAddFolder button {
	background-color: #4dd599;
	width: 200px;
	height: 37px;
	border-radius: 4px;
	border: 0;
	cursor: pointer;
	margin-top: 10px;
}
.buttonAddFolder button:active {
	background-color: #256e4e;
}
@media (max-width: 425px) {
	.modalWindow {
		width: 142px;
		height: 200px;
	}
	.buttonAddFolder button {
		width: 100px;
	}
	.InputFolder {
		width: 130px;
		margin-left: 5px;
		padding: 5px;
	}
	.circle-div {
		margin-left: 5px;
	}
	.circle-span {
		width: 25px;
		height: 25px;
	}
}
</style>
