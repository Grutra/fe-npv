import { Moment } from 'moment';

export default interface ICashFlow {
  date: Moment,
  cashFlow: number,
}