<script>
export default {
	props: {
		color: {
			type: String,
			required: true
		}
	}
}
</script>

<template>
	<div class="circle">
		<input
			class="checkInput"
			type="radio"
			name="checkRadio"
		/>
		<span
			class="checkBox"
			:style="{ backgroundColor: color }"
		></span>
	</div>
</template>

<style>
.circle {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	cursor: pointer;
	display: inline-block;
	margin-top: 10px;
	margin-right: 10px;
	padding-left: 8px;
}
.checkInput {
	position: absolute;
	-webkit-appearance: none;
	appearance: none;
}
.checkBox {
	display: inline-block;
	height: 30px;
	width: 30px;
	border-radius: 20px;
}
.checkInput:checked + .checkBox {
	box-shadow: 0 0 0 2px black;
}
</style>
