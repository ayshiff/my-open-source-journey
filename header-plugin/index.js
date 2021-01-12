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
          `<meta name="title" content="My Open Source journey">`,
          `<meta name="description" content="Discover Open Source Software through concrete examples. A publication every two weeks.">`,
          `<meta property="og:type" content="website">`,
          `<meta property="og:url" content="https://myopensourcejourney.com/">`,
          `<meta property="og:title" content="My Open Source journey">`,
          `<meta property="og:description" content="Discover Open Source Software through concrete examples. A publication every two weeks.">`,
          `<meta property="og:image" content="https://myopensourcejourney.com/img/logo.png">`,
          `<meta property="twitter:card" content="summary_large_image">`,
          `<meta property="twitter:url" content="https://myopensourcejourney.com/">`,
          `<meta property="twitter:title" content="My Open Source journey">`,
          `<meta property="twitter:description" content="Discover Open Source Software through concrete examples. A publication every two weeks.">`,
          `<meta property="twitter:image" content="https://myopensourcejourney.com/img/logo.png"></meta>`,
        ],
      };
    },
  };
};
