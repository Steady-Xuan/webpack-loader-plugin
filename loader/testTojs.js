const regexp = /(?<=((<[a-zA-Z-]+?){0,1}>))([\s\S]+)(?=([\s]{0,1}<\/[a-zA-Z-]+(>{0,1})))/g

module.exports=function(source) {
    // console.log(source,'source');
    const str1 = source.match(regexp)
    // console.log(str1,'str1');
    return str1[0]
}

