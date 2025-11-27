AFRAME.registerComponent('portal-label', {
  schema: {
    text: { type: 'string', default: 'Scene' },
    size: { type: 'number', default: 0.4 },
    offsetY: { type: 'number', default: 1.0 }  // vertical offset above sphere
  },

  init: function () {
    const el = this.el;

    // Create wrapper entity
    const wrapper = document.createElement('a-entity');

    // --- BILLBOARD BEHAVIOR ---
    // wrapper.setAttribute('look-at', '[camera]'); // FAILED

    // --- BACKGROUND PANEL ---
    const bg = document.createElement('a-plane');
    bg.setAttribute('color', '#000');
    bg.setAttribute('opacity', '0.45');  // slightly transparent
    bg.setAttribute('height', this.data.size * 0.5);
    bg.setAttribute('width', this.data.size * 2.8);
    bg.setAttribute('position', '0 0 0.001');  // avoid z-fighting
    bg.setAttribute('material', 'shader: flat');

    // --- TEXT LABEL ---
    const text = document.createElement('a-text');
    text.setAttribute('value', this.data.text);
    text.setAttribute('align', 'center');
    text.setAttribute('color', '#FFFFFF');         // white text
    text.setAttribute('width', this.data.size * 4);
    text.setAttribute('baseline', 'center');
    text.setAttribute('shader', 'msdf');           // sharper
    text.setAttribute('font', 'https://cdn.aframe.io/fonts/Roboto-msdf.json');
    text.setAttribute('style', 'filter: drop-shadow(0px 0px 6px black);');  // Add text outline using drop-shadow filter

    wrapper.appendChild(bg);
    wrapper.appendChild(text);
    // Attach wrapper to parent
    el.appendChild(wrapper);

    // Compute rotation once so label faces center
    const sphereWorldPos = new THREE.Vector3();
    el.object3D.getWorldPosition(sphereWorldPos);

    const labelPos = sphereWorldPos.clone();
    labelPos.y += this.data.offsetY;  // move above sphere

    wrapper.object3D.position.copy(labelPos);
    // Always face user at fixed position (0, 1.6, 0)
    wrapper.object3D.lookAt(new THREE.Vector3(0, 1.6, 0));
  }/*,
  tick: function () {
    // Always face user at fixed position (0, 1.6, 0)
    if (this.wrapper) {
      this.wrapper.object3D.lookAt(new THREE.Vector3(0, 1.6, 0));
    }
  }*/
});
