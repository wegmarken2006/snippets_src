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
import "core:path/filepath"
import "core:strings"

main :: proc() {
	outr := [dynamic]string{}
	all_files("/", ".xml", &outr)
	fmt.println(outr)
	delete(outr)
}

all_files :: proc(starting_dir: string, extension: string, outr: ^[dynamic]string) {
	// no closures, must concentrate all parameters in a single struct
	// to pass as rawptr
	Params :: struct {
		extension: string,
		outr:      ^[dynamic]string,
	}
	params := Params{extension, outr}

	filepath.walk(
		starting_dir,
		proc(info: os.File_Info, err: os.Error, params: rawptr) -> (os.Error, bool) {
			fpath := info.fullpath
			if err != nil {
				fmt.println(err)
				return nil, false
			}
			if !info.is_dir {
				extension := (^Params)(params).extension
				outr := (^Params)(params).outr
				if strings.has_suffix(fpath, extension) {
					fmt.println(fpath)
					ret, _ := append(outr, fpath)
					if ret <= 0 {
						fmt.println("no append")
					}
				}
			}
			return nil, false
		},
		&params,
	)
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