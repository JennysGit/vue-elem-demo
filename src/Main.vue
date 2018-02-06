<template>
	<div>
		<v-header :seller="seller"></v-header>
		<div class="tab">
			<div class="tab-item">
				<router-link v-bind:to="'/good'"></router-link>
				商品
			</div>
		</div>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
	</div>
</template>
<script type="text/ecmascript-6">
	import header from './components/header/header.vue';
	import util from 'common/js/util';
	import data from 'common/json/data.json';
	console.log('util', util);
	export default {
		data() {
			return {
				seller: {},
				id: (() => {
					let queryParam = util.urlParse();
					console.log(queryParam);
					return queryParam.id;
				})()
			};
		},
		created() {
			this.seller = data.seller;
			console.log('this.seller', this.seller);
		},
		components: {
			'v-header': header
		}
	};
</script>