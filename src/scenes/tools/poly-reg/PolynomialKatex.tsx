import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export interface PolynomialKatexProps {
  coef: number[];
  decimalPlaces: number;
}

export function PolynomialKatex({ coef = [], decimalPlaces = 3 }: PolynomialKatexProps) {
  switch (coef.length) {
    case 0:
      return <></>;
    case 1:
      return <BlockMath>{'f(x)=' + coef[0].toFixed(decimalPlaces)}</BlockMath>;
    default:
      let terms = '';
      let isLeadTerm = true;
      const epsilon = Math.pow(10, -decimalPlaces);

      const xToThe = (i: number) => {
        switch (i) {
          case 0:
            return '';
          case 1:
            return 'x';
          default:
            return `x^{${i}}`;
        }
      };

      const toStr = (coef: number): string => {
        const rounded = coef.toFixed(decimalPlaces);
        const roundedNum = Number(rounded);

        if (Math.abs(Math.floor(roundedNum) - roundedNum) < epsilon) {
          // parseInt cuts off the decimal point
          const toInt = parseInt(rounded);
          return toInt === 1 ? '' : toInt.toString();
        }

        return rounded;
      };

      for (let i = coef.length - 1; i >= 0; i--) {
        const term = coef[i];
        if (term === 0) continue;

        if (isLeadTerm) {
          terms += toStr(term) + xToThe(i);
          isLeadTerm = false;
        } else {
          const joinWithPlus = term > 0 ? '+' : '';
          terms += joinWithPlus + toStr(term) + xToThe(i);
        }
      }

      return <BlockMath>{'f(x)=' + terms}</BlockMath>;
  }
}

PolynomialKatex.defaultProps = {
  decimalPlaces: 3,
};
