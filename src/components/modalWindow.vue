<script>
import database from '../db.json'
import dotCircle from './dotCircle.vue'

export default {
	components: {
		dotCircle
	},
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

		<div>
			<dotCircle
				v-for="circle in titleColor"
				:key="circle.id"
				:color="circle.color"
			/>
		</div>
		<div class="buttonAddFolder">
			<button>Добавить</button>
		</div>
	</div>
</template>

<style scoped>
.modalWindow {
	background-color: red;
	height: 150px;
	width: 350px;
	border-radius: 10px;
	margin-top: 25px;
	margin-left: 30px;
}
.InputFolder {
	width: 200px;
	height: 40px;
	border-radius: 4px;
	border: 1px;
	box-sizing: border-box;
	margin-top: 15px;
	margin-left: 75px;
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
}
.buttonAddFolder {
	text-align: center;
}
.buttonAddFolder button {
	background-color: #4dd599;
	width: 200px;
	height: 37px;
	border-radius: 4px;
	border: 0;
	cursor: pointer;
}
.buttonAddFolder button:active {
	background-color: #256e4e;
}
</style>
