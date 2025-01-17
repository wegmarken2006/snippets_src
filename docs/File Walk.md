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