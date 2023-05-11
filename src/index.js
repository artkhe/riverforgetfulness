//import './style.css';

const DEFAULT_CONTROL_POSITION = 'top-right';

class StyleSwitcherControl {
  constructor(options) {
    this.styles = (options | {}).styles || [
      {
        uri: 'mapbox://styles/sofiayanezpg/clb6iab1r003o14nt17eposzp',
        title: '2022',
        className: 'style-2022',
      },
      {
        uri: 'mapbox://styles/sofiayanezpg/clbgumxvh007m14rrxgnrlr10',
        title: '1990',
        className: 'style-1990',
      },
      {
        uri: 'mapbox://styles/sofiayanezpg/clbgwjcyl007u14rr9js3txt8',
        title: '1800',
        className: 'style-1800',
      },
      {
        uri: 'mapbox://styles/sofiayanezpg/clblgyy2e000414pihifg72bg',
        title: 'mechanism',
        className: 'style-mechanism',
      },
      {
        uri: 'mapbox://styles/sofiayanezpg/clblh6kjq000l14p5ipgslumu',
        title: 'pollution',
        className: 'style-pollution',
      },
      {
        uri: 'mapbox://styles/sofiayanezpg/clblhhmd5002d15ns63q9b10n',
        title: 'policy',
        className: 'style-policy',
      },
    ];
  }

  onAdd(map) {
    this._map = map;

    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapbox-ctrl-styles';

    const currentStyle = map.getStyle().sprite.replace('sprites', 'styles');
    const labelelement = document.createElement('div');
    labelelement.className = 'label';
    labelelement.style = 'font-size: 48px';
    const basemapsNode = document.createTextNode('BASEMAPS');
    labelelement.appendChild(basemapsNode);
    const stylesElement = document.createElement('div');
    stylesElement.className = 'styles';
    stylesElement.setAttribute('id', 'styles-basemaps');
    const activeStylesElement = document.createElement('div');
    activeStylesElement.className = 'styles-current';
    stylesElement.appendChild(labelelement);
    for (const style of this.styles) {
      const styleElement = document.createElement('div');
      styleElement.className = `style-button ${style.className}`;
      if (currentStyle == style.uri) {
        activeStylesElement.appendChild(styleElement);
      } else {
        stylesElement.appendChild(styleElement);
      }
      styleElement.setAttribute('title', style.title);
      styleElement.setAttribute('data-style-uri', style.uri);
    }
    this._container.appendChild(stylesElement);
    this._container.appendChild(activeStylesElement);

    this.registerDomEvents();
    return this._container;
  }

  getDefaultPosition() {
    return DEFAULT_CONTROL_POSITION;
  }

  registerDomEvents() {
    for (const buttonEl of this._container.querySelectorAll('.style-button')) {
      buttonEl.addEventListener('click', this.onClickStyleButton.bind(this));
    }
  }

  onClickStyleButton(e) {
    const styleUri = e.target.dataset.styleUri;
    this._map.setStyle(styleUri);

    const stylesElement = this._container.querySelector('div.styles');
    const activeStylesElement =
      this._container.querySelector('div.styles-current');
    for (const buttonEl of this._container.querySelectorAll('.style-button')) {
      stylesElement.appendChild(buttonEl);
    }
    activeStylesElement.appendChild(e.target);
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

//export default StyleSwitcherControl;
