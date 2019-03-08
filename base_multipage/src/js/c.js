import _ from 'lodash-es';
import './common/common';
import '../scss/c.scss';

export default (() => {
  console.log('C')
  let arr = ['a', 'b', 'c', 'd'];
  console.log(_.chunk(arr, 2));
})()