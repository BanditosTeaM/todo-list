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
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	margin-left: 6px;
}
</style>
