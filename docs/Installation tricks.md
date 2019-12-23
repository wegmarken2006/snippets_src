# Installation tricks

## Rust 
### Offline Installation - Windows
- Download both installer and sources from [here](https://forge.rust-lang.org/infra/other-installation-methods.html)
- During installation, choose Advanced to select installing rls
- To work with vscode, copy rls.exe in *C:\Users\\***user***\\.cargo\bin* and set the rls path in *settings.json* through "rust-client.rlsPath".
- Unpack the sources in ***Rust installation path****\lib\rustlib\src\rust\src*
- To debug in vscode, adjust the path for stdlib sources with "sourceFileMap" in *launch.json*.