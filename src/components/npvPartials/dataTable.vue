<template>
  <span>
    <v-data-table
      :headers="headers"
      :items="entries"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ dateFormatted(props.item.date) }}</td>
        <td>{{ cashFlowFormatted(props.item.cashFlow) }}</td>
        <td>{{ cashFlowFormatted(calculatePV(props.item)) }}</td>
      </template>
    </v-data-table>
    <v-flex text-xs-right>
      <h3 class="pa-3"><span class="pr-3">NPV</span> {{ cashFlowFormatted(totalNpv) }}</h3>
    </v-flex>
  </span>
</template>

<script lang="ts">
  import { Component, Prop , Vue } from 'vue-property-decorator';
  import { Moment } from 'moment';
  import moment from 'moment';
  import numeral from 'numeral';
  import ICashFlow from '../../types/ICashFlow';

  @Component({})
  export default class DataTable extends Vue {
    headers: any[] = [
      { text: 'Date', value: 'date' },
      { text: 'Cash Flow', value: 'cashFlow' },
      { text: 'PV', value: 'pv' }
    ];

    @Prop() entries!: ICashFlow[];
    @Prop() discountRate!: number;
    @Prop() analysisDate!: Moment;

    get totalNpv() {
      return this.entries.reduce((acc: number, item: ICashFlow) => {
        acc += this.calculatePV(item)
        return acc;
      }, 0)
    }

    dateFormatted(date: Moment): string {
      return moment(date).format('M/D/Y')
    }

    cashFlowFormatted(value: number): string {
      return numeral(value).format('0,0.00');
    }

    calculatePV(entry: ICashFlow): number {
      const dateDifference = entry.date.diff(this.analysisDate, 'days');
      return entry.cashFlow / Math.pow((1 + this.discountRate/100), dateDifference/365);
    }
    
  }
</script>