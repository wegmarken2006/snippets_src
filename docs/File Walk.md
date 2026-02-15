# File Walk

## Dart
```dart

import 'dart:io';

void allFiles(String startingDir, String extension) {
  final dir = Directory(startingDir);

  // Check if the starting directory exists
  if (!dir.existsSync()) {
    print('Directory does not exist: $startingDir');
    return;
  }

  var files = dir.listSync(recursive: true);

  for (var entity in files) {
    if (entity is File) {
      if (entity.path.endsWith(extension)) {
        print(entity.path);
      }
    } else if (entity is Directory) {
      // print('FOLDER: ${entity.path}');
    }
  }
}

void main() {
  allFiles('/', '.xml');
}
```

## Go
```go
package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	allFiles("/", ".xml")
}

func allFiles(startingDir string, extension string) {

	filepath.Walk(startingDir, func(fPath string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Println(err)
			return nil
		}
		if !info.IsDir() {
			if strings.HasSuffix(fPath, extension) {
				fmt.Println(fPath)
			}
		} else {
			//Println("FOLDER: ", fPath)
		}
		return nil
	})
}
```
## Odin
```go
package main

import "core:fmt"
import "core:os"
import "core:strings"

main :: proc() {
	outr := all_files("./", ".pdf")
	for elem in outr {
		fmt.println(elem)
	}
	
	delete(outr)
}

all_files :: proc(starting_dir: string, extension: string) -> [dynamic]string {

	outr: [dynamic]string

	w := os.walker_create(starting_dir)
	defer os.walker_destroy(&w)

	for info in os.walker_walk(&w) {
		// Optionally break on the first error:
		// _ = walker_error(&w) or_break

		// Or, handle error as we go:
		if path, err := os.walker_error(&w); err != nil {
			fmt.eprintfln("failed walking %s: %s", path, err)
			continue
		}

		// Or, do not handle errors during iteration, and just check the error at the end.

		if info.type != os.File_Type.Directory {
			if strings.has_suffix(info.fullpath, extension) {
				//clone fullpath which has short life
				f_path := fmt.tprintf("%s", info.fullpath)
				append(&outr, f_path)
				continue
			}
		}

		//fmt.printfln("%#v", info)
	}

	// Handle error if one happened during iteration at the end:
	if path, err := os.walker_error(&w); err != nil {
		fmt.eprintfln("failed walking %s: %v", path, err)
	}

	return outr
}
```

## Python
```python
import glob

for name in glob.glob("/" + "**/*.xml", recursive=True):
    print(name)

```

## Rust
```rust
use std::fs;
use std::path::Path;

fn main() {
    all_files("/", "xml");
}

fn all_files(starting_dir: &str, extension: &str) {
    let root_path = Path::new(starting_dir);
    if root_path.is_dir() {
        match fs::read_dir(root_path) {
            Ok(dirs) => {
                for entry in dirs {
                    let entry = entry.unwrap();
                    let path = entry.path();
                    if path.is_dir() {
                        all_files(path.to_str().unwrap(), extension);
                    } else if path.extension().unwrap_or_default() == extension {
                        let file_path = format!("{}", path.display());
                        println!("{}", file_path);
                    }
                }
            }
            Err(_) => println!("No permissions for: {}", root_path.to_str().unwrap()),
        }
    }
}

```