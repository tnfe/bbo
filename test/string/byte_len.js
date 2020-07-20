/**
 * 所占字节数
 *
 * UTF-8 一种可变长度的Unicode编码格式，使用一至四个字节为每个字符编码（Unicode在范围 D800-DFFF 中不存在任何字符）
 * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
 * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
 * 000800 - 00D7FF
 * 00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
 * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
 * {@link https://zh.wikipedia.org/wiki/UTF-8}
 *
 * UTF-16 编码65535以内使用两个字节编码，超出65535的使用四个字节（JS内部，字符储存格式是：UCS-2——UTF-16的子级）
 * 000000 - 00FFFF  两个字节
 * 010000 - 10FFFF  四个字节
 * {@link https://zh.wikipedia.org/wiki/UTF-16}
 *
 * GBK(ASCII的中文扩展) 除了0~126编号是1个字节之外，其他都2个字节（超过65535会由2个字显示）
 * {@link https://zh.wikipedia.org/wiki/汉字内码扩展规范}
 *
 * @param  {String} str
 * @param  {String} [charset= 'gbk'] utf-8, utf-16
 * @return {Number}
 */

import bbo from '../bbo';

describe('byteLen', function() {
  it('in bytes by Unicode utf-8 utf8', function() {
    expect(bbo.byteLen('a')).toBe(1);
    expect(bbo.byteLen('a', 'utf8')).toBe(1);
    expect(bbo.byteLen('a', 'utf-8')).toBe(1);
  });

  it('in bytes by Unicode utf-16 utf16', function() {
    expect(bbo.byteLen('a', 'utf-16')).toBe(2);
    expect(bbo.byteLen('a', 'utf16')).toBe(2);
  });

  it('in others', function() {
    expect(bbo.byteLen(0xfff1, 'utf-16')).toBe(0);
    expect(bbo.byteLen('𠮷𠮷', 'utf-16')).toBe(8);

    expect(bbo.byteLen('💩')).toBe(4);
    expect(bbo.byteLen('©')).toBe(1);

    expect(bbo.byteLen('💩', 'utf-8')).toBe(4);
    expect(bbo.byteLen('©', 'utf-8')).toBe(2);
    expect(bbo.byteLen('我', 'utf-8')).toBe(3);
    expect(bbo.byteLen('𠮷𠮷', 'utf-8')).toBe(8);
  });
});
