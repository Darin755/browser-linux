## The Shared Filesystem (9pfs)
- The rootfs.iso mounts 9pfs on ```/home```. All of the users data is stored in the shared filesystem. See [fstab](https://github.com/Darin755/browser-buildroot/blob/027e856888d50bbc7008b50221be0323cf46a128/standard/board/browser_linux/rootfs_overlay/etc/fstab#L9)
- The minimal.iso does not mount on boot. You can easily mount it with ```sudo mount -t 9p host9p /mnt```
### Uploading Files
- You can upload files with the *upload files* button. See [toolbox.md](toolbox.md)
- The path for the file uploads is in the mounted 9p filesystem. This means you need to remove the mount path from the upload location. (If it is mounted at ```/home``` and you wanted to upload to ```/home/user``` you would need to use ```user```)