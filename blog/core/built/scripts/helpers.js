/*globals window, $, _, Backbone, validator */
(function () {
    'use strict';

    function ghostPaths() {
        var path = window.location.pathname,
            subdir = path.substr(0, path.search('/ghost/'));

        return {
            subdir: subdir,
            apiRoot: subdir + '/ghost/api/v0.1'
        };
    }

    var Ghost = {
        Layout      : {},
        Views       : {},
        Collections : {},
        Models      : {},

        paths: ghostPaths(),

        // This is a helper object to denote legacy things in the
        // middle of being transitioned.
        temporary: {},

        currentView: null,
        router: null
    };

    _.extend(Ghost, Backbone.Events);

    Backbone.oldsync = Backbone.sync;
    // override original sync method to make header request contain csrf token
    Backbone.sync = function (method, model, options, error) {
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-param']").attr('content'));
        };
        /* call the old sync method */
        return Backbone.oldsync(method, model, options, error);
    };

    Backbone.oldModelProtoUrl = Backbone.Model.prototype.url;
    //overwrite original url method to add slash to end of the url if needed.
    Backbone.Model.prototype.url = function () {
        var url = Backbone.oldModelProtoUrl.apply(this, arguments);
        return url + (url.charAt(url.length - 1) === '/' ? '' : '/');
    };

    Ghost.init = function () {
        Ghost.router = new Ghost.Router();

        // This is needed so Backbone recognizes elements already rendered server side
        // as valid views, and events are bound
        Ghost.notifications = new Ghost.Views.NotificationCollection({model: []});

        Backbone.history.start({
            pushState: true,
            hashChange: false,
            root: Ghost.paths.subdir + '/ghost'
        });
    };

    validator.handleErrors = function (errors) {
        Ghost.notifications.clearEverything();
        _.each(errors, function (errorObj) {

            Ghost.notifications.addItem({
                type: 'error',
                message: errorObj.message || errorObj,
                status: 'passive'
            });

            if (errorObj.hasOwnProperty('el')) {
                errorObj.el.addClass('input-error');
            }
        });
    };

    window.Ghost = Ghost;

    window.addEventListener("load", Ghost.init, false);
}());

// # Ghost Mobile Interactions

/*global window, document, $, FastClick */

(function () {
    'use strict';

    FastClick.attach(document.body);

    // ### general wrapper to handle conditional screen size actions
    function responsiveAction(event, mediaCondition, cb) {
        if (!window.matchMedia(mediaCondition).matches) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        cb();
    }

    // ### Show content preview when swiping left on content list
    $('.manage').on('click', '.content-list ol li', function (event) {
        responsiveAction(event, '(max-width: 800px)', function () {
            $('.content-list').animate({right: '100%', left: '-100%', 'margin-right': '15px'}, 300);
            $('.content-preview').animate({right: '0', left: '0', 'margin-left': '0'}, 300);
        });
    });

    // ### Hide content preview
    $('.manage').on('click', '.content-preview .button-back', function (event) {
        responsiveAction(event, '(max-width: 800px)', function () {
            $('.content-list').animate({right: '0', left: '0', 'margin-right': '0'}, 300);
            $('.content-preview').animate({right: '-100%', left: '100%', 'margin-left': '15px'}, 300);
        });
    });

    // ### Show settings options page when swiping left on settings menu link
    $('.settings').on('click', '.settings-menu li', function (event) {
        responsiveAction(event, '(max-width: 800px)', function () {
            $('.settings-sidebar').animate({right: '100%', left: '-102%', 'margin-right': '15px'}, 300);
            $('.settings-content').animate({right: '0', left: '0', 'margin-left': '0'}, 300);
            $('.settings-content .button-back, .settings-content .button-save').css('display', 'inline-block');
        });
    });

    // ### Hide settings options page
    $('.settings').on('click', '.settings-content .button-back', function (event) {
        responsiveAction(event, '(max-width: 800px)', function () {
            $('.settings-sidebar').animate({right: '0', left: '0', 'margin-right': '0'}, 300);
            $('.settings-content').animate({right: '-100%', left: '100%', 'margin-left': '15'}, 300);
            $('.settings-content .button-back, .settings-content .button-save').css('display', 'none');
        });
    });

    // ### Toggle the sidebar menu
    $('[data-off-canvas]').on('click', function (event) {
        responsiveAction(event, '(max-width: 650px)', function () {
            $('body').toggleClass('off-canvas');
        });
    });

}());

// # Toggle Support

/*global document, $, Ghost */
(function () {
    'use strict';

    Ghost.temporary.hideToggles = function () {
        $('[data-toggle]').each(function () {
            var toggle = $(this).data('toggle');
            $(this).parent().children(toggle + ':visible').fadeOut(150);
        });

        // Toggle active classes on menu headers
        $('[data-toggle].active').removeClass('active');
    };

    Ghost.temporary.initToggles = function ($el) {

        $el.find('[data-toggle]').each(function () {
            var toggle = $(this).data('toggle');
            $(this).parent().children(toggle).hide();
        });

        $el.find('[data-toggle]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this),
                toggle = $this.data('toggle'),
                isAlreadyActive = $this.is('.active');

            // Close all the other open toggle menus
            Ghost.temporary.hideToggles();

            if (!isAlreadyActive) {
                $this.toggleClass('active');
                $(this).parent().children(toggle).toggleClass('open').fadeToggle(150);
            }
        });

    };


    $(document).ready(function () {

        // ## Toggle Up In Your Grill
        // Allows for toggling via data-attributes.
        // ### Usage
        //       <nav>
        //         <a href="#" data-toggle=".toggle-me">Toggle</a>
        //         <ul class="toggle-me">
        //            <li>Toggled yo</li>
        //         </ul>
        //       </nav>
        Ghost.temporary.initToggles($(document));
    });

}());

// # Surrounds given text with Markdown syntax

/*global $, CodeMirror, Showdown, moment */
(function () {
    'use strict';
    var Markdown = {
        init : function (options, elem) {
            var self = this;
            self.elem = elem;

            self.style = (typeof options === 'string') ? options : options.style;

            self.options = $.extend({}, CodeMirror.prototype.addMarkdown.options, options);

            self.replace();
        },
        replace: function () {
            var text = this.elem.getSelection(), pass = true, cursor = this.elem.getCursor(), line = this.elem.getLine(cursor.line), md, word, letterCount, converter;
            switch (this.style) {
            case 'h1':
                this.elem.setLine(cursor.line, '# ' + line);
                this.elem.setCursor(cursor.line, cursor.ch + 2);
                pass = false;
                break;
            case 'h2':
                this.elem.setLine(cursor.line, '## ' + line);
                this.elem.setCursor(cursor.line, cursor.ch + 3);
                pass = false;
                break;
            case 'h3':
                this.elem.setLine(cursor.line, '### ' + line);
                this.elem.setCursor(cursor.line, cursor.ch + 4);
                pass = false;
                break;
            case 'h4':
                this.elem.setLine(cursor.line, '#### ' + line);
                this.elem.setCursor(cursor.line, cursor.ch + 5);
                pass = false;
                break;
            case 'h5':
                this.elem.setLine(cursor.line, '##### ' + line);
                this.elem.setCursor(cursor.line, cursor.ch + 6);
                pass = false;
                break;
            case 'h6':
                this.elem.setLine(cursor.line, '###### ' + line);
                this.elem.setCursor(cursor.line, cursor.ch + 7);
                pass = false;
                break;
            case 'link':
                md = this.options.syntax.link.replace('$1', text);
                this.elem.replaceSelection(md, 'end');
                this.elem.setSelection({line: cursor.line, ch: cursor.ch - 8}, {line: cursor.line, ch: cursor.ch - 1});
                pass = false;
                break;
            case 'image':
                md = this.options.syntax.image.replace('$1', text);
                if (line !== '') {
                    md = "\n\n" + md;
                }
                this.elem.replaceSelection(md, "end");
                cursor = this.elem.getCursor();
                this.elem.setSelection({line: cursor.line, ch: cursor.ch - 8}, {line: cursor.line, ch: cursor.ch - 1});
                pass = false;
                break;
            case 'uppercase':
                md = text.toLocaleUpperCase();
                break;
            case 'lowercase':
                md = text.toLocaleLowerCase();
                break;
            case 'titlecase':
                md = text.toTitleCase();
                break;
            case 'selectword':
                word = this.elem.getTokenAt(cursor);
                if (!/\w$/g.test(word.string)) {
                    this.elem.setSelection({line: cursor.line, ch: word.start}, {line: cursor.line, ch: word.end - 1});
                } else {
                    this.elem.setSelection({line: cursor.line, ch: word.start}, {line: cursor.line, ch: word.end});
                }
                break;
            case 'copyHTML':
                converter = new Showdown.converter();
                if (text) {
                    md = converter.makeHtml(text);
                } else {
                    md = converter.makeHtml(this.elem.getValue());
                }

                $(".modal-copyToHTML-content").text(md).selectText();
                pass = false;
                break;
            case 'list':
                md = text.replace(/^(\s*)(\w\W*)/gm, '$1* $2');
                this.elem.replaceSelection(md, 'end');
                pass = false;
                break;
            case 'currentDate':
                md = moment(new Date()).format('D MMMM YYYY');
                this.elem.replaceSelection(md, 'end');
                pass = false;
                break;
            case 'newLine':
                if (line !== "") {
                    this.elem.setLine(cursor.line, line + "\n\n");
                }
                pass = false;
                break;
            default:
                if (this.options.syntax[this.style]) {
                    md = this.options.syntax[this.style].replace('$1', text);
                }
            }
            if (pass && md) {
                this.elem.replaceSelection(md, 'end');
                if (!text) {
                    letterCount = md.length;
                    this.elem.setCursor({line: cursor.line, ch: cursor.ch - (letterCount / 2)});
                }
            }
        }
    };

    CodeMirror.prototype.addMarkdown = function (options) {
        var markdown = Object.create(Markdown);
        markdown.init(options, this);
    };

    CodeMirror.prototype.addMarkdown.options = {
        style: null,
        syntax: {
            bold: '**$1**',
            italic: '*$1*',
            strike: '~~$1~~',
            code: '`$1`',
            link: '[$1](http://)',
            image: '![$1](http://)',
            blockquote: '> $1'
        }
    };

}());

/*globals Handlebars, moment, Ghost */
(function () {
    'use strict';
    Handlebars.registerHelper('date', function (context, options) {
        if (!options && context.hasOwnProperty('hash')) {
            options = context;
            context = undefined;

            // set to published_at by default, if it's available
            // otherwise, this will print the current date
            if (this.published_at) {
                context = this.published_at;
            }
        }

        // ensure that context is undefined, not null, as that can cause errors
        context = context === null ? undefined : context;

        var f = options.hash.format || 'MMM Do, YYYY',
            timeago = options.hash.timeago,
            date;


        if (timeago) {
            date = moment(context).fromNow();
        } else {
            date = moment(context).format(f);
        }
        return date;
    });

    Handlebars.registerHelper('admin_url', function () {
        return Ghost.paths.subdir + '/ghost';
    });

    Handlebars.registerHelper('asset', function (context, options) {
        var output = '',
            isAdmin = options && options.hash && options.hash.ghost;

        output += Ghost.paths.subdir + '/';

        if (!context.match(/^shared/)) {
            if (isAdmin) {
                output += 'ghost/';
            } else {
                output += 'assets/';
            }
        }

        output += context;
        return new Handlebars.SafeString(output);
    });
}());

// # Ghost Editor
//
// Ghost Editor contains a set of modules which make up the editor component
// It manages the left and right panes, and all of the communication between them
// Including scrolling,

/*global document, $, _, Ghost */
(function () {
    'use strict';

    var Editor = function () {
        var self = this,
            $document = $(document),
        // Create all the needed editor components, passing them what they need to function
            markdown = new Ghost.Editor.MarkdownEditor(),
            uploadMgr = new Ghost.Editor.UploadManager(markdown),
            preview = new Ghost.Editor.HTMLPreview(markdown, uploadMgr),
            scrollHandler = new Ghost.Editor.ScrollHandler(markdown, preview),
            unloadDirtyMessage,
            handleChange,
            handleDrag;

        unloadDirtyMessage = function () {
            return '==============================\n\n' +
                'Hey there! It looks like you\'re in the middle of writing' +
                ' something and you haven\'t saved all of your content.' +
                '\n\nSave before you go!\n\n' +
                '==============================';
        };

        handleChange = function () {
            self.setDirty(true);
            preview.update();
        };

        handleDrag = function (e) {
            e.preventDefault();
        };

        // Public API
        _.extend(this, {
            enable: function () {
                // Listen for changes
                $document.on('markdownEditorChange', handleChange);

                // enable editing and scrolling
                markdown.enable();
                scrollHandler.enable();
            },

            disable: function () {
                // Don't listen for changes
                $document.off('markdownEditorChange', handleChange);

                // disable editing and scrolling
                markdown.disable();
                scrollHandler.disable();
            },

            // Get the markdown value from the editor for saving
            // Upload manager makes sure the upload markers are removed beforehand
            value: function () {
                return uploadMgr.value();
            },

            setDirty: function (dirty) {
                window.onbeforeunload = dirty ? unloadDirtyMessage : null;
            }
        });

         // Initialise
        $document.on('drop dragover', handleDrag);
        preview.update();
        this.enable();
    };

    Ghost.Editor = Ghost.Editor || {};
    Ghost.Editor.Main = Editor;
}());
// # Ghost Editor Marker Manager
//
// MarkerManager looks after the array of markers which are attached to image markdown in the editor.
//
// Marker Manager is told by the Upload Manager to add a marker to a line.
// A marker takes the form of a 'magic id' which looks like:
// {<1>}
// It is appended to the start of the given line, and then defined as a CodeMirror 'TextMarker' widget which is
// subsequently added to an array of markers to keep track of all markers in the editor.
// The TextMarker is also set to 'collapsed' mode which means it does not show up in the display.
// Currently, the markers can be seen if you copy and paste your content out of Ghost into a text editor.
// The markers are stripped on save so should not appear in the DB


/*global _, Ghost */

(function () {
    'use strict';

    var imageMarkdownRegex = /^(?:\{<(.*?)>\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim,
        markerRegex = /\{<([\w\W]*?)>\}/,
        MarkerManager;

    MarkerManager = function (editor) {
        var markers = {},
            uploadPrefix = 'image_upload',
            uploadId = 1,
            addMarker,
            removeMarker,
            markerRegexForId,
            stripMarkerFromLine,
            findAndStripMarker,
            checkMarkers,
            initMarkers;

        // the regex
        markerRegexForId = function (id) {
            id = id.replace('image_upload_', '');
            return new RegExp('\\{<' + id + '>\\}', 'gmi');
        };

        // Add a marker to the given line
        // Params:
        // line - CodeMirror LineHandle
        // ln - line number
        addMarker = function (line, ln) {
            var marker,
                magicId = '{<' + uploadId + '>}',
                newText = magicId + line.text;

            editor.replaceRange(
                newText,
                {line: ln, ch: 0},
                {line: ln, ch: newText.length}
            );

            marker = editor.markText(
                {line: ln, ch: 0},
                {line: ln, ch: (magicId.length)},
                {collapsed: true}
            );

            markers[uploadPrefix + '_' + uploadId] = marker;
            uploadId += 1;
        };

        // Remove a marker
        // Will be passed a LineHandle if we already know which line the marker is on
        removeMarker = function (id, marker, line) {
            delete markers[id];
            marker.clear();

            if (line) {
                stripMarkerFromLine(line);
            } else {
                findAndStripMarker(id);
            }
        };

        // Removes the marker on the given line if there is one
        stripMarkerFromLine = function (line) {
            var markerText = line.text.match(markerRegex),
                ln = editor.getLineNumber(line);

            if (markerText) {
                editor.replaceRange(
                    '',
                    {line: ln, ch: markerText.index},
                    {line: ln, ch: markerText.index + markerText[0].length}
                );
            }
        };

        // Find a marker in the editor by id & remove it
        // Goes line by line to find the marker by it's text if we've lost track of the TextMarker
        findAndStripMarker = function (id) {
            editor.eachLine(function (line) {
                var markerText = markerRegexForId(id).exec(line.text),
                    ln;

                if (markerText) {
                    ln = editor.getLineNumber(line);
                    editor.replaceRange(
                        '',
                        {line: ln, ch: markerText.index},
                        {line: ln, ch: markerText.index + markerText[0].length}
                    );
                }
            });
        };

        // Check each marker to see if it is still present in the editor and if it still corresponds to image markdown
        // If it is no longer a valid image, remove it
        checkMarkers = function () {
            _.each(markers, function (marker, id) {
                var line;
                marker = markers[id];
                if (marker.find()) {
                    line = editor.getLineHandle(marker.find().from.line);
                    if (!line.text.match(imageMarkdownRegex)) {
                        removeMarker(id, marker, line);
                    }
                } else {
                    removeMarker(id, marker);
                }
            });
        };

        // Add markers to the line if it needs one
        initMarkers = function (line) {
            var isImage = line.text.match(imageMarkdownRegex),
                hasMarker = line.text.match(markerRegex);

            if (isImage && !hasMarker) {
                addMarker(line, editor.getLineNumber(line));
            }
        };

        // Initialise
        editor.eachLine(initMarkers);

        // Public API
        _.extend(this, {
            markers: markers,
            checkMarkers: checkMarkers,
            addMarker: addMarker,
            stripMarkerFromLine: stripMarkerFromLine,
            getMarkerRegexForId: markerRegexForId
        });
    };

    Ghost.Editor = Ghost.Editor || {};
    Ghost.Editor.MarkerManager = MarkerManager;
}());
// # Ghost Editor Upload Manager
//
// UploadManager ensures that markdown gets updated when images get uploaded via the Preview.
//
// The Ghost Editor has a particularly tricky problem to solve, in that it is possible to upload an image by
// interacting with the preview. The process of uploading an image is handled by uploader.js, but there is still
// a lot of work needed to ensure that uploaded files end up in the right place - that is that the image
// path gets added to the correct piece of markdown in the editor.
//
// To solve this, Ghost adds a unique 'marker' to each piece of markdown which represents an image:
// More detail about how the markers work can be find in markerManager.js
//
// UploadManager handles changes in the editor, looking for text which matches image markdown, and telling the marker
// manager to add a marker. It also checks changed lines to see if they have a marker but are no longer an image.
//
// UploadManager's most important job is handling uploads such that when a successful upload completes, the correct
// piece of image markdown is updated with the path.
// This is done in part by ghostImagePreview.js, which takes the marker from the markdown and uses it to create an ID
// on the dropzone. When an upload completes successfully from uploader.js, the event thrown contains reference to the
// dropzone, from which uploadManager can pull the ID & then get the right marker from the Marker Manager.
//
// Without a doubt, the separation of concerns between the uploadManager, and the markerManager could be vastly
// improved


/*global $, _, Ghost */
(function () {
    'use strict';

    var imageMarkdownRegex = /^(?:\{<(.*?)>\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim,
        markerRegex = /\{<([\w\W]*?)>\}/,
        UploadManager;

    UploadManager = function (markdown) {
        var editor = markdown.codemirror,
            markerMgr = new Ghost.Editor.MarkerManager(editor),
            findLine,
            checkLine,
            value,
            handleUpload,
            handleChange;

        // Find the line with the marker which matches
        findLine = function (result_id) {
            // try to find the right line to replace
            if (markerMgr.markers.hasOwnProperty(result_id) && markerMgr.markers[result_id].find()) {
                return editor.getLineHandle(markerMgr.markers[result_id].find().from.line);
            }

            return false;
        };

        // Check the given line to see if it has an image, and if it correctly has a marker
        // In the special case of lines which were just pasted in, any markers are removed to prevent duplication
        checkLine = function (ln, mode) {
            var line = editor.getLineHandle(ln),
                isImage = line.text.match(imageMarkdownRegex),
                hasMarker;

            // We care if it is an image
            if (isImage) {
                hasMarker = line.text.match(markerRegex);

                if (hasMarker && (mode === 'paste' || mode === 'undo')) {
                    // this could be a duplicate, and won't be a real marker
                    markerMgr.stripMarkerFromLine(line);
                }

                if (!hasMarker) {
                    markerMgr.addMarker(line, ln);
                }
            }
            // TODO: hasMarker but no image?
        };

        // Get the markdown with all the markers stripped
        value = function () {
            var value = editor.getValue();

            _.each(markerMgr.markers, function (marker, id) {
                /*jshint unused:false*/
                value = value.replace(markerMgr.getMarkerRegexForId(id), '');
            });

            return value;
        };

        // Match the uploaded file to a line in the editor, and update that line with a path reference
        // ensuring that everything ends up in the correct place and format.
        handleUpload = function (e, result_src) {
            var line = findLine($(e.currentTarget).attr('id')),
                lineNumber = editor.getLineNumber(line),
                match = line.text.match(/\([^\n]*\)?/),
                replacement = '(http://)';

            if (match) {
                // simple case, we have the parenthesis
                editor.setSelection(
                    {line: lineNumber, ch: match.index + 1},
                    {line: lineNumber, ch: match.index + match[0].length - 1}
                );
            } else {
                match = line.text.match(/\]/);
                if (match) {
                    editor.replaceRange(
                        replacement,
                        {line: lineNumber, ch: match.index + 1},
                        {line: lineNumber, ch: match.index + 1}
                    );
                    editor.setSelection(
                        {line: lineNumber, ch: match.index + 2},
                        {line: lineNumber, ch: match.index + replacement.length }
                    );
                }
            }
            editor.replaceSelection(result_src);
        };

        // Change events from CodeMirror tell us which lines have changed.
        // Each changed line is then checked to see if a marker needs to be added or removed
        handleChange = function (cm, changeObj) {
            /*jshint unused:false*/
            var linesChanged = _.range(changeObj.from.line, changeObj.from.line + changeObj.text.length);

            _.each(linesChanged, function (ln) {
                checkLine(ln, changeObj.origin);
            });

            // Is this a line which may have had a marker on it?
            markerMgr.checkMarkers();
        };

        // Public API
        _.extend(this, {
            value: value,
            enable: function () {
                var filestorage = $('#entry-markdown-content').data('filestorage');
                $('.js-drop-zone').upload({editor: true, fileStorage: filestorage});
                $('.js-drop-zone').on('uploadstart', markdown.off);
                $('.js-drop-zone').on('uploadfailure', markdown.on);
                $('.js-drop-zone').on('uploadsuccess', markdown.on);
                $('.js-drop-zone').on('uploadsuccess', handleUpload);
            },
            disable: function () {
                $('.js-drop-zone').off('uploadsuccess', handleUpload);
            }
        });

        editor.on('change', handleChange);
    };
    Ghost.Editor = Ghost.Editor || {};
    Ghost.Editor.UploadManager = UploadManager;
}());
// # Ghost Editor Markdown Editor
//
// Markdown Editor is a light wrapper around CodeMirror

/*global Ghost, CodeMirror, shortcut, _, $ */
(function () {
    'use strict';

    var MarkdownShortcuts,
        MarkdownEditor;

    MarkdownShortcuts = [
        {'key': 'Ctrl+B', 'style': 'bold'},
        {'key': 'Meta+B', 'style': 'bold'},
        {'key': 'Ctrl+I', 'style': 'italic'},
        {'key': 'Meta+I', 'style': 'italic'},
        {'key': 'Ctrl+Alt+U', 'style': 'strike'},
        {'key': 'Ctrl+Shift+K', 'style': 'code'},
        {'key': 'Meta+K', 'style': 'code'},
        {'key': 'Ctrl+Alt+1', 'style': 'h1'},
        {'key': 'Ctrl+Alt+2', 'style': 'h2'},
        {'key': 'Ctrl+Alt+3', 'style': 'h3'},
        {'key': 'Ctrl+Alt+4', 'style': 'h4'},
        {'key': 'Ctrl+Alt+5', 'style': 'h5'},
        {'key': 'Ctrl+Alt+6', 'style': 'h6'},
        {'key': 'Ctrl+Shift+L', 'style': 'link'},
        {'key': 'Ctrl+Shift+I', 'style': 'image'},
        {'key': 'Ctrl+Q', 'style': 'blockquote'},
        {'key': 'Ctrl+Shift+1', 'style': 'currentDate'},
        {'key': 'Ctrl+U', 'style': 'uppercase'},
        {'key': 'Ctrl+Shift+U', 'style': 'lowercase'},
        {'key': 'Ctrl+Alt+Shift+U', 'style': 'titlecase'},
        {'key': 'Ctrl+Alt+W', 'style': 'selectword'},
        {'key': 'Ctrl+L', 'style': 'list'},
        {'key': 'Ctrl+Alt+C', 'style': 'copyHTML'},
        {'key': 'Meta+Alt+C', 'style': 'copyHTML'},
        {'key': 'Meta+Enter', 'style': 'newLine'},
        {'key': 'Ctrl+Enter', 'style': 'newLine'}
    ];

    MarkdownEditor = function () {
        var codemirror = CodeMirror.fromTextArea(document.getElementById('entry-markdown'), {
            mode:           'gfm',
            tabMode:        'indent',
            tabindex:       '2',
            cursorScrollMargin: 10,
            lineWrapping:   true,
            dragDrop:       false,
            extraKeys: {
                Home:   'goLineLeft',
                End:    'goLineRight'
            }
        });

        // Markdown shortcuts for the editor
        _.each(MarkdownShortcuts, function (combo) {
            shortcut.add(combo.key, function () {
                return codemirror.addMarkdown({style: combo.style});
            });
        });

        // Public API
        _.extend(this, {
            codemirror: codemirror,

            scrollViewPort: function () {
                return $('.CodeMirror-scroll');
            },
            scrollContent: function () {
                return $('.CodeMirror-sizer');
            },
            enable: function () {
                codemirror.setOption('readOnly', false);
                codemirror.on('change', function () {
                    $(document).trigger('markdownEditorChange');
                });
            },
            disable: function () {
                codemirror.setOption('readOnly', 'nocursor');
                codemirror.off('change', function () {
                    $(document).trigger('markdownEditorChange');
                });
            },
            isCursorAtEnd: function () {
                return codemirror.getCursor('end').line > codemirror.lineCount() - 5;
            },
            value: function () {
                return codemirror.getValue();
            }
        });
    };

    Ghost.Editor = Ghost.Editor || {};
    Ghost.Editor.MarkdownEditor = MarkdownEditor;
} ());
// # Ghost Editor HTML Preview
//
// HTML Preview is the right pane in the split view editor.
// It is effectively just a scrolling container for the HTML output from showdown
// It knows how to update itself, and that's pretty much it.

/*global Ghost, Showdown, Countable, _, $ */
(function () {
    'use strict';

    var HTMLPreview = function (markdown, uploadMgr) {
        var converter = new Showdown.converter({extensions: ['ghostimagepreview', 'ghostgfm']}),
            preview = document.getElementsByClassName('rendered-markdown')[0],
            update;

        // Update the preview
        // Includes replacing all the HTML, intialising upload dropzones, and updating the counter
        update = function () {
            preview.innerHTML = converter.makeHtml(markdown.value());

            uploadMgr.enable();

            Countable.once(preview, function (counter) {
                $('.entry-word-count').text($.pluralize(counter.words, 'word'));
                $('.entry-character-count').text($.pluralize(counter.characters, 'character'));
                $('.entry-paragraph-count').text($.pluralize(counter.paragraphs, 'paragraph'));
            });
        };

        // Public API
        _.extend(this, {
            scrollViewPort: function () {
                return $('.entry-preview-content');
            },
            scrollContent: function () {
                return $('.rendered-markdown');
            },
            update: update
        });
    };

    Ghost.Editor = Ghost.Editor || {};
    Ghost.Editor.HTMLPreview = HTMLPreview;
} ());
// # Ghost Editor Scroll Handler
//
// Scroll Handler does the (currently very simple / naive) job of syncing the right pane with the left pane
// as the right pane scrolls

/*global Ghost, _ */
(function () {
    'use strict';

    var ScrollHandler = function (markdown, preview) {
        var $markdownViewPort = markdown.scrollViewPort(),
            $previewViewPort = preview.scrollViewPort(),
            $markdownContent = markdown.scrollContent(),
            $previewContent = preview.scrollContent(),
            syncScroll;

        syncScroll = _.throttle(function () {
            // calc position
            var markdownHeight = $markdownContent.height() - $markdownViewPort.height(),
                previewHeight = $previewContent.height() - $previewViewPort.height(),
                ratio = previewHeight / markdownHeight,
                previewPosition = $markdownViewPort.scrollTop() * ratio;

            if (markdown.isCursorAtEnd()) {
                previewPosition = previewHeight + 30;
            }

            // apply new scroll
            $previewViewPort.scrollTop(previewPosition);
        }, 10);

        _.extend(this, {
            enable: function () { // Handle Scroll Events
                $markdownViewPort.on('scroll', syncScroll);
                $markdownViewPort.scrollClass({target: '.entry-markdown', offset: 10});
                $previewViewPort.scrollClass({target: '.entry-preview', offset: 10});
            },
            disable: function () {
                $markdownViewPort.off('scroll', syncScroll);
            }
        });

    };

    Ghost.Editor = Ghost.Editor || {};
    Ghost.Editor.ScrollHandler = ScrollHandler;
} ());
// Taken from js-bin with thanks to Remy Sharp
// yeah, nasty, but it allows me to switch from a RTF to plain text if we're running a iOS

/*global Ghost, $, _, DocumentTouch, CodeMirror*/
(function () {
    Ghost.touchEditor = false;

    var noop = function () {},
        hasTouchScreen,
        smallScreen,
        TouchEditor,
        _oldCM,
        key;

    // Taken from "Responsive design & the Guardian" with thanks to Matt Andrews
    // Added !window._phantom so that the functional tests run as though this is not a touch screen.
    // In future we can do something more advanced here for testing both touch and non touch
    hasTouchScreen = function () {
        return !window._phantom &&
            (
                ('ontouchstart' in window) ||
                (window.DocumentTouch && document instanceof DocumentTouch)
            );
    };

    smallScreen = function () {
        if (window.matchMedia('(max-width: 1000px)').matches) {
            return true;
        }

        return false;
    };

    if (hasTouchScreen()) {
        $('body').addClass('touch-editor');
        Ghost.touchEditor = true;

        TouchEditor = function (el, options) {
            /*jshint unused:false*/
            this.textarea = el;
            this.win = { document : this.textarea };
            this.ready = true;
            this.wrapping = document.createElement('div');

            var textareaParent = this.textarea.parentNode;
            this.wrapping.appendChild(this.textarea);
            textareaParent.appendChild(this.wrapping);

            this.textarea.style.opacity = 1;

            $(this.textarea).blur(_.throttle(function () {
                $(document).trigger('markdownEditorChange', { panelId: el.id });
            }, 200));

            if (!smallScreen()) {
                $(this.textarea).on('change', _.throttle(function () {
                    $(document).trigger('markdownEditorChange', { panelId: el.id });
                }, 200));
            }
        };

        TouchEditor.prototype = {
            setOption: function (type, handler) {
                if (type === 'onChange') {
                    $(this.textarea).change(handler);
                }
            },
            eachLine: function () {
                return [];
            },
            getValue: function () {
                return this.textarea.value;
            },
            setValue: function (code) {
                this.textarea.value = code;
            },
            focus: noop,
            getCursor: function () {
                return { line: 0, ch: 0 };
            },
            setCursor: noop,
            currentLine: function () {
                return 0;
            },
            cursorPosition: function () {
                return { character: 0 };
            },
            addMarkdown: noop,
            nthLine: noop,
            refresh: noop,
            selectLines: noop,
            on: noop
        };

        _oldCM = CodeMirror;

        // CodeMirror = noop;

        for (key in _oldCM) {
            if (_oldCM.hasOwnProperty(key)) {
                CodeMirror[key] = noop;
            }
        }

        CodeMirror.fromTextArea = function (el, options) {
            return new TouchEditor(el, options);
        };

        CodeMirror.keyMap = { basic: {} };

    }
}());