<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" alt="" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span>{{seller.supports.length}}个</span>
				<i class="icon iconfont icon-arrow"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="title"></span>
			<span class="text">{{seller.bulletin}}</span>
			<i class="icon iconfont icon-arrow"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow" @click="hideDetail" transition="fade">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="supports" v-if="seller.supports">
							<li class="support-item" v-for="support in seller.supports">
								<span class="icon" :class="classMap[support.type]"></span>
								<span class="text">{{support.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<div class="content">
								{{seller.bulletin}}
							</div>
							
						</div>
					</div>
				</div>
				<div class="close">
					<i class="icon iconfont icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '../star/star.vue';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false
			};
		},
		methods: {
			showDetail () {
				this.detailShow = true;
			},
			hideDetail () {
				this.detailShow = false;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		components: {
			star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "header.styl";
</style>