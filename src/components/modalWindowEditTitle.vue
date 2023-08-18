<script>
import { useDataStore } from '../store'

export default {
	props: {
		id: {
			type: Number,
			required: true
		}
	},

	emits: ['close'],
	setup() {
		const dataStore = useDataStore()
		dataStore.fetchData()
		return { dataStore }
	},
	methods: {
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
				v-model="newTitle"
				:maxlength="20"
				class="EditInput"
				type="text"
				placeholder="Новое название папки"
			/>
		</div>
		<div class="buttonEditTitle">
			<button @click="dataStore.updateTitle(id, newTitle)">Изменить</button>
		</div>
	</div>
</template>

<style scoped>
.modalWindow {
	background-color: #f4f6f8;
	height: 120px;
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
	outline: none;
}
.buttonClose {
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
