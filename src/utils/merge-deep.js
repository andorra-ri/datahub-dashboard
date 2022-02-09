export default function mergeDeep(...objects) {
  const isObject = obj => obj && typeof obj === 'object';
  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = acc[key];
      const oVal = obj[key];
      // Merge arrays instead of overriding: acc[key] = pVal.concat(...oVal);
      if (Array.isArray(pVal) && Array.isArray(oVal)) acc[key] = [...oVal];
      else if (isObject(pVal) && isObject(oVal)) acc[key] = mergeDeep(pVal, oVal);
      else acc[key] = oVal;
    });
    return acc;
  }, {});
}
