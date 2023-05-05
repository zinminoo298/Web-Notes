class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    // #4
    this.RGBToHSL();
  }
  innerRGB() {
    const { r, g, b } = this;
    return `${r},${g},${b}`;
  }
  rgb() {
    return `rgb(${this.innerRGB()})`;
  }
  rgba(a = 1.0) {
    return `rgb(${this.innerRGB()}, ${a})`;
  }
  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  // #5
  hsl() {
    const { h, s, l } = this;
    return `hsl(${h},${s}%,${l}%)`;
  }
  fullSaturation() {
    // #6
    const { h, l } = this;
    return `hsl(${h},100%,${l}%)`;
  }
  // #1
  RGBToHSL() {
    // #2
    let { r, g, b } = this;
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    // #3
    this.h = h;
    this.s = s;
    this.l = l;
  }
}
