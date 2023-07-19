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
		:style="{ backgroundColor: color }"
		class="circle"
	></div>
</template>

<style>
.circle {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	margin-top: 10px;
	margin-right: 10px;
	display: inline-block;
}
</style>
