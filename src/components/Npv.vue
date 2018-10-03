<template>
  <div class="npv">
    
    <v-card class="pa-4">
      <v-alert
        transition="scale-transition"
        :value="message"
        type="success"
      >
        Since this is a reactive implementation, 'Calculate NPV' does absolutely nothing.
      </v-alert>
      <v-layout wrap class="pt-2">
      
        <v-flex row wrap xs12 md5>
          <v-flex row wrap xs12 md5>
            <date-picker class="pb-4" @dateChanged="analysisDate = $event"/>
            <discount-rate class="pb-4" @discountChanged="discountRate = $event"></discount-rate>
          </v-flex>
          <v-flex row wrap xs12 md10>
            <cash-flow class="pb-2" @cashFlowChanged="tableEntries = $event"></cash-flow>
          </v-flex>
        </v-flex>

        <v-flex row wrap xs12 offset-md1 md6>
            <data-table :entries="tableEntries" :analysisDate="analysisDate" :discountRate="discountRate" />
        </v-flex>

      </v-layout>
      <v-btn
        @click="sendMessage"
      >
        Calculate NPV
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Moment } from 'moment';
import moment from 'moment';

// Components
import DatePicker from './npvPartials/datePicker.vue';
import DiscountRate from './npvPartials/discountRate.vue';
import CashFlow from './npvPartials/cashFlow.vue';
import DataTable from './npvPartials/dataTable.vue';

// Types
import ICashFlow from '../types/ICashFlow';


@Component({
  components: {
    DatePicker,
    DiscountRate,
    CashFlow,
    DataTable,
  }
})
export default class Npv extends Vue {
  message: boolean = false;
  analysisDate: any = moment('04/01/2018', 'MM/DD/YYYY');
  discountRate: number = 4;
  tableEntries: ICashFlow[] = [];

  sendMessage() {
    const self = this;
    self.message = true;
    setTimeout(function() {
      self.message = false
    }, 10000);
  }
}
</script>

<style scoped>

</style>
