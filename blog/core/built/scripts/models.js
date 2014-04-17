/*global Ghost, _, Backbone, NProgress */

(function () {
    "use strict";
    NProgress.configure({ showSpinner: false });

    // Adds in a call to start a loading bar
    // This is sets up a success function which completes the loading bar
    function wrapSync(method, model, options) {
        if (options !== undefined && _.isObject(options)) {
            NProgress.start();

            /*jshint validthis:true */
            var self = this,
                oldSuccess = options.success;
            /*jshint validthis:false */

            options.success = function () {
                NProgress.done();
                return oldSuccess.apply(self, arguments);
            };
        }

        /*jshint validthis:true */
        return Backbone.sync.call(this, method, model, options);
    }

    Ghost.ProgressModel = Backbone.Model.extend({
        sync: wrapSync
    });

    Ghost.ProgressCollection = Backbone.Collection.extend({
        sync: wrapSync
    });
}());

/*global Ghost, _, Backbone */
(function () {
    'use strict';

    Ghost.Models.Post = Ghost.ProgressModel.extend({

        defaults: {
            status: 'draft'
        },

        blacklist: ['published', 'draft'],

        parse: function (resp) {
            if (resp.status) {
                resp.published = resp.status === 'published';
                resp.draft = resp.status === 'draft';
            }
            if (resp.tags) {
                return resp;
            }
            return resp;
        },

        validate: function (attrs) {
            if (_.isEmpty(attrs.title)) {
                return 'You must specify a title for the post.';
            }
        },

        addTag: function (tagToAdd) {
            var tags = this.get('tags') || [];
            tags.push(tagToAdd);
            this.set('tags', tags);
        },

        removeTag: function (tagToRemove) {
            var tags = this.get('tags') || [];
            tags = _.reject(tags, function (tag) {
                return tag.id === tagToRemove.id || tag.name === tagToRemove.name;
            });
            this.set('tags', tags);
        }
    });

    Ghost.Collections.Posts = Backbone.Collection.extend({
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        nextPage: 0,
        prevPage: 0,

        url: Ghost.paths.apiRoot + '/posts/',
        model: Ghost.Models.Post,

        parse: function (resp) {
            if (_.isArray(resp.posts)) {
                this.limit = resp.limit;
                this.currentPage = resp.page;
                this.totalPages = resp.pages;
                this.totalPosts = resp.total;
                this.nextPage = resp.next;
                this.prevPage = resp.prev;
                return resp.posts;
            }
            return resp;
        }
    });

}());

/*global Ghost */
(function () {
    'use strict';
    //id:0 is used to issue PUT requests
    Ghost.Models.Settings = Ghost.ProgressModel.extend({
        url: Ghost.paths.apiRoot + '/settings/?type=blog,theme,app',
        id: '0'
    });

}());

/*global Ghost */
(function () {
    'use strict';

    Ghost.Collections.Tags = Ghost.ProgressCollection.extend({
        url: Ghost.paths.apiRoot + '/tags/'
    });
}());

/*global Ghost, Backbone */
(function () {
    'use strict';

    Ghost.Models.Themes = Backbone.Model.extend({
        url: Ghost.paths.apiRoot + '/themes'
    });

}());

/*global Ghost, Backbone, $ */
(function () {
    'use strict';
    Ghost.Models.uploadModal = Backbone.Model.extend({

        options: {
            close: true,
            type: 'action',
            style: ["wide"],
            animation: 'fade',
            afterRender: function () {
                var filestorage = $('#' + this.options.model.id).data('filestorage');
                this.$('.js-drop-zone').upload({fileStorage: filestorage});
            },
            confirm: {
                reject: {
                    func: function () { // The function called on rejection
                        return true;
                    },
                    buttonClass: true,
                    text: "Cancel" // The reject button text
                }
            }
        },
        content: {
            template: 'uploadImage'
        },

        initialize: function (options) {
            this.options.id = options.id;
            this.options.key = options.key;
            this.options.src = options.src;
            this.options.confirm.accept = options.accept;
            this.options.acceptEncoding = options.acceptEncoding || 'image/*';
        }
    });

}());

/*global Ghost */
(function () {
    'use strict';

    Ghost.Models.User = Ghost.ProgressModel.extend({
        url: Ghost.paths.apiRoot + '/users/me/'
    });

//    Ghost.Collections.Users = Backbone.Collection.extend({
//        url: Ghost.paths.apiRoot + '/users/'
//    });

}());

/*global Ghost */
(function () {
    'use strict';

    Ghost.Models.Widget = Ghost.ProgressModel.extend({

        defaults: {
            title: '',
            name: '',
            author: '',
            applicationID: '',
            size: '',
            content: {
                template: '',
                data: {
                    number: {
                        count: 0,
                        sub: {
                            value: 0,
                            dir: '', // "up" or "down"
                            item: '',
                            period: ''
                        }
                    }
                }
            },
            settings: {
                settingsPane: false,
                enabled: false,
                options: [{
                    title: 'ERROR',
                    value: 'Widget options not set'
                }]
            }
        }
    });

    Ghost.Collections.Widgets = Ghost.ProgressCollection.extend({
        // url: Ghost.paths.apiRoot + '/widgets/', // What will this be?
        model: Ghost.Models.Widget
    });

}());
