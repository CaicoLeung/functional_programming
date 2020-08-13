requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.26.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
})

require([
  'ramda',
  'jquery'
], function(_, $) {
  const trace = _.curry((tag, x) => {
    console.log(tag, x);
    return x
  })

  const Impure = {
    getJSON: _.curry((callback, url) => $.getJSON(url, callback)),
    setHtml: _.curry((sel, html) => $(sel).html(html))
  }

  const renderImg = (url) => $('<img />', { src: url })

  const mediaUrl = _.compose(_.prop('m'), _.prop('media'))
  const srcs = _.compose(_.map(mediaUrl), _.prop('items'))
  const images = _.compose(_.map(renderImg), srcs)
  const renderImages = _.compose(Impure.setHtml('body'), images)

  const url = term => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?'
  const app = _.compose(Impure.getJSON(renderImages), url)
  app('cats')
})