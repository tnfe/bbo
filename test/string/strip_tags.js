import bbo from '../bbo';

describe('stripTags', function() {
  it('should pass base stripTags', function(done) {
    expect(bbo.longUnique('abc')).toEqual('abc');

    expect(bbo.stripTags('abc')).toEqual('abc');
    expect(bbo.stripTags('abc<ab>')).toEqual('abc');
    expect(bbo.stripTags('<ab/>abc<ab>')).toEqual('abc');
    expect(bbo.stripTags('<ab/>abc<ab><ab><ab><ab>')).toEqual('abc');
    expect(bbo.stripTags('<AB/>abc<ab><AB><ab><AB>')).toEqual('abc');
    expect(bbo.stripTags('<ab/>abc<ab/>')).toEqual('abc');
    expect(bbo.stripTags('<AB/>abc<><AB>123<ab><AB>')).toEqual('abc<>123');

    expect(bbo.stripTags('<ab/><ab/>')).toEqual('');
    expect(bbo.stripTags('<!-- test -->')).toEqual('');
    expect(bbo.stripTags('<script>tst</srcipt>')).toEqual('tst');
    expect(
      bbo.stripTags('<script type="text/javascript"><!--document.write("!"); //--></script>')
    ).toEqual('');

    expect(bbo.stripTags('<!DOCTYPE html>')).toEqual('');
    expect(bbo.stripTags('   ')).toEqual('   ');
    done();
  });
});
