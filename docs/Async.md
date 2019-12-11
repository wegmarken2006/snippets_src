# Async

## C\#
```
using System;
using System.Net;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace hello
{
    class Program
    {
        static void Main(string[] args)
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
}
```

## Rust 
```

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