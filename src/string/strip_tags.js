/**
 * Remove the html tags inside the script
 */
export default function stripTags(target) {
  return target.replace(/<script[^>]*>(\S\s*?)<\/script>/gim, '').replace(/<[^>]+>/g, '');
}
