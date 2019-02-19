const getValue = (object, key) => object[key];

if(typeof module !== 'undefined'){
    module.exports = getValue;
}
