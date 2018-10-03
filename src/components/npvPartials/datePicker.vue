<template>
  <!-- Date Picker -->
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    v-model="showPickerDialog"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    
    <v-text-field
      slot="activator"
      v-model="dateFormatted"
      label="Date"
      persistent-hint
      box
      @blur="date = unFormatDate(dateFormatted)"
    />
    <v-date-picker v-model="date" @input="showPickerDialog = false" reactive></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component({})
export default class DatePicker extends Vue {
  date: any = null;
  dateFormatted: any = "4/1/2018";
  showPickerDialog: boolean = false;

  @Watch('date')
  onDateChange(date: string) {
    const emitObj = moment(date);
    this.dateFormatted = emitObj.format("M/D/YYYY")
    this.$emit('dateChanged', emitObj);
  }

  unFormatDate(formatted: any) {
    const blurredValue = moment(this.dateFormatted, 'M/D/Y');
    if(blurredValue.isValid()) {
      return blurredValue.format('YYYY-MM-DD');
    }
    return moment().format('YYYY-MM-DD');
  }
}
</script>