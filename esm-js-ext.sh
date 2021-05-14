#! /bin/env bash
set -o errexit
set -o errtrace
set -o pipefail
set -o nounset
shopt -s globstar

# add .js to all local import paths
# could be fooled by a special case of template literal tho
sed -i -re "s/ from '(\.[\.[:alpha:]\/]+)';$/ from '\1\.js';/" esm/**/*.js
