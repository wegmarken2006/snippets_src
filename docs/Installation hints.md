# Installation hints

## Rust 
### Offline Installation - Windows
- Download both installer and sources from [here](https://forge.rust-lang.org/infra/other-installation-methods.html)
- During installation, choose Advanced to select installing rls
- To work with vscode, copy rls.exe in *C:\Users\\***user***\\.cargo\bin* and set the rls path in *settings.json* through "rust-client.rlsPath".
- Unpack the sources in ***Rust installation path****\lib\rustlib\src\rust\src*
- To debug in vscode, adjust the path for stdlib sources with "sourceFileMap" in *launch.json*.

### Change default paths
Set before running the rustup-init:
CARGO_HOME
RUSTUP_HOME

## Typescript
```
npm install -g typescript
npm install -g ts-node
npm install -g browserify
```
- put in the project folder a tsconfig.json: 
```
{
   "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "es6", "dom"]
   },
   "files": [
       "hello.ts"
   ]
}
```
- run
```
ts-node hello.ts
```
or
```
tsc
node hello.js
```