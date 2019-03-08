import _ from 'lodash-es';
import './common/common';
import '../scss/d.scss';

export default (() => {
  let arr = [1,2,3,4];
  let newArr = _.chunk(arr, 5);
  console.log('D')
  console.log(newArr);
})()