import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export const PolynomialKatex = props => {
    if (props.coef == undefined) { return null; }

    switch(props.coef.length) {
    case 0:
        return <></>;
    case 1:
        // The API returns super small values sometimes (floating pt arithmetic) and so the
        // parent component may set props.coef to null to make it prettier (which is checked; if null skip the term).
        // But this is wrong in deg == 0; so we have to init it with 0 via props.coef || 0
        return (
            <BlockMath>
              {"f(x)=" + (props.coef[0] || 0).toFixed(props.decimalPlaces)}
            </BlockMath>
        );
    default:
        let terms = "";
        let isLeadTerm = true;

        const xToThe = (i) => {
            switch(i) {
            case 0:
                return "";
            case 1:
                return 'x';
            default:
                return `x^{${i}}`;
            }
        };

        const toStr = (coef) => {
            const rounded = coef.toFixed(props.decimalPlaces);
            if (Math.abs(Math.floor(rounded) - rounded) <= Math.pow(10, -props.decimalPlaces)) {
                const toInt = parseInt(rounded);
                return toInt === 1 ? "" : toInt;
            } else {
                return rounded;
            }
        };

        for (let i = props.coef.length - 1; i >= 0; i--) {
            const term = props.coef[i];
            if (term == undefined)
                continue;

            if (isLeadTerm) {
                terms += toStr(term) + xToThe(i);
                isLeadTerm = false;
            } else {
                const joinWithPlus = term > 0 ? "+" : "";
                terms += joinWithPlus + toStr(term) + xToThe(i);
            }
        }

        return <BlockMath>{"f(x)=" + terms}</BlockMath>;
    };
};

PolynomialKatex.defaultProps = {
    decimalPlaces: 3,
};
