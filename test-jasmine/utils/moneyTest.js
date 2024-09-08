import {formatcurrency} from '../../script/utils/money.js';

describe('test suite : formatcurrency',()=>{
  it('Converts cents into dollars' ,()=>{
    expect(formatcurrency(2095)).toEqual('20.95');
  });
  it('works with 0' ,()=>{
    expect(formatcurrency(0)).toEqual('0.00');
  });
  it('works with rounding up values' ,()=>{
    expect(formatcurrency(2000.5)).toEqual('20.01');
  });
});