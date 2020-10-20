export default class Matrix {
  public readonly dim: number;
  public readonly mat: number[][];
  public readonly length: number;

  constructor(data: number[][]) {
    this.length = data.length;

    if (data.length === 0) {
      this.dim = 0;
      this.mat = data;
      return;
    }

    const expectedDim = data[0].length;

    for (let i = 1; i < data.length; i++) {
      if (data[i].length != expectedDim)
        throw new Error(`given data has mismatched dimensions at index ${i} (expecting ${expectedDim}): ${data[i]}`);
    }

    this.dim = expectedDim;
    this.mat = data;
  }

  toPlot(axes = []): { [key: string]: number }[] {
    if (axes.length == 0) {
      if (this.dim <= 26) {
        // supply reasonable defaults
        axes = 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0, this.dim);
      } else {
        throw new Error(
          "supplied empty axes to Matrix.toPlot, so tried reasonable defaults, but the reasonable defaults aren't long enough",
        );
      }
    } else if (axes.length > this.dim) {
      throw new Error(`axes too large: need <= ${this.dim}, got ${axes.length}. Input: ${axes}`);
    }

    return this.mat.map((row) => {
      const hash: { [key: string]: number } = {};

      for (let i = 0; i < axes.length; i++) hash[axes[i]] = row[i];

      return hash;
    });
  }
}
