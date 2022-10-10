## [Static-get](http://s.minos.io/)  -- Easily download Linux binaries

 - ### Static-get will not work unless there is a internet connection. See [internet.md](docs/internet.md) for how to set it up

 - ### static-get is not recommended for larger packages because it uses the internet proxy which is rate limited
 
 - ### static-get should **not** be run as root (no sudo)


## The syntax

```
  Retrieve static linux binaries from s.minos.io and mirrors.

  -d, --download [dir]        write in the specified directory
  -o, --output [file]         write to file
  -s, --search [pattern]      search packages by pattern
  -x, --extract               extract after download
  -i, --install               install after download
  -p, --prefix [dir]          specifies an install location for the package
  -n, --dry-run               perform a trial run with no changes made
  -c, --clean-cache           remove temporal files
  -r, --remove                removes an installed package

  -m, --mirror [s.minos.io]   set mirror
  -a, --arch   [x86_64|i686]  set architecture
  -f, --format [gz|bz2|xz]    set compress format
  -k, --checksum [sha512|md5] set checksum
  -t, --distro [all|bifrost|morpheus|rlsd2|misc] set distro

  -U, --update                update this program to latest version
  -V, --version               display version
  -v, --verbose               turn on verbose mode
  -q, --quiet                 suppress non-error messages
  -h, --help                  show this message and exit

```

## Some useful commands are:
- static-get --search \<empty\>
  - list all packages available
- static-get \<package\>
  - downloads a package (doesn't install)
- static-get -i \<package\>
  - installs a package (doesn't download)