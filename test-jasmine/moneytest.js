import {formatcurrency} from '../script/utils/money.js';
describe('test suite: formatCurrency', ()=>{
  it('converts cents into dollars',()=>{
    expect(formatcurrency(2095)).toEqual('20.95');
  });
  it('works with 0',()=>{
    expect(formatcurrency(0)).toEqual('0.00');
  });
  it('rounds up to the nearest cents',()=>{
    expect(formatcurrency(2000.5)).toEqual('20.01');
  });
  
});