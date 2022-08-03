import BN from 'bn.js';
import { DEFAULT_PRECISION } from '../constants';

export function numberToBN(number: number): BN {
  const text = number.toFixed(DEFAULT_PRECISION);
  const [integer, fractional] = text.split('.');

  if (fractional.length > DEFAULT_PRECISION) {
    return new BN(`${integer}${fractional.slice(0, DEFAULT_PRECISION)}`);
  }

  return new BN(`${integer}${fractional}${'0'.repeat(Math.max(0, DEFAULT_PRECISION - fractional.length))}`, 10);
}

export function bnToNumber(bn: BN): number {
  const text = bn.toString(10);
  let decimalNumber = '';

  if (text.length <= DEFAULT_PRECISION) {
    decimalNumber = `0.${'0'.repeat(DEFAULT_PRECISION - text.length)}${text}`;
  } else {
    const integer = text.slice(0, text.length - DEFAULT_PRECISION);
    const fractional = text.slice(text.length - DEFAULT_PRECISION);

    decimalNumber = `${integer}.${fractional}`;
  }

  return parseFloat(decimalNumber);
}

export function formatBN(bn: BN, precision?: number, truncateTrailingZeros?: boolean): string {
  let result = precision === undefined ? bnToNumber(bn).toString() : bnToNumber(bn).toFixed(precision);
  return result.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1');
}
