import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss' 
import resolve from '@rollup/plugin-node-resolve'
import clear from "rollup-plugin-clear";
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import css from 'rollup-plugin-css-only' // 提取css，压缩能力不行
import { terser } from 'rollup-plugin-terser'
import _ from 'lodash';
import pkg from './package.json'
const externals = [
  'lodash',
  'react'
]
const pathResolve = p => path.resolve(__dirname, p)
let name = _.last(_.split(pkg.name,'/'))
function getUpperName(name) {
  let nameList = _.split(name,'-')
  nameList = _.map(nameList,(item,index)=>{
    return _.upperCase(_.get(item,'0')) + item.slice(1)
  })
  return _.join(nameList,'')
}
export default {
  input: 'src/components/index.js',
  output: [
    { file: pkg.main, format: 'es', name ,  sourcemap: true },
    { file: pkg.module, format: 'cjs', name ,sourcemap: true },
    { file: pkg.browser, format: 'umd', name ,sourcemap: true },
    { file: pkg.iife, format: 'iife', name: getUpperName(name),sourcemap: true  },
  ],
  external: id => externals.some(e => id.indexOf(e) === 0),   // 不打包
  plugins: [
    clear({
      targets: ["dist"]
    }),
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: 'inline',
    }),
    css({
      output: `dist/${name}.min.css`,
    }),
    external({
      includeDependencies: true,
    }),
    url(),
    svgr(),
    resolve({
      mainFields: ['module', 'main', 'browser'],
      extensions: ['.vue', '.js', '.jsx', '.json'],
    }),
    babel({

      presets: [
        'react-app',
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        'transform-react-remove-prop-types',
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
  ],
}
