AFRAME.registerComponent('portal-label', {
  schema: {
    text: {default: ''},
    offset: {default: '0 1 0'}
  },
  init: function () {
    const label = document.createElement('a-text');
    const off = this.data.offset.split(' ').map(Number);

    label.setAttribute('value', this.data.text);
    label.setAttribute('align', 'center');
    label.setAttribute('color', '#ffffff');
    label.setAttribute('side', 'double');
    label.setAttribute('scale', '1 1 1');
    label.object3D.position.set(off[0], off[1], off[2]);

    this.el.appendChild(label);
  }
});
