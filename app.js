(function() {

  return {
    defaultState: 'loading',
    requests: {
      getComic: function(id) {
        var url = 'http://xkcd.com/';
        if (id) url += id + '/';
        url += 'info.0.json';
        return {
          url: url,
          proxy_v2: true,
          dataType: 'json'
        };
      }
    },
    events: {
      'app.activated': 'showComic',
      'click button[data-role="reload-comic"]': function() {
        this.switchTo('loading');
        this.showComic();
      }
    },
    showComic: function() {
      var zen = this;
      zen.ajax('getComic').done(function(data) {
        var max = data.num;
        var num = Math.ceil(Math.random() * max);
        zen.ajax('getComic', num).done(function(data) {
          zen.switchTo('comic', {comic: data});
        });
      });
    }
  };

}());
