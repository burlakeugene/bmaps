import bMaps from '../package';
import './styles.scss';

window.addEventListener('load', () => {
  let map = document.querySelector('.map');
  let bmaps = new bMaps({
    container: map,
    data: [{
      iso: 'RU',
      value: 9
    }, {
      iso: 'US',
      value: 20
    }, {
      iso: 'CA',
      value: 3
    }]
  });
});
