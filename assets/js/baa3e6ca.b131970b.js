"use strict";(self.webpackChunkthe_open_source_with_remi=self.webpackChunkthe_open_source_with_remi||[]).push([[765,364],{3919:function(e,t,n){function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function a(e){return void 0!==e&&!r(e)}n.d(t,{b:function(){return r},Z:function(){return a}})},4996:function(e,t,n){n.d(t,{C:function(){return s},Z:function(){return i}});var r=n(2263),a=n(3919);function s(){var e=(0,r.Z)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,s=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var s=void 0===r?{}:r,i=s.forcePrependBaseUrl,o=void 0!==i&&i,d=s.absolute,l=void 0!==d&&d;if(!n)return n;if(n.startsWith("#"))return n;if((0,a.b)(n))return n;if(o)return t+n;var p=n.startsWith(t)?n:t+n.replace(/^\//,"");return l?e+p:p}(s,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,s().withBaseUrl)(e,t)}},1531:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return c},Highlight:function(){return u},toc:function(){return m},default:function(){return f}});var r=n(3117),a=n(102),s=(n(7294),n(3905)),i=n(4996),o=n(6395),d=["components"],l={id:"apple-swift-nio1692",title:"SwiftNIO core - SocketAddress from packed bytes",sidebar_label:"1. SwiftNIO core - SocketAddress creation"},p=void 0,c={unversionedId:"contributions/apple-swift-nio1692",id:"contributions/apple-swift-nio1692",isDocsHomePage:!1,title:"SwiftNIO core - SocketAddress from packed bytes",description:"backgroundColor: color,",source:"@site/docs/contributions/apple-swift-nio#1692.md",sourceDirName:"contributions",slug:"/contributions/apple-swift-nio1692",permalink:"/docs/contributions/apple-swift-nio1692",editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/contributions/apple-swift-nio#1692.md",tags:[],version:"current",frontMatter:{id:"apple-swift-nio1692",title:"SwiftNIO core - SocketAddress from packed bytes",sidebar_label:"1. SwiftNIO core - SocketAddress creation"},sidebar:"docs",previous:{title:"Concept presentation",permalink:"/docs/presentation"},next:{title:"2. xLayers - Rethink UX",permalink:"/docs/contributions/xlayers395"}},u=function(e){var t=e.children,n=e.color;return(0,s.kt)("span",{style:{backgroundColor:n,borderRadius:"2px",color:"#fff",padding:"0.2rem",fontWeight:600}},t)},m=[{value:"Introduction",id:"introduction",children:[{value:"Project",id:"project",children:[],level:3},{value:"Context",id:"context",children:[],level:3},{value:"Current behavior",id:"current-behavior",children:[],level:3}],level:2},{value:"Implement the solution",id:"implement-the-solution",children:[{value:"IPv4",id:"ipv4",children:[],level:3},{value:"IPv6",id:"ipv6",children:[],level:3},{value:"Create <code>SocketAddress</code> from packed byte representation",id:"create-socketaddress-from-packed-byte-representation",children:[{value:"The <code>ByteBuffer</code>struct",id:"the-bytebufferstruct",children:[],level:4}],level:3},{value:"Add a new <code>SocketAddressError</code>",id:"add-a-new-socketaddresserror",children:[],level:3},{value:"Add some tests",id:"add-some-tests",children:[],level:3}],level:2},{value:"Takeaway",id:"takeaway",children:[{value:"Problems encountered",id:"problems-encountered",children:[],level:3},{value:"What did I learn ?",id:"what-did-i-learn-",children:[],level:3}],level:2}],k={Highlight:u,toc:m};function f(e){var t=e.components,n=(0,a.Z)(e,d);return(0,s.kt)("wrapper",(0,r.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("div",{className:"pr_infos"},(0,s.kt)("div",{className:"marginBottom"},(0,s.kt)("div",null,(0,s.kt)(o.Merged,{date:"19 Nov 2020",mdxType:"Merged"})),(0,s.kt)("span",{className:"badge badge--secondary marginRight"},"Swift"),(0,s.kt)("span",{className:"badge badge--secondary marginRight"},"protocol servers & clients"))),(0,s.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Contribution link")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},(0,s.kt)("a",{parentName:"p",href:"https://github.com/apple/swift-nio/pull/1692"},"https://github.com/apple/swift-nio/pull/1692")))),(0,s.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Contribution Type")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"This contribution is a new ",(0,s.kt)("strong",{parentName:"p"},"feature"),"."))),(0,s.kt)("h2",{id:"introduction"},"Introduction"),(0,s.kt)("div",{className:"image-wrapper"},(0,s.kt)(o.ImageWrapper,{src:(0,i.Z)("img/swiftnio1692/cover.jpg"),width:"100%",alt:"SwiftNIO presentation",mdxType:"ImageWrapper"}),(0,s.kt)("em",null,"SwiftNIO presentation")),(0,s.kt)("h3",{id:"project"},"Project"),(0,s.kt)("p",null,"You can find the ",(0,s.kt)("a",{href:"/docs/projects/apple-swift-nio"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"swiftNIO project presentation here")),"."),(0,s.kt)("h3",{id:"context"},"Context"),(0,s.kt)("h3",{id:"current-behavior"},"Current behavior"),(0,s.kt)("p",null,"Currently a user can create a ",(0,s.kt)("inlineCode",{parentName:"p"},"SocketAddress")," (represent a socket address to which we may want to connect) from a ",(0,s.kt)("strong",{parentName:"p"},"string representation")," of an IP address.   "),(0,s.kt)("p",null,"That would be good if we had helpers to create it from ",(0,s.kt)("strong",{parentName:"p"},"packed byte representation"),".   "),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Issue link")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},(0,s.kt)("a",{parentName:"p",href:"https://github.com/apple/swift-nio/issues/1649"},"https://github.com/apple/swift-nio/issues/1649")))),(0,s.kt)("h2",{id:"implement-the-solution"},"Implement the solution"),(0,s.kt)("p",null,"To introduce the solution, we must know what an IP address (",(0,s.kt)("strong",{parentName:"p"},"I"),"nternet ",(0,s.kt)("strong",{parentName:"p"},"P"),"rotocol address) is.",(0,s.kt)("br",{parentName:"p"}),"\n","An IP address is a numerical label (an ",(0,s.kt)("strong",{parentName:"p"},"identifier"),") which is assigned to a device connected to a particular network (which uses IP to communicate)."),(0,s.kt)("p",null,"We must also know that an IP address can be in the form of ",(0,s.kt)("strong",{parentName:"p"},"IPv4")," or ",(0,s.kt)("strong",{parentName:"p"},"IPv6"),"."),(0,s.kt)("h3",{id:"ipv4"},"IPv4"),(0,s.kt)("p",null,"IPv4 is the first version of IP. It uses a ",(0,s.kt)("strong",{parentName:"p"},"32-bit")," address scheme and it is the ",(0,s.kt)("strong",{parentName:"p"},"most widely used")," IP version.",(0,s.kt)("br",{parentName:"p"}),"\n","It is expressed in ",(0,s.kt)("strong",{parentName:"p"},"dotted-decimal notation"),", with every bits represented by a number from 1 to 255.   "),(0,s.kt)("p",null,"For example: ",(0,s.kt)("strong",{parentName:"p"},(0,s.kt)("inlineCode",{parentName:"strong"},"168.212.226.204")),"."),(0,s.kt)("h3",{id:"ipv6"},"IPv6"),(0,s.kt)("p",null,"Conversely, IPv6 is the ",(0,s.kt)("strong",{parentName:"p"},"most recent")," version of IP. It uses a ",(0,s.kt)("strong",{parentName:"p"},"128-bit")," address scheme and it resolve some issues which are associated with IPv4.",(0,s.kt)("br",{parentName:"p"}),"\n","It is represented by eight sets of four hexadecimal digits separated by a colon.   "),(0,s.kt)("p",null,"For example: ",(0,s.kt)("strong",{parentName:"p"},(0,s.kt)("inlineCode",{parentName:"strong"},"fe80:0:0:0:0:0:0:5"))," which can be abbreviated as ",(0,s.kt)("strong",{parentName:"p"},(0,s.kt)("inlineCode",{parentName:"strong"},"fe80::5"))," in our test case bellow."),(0,s.kt)("p",null,"To recap, IP addresses have the following length:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"IP V4 address: ",(0,s.kt)("strong",{parentName:"li"},"4 bytes")),(0,s.kt)("li",{parentName:"ul"},"IP V6 address: ",(0,s.kt)("strong",{parentName:"li"},"16 bytes"))),(0,s.kt)("div",{className:"image-wrapper"},(0,s.kt)(o.ImageWrapper,{alt:"IP address logic",src:(0,i.Z)("img/swiftnio1692/main-logic.png"),mdxType:"ImageWrapper"}),(0,s.kt)("em",null,"IP address parsing")),(0,s.kt)("h3",{id:"create-socketaddress-from-packed-byte-representation"},"Create ",(0,s.kt)("inlineCode",{parentName:"h3"},"SocketAddress")," from packed byte representation"),(0,s.kt)("p",null,"As said above, the way we are going to differentiate an IPV6 address from IPV4 is thanks to their size."),(0,s.kt)("p",null,"We are first going to retrieve our IP Address which is a ",(0,s.kt)("inlineCode",{parentName:"p"},"ByteBuffer"),"."),(0,s.kt)("h4",{id:"the-bytebufferstruct"},"The ",(0,s.kt)("inlineCode",{parentName:"h4"},"ByteBuffer"),"struct"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"ByteBuffer")," is a specific SwiftNIO type of object, it stores contiguoulsy allocated raw bytes."),(0,s.kt)("p",null,"Here is a definition of the API that we will use:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"readableBytesView"),": a ",(0,s.kt)("strong",{parentName:"li"},"view")," into the readable bytes of the ByteBuffer"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"readableBytes"),": the ",(0,s.kt)("strong",{parentName:"li"},"number")," of bytes readable"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"copyBytes(at:to:length:)"),": ",(0,s.kt)("strong",{parentName:"li"},"copies length bytes")," starting at the ",(0,s.kt)("inlineCode",{parentName:"li"},"fromIndex")," to ",(0,s.kt)("inlineCode",{parentName:"li"},"toIndex"))),(0,s.kt)("p",null,"Now that we have defined what a ",(0,s.kt)("inlineCode",{parentName:"p"},"ByteBuffer")," is, we are going to retrieve its ",(0,s.kt)("strong",{parentName:"p"},"size")," with ",(0,s.kt)("inlineCode",{parentName:"p"},"readableBytes")," and we will therefore be able to add our switch statement which will tell us if our ",(0,s.kt)("inlineCode",{parentName:"p"},"packedIpAddress")," is in the form of ",(0,s.kt)("strong",{parentName:"p"},"IPv6")," (a length of 16) or ",(0,s.kt)("strong",{parentName:"p"},"IPv4")," (a length of 4)."),(0,s.kt)("p",null,"Then inside our switch statement we will use our ",(0,s.kt)("inlineCode",{parentName:"p"},"ByteBufferView")," (thanks to ",(0,s.kt)("inlineCode",{parentName:"p"},"readableBytesView"),") to create a new ",(0,s.kt)("inlineCode",{parentName:"p"},"SocketAddress"),". "),(0,s.kt)("p",null,"Let's take a closer look at ",(0,s.kt)("inlineCode",{parentName:"p"},"sockaddr_in()")," (the behavior of ",(0,s.kt)("inlineCode",{parentName:"p"},"sockaddr_in6()")," is essentially the same):"),(0,s.kt)("div",{className:"image-wrapper"},(0,s.kt)(o.ImageWrapper,{alt:"IP address logic",src:(0,i.Z)("img/swiftnio1692/sockaddr-in.png"),mdxType:"ImageWrapper"}),(0,s.kt)("em",null,"sockaddr_in()")),(0,s.kt)("br",null),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Sources/NIO/SocketAddresses.swift"',title:'"Sources/NIO/SocketAddresses.swift"'},'/// Create a new `SocketAddress` for an IP address in ByteBuffer form.\n///\n/// - parameters:\n///     - packedIpAddress: The IP address, in ByteBuffer form.\n///     - port: The target port.\n/// - returns: the `SocketAddress` corresponding to this string and port combination.\n/// - throws: may throw `SocketAddressError.failedToParseIPByteBuffer` if the IP address cannot be parsed.\npublic init(packedIpAddress: ByteBuffer, port: Int) throws {\n    let packed = packedIpAddress.readableBytesView\n\n    switch packedIpAddress.readableBytes {\n    case 4:\n        var ipv4Addr = sockaddr_in()\n        ipv4Addr.sin_family = sa_family_t(AF_INET)\n        ipv4Addr.sin_port = in_port_t(port).bigEndian\n        withUnsafeMutableBytes(of: &ipv4Addr.sin_addr) { $0.copyBytes(from: packed) }\n        // Init our IPv4 address\n        self = .v4(.init(address: ipv4Addr, host: ""))\n    case 16:\n        var ipv6Addr = sockaddr_in6()\n        ipv6Addr.sin6_family = sa_family_t(AF_INET6)\n        ipv6Addr.sin6_port = in_port_t(port).bigEndian\n        withUnsafeMutableBytes(of: &ipv6Addr.sin6_addr) { $0.copyBytes(from: packed) }\n        // Init our IPv6 address\n        self = .v6(.init(address: ipv6Addr, host: ""))\n    default:\n        throw SocketAddressError.FailedToParseIPByteBuffer(address: packedIpAddress)\n    }\n}\n')),(0,s.kt)("h3",{id:"add-a-new-socketaddresserror"},"Add a new ",(0,s.kt)("inlineCode",{parentName:"h3"},"SocketAddressError")),(0,s.kt)("p",null,"This error is thrown when we can't parse the packed byte representattion."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Sources/NIO/SocketAddresses.swift"',title:'"Sources/NIO/SocketAddresses.swift"'},"extension SocketAddressError {\n    /// Unable to parse a given IP ByteBuffer\n    public struct FailedToParseIPByteBuffer: Error, Hashable {\n        public var address: ByteBuffer\n\n        public init(address: ByteBuffer) {\n            self.address = address\n        }\n    }\n}\n")),(0,s.kt)("h3",{id:"add-some-tests"},"Add some tests"),(0,s.kt)("p",null,"As said before, an ",(0,s.kt)("strong",{parentName:"p"},"IPv4")," adress contains 4 bytes, let's take ",(0,s.kt)("inlineCode",{parentName:"p"},"[0x7F, 0x00, 0x00, 0x01]")," which is the ",(0,s.kt)("inlineCode",{parentName:"p"},"ByteBuffer")," representation of ",(0,s.kt)("inlineCode",{parentName:"p"},"127.0.0.1"),".   "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Tests/NIOTests/SocketAddressTest.swift"',title:'"Tests/NIOTests/SocketAddressTest.swift"'},'func testDescriptionWorksWithByteBufferIPv4IP() throws {\n    let IPv4: [UInt8] = [0x7F, 0x00, 0x00, 0x01]\n    let ipv4Address: ByteBuffer = ByteBuffer.init(bytes: IPv4)\n    let sa = try! SocketAddress(packedIpAddress: ipv4Address, port: 12345)\n    XCTAssertEqual("[IPv4]127.0.0.1:12345", sa.description)\n}\n')),(0,s.kt)("p",null,"An ",(0,s.kt)("strong",{parentName:"p"},"IPv6")," adress contains 16 bytes, let's take the ",(0,s.kt)("inlineCode",{parentName:"p"},"ByteBuffer")," representation of ",(0,s.kt)("inlineCode",{parentName:"p"},"fe80::5"),".   "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Tests/NIOTests/SocketAddressTest.swift"',title:'"Tests/NIOTests/SocketAddressTest.swift"'},'func testDescriptionWorksWithByteBufferIPv6IP() throws {\n    let IPv6: [UInt8] = \n        [0xfe, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05]\n    let ipv6Address: ByteBuffer = ByteBuffer.init(bytes: IPv6)\n    let sa = try! SocketAddress(packedIpAddress: ipv6Address, port: 12345)\n    XCTAssertEqual("[IPv6]fe80::5:12345", sa.description)\n}\n')),(0,s.kt)("p",null,"If we provide a ",(0,s.kt)("inlineCode",{parentName:"p"},"ByteBuffer")," IP address with a wrong length we need to throw a new ",(0,s.kt)("inlineCode",{parentName:"p"},"FailedToParseIPByteBuffer")," error.   "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Tests/NIOTests/SocketAddressTest.swift"',title:'"Tests/NIOTests/SocketAddressTest.swift"'},'func testRejectsWrongIPByteBufferLength() {\n    let wrongIP: [UInt8] = [0x01, 0x7F, 0x00]\n    let ipAddress: ByteBuffer = ByteBuffer.init(bytes: wrongIP)\n    XCTAssertThrowsError(try SocketAddress(packedIpAddress: ipAddress, port: 12345)) { error in\n        switch error {\n        case is SocketAddressError.FailedToParseIPByteBuffer:\n            XCTAssertEqual(ipAddress, (error as! SocketAddressError.FailedToParseIPByteBuffer).address)\n        default:\n            XCTFail("unexpected error: \\(error)")\n        }\n    }\n}\n')),(0,s.kt)("h2",{id:"takeaway"},"Takeaway"),(0,s.kt)("h3",{id:"problems-encountered"},"Problems encountered"),(0,s.kt)("p",null,"At first I started implementing the new error in the existing enum ",(0,s.kt)("inlineCode",{parentName:"p"},"SocketAddressError"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'{10-11} title="Sources/NIO/SocketAddresses.swift"',"{10-11}":!0,title:'"Sources/NIO/SocketAddresses.swift"'},"public enum SocketAddressError: Error {\n    /// The host is unknown (could not be resolved).\n    case unknown(host: String, port: Int)\n    /// The requested `SocketAddress` is not supported.\n    case unsupported\n    /// The requested UDS path is too long.\n    case unixDomainSocketPathTooLong\n    /// Unable to parse a given IP string\n    case failedToParseIPString(String)\n    /// Unable to parse a given IP ByteBuffer\n    case failedToParseIPByteBuffer(ByteBuffer)\n")),(0,s.kt)("p",null,"But adding new cases to enumerations is a Semver major change.",(0,s.kt)("br",{parentName:"p"}),"\n","This is why I implemented the error as a ",(0,s.kt)("inlineCode",{parentName:"p"},"struct"),"."),(0,s.kt)("h3",{id:"what-did-i-learn-"},"What did I learn ?"),(0,s.kt)("p",null,"This contribution allowed me to learn more about ",(0,s.kt)("strong",{parentName:"p"},"IP addresses")," and ",(0,s.kt)("strong",{parentName:"p"},"packed bytes representation"),".",(0,s.kt)("br",{parentName:"p"}),"\n","Swift is not the language I usually use, so it allowed me to put into practice some concepts that I have learned in the past."))}f.isMDXComponent=!0},6395:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return u},Merged:function(){return m},ImageWrapper:function(){return k},Open:function(){return f},Status:function(){return h},default:function(){return g}});var r=n(3117),a=n(102),s=n(7294),i=n(3905),o=n(2879),d=["components"],l={},p=void 0,c={unversionedId:"utils",id:"utils",isDocsHomePage:!1,title:"utils",description:"<svg",source:"@site/docs/utils.md",sourceDirName:".",slug:"/utils",permalink:"/docs/utils",editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/utils.md",tags:[],version:"current",frontMatter:{}},u=[],m=function(e){var t=e.date;return(0,i.kt)("div",null,(0,i.kt)("div",{className:"merged"},(0,i.kt)("span",null,(0,i.kt)("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16",fill:"white","aria-hidden":"true",className:"status_svg"},(0,i.kt)("path",{fillRule:"evenodd",d:"M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z"})),"Merged")),t||null)},k=function(e){var t=e.src,n=e.alt,r=e.width,a=s.useState(!1),d=a[0],l=a[1];return(0,i.kt)("div",null,(0,i.kt)("div",{className:"image-zoom",onClick:function(){return l(!0)}},(0,i.kt)("img",{src:t,alt:n,width:r})),d&&(0,i.kt)(o.Z,{mainSrc:t,onCloseRequest:function(){return l(!1)},mdxType:"Lightbox"}))},f=function(e){var t=e.date;return(0,i.kt)("div",null,(0,i.kt)("div",{className:"open"},(0,i.kt)("span",null,(0,i.kt)("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16",fill:"white","aria-hidden":"true",className:"status_svg"},(0,i.kt)("path",{fillRule:"evenodd",d:"M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"})),"Open")),t||null)},h=function(e){var t=e.url,n=s.useState(null),r=n[0],a=n[1];return s.useEffect((function(){var e=!0;return fetch(t).then((function(e){return e.json()})).then((function(t){e&&a(t.merged)})),function(){e=!1}}),[]),null===r?(0,i.kt)("div",null):!0===r?(0,i.kt)(m,{mdxType:"Merged"}):(0,i.kt)(f,{mdxType:"Open"})},v={toc:u,Merged:m,ImageWrapper:k,Open:f,Status:h};function g(e){var t=e.components,n=(0,a.Z)(e,d);return(0,i.kt)("wrapper",(0,r.Z)({},v,n,{components:t,mdxType:"MDXLayout"}))}g.isMDXComponent=!0}}]);