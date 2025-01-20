/**
 * Product card
 * @module ProductCard
 * @description Handles product card functionality
 */

/**
 * Selectors
 */
const selectors = {
  swatch: '[js-product-card="swatch"]',
  primaryImage: '[js-product-card="primary-image"]',
  secondaryImage: '[js-product-card="secondary-image"]',
  container: '[js-product-card="container"]',
  url: '[js-product-card="url"]',
}

/**
 * Node selectors
 */
const nodeSelectors = {
  swatches: document.querySelectorAll(selectors.swatch),
  productCards: document.querySelectorAll(selectors.container),
};

/**
 * Swatch classes
 */
const swatchClasses = {
  active: 'is-active',
  outline: 'outline',
  outlineWidth: 'outline-1',
  outlineOffset: 'outline-offset-1',
  outlineColor: 'outline-blue-900',
}

export default {

  /**
   * Initialize product card
   */
  init() {
    this.setEventlisteners()
    this.setDefaultSwatch()
  },

  /**
   * Set default swatch
   */
  setDefaultSwatch() {
    const productCards = nodeSelectors.productCards

    productCards.forEach(productCard => {
      const swatches = productCard.querySelectorAll(selectors.swatch)
      const defaultSwatch = swatches[0]
      this.updateImages(productCard, defaultSwatch)
      this.setUrl(productCard, defaultSwatch)
    })
  },

  /**
   * Set event listeners
   */
  setEventlisteners() {
    const swatches = nodeSelectors.swatches

    swatches.forEach(swatch => {
      swatch.addEventListener('click', this.handleSwatchClick.bind(this))
    })
  },

  /**
   * Handle swatch click
   * @param {Event} event
   * @returns {void}
   */
  handleSwatchClick(event) {
    event.preventDefault()
    const swatch = event.currentTarget
    const container = swatch.closest(selectors.container)
    this.updateImages(container, swatch)
    this.setActiveState(container, swatch)
    this.setUrl(container, swatch)
  },

  /**
   * Update images
   * @param {Element} container
   * @param {Element} swatch
   * @returns {void}
   */
  updateImages(container, swatch) {
    const color = swatch.dataset.color
    const primaryImage = swatch.dataset.primaryImage
    const secondaryImage = swatch.dataset.secondaryImage
    container.querySelector(selectors.primaryImage).src = primaryImage
    container.querySelector(selectors.primaryImage).alt = color
    container.querySelector(selectors.secondaryImage).src = secondaryImage
    container.querySelector(selectors.secondaryImage).alt = `secondary ${color}`
  },

  /**
   * Set active state
   * @param {Element} container
   * @param {Element} swatch
   * @returns {void}
   */
  setActiveState(container, swatch) {
    const activeSwatch = container.querySelector(`${selectors.swatch}.${swatchClasses.active}`)
    if (activeSwatch) {
      Object.values(swatchClasses).forEach(className => {
        activeSwatch.classList.remove(className)
      })
    }

    Object.values(swatchClasses).forEach(className => {
      swatch.classList.add(className)
    })
  },

  /**
   * Set URL
   * @param {Element} container
   * @param {Element} swatch
   * @returns {void}
   */
  setUrl(container, swatch) {
    const urls = container.querySelectorAll(selectors.url)

    urls.forEach(url => {
      const productUrl = url.href.split('?')[0]
      url.href = `${productUrl}?variant=${swatch.dataset.variantId}`
    })
  },
}
