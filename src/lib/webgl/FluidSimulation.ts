import * as THREE from "three";
import shaders from "./shaders";

interface DoubleTarget {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap(): void;
}
export interface FluidConfig {
  isActive?: () => boolean;
  simResolution: number;
  dyeResolution: number;
  curl: number;
  pressureIterations: number;
  velocityDissipation: number;
  dyeDissipation: number;
  splatRadius: number;
  forceStrength: number;
  pressureDecay: number;
  threshold: number;
  edgeSoftness: number;
  inkColor: THREE.Color;
}
export class FluidSimulation {
  private config: FluidConfig;
  private canvas!: HTMLCanvasElement;
  private container!: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private dpr = 1;
  private width = 1;
  private height = 1;
  private resizeObserver!: ResizeObserver;
  private velocity!: DoubleTarget;
  private dye!: DoubleTarget;
  private pressure!: DoubleTarget;
  private divergence!: THREE.WebGLRenderTarget;
  private curl!: THREE.WebGLRenderTarget;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private quad!: THREE.Mesh<THREE.PlaneGeometry, THREE.Material>;
  private simSize!: { w: number; h: number };
  private dyeSize!: { w: number; h: number };
  private material!: Record<string, THREE.ShaderMaterial>;
  private mouse = {
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    moved: false,
    initialized: false,
  };
  private frame = 0;
  private events = new AbortController();

  constructor(canvas: HTMLCanvasElement, config: FluidConfig) {
    this.config = config;
    this._setupRenderer(canvas);
    this._setupScene();
    this._setupTargets();
    this._setupMaterials();
    this._setupInput();
    this._loop();
  }

  private _setupRenderer(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.container = canvas.parentElement!;
    // The display shader outputs straight alpha; transparent pixels must not
    // contribute their white RGB values over the hero underneath.
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      premultipliedAlpha: false,
    });
    const resize = () => {
      const { width, height } = this.container.getBoundingClientRect();
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.dpr = this.renderer.getPixelRatio();
      this.renderer.setSize(Math.max(1, width), Math.max(1, height), false);
      this.width = Math.max(1, width) * this.dpr;
      this.height = Math.max(1, height) * this.dpr;
      if (this.velocity) {
        this._disposeTargets();
        this._setupTargets();
      }
      if (this.mouse) this.mouse.initialized = false;
    };
    resize();
    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(this.container);
  }

  _disposeTargets() {
    for (const target of [this.velocity, this.dye, this.pressure]) {
      target.read.dispose();
      target.write.dispose();
    }
    this.divergence.dispose();
    this.curl.dispose();
  }

  _setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.scene.add(this.quad);
  }

  _setupTargets() {
    const { simResolution: simRes, dyeResolution: dyeRes } = this.config;
    const aspect = this.width / this.height;
    const options = { type: THREE.HalfFloatType, depthBuffer: false };

    const single = (w: number, h: number) =>
      new THREE.WebGLRenderTarget(w, h, options);
    const double = (w: number, h: number): DoubleTarget => ({
      read: single(w, h),
      write: single(w, h),
      swap() {
        [this.read, this.write] = [this.write, this.read];
      },
    });

    this.simSize = { w: simRes, h: Math.round(simRes / aspect) };
    this.dyeSize = { w: dyeRes, h: Math.round(dyeRes / aspect) };

    this.velocity = double(this.simSize.w, this.simSize.h);
    this.dye = double(this.dyeSize.w, this.dyeSize.h);
    this.divergence = single(this.simSize.w, this.simSize.h);
    this.curl = single(this.simSize.w, this.simSize.h);
    this.pressure = double(this.simSize.w, this.simSize.h);
  }

  _setupMaterials() {
    const make = (
      [vert, frag]: readonly string[],
      uniforms: Record<string, THREE.IUniform>,
    ) =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms,
      });
    const tex = () => ({ value: null });
    const num = (v = 0) => ({ value: v });
    const vec2 = () => ({ value: new THREE.Vector2() });

    this.material = {
      splat: make(shaders.splat, {
        uTarget: tex(),
        aspectRatio: num(),
        radius: num(),
        color: { value: new THREE.Vector3() },
        point: { value: new THREE.Vector2() },
      }),
      advection: make(shaders.advection, {
        uVelocity: tex(),
        uSource: tex(),
        texelSize: vec2(),
        dt: num(),
        dissipation: num(),
      }),
      divergence: make(shaders.divergence, {
        uVelocity: tex(),
        texelSize: vec2(),
      }),
      curl: make(shaders.curl, { uVelocity: tex(), texelSize: vec2() }),
      vorticity: make(shaders.vorticity, {
        uVelocity: tex(),
        uCurl: tex(),
        texelSize: vec2(),
        curlStrength: num(),
        dt: num(),
      }),
      pressure: make(shaders.pressure, {
        uPressure: tex(),
        uDivergence: tex(),
        texelSize: vec2(),
      }),
      gradientSubtract: make(shaders.gradientSubtract, {
        uPressure: tex(),
        uVelocity: tex(),
        texelSize: vec2(),
      }),
      clear: make(shaders.clear, { uTexture: tex(), value: num() }),
      display: make(shaders.display, {
        uTexture: tex(),
        threshold: num(),
        edgeSoftness: num(),
        inkColor: { value: new THREE.Color() },
      }),
    };
  }

  _setupInput() {
    this.mouse = {
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      moved: false,
      initialized: false,
    };
    this.container.addEventListener(
      "pointermove",
      (event) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * this.dpr;
        const y = (event.clientY - rect.top) * this.dpr;
        if (this.mouse.initialized) {
          this.mouse.velocityX = (x - this.mouse.x) * this.config.forceStrength;
          this.mouse.velocityY = (y - this.mouse.y) * this.config.forceStrength;
          this.mouse.moved = true;
        }
        this.mouse.x = x;
        this.mouse.y = y;
        this.mouse.initialized = true;
      },
      { passive: true, signal: this.events.signal },
    );
    const reset = () => {
      this.mouse.initialized = false;
      this.mouse.moved = false;
    };
    this.container.addEventListener("pointerleave", reset, {
      signal: this.events.signal,
    });
    this.container.addEventListener("pointercancel", reset, {
      signal: this.events.signal,
    });
  }

  private _pass(
    material: THREE.ShaderMaterial,
    target: THREE.WebGLRenderTarget | null,
  ) {
    this.quad.material = material;
    this.renderer.setRenderTarget(target ?? null);
    this.renderer.render(this.scene, this.camera);
  }

  private _set(
    material: THREE.ShaderMaterial,
    values: Record<string, unknown>,
  ) {
    Object.entries(values).forEach(
      ([key, val]) => (material.uniforms[key].value = val),
    );
    return material;
  }

  private _splat(x: number, y: number, velocityX: number, velocityY: number) {
    const { material: m, velocity: vel, dye, width, height, config: c } = this;
    this._set(m.splat, {
      aspectRatio: width / height,
      point: new THREE.Vector2(x / width, 1 - y / height),
      radius: c.splatRadius / 100,
    });

    this._set(m.splat, {
      uTarget: vel.read.texture,
      color: new THREE.Vector3(velocityX, -velocityY, 0),
    });
    this._pass(m.splat, vel.write);
    vel.swap();

    this._set(m.splat, {
      uTarget: dye.read.texture,
      color: new THREE.Vector3(3, 3, 3),
    });
    this._pass(m.splat, dye.write);
    dye.swap();
  }

  private _simulate(dt: number) {
    const {
      material: m,
      velocity: vel,
      dye,
      divergence: div,
      curl,
      pressure: pres,
      simSize,
      dyeSize,
      config: c,
    } = this;
    const simTexel = new THREE.Vector2(1 / simSize.w, 1 / simSize.h);

    this._pass(
      this._set(m.curl, { uVelocity: vel.read.texture, texelSize: simTexel }),
      curl,
    );
    this._pass(
      this._set(m.vorticity, {
        uVelocity: vel.read.texture,
        uCurl: curl.texture,
        texelSize: simTexel,
        curlStrength: c.curl,
        dt,
      }),
      vel.write,
    );
    vel.swap();
    this._pass(
      this._set(m.divergence, {
        uVelocity: vel.read.texture,
        texelSize: simTexel,
      }),
      div,
    );
    this._pass(
      this._set(m.clear, {
        uTexture: pres.read.texture,
        value: c.pressureDecay,
      }),
      pres.write,
    );
    pres.swap();

    this._set(m.pressure, { uDivergence: div.texture, texelSize: simTexel });
    for (let i = 0; i < c.pressureIterations; i++) {
      m.pressure.uniforms.uPressure.value = pres.read.texture;
      this._pass(m.pressure, pres.write);
      pres.swap();
    }

    this._pass(
      this._set(m.gradientSubtract, {
        uPressure: pres.read.texture,
        uVelocity: vel.read.texture,
        texelSize: simTexel,
      }),
      vel.write,
    );
    vel.swap();

    this._set(m.advection, {
      uVelocity: vel.read.texture,
      uSource: vel.read.texture,
      texelSize: simTexel,
      dt,
      dissipation: c.velocityDissipation,
    });
    this._pass(m.advection, vel.write);
    vel.swap();

    this._set(m.advection, {
      uSource: dye.read.texture,
      texelSize: new THREE.Vector2(1 / dyeSize.w, 1 / dyeSize.h),
      dissipation: c.dyeDissipation,
    });
    this._pass(m.advection, dye.write);
    dye.swap();
  }

  _render() {
    this._pass(
      this._set(this.material.display, {
        uTexture: this.dye.read.texture,
        threshold: this.config.threshold,
        edgeSoftness: this.config.edgeSoftness,
        inkColor: this.config.inkColor,
      }),
      null,
    );
  }

  _loop() {
    let lastTime = Date.now();
    let idleFrames = 0;
    const tick = () => {
      const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
      lastTime = Date.now();
      const rect = this.canvas.getBoundingClientRect();
      if (
        document.hidden ||
        (this.config.isActive && !this.config.isActive()) ||
        rect.bottom <= 0 ||
        rect.top >= innerHeight
      ) {
        this.mouse.initialized = false;
        this.mouse.moved = false;
        this.frame = requestAnimationFrame(tick);
        return;
      }
      if (this.mouse.moved) {
        idleFrames = 0;
        this._splat(
          this.mouse.x,
          this.mouse.y,
          this.mouse.velocityX,
          this.mouse.velocityY,
        );
        this.mouse.moved = false;
      }
      if (++idleFrames > 120) {
        this.frame = requestAnimationFrame(tick);
        return;
      }
      this._simulate(dt);
      this._render();
      this.frame = requestAnimationFrame(tick);
    };
    tick();
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    this.events.abort();
    this.resizeObserver.disconnect();
    this._disposeTargets();
    Object.values(this.material).forEach((material) => material.dispose());
    this.quad.geometry.dispose();
    this.renderer.dispose();
  }
}
