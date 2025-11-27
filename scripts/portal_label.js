AFRAME.registerComponent('portal-label', {
  schema: {
    text: { type: 'string', default: 'Scene' },
    size: { type: 'number', default: 0.4 },
    heightOffset: { type: 'number', default: 1 } // height above sphere
  },

  init: function () {
    const el = this.el;

    // Create wrapper
    const wrapper = document.createElement('a-entity');

    // Set position above the sphere
    wrapper.setAttribute('position', `0 ${this.data.heightOffset} 0`);

    // --- BACKGROUND PANEL ---
    const bg = document.createElement('a-plane');
    bg.setAttribute('color', '#000');
    bg.setAttribute('opacity', '0.45');
    bg.setAttribute('height', this.data.size * 0.5);
    bg.setAttribute('width', this.data.size * 2.8);
    bg.setAttribute('position', '0 0 0.001'); // avoid z-fighting
    bg.setAttribute('material', 'shader: flat');

    // --- TEXT LABEL ---
    const text = document.createElement('a-text');
    text.setAttribute('value', this.data.text);
    text.setAttribute('align', 'center');
    text.setAttribute('color', '#FFFFFF');
    text.setAttribute('width', this.data.size * 4);
    text.setAttribute('baseline', 'center');
    text.setAttribute('shader', 'msdf'); 
    text.setAttribute('font', 'https://cdn.aframe.io/fonts/Roboto-msdf.json');
    text.setAttribute('style', 'filter: drop-shadow(0px 0px 6px black);');

    wrapper.appendChild(bg);
    wrapper.appendChild(text);

    // --- BILLBOARD: face center of scene ---
    const lookAtCenter = () => {
      // Assuming the user is at world origin (0, y, 0)
      const sphereWorldPos = new THREE.Vector3();
      el.object3D.getWorldPosition(sphereWorldPos);

      // Camera target at center
      const target = new THREE.Vector3(0, sphereWorldPos.y, 0);

      wrapper.object3D.lookAt(target);
    };

    this.el.sceneEl.addEventListener('renderstart', () => {
      lookAtCenter();
    });

    this.el.sceneEl.addEventListener('componentchanged', () => {
      lookAtCenter();
    });

    // Also update each frame in case user tilts head (optional)
    this.el.sceneEl.addEventListener('frame', () => {
      lookAtCenter();
    });

    el.appendChild(wrapper);
  }
});
