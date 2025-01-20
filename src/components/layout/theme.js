import './theme.scss';
import Alpine from 'alpinejs';
import ProductCard from '../../../src/scripts/product-card.js'

window.Alpine = Alpine;
Alpine.start();

const ES6TestFunction = () => `Alpine Version ${window.Alpine.version} loaded!`;
console.log(ES6TestFunction());
ProductCard.init();
