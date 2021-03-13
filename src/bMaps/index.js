import './index.scss';
import Structure from './structure';
export default class bMaps {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.init();
  }
  init() {
    this.container.classList.add('bmaps');
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (let prop in Structure.props) {
      console.log(prop);
      this.svg.setAttributeNS(null, prop, Structure.props[prop]);
    }
    for (let country in Structure.countries) {
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      for (let option in Structure.countries[country]) {
        path.setAttributeNS(null, option, Structure.countries[country][option]);
      }
      this.svg.appendChild(path);
    }
    this.container.appendChild(this.svg);
  }
}
