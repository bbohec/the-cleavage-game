import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'
import { config } from 'dotenv'

const production = !process.env.ROLLUP_WATCH
config()
function retrieveEnvVariable (envVariableName) {
    const envVariableValue = process.env[envVariableName]
    if (envVariableValue) return envVariableValue
    throw new Error(`Missing env variable ${envVariableName}`)
}
function serve () {
    let server

    function toExit () {
        if (server) server.kill(0)
    }

    return {
        writeBundle () {
            if (server) return
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            })

            process.on('SIGTERM', toExit)
            process.on('exit', toExit)
        }
    }
}

export default {
    input: 'src/ui/svelteApp.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.PORT': process.env.PORT ? JSON.stringify(process.env.PORT) : undefined,
            'process.env.BACKEND_FQDN': JSON.stringify(retrieveEnvVariable('BACKEND_FQDN')),
            'process.env.BACKEND_SHEME': JSON.stringify(retrieveEnvVariable('BACKEND_SHEME'))
        }),
        svelte({
            preprocess: sveltePreprocess({
                sourceMap: !production,
                postcss: {
                    plugins: [require('tailwindcss')(), require('autoprefixer')()]
                }
            }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production
            }
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
            preferBuiltins: false
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
}
