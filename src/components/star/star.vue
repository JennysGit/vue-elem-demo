<template>
	<div class="star">
		<div class="star-item" :class="starType">
			<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_OFF = 'off';
	const CLS_HALF = 'half';

	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType () {
				return 'star-' + this.size;
			},
			itemClasses () {
				let starArr = [];
				let integer = parseInt(this.score);
				let hasDecimal = this.score % 1 !== 0;
				for (let i = 0; i < integer; i++) {
					starArr.push(CLS_ON);
				}

				if (hasDecimal) {
					starArr.push(CLS_HALF);
				}

				while (starArr.length < LENGTH) {
					starArr.push(CLS_OFF);
				}
				return starArr;
			}
		}
	};
</script>
<style type="text/stylus" lang="stylus">
	@import "star.styl"
</style>