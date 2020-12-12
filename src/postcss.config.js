/*
|--------------------------------------------------------------------------
| Postcss configuration
|--------------------------------------------------------------------------
| Add sass, css and js files needed to be process by postcss
|
*/

// instance of tailwind configuration module
const tailwindcss = require('tailwindcss')

module.exports = {
    plugins: [
        // help to organize and divide css into multiple files
        require('postcss-import'),
        // config css using tailwind.js file
        tailwindcss('./tailwind.js'),
        // css auto parse and prefix
        require('autoprefixer'),
    ],
}