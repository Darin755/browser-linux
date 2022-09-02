## The Shared Filesystem (9pfs)
- The rootfs.iso mounts 9pfs on ```/home```. All of the users data is stored in the shared filesystem. See [fstab](https://github.com/Darin755/browser-buildroot/blob/027e856888d50bbc7008b50221be0323cf46a128/standard/board/browser_linux/rootfs_overlay/etc/fstab#L9)
- The minimal.iso does not mount on boot. You can easily mount it with ```sudo mount -t 9p host9p /mnt```
### Uploading Files
- You can upload files with the *upload files* button. See [toolbox.md](docs/toolbox.md)
- The file upload is hard coded to save uploaded files to ```/user```. If there is a file with the same name it will be **overwritten** without any warning.