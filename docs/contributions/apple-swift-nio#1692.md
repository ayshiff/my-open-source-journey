---
id: apple-swift-nio1692
title: SwiftNIO core - SocketAddress from packed bytes
sidebar_label: 1. SwiftNIO core - SocketAddress creation
---

<p className="post_date">19 Nov 2020 </p>

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Merged } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
    <div>
        <Merged />
    </div>
  <span className="badge badge--secondary marginRight">Swift</span>
  <span className="badge badge--secondary marginRight">protocol servers & clients</span>
</div>
</div>

:::info Contribution link
https://github.com/apple/swift-nio/pull/1692
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

### Project

You can find the <a href="/docs/projects/apple-swift-nio"><Highlight color="#25c2a0">swiftNIO project presentation here</Highlight></a>.

### Context

### Current behavior

Currently a user can create a `SocketAddress` (represent a socket address to which we may want to connect) from a **string representation** of an IP address.   

That would be good if we had helpers to create it from **packed byte representation**.   

:::note Issue link
https://github.com/apple/swift-nio/issues/1649
:::

## Implement the solution

To introduce the solution, we must know what an IP address (**I**nternet **P**rotocol address) is.   
An IP address is a numerical label (an **identifier**) which is assigned to a device connected to a particular network (which uses IP to communicate).

We must also know that an IP address can be in the form of **IPv4** or **IPv6**.

### IPv4

IPv4 is the first version of IP. It uses a **32-bit** address scheme and it is the **most widely used** IP version.   
It is expressed in **dotted-decimal notation**, with every bits represented by a number from 1 to 255.   

For example: **`168.212.226.204`**.

### IPv6

Conversely, IPv6 is the **most recent** version of IP. It uses a **128-bit** address scheme and it resolve some issues which are associated with IPv4.   
It is represented by eight sets of four hexadecimal digits separated by a colon.   

For example: **`fe80:0:0:0:0:0:0:5`** which can be abbreviated as **`fe80::5`** in our test case bellow.

To recap, IP addresses have the following length:

- IP V4 address: **4 bytes**
- IP V6 address: **16 bytes**

<div className="image-wrapper">
<img
  alt="IP address logic"
  src={useBaseUrl('img/swiftnio1692/main-logic.png')}
/>
<em>IP address parsing</em>
</div>

### Create `SocketAddress` from packed byte representation

As said above, the way we are going to differentiate an IPV6 address from IPV4 is thanks to their size.

We are first going to retrieve our IP Address which is a `ByteBuffer`.

#### The `ByteBuffer`struct

`ByteBuffer` is a specific SwiftNIO type of object, it stores contiguoulsy allocated raw bytes.

Here is a definition of the API that we will use:

- `readableBytesView`: a **view** into the readable bytes of the ByteBuffer
- `readableBytes`: the **number** of bytes readable
- `copyBytes(at:to:length:)`: **copies length bytes** starting at the `fromIndex` to `toIndex`

Now that we have defined what a `ByteBuffer` is, we are going to retrieve its **size** with `readableBytes` and we will therefore be able to add our switch statement which will tell us if our `packedIpAddress` is in the form of **IPv6** (a length of 16) or **IPv4** (a length of 4).

Then inside our switch statement we will use our `ByteBufferView` (thanks to `readableBytesView`) to create a new `SocketAddress`. 

Let's take a closer look at `sockaddr_in()` (the behavior of `sockaddr_in6()` is essentially the same):

<div className="image-wrapper">
<img
  alt="IP address logic"
  src={useBaseUrl('img/swiftnio1692/sockaddr-in.png')}
/>
<br/>
<em>sockaddr_in()</em>
</div>


```ts title="Sources/NIO/SocketAddresses.swift"
/// Create a new `SocketAddress` for an IP address in ByteBuffer form.
///
/// - parameters:
///     - packedIpAddress: The IP address, in ByteBuffer form.
///     - port: The target port.
/// - returns: the `SocketAddress` corresponding to this string and port combination.
/// - throws: may throw `SocketAddressError.failedToParseIPByteBuffer` if the IP address cannot be parsed.
public init(packedIpAddress: ByteBuffer, port: Int) throws {
    let packed = packedIpAddress.readableBytesView

    switch packedIpAddress.readableBytes {
    case 4:
        var ipv4Addr = sockaddr_in()
        ipv4Addr.sin_family = sa_family_t(AF_INET)
        ipv4Addr.sin_port = in_port_t(port).bigEndian
        withUnsafeMutableBytes(of: &ipv4Addr.sin_addr) { $0.copyBytes(from: packed) }
        // Init our IPv4 address
        self = .v4(.init(address: ipv4Addr, host: ""))
    case 16:
        var ipv6Addr = sockaddr_in6()
        ipv6Addr.sin6_family = sa_family_t(AF_INET6)
        ipv6Addr.sin6_port = in_port_t(port).bigEndian
        withUnsafeMutableBytes(of: &ipv6Addr.sin6_addr) { $0.copyBytes(from: packed) }
        // Init our IPv6 address
        self = .v6(.init(address: ipv6Addr, host: ""))
    default:
        throw SocketAddressError.FailedToParseIPByteBuffer(address: packedIpAddress)
    }
}
```

### Add a new `SocketAddressError`

This error is thrown when we can't parse the packed byte representattion.

```ts title="Sources/NIO/SocketAddresses.swift"
extension SocketAddressError {
    /// Unable to parse a given IP ByteBuffer
    public struct FailedToParseIPByteBuffer: Error, Hashable {
        public var address: ByteBuffer

        public init(address: ByteBuffer) {
            self.address = address
        }
    }
}
```

### Add some tests

As said before, an **IPv4** adress contains 4 bytes, let's take `[0x7F, 0x00, 0x00, 0x01]` which is the `ByteBuffer` representation of `127.0.0.1`.   

```ts title="Tests/NIOTests/SocketAddressTest.swift"
func testDescriptionWorksWithByteBufferIPv4IP() throws {
    let IPv4: [UInt8] = [0x7F, 0x00, 0x00, 0x01]
    let ipv4Address: ByteBuffer = ByteBuffer.init(bytes: IPv4)
    let sa = try! SocketAddress(packedIpAddress: ipv4Address, port: 12345)
    XCTAssertEqual("[IPv4]127.0.0.1:12345", sa.description)
}
```

An **IPv6** adress contains 16 bytes, let's take the `ByteBuffer` representation of `fe80::5`.   

```ts title="Tests/NIOTests/SocketAddressTest.swift"
func testDescriptionWorksWithByteBufferIPv6IP() throws {
    let IPv6: [UInt8] = 
        [0xfe, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05]
    let ipv6Address: ByteBuffer = ByteBuffer.init(bytes: IPv6)
    let sa = try! SocketAddress(packedIpAddress: ipv6Address, port: 12345)
    XCTAssertEqual("[IPv6]fe80::5:12345", sa.description)
}
```

If we provide a `ByteBuffer` IP address with a wrong length we need to throw a new `FailedToParseIPByteBuffer` error.   

```ts title="Tests/NIOTests/SocketAddressTest.swift"
func testRejectsWrongIPByteBufferLength() {
    let wrongIP: [UInt8] = [0x01, 0x7F, 0x00]
    let ipAddress: ByteBuffer = ByteBuffer.init(bytes: wrongIP)
    XCTAssertThrowsError(try SocketAddress(packedIpAddress: ipAddress, port: 12345)) { error in
        switch error {
        case is SocketAddressError.FailedToParseIPByteBuffer:
            XCTAssertEqual(ipAddress, (error as! SocketAddressError.FailedToParseIPByteBuffer).address)
        default:
            XCTFail("unexpected error: \(error)")
        }
    }
}
```

## Takeaway

### Problems encountered

At first I started implementing the new error in the existing enum `SocketAddressError`:

```ts {10-11} title="Sources/NIO/SocketAddresses.swift"
public enum SocketAddressError: Error {
    /// The host is unknown (could not be resolved).
    case unknown(host: String, port: Int)
    /// The requested `SocketAddress` is not supported.
    case unsupported
    /// The requested UDS path is too long.
    case unixDomainSocketPathTooLong
    /// Unable to parse a given IP string
    case failedToParseIPString(String)
    /// Unable to parse a given IP ByteBuffer
    case failedToParseIPByteBuffer(ByteBuffer)
```

But adding new cases to enumerations is a Semver major change.   
This is why I implemented the error as a `struct`.

### What did I learn ?

This contribution is allowed me to learn more about **IP addresses** and **packed bytes representation**.   
Swift is not the language I usually use, so it allowed me to put into practice some concepts that I have learned in the past.