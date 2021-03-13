import bMaps from '../package';
import './styles.scss';

window.addEventListener('load', () => {
  let map = document.querySelector('.map');
  new bMaps(map, {});
});
