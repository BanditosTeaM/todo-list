<script>
export default {
	emits: ['close'],
	methods: {
		close() {
			this.$emit('close')
		}
	}
}
</script>

<template>
	<div class="modalWindow">
		<div>
			<input
				type="text"
				placeholder="Текст задачи"
				class="inputAddTask"
			/>
		</div>
		<div class="buttonsAddTask">
			<button class="addTask">Добавить задачу</button>
			<button
				class="cancelTask"
				@click="close"
			>
				Отмена
			</button>
		</div>
	</div>
</template>

<style scoped>
.inputAddTask {
	width: 415px;
	height: 38px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 1px solid #efefef;
	margin-top: 10px;
	margin-bottom: 10px;
	background: #fff;
}
.addTask {
	width: 145px;
	height: 34px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 0;
	margin-right: 10px;
	background: #4dd599;
	cursor: pointer;
}
.cancelTask {
	width: 90px;
	height: 34px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 0;
	background: #f4f6f8;
	cursor: pointer;
}
.addTask:active {
	background-color: #256e4e;
}
.cancelTask:active {
	background-color: #b4b4b4;
}
</style>
