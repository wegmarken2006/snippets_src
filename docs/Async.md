# Async

## C\#
```c#
using System;
using System.Net;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;

public class Program
{
    public static void Main(string[] args)
    {
        var task = SumPageSizesAsync();
        task.Wait();
    }

    static async Task SumPageSizesAsync()
    {
        var total = 0;
        var urls = new List<string>
            {
            "https://wegmarken2006.github.io/snippets/",
            "https://wegmarken2006.github.io/snippets/Cross/",
            "https://wegmarken2006.github.io/snippets/Dict/",
            "https://wegmarken2006.github.io/snippets/Execution%20time/"
            };

        foreach (var url in urls)
        {
            var content = await GetURLContentsAsync(url);
            total += content.Length;
        }
        Console.WriteLine("{0}", total);
    }

    static async Task<byte[]> GetURLContentsAsync(string url)
    {
        var content = new MemoryStream();

        var webReq = (HttpWebRequest)WebRequest.Create(url);

        using (WebResponse response = await webReq.GetResponseAsync())
        {
            using (Stream responseStream = response.GetResponseStream())
            {
                await responseStream.CopyToAsync(content);
            }
        }
        return content.ToArray();
    }
}
```

## Dart
```dart

import 'package:http/http.dart' as http;

main() async {
  
  var urls = [
    "https://wegmarken2006.github.io/snippets/",
    "https://wegmarken2006.github.io/snippets/Cross/",
    "https://wegmarken2006.github.io/snippets/Dict/",
    "https://wegmarken2006.github.io/snippets/Execution%20time/"
  ];
  var total = 0;
  for (var url in urls) {
    var text = await http.read(url);
    total = total + text.length;
  }
  print("$total");
}
```

## Julia
```julia
#import Pkg; Pkg.add("HTTP")
 using HTTP
 using Printf
 
 urls = [
    "https://wegmarken2006.github.io/snippets/",
    "https://wegmarken2006.github.io/snippets/Cross/",
    "https://wegmarken2006.github.io/snippets/Dict/",
    "https://wegmarken2006.github.io/snippets/Execution%20time/",
]

mutable struct Atomic{Int64}; @atomic x::Int64; end

tot = Atomic(0)

@sync for url in urls
    @async begin
        resp = HTTP.get(url)        
        @atomicreplace tot.x  (@atomic tot.x + length(String(resp.body)))
    end
end

@printf "Size: %s\n" @atomic tot.x
```

## Nim
```nim

import strformat
import httpClient
import asyncdispatch

proc sumPageSizesAsync() {.async.} =
  let urls = [
    "https://wegmarken2006.github.io/snippets/",
    "https://wegmarken2006.github.io/snippets/Cross/",
    "https://wegmarken2006.github.io/snippets/Dict/",
    "https://wegmarken2006.github.io/snippets/Execution%20time/"
  ];
  var total = 0;

  var client = newAsyncHttpClient()
  for url in urls:
    let text = await client.getContent(url)
    total = total + text.len()

  echo &"{total}"

waitFor(sumPageSizesAsync());
```

## Python
```python
# pip install aiohttp
import aiohttp
import asyncio

async def sum_page_sizes():
    urls = [
        "https://wegmarken2006.github.io/snippets/",
        "https://wegmarken2006.github.io/snippets/Cross/",
        "https://wegmarken2006.github.io/snippets/Dict/",
        "https://wegmarken2006.github.io/snippets/Execution%20time/"
    ]
    total = 0
    for url in urls:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                text = await response.text()
                total = total + len(text)
    print(total)

loop = asyncio.get_event_loop()
loop.run_until_complete(sum_page_sizes())
```

## Rust 
```rust

//[dependencies]
//async-std = "1.0.1"
//surf = "1.0.3"

use async_std::task::*;
use surf::{get};

fn main() {
    block_on(sum_page_sizes());
}

async fn sum_page_sizes() {
    let urls = vec![
        "https://wegmarken2006.github.io/snippets/",
        "https://wegmarken2006.github.io/snippets/Cross/",
        "https://wegmarken2006.github.io/snippets/Dict/",
        "https://wegmarken2006.github.io/snippets/Execution%20time/",
    ];
    let mut total = 0;
    for url in urls {
        let response = get(&url).recv_string().await.unwrap();
        total = total + response.len();
    }

    println!("{}", total);
}
```