/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = function () {
  return {
    name: "plugin-headTags-only",
    injectHtmlTags() {
      return {
        headTags: [
          '<meta property="og:title" content="My Open Source journey">',
          '<meta property="og:description" content="Discover Open Source Software through concrete examples. A publication every week.">',
          '<meta property="og:image" content="https://myopensourcejourney.com/img/logo.png">',
          '<meta property="og:url" content="https://myopensourcejourney.com/">',
          '<meta name="twitter:card" content="summary_large_image">',
        ],
      };
    },
  };
};
