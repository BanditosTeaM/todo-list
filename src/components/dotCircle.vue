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
	<div
		class="circle"
		:style="{ backgroundColor: color }"
	></div>
</template>

<style>
.circle {
	width: 10px;
	height: 10px;
	flex-shrink: 0;
	border-radius: 50%;
	cursor: pointer;
	display: inline-block;
	margin-top: 14px;
	margin-right: 10px;
	margin-left: 12px;
}
</style>
