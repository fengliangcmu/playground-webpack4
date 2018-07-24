
const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); commented for production mode
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //entry: './src/index.js',    //this is for single page
    entry: {
        //build into diff files
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
    },
    output: {
        //filename: 'bundle.js',
        //filename: 'bundle.[contenthash].js',  //to prevent bs cache. works for css file as well. single page case
        filename: '[name].[contenthash].js', 
        path: path.resolve(__dirname, './dist'),
        publicPath: '' 
        //we can change to 'http://cdn1.com' to switch server for static sources

        //if we work with expressjs like: app.use('static', express.static(path.resolve(__dirname, '../dist')));
        //then we need change publicPath to '/static/'
    },
    mode: 'production',
    //process.env.NODE_ENV is set to production
    //and plugins like uglify is automactically enabled, so can be deleted from this config.

    optimization: {
        splitChunks: {
            // minSize: 10000,
            // automaticNameDelimiter: '_',
            chunks: "all"
        }
    },

    module:{
        rules:[
            {
                test: /\.(xml)$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    //'style-loader', 'css-loader'   //this will put all css into one bundle which mighe be too big
                    MiniCssExtractPlugin.loader, 'css-loader' 
                    //need both to work with css
                    //for handling SASS 'style-loader', 'css-loader', 'sass-loader' 
                    //and it works from right to left
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-class-properties']
                        //npm i babel-loader babel-core babel-plugin-transform-class-properties --save-dev
                    }
                    // options: {
                    //     plugins: ['transform-class-properties'],
                    //     presets: ['env'] //already in the specification
                    // }

                    // options: {
                    //     presets: ['stage-0'] //all newest features including those not even in the specification
                    //      //npm install bebel-preset-stage-0 --save-dev
                    // }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    //Plugins do what loaders can not do. 
    //Plugins can also modify how the bundles themselves are created. 
    //For instance, uglifyJSPlugin minimizes the contents to decrease file size.
    plugins: [
        //new UglifyJSPlugin(), commented for production mode.
        new MiniCssExtractPlugin({
            //filename: 'style.css'
            //filename: 'style.[contenthash].css'  //prevent content hash, single page case
            filename: '[name].[contenthash].css' 
        }),
        new CleanWebpackPlugin('dist'), //specify the folder
        //new CleanWebpackPlugin(['dist','src/trash'])  //works for multiple folders

        //new HtmlWebpackPlugin()
        // this generate html pages as well when using contenthash for js and css
        // so we don't have to change those file names each time in html pages after build
        // we can use template to create html pages
        // new HtmlWebpackPlugin({
        //     title: 'title of handlebars template',
        //     template: 'src/page-template.hbs'
        // })

        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            chunks: ['hello-world', 'vendors~hello-world~kiwi'], //as names in entry point config
            title: 'helloworld',
            template: 'src/page-template.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            chunks: ['kiwi', 'vendors~hello-world~kiwi'], // vendor**** here coz we have defined optimization option.
            title: 'kiwi',
            template: 'src/page-template.hbs'
        })
    ]
}

