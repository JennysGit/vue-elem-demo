export default {
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    }
  },
  created() {
    console.log(this.minPrice);
  },
  methods: {
    drop(el) {
     console.log(el);
    }
  }
};
