<script>
import database from '../db.json'

export default {
	emits: ['close'],
	data() {
		return {
			titleColor: database.titleColor
		}
	},
	mounted() {
		this.fetchCircles()
	},
	methods: {
		fetchCircles() {
			// Загрузка данных из файла database.json
			this.circles = database.titleColor
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>

<template>
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
				class="InputFolder"
				type="text"
				placeholder="Название папки"
			/>
		</div>

		<label
			v-for="circle in titleColor"
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
			></span>
		</label>

		<div class="buttonAddFolder">
			<button>Добавить</button>
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
</style>
