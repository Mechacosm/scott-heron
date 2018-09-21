var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var asset = require('metalsmith-static');
var beautify = require('metalsmith-beautify');
var date = new Date();

var data = {
  title: "Scott Heron",
  description: "Made from 100% real Canadian Spaghetti!",
  year: date.getFullYear(),
  url: "http://mechacosm.github.io/",
  headerTitle: "scott heron",
  links: [{
    name: "linkedin",
    url: "https://linkedin.com/in/mechacosm",
    isExternal: true
  },{
    name: "twitter",
    url: "https://twitter.com/mechacosm",
    isExternal: true
  },{
    name: "email",
    url: "mailto:mechacosm@gmail.com"
  },{
    name: "about",
    url: "/about"
  }]
};

Metalsmith(__dirname)
  .metadata(data)
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(asset({
    "src": "public",
    "dest": ".",
    "createDest": true
  })).use(beautify())
  .build(function (err, files) {
    if (err) { throw err; }
  });

const express = require('express')
const app = express()

app.use(express.static('build'))

app.listen(9292, () => console.log('Site running on http://localhost:9292!'))
