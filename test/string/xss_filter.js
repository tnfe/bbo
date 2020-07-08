import bbo from '../bbo';

describe('xssFilter', function() {
  test('should pass base example 1', function() {
    const uncode = '<div>x-html<img src="/bbo/image.png" onerror="onError()"></div>';
    const filterCode =
      '&lt;div&gt;x-html&lt;img src=&quot;/bbo/image.png&quot; onerror=&quot;onError()&quot;&gt;&lt;/div&gt;';
    expect(bbo.xssFilter(uncode)).toStrictEqual(filterCode);
  });
});
