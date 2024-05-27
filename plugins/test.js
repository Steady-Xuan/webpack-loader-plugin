// RawSource 是其中一种 “源码”("sources") 类型，
// 用来在 compilation 中表示资源的源码
const { RawSource } = require('webpack-sources');
// 一个 JavaScript 类
class MyExampleWebpackPlugin {
    // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
    //compiler 是整个webpack对象
    //compilation 是针对整个项目文件的，文件有变动，那么他就会被重新创建
    apply(compiler) {
        // 指定一个挂载到 webpack 自身的事件钩子。
        // 表示在compilation创建之后执行
        compiler.hooks.compilation.tap(
            'MyExampleWebpackPlugin',
            (compilation) => {
                console.log('这是一个示例插件！');
                //compilation在这里可以拿到打包过后的文件，chunks等等
                // console.log(
                //   '这里表示了资源的单次构建的 `compilation` 对象：',
                //   compilation.assets,
                //   compilation.modules,
                //   compilation.options,
                // );
                // // 用 webpack 提供的插件 API 处理构建过程
                // compilation.addModule(/* ... */);
                compilation.hooks.processAssets.tap('MyExampleWebpackPlugin', (stas) => {
                    //assets: { [pathname: string]: Source } — 普通对象，其中 key 是 asset 的路径名，
                    // value 是 asset 的数据，具体的代表请参考 Source
                    // {
                    //     'bundle.js': ConcatSource {
                    //       _children: [ '/*! steady-x */', '\n', [CachedSource] ],
                    //       _isOptimized: false
                    //     }
                    // }
                    const source = new RawSource('这个是生成模版的内容')
                    //emitAsset创建一个新的资源
                    //processAssets对已有资源进行更新
                    compilation.emitAsset('1.md', source)
                    // console.log(stas,'这个是什么');
                    // console.log(compilation.chunks,'==>');
                })
            }
        );
    }
}

module.exports = MyExampleWebpackPlugin