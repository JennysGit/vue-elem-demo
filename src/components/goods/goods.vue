<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex == index}" @click="selectMenu(index, $event)">
					<span class="text">
						<span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="food-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
						<div class="icon">
							<img :src="food.icon" alt="" width="57">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span class="count">月售{{food.sellCount}}</span>
								<span class="count">好评{{food.rating}}</span>
							</div>
							<div class="price">
								<span class="now">￥{{food.price}}</span>
								<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
							</div>
							<div class="cart-control-wrapper">
								 <cartControl :food="food" @increment="incrementTotal"></cartControl>
							</div>
						</div>
					</ul>
				</li>
			</ul>
		</div>
		<div class="cart-bar-wrapper">
			<cartBar :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" ref="shopCart"></cartBar>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	// import Vue from 'vue';
	import data from 'common/json/data.json';
	import cartControl from '../cartControl/cartControl.vue';
	import cartBar from '../cartBar/cartBar.vue';

	// Vue.component('cartControl', cartControl);
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrolly: 0,
				selectedFood: {}
			};
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height = this.listHeight[i];
					let nextHeight = this.listHeight[i + 1];
					if (!nextHeight || (this.scrolly >= height && this.scrolly < nextHeight)) {
						return i;
					}
				}
				return 0;
			}
		},
		created () {
			this.goods = data.goods;
			this.$nextTick(() => {
				this._initScorll();
				this._calculateHeight();
			});
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		methods: {
			_initScorll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});

				this.foodScroll = new BScroll(this.$refs.foodWrapper, {
					probeType: 3,
					click: true
				});

				this.foodScroll.on('scroll', (pos) => {
					this.scrolly = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight () {
				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
				console.log('listHeight', this.listHeight);
			},
			selectMenu (index, event) {
				if (!event._constructed) {
					return;
				}
				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodScroll.scrollToElement(el, 300);
			},
			incrementTotal (target) {
				this.$refs.shopCart.drop(target);
			}
		},
		components: {
			cartControl,
			cartBar
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "goods.styl";
</style>
