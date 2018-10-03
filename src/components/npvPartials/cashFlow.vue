<template>
  <v-textarea
    box
    label="Cash Flows"
    v-model="cashFlow"
    :rules="cashFlowRules"
  />
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import moment from 'moment';
import numeral from 'numeral';
import zeroState from '../../mocks/zeroState';

// Types
import ICashFlow from '../../types/ICashFlow';

@Component({})
export default class cashFlow extends Vue {
  cashFlow: string = "";
  cashFlows: ICashFlow[] = [];
  cashFlowRules: any = [
    this.validate
  ];

  validate(entries: string) {
    let flag: any = "Cash Flow(s) required.";
    try {
      this.parseCsv(entries).forEach((entry: string[], index: number) => {
        if(entry.length !== 2) {
          flag = `Error on line ${index+1}, incorrect format, should be “[Date] tab character [Amount]”.`;
          throw Error;
        }
        if(!moment(entry[0]).isValid()) {
          flag = `Error on line ${index+1}, incorrect date format format for value ${entry[0]}.`;
          throw Error;
        }
        if(!this.isNumber(numeral(entry[1]).value())) {
          flag = `Error on line ${index+1}, incorrect money format format for value ${entry[1]}.`;
          throw Error;
        }
      })
      flag = true;
    } catch (error) {
      //
    } finally {
      return flag;
    }
  }

  parseCsv(value: string) {
    if(value) {
      const lines = value.split('\n');

      if(lines.length) {
        const parsedLines = lines.map(line => line.split('\t'))
        return parsedLines;
      }
    }
    return [];
  }

  isNumber(value: any) {
    return !isNaN(value - parseFloat(value));
  }

  @Watch('cashFlow', {immediate: true})
  cashFlowChange() {
    const parsedValue = this.parseCsv(this.cashFlow);
    const emitObj: ICashFlow[] = parsedValue.reduce((acc: any[], item: any) => {
      const entry: ICashFlow = {
        date: moment(item[0], 'M/D/Y'),
        cashFlow: numeral(item[1]).value(),
      }
      acc.push(entry);
      return acc;
    }, [] as ICashFlow[])

    this.$emit('cashFlowChanged', emitObj)
  }

  mounted() {
    this.cashFlow = zeroState.initialValue
  }
}
</script>