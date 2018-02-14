<template>
	<div class="shop-cart">
		<div class="left">
			<div class="logo-wrapper">
				<i class="icon iconfont icon-cart"></i>
			</div>
			<div class="price">
				<span>￥0</span>
				<span class="desc">另需配送费{{deliveryPrice}}元</span>
			</div>
		</div>
		<div class="right">￥{{minPrice}}元起送</div>
	</div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
	@import './cartBar.styl';
</style>
<script type="text/ecmascript-6" src="./cartBar.js"></script>