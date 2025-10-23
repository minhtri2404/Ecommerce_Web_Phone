import { h } from 'vue'

export const dashboardicon = {
  render() {
    return h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24' }, [
      h('path', {
        stroke: 'currentColor',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z',
      }),
    ])
  },
}

export const category = {
  render() {
    return h('svg', {
      class: 'w-6 h-6',
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
    }, [
      h('path', {
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M3 6h5l2 3h11v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z'
      })
    ])
  }
}

export const production = {
  render() {
    return h('svg', {
      class: 'w-6 h-6',
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
    }, [
      h('path', {
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linejoin': 'round',
        d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z'
      }),
      h('path', {
        stroke: 'currentColor',
        'stroke-width': '2',
        d: 'M3.3 7.57 12 12.01l8.7-4.44M12 22.08V12'
      })
    ])
  }
}

export const user = {
  render() {
    return h('svg', {
      class: 'w-6 h-6',
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
    }, [
      h('path', {
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
      })
    ])
  }
}

export const order = {
  render() {
    return h('svg', {
      class: 'w-6 h-6',
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
    }, [
      h('path', {
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M9 7h6M9 11h6M9 15h3M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6Z'
      })
    ])
  }
}





