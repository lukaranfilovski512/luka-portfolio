"use client"

import { useEffect, useRef, useState } from "react"

/**
 * The Creative Core — a real-time 3D scene written directly in WebGL
 * (hand-rolled perspective + rotation matrices; no library needed).
 *
 * Scene: a slowly rotating icosahedron wireframe (depth-faded), two
 * orbital shells of particles animated in the vertex shader, and a
 * breathing red energy core. The whole system eases toward the cursor
 * and accelerates subtly with scroll.
 *
 * Performance: DPR capped, particle count halved on touch devices,
 * paused off-screen / hidden tab, single static frame for
 * prefers-reduced-motion.
 */

/* ── minimal mat4 helpers ─────────────────────────────────────── */

function perspective(fovY: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovY / 2)
  const nf = 1 / (near - far)
  // column-major
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ])
}

function rotationXY(rx: number, ry: number, z: number) {
  const cx = Math.cos(rx), sx = Math.sin(rx)
  const cy = Math.cos(ry), sy = Math.sin(ry)
  // R = Rx * Ry, then translate(0,0,z); column-major
  return new Float32Array([
    cy, sx * sy, -cx * sy, 0,
    0, cx, sx, 0,
    sy, -sx * cy, cx * cy, 0,
    0, 0, z, 1,
  ])
}

/* ── geometry: icosahedron ────────────────────────────────────── */

function icosahedron() {
  const t = (1 + Math.sqrt(5)) / 2
  const v: [number, number, number][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ]
  const len = Math.hypot(1, t)
  const verts = v.map(([x, y, z]) => [x / len, y / len, z / len] as const)
  const edges: [number, number][] = [
    [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
    [1, 5], [1, 7], [1, 8], [1, 9],
    [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
    [3, 4], [3, 6], [3, 8], [3, 9],
    [4, 5], [4, 9], [4, 11],
    [5, 9], [5, 11],
    [6, 7], [6, 8], [6, 10],
    [7, 8], [7, 10],
    [8, 9], [10, 11],
  ]
  const out: number[] = []
  for (const [a, b] of edges) out.push(...verts[a], ...verts[b])
  return new Float32Array(out)
}

/* ── shaders ──────────────────────────────────────────────────── */

const LINE_VERT = `
attribute vec3 a_pos;
uniform mat4 u_proj;
uniform mat4 u_model;
uniform float u_scale;
varying float v_depth;
void main() {
  vec4 p = u_model * vec4(a_pos * u_scale, 1.0);
  v_depth = p.z;
  gl_Position = u_proj * p;
}
`

const LINE_FRAG = `
precision mediump float;
uniform vec3 u_color;
uniform float u_alpha;
varying float v_depth;
void main() {
  float fade = smoothstep(-5.2, -1.6, v_depth);
  gl_FragColor = vec4(u_color, u_alpha * mix(0.12, 1.0, fade));
}
`

const PARTICLE_VERT = `
attribute vec4 a_seed; /* radius, theta0, phi0, speed */
attribute float a_kind; /* 0 = white dust, 1 = red ember */
uniform mat4 u_proj;
uniform mat4 u_model;
uniform float u_time;
uniform float u_dpr;
varying float v_depth;
varying float v_kind;
varying float v_tw;
void main() {
  float r = a_seed.x;
  float theta = a_seed.y + u_time * a_seed.w;
  float phi = a_seed.z + sin(u_time * 0.35 + a_seed.y * 3.0) * 0.16;
  vec3 pos = vec3(
    r * sin(phi) * cos(theta),
    r * cos(phi),
    r * sin(phi) * sin(theta)
  );
  vec4 p = u_model * vec4(pos, 1.0);
  v_depth = p.z;
  v_kind = a_kind;
  v_tw = 0.6 + 0.4 * sin(u_time * 2.0 + a_seed.y * 17.0);
  gl_Position = u_proj * p;
  float size = mix(1.4, 2.6, a_kind) * u_dpr;
  gl_PointSize = size * smoothstep(-6.0, -1.2, p.z) + 0.6;
}
`

const PARTICLE_FRAG = `
precision mediump float;
varying float v_depth;
varying float v_kind;
varying float v_tw;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.05, d);
  float fade = smoothstep(-5.4, -1.6, v_depth);
  vec3 white = vec3(0.92, 0.92, 0.95);
  vec3 red = vec3(0.86, 0.22, 0.23);
  vec3 col = mix(white, red, v_kind);
  gl_FragColor = vec4(col, soft * fade * v_tw * mix(0.5, 0.95, v_kind));
}
`

const CORE_VERT = `
attribute vec2 a_quad;
uniform float u_aspect;
varying vec2 v_uv;
void main() {
  v_uv = a_quad;
  vec2 p = a_quad * vec2(0.34 / u_aspect, 0.34);
  gl_Position = vec4(p, 0.0, 1.0);
}
`

const CORE_FRAG = `
precision mediump float;
uniform float u_time;
varying vec2 v_uv;
void main() {
  float d = length(v_uv);
  float pulse = 0.85 + 0.15 * sin(u_time * 1.4);
  float glow = exp(-d * d * 7.0) * pulse;
  float ring = exp(-pow((d - 0.52) * 9.0, 2.0)) * 0.5;
  vec3 col = vec3(0.75, 0.145, 0.157) * (glow + ring);
  gl_FragColor = vec4(col, (glow + ring) * 0.85);
}
`

/* ── component ────────────────────────────────────────────────── */

export function ThreeCore({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    })
    if (!gl) {
      setFailed(true)
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches
    const PARTICLES = fine ? 700 : 280

    const make = (vsSrc: string, fsSrc: string) => {
      const compile = (type: number, src: string) => {
        const sh = gl.createShader(type)!
        gl.shaderSource(sh, src)
        gl.compileShader(sh)
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(sh))
          return null
        }
        return sh
      }
      const vs = compile(gl.VERTEX_SHADER, vsSrc)
      const fs = compile(gl.FRAGMENT_SHADER, fsSrc)
      if (!vs || !fs) return null
      const prog = gl.createProgram()!
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
      return prog
    }

    const lineProg = make(LINE_VERT, LINE_FRAG)
    const particleProg = make(PARTICLE_VERT, PARTICLE_FRAG)
    const coreProg = make(CORE_VERT, CORE_FRAG)
    if (!lineProg || !particleProg || !coreProg) {
      setFailed(true)
      return
    }

    /* buffers */
    const icoData = icosahedron()
    const icoBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, icoBuf)
    gl.bufferData(gl.ARRAY_BUFFER, icoData, gl.STATIC_DRAW)
    const icoCount = icoData.length / 3

    const seeds = new Float32Array(PARTICLES * 4)
    const kinds = new Float32Array(PARTICLES)
    for (let i = 0; i < PARTICLES; i++) {
      const shell = Math.random() < 0.6 ? 1.5 : 2.3
      seeds[i * 4 + 0] = shell + (Math.random() - 0.5) * 0.5
      seeds[i * 4 + 1] = Math.random() * Math.PI * 2
      seeds[i * 4 + 2] = Math.acos(2 * Math.random() - 1)
      seeds[i * 4 + 3] = (0.06 + Math.random() * 0.16) * (Math.random() < 0.5 ? 1 : -1)
      kinds[i] = Math.random() < 0.22 ? 1 : 0
    }
    const seedBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
    const kindBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, kindBuf)
    gl.bufferData(gl.ARRAY_BUFFER, kinds, gl.STATIC_DRAW)

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const quadBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)

    /* uniform/attrib locations */
    const loc = {
      line: {
        pos: gl.getAttribLocation(lineProg, "a_pos"),
        proj: gl.getUniformLocation(lineProg, "u_proj"),
        model: gl.getUniformLocation(lineProg, "u_model"),
        scale: gl.getUniformLocation(lineProg, "u_scale"),
        color: gl.getUniformLocation(lineProg, "u_color"),
        alpha: gl.getUniformLocation(lineProg, "u_alpha"),
      },
      pt: {
        seed: gl.getAttribLocation(particleProg, "a_seed"),
        kind: gl.getAttribLocation(particleProg, "a_kind"),
        proj: gl.getUniformLocation(particleProg, "u_proj"),
        model: gl.getUniformLocation(particleProg, "u_model"),
        time: gl.getUniformLocation(particleProg, "u_time"),
        dpr: gl.getUniformLocation(particleProg, "u_dpr"),
      },
      core: {
        quad: gl.getAttribLocation(coreProg, "a_quad"),
        time: gl.getUniformLocation(coreProg, "u_time"),
        aspect: gl.getUniformLocation(coreProg, "u_aspect"),
      },
    }

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE) // additive glow
    gl.clearColor(0, 0, 0, 0)

    let raf = 0
    let running = false
    let inView = true
    let dpr = 1
    const start = performance.now()
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let scrollBoost = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const draw = (now: number) => {
      resize()
      const t = (now - start) / 1000
      mouse.x += (mouse.tx - mouse.x) * 0.045
      mouse.y += (mouse.ty - mouse.y) * 0.045

      const aspect = canvas.width / canvas.height
      const proj = perspective(0.9, aspect, 0.1, 20)
      const speed = 1 + scrollBoost * 1.6
      const rx = 0.42 + mouse.y * 0.34 + t * 0.05 * speed
      const ry = t * 0.16 * speed + mouse.x * 0.5
      const model = rotationXY(rx, ry, -3.4)

      gl.clear(gl.COLOR_BUFFER_BIT)

      /* core glow (screen-space quad, drawn first = behind) */
      gl.useProgram(coreProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
      gl.enableVertexAttribArray(loc.core.quad)
      gl.vertexAttribPointer(loc.core.quad, 2, gl.FLOAT, false, 0, 0)
      gl.uniform1f(loc.core.time, reduced ? 0 : t)
      gl.uniform1f(loc.core.aspect, aspect)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      gl.disableVertexAttribArray(loc.core.quad)

      /* wireframe — outer + inner counter-rotating shell */
      gl.useProgram(lineProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, icoBuf)
      gl.enableVertexAttribArray(loc.line.pos)
      gl.vertexAttribPointer(loc.line.pos, 3, gl.FLOAT, false, 0, 0)
      gl.uniformMatrix4fv(loc.line.proj, false, proj)
      gl.uniformMatrix4fv(loc.line.model, false, model)
      gl.uniform1f(loc.line.scale, 1.18)
      gl.uniform3f(loc.line.color, 0.92, 0.92, 0.95)
      gl.uniform1f(loc.line.alpha, 0.34)
      gl.drawArrays(gl.LINES, 0, icoCount)

      const inner = rotationXY(-rx * 1.3, -ry * 1.15, -3.4)
      gl.uniformMatrix4fv(loc.line.model, false, inner)
      gl.uniform1f(loc.line.scale, 0.62)
      gl.uniform3f(loc.line.color, 0.86, 0.22, 0.23)
      gl.uniform1f(loc.line.alpha, 0.5)
      gl.drawArrays(gl.LINES, 0, icoCount)
      gl.disableVertexAttribArray(loc.line.pos)

      /* particles */
      gl.useProgram(particleProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf)
      gl.enableVertexAttribArray(loc.pt.seed)
      gl.vertexAttribPointer(loc.pt.seed, 4, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, kindBuf)
      gl.enableVertexAttribArray(loc.pt.kind)
      gl.vertexAttribPointer(loc.pt.kind, 1, gl.FLOAT, false, 0, 0)
      gl.uniformMatrix4fv(loc.pt.proj, false, proj)
      gl.uniformMatrix4fv(loc.pt.model, false, model)
      gl.uniform1f(loc.pt.time, reduced ? 0 : t)
      gl.uniform1f(loc.pt.dpr, dpr)
      gl.drawArrays(gl.POINTS, 0, PARTICLES)
      gl.disableVertexAttribArray(loc.pt.seed)
      gl.disableVertexAttribArray(loc.pt.kind)
    }

    const loop = (now: number) => {
      draw(now)
      raf = window.requestAnimationFrame(loop)
    }
    const play = () => {
      if (!running && inView && !document.hidden && !reduced) {
        running = true
        raf = window.requestAnimationFrame(loop)
      }
    }
    const pause = () => {
      running = false
      window.cancelAnimationFrame(raf)
    }

    draw(performance.now()) // always paint at least one frame
    play()

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (fine && !reduced) window.addEventListener("pointermove", onMove, { passive: true })

    const onScroll = () => {
      const h = Math.max(1, window.innerHeight)
      scrollBoost = Math.min(1, window.scrollY / h)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) play()
        else pause()
      },
      { rootMargin: "80px" },
    )
    io.observe(canvas)
    const onVis = () => (document.hidden ? pause() : play())
    document.addEventListener("visibilitychange", onVis)

    return () => {
      pause()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("scroll", onScroll)
      if (fine && !reduced) window.removeEventListener("pointermove", onMove)
      gl.deleteBuffer(icoBuf)
      gl.deleteBuffer(seedBuf)
      gl.deleteBuffer(kindBuf)
      gl.deleteBuffer(quadBuf)
      gl.deleteProgram(lineProg)
      gl.deleteProgram(particleProg)
      gl.deleteProgram(coreProg)
    }
  }, [])

  if (failed) {
    // Graceful fallback: a static red aura keeps the composition alive.
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,37,40,0.16),transparent_55%)]"
      />
    )
  }

  return <canvas ref={canvasRef} aria-hidden className={className ?? "h-full w-full"} />
}
