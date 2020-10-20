import apiCall from 'services/core';
import Matrix from './matrix';
import config from 'config';

const polyreg = async (matrix: Matrix, maxDeg: number) => {
  const data = { x: [], y: [], maxDeg: maxDeg };
  for (let i = 0; i < matrix.length; i++) {
    data.x.push(matrix.mat[i][0]);
    data.y.push(matrix.mat[i][1]);
  }

    const resp = await apiCall(config.polynomialRegression, data)

  /*
   *
  if (resp.data?.coef) {

  }

  apiCall(
    fetch(endpoint, req),
    (r: Polynomial) => {
      const epsilon = Math.pow(10, -5); // 5 decimal places rounding

      // Round away super small numbers
      for (let i = 0; i < r.coef.length; i++) {
        if (Math.abs(r.coef[i]) < epsilon) r.coef[i] = 0;
      }

      successCallback(r.coef);
    },
    (e: AppError) => {
      if (/near-singular/.test(e.message)) {
        e.message =
          'The data you provided is close to being a singular matrix. Make sure there are no duplicate x values, or add more data.';
      }

      errCallback(new AppError(e.code, e.message));
    },
  );
   */
}

export default polyreg
