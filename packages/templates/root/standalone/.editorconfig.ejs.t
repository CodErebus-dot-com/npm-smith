# http://editorconfig.org
root = true

[*]
indent_style = tab
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# The JSON files contain newlines inconsistently
[*.json]
insert_final_newline = ignore

# Minified JavaScript files shouldn't be changed
[**.min.js]
indent_style = ignore
insert_final_newline = ignore

[*.md]
trim_trailing_whitespace = false
