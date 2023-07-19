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
		<div>
			<button>Добавить</button>
		</div>
	</div>
</template>

<style scoped>
.modalWindow {
	background-color: red;
	height: 150px;
	width: 280px;
	border-radius: 10px;
	margin-top: 25px;
	margin-left: 30px;
}
.InputFolder {
	width: 200px;
	height: 32px;
	border-radius: 4px;
	border: 1px;
	box-sizing: border-box;
	margin-left: 35px;
	outline: none;
}
.buttonClose {
	width: 30px;
	height: 32;
	outline: none;
	border: 0;
	background: transparent;
	float: right;
}
</style>
