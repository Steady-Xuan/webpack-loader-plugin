const { ConcatSource,RawSource } = require("webpack-sources");

class testPlugin{
    constructor(options){
        this.options = options;
    }
    apply(compiler){
        //compilation 这个钩子代表，compilation构建完成
        compiler.hooks.compilation.tap('testPlugin',(compilation)=>{
            // processAssets钩子是Webpack在生成最终的资源文件时触发的钩子，它允许开发者在资源文件生成之前或之后执行一些自定义的操作。
            // 这个钩子可以用于处理生成的资源文件，例如对CSS文件进行压缩、对图片进行优化、对JS文件进行混淆等。
            compilation.hooks.processAssets.tap('testPlugin',(stas)=>{
                //这里就是通过compilation.chunks里面的文件来修改文件
                for (const chunk of compilation.chunks) {
                    for (const file of chunk.files) {
                        //updateAsset，官方文档写的就是用新资源更新就资源,并且返回新资源
                        compilation.updateAsset(file,old=>{
                            //old这里的old就是budle.js打包过后的所有资源，在后面拼接一个test注释
                            const comment = `/* ${this.options.banner}  */`
                            //通过ConcatSource来更新资源，并且转换成源代码形式
                            return new ConcatSource(old, "\n", comment)
                        })
                    }
                }
            })
        })
    }

}



module.exports  = testPlugin