# RB-validate
*ver. 0.8 beta*
*need to develop*

Simple validation jquery plugin.

### What you need
You need only jQuery.

### How to use
$(document).ready(function() {
    $('#contact-form').RBvalidate();
});

### Options
- **outlineColor** - when required input field is empty: outline color *(default: red)*
- **errorInfo** - text that shows below required input field *(default: This field is required)*
- **eachInput** - function that is performed at end of each() function of every required input field (except upload fields)
- **errorInfoFile** - text that shows below required file input field *(default: This field is required. Accepted file formats: )*
- **eachFileInput** - function that is performed at end of each() function of every required file input field
- **extensions** - validation for file-type input fields *(default: ['gif','png','jpg','jpeg'])*
- **scrollSpeed** - animation speed of sliding to first empty required input field *(default: 500)*
- **scrollOffset** - offset (put here your top menu bar height) *(default: 70)*