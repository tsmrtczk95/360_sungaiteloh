AFRAME.registerComponent('portal-label', {
  schema: {
    text: {type: 'string', default: "Scene"},
    yOffset: {type: 'number', default: 1.4},   // higher above sphere
    backgroundColor: {type: 'string', default: '#000000'},
    backgroundOpacity: {type: 'number', default: 0.6}
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    // --- Parent wrapper ---
    const wrapper = document.createElement('a-entity');
    wrapper.setAttribute('position', `0 ${data.yOffset} 0`);
    wrapper.setAttribute('look-at', '[camera]');  // billboard effect
    el.appendChild(wrapper);

    // --- Background plane ---
    const bg = document.createElement('a-plane');
    bg.setAttribute('width', 1.6);
    bg.setAttribute('height', 0.6);
    bg.setAttribute('material', {
      color: data.backgroundColor,
      opacity: data.backgroundOpacity,
      shader: 'flat',
      side: 'double',
    });
    wrapper.appendChild(bg);

    // --- Text label ---
    const txt = document.createElement('a-text');
    txt.setAttribute('value', data.text);
    txt.setAttribute('color', '#FFFFFF');
    txt.setAttribute('align', 'center');
    txt.setAttribute('wrap-count', 20);
    txt.setAttribute('baseline', 'center');
    txt.setAttribute('shader', 'msdf');  // crisp high-contrast text
    txt.setAttribute('negate', 'false');
    txt.setAttribute('side', 'double');

    // Improve visibility
    txt.setAttribute('width', 2.5);        // scale up
    txt.setAttribute('font', 'https://cdn.aframe.io/fonts/Roboto-msdf.json');

    // A fake outline using text-shadow-like effect
    txt.setAttribute('text-shadow', '0 0 0.15 #000');

    wrapper.appendChild(txt);

    this.wrapper = wrapper;
  },

  tick: function () {
    // Keep facing the camera (in case movement enabled)
    if (this.wrapper && this.el.sceneEl.camera) {
      const cam = this.el.sceneEl.camera.el.object3D;
      this.wrapper.object3D.lookAt(cam.position);
    }
  }
});
