<template>
	<div class="cart-control">
		<transition name="fade">
			<div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)">
				<transition name="inner">
					<span class="inner iconfont icon-minus"></span>
				</transition>
			</div>
		</transition>
		<span class="cart-count" v-show="food.count > 0">
			{{ food.count }}
		</span>
		<span class="iconfont icon-plus cart-add" @click.stop.prevent="addCart($event)"></span>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart (event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				this.$emit('increment', event.target);
			},
			decreaseCart (event) {
				this.food.count--;
			}
		}
	};
</script>
<style lang="stylus" rel="stysheet/stylus">
	@import "cartControl.styl";
</style>