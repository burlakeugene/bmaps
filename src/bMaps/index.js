import './index.scss';
import Structure from './structure';
import defaultSettings from './defaultSettings';
import {
  deepMerge,
  deepClone,
  colorChangeTone,
  generateRandomColor,
  mixColors,
} from './common';
export default class bMaps {
  constructor(props) {
    this.container = props.container;
    this.tooltipData = props.tooltipData;
    this.structure = deepClone(Structure);
    this.settings = deepMerge(
      deepClone(defaultSettings),
      deepClone(props.settings)
    );
    this.init();
    this.setData(props.data);
  }
  setData(data) {
    this.data = deepClone(data) || [];
    this.styles();
  }
  build() {
    this.container.classList.add('bmaps');
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (let prop in this.structure.props) {
      this.svg.setAttributeNS(null, prop, Structure.props[prop]);
    }
    for (let country in this.structure.countries) {
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      for (let option in this.structure.countries[country]) {
        path.setAttributeNS(
          null,
          option,
          this.structure.countries[country][option]
        );
      }
      this.structure.countries[country]['node'] = path;
      this.svg.appendChild(path);
    }
    this.container.appendChild(this.svg);

    this.tooltip = document.createElement('div');
    this.tooltip.classList.add('bmaps__tooltip');
    this.container.appendChild(this.tooltip);
  }
  getTooltipData(node) {
    if (!node) return;
    let { tooltipData } = this,
      data = this.getData(node.getAttribute('iso')),
      name = node.getAttribute('name'),
      iso = node.getAttribute('iso'),
      value = data ? data.value : 0,
      result = name + ': ' + value;
    if (tooltipData)
      result = tooltipData({
        name,
        iso,
        value,
      });
    return result;
  }
  styles() {
    let { countries } = this.structure;
    for (let country in countries) {
      let node = countries[country]['node'],
        calcTooltipStyles = (event) => {
          let left =
              event.clientX -
              this.svg.getBoundingClientRect().left -
              this.tooltip.clientWidth / 2 +
              5,
            top = event.clientY - this.svg.getBoundingClientRect().top + 15;
          if (left < 0) left = 0;
          if (left > this.svg.clientWidth - this.tooltip.clientWidth)
            left = this.svg.clientWidth - this.tooltip.clientWidth;
          if (top > this.svg.clientHeight - this.tooltip.clientHeight)
            top =
              event.clientY -
              this.svg.getBoundingClientRect().top -
              15 -
              this.tooltip.clientHeight;
          this.tooltip.style.top = top + 'px';
          this.tooltip.style.left = left + 'px';
        };
      this.setColor({
        node,
      });
      node.addEventListener('mouseenter', (event) => {
        calcTooltipStyles(event);
        this.tooltip.innerHTML = this.getTooltipData(node);
        this.setColor({
          node,
          hover: true,
        });
      });
      node.addEventListener('mousemove', (event) => {
        calcTooltipStyles(event);
      });
      node.addEventListener('mouseout', () => {
        this.tooltip.innerHTML = '';
        this.setColor({
          node,
        });
      });
    }
  }
  getData(iso) {
    let { data } = this;
    return data.find((item) => {
      return item.iso.toLowerCase() === iso.toLowerCase();
    });
  }
  setColor({ node, hover } = {}) {
    if (!node) return;
    let { settings, data } = this,
      { styles } = settings,
      iso = node.getAttribute('iso'),
      name = node.getAttribute('name'),
      max = Math.max(...data.map((item) => item.value)),
      min = Math.min(...data.map((item) => item.value)),
      isInData = this.getData(iso);
    if (!hover) {
      node.style.stroke = styles.land.stroke;
      node.style.strokeWidth = styles.land.strokeWidth;
      node.style.strokeOpacity = styles.land.strokeOpacity;
      node.style.fill = isInData ? settings.highlight : styles.land.fill;
      node.style.fillOpacity = isInData
        ? isInData.value / max
        : styles.land.fillOpacity || 1;
    } else {
      node.style.stroke = styles.land.hover.stroke;
      node.style.strokeWidth = styles.land.hover.strokeWidth;
      node.style.strokeOpacity = styles.land.hover.strokeOpacity;
      node.style.fill = styles.land.hover.fill;
      node.style.fillOpacity = styles.land.hover.fillOpacity;
    }
  }
  init() {
    this.build();
  }
}
