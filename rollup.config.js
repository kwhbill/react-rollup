import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss' 
import resolve from '@rollup/plugin-node-resolve'
import clear from "rollup-plugin-clear";
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import { terser } from 'rollup-plugin-terser'

import _ from 'lodash';
import pkg from './package.json'
const externals = [
  'lodash',
  'React'
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
      extensions: ['.less', '.css'],
      use: [
        ['less', {
          javascriptEnabled: true
        }]
      ],
      plugins: [],
      minimize: true,
      sourceMap: 'inline',
      extract: `dist/${name}.min.css`,
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
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
  ],
}
