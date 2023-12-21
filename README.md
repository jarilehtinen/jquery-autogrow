# jQuery AutoGrow Textarea

There are many versions of jQuery auto-grow plugins, but all have their own problems. Mostly because they are 10+ years old. This is the one that has best suited for my use. Can't really say it's any newer than those other ones, but it seems to work.

## Usage

```javascript
$(element).autogrow();
```

## Usage with callbacks

```javascript
$(element).autogrow({
    preGrowCallback: function () {
        // Do something
    }
});
```

```javascript
$(element).autogrow({
    postGrowCallback: function () {
        // Do something
    }
});
```

## Thanks

Based on http://github.com/jaz303/jquery-grab-bag/tree/master/javascripts/jquery.autogrow-textarea.js

