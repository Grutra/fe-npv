<template>
  <v-text-field
    label="Discount Rate"
    v-model.number="discountRate"
    box
    :rules="discountRules"
    suffix="%"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({})
export default class DiscountRate extends Vue {
  discountRate: number = 4;
  discountRules: any = [
    (v: any) => { return (!isNaN(v - parseFloat(v))) || "Discount Rate is Required"},
  ];

  @Watch('discountRate')
  onDiscountRateChange() {
    this.$emit('discountChanged', this.discountRate)
  }
}
</script>