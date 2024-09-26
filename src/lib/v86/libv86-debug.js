;(function(){'use strict';
var $LOG_NAMES$$ = [[1, ""], [2, "CPU"], [32768, "DISK"], [4, "FPU"], [8, "MEM"], [16, "DMA"], [32, "IO"], [64, "PS2"], [128, "PIC"], [256, "VGA"], [512, "PIT"], [1024, "MOUS"], [2048, "PCI"], [4096, "BIOS"], [8192, "FLOP"], [16384, "SERI"], [65536, "RTC"], [262144, "ACPI"], [524288, "APIC"], [1048576, "NET"], [2097152, "VIO"], [4194304, "9P"], [8388608, "SB16"], [16777216, "FETC"], ];
function $ScreenAdapter$$($options$jscomp$34$$, $charmap_high_screen_fill_buffer$$) {
  function $number_as_color$$($n$jscomp$2$$) {
    $n$jscomp$2$$ = $n$jscomp$2$$.toString(16);
    return "#" + "0".repeat(6 - $n$jscomp$2$$.length) + $n$jscomp$2$$;
  }
  function $elem_set_scale$$($elem$jscomp$1$$, $scale_x$jscomp$1$$, $scale_y$jscomp$1$$, $device_pixel_ratio_use_scale$$) {
    $elem$jscomp$1$$.style.width = "";
    $elem$jscomp$1$$.style.height = "";
    $device_pixel_ratio_use_scale$$ && ($elem$jscomp$1$$.style.transform = "");
    var $rectangle$$ = $elem$jscomp$1$$.getBoundingClientRect();
    $device_pixel_ratio_use_scale$$ ? $elem$jscomp$1$$.style.transform = (1 === $scale_x$jscomp$1$$ ? "" : " scaleX(" + $scale_x$jscomp$1$$ + ")") + (1 === $scale_y$jscomp$1$$ ? "" : " scaleY(" + $scale_y$jscomp$1$$ + ")") : (0 === $scale_x$jscomp$1$$ % 1 && 0 === $scale_y$jscomp$1$$ % 1 ? ($graphic_screen$$.style.imageRendering = "crisp-edges", $graphic_screen$$.style.imageRendering = "pixelated", $graphic_screen$$.style["-ms-interpolation-mode"] = "nearest-neighbor") : ($graphic_screen$$.style.imageRendering = 
    "", $graphic_screen$$.style["-ms-interpolation-mode"] = ""), $device_pixel_ratio_use_scale$$ = window.devicePixelRatio || 1, 0 !== $device_pixel_ratio_use_scale$$ % 1 && ($scale_x$jscomp$1$$ /= $device_pixel_ratio_use_scale$$, $scale_y$jscomp$1$$ /= $device_pixel_ratio_use_scale$$));
    1 !== $scale_x$jscomp$1$$ && ($elem$jscomp$1$$.style.width = $rectangle$$.width * $scale_x$jscomp$1$$ + "px");
    1 !== $scale_y$jscomp$1$$ && ($elem$jscomp$1$$.style.height = $rectangle$$.height * $scale_y$jscomp$1$$ + "px");
  }
  var $charmap_low_screen_container$$ = $options$jscomp$34$$.container;
  this.screen_fill_buffer = $charmap_high_screen_fill_buffer$$;
  console.assert($charmap_low_screen_container$$, "options.container must be provided");
  var $graphic_screen$$ = $charmap_low_screen_container$$.getElementsByTagName("canvas")[0], $graphic_context$$ = $graphic_screen$$.getContext("2d", {alpha:!1}), $text_screen$$ = $charmap_low_screen_container$$.getElementsByTagName("div")[0], $cursor_element$$ = document.createElement("div"), $cursor_row$$, $cursor_col$$, $scale_x$$ = 1, $scale_y$$ = 1, $base_scale$$ = 1, $changed_rows$$, $is_graphical$$ = !!$options$jscomp$34$$.use_graphical_text, $text_mode_data$$, $text_mode_width$$, $text_mode_height$$, 
  $stopped$$ = !1, $paused$$ = !1;
  $charmap_high_screen_fill_buffer$$ = new Uint16Array([8962, 199, 252, 233, 226, 228, 224, 229, 231, 234, 235, 232, 239, 238, 236, 196, 197, 201, 230, 198, 244, 246, 242, 251, 249, 255, 214, 220, 162, 163, 165, 8359, 402, 225, 237, 243, 250, 241, 209, 170, 186, 191, 8976, 172, 189, 188, 161, 171, 187, 9617, 9618, 9619, 9474, 9508, 9569, 9570, 9558, 9557, 9571, 9553, 9559, 9565, 9564, 9563, 9488, 9492, 9524, 9516, 9500, 9472, 9532, 9566, 9567, 9562, 9556, 9577, 9574, 9568, 9552, 9580, 9575, 9576, 
  9572, 9573, 9561, 9560, 9554, 9555, 9579, 9578, 9496, 9484, 9608, 9604, 9612, 9616, 9600, 945, 223, 915, 960, 931, 963, 181, 964, 934, 920, 937, 948, 8734, 966, 949, 8745, 8801, 177, 8805, 8804, 8992, 8993, 247, 8776, 176, 8729, 183, 8730, 8319, 178, 9632, 160]);
  $charmap_low_screen_container$$ = new Uint16Array([32, 9786, 9787, 9829, 9830, 9827, 9824, 8226, 9688, 9675, 9689, 9794, 9792, 9834, 9835, 9788, 9658, 9668, 8597, 8252, 182, 167, 9644, 8616, 8593, 8595, 8594, 8592, 8735, 8596, 9650, 9660]);
  for (var $charmap$$ = [], $chr$$, $i$jscomp$3$$ = 0; 256 > $i$jscomp$3$$; $i$jscomp$3$$++) {
    $chr$$ = 126 < $i$jscomp$3$$ ? $charmap_high_screen_fill_buffer$$[$i$jscomp$3$$ - 127] : 32 > $i$jscomp$3$$ ? $charmap_low_screen_container$$[$i$jscomp$3$$] : $i$jscomp$3$$, $charmap$$[$i$jscomp$3$$] = String.fromCharCode($chr$$);
  }
  $graphic_context$$.imageSmoothingEnabled = !1;
  $cursor_element$$.classList.add("cursor");
  $cursor_element$$.style.position = "absolute";
  $cursor_element$$.style.backgroundColor = "#ccc";
  $cursor_element$$.style.width = "7px";
  $cursor_element$$.style.display = "inline-block";
  $text_screen$$.style.display = "block";
  $graphic_screen$$.style.display = "none";
  this.init = function() {
    this.set_mode($is_graphical$$);
    $is_graphical$$ ? this.set_size_graphical(720, 400, 720, 400) : this.set_size_text(80, 25);
    this.timer();
  };
  this.make_screenshot = function() {
    const $image$jscomp$3$$ = new Image;
    if ($is_graphical$$) {
      $image$jscomp$3$$.src = $graphic_screen$$.toDataURL("image/png");
    } else {
      const $char_size$$ = [9, 16], $canvas$$ = document.createElement("canvas");
      $canvas$$.width = $text_mode_width$$ * $char_size$$[0];
      $canvas$$.height = $text_mode_height$$ * $char_size$$[1];
      const $context$jscomp$2$$ = $canvas$$.getContext("2d");
      $context$jscomp$2$$.imageSmoothingEnabled = !1;
      $context$jscomp$2$$.font = window.getComputedStyle($text_screen$$).font;
      $context$jscomp$2$$.textBaseline = "top";
      for (let $y$jscomp$73$$ = 0; $y$jscomp$73$$ < $text_mode_height$$; $y$jscomp$73$$++) {
        for (let $x$jscomp$88$$ = 0; $x$jscomp$88$$ < $text_mode_width$$; $x$jscomp$88$$++) {
          const $index$jscomp$73$$ = 4 * ($y$jscomp$73$$ * $text_mode_width$$ + $x$jscomp$88$$), $character$$ = $text_mode_data$$[$index$jscomp$73$$ + 0], $fg_color$$ = $text_mode_data$$[$index$jscomp$73$$ + 3];
          $context$jscomp$2$$.fillStyle = $number_as_color$$($text_mode_data$$[$index$jscomp$73$$ + 2]);
          $context$jscomp$2$$.fillRect($x$jscomp$88$$ * $char_size$$[0], $y$jscomp$73$$ * $char_size$$[1], $char_size$$[0], $char_size$$[1]);
          $context$jscomp$2$$.fillStyle = $number_as_color$$($fg_color$$);
          $context$jscomp$2$$.fillText($charmap$$[$character$$], $x$jscomp$88$$ * $char_size$$[0], $y$jscomp$73$$ * $char_size$$[1]);
        }
      }
      "none" !== $cursor_element$$.style.display && $cursor_row$$ < $text_mode_height$$ && $cursor_col$$ < $text_mode_width$$ && ($context$jscomp$2$$.fillStyle = $cursor_element$$.style.backgroundColor, $context$jscomp$2$$.fillRect($cursor_col$$ * $char_size$$[0], $cursor_row$$ * $char_size$$[1] + parseInt($cursor_element$$.style.marginTop, 10), parseInt($cursor_element$$.style.width, 10), parseInt($cursor_element$$.style.height, 10)));
      $image$jscomp$3$$.src = $canvas$$.toDataURL("image/png");
    }
    return $image$jscomp$3$$;
  };
  this.put_char = function($row$$, $col_p$$, $chr$jscomp$1$$, $blinking$$, $bg_color$jscomp$1$$, $fg_color$jscomp$1$$) {
    $dbg_assert$$(0 <= $row$$ && $row$$ < $text_mode_height$$);
    $dbg_assert$$(0 <= $col_p$$ && $col_p$$ < $text_mode_width$$);
    $dbg_assert$$(0 <= $chr$jscomp$1$$ && 256 > $chr$jscomp$1$$);
    $col_p$$ = 4 * ($row$$ * $text_mode_width$$ + $col_p$$);
    $text_mode_data$$[$col_p$$ + 0] = $chr$jscomp$1$$;
    $text_mode_data$$[$col_p$$ + 1] = $blinking$$;
    $text_mode_data$$[$col_p$$ + 2] = $bg_color$jscomp$1$$;
    $text_mode_data$$[$col_p$$ + 3] = $fg_color$jscomp$1$$;
    $changed_rows$$[$row$$] = 1;
  };
  this.timer = function() {
    $stopped$$ || requestAnimationFrame(() => $is_graphical$$ ? this.update_graphical() : this.update_text());
  };
  this.update_text = function() {
    for (var $i$jscomp$4$$ = 0; $i$jscomp$4$$ < $text_mode_height$$; $i$jscomp$4$$++) {
      $changed_rows$$[$i$jscomp$4$$] && (this.text_update_row($i$jscomp$4$$), $changed_rows$$[$i$jscomp$4$$] = 0);
    }
    this.timer();
  };
  this.update_graphical = function() {
    $paused$$ || this.screen_fill_buffer();
    this.timer();
  };
  this.destroy = function() {
    $stopped$$ = !0;
  };
  this.pause = function() {
    $paused$$ = !0;
    $cursor_element$$.classList.remove("blinking-cursor");
  };
  this.continue = function() {
    $paused$$ = !1;
    $cursor_element$$.classList.add("blinking-cursor");
  };
  this.set_mode = function($graphical$$) {
    ($is_graphical$$ = $graphical$$) ? ($text_screen$$.style.display = "none", $graphic_screen$$.style.display = "block") : ($text_screen$$.style.display = "block", $graphic_screen$$.style.display = "none");
  };
  this.clear_screen = function() {
    $graphic_context$$.fillStyle = "#000";
    $graphic_context$$.fillRect(0, 0, $graphic_screen$$.width, $graphic_screen$$.height);
  };
  this.set_size_text = function($cols_i$jscomp$5$$, $rows$$) {
    if ($cols_i$jscomp$5$$ !== $text_mode_width$$ || $rows$$ !== $text_mode_height$$) {
      $changed_rows$$ = new Int8Array($rows$$);
      $text_mode_data$$ = new Int32Array($cols_i$jscomp$5$$ * $rows$$ * 4);
      $text_mode_width$$ = $cols_i$jscomp$5$$;
      for ($text_mode_height$$ = $rows$$; $text_screen$$.childNodes.length > $rows$$;) {
        $text_screen$$.removeChild($text_screen$$.firstChild);
      }
      for (; $text_screen$$.childNodes.length < $rows$$;) {
        $text_screen$$.appendChild(document.createElement("div"));
      }
      for ($cols_i$jscomp$5$$ = 0; $cols_i$jscomp$5$$ < $rows$$; $cols_i$jscomp$5$$++) {
        this.text_update_row($cols_i$jscomp$5$$);
      }
      $elem_set_scale$$($text_screen$$, $scale_x$$, $scale_y$$, !0);
    }
  };
  this.set_size_graphical = function($width$jscomp$28$$, $height$jscomp$25$$) {
    $graphic_screen$$.style.display = "block";
    $graphic_screen$$.width = $width$jscomp$28$$;
    $graphic_screen$$.height = $height$jscomp$25$$;
    $graphic_context$$.imageSmoothingEnabled = !1;
    $base_scale$$ = !$options$jscomp$34$$.disable_autoscale && 640 >= $width$jscomp$28$$ && 2 * $width$jscomp$28$$ < window.innerWidth * window.devicePixelRatio && 2 * $height$jscomp$25$$ < window.innerHeight * window.devicePixelRatio ? 2 : 1;
    $elem_set_scale$$($graphic_screen$$, $scale_x$$ * $base_scale$$, $scale_y$$ * $base_scale$$, !1);
  };
  this.set_scale = function($s_x$$, $s_y$$) {
    $scale_x$$ = $s_x$$;
    $scale_y$$ = $s_y$$;
    $elem_set_scale$$($text_screen$$, $scale_x$$, $scale_y$$, !0);
    $elem_set_scale$$($graphic_screen$$, $scale_x$$ * $base_scale$$, $scale_y$$ * $base_scale$$, !1);
  };
  this.set_scale($scale_x$$, $scale_y$$);
  this.update_cursor_scanline = function($start$jscomp$13$$, $end$jscomp$9$$, $visible$$) {
    $visible$$ ? ($cursor_element$$.style.display = "inline", $cursor_element$$.style.height = $end$jscomp$9$$ - $start$jscomp$13$$ + "px", $cursor_element$$.style.marginTop = $start$jscomp$13$$ + "px") : $cursor_element$$.style.display = "none";
  };
  this.update_cursor = function($row$jscomp$1$$, $col$jscomp$1$$) {
    if ($row$jscomp$1$$ !== $cursor_row$$ || $col$jscomp$1$$ !== $cursor_col$$) {
      $row$jscomp$1$$ < $text_mode_height$$ && ($changed_rows$$[$row$jscomp$1$$] = 1), $cursor_row$$ < $text_mode_height$$ && ($changed_rows$$[$cursor_row$$] = 1), $cursor_row$$ = $row$jscomp$1$$, $cursor_col$$ = $col$jscomp$1$$;
    }
  };
  this.text_update_row = function($row$jscomp$2$$) {
    var $offset$jscomp$26$$ = 4 * $row$jscomp$2$$ * $text_mode_width$$, $text$jscomp$10$$;
    var $row_element$$ = $text_screen$$.childNodes[$row$jscomp$2$$];
    var $fragment$$ = document.createElement("div");
    for (var $i$jscomp$6$$ = 0; $i$jscomp$6$$ < $text_mode_width$$;) {
      var $color_element$$ = document.createElement("span");
      var $blinking$jscomp$1$$ = $text_mode_data$$[$offset$jscomp$26$$ + 1];
      var $bg_color$jscomp$2$$ = $text_mode_data$$[$offset$jscomp$26$$ + 2];
      var $fg_color$jscomp$2$$ = $text_mode_data$$[$offset$jscomp$26$$ + 3];
      $blinking$jscomp$1$$ && $color_element$$.classList.add("blink");
      $color_element$$.style.backgroundColor = $number_as_color$$($bg_color$jscomp$2$$);
      $color_element$$.style.color = $number_as_color$$($fg_color$jscomp$2$$);
      for ($text$jscomp$10$$ = ""; $i$jscomp$6$$ < $text_mode_width$$ && $text_mode_data$$[$offset$jscomp$26$$ + 1] === $blinking$jscomp$1$$ && $text_mode_data$$[$offset$jscomp$26$$ + 2] === $bg_color$jscomp$2$$ && $text_mode_data$$[$offset$jscomp$26$$ + 3] === $fg_color$jscomp$2$$;) {
        var $ascii$$ = $text_mode_data$$[$offset$jscomp$26$$ + 0];
        $text$jscomp$10$$ += $charmap$$[$ascii$$];
        $dbg_assert$$($charmap$$[$ascii$$]);
        $i$jscomp$6$$++;
        $offset$jscomp$26$$ += 4;
        if ($row$jscomp$2$$ === $cursor_row$$) {
          if ($i$jscomp$6$$ === $cursor_col$$) {
            break;
          } else {
            if ($i$jscomp$6$$ === $cursor_col$$ + 1) {
              $cursor_element$$.style.backgroundColor = $color_element$$.style.color;
              $fragment$$.appendChild($cursor_element$$);
              break;
            }
          }
        }
      }
      $color_element$$.textContent = $text$jscomp$10$$;
      $fragment$$.appendChild($color_element$$);
    }
    $row_element$$.parentNode.replaceChild($fragment$$, $row_element$$);
  };
  this.update_buffer = function($layers$$) {
    for (const $layer$jscomp$3$$ of $layers$$) {
      $graphic_context$$.putImageData($layer$jscomp$3$$.image_data, $layer$jscomp$3$$.screen_x - $layer$jscomp$3$$.buffer_x, $layer$jscomp$3$$.screen_y - $layer$jscomp$3$$.buffer_y, $layer$jscomp$3$$.buffer_x, $layer$jscomp$3$$.buffer_y, $layer$jscomp$3$$.buffer_width, $layer$jscomp$3$$.buffer_height);
    }
  };
  this.get_text_screen = function() {
    for (var $screen$jscomp$1$$ = [], $i$jscomp$7$$ = 0; $i$jscomp$7$$ < $text_mode_height$$; $i$jscomp$7$$++) {
      $screen$jscomp$1$$.push(this.get_text_row($i$jscomp$7$$));
    }
    return $screen$jscomp$1$$;
  };
  this.get_text_row = function($y$jscomp$74$$) {
    let $result$jscomp$1$$ = "";
    for (let $x$jscomp$89$$ = 0; $x$jscomp$89$$ < $text_mode_width$$; $x$jscomp$89$$++) {
      $result$jscomp$1$$ += String.fromCharCode($text_mode_data$$[4 * ($y$jscomp$74$$ * $text_mode_width$$ + $x$jscomp$89$$)]);
    }
    return $result$jscomp$1$$;
  };
  this.init();
}
;const $P9_LOCK_TYPES$$ = ["shared", "exclusive", "unlock"];
function $Virtio9p$$($filesystem$$, $cpu$$, $bus$$) {
  this.fs = $filesystem$$;
  this.bus = $bus$$;
  this.configspace_tagname = [104, 111, 115, 116, 57, 112];
  this.configspace_taglen = this.configspace_tagname.length;
  this.VERSION = "9P2000.L";
  this.msize = this.BLOCKSIZE = 8192;
  this.replybuffer = new Uint8Array(2 * this.msize);
  this.replybuffersize = 0;
  this.fids = [];
  this.virtio = new $VirtIO$$($cpu$$, {name:"virtio-9p", pci_id:48, device_id:4169, subsystem_device_id:9, common:{initial_port:43008, queues:[{size_supported:32, notify_offset:0, }, ], features:[0, 32, 29, 28, ], on_driver_ok:() => {
  }, }, notification:{initial_port:43264, single_handler:!1, handlers:[$bufchain_queue_id$$ => {
    if (0 !== $bufchain_queue_id$$) {
      $dbg_assert$$(!1, "Virtio9P Notified for non-existent queue: " + $bufchain_queue_id$$ + " (expected queue_id of 0)");
    } else {
      for (; this.virtqueue.has_request();) {
        $bufchain_queue_id$$ = this.virtqueue.pop_request(), this.ReceiveRequest($bufchain_queue_id$$);
      }
      this.virtqueue.notify_me_after(0);
    }
  }, ], }, isr_status:{initial_port:42752, }, device_specific:{initial_port:42496, struct:[{bytes:2, name:"mount tag length", read:() => this.configspace_taglen, write:() => {
  }, }, ].concat($v86util$$.range(254).map($index$jscomp$75$$ => ({bytes:1, name:"mount tag name " + $index$jscomp$75$$, read:() => this.configspace_tagname[$index$jscomp$75$$] || 0, write:() => {
  }, }))), }, });
  this.virtqueue = this.virtio.queues[0];
}
$Virtio9p$$.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.configspace_tagname;
  $state$$[1] = this.configspace_taglen;
  $state$$[2] = this.virtio;
  $state$$[3] = this.VERSION;
  $state$$[4] = this.BLOCKSIZE;
  $state$$[5] = this.msize;
  $state$$[6] = this.replybuffer;
  $state$$[7] = this.replybuffersize;
  $state$$[8] = this.fids.map(function($f$jscomp$1$$) {
    return [$f$jscomp$1$$.inodeid, $f$jscomp$1$$.type, $f$jscomp$1$$.uid, $f$jscomp$1$$.dbg_name];
  });
  $state$$[9] = this.fs;
  return $state$$;
};
$Virtio9p$$.prototype.set_state = function($state$jscomp$1$$) {
  this.configspace_tagname = $state$jscomp$1$$[0];
  this.configspace_taglen = $state$jscomp$1$$[1];
  this.virtio.set_state($state$jscomp$1$$[2]);
  this.virtqueue = this.virtio.queues[0];
  this.VERSION = $state$jscomp$1$$[3];
  this.BLOCKSIZE = $state$jscomp$1$$[4];
  this.msize = $state$jscomp$1$$[5];
  this.replybuffer = $state$jscomp$1$$[6];
  this.replybuffersize = $state$jscomp$1$$[7];
  this.fids = $state$jscomp$1$$[8].map(function($f$jscomp$2$$) {
    return {inodeid:$f$jscomp$2$$[0], type:$f$jscomp$2$$[1], uid:$f$jscomp$2$$[2], dbg_name:$f$jscomp$2$$[3]};
  });
  this.fs.set_state($state$jscomp$1$$[9]);
};
$Virtio9p$$.prototype.Createfid = function($inodeid$$, $type$jscomp$148$$, $uid$$, $dbg_name$$) {
  return {inodeid:$inodeid$$, type:$type$jscomp$148$$, uid:$uid$$, dbg_name:$dbg_name$$};
};
$Virtio9p$$.prototype.update_dbg_name = function($idx$$, $newname$$) {
  for (const $fid$$ of this.fids) {
    $fid$$.inodeid === $idx$$ && ($fid$$.dbg_name = $newname$$);
  }
};
$Virtio9p$$.prototype.reset = function() {
  this.fids = [];
  this.virtio.reset();
};
$Virtio9p$$.prototype.BuildReply = function($id$jscomp$5$$, $tag$jscomp$1$$, $payloadsize$$) {
  $dbg_assert$$(0 <= $payloadsize$$, "9P: Negative payload size");
  $marshall$$.Marshall(["w", "b", "h"], [$payloadsize$$ + 7, $id$jscomp$5$$ + 1, $tag$jscomp$1$$], this.replybuffer, 0);
  $payloadsize$$ + 7 >= this.replybuffer.length && $message$$.Debug("Error in 9p: payloadsize exceeds maximum length");
  this.replybuffersize = $payloadsize$$ + 7;
};
$Virtio9p$$.prototype.SendError = function($tag$jscomp$2$$, $errormsg_size$jscomp$21$$, $errorcode$$) {
  $errormsg_size$jscomp$21$$ = $marshall$$.Marshall(["w"], [$errorcode$$], this.replybuffer, 7);
  this.BuildReply(6, $tag$jscomp$2$$, $errormsg_size$jscomp$21$$);
};
$Virtio9p$$.prototype.SendReply = function($bufchain$jscomp$1$$) {
  $dbg_assert$$(0 <= this.replybuffersize, "9P: Negative replybuffersize");
  $bufchain$jscomp$1$$.set_next_blob(this.replybuffer.subarray(0, this.replybuffersize));
  this.virtqueue.push_reply($bufchain$jscomp$1$$);
  this.virtqueue.flush_replies();
};
$Virtio9p$$.prototype.ReceiveRequest = async function($bufchain$jscomp$2$$) {
  var $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = new Uint8Array($bufchain$jscomp$2$$.length_readable);
  $bufchain$jscomp$2$$.get_next_blob($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
  var $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = {offset:0}, $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "b", "h"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$), $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 
  $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0], $id$jscomp$6$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1], $tag$jscomp$3$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
  switch($id$jscomp$6$$) {
    case 8:
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = this.fs.GetTotalSize();
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fs.GetSpace();
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = [16914839];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] = this.BLOCKSIZE;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2] = Math.floor($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ / $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3] = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2] - Math.floor($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ / $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4] = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2] - Math.floor($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ / $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[5] = this.fs.CountUsedInodes();
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[6] = this.fs.CountFreeInodes();
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[7] = 0;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[8] = 256;
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $marshall$$.Marshall("wwddddddw".split(""), $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 112:
    case 12:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      var $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $message$$.Debug("[open] fid=" + $fid$jscomp$1$$ + ", mode=" + $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fids[$fid$jscomp$1$$].inodeid;
      var $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $message$$.Debug("file open " + this.fids[$fid$jscomp$1$$].dbg_name);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = this.fs.OpenInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      this.fs.AddEvent(this.fids[$fid$jscomp$1$$].inodeid, function() {
        $message$$.Debug("file opened " + this.fids[$fid$jscomp$1$$].dbg_name + " tag:" + $tag$jscomp$3$$);
        var $req$jscomp$1$$ = [];
        $req$jscomp$1$$[0] = $inode$$.qid;
        $req$jscomp$1$$[1] = this.msize - 24;
        $marshall$$.Marshall(["Q", "w"], $req$jscomp$1$$, this.replybuffer, 7);
        this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 17);
        this.SendReply($bufchain$jscomp$2$$);
      }.bind(this));
      break;
    case 70:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $message$$.Debug("[link] dfid=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = this.fs.Link(this.fids[$buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$].inodeid, this.fids[$fid$jscomp$1$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      if (0 > $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "";
        -1 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "Operation not permitted" : ($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 
        "Unknown error: " + -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, $dbg_assert$$(!1, "[link]: Unexpected error code: " + -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$));
        this.SendError($tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      }
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 16:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "s", "s", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3];
      $message$$.Debug("[symlink] fid=" + $fid$jscomp$1$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + ", symgt=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ + ", gid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fs.CreateSymlink($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, this.fids[$fid$jscomp$1$$].inodeid, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $inode$$.uid = this.fids[$fid$jscomp$1$$].uid;
      $inode$$.gid = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$;
      $marshall$$.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 13);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 18:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall("wswwww".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3];
      var $count$jscomp$39_minor_nwfid$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[5];
      $message$$.Debug("[mknod] fid=" + $fid$jscomp$1$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + ", major=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ + ", minor=" + $count$jscomp$39_minor_nwfid$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fs.CreateNode($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, this.fids[$fid$jscomp$1$$].inodeid, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $count$jscomp$39_minor_nwfid$$);
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $inode$$.mode = $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$;
      $inode$$.uid = this.fids[$fid$jscomp$1$$].uid;
      $inode$$.gid = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$;
      $marshall$$.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 13);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 22:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $inode$$ = this.fs.GetInode(this.fids[$fid$jscomp$1$$].inodeid);
      $message$$.Debug("[readlink] fid=" + $fid$jscomp$1$$ + " name=" + this.fids[$fid$jscomp$1$$].dbg_name + " target=" + $inode$$.symlink);
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $marshall$$.Marshall(["s"], [$inode$$.symlink], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 72:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "s", "w", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3];
      $message$$.Debug("[mkdir] fid=" + $fid$jscomp$1$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + ", mode=" + $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ + ", gid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fs.CreateDirectory($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, this.fids[$fid$jscomp$1$$].inodeid);
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $inode$$.mode = $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ | $S_IFDIR$$;
      $inode$$.uid = this.fids[$fid$jscomp$1$$].uid;
      $inode$$.gid = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$;
      $marshall$$.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 13);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 14:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "s", "w", "w", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4];
      this.bus.send("9p-create", [$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, this.fids[$fid$jscomp$1$$].inodeid]);
      $message$$.Debug("[create] fid=" + $fid$jscomp$1$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + ", flags=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ + ", mode=" + $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ + ", gid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fs.CreateFile($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, this.fids[$fid$jscomp$1$$].inodeid);
      this.fids[$fid$jscomp$1$$].inodeid = $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$;
      this.fids[$fid$jscomp$1$$].type = 1;
      this.fids[$fid$jscomp$1$$].dbg_name = $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$;
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $inode$$.uid = this.fids[$fid$jscomp$1$$].uid;
      $inode$$.gid = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$;
      $inode$$.mode = $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ | $S_IFREG$$;
      $marshall$$.Marshall(["Q", "w"], [$inode$$.qid, this.msize - 24], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 17);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 52:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall("wbwddws".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 0 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4] ? Infinity : $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = this.fs.DescribeLock($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1], $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3], $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, 
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[5], $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[6]);
      $message$$.Debug("[lock] fid=" + $fid$jscomp$1$$ + ", type=" + $P9_LOCK_TYPES$$[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.type] + ", start=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.start + ", length=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.length + 
      ", proc_id=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.proc_id);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = this.fs.Lock(this.fids[$fid$jscomp$1$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $marshall$$.Marshall(["b"], [$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 1);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 54:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall("wbddws".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 0 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3] ? Infinity : $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = this.fs.DescribeLock($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1], $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2], $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, 
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4], $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[5]);
      $message$$.Debug("[getlock] fid=" + $fid$jscomp$1$$ + ", type=" + $P9_LOCK_TYPES$$[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.type] + ", start=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.start + ", length=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.length + 
      ", proc_id=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.proc_id);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = this.fs.GetLock(this.fids[$fid$jscomp$1$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ || ($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$.type = 
      2);
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $marshall$$.Marshall(["b", "d", "d", "w", "s"], [$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$.type, $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$.start, Infinity === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$.length ? 
      0 : $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$.length, $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$.proc_id, $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$.client_id], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 24:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "d"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $inode$$ = this.fs.GetInode(this.fids[$fid$jscomp$1$$].inodeid);
      $message$$.Debug("[getattr]: fid=" + $fid$jscomp$1$$ + " name=" + this.fids[$fid$jscomp$1$$].dbg_name + " request mask=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1]);
      if (!$inode$$ || $inode$$.status === $STATUS_UNLINKED$$) {
        $message$$.Debug("getattr: unlinked");
        this.SendError($tag$jscomp$3$$, "No such file or directory", 2);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      }
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0] = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] = $inode$$.qid;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2] = $inode$$.mode;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3] = $inode$$.uid;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4] = $inode$$.gid;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[5] = $inode$$.nlinks;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[6] = $inode$$.major << 8 | $inode$$.minor;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[7] = $inode$$.size;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[8] = this.BLOCKSIZE;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[9] = Math.floor($inode$$.size / 512 + 1);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[10] = $inode$$.atime;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[11] = 0;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[12] = $inode$$.mtime;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[13] = 0;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[14] = $inode$$.ctime;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[15] = 0;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[16] = 0;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[17] = 0;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[18] = 0;
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[19] = 0;
      $marshall$$.Marshall("dQwwwddddddddddddddd".split(""), $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 153);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 26:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall("wwwwwddddd".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $inode$$ = this.fs.GetInode(this.fids[$fid$jscomp$1$$].inodeid);
      $message$$.Debug("[setattr]: fid=" + $fid$jscomp$1$$ + " request mask=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] + " name=" + this.fids[$fid$jscomp$1$$].dbg_name);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 1 && ($inode$$.mode = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 2 && ($inode$$.uid = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 4 && ($inode$$.gid = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 16 && ($inode$$.atime = Math.floor((new Date).getTime() / 1000));
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 32 && ($inode$$.mtime = Math.floor((new Date).getTime() / 1000));
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 64 && ($inode$$.ctime = Math.floor((new Date).getTime() / 1000));
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 128 && ($inode$$.atime = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[6]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 256 && ($inode$$.mtime = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[8]);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] & 8 && await this.fs.ChangeSize(this.fids[$fid$jscomp$1$$].inodeid, $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[5]);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 50:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "d"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 40:
    case 116:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "d", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $count$jscomp$39_minor_nwfid$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $inode$$ = this.fs.GetInode(this.fids[$fid$jscomp$1$$].inodeid);
      40 === $id$jscomp$6$$ && $message$$.Debug("[treaddir]: fid=" + $fid$jscomp$1$$ + " offset=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + " count=" + $count$jscomp$39_minor_nwfid$$);
      116 === $id$jscomp$6$$ && $message$$.Debug("[read]: fid=" + $fid$jscomp$1$$ + " (" + this.fids[$fid$jscomp$1$$].dbg_name + ") offset=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + " count=" + $count$jscomp$39_minor_nwfid$$ + " fidtype=" + this.fids[$fid$jscomp$1$$].type);
      if (!$inode$$ || $inode$$.status === $STATUS_UNLINKED$$) {
        $message$$.Debug("read/treaddir: unlinked");
        this.SendError($tag$jscomp$3$$, "No such file or directory", 2);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      }
      if (2 === this.fids[$fid$jscomp$1$$].type) {
        for ($inode$$.caps.length < $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + $count$jscomp$39_minor_nwfid$$ && ($count$jscomp$39_minor_nwfid$$ = $inode$$.caps.length - $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$), $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = 
        0; $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ < $count$jscomp$39_minor_nwfid$$; $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$++) {
          this.replybuffer[11 + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$] = $inode$$.caps[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$];
        }
      } else {
        this.fs.OpenInode(this.fids[$fid$jscomp$1$$].inodeid, void 0), $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = this.fids[$fid$jscomp$1$$].inodeid, $count$jscomp$39_minor_nwfid$$ = Math.min($count$jscomp$39_minor_nwfid$$, this.replybuffer.length - 11), $inode$$.size < $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + 
        $count$jscomp$39_minor_nwfid$$ ? $count$jscomp$39_minor_nwfid$$ = $inode$$.size - $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ : 40 === $id$jscomp$6$$ && ($count$jscomp$39_minor_nwfid$$ = this.fs.RoundToDirentry($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + 
        $count$jscomp$39_minor_nwfid$$) - $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$), $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ > $inode$$.size && ($count$jscomp$39_minor_nwfid$$ = 0), this.bus.send("9p-read-start", [this.fids[$fid$jscomp$1$$].dbg_name]), 
        $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = await this.fs.Read($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, $count$jscomp$39_minor_nwfid$$), this.bus.send("9p-read-end", 
        [this.fids[$fid$jscomp$1$$].dbg_name, $count$jscomp$39_minor_nwfid$$]), $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ && this.replybuffer.set($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, 11);
      }
      $marshall$$.Marshall(["w"], [$count$jscomp$39_minor_nwfid$$], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 4 + $count$jscomp$39_minor_nwfid$$);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 118:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "d", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $count$jscomp$39_minor_nwfid$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = this.fids[$fid$jscomp$1$$].dbg_name;
      $message$$.Debug("[write]: fid=" + $fid$jscomp$1$$ + " (" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ + ") offset=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + " count=" + $count$jscomp$39_minor_nwfid$$ + " fidtype=" + this.fids[$fid$jscomp$1$$].type);
      if (2 === this.fids[$fid$jscomp$1$$].type) {
        this.SendError($tag$jscomp$3$$, "Setxattr not supported", 95);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      } else {
        await this.fs.Write(this.fids[$fid$jscomp$1$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, $count$jscomp$39_minor_nwfid$$, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$.subarray($attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$.offset));
      }
      this.bus.send("9p-write-end", [$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, $count$jscomp$39_minor_nwfid$$]);
      $marshall$$.Marshall(["w"], [$count$jscomp$39_minor_nwfid$$], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 4);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 74:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "s", "w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3];
      $message$$.Debug("[renameat]: oldname=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ + " newname=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = await this.fs.Rename(this.fids[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$].inodeid, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, this.fids[$attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$].inodeid, 
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
      if (0 > $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "";
        -2 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "No such file or directory" : -1 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 
        "Operation not permitted" : -39 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "Directory not empty" : ($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 
        "Unknown error: " + -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, $dbg_assert$$(!1, "[renameat]: Unexpected error code: " + -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$));
        this.SendError($tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      }
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 76:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "s", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $message$$.Debug("[unlink]: dirfd=" + $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ + " name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + " flags=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      $fid$jscomp$1$$ = this.fs.Search(this.fids[$attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      if (-1 === $fid$jscomp$1$$) {
        this.SendError($tag$jscomp$3$$, "No such file or directory", 2);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      }
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = this.fs.Unlink(this.fids[$attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      if (0 > $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "";
        -39 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "Directory not empty" : -1 === $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 
        "Operation not permitted" : ($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = "Unknown error: " + -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$, $dbg_assert$$(!1, "[unlink]: Unexpected error code: " + -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$));
        this.SendError($tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, -$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      }
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 100:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $message$$.Debug("[version]: msize=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0] + " version=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1]);
      this.msize !== $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0] && (this.msize = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0], this.replybuffer = new Uint8Array(Math.min(16777216, 2 * this.msize)));
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $marshall$$.Marshall(["w", "s"], [this.msize, this.VERSION], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 104:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "w", "s", "s", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[4];
      $message$$.Debug("[attach]: fid=" + $fid$jscomp$1$$ + " afid=" + $h$$($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1]) + " uname=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2] + " aname=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3]);
      this.fids[$fid$jscomp$1$$] = this.Createfid(0, 1, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, "");
      $inode$$ = this.fs.GetInode(this.fids[$fid$jscomp$1$$].inodeid);
      $marshall$$.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 13);
      this.SendReply($bufchain$jscomp$2$$);
      this.bus.send("9p-attach");
      break;
    case 108:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["h"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $message$$.Debug("[flush] " + $tag$jscomp$3$$);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 110:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "w", "h"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $count$jscomp$39_minor_nwfid$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      var $nwname$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $message$$.Debug("[walk]: fid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0] + " nwfid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] + " nwname=" + $nwname$$);
      if (0 === $nwname$$) {
        this.fids[$count$jscomp$39_minor_nwfid$$] = this.Createfid(this.fids[$fid$jscomp$1$$].inodeid, 1, this.fids[$fid$jscomp$1$$].uid, this.fids[$fid$jscomp$1$$].dbg_name);
        $marshall$$.Marshall(["h"], [0], this.replybuffer, 7);
        this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 2);
        this.SendReply($bufchain$jscomp$2$$);
        break;
      }
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = [];
      for ($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = 0; $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ < $nwname$$; $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$++) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$.push("s");
      }
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $marshall$$.Unmarshall($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fids[$fid$jscomp$1$$].inodeid;
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = 9;
      var $nwidx$$ = 0;
      $message$$.Debug("walk in dir " + this.fids[$fid$jscomp$1$$].dbg_name + " to: " + $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$.toString());
      for ($data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = 0; $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ < $nwname$$; $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$++) {
        $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = this.fs.Search($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$]);
        if (-1 === $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$) {
          $message$$.Debug("Could not find: " + $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$]);
          break;
        }
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ += $marshall$$.Marshall(["Q"], [this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$).qid], this.replybuffer, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$);
        $nwidx$$++;
        this.fids[$count$jscomp$39_minor_nwfid$$] = this.Createfid($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, 1, this.fids[$fid$jscomp$1$$].uid, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$]);
      }
      $marshall$$.Marshall(["h"], [$nwidx$$], this.replybuffer, 7);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ - 7);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 120:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $message$$.Debug("[clunk]: fid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0]);
      this.fids[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0]] && 0 <= this.fids[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0]].inodeid && (await this.fs.CloseInode(this.fids[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0]].inodeid), this.fids[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0]].inodeid = 
      -1, this.fids[$data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0]].type = -1);
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 32:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "s", "d", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1];
      $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[3];
      $message$$.Debug("[txattrcreate]: fid=" + $fid$jscomp$1$$ + " name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ + " attr_size=" + $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$ + " flags=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$);
      this.fids[$fid$jscomp$1$$].type = 2;
      this.BuildReply($id$jscomp$6$$, $tag$jscomp$3$$, 0);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    case 30:
      $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$ = $marshall$$.Unmarshall(["w", "w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_oldname_space_symgt$$, $attr_size_dirfd_mode$jscomp$15_newdirfid_state$jscomp$2_walk$$);
      $fid$jscomp$1$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_offset$jscomp$27_olddirfid_size$jscomp$22_uid$jscomp$1_wnames$$ = $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2];
      $message$$.Debug("[xattrwalk]: fid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[0] + " newfid=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[1] + " name=" + $data$jscomp$81_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$8_inodeid$jscomp$1_newname$jscomp$1_req_ret_version$jscomp$4$$[2]);
      this.SendError($tag$jscomp$3$$, "Setxattr not supported", 95);
      this.SendReply($bufchain$jscomp$2$$);
      break;
    default:
      $message$$.Debug("Error in Virtio9p: Unknown id " + $id$jscomp$6$$ + " received"), $message$$.Abort();
  }
};
var $LOG_LEVEL$$ = -15786961;
function $IO$$($cpu$jscomp$1$$) {
  this.ports = [];
  this.cpu = $cpu$jscomp$1$$;
  for (var $i$jscomp$9$$ = 0; 65536 > $i$jscomp$9$$; $i$jscomp$9$$++) {
    this.ports[$i$jscomp$9$$] = this.create_empty_entry();
  }
  var $memory_size$$ = $cpu$jscomp$1$$.memory_size[0];
  for ($i$jscomp$9$$ = 0; $i$jscomp$9$$ << 17 < $memory_size$$; $i$jscomp$9$$++) {
    $cpu$jscomp$1$$.memory_map_read8[$i$jscomp$9$$] = $cpu$jscomp$1$$.memory_map_write8[$i$jscomp$9$$] = void 0, $cpu$jscomp$1$$.memory_map_read32[$i$jscomp$9$$] = $cpu$jscomp$1$$.memory_map_write32[$i$jscomp$9$$] = void 0;
  }
  this.mmap_register($memory_size$$, 4294967296 - $memory_size$$, function($addr$$) {
    $dbg_log$$("Read from unmapped memory space, addr=" + $h$$($addr$$ >>> 0, 8), 32);
    return 255;
  }, function($addr$jscomp$1$$, $value$jscomp$91$$) {
    $dbg_log$$("Write to unmapped memory space, addr=" + $h$$($addr$jscomp$1$$ >>> 0, 8) + " value=" + $h$$($value$jscomp$91$$, 2), 32);
  }, function($addr$jscomp$2$$) {
    $dbg_log$$("Read from unmapped memory space, addr=" + $h$$($addr$jscomp$2$$ >>> 0, 8), 32);
    return -1;
  }, function($addr$jscomp$3$$, $value$jscomp$92$$) {
    $dbg_log$$("Write to unmapped memory space, addr=" + $h$$($addr$jscomp$3$$ >>> 0, 8) + " value=" + $h$$($value$jscomp$92$$ >>> 0, 8), 32);
  });
}
$IO$$.prototype.create_empty_entry = function() {
  return {read8:this.empty_port_read8, read16:this.empty_port_read16, read32:this.empty_port_read32, write8:this.empty_port_write, write16:this.empty_port_write, write32:this.empty_port_write, device:void 0, };
};
$IO$$.prototype.empty_port_read8 = function() {
  return 255;
};
$IO$$.prototype.empty_port_read16 = function() {
  return 65535;
};
$IO$$.prototype.empty_port_read32 = function() {
  return -1;
};
$IO$$.prototype.empty_port_write = function() {
};
$IO$$.prototype.register_read = function($port_addr$$, $device$$, $r8$$, $r16$$, $r32$$) {
  function $fail$jscomp$2$$($n$jscomp$3$$) {
    $dbg_assert$$(!1, "Overlapped read" + $n$jscomp$3$$ + " " + $h$$($port_addr$$, 4) + " (" + $device$$.name + ")");
    return -1 >>> 32 - $n$jscomp$3$$ | 0;
  }
  $dbg_assert$$("number" === typeof $port_addr$$);
  $dbg_assert$$("object" === typeof $device$$);
  $dbg_assert$$(!$r8$$ || "function" === typeof $r8$$);
  $dbg_assert$$(!$r16$$ || "function" === typeof $r16$$);
  $dbg_assert$$(!$r32$$ || "function" === typeof $r32$$);
  $dbg_assert$$($r8$$ || $r16$$ || $r32$$);
  $r8$$ || ($r8$$ = $fail$jscomp$2$$.bind(this, 8));
  $r16$$ || ($r16$$ = $fail$jscomp$2$$.bind(this, 16));
  $r32$$ || ($r32$$ = $fail$jscomp$2$$.bind(this, 32));
  $r8$$ && (this.ports[$port_addr$$].read8 = $r8$$);
  $r16$$ && (this.ports[$port_addr$$].read16 = $r16$$);
  $r32$$ && (this.ports[$port_addr$$].read32 = $r32$$);
  this.ports[$port_addr$$].device = $device$$;
};
$IO$$.prototype.register_write = function($port_addr$jscomp$1$$, $device$jscomp$1$$, $w8$$, $w16$$, $w32$$) {
  function $fail$jscomp$3$$($n$jscomp$4$$) {
    $dbg_assert$$(!1, "Overlapped write" + $n$jscomp$4$$ + " " + $h$$($port_addr$jscomp$1$$) + " (" + $device$jscomp$1$$.name + ")");
  }
  $dbg_assert$$("number" === typeof $port_addr$jscomp$1$$);
  $dbg_assert$$("object" === typeof $device$jscomp$1$$);
  $dbg_assert$$(!$w8$$ || "function" === typeof $w8$$);
  $dbg_assert$$(!$w16$$ || "function" === typeof $w16$$);
  $dbg_assert$$(!$w32$$ || "function" === typeof $w32$$);
  $dbg_assert$$($w8$$ || $w16$$ || $w32$$);
  $w8$$ || ($w8$$ = $fail$jscomp$3$$.bind(this, 8));
  $w16$$ || ($w16$$ = $fail$jscomp$3$$.bind(this, 16));
  $w32$$ || ($w32$$ = $fail$jscomp$3$$.bind(this, 32));
  $w8$$ && (this.ports[$port_addr$jscomp$1$$].write8 = $w8$$);
  $w16$$ && (this.ports[$port_addr$jscomp$1$$].write16 = $w16$$);
  $w32$$ && (this.ports[$port_addr$jscomp$1$$].write32 = $w32$$);
  this.ports[$port_addr$jscomp$1$$].device = $device$jscomp$1$$;
};
$IO$$.prototype.register_read_consecutive = function($port_addr$jscomp$2$$, $device$jscomp$2$$, $r8_1$$, $r8_2$$, $r8_3$$, $r8_4$$) {
  function $r16_1$$() {
    return $r8_1$$.call(this) | $r8_2$$.call(this) << 8;
  }
  function $r16_2$$() {
    return $r8_3$$.call(this) | $r8_4$$.call(this) << 8;
  }
  function $r32$jscomp$1$$() {
    return $r8_1$$.call(this) | $r8_2$$.call(this) << 8 | $r8_3$$.call(this) << 16 | $r8_4$$.call(this) << 24;
  }
  $dbg_assert$$(4 === arguments.length || 6 === arguments.length);
  $r8_3$$ && $r8_4$$ ? (this.register_read($port_addr$jscomp$2$$, $device$jscomp$2$$, $r8_1$$, $r16_1$$, $r32$jscomp$1$$), this.register_read($port_addr$jscomp$2$$ + 1, $device$jscomp$2$$, $r8_2$$), this.register_read($port_addr$jscomp$2$$ + 2, $device$jscomp$2$$, $r8_3$$, $r16_2$$), this.register_read($port_addr$jscomp$2$$ + 3, $device$jscomp$2$$, $r8_4$$)) : (this.register_read($port_addr$jscomp$2$$, $device$jscomp$2$$, $r8_1$$, $r16_1$$), this.register_read($port_addr$jscomp$2$$ + 1, $device$jscomp$2$$, 
  $r8_2$$));
};
$IO$$.prototype.register_write_consecutive = function($port_addr$jscomp$3$$, $device$jscomp$3$$, $w8_1$$, $w8_2$$, $w8_3$$, $w8_4$$) {
  function $w16_1$$($data$jscomp$82$$) {
    $w8_1$$.call(this, $data$jscomp$82$$ & 255);
    $w8_2$$.call(this, $data$jscomp$82$$ >> 8 & 255);
  }
  function $w16_2$$($data$jscomp$83$$) {
    $w8_3$$.call(this, $data$jscomp$83$$ & 255);
    $w8_4$$.call(this, $data$jscomp$83$$ >> 8 & 255);
  }
  function $w32$jscomp$1$$($data$jscomp$84$$) {
    $w8_1$$.call(this, $data$jscomp$84$$ & 255);
    $w8_2$$.call(this, $data$jscomp$84$$ >> 8 & 255);
    $w8_3$$.call(this, $data$jscomp$84$$ >> 16 & 255);
    $w8_4$$.call(this, $data$jscomp$84$$ >>> 24);
  }
  $dbg_assert$$(4 === arguments.length || 6 === arguments.length);
  $w8_3$$ && $w8_4$$ ? (this.register_write($port_addr$jscomp$3$$, $device$jscomp$3$$, $w8_1$$, $w16_1$$, $w32$jscomp$1$$), this.register_write($port_addr$jscomp$3$$ + 1, $device$jscomp$3$$, $w8_2$$), this.register_write($port_addr$jscomp$3$$ + 2, $device$jscomp$3$$, $w8_3$$, $w16_2$$), this.register_write($port_addr$jscomp$3$$ + 3, $device$jscomp$3$$, $w8_4$$)) : (this.register_write($port_addr$jscomp$3$$, $device$jscomp$3$$, $w8_1$$, $w16_1$$), this.register_write($port_addr$jscomp$3$$ + 1, $device$jscomp$3$$, 
  $w8_2$$));
};
$IO$$.prototype.mmap_read32_shim = function($addr$jscomp$4$$) {
  var $fn$$ = this.cpu.memory_map_read8[$addr$jscomp$4$$ >>> 17];
  return $fn$$($addr$jscomp$4$$) | $fn$$($addr$jscomp$4$$ + 1) << 8 | $fn$$($addr$jscomp$4$$ + 2) << 16 | $fn$$($addr$jscomp$4$$ + 3) << 24;
};
$IO$$.prototype.mmap_write32_shim = function($addr$jscomp$5$$, $value$jscomp$93$$) {
  var $fn$jscomp$1$$ = this.cpu.memory_map_write8[$addr$jscomp$5$$ >>> 17];
  $fn$jscomp$1$$($addr$jscomp$5$$, $value$jscomp$93$$ & 255);
  $fn$jscomp$1$$($addr$jscomp$5$$ + 1, $value$jscomp$93$$ >> 8 & 255);
  $fn$jscomp$1$$($addr$jscomp$5$$ + 2, $value$jscomp$93$$ >> 16 & 255);
  $fn$jscomp$1$$($addr$jscomp$5$$ + 3, $value$jscomp$93$$ >>> 24);
};
$IO$$.prototype.mmap_register = function($addr$jscomp$6_aligned_addr$jscomp$2$$, $size$jscomp$23$$, $read_func8$$, $write_func8$$, $read_func32$$, $write_func32$$) {
  $dbg_log$$("mmap_register addr=" + $h$$($addr$jscomp$6_aligned_addr$jscomp$2$$ >>> 0, 8) + " size=" + $h$$($size$jscomp$23$$, 8), 32);
  $dbg_assert$$(0 === ($addr$jscomp$6_aligned_addr$jscomp$2$$ & 131071));
  $dbg_assert$$($size$jscomp$23$$ && 0 === ($size$jscomp$23$$ & 131071));
  $read_func32$$ || ($read_func32$$ = this.mmap_read32_shim.bind(this));
  $write_func32$$ || ($write_func32$$ = this.mmap_write32_shim.bind(this));
  for ($addr$jscomp$6_aligned_addr$jscomp$2$$ >>>= 17; 0 < $size$jscomp$23$$; $addr$jscomp$6_aligned_addr$jscomp$2$$++) {
    this.cpu.memory_map_read8[$addr$jscomp$6_aligned_addr$jscomp$2$$] = $read_func8$$, this.cpu.memory_map_write8[$addr$jscomp$6_aligned_addr$jscomp$2$$] = $write_func8$$, this.cpu.memory_map_read32[$addr$jscomp$6_aligned_addr$jscomp$2$$] = $read_func32$$, this.cpu.memory_map_write32[$addr$jscomp$6_aligned_addr$jscomp$2$$] = $write_func32$$, $size$jscomp$23$$ -= 131072;
  }
};
$IO$$.prototype.port_write8 = function($port_addr$jscomp$4$$, $data$jscomp$85$$) {
  var $entry$$ = this.ports[$port_addr$jscomp$4$$];
  $entry$$.write8 === this.empty_port_write && $dbg_log$$("write8 port #" + $h$$($port_addr$jscomp$4$$, 4) + " <- " + $h$$($data$jscomp$85$$, 2) + this.get_port_description($port_addr$jscomp$4$$), 32);
  return $entry$$.write8.call($entry$$.device, $data$jscomp$85$$);
};
$IO$$.prototype.port_write16 = function($port_addr$jscomp$5$$, $data$jscomp$86$$) {
  var $entry$jscomp$1$$ = this.ports[$port_addr$jscomp$5$$];
  $entry$jscomp$1$$.write16 === this.empty_port_write && $dbg_log$$("write16 port #" + $h$$($port_addr$jscomp$5$$, 4) + " <- " + $h$$($data$jscomp$86$$, 4) + this.get_port_description($port_addr$jscomp$5$$), 32);
  return $entry$jscomp$1$$.write16.call($entry$jscomp$1$$.device, $data$jscomp$86$$);
};
$IO$$.prototype.port_write32 = function($port_addr$jscomp$6$$, $data$jscomp$87$$) {
  var $entry$jscomp$2$$ = this.ports[$port_addr$jscomp$6$$];
  $entry$jscomp$2$$.write32 === this.empty_port_write && $dbg_log$$("write32 port #" + $h$$($port_addr$jscomp$6$$, 4) + " <- " + $h$$($data$jscomp$87$$ >>> 0, 8) + this.get_port_description($port_addr$jscomp$6$$), 32);
  return $entry$jscomp$2$$.write32.call($entry$jscomp$2$$.device, $data$jscomp$87$$);
};
$IO$$.prototype.port_read8 = function($port_addr$jscomp$7$$) {
  var $entry$jscomp$3_value$jscomp$94$$ = this.ports[$port_addr$jscomp$7$$];
  $entry$jscomp$3_value$jscomp$94$$.read8 === this.empty_port_read8 && $dbg_log$$("read8 port  #" + $h$$($port_addr$jscomp$7$$, 4) + this.get_port_description($port_addr$jscomp$7$$), 32);
  $entry$jscomp$3_value$jscomp$94$$ = $entry$jscomp$3_value$jscomp$94$$.read8.call($entry$jscomp$3_value$jscomp$94$$.device);
  $dbg_assert$$("number" === typeof $entry$jscomp$3_value$jscomp$94$$);
  $dbg_assert$$(256 > $entry$jscomp$3_value$jscomp$94$$ && 0 <= $entry$jscomp$3_value$jscomp$94$$, "8 bit port returned large value: " + $h$$($port_addr$jscomp$7$$));
  return $entry$jscomp$3_value$jscomp$94$$;
};
$IO$$.prototype.port_read16 = function($port_addr$jscomp$8$$) {
  var $entry$jscomp$4_value$jscomp$95$$ = this.ports[$port_addr$jscomp$8$$];
  $entry$jscomp$4_value$jscomp$95$$.read16 === this.empty_port_read16 && $dbg_log$$("read16 port  #" + $h$$($port_addr$jscomp$8$$, 4) + this.get_port_description($port_addr$jscomp$8$$), 32);
  $entry$jscomp$4_value$jscomp$95$$ = $entry$jscomp$4_value$jscomp$95$$.read16.call($entry$jscomp$4_value$jscomp$95$$.device);
  $dbg_assert$$("number" === typeof $entry$jscomp$4_value$jscomp$95$$);
  $dbg_assert$$(65536 > $entry$jscomp$4_value$jscomp$95$$ && 0 <= $entry$jscomp$4_value$jscomp$95$$, "16 bit port returned large value: " + $h$$($port_addr$jscomp$8$$));
  return $entry$jscomp$4_value$jscomp$95$$;
};
$IO$$.prototype.port_read32 = function($port_addr$jscomp$9_value$jscomp$96$$) {
  var $entry$jscomp$5$$ = this.ports[$port_addr$jscomp$9_value$jscomp$96$$];
  $entry$jscomp$5$$.read32 === this.empty_port_read32 && $dbg_log$$("read32 port  #" + $h$$($port_addr$jscomp$9_value$jscomp$96$$, 4) + this.get_port_description($port_addr$jscomp$9_value$jscomp$96$$), 32);
  $port_addr$jscomp$9_value$jscomp$96$$ = $entry$jscomp$5$$.read32.call($entry$jscomp$5$$.device);
  $dbg_assert$$(($port_addr$jscomp$9_value$jscomp$96$$ | 0) === $port_addr$jscomp$9_value$jscomp$96$$);
  return $port_addr$jscomp$9_value$jscomp$96$$;
};
var $debug_port_list$$ = {4:"PORT_DMA_ADDR_2", 5:"PORT_DMA_CNT_2", 10:"PORT_DMA1_MASK_REG", 11:"PORT_DMA1_MODE_REG", 12:"PORT_DMA1_CLEAR_FF_REG", 13:"PORT_DMA1_MASTER_CLEAR", 32:"PORT_PIC1_CMD", 33:"PORT_PIC1_DATA", 64:"PORT_PIT_COUNTER0", 65:"PORT_PIT_COUNTER1", 66:"PORT_PIT_COUNTER2", 67:"PORT_PIT_MODE", 96:"PORT_PS2_DATA", 97:"PORT_PS2_CTRLB", 100:"PORT_PS2_STATUS", 112:"PORT_CMOS_INDEX", 113:"PORT_CMOS_DATA", 128:"PORT_DIAG", 129:"PORT_DMA_PAGE_2", 146:"PORT_A20", 160:"PORT_PIC2_CMD", 161:"PORT_PIC2_DATA", 
178:"PORT_SMI_CMD", 179:"PORT_SMI_STATUS", 212:"PORT_DMA2_MASK_REG", 214:"PORT_DMA2_MODE_REG", 218:"PORT_DMA2_MASTER_CLEAR", 240:"PORT_MATH_CLEAR", 368:"PORT_ATA2_CMD_BASE", 496:"PORT_ATA1_CMD_BASE", 632:"PORT_LPT2", 744:"PORT_SERIAL4", 760:"PORT_SERIAL2", 884:"PORT_ATA2_CTRL_BASE", 888:"PORT_LPT1", 1E3:"PORT_SERIAL3", 1008:"PORT_FD_BASE", 1010:"PORT_FD_DOR", 1012:"PORT_FD_STATUS", 1013:"PORT_FD_DATA", 1014:"PORT_HD_DATA", 1015:"PORT_FD_DIR", 1016:"PORT_SERIAL1", 3320:"PORT_PCI_CMD", 3321:"PORT_PCI_REBOOT", 
3324:"PORT_PCI_DATA", 1026:"PORT_BIOS_DEBUG", 1296:"PORT_QEMU_CFG_CTL", 1297:"PORT_QEMU_CFG_DATA", 45056:"PORT_ACPI_PM_BASE", 45312:"PORT_SMB_BASE", 35072:"PORT_BIOS_APM"};
$IO$$.prototype.get_port_description = function($addr$jscomp$7$$) {
  return $debug_port_list$$[$addr$jscomp$7$$] ? "  (" + $debug_port_list$$[$addr$jscomp$7$$] + ")" : "";
};
function $v86$$($bus$jscomp$1$$, $wasm$$) {
  this.stopping = this.running = !1;
  this.idle = !0;
  this.tick_counter = 0;
  this.worker = null;
  this.cpu = new $CPU$$($bus$jscomp$1$$, $wasm$$, () => {
    this.idle && this.next_tick(0);
  });
  this.bus = $bus$jscomp$1$$;
  this.register_yield();
}
$v86$$.prototype.run = function() {
  this.stopping = !1;
  this.running || (this.running = !0, this.bus.send("emulator-started"));
  this.next_tick(0);
};
$v86$$.prototype.do_tick = function() {
  if (this.stopping || !this.running) {
    this.stopping = this.running = !1, this.bus.send("emulator-stopped");
  } else {
    this.idle = !1;
    var $t$$ = this.cpu.main_loop();
    this.next_tick($t$$);
  }
};
$v86$$.prototype.next_tick = function($t$jscomp$1$$) {
  const $tick$$ = ++this.tick_counter;
  this.idle = !0;
  this.yield($t$jscomp$1$$, $tick$$);
};
$v86$$.prototype.yield_callback = function($tick$jscomp$1$$) {
  $tick$jscomp$1$$ === this.tick_counter && this.do_tick();
};
$v86$$.prototype.stop = function() {
  this.running && (this.stopping = !0);
};
$v86$$.prototype.destroy = function() {
  this.unregister_yield();
};
$v86$$.prototype.restart = function() {
  this.cpu.reset_cpu();
  this.cpu.load_bios();
};
$v86$$.prototype.init = function($settings$$) {
  this.cpu.init($settings$$, this.bus);
  this.bus.send("emulator-ready");
};
if ("undefined" !== typeof process) {
  $v86$$.prototype.yield = function($t$jscomp$2$$, $tick$jscomp$2$$) {
    1 > $t$jscomp$2$$ ? global.setImmediate($tick$jscomp$3$$ => this.yield_callback($tick$jscomp$3$$), $tick$jscomp$2$$) : setTimeout($tick$jscomp$4$$ => this.yield_callback($tick$jscomp$4$$), $t$jscomp$2$$, $tick$jscomp$2$$);
  }, $v86$$.prototype.register_yield = function() {
  }, $v86$$.prototype.unregister_yield = function() {
  };
} else {
  if ("undefined" !== typeof Worker) {
    function $the_worker$$() {
      let $timeout$jscomp$3$$;
      globalThis.onmessage = function($e$jscomp$7$$) {
        const $t$jscomp$3$$ = $e$jscomp$7$$.data.t;
        $timeout$jscomp$3$$ = $timeout$jscomp$3$$ && clearTimeout($timeout$jscomp$3$$);
        1 > $t$jscomp$3$$ ? postMessage($e$jscomp$7$$.data.tick) : $timeout$jscomp$3$$ = setTimeout(() => postMessage($e$jscomp$7$$.data.tick), $t$jscomp$3$$);
      };
    }
    $v86$$.prototype.register_yield = function() {
      const $url$jscomp$22$$ = URL.createObjectURL(new Blob(["(" + $the_worker$$.toString() + ")()"], {type:"text/javascript"}));
      this.worker = new Worker($url$jscomp$22$$);
      this.worker.onmessage = $e$jscomp$8$$ => this.yield_callback($e$jscomp$8$$.data);
      URL.revokeObjectURL($url$jscomp$22$$);
    };
    $v86$$.prototype.yield = function($t$jscomp$4$$, $tick$jscomp$5$$) {
      this.worker.postMessage({t:$t$jscomp$4$$, tick:$tick$jscomp$5$$});
    };
    $v86$$.prototype.unregister_yield = function() {
      this.worker && this.worker.terminate();
      this.worker = null;
    };
  } else {
    $v86$$.prototype.yield = function($t$jscomp$5$$) {
      setTimeout(() => {
        this.do_tick();
      }, $t$jscomp$5$$);
    }, $v86$$.prototype.register_yield = function() {
    }, $v86$$.prototype.unregister_yield = function() {
    };
  }
}
$v86$$.prototype.save_state = function() {
  return this.cpu.save_state();
};
$v86$$.prototype.restore_state = function($state$jscomp$3$$) {
  return this.cpu.restore_state($state$jscomp$3$$);
};
if ("object" === typeof performance && performance.now) {
  $v86$$.microtick = performance.now.bind(performance);
} else {
  if ("function" === typeof require) {
    const {performance:$performance$jscomp$1$$} = require("perf_hooks");
    $v86$$.microtick = $performance$jscomp$1$$.now.bind($performance$jscomp$1$$);
  } else {
    $v86$$.microtick = "object" === typeof process && process.hrtime ? function() {
      var $t$jscomp$6$$ = process.hrtime();
      return 1000 * $t$jscomp$6$$[0] + $t$jscomp$6$$[1] / 1e6;
    } : Date.now;
  }
}
;var $goog$$ = $goog$$ || {};
$goog$$.exportSymbol = function() {
};
$goog$$.exportProperty = function() {
};
var $v86util$$ = $v86util$$ || {};
$v86util$$.pads = function($str$jscomp$6$$, $len$$) {
  return ($str$jscomp$6$$ || 0 === $str$jscomp$6$$ ? $str$jscomp$6$$ + "" : "").padEnd($len$$, " ");
};
$v86util$$.pad0 = function($str$jscomp$7$$, $len$jscomp$1$$) {
  return ($str$jscomp$7$$ || 0 === $str$jscomp$7$$ ? $str$jscomp$7$$ + "" : "").padStart($len$jscomp$1$$, "0");
};
$v86util$$.zeros = function($size$jscomp$24$$) {
  return Array($size$jscomp$24$$).fill(0);
};
$v86util$$.range = function($size$jscomp$25$$) {
  return Array.from(Array($size$jscomp$25$$).keys());
};
$v86util$$.view = function($constructor$$, $memory$$, $offset$jscomp$28$$, $length$jscomp$17$$) {
  $dbg_assert$$(0 <= $offset$jscomp$28$$);
  return new Proxy({}, {get:function($b$jscomp$1_target$jscomp$91$$, $property$jscomp$5$$) {
    $b$jscomp$1_target$jscomp$91$$ = new $constructor$$($memory$$.buffer, $offset$jscomp$28$$, $length$jscomp$17$$);
    const $x$jscomp$91$$ = $b$jscomp$1_target$jscomp$91$$[$property$jscomp$5$$];
    if ("function" === typeof $x$jscomp$91$$) {
      return $x$jscomp$91$$.bind($b$jscomp$1_target$jscomp$91$$);
    }
    $dbg_assert$$(/^\d+$/.test($property$jscomp$5$$) || "buffer" === $property$jscomp$5$$ || "length" === $property$jscomp$5$$ || "BYTES_PER_ELEMENT" === $property$jscomp$5$$ || "byteOffset" === $property$jscomp$5$$);
    return $x$jscomp$91$$;
  }, set:function($target$jscomp$92$$, $property$jscomp$6$$, $value$jscomp$97$$) {
    $dbg_assert$$(/^\d+$/.test($property$jscomp$6$$));
    (new $constructor$$($memory$$.buffer, $offset$jscomp$28$$, $length$jscomp$17$$))[$property$jscomp$6$$] = $value$jscomp$97$$;
    return !0;
  }, });
};
function $h$$($n$jscomp$5_str$jscomp$8$$, $len$jscomp$2$$) {
  $n$jscomp$5_str$jscomp$8$$ = $n$jscomp$5_str$jscomp$8$$ ? $n$jscomp$5_str$jscomp$8$$.toString(16) : "";
  return "0x" + $v86util$$.pad0($n$jscomp$5_str$jscomp$8$$.toUpperCase(), $len$jscomp$2$$ || 1);
}
if ("undefined" !== typeof crypto && crypto.getRandomValues) {
  const $rand_data$$ = new Int32Array(1);
  $v86util$$.get_rand_int = function() {
    crypto.getRandomValues($rand_data$$);
    return $rand_data$$[0];
  };
} else {
  if ("undefined" !== typeof require) {
    const $crypto$jscomp$1$$ = require("crypto");
    $v86util$$.get_rand_int = function() {
      return $crypto$jscomp$1$$.randomBytes(4).readInt32LE(0);
    };
  } else {
    $dbg_assert$$(!1, "Unsupported platform: No cryptographic random values");
  }
}
(function() {
  if ("function" === typeof Math.clz32) {
    $v86util$$.int_log2 = function($x$jscomp$94$$) {
      $dbg_assert$$(0 < $x$jscomp$94$$);
      return 31 - Math.clz32($x$jscomp$94$$);
    };
  } else {
    for (var $int_log2_table$$ = new Int8Array(256), $i$jscomp$10$$ = 0, $b$jscomp$2$$ = -2; 256 > $i$jscomp$10$$; $i$jscomp$10$$++) {
      $i$jscomp$10$$ & $i$jscomp$10$$ - 1 || $b$jscomp$2$$++, $int_log2_table$$[$i$jscomp$10$$] = $b$jscomp$2$$;
    }
    $v86util$$.int_log2 = function($x$jscomp$95$$) {
      $x$jscomp$95$$ >>>= 0;
      $dbg_assert$$(0 < $x$jscomp$95$$);
      var $tt$$ = $x$jscomp$95$$ >>> 16;
      if ($tt$$) {
        var $t$jscomp$7$$ = $tt$$ >>> 8;
        return $t$jscomp$7$$ ? 24 + $int_log2_table$$[$t$jscomp$7$$] : 16 + $int_log2_table$$[$tt$$];
      }
      return ($t$jscomp$7$$ = $x$jscomp$95$$ >>> 8) ? 8 + $int_log2_table$$[$t$jscomp$7$$] : $int_log2_table$$[$x$jscomp$95$$];
    };
  }
})();
$v86util$$.round_up_to_next_power_of_2 = function($x$jscomp$96$$) {
  $dbg_assert$$(0 <= $x$jscomp$96$$);
  return 1 >= $x$jscomp$96$$ ? 1 : 1 << 1 + $v86util$$.int_log2($x$jscomp$96$$ - 1);
};
$dbg_assert$$(0 === $v86util$$.int_log2(1));
$dbg_assert$$(1 === $v86util$$.int_log2(2));
$dbg_assert$$(2 === $v86util$$.int_log2(7));
$dbg_assert$$(3 === $v86util$$.int_log2(8));
$dbg_assert$$(26 === $v86util$$.int_log2(123456789));
$dbg_assert$$(1 === $v86util$$.round_up_to_next_power_of_2(0));
$dbg_assert$$(1 === $v86util$$.round_up_to_next_power_of_2(1));
$dbg_assert$$(2 === $v86util$$.round_up_to_next_power_of_2(2));
$dbg_assert$$(8 === $v86util$$.round_up_to_next_power_of_2(7));
$dbg_assert$$(8 === $v86util$$.round_up_to_next_power_of_2(8));
$dbg_assert$$(134217728 === $v86util$$.round_up_to_next_power_of_2(123456789));
function $ByteQueue$$($size$jscomp$26$$) {
  var $data$jscomp$88$$ = new Uint8Array($size$jscomp$26$$), $start$jscomp$14$$, $end$jscomp$10$$;
  $dbg_assert$$(0 === ($size$jscomp$26$$ & $size$jscomp$26$$ - 1));
  this.length = 0;
  this.push = function($item$jscomp$1$$) {
    this.length !== $size$jscomp$26$$ && this.length++;
    $data$jscomp$88$$[$end$jscomp$10$$] = $item$jscomp$1$$;
    $end$jscomp$10$$ = $end$jscomp$10$$ + 1 & $size$jscomp$26$$ - 1;
  };
  this.shift = function() {
    if (this.length) {
      var $item$jscomp$2$$ = $data$jscomp$88$$[$start$jscomp$14$$];
      $start$jscomp$14$$ = $start$jscomp$14$$ + 1 & $size$jscomp$26$$ - 1;
      this.length--;
      return $item$jscomp$2$$;
    }
    return -1;
  };
  this.peek = function() {
    return this.length ? $data$jscomp$88$$[$start$jscomp$14$$] : -1;
  };
  this.clear = function() {
    this.length = $end$jscomp$10$$ = $start$jscomp$14$$ = 0;
  };
  this.clear();
}
function $FloatQueue$$($size$jscomp$27$$) {
  this.size = $size$jscomp$27$$;
  this.data = new Float32Array($size$jscomp$27$$);
  this.length = this.end = this.start = 0;
  $dbg_assert$$(0 === ($size$jscomp$27$$ & $size$jscomp$27$$ - 1));
}
$FloatQueue$$.prototype.push = function($item$jscomp$3$$) {
  this.length === this.size ? this.start = this.start + 1 & this.size - 1 : this.length++;
  this.data[this.end] = $item$jscomp$3$$;
  this.end = this.end + 1 & this.size - 1;
};
$FloatQueue$$.prototype.shift = function() {
  if (this.length) {
    var $item$jscomp$4$$ = this.data[this.start];
    this.start = this.start + 1 & this.size - 1;
    this.length--;
    return $item$jscomp$4$$;
  }
};
$FloatQueue$$.prototype.shift_block = function($count$jscomp$40$$) {
  var $slice$$ = new Float32Array($count$jscomp$40$$);
  $count$jscomp$40$$ > this.length && ($count$jscomp$40$$ = this.length);
  var $slice_end$$ = this.start + $count$jscomp$40$$, $partial$$ = this.data.subarray(this.start, $slice_end$$);
  $slice$$.set($partial$$);
  $slice_end$$ >= this.size && ($slice_end$$ -= this.size, $slice$$.set(this.data.subarray(0, $slice_end$$), $partial$$.length));
  this.start = $slice_end$$;
  this.length -= $count$jscomp$40$$;
  return $slice$$;
};
$FloatQueue$$.prototype.peek = function() {
  if (this.length) {
    return this.data[this.start];
  }
};
$FloatQueue$$.prototype.clear = function() {
  this.length = this.end = this.start = 0;
};
function $dump_file$$($a$jscomp$inline_17_ab$$, $ev$jscomp$inline_18_name$jscomp$75$$) {
  $a$jscomp$inline_17_ab$$ instanceof Array || ($a$jscomp$inline_17_ab$$ = [$a$jscomp$inline_17_ab$$]);
  var $file_or_blob$jscomp$inline_15$$ = new Blob($a$jscomp$inline_17_ab$$);
  $a$jscomp$inline_17_ab$$ = document.createElement("a");
  $a$jscomp$inline_17_ab$$.download = $ev$jscomp$inline_18_name$jscomp$75$$;
  $a$jscomp$inline_17_ab$$.href = window.URL.createObjectURL($file_or_blob$jscomp$inline_15$$);
  $a$jscomp$inline_17_ab$$.dataset.downloadurl = ["application/octet-stream", $a$jscomp$inline_17_ab$$.download, $a$jscomp$inline_17_ab$$.href].join(":");
  document.createEvent ? ($ev$jscomp$inline_18_name$jscomp$75$$ = document.createEvent("MouseEvent"), $ev$jscomp$inline_18_name$jscomp$75$$.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), $a$jscomp$inline_17_ab$$.dispatchEvent($ev$jscomp$inline_18_name$jscomp$75$$)) : $a$jscomp$inline_17_ab$$.click();
  window.URL.revokeObjectURL($a$jscomp$inline_17_ab$$.href);
}
$v86util$$.Bitmap = function($length_or_buffer$$) {
  "number" === typeof $length_or_buffer$$ ? this.view = new Uint8Array($length_or_buffer$$ + 7 >> 3) : $length_or_buffer$$ instanceof ArrayBuffer ? this.view = new Uint8Array($length_or_buffer$$) : $dbg_assert$$(!1, "v86util.Bitmap: Invalid argument");
};
$v86util$$.Bitmap.prototype.set = function($bit_mask_index$jscomp$76$$, $value$jscomp$98$$) {
  const $byte_index$$ = $bit_mask_index$jscomp$76$$ >> 3;
  $bit_mask_index$jscomp$76$$ = 1 << ($bit_mask_index$jscomp$76$$ & 7);
  this.view[$byte_index$$] = $value$jscomp$98$$ ? this.view[$byte_index$$] | $bit_mask_index$jscomp$76$$ : this.view[$byte_index$$] & ~$bit_mask_index$jscomp$76$$;
};
$v86util$$.Bitmap.prototype.get = function($index$jscomp$77$$) {
  return this.view[$index$jscomp$77$$ >> 3] >> ($index$jscomp$77$$ & 7) & 1;
};
$v86util$$.Bitmap.prototype.get_buffer = function() {
  return this.view.buffer;
};
$v86util$$.load_file = "undefined" === typeof XMLHttpRequest ? $load_file_nodejs$$ : $load_file$$;
function $load_file$$($filename$jscomp$3$$, $options$jscomp$35$$, $n_tries$$) {
  function $retry$$() {
    const $number_of_tries$$ = $n_tries$$ || 0;
    setTimeout(() => {
      $load_file$$($filename$jscomp$3$$, $options$jscomp$35$$, $number_of_tries$$ + 1);
    }, 1000 * ([1, 1, 2, 3, 5, 8, 13, 21][$number_of_tries$$] || 34));
  }
  var $http$$ = new XMLHttpRequest;
  $http$$.open($options$jscomp$35$$.method || "get", $filename$jscomp$3$$, !0);
  $http$$.responseType = $options$jscomp$35$$.as_json ? "json" : "arraybuffer";
  if ($options$jscomp$35$$.headers) {
    for (var $header_names_start$jscomp$15$$ = Object.keys($options$jscomp$35$$.headers), $i$jscomp$11$$ = 0; $i$jscomp$11$$ < $header_names_start$jscomp$15$$.length; $i$jscomp$11$$++) {
      var $name$jscomp$77$$ = $header_names_start$jscomp$15$$[$i$jscomp$11$$];
      $http$$.setRequestHeader($name$jscomp$77$$, $options$jscomp$35$$.headers[$name$jscomp$77$$]);
    }
  }
  $options$jscomp$35$$.range && ($header_names_start$jscomp$15$$ = $options$jscomp$35$$.range.start, $http$$.setRequestHeader("Range", "bytes=" + $header_names_start$jscomp$15$$ + "-" + ($header_names_start$jscomp$15$$ + $options$jscomp$35$$.range.length - 1)), $http$$.setRequestHeader("X-Accept-Encoding", "identity"), $http$$.onreadystatechange = function() {
    200 === $http$$.status && $http$$.abort();
  });
  $http$$.onload = function() {
    if (4 === $http$$.readyState) {
      if (200 !== $http$$.status && 206 !== $http$$.status) {
        console.error("Loading the image " + $filename$jscomp$3$$ + " failed (status %d)", $http$$.status), 500 <= $http$$.status && 600 > $http$$.status && $retry$$();
      } else {
        if ($http$$.response) {
          if ($options$jscomp$35$$.range) {
            const $enc$$ = $http$$.getResponseHeader("Content-Encoding");
            $enc$$ && "identity" !== $enc$$ && console.error("Server sent Content-Encoding in response to ranged request", {filename:$filename$jscomp$3$$, enc:$enc$$});
          }
          $options$jscomp$35$$.done && $options$jscomp$35$$.done($http$$.response, $http$$);
        }
      }
    }
  };
  $http$$.onerror = function($e$jscomp$10$$) {
    console.error("Loading the image " + $filename$jscomp$3$$ + " failed", $e$jscomp$10$$);
    $retry$$();
  };
  $options$jscomp$35$$.progress && ($http$$.onprogress = function($e$jscomp$11$$) {
    $options$jscomp$35$$.progress($e$jscomp$11$$);
  });
  $http$$.send(null);
}
function $load_file_nodejs$$($filename$jscomp$4$$, $options$jscomp$36$$) {
  const $fs$$ = require("fs");
  $options$jscomp$36$$.range ? ($dbg_assert$$(!$options$jscomp$36$$.as_json), $fs$$.open($filename$jscomp$4$$, "r", ($err$jscomp$3$$, $fd$$) => {
    if ($err$jscomp$3$$) {
      throw $err$jscomp$3$$;
    }
    const $length$jscomp$18$$ = $options$jscomp$36$$.range.length;
    var $buffer$jscomp$18$$ = Buffer.allocUnsafe($length$jscomp$18$$);
    $fs$$.read($fd$$, $buffer$jscomp$18$$, 0, $length$jscomp$18$$, $options$jscomp$36$$.range.start, ($err$jscomp$4$$, $bytes_read$$) => {
      if ($err$jscomp$4$$) {
        throw $err$jscomp$4$$;
      }
      $dbg_assert$$($bytes_read$$ === $length$jscomp$18$$);
      $options$jscomp$36$$.done && $options$jscomp$36$$.done(new Uint8Array($buffer$jscomp$18$$));
      $fs$$.close($fd$$, $err$jscomp$5$$ => {
        if ($err$jscomp$5$$) {
          throw $err$jscomp$5$$;
        }
      });
    });
  })) : $fs$$.readFile($filename$jscomp$4$$, {encoding:$options$jscomp$36$$.as_json ? "utf-8" : null, }, function($err$jscomp$6_result$jscomp$3$$, $data$jscomp$89$$) {
    $err$jscomp$6_result$jscomp$3$$ ? console.log("Could not read file:", $filename$jscomp$4$$, $err$jscomp$6_result$jscomp$3$$) : ($err$jscomp$6_result$jscomp$3$$ = $data$jscomp$89$$, $err$jscomp$6_result$jscomp$3$$ = $options$jscomp$36$$.as_json ? JSON.parse($err$jscomp$6_result$jscomp$3$$) : (new Uint8Array($err$jscomp$6_result$jscomp$3$$)).buffer, $options$jscomp$36$$.done($err$jscomp$6_result$jscomp$3$$));
  });
}
$v86util$$.read_sized_string_from_mem = function($mem$$, $offset$jscomp$30$$, $len$jscomp$4$$) {
  return String.fromCharCode(...(new Uint8Array($mem$$.buffer, $offset$jscomp$30$$ >>> 0, $len$jscomp$4$$ >>> 0)));
};
(function() {
  function $SyncBuffer$$($buffer$jscomp$19$$) {
    $dbg_assert$$($buffer$jscomp$19$$ instanceof ArrayBuffer);
    this.buffer = $buffer$jscomp$19$$;
    this.byteLength = $buffer$jscomp$19$$.byteLength;
    this.onprogress = this.onload = void 0;
  }
  function $AsyncXHRBuffer$$($filename$jscomp$5$$, $size$jscomp$29$$, $fixed_chunk_size$$) {
    this.filename = $filename$jscomp$5$$;
    this.byteLength = $size$jscomp$29$$;
    this.block_cache = new Map;
    this.block_cache_is_write = new Set;
    this.fixed_chunk_size = $fixed_chunk_size$$;
    this.cache_reads = !!$fixed_chunk_size$$;
    this.onprogress = this.onload = void 0;
  }
  function $AsyncXHRPartfileBuffer$$($filename$jscomp$6$$, $size$jscomp$31$$, $fixed_chunk_size$jscomp$1$$, $partfile_alt_format$$, $zstd_decompress$$) {
    const $parts$$ = $filename$jscomp$6$$.match(/\.[^\.]+(\.zst)?$/);
    this.extension = $parts$$ ? $parts$$[0] : "";
    this.basename = $filename$jscomp$6$$.substring(0, $filename$jscomp$6$$.length - this.extension.length);
    this.is_zstd = this.extension.endsWith(".zst");
    this.basename.endsWith("/") || (this.basename += "-");
    this.block_cache = new Map;
    this.block_cache_is_write = new Set;
    this.byteLength = $size$jscomp$31$$;
    this.fixed_chunk_size = $fixed_chunk_size$jscomp$1$$;
    this.partfile_alt_format = !!$partfile_alt_format$$;
    this.zstd_decompress = $zstd_decompress$$;
    this.cache_reads = !!$fixed_chunk_size$jscomp$1$$;
    this.onprogress = this.onload = void 0;
  }
  function $SyncFileBuffer$$($file$$) {
    this.file = $file$$;
    this.byteLength = $file$$.size;
    1073741824 < $file$$.size && console.warn("SyncFileBuffer: Allocating buffer of " + ($file$$.size >> 20) + " MB ...");
    this.buffer = new ArrayBuffer($file$$.size);
    this.onprogress = this.onload = void 0;
  }
  function $AsyncFileBuffer$$($file$jscomp$1$$) {
    this.file = $file$jscomp$1$$;
    this.byteLength = $file$jscomp$1$$.size;
    this.block_cache = new Map;
    this.block_cache_is_write = new Set;
    this.onprogress = this.onload = void 0;
  }
  $v86util$$.SyncBuffer = $SyncBuffer$$;
  $v86util$$.AsyncXHRBuffer = $AsyncXHRBuffer$$;
  $v86util$$.AsyncXHRPartfileBuffer = $AsyncXHRPartfileBuffer$$;
  $v86util$$.AsyncFileBuffer = $AsyncFileBuffer$$;
  $v86util$$.SyncFileBuffer = $SyncFileBuffer$$;
  $v86util$$.buffer_from_object = function($obj$jscomp$26$$, $is_async_zstd_decompress_worker$$) {
    if ($obj$jscomp$26$$.buffer instanceof ArrayBuffer) {
      return new $v86util$$.SyncBuffer($obj$jscomp$26$$.buffer);
    }
    if ("undefined" !== typeof File && $obj$jscomp$26$$.buffer instanceof File) {
      return $is_async_zstd_decompress_worker$$ = $obj$jscomp$26$$.async, void 0 === $is_async_zstd_decompress_worker$$ && ($is_async_zstd_decompress_worker$$ = 268435456 <= $obj$jscomp$26$$.buffer.size), $is_async_zstd_decompress_worker$$ ? new $v86util$$.AsyncFileBuffer($obj$jscomp$26$$.buffer) : new $v86util$$.SyncFileBuffer($obj$jscomp$26$$.buffer);
    }
    if ($obj$jscomp$26$$.url) {
      return $obj$jscomp$26$$.use_parts ? new $v86util$$.AsyncXHRPartfileBuffer($obj$jscomp$26$$.url, $obj$jscomp$26$$.size, $obj$jscomp$26$$.fixed_chunk_size, !1, $is_async_zstd_decompress_worker$$) : new $v86util$$.AsyncXHRBuffer($obj$jscomp$26$$.url, $obj$jscomp$26$$.size, $obj$jscomp$26$$.fixed_chunk_size);
    }
    $dbg_log$$("Ignored file: url=" + $obj$jscomp$26$$.url + " buffer=" + $obj$jscomp$26$$.buffer);
  };
  $SyncBuffer$$.prototype.load = function() {
    this.onload && this.onload({buffer:this.buffer});
  };
  $SyncBuffer$$.prototype.get = function($start$jscomp$16$$, $len$jscomp$5$$, $fn$jscomp$2$$) {
    $dbg_assert$$($start$jscomp$16$$ + $len$jscomp$5$$ <= this.byteLength);
    $fn$jscomp$2$$(new Uint8Array(this.buffer, $start$jscomp$16$$, $len$jscomp$5$$));
  };
  $SyncBuffer$$.prototype.set = function($start$jscomp$17$$, $slice$jscomp$1$$, $fn$jscomp$3$$) {
    $dbg_assert$$($start$jscomp$17$$ + $slice$jscomp$1$$.byteLength <= this.byteLength);
    (new Uint8Array(this.buffer, $start$jscomp$17$$, $slice$jscomp$1$$.byteLength)).set($slice$jscomp$1$$);
    $fn$jscomp$3$$();
  };
  $SyncBuffer$$.prototype.get_buffer = function($fn$jscomp$4$$) {
    $fn$jscomp$4$$(this.buffer);
  };
  $SyncBuffer$$.prototype.get_state = function() {
    const $state$jscomp$4$$ = [];
    $state$jscomp$4$$[0] = this.byteLength;
    $state$jscomp$4$$[1] = new Uint8Array(this.buffer);
    return $state$jscomp$4$$;
  };
  $SyncBuffer$$.prototype.set_state = function($state$jscomp$5$$) {
    this.byteLength = $state$jscomp$5$$[0];
    this.buffer = $state$jscomp$5$$[1].slice().buffer;
  };
  $AsyncXHRBuffer$$.prototype.load = function() {
    void 0 !== this.byteLength ? this.onload && this.onload(Object.create(null)) : $determine_size$$(this.filename, ($error$jscomp$2$$, $size$jscomp$30$$) => {
      if ($error$jscomp$2$$) {
        throw Error("Cannot use: " + this.filename + ". " + $error$jscomp$2$$);
      }
      $dbg_assert$$(0 <= $size$jscomp$30$$);
      this.byteLength = $size$jscomp$30$$;
      this.onload && this.onload(Object.create(null));
    });
  };
  $AsyncXHRBuffer$$.prototype.get_from_cache = function($block_index_offset$jscomp$31$$, $len$jscomp$6_result$jscomp$4$$) {
    var $number_of_blocks$$ = $len$jscomp$6_result$jscomp$4$$ / 256;
    $block_index_offset$jscomp$31$$ /= 256;
    for (var $i$jscomp$12$$ = 0; $i$jscomp$12$$ < $number_of_blocks$$; $i$jscomp$12$$++) {
      if (!this.block_cache.get($block_index_offset$jscomp$31$$ + $i$jscomp$12$$)) {
        return;
      }
    }
    if (1 === $number_of_blocks$$) {
      return this.block_cache.get($block_index_offset$jscomp$31$$);
    }
    $len$jscomp$6_result$jscomp$4$$ = new Uint8Array($len$jscomp$6_result$jscomp$4$$);
    for ($i$jscomp$12$$ = 0; $i$jscomp$12$$ < $number_of_blocks$$; $i$jscomp$12$$++) {
      $len$jscomp$6_result$jscomp$4$$.set(this.block_cache.get($block_index_offset$jscomp$31$$ + $i$jscomp$12$$), 256 * $i$jscomp$12$$);
    }
    return $len$jscomp$6_result$jscomp$4$$;
  };
  $AsyncXHRBuffer$$.prototype.get = function($offset$jscomp$32$$, $len$jscomp$7$$, $fn$jscomp$5$$) {
    $dbg_assert$$($offset$jscomp$32$$ + $len$jscomp$7$$ <= this.byteLength);
    $dbg_assert$$(0 === $offset$jscomp$32$$ % 256);
    $dbg_assert$$(0 === $len$jscomp$7$$ % 256);
    $dbg_assert$$($len$jscomp$7$$);
    var $block$jscomp$1$$ = this.get_from_cache($offset$jscomp$32$$, $len$jscomp$7$$);
    if ($block$jscomp$1$$) {
      $fn$jscomp$5$$($block$jscomp$1$$);
    } else {
      var $requested_start$$ = $offset$jscomp$32$$, $requested_length$$ = $len$jscomp$7$$;
      this.fixed_chunk_size && ($requested_start$$ = $offset$jscomp$32$$ - $offset$jscomp$32$$ % this.fixed_chunk_size, $requested_length$$ = Math.ceil(($offset$jscomp$32$$ - $requested_start$$ + $len$jscomp$7$$) / this.fixed_chunk_size) * this.fixed_chunk_size);
      $v86util$$.load_file(this.filename, {done:function($block$jscomp$2_buffer$jscomp$20$$) {
        $block$jscomp$2_buffer$jscomp$20$$ = new Uint8Array($block$jscomp$2_buffer$jscomp$20$$);
        this.handle_read($requested_start$$, $requested_length$$, $block$jscomp$2_buffer$jscomp$20$$);
        $requested_start$$ === $offset$jscomp$32$$ && $requested_length$$ === $len$jscomp$7$$ ? $fn$jscomp$5$$($block$jscomp$2_buffer$jscomp$20$$) : $fn$jscomp$5$$($block$jscomp$2_buffer$jscomp$20$$.subarray($offset$jscomp$32$$ - $requested_start$$, $offset$jscomp$32$$ - $requested_start$$ + $len$jscomp$7$$));
      }.bind(this), range:{start:$requested_start$$, length:$requested_length$$}, });
    }
  };
  $AsyncXHRBuffer$$.prototype.set = function($start$jscomp$18_start_block$$, $data$jscomp$90$$, $fn$jscomp$6$$) {
    var $block_count_len$jscomp$8$$ = $data$jscomp$90$$.length;
    $dbg_assert$$($start$jscomp$18_start_block$$ + $data$jscomp$90$$.byteLength <= this.byteLength);
    $dbg_assert$$(0 === $start$jscomp$18_start_block$$ % 256);
    $dbg_assert$$(0 === $block_count_len$jscomp$8$$ % 256);
    $dbg_assert$$($block_count_len$jscomp$8$$);
    $start$jscomp$18_start_block$$ /= 256;
    $block_count_len$jscomp$8$$ /= 256;
    for (var $i$jscomp$13$$ = 0; $i$jscomp$13$$ < $block_count_len$jscomp$8$$; $i$jscomp$13$$++) {
      var $block$jscomp$3_data_slice$$ = this.block_cache.get($start$jscomp$18_start_block$$ + $i$jscomp$13$$);
      if (void 0 === $block$jscomp$3_data_slice$$) {
        $block$jscomp$3_data_slice$$ = $data$jscomp$90$$.slice(256 * $i$jscomp$13$$, 256 * ($i$jscomp$13$$ + 1)), this.block_cache.set($start$jscomp$18_start_block$$ + $i$jscomp$13$$, $block$jscomp$3_data_slice$$);
      } else {
        const $data_slice$jscomp$1$$ = $data$jscomp$90$$.subarray(256 * $i$jscomp$13$$, 256 * ($i$jscomp$13$$ + 1));
        $dbg_assert$$($block$jscomp$3_data_slice$$.byteLength === $data_slice$jscomp$1$$.length);
        $block$jscomp$3_data_slice$$.set($data_slice$jscomp$1$$);
      }
      this.block_cache_is_write.add($start$jscomp$18_start_block$$ + $i$jscomp$13$$);
    }
    $fn$jscomp$6$$();
  };
  $AsyncXHRBuffer$$.prototype.handle_read = function($offset$jscomp$33_start_block$jscomp$1$$, $block_count$jscomp$1_len$jscomp$9$$, $block$jscomp$4$$) {
    $offset$jscomp$33_start_block$jscomp$1$$ /= 256;
    $block_count$jscomp$1_len$jscomp$9$$ /= 256;
    for (var $i$jscomp$14$$ = 0; $i$jscomp$14$$ < $block_count$jscomp$1_len$jscomp$9$$; $i$jscomp$14$$++) {
      const $cached_block$$ = this.block_cache.get($offset$jscomp$33_start_block$jscomp$1$$ + $i$jscomp$14$$);
      $cached_block$$ ? $block$jscomp$4$$.set($cached_block$$, 256 * $i$jscomp$14$$) : this.cache_reads && this.block_cache.set($offset$jscomp$33_start_block$jscomp$1$$ + $i$jscomp$14$$, $block$jscomp$4$$.slice(256 * $i$jscomp$14$$, 256 * ($i$jscomp$14$$ + 1)));
    }
  };
  $AsyncXHRBuffer$$.prototype.get_buffer = function($fn$jscomp$7$$) {
    $fn$jscomp$7$$();
  };
  $AsyncXHRBuffer$$.prototype.get_state = function() {
    const $state$jscomp$6$$ = [], $block_cache$$ = [];
    for (const [$index$jscomp$78$$, $block$jscomp$5$$] of this.block_cache) {
      $dbg_assert$$(isFinite($index$jscomp$78$$)), this.block_cache_is_write.has($index$jscomp$78$$) && $block_cache$$.push([$index$jscomp$78$$, $block$jscomp$5$$]);
    }
    $state$jscomp$6$$[0] = $block_cache$$;
    return $state$jscomp$6$$;
  };
  $AsyncXHRBuffer$$.prototype.set_state = function($block_cache$jscomp$1_state$jscomp$7$$) {
    $block_cache$jscomp$1_state$jscomp$7$$ = $block_cache$jscomp$1_state$jscomp$7$$[0];
    this.block_cache.clear();
    this.block_cache_is_write.clear();
    for (const [$index$jscomp$79$$, $block$jscomp$6$$] of $block_cache$jscomp$1_state$jscomp$7$$) {
      $dbg_assert$$(isFinite($index$jscomp$79$$)), this.block_cache.set($index$jscomp$79$$, $block$jscomp$6$$), this.block_cache_is_write.add($index$jscomp$79$$);
    }
  };
  $AsyncXHRPartfileBuffer$$.prototype.load = function() {
    void 0 === this.byteLength && $dbg_assert$$(!1);
    this.onload && this.onload(Object.create(null));
  };
  $AsyncXHRPartfileBuffer$$.prototype.get = function($offset$jscomp$34$$, $len$jscomp$10$$, $fn$jscomp$8$$) {
    $dbg_assert$$($offset$jscomp$34$$ + $len$jscomp$10$$ <= this.byteLength);
    $dbg_assert$$(0 === $offset$jscomp$34$$ % 256);
    $dbg_assert$$(0 === $len$jscomp$10$$ % 256);
    $dbg_assert$$($len$jscomp$10$$);
    var $block$jscomp$7_part_filename$$ = this.get_from_cache($offset$jscomp$34$$, $len$jscomp$10$$);
    if ($block$jscomp$7_part_filename$$) {
      $fn$jscomp$8$$($block$jscomp$7_part_filename$$);
    } else {
      if (this.fixed_chunk_size) {
        const $start_index$$ = Math.floor($offset$jscomp$34$$ / this.fixed_chunk_size), $m_offset$$ = $offset$jscomp$34$$ - $start_index$$ * this.fixed_chunk_size;
        $dbg_assert$$(0 <= $m_offset$$);
        const $total_count$$ = Math.ceil(($m_offset$$ + $len$jscomp$10$$) / this.fixed_chunk_size), $blocks$$ = new Uint8Array($total_count$$ * this.fixed_chunk_size);
        let $finished$$ = 0;
        for (let $i$jscomp$15$$ = 0; $i$jscomp$15$$ < $total_count$$; $i$jscomp$15$$++) {
          var $block$jscomp$8_offset$jscomp$35$$ = ($start_index$$ + $i$jscomp$15$$) * this.fixed_chunk_size;
          $block$jscomp$7_part_filename$$ = this.partfile_alt_format ? this.basename + ($start_index$$ + $i$jscomp$15$$ + "").padStart(8, "0") + this.extension : this.basename + $block$jscomp$8_offset$jscomp$35$$ + "-" + ($block$jscomp$8_offset$jscomp$35$$ + this.fixed_chunk_size) + this.extension;
          ($block$jscomp$8_offset$jscomp$35$$ = this.get_from_cache($block$jscomp$8_offset$jscomp$35$$, this.fixed_chunk_size)) ? ($blocks$$.set($block$jscomp$8_offset$jscomp$35$$, $i$jscomp$15$$ * this.fixed_chunk_size), $finished$$++, $finished$$ === $total_count$$ && $fn$jscomp$8$$($blocks$$.subarray($m_offset$$, $m_offset$$ + $len$jscomp$10$$))) : $v86util$$.load_file($block$jscomp$7_part_filename$$, {done:async function($block$jscomp$9_buffer$jscomp$21_decompressed$$) {
            $block$jscomp$9_buffer$jscomp$21_decompressed$$ = new Uint8Array($block$jscomp$9_buffer$jscomp$21_decompressed$$);
            this.is_zstd && ($block$jscomp$9_buffer$jscomp$21_decompressed$$ = await this.zstd_decompress(this.fixed_chunk_size, $block$jscomp$9_buffer$jscomp$21_decompressed$$), $block$jscomp$9_buffer$jscomp$21_decompressed$$ = new Uint8Array($block$jscomp$9_buffer$jscomp$21_decompressed$$));
            $blocks$$.set($block$jscomp$9_buffer$jscomp$21_decompressed$$, $i$jscomp$15$$ * this.fixed_chunk_size);
            this.handle_read(($start_index$$ + $i$jscomp$15$$) * this.fixed_chunk_size, this.fixed_chunk_size | 0, $block$jscomp$9_buffer$jscomp$21_decompressed$$);
            $finished$$++;
            $finished$$ === $total_count$$ && $fn$jscomp$8$$($blocks$$.subarray($m_offset$$, $m_offset$$ + $len$jscomp$10$$));
          }.bind(this), });
        }
      } else {
        $v86util$$.load_file(this.basename + $offset$jscomp$34$$ + "-" + ($offset$jscomp$34$$ + $len$jscomp$10$$) + this.extension, {done:function($block$jscomp$10_buffer$jscomp$22$$) {
          $dbg_assert$$($block$jscomp$10_buffer$jscomp$22$$.byteLength === $len$jscomp$10$$);
          $block$jscomp$10_buffer$jscomp$22$$ = new Uint8Array($block$jscomp$10_buffer$jscomp$22$$);
          this.handle_read($offset$jscomp$34$$, $len$jscomp$10$$, $block$jscomp$10_buffer$jscomp$22$$);
          $fn$jscomp$8$$($block$jscomp$10_buffer$jscomp$22$$);
        }.bind(this), });
      }
    }
  };
  $AsyncXHRPartfileBuffer$$.prototype.get_from_cache = $AsyncXHRBuffer$$.prototype.get_from_cache;
  $AsyncXHRPartfileBuffer$$.prototype.set = $AsyncXHRBuffer$$.prototype.set;
  $AsyncXHRPartfileBuffer$$.prototype.handle_read = $AsyncXHRBuffer$$.prototype.handle_read;
  $AsyncXHRPartfileBuffer$$.prototype.get_state = $AsyncXHRBuffer$$.prototype.get_state;
  $AsyncXHRPartfileBuffer$$.prototype.set_state = $AsyncXHRBuffer$$.prototype.set_state;
  $SyncFileBuffer$$.prototype.load = function() {
    this.load_next(0);
  };
  $SyncFileBuffer$$.prototype.load_next = function($start$jscomp$19$$) {
    var $filereader$$ = new FileReader;
    $filereader$$.onload = function($buffer$jscomp$23_e$jscomp$12$$) {
      $buffer$jscomp$23_e$jscomp$12$$ = new Uint8Array($buffer$jscomp$23_e$jscomp$12$$.target.result);
      (new Uint8Array(this.buffer, $start$jscomp$19$$)).set($buffer$jscomp$23_e$jscomp$12$$);
      this.load_next($start$jscomp$19$$ + 4194304);
    }.bind(this);
    if (this.onprogress) {
      this.onprogress({loaded:$start$jscomp$19$$, total:this.byteLength, lengthComputable:!0, });
    }
    if ($start$jscomp$19$$ < this.byteLength) {
      var $slice$jscomp$2$$ = this.file.slice($start$jscomp$19$$, Math.min($start$jscomp$19$$ + 4194304, this.byteLength));
      $filereader$$.readAsArrayBuffer($slice$jscomp$2$$);
    } else {
      this.file = void 0, this.onload && this.onload({buffer:this.buffer});
    }
  };
  $SyncFileBuffer$$.prototype.get = $SyncBuffer$$.prototype.get;
  $SyncFileBuffer$$.prototype.set = $SyncBuffer$$.prototype.set;
  $SyncFileBuffer$$.prototype.get_buffer = $SyncBuffer$$.prototype.get_buffer;
  $SyncFileBuffer$$.prototype.get_state = $SyncBuffer$$.prototype.get_state;
  $SyncFileBuffer$$.prototype.set_state = $SyncBuffer$$.prototype.set_state;
  $AsyncFileBuffer$$.prototype.load = function() {
    this.onload && this.onload(Object.create(null));
  };
  $AsyncFileBuffer$$.prototype.get = function($offset$jscomp$36$$, $len$jscomp$11$$, $fn$jscomp$9$$) {
    $dbg_assert$$(0 === $offset$jscomp$36$$ % 256);
    $dbg_assert$$(0 === $len$jscomp$11$$ % 256);
    $dbg_assert$$($len$jscomp$11$$);
    var $block$jscomp$11_fr$$ = this.get_from_cache($offset$jscomp$36$$, $len$jscomp$11$$);
    $block$jscomp$11_fr$$ ? $fn$jscomp$9$$($block$jscomp$11_fr$$) : ($block$jscomp$11_fr$$ = new FileReader, $block$jscomp$11_fr$$.onload = function($block$jscomp$12_e$jscomp$13$$) {
      $block$jscomp$12_e$jscomp$13$$ = new Uint8Array($block$jscomp$12_e$jscomp$13$$.target.result);
      this.handle_read($offset$jscomp$36$$, $len$jscomp$11$$, $block$jscomp$12_e$jscomp$13$$);
      $fn$jscomp$9$$($block$jscomp$12_e$jscomp$13$$);
    }.bind(this), $block$jscomp$11_fr$$.readAsArrayBuffer(this.file.slice($offset$jscomp$36$$, $offset$jscomp$36$$ + $len$jscomp$11$$)));
  };
  $AsyncFileBuffer$$.prototype.get_from_cache = $AsyncXHRBuffer$$.prototype.get_from_cache;
  $AsyncFileBuffer$$.prototype.set = $AsyncXHRBuffer$$.prototype.set;
  $AsyncFileBuffer$$.prototype.handle_read = $AsyncXHRBuffer$$.prototype.handle_read;
  $AsyncFileBuffer$$.prototype.get_state = $AsyncXHRBuffer$$.prototype.get_state;
  $AsyncFileBuffer$$.prototype.set_state = $AsyncXHRBuffer$$.prototype.set_state;
  $AsyncFileBuffer$$.prototype.get_buffer = function($fn$jscomp$10$$) {
    $fn$jscomp$10$$();
  };
  $AsyncFileBuffer$$.prototype.get_as_file = function($file$jscomp$2_name$jscomp$78$$) {
    for (var $parts$jscomp$1$$ = [], $existing_blocks$$ = Array.from(this.block_cache.keys()).sort(function($x$jscomp$97$$, $y$jscomp$75$$) {
      return $x$jscomp$97$$ - $y$jscomp$75$$;
    }), $current_offset$$ = 0, $i$jscomp$16$$ = 0; $i$jscomp$16$$ < $existing_blocks$$.length; $i$jscomp$16$$++) {
      var $block_index$jscomp$1_start$jscomp$20$$ = $existing_blocks$$[$i$jscomp$16$$], $block$jscomp$13$$ = this.block_cache.get($block_index$jscomp$1_start$jscomp$20$$);
      $block_index$jscomp$1_start$jscomp$20$$ *= 256;
      $dbg_assert$$($block_index$jscomp$1_start$jscomp$20$$ >= $current_offset$$);
      $block_index$jscomp$1_start$jscomp$20$$ !== $current_offset$$ && ($parts$jscomp$1$$.push(this.file.slice($current_offset$$, $block_index$jscomp$1_start$jscomp$20$$)), $current_offset$$ = $block_index$jscomp$1_start$jscomp$20$$);
      $parts$jscomp$1$$.push($block$jscomp$13$$);
      $current_offset$$ += $block$jscomp$13$$.length;
    }
    $current_offset$$ !== this.file.size && $parts$jscomp$1$$.push(this.file.slice($current_offset$$));
    $file$jscomp$2_name$jscomp$78$$ = new File($parts$jscomp$1$$, $file$jscomp$2_name$jscomp$78$$);
    $dbg_assert$$($file$jscomp$2_name$jscomp$78$$.size === this.file.size);
    return $file$jscomp$2_name$jscomp$78$$;
  };
  var $determine_size$$ = "undefined" === typeof XMLHttpRequest ? function($path$jscomp$5$$, $cb$$) {
    require("fs").stat($path$jscomp$5$$, ($err$jscomp$7$$, $stats$$) => {
      $err$jscomp$7$$ ? $cb$$($err$jscomp$7$$) : $cb$$(null, $stats$$.size);
    });
  } : function($url$jscomp$23$$, $cb$jscomp$1$$) {
    $v86util$$.load_file($url$jscomp$23$$, {done:($buffer$jscomp$25_header$jscomp$3$$, $http$jscomp$1_match$$) => {
      $buffer$jscomp$25_header$jscomp$3$$ = $http$jscomp$1_match$$.getResponseHeader("Content-Range") || "";
      ($http$jscomp$1_match$$ = $buffer$jscomp$25_header$jscomp$3$$.match(/\/(\d+)\s*$/)) ? $cb$jscomp$1$$(null, +$http$jscomp$1_match$$[1]) : $cb$jscomp$1$$("`Range: bytes=...` header not supported (Got `" + $buffer$jscomp$25_header$jscomp$3$$ + "`)");
    }, headers:{Range:"bytes=0-0", "X-Accept-Encoding":"identity"}});
  };
})();
function $IDEDevice$$($cpu$jscomp$2$$, $master_buffer$$, $slave_buffer$$, $is_cd$$, $nr$$, $bus$jscomp$2$$) {
  this.master = new $IDEInterface$$(this, $cpu$jscomp$2$$, $master_buffer$$, $is_cd$$, $nr$$, 0, $bus$jscomp$2$$);
  this.slave = new $IDEInterface$$(this, $cpu$jscomp$2$$, $slave_buffer$$, !1, $nr$$, 1, $bus$jscomp$2$$);
  this.current_interface = this.master;
  this.cpu = $cpu$jscomp$2$$;
  0 === $nr$$ ? (this.ata_port = 496, this.irq = 14, this.pci_id = 240) : 1 === $nr$$ ? (this.ata_port = 368, this.irq = 15, this.pci_id = 248) : $dbg_assert$$(!1, "IDE device with nr " + $nr$$ + " ignored", 32768);
  this.ata_port_high = this.ata_port | 516;
  this.master_port = 46080;
  this.pci_space = [134, 128, 16, 112, 5, 0, 160, 2, 0, 128, 1, 1, 0, 0, 0, 0, this.ata_port & 255 | 1, this.ata_port >> 8, 0, 0, this.ata_port_high & 255 | 1, this.ata_port_high >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.master_port & 255 | 1, this.master_port >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 16, 212, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.irq, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
  this.pci_bars = [{size:8, }, {size:4, }, void 0, void 0, {size:16, }, ];
  this.name = "ide" + $nr$$;
  this.device_control = 2;
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 7, this, function() {
    $dbg_log$$("lower irq", 32768);
    this.cpu.device_lower_irq(this.irq);
    return this.read_status();
  });
  $cpu$jscomp$2$$.io.register_read(this.ata_port_high | 2, this, this.read_status);
  $cpu$jscomp$2$$.io.register_write(this.ata_port_high | 2, this, this.write_control);
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 0, this, function() {
    return this.current_interface.read_data(1);
  }, function() {
    return this.current_interface.read_data(2);
  }, function() {
    return this.current_interface.read_data(4);
  });
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 1, this, function() {
    $dbg_log$$("Read error: " + $h$$(this.current_interface.error & 255) + " slave=" + (this.current_interface === this.slave), 32768);
    return this.current_interface.error & 255;
  });
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 2, this, function() {
    $dbg_log$$("Read bytecount: " + $h$$(this.current_interface.bytecount & 255), 32768);
    return this.current_interface.bytecount & 255;
  });
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 3, this, function() {
    $dbg_log$$("Read sector: " + $h$$(this.current_interface.sector & 255), 32768);
    return this.current_interface.sector & 255;
  });
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 4, this, function() {
    $dbg_log$$("Read 1F4: " + $h$$(this.current_interface.cylinder_low & 255), 32768);
    return this.current_interface.cylinder_low & 255;
  });
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 5, this, function() {
    $dbg_log$$("Read 1F5: " + $h$$(this.current_interface.cylinder_high & 255), 32768);
    return this.current_interface.cylinder_high & 255;
  });
  $cpu$jscomp$2$$.io.register_read(this.ata_port | 6, this, function() {
    $dbg_log$$("Read 1F6", 32768);
    return this.current_interface.drive_head & 255;
  });
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 0, this, function($data$jscomp$91$$) {
    this.current_interface.write_data_port8($data$jscomp$91$$);
  }, function($data$jscomp$92$$) {
    this.current_interface.write_data_port16($data$jscomp$92$$);
  }, function($data$jscomp$93$$) {
    this.current_interface.write_data_port32($data$jscomp$93$$);
  });
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 1, this, function($data$jscomp$94$$) {
    $dbg_log$$("1F1/lba_count: " + $h$$($data$jscomp$94$$), 32768);
    this.master.lba_count = (this.master.lba_count << 8 | $data$jscomp$94$$) & 65535;
    this.slave.lba_count = (this.slave.lba_count << 8 | $data$jscomp$94$$) & 65535;
  });
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 2, this, function($data$jscomp$95$$) {
    $dbg_log$$("1F2/bytecount: " + $h$$($data$jscomp$95$$), 32768);
    this.master.bytecount = (this.master.bytecount << 8 | $data$jscomp$95$$) & 65535;
    this.slave.bytecount = (this.slave.bytecount << 8 | $data$jscomp$95$$) & 65535;
  });
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 3, this, function($data$jscomp$96$$) {
    $dbg_log$$("1F3/sector: " + $h$$($data$jscomp$96$$), 32768);
    this.master.sector = (this.master.sector << 8 | $data$jscomp$96$$) & 65535;
    this.slave.sector = (this.slave.sector << 8 | $data$jscomp$96$$) & 65535;
  });
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 4, this, function($data$jscomp$97$$) {
    $dbg_log$$("1F4/sector low: " + $h$$($data$jscomp$97$$), 32768);
    this.master.cylinder_low = (this.master.cylinder_low << 8 | $data$jscomp$97$$) & 65535;
    this.slave.cylinder_low = (this.slave.cylinder_low << 8 | $data$jscomp$97$$) & 65535;
  });
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 5, this, function($data$jscomp$98$$) {
    $dbg_log$$("1F5/sector high: " + $h$$($data$jscomp$98$$), 32768);
    this.master.cylinder_high = (this.master.cylinder_high << 8 | $data$jscomp$98$$) & 65535;
    this.slave.cylinder_high = (this.slave.cylinder_high << 8 | $data$jscomp$98$$) & 65535;
  });
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 6, this, function($data$jscomp$99$$) {
    var $slave$$ = $data$jscomp$99$$ & 16;
    $dbg_log$$("1F6/drive: " + $h$$($data$jscomp$99$$, 2), 32768);
    $slave$$ ? ($dbg_log$$("Slave", 32768), this.current_interface = this.slave) : this.current_interface = this.master;
    this.master.drive_head = $data$jscomp$99$$;
    this.slave.drive_head = $data$jscomp$99$$;
    this.master.is_lba = this.slave.is_lba = $data$jscomp$99$$ >> 6 & 1;
    this.master.head = this.slave.head = $data$jscomp$99$$ & 15;
  });
  this.dma_command = this.dma_status = this.prdt_addr = 0;
  $cpu$jscomp$2$$.io.register_write(this.ata_port | 7, this, function($data$jscomp$100$$) {
    $dbg_log$$("lower irq", 32768);
    this.cpu.device_lower_irq(this.irq);
    this.current_interface.ata_command($data$jscomp$100$$);
  });
  $cpu$jscomp$2$$.io.register_read(this.master_port | 4, this, void 0, void 0, this.dma_read_addr);
  $cpu$jscomp$2$$.io.register_write(this.master_port | 4, this, void 0, void 0, this.dma_set_addr);
  $cpu$jscomp$2$$.io.register_read(this.master_port, this, this.dma_read_command8, void 0, this.dma_read_command);
  $cpu$jscomp$2$$.io.register_write(this.master_port, this, this.dma_write_command8, void 0, this.dma_write_command);
  $cpu$jscomp$2$$.io.register_read(this.master_port | 2, this, this.dma_read_status);
  $cpu$jscomp$2$$.io.register_write(this.master_port | 2, this, this.dma_write_status);
  $cpu$jscomp$2$$.io.register_read(this.master_port | 8, this, function() {
    $dbg_log$$("DMA read 0x8", 32768);
    return 0;
  });
  $cpu$jscomp$2$$.io.register_read(this.master_port | 10, this, function() {
    $dbg_log$$("DMA read 0xA", 32768);
    return 0;
  });
  $cpu$jscomp$2$$.devices.pci.register_device(this);
  Object.seal(this);
}
$IDEDevice$$.prototype.read_status = function() {
  if (this.current_interface.buffer) {
    var $ret$jscomp$1$$ = this.current_interface.status;
    $dbg_log$$("ATA read status: " + $h$$($ret$jscomp$1$$, 2), 32768);
    return $ret$jscomp$1$$;
  }
  return 0;
};
$IDEDevice$$.prototype.write_control = function($data$jscomp$101$$) {
  $dbg_log$$("set device control: " + $h$$($data$jscomp$101$$, 2) + " interrupts " + ($data$jscomp$101$$ & 2 ? "disabled" : "enabled"), 32768);
  $data$jscomp$101$$ & 4 && ($dbg_log$$("Reset via control port", 32768), this.cpu.device_lower_irq(this.irq), this.master.device_reset(), this.slave.device_reset());
  this.device_control = $data$jscomp$101$$;
};
$IDEDevice$$.prototype.dma_read_addr = function() {
  $dbg_log$$("dma get address: " + $h$$(this.prdt_addr, 8), 32768);
  return this.prdt_addr;
};
$IDEDevice$$.prototype.dma_set_addr = function($data$jscomp$102$$) {
  $dbg_log$$("dma set address: " + $h$$($data$jscomp$102$$, 8), 32768);
  this.prdt_addr = $data$jscomp$102$$;
};
$IDEDevice$$.prototype.dma_read_status = function() {
  $dbg_log$$("DMA read status: " + $h$$(this.dma_status), 32768);
  return this.dma_status;
};
$IDEDevice$$.prototype.dma_write_status = function($value$jscomp$99$$) {
  $dbg_log$$("DMA set status: " + $h$$($value$jscomp$99$$), 32768);
  this.dma_status &= ~($value$jscomp$99$$ & 6);
};
$IDEDevice$$.prototype.dma_read_command = function() {
  return this.dma_read_command8() | this.dma_read_status() << 16;
};
$IDEDevice$$.prototype.dma_read_command8 = function() {
  $dbg_log$$("DMA read command: " + $h$$(this.dma_command), 32768);
  return this.dma_command;
};
$IDEDevice$$.prototype.dma_write_command = function($value$jscomp$100$$) {
  $dbg_log$$("DMA write command: " + $h$$($value$jscomp$100$$), 32768);
  this.dma_write_command8($value$jscomp$100$$ & 255);
  this.dma_write_status($value$jscomp$100$$ >> 16 & 255);
};
$IDEDevice$$.prototype.dma_write_command8 = function($value$jscomp$101$$) {
  $dbg_log$$("DMA write command8: " + $h$$($value$jscomp$101$$), 32768);
  const $old_command$$ = this.dma_command;
  this.dma_command = $value$jscomp$101$$ & 9;
  if (($old_command$$ & 1) !== ($value$jscomp$101$$ & 1)) {
    if (0 === ($value$jscomp$101$$ & 1)) {
      this.dma_status &= -2;
    } else {
      switch(this.dma_status |= 1, this.current_interface.current_command) {
        case 37:
        case 200:
          this.current_interface.do_ata_read_sectors_dma();
          break;
        case 202:
        case 53:
          this.current_interface.do_ata_write_sectors_dma();
          break;
        case 160:
          this.current_interface.do_atapi_dma();
          break;
        default:
          $dbg_log$$("Spurious dma command write, current command: " + $h$$(this.current_interface.current_command), 32768), $dbg_assert$$(!1);
      }
    }
  }
};
$IDEDevice$$.prototype.push_irq = function() {
  0 === (this.device_control & 2) && ($dbg_log$$("push irq", 32768), this.dma_status |= 4, this.cpu.device_raise_irq(this.irq));
};
$IDEDevice$$.prototype.get_state = function() {
  var $state$jscomp$8$$ = [];
  $state$jscomp$8$$[0] = this.master;
  $state$jscomp$8$$[1] = this.slave;
  $state$jscomp$8$$[2] = this.ata_port;
  $state$jscomp$8$$[3] = this.irq;
  $state$jscomp$8$$[4] = this.pci_id;
  $state$jscomp$8$$[5] = this.ata_port_high;
  $state$jscomp$8$$[6] = this.master_port;
  $state$jscomp$8$$[7] = this.name;
  $state$jscomp$8$$[8] = this.device_control;
  $state$jscomp$8$$[9] = this.prdt_addr;
  $state$jscomp$8$$[10] = this.dma_status;
  $state$jscomp$8$$[11] = this.current_interface === this.master;
  $state$jscomp$8$$[12] = this.dma_command;
  return $state$jscomp$8$$;
};
$IDEDevice$$.prototype.set_state = function($state$jscomp$9$$) {
  this.master.set_state($state$jscomp$9$$[0]);
  this.slave.set_state($state$jscomp$9$$[1]);
  this.ata_port = $state$jscomp$9$$[2];
  this.irq = $state$jscomp$9$$[3];
  this.pci_id = $state$jscomp$9$$[4];
  this.ata_port_high = $state$jscomp$9$$[5];
  this.master_port = $state$jscomp$9$$[6];
  this.name = $state$jscomp$9$$[7];
  this.device_control = $state$jscomp$9$$[8];
  this.prdt_addr = $state$jscomp$9$$[9];
  this.dma_status = $state$jscomp$9$$[10];
  this.current_interface = $state$jscomp$9$$[11] ? this.master : this.slave;
  this.dma_command = $state$jscomp$9$$[12];
};
function $IDEInterface$$($device$jscomp$4_rtc$$, $cpu$jscomp$3$$, $buffer$jscomp$26$$, $is_cd$jscomp$1$$, $device_nr$$, $interface_nr$$, $bus$jscomp$3$$) {
  this.device = $device$jscomp$4_rtc$$;
  this.bus = $bus$jscomp$3$$;
  this.nr = $device_nr$$;
  this.cpu = $cpu$jscomp$3$$;
  this.buffer = $buffer$jscomp$26$$;
  this.sector_size = $is_cd$jscomp$1$$ ? 2048 : 512;
  this.is_atapi = $is_cd$jscomp$1$$;
  this.cylinder_count = this.sectors_per_track = this.head_count = this.sector_count = 0;
  this.buffer && (this.sector_count = this.buffer.byteLength / this.sector_size, this.sector_count !== (this.sector_count | 0) && ($dbg_log$$("Warning: Disk size not aligned with sector size", 32768), this.sector_count = Math.ceil(this.sector_count)), $is_cd$jscomp$1$$ ? (this.head_count = 1, this.sectors_per_track = 0) : (this.head_count = 16, this.sectors_per_track = 63), this.cylinder_count = this.sector_count / this.head_count / this.sectors_per_track, this.cylinder_count !== (this.cylinder_count | 
  0) && ($dbg_log$$("Warning: Rounding up cylinder count. Choose different head number", 32768), this.cylinder_count = Math.floor(this.cylinder_count)), $device$jscomp$4_rtc$$ = $cpu$jscomp$3$$.devices.rtc, $device$jscomp$4_rtc$$.cmos_write(57, $device$jscomp$4_rtc$$.cmos_read(57) | 1 << 4 * this.nr), $device$jscomp$4_rtc$$.cmos_write(18, $device$jscomp$4_rtc$$.cmos_read(18) & 15 | 240), $device$jscomp$4_rtc$$.cmos_write(27, this.cylinder_count & 255), $device$jscomp$4_rtc$$.cmos_write(28, this.cylinder_count >> 
  8 & 255), $device$jscomp$4_rtc$$.cmos_write(29, this.head_count & 255), $device$jscomp$4_rtc$$.cmos_write(30, 255), $device$jscomp$4_rtc$$.cmos_write(31, 255), $device$jscomp$4_rtc$$.cmos_write(32, 200), $device$jscomp$4_rtc$$.cmos_write(33, this.cylinder_count & 255), $device$jscomp$4_rtc$$.cmos_write(34, this.cylinder_count >> 8 & 255), $device$jscomp$4_rtc$$.cmos_write(35, this.sectors_per_track & 255));
  this.buffer = $buffer$jscomp$26$$;
  this.drive_head = this.head = this.cylinder_high = this.cylinder_low = this.lba_count = this.sector = this.bytecount = this.is_lba = 0;
  this.status = 80;
  this.sectors_per_drq = 128;
  this.data_pointer = this.error = 0;
  this.data = new Uint8Array(65536);
  this.data16 = new Uint16Array(this.data.buffer);
  this.data32 = new Int32Array(this.data.buffer);
  this.data_end = this.data_length = 0;
  this.current_atapi_command = this.current_command = -1;
  this.last_io_id = this.write_dest = 0;
  this.in_progress_io_ids = new Set;
  this.cancelled_io_ids = new Set;
  Object.seal(this);
}
$IDEInterface$$.prototype.device_reset = function() {
  this.is_atapi ? (this.status = 0, this.sector = this.error = this.bytecount = 1, this.cylinder_low = 20, this.cylinder_high = 235) : (this.status = 81, this.sector = this.error = this.bytecount = 1, this.cylinder_high = this.cylinder_low = 0);
  this.cancel_io_operations();
};
$IDEInterface$$.prototype.push_irq = function() {
  this.device.push_irq();
};
$IDEInterface$$.prototype.ata_command = function($cmd_last_sector$$) {
  $dbg_log$$("ATA Command: " + $h$$($cmd_last_sector$$) + " slave=" + (this.drive_head >> 4 & 1), 32768);
  if (this.buffer) {
    switch(this.current_command = $cmd_last_sector$$, this.error = 0, $cmd_last_sector$$) {
      case 8:
        $dbg_log$$("ATA device reset", 32768);
        this.data_length = this.data_end = this.data_pointer = 0;
        this.device_reset();
        this.push_irq();
        break;
      case 16:
        this.status = 80;
        this.cylinder_low = 0;
        this.push_irq();
        break;
      case 248:
        this.status = 80;
        $cmd_last_sector$$ = this.sector_count - 1;
        this.sector = $cmd_last_sector$$ & 255;
        this.cylinder_low = $cmd_last_sector$$ >> 8 & 255;
        this.cylinder_high = $cmd_last_sector$$ >> 16 & 255;
        this.drive_head = this.drive_head & 240 | $cmd_last_sector$$ >> 24 & 15;
        this.push_irq();
        break;
      case 39:
        this.status = 80;
        $cmd_last_sector$$ = this.sector_count - 1;
        this.sector = $cmd_last_sector$$ & 255;
        this.cylinder_low = $cmd_last_sector$$ >> 8 & 255;
        this.cylinder_high = $cmd_last_sector$$ >> 16 & 255;
        this.sector |= $cmd_last_sector$$ >> 24 << 8 & 65280;
        this.push_irq();
        break;
      case 32:
      case 36:
      case 41:
      case 196:
        this.ata_read_sectors($cmd_last_sector$$);
        break;
      case 48:
      case 52:
      case 57:
      case 197:
        this.ata_write_sectors($cmd_last_sector$$);
        break;
      case 144:
        this.push_irq();
        this.error = 257;
        this.status = 80;
        break;
      case 145:
        this.status = 80;
        this.push_irq();
        break;
      case 160:
        this.is_atapi && (this.status = 88, this.data_allocate(12), this.data_end = 12, this.bytecount = 1, this.push_irq());
        break;
      case 161:
        $dbg_log$$("ATA identify packet device", 32768);
        this.is_atapi ? (this.create_identify_packet(), this.status = 88, this.cylinder_low = 20, this.cylinder_high = 235) : this.status = 65;
        this.push_irq();
        break;
      case 198:
        $dbg_log$$("Logical sectors per DRQ Block: " + $h$$(this.bytecount & 255), 32768);
        this.sectors_per_drq = this.bytecount & 255;
        this.status = 80;
        this.push_irq();
        break;
      case 37:
      case 200:
        this.ata_read_sectors_dma($cmd_last_sector$$);
        break;
      case 53:
      case 202:
        this.ata_write_sectors_dma($cmd_last_sector$$);
        break;
      case 64:
        $dbg_log$$("read verify sectors", 32768);
        this.status = 80;
        this.push_irq();
        break;
      case 218:
        $dbg_log$$("Unimplemented: get media status", 32768);
        this.status = 65;
        this.error = 4;
        this.push_irq();
        break;
      case 224:
        $dbg_log$$("ATA standby immediate", 32768);
        this.status = 80;
        this.push_irq();
        break;
      case 225:
        $dbg_log$$("ATA idle immediate", 32768);
        this.status = 80;
        this.push_irq();
        break;
      case 231:
        $dbg_log$$("ATA flush cache", 32768);
        this.status = 80;
        this.push_irq();
        break;
      case 236:
        $dbg_log$$("ATA identify device", 32768);
        if (this.is_atapi) {
          this.status = 65;
          this.error = 4;
          this.push_irq();
          break;
        }
        this.create_identify_packet();
        this.status = 88;
        this.push_irq();
        break;
      case 234:
        $dbg_log$$("flush cache ext", 32768);
        this.status = 80;
        this.push_irq();
        break;
      case 239:
        $dbg_log$$("set features: " + $h$$(this.bytecount & 255), 32768);
        this.status = 80;
        this.push_irq();
        break;
      case 222:
        this.status = 80;
        this.push_irq();
        break;
      case 245:
        $dbg_log$$("security freeze lock", 32768);
        this.status = 80;
        this.push_irq();
        break;
      case 249:
        $dbg_log$$("Unimplemented: set max address", 32768);
        this.status = 65;
        this.error = 4;
        break;
      default:
        $dbg_assert$$(!1, "New ATA cmd on 1F7: " + $h$$($cmd_last_sector$$), 32768), this.status = 65, this.error = 4;
    }
  } else {
    $dbg_log$$("abort: No buffer", 32768), this.error = 4, this.status = 65, this.push_irq();
  }
};
$IDEInterface$$.prototype.atapi_handle = function() {
  $dbg_log$$("ATAPI Command: " + $h$$(this.data[0]) + " slave=" + (this.drive_head >> 4 & 1), 32768);
  this.data_pointer = 0;
  this.current_atapi_command = this.data[0];
  switch(this.current_atapi_command) {
    case 0:
      $dbg_log$$("test unit ready", 32768);
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    case 3:
      this.data_allocate(this.data[4]);
      this.data_end = this.data_length;
      this.status = 88;
      this.data[0] = 240;
      this.data[2] = 5;
      this.data[7] = 8;
      break;
    case 18:
      var $count$jscomp$41_length$jscomp$19_sector_count$$ = this.data[4];
      this.status = 88;
      $dbg_log$$("inquiry: " + $h$$(this.data[1], 2) + " length=" + $count$jscomp$41_length$jscomp$19_sector_count$$, 32768);
      this.data.set([5, 128, 1, 49, 31, 0, 0, 0, 83, 79, 78, 89, 32, 32, 32, 32, 67, 68, 45, 82, 79, 77, 32, 67, 68, 85, 45, 49, 48, 48, 48, 32, 49, 46, 49, 97, ]);
      this.data_end = this.data_length = Math.min(36, $count$jscomp$41_length$jscomp$19_sector_count$$);
      break;
    case 26:
      this.data_allocate(this.data[4]);
      this.data_end = this.data_length;
      this.status = 88;
      break;
    case 30:
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    case 37:
      $count$jscomp$41_length$jscomp$19_sector_count$$ = this.sector_count - 1;
      this.data_set(new Uint8Array([$count$jscomp$41_length$jscomp$19_sector_count$$ >> 24 & 255, $count$jscomp$41_length$jscomp$19_sector_count$$ >> 16 & 255, $count$jscomp$41_length$jscomp$19_sector_count$$ >> 8 & 255, $count$jscomp$41_length$jscomp$19_sector_count$$ & 255, 0, 0, this.sector_size >> 8 & 255, this.sector_size & 255, ]));
      this.data_end = this.data_length;
      this.status = 88;
      break;
    case 40:
      this.lba_count & 1 ? this.atapi_read_dma(this.data) : this.atapi_read(this.data);
      break;
    case 66:
      $count$jscomp$41_length$jscomp$19_sector_count$$ = this.data[8];
      this.data_allocate(Math.min(8, $count$jscomp$41_length$jscomp$19_sector_count$$));
      this.data_end = this.data_length;
      $dbg_log$$("read q subcode: length=" + $count$jscomp$41_length$jscomp$19_sector_count$$, 32768);
      this.status = 88;
      break;
    case 67:
      $count$jscomp$41_length$jscomp$19_sector_count$$ = this.data[8] | this.data[7] << 8;
      var $format$jscomp$19_page_code$$ = this.data[9] >> 6;
      this.data_allocate($count$jscomp$41_length$jscomp$19_sector_count$$);
      this.data_end = this.data_length;
      $dbg_log$$("read toc: " + $h$$($format$jscomp$19_page_code$$, 2) + " length=" + $count$jscomp$41_length$jscomp$19_sector_count$$ + " " + (this.data[1] & 2) + " " + $h$$(this.data[6]), 32768);
      0 === $format$jscomp$19_page_code$$ ? ($count$jscomp$41_length$jscomp$19_sector_count$$ = this.sector_count, this.data.set(new Uint8Array([0, 18, 1, 1, 0, 20, 1, 0, 0, 0, 0, 0, 0, 22, 170, 0, $count$jscomp$41_length$jscomp$19_sector_count$$ >> 24, $count$jscomp$41_length$jscomp$19_sector_count$$ >> 16 & 255, $count$jscomp$41_length$jscomp$19_sector_count$$ >> 8 & 255, $count$jscomp$41_length$jscomp$19_sector_count$$ & 255, ]))) : 1 === $format$jscomp$19_page_code$$ ? this.data.set(new Uint8Array([0, 
      10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, ])) : $dbg_assert$$(!1, "Unimplemented format: " + $format$jscomp$19_page_code$$);
      this.status = 88;
      break;
    case 70:
      $count$jscomp$41_length$jscomp$19_sector_count$$ = this.data[8] | this.data[7] << 8;
      $count$jscomp$41_length$jscomp$19_sector_count$$ = Math.min($count$jscomp$41_length$jscomp$19_sector_count$$, 32);
      this.data_allocate($count$jscomp$41_length$jscomp$19_sector_count$$);
      this.data_end = this.data_length;
      this.data[0] = $count$jscomp$41_length$jscomp$19_sector_count$$ - 4 >> 24 & 255;
      this.data[1] = $count$jscomp$41_length$jscomp$19_sector_count$$ - 4 >> 16 & 255;
      this.data[2] = $count$jscomp$41_length$jscomp$19_sector_count$$ - 4 >> 8 & 255;
      this.data[3] = $count$jscomp$41_length$jscomp$19_sector_count$$ - 4 & 255;
      this.data[6] = 8;
      this.data[10] = 3;
      this.status = 88;
      break;
    case 81:
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    case 82:
      $dbg_log$$("Unimplemented ATAPI command: " + $h$$(this.data[0]), 32768);
      this.status = 81;
      this.data_length = 0;
      this.error = 80;
      break;
    case 90:
      $count$jscomp$41_length$jscomp$19_sector_count$$ = this.data[8] | this.data[7] << 8;
      $format$jscomp$19_page_code$$ = this.data[2];
      $dbg_log$$("mode sense: " + $h$$($format$jscomp$19_page_code$$) + " length=" + $count$jscomp$41_length$jscomp$19_sector_count$$, 32768);
      42 === $format$jscomp$19_page_code$$ && this.data_allocate(Math.min(30, $count$jscomp$41_length$jscomp$19_sector_count$$));
      this.data_end = this.data_length;
      this.status = 88;
      break;
    case 189:
      this.data_allocate(this.data[9] | this.data[8] << 8);
      this.data_end = this.data_length;
      this.data[5] = 1;
      this.status = 88;
      break;
    case 74:
      this.status = 81;
      this.data_length = 0;
      this.error = 80;
      $dbg_log$$("Unimplemented ATAPI command: " + $h$$(this.data[0]), 32768);
      break;
    case 190:
      $dbg_log$$("Unimplemented ATAPI command: " + $h$$(this.data[0]), 32768);
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    default:
      this.status = 81, this.data_length = 0, this.error = 80, $dbg_log$$("Unimplemented ATAPI command: " + $h$$(this.data[0]), 32768), $dbg_assert$$(!1);
  }
  this.bytecount = this.bytecount & -8 | 2;
  0 === (this.status & 128) && this.push_irq();
  0 === (this.status & 128) && 0 === this.data_length && (this.bytecount |= 1, this.status &= -9);
};
$IDEInterface$$.prototype.do_write = function() {
  this.status = 80;
  $dbg_assert$$(this.data_length <= this.data.length);
  var $data$jscomp$103$$ = this.data.subarray(0, this.data_length);
  $dbg_assert$$(0 === this.data_length % 512);
  this.ata_advance(this.current_command, this.data_length / 512);
  this.push_irq();
  this.buffer.set(this.write_dest, $data$jscomp$103$$, function() {
  });
  this.report_write(this.data_length);
};
$IDEInterface$$.prototype.atapi_read = function($cmd$jscomp$1_flags$jscomp$6$$) {
  var $lba$$ = $cmd$jscomp$1_flags$jscomp$6$$[2] << 24 | $cmd$jscomp$1_flags$jscomp$6$$[3] << 16 | $cmd$jscomp$1_flags$jscomp$6$$[4] << 8 | $cmd$jscomp$1_flags$jscomp$6$$[5], $count$jscomp$42$$ = $cmd$jscomp$1_flags$jscomp$6$$[7] << 8 | $cmd$jscomp$1_flags$jscomp$6$$[8];
  $cmd$jscomp$1_flags$jscomp$6$$ = $cmd$jscomp$1_flags$jscomp$6$$[1];
  var $byte_count$$ = $count$jscomp$42$$ * this.sector_size, $start$jscomp$21$$ = $lba$$ * this.sector_size;
  $dbg_log$$("CD read lba=" + $h$$($lba$$) + " lbacount=" + $h$$($count$jscomp$42$$) + " bytecount=" + $h$$($byte_count$$) + " flags=" + $h$$($cmd$jscomp$1_flags$jscomp$6$$), 32768);
  this.data_length = 0;
  var $req_length$$ = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
  $dbg_log$$($h$$(this.cylinder_high, 2) + " " + $h$$(this.cylinder_low, 2), 32768);
  this.cylinder_low = this.cylinder_high = 0;
  65535 === $req_length$$ && $req_length$$--;
  $req_length$$ > $byte_count$$ && ($req_length$$ = $byte_count$$);
  $start$jscomp$21$$ >= this.buffer.byteLength ? ($dbg_assert$$(!1, "CD read: Outside of disk  end=" + $h$$($start$jscomp$21$$ + $byte_count$$) + " size=" + $h$$(this.buffer.byteLength), 32768), this.status = 255, this.push_irq()) : 0 === $byte_count$$ ? (this.status = 80, this.data_pointer = 0) : ($byte_count$$ = Math.min($byte_count$$, this.buffer.byteLength - $start$jscomp$21$$), this.status = 208, this.report_read_start(), this.read_buffer($start$jscomp$21$$, $byte_count$$, $data$jscomp$104$$ => 
  {
    $dbg_log$$("cd read: data arrived", 32768);
    this.data_set($data$jscomp$104$$);
    this.status = 88;
    this.bytecount = this.bytecount & -8 | 2;
    this.push_irq();
    this.data_end = $req_length$$ &= -4;
    this.data_end > this.data_length && (this.data_end = this.data_length);
    this.cylinder_low = this.data_end & 255;
    this.cylinder_high = this.data_end >> 8 & 255;
    this.report_read_end($byte_count$$);
  }));
};
$IDEInterface$$.prototype.atapi_read_dma = function($cmd$jscomp$2_flags$jscomp$7$$) {
  var $lba$jscomp$1$$ = $cmd$jscomp$2_flags$jscomp$7$$[2] << 24 | $cmd$jscomp$2_flags$jscomp$7$$[3] << 16 | $cmd$jscomp$2_flags$jscomp$7$$[4] << 8 | $cmd$jscomp$2_flags$jscomp$7$$[5], $count$jscomp$43$$ = $cmd$jscomp$2_flags$jscomp$7$$[7] << 8 | $cmd$jscomp$2_flags$jscomp$7$$[8];
  $cmd$jscomp$2_flags$jscomp$7$$ = $cmd$jscomp$2_flags$jscomp$7$$[1];
  var $byte_count$jscomp$1$$ = $count$jscomp$43$$ * this.sector_size, $start$jscomp$22$$ = $lba$jscomp$1$$ * this.sector_size;
  $dbg_log$$("CD read DMA lba=" + $h$$($lba$jscomp$1$$) + " lbacount=" + $h$$($count$jscomp$43$$) + " bytecount=" + $h$$($byte_count$jscomp$1$$) + " flags=" + $h$$($cmd$jscomp$2_flags$jscomp$7$$), 32768);
  $start$jscomp$22$$ >= this.buffer.byteLength ? ($dbg_assert$$(!1, "CD read: Outside of disk  end=" + $h$$($start$jscomp$22$$ + $byte_count$jscomp$1$$) + " size=" + $h$$(this.buffer.byteLength), 32768), this.status = 255, this.push_irq()) : (this.status = 208, this.report_read_start(), this.read_buffer($start$jscomp$22$$, $byte_count$jscomp$1$$, $data$jscomp$105$$ => {
    $dbg_log$$("atapi_read_dma: Data arrived");
    this.report_read_end($byte_count$jscomp$1$$);
    this.status = 88;
    this.bytecount = this.bytecount & -8 | 2;
    this.data_set($data$jscomp$105$$);
    this.do_atapi_dma();
  }));
};
$IDEInterface$$.prototype.do_atapi_dma = function() {
  if (0 === (this.device.dma_status & 1)) {
    $dbg_log$$("do_atapi_dma: Status not set", 32768);
  } else {
    if (0 === (this.status & 8)) {
      $dbg_log$$("do_atapi_dma: DRQ not set", 32768);
    } else {
      $dbg_log$$("atapi dma transfer len=" + this.data_length, 32768);
      var $prdt_start$$ = this.device.prdt_addr, $offset$jscomp$37$$ = 0, $data$jscomp$106$$ = this.data;
      do {
        var $addr$jscomp$8$$ = this.cpu.read32s($prdt_start$$), $count$jscomp$44$$ = this.cpu.read16($prdt_start$$ + 4), $end$jscomp$13$$ = this.cpu.read8($prdt_start$$ + 7) & 128;
        $count$jscomp$44$$ || ($count$jscomp$44$$ = 65536);
        $dbg_log$$("dma read dest=" + $h$$($addr$jscomp$8$$) + " count=" + $h$$($count$jscomp$44$$) + " datalen=" + $h$$(this.data_length), 32768);
        this.cpu.write_blob($data$jscomp$106$$.subarray($offset$jscomp$37$$, Math.min($offset$jscomp$37$$ + $count$jscomp$44$$, this.data_length)), $addr$jscomp$8$$);
        $offset$jscomp$37$$ += $count$jscomp$44$$;
        $prdt_start$$ += 8;
        if ($offset$jscomp$37$$ >= this.data_length && !$end$jscomp$13$$) {
          $dbg_log$$("leave early end=" + +$end$jscomp$13$$ + " offset=" + $h$$($offset$jscomp$37$$) + " data_length=" + $h$$(this.data_length) + " cmd=" + $h$$(this.current_command), 32768);
          break;
        }
      } while (!$end$jscomp$13$$);
      $dbg_log$$("end offset=" + $offset$jscomp$37$$, 32768);
      this.status = 80;
      this.device.dma_status &= -2;
      this.bytecount = this.bytecount & -8 | 3;
      this.push_irq();
    }
  }
};
$IDEInterface$$.prototype.read_data = function($length$jscomp$20$$) {
  if (this.data_pointer < this.data_end) {
    $dbg_assert$$(this.data_pointer + $length$jscomp$20$$ - 1 < this.data_end);
    $dbg_assert$$(0 === this.data_pointer % $length$jscomp$20$$, $h$$(this.data_pointer) + " " + $length$jscomp$20$$);
    var $result$jscomp$5$$ = 1 === $length$jscomp$20$$ ? this.data[this.data_pointer] : 2 === $length$jscomp$20$$ ? this.data16[this.data_pointer >>> 1] : this.data32[this.data_pointer >>> 2];
    this.data_pointer += $length$jscomp$20$$;
    0 === (this.data_pointer & (0 === (this.data_end & 4095) ? 4095 : 255)) && $dbg_log$$("Read 1F0: " + $h$$(this.data[this.data_pointer], 2) + " cur=" + $h$$(this.data_pointer) + " cnt=" + $h$$(this.data_length), 32768);
    this.data_pointer >= this.data_end && this.read_end();
    return $result$jscomp$5$$;
  }
  $dbg_log$$("Read 1F0: empty", 32768);
  this.data_pointer += $length$jscomp$20$$;
  return 0;
};
$IDEInterface$$.prototype.read_end = function() {
  $dbg_log$$("read_end cmd=" + $h$$(this.current_command) + " data_pointer=" + $h$$(this.data_pointer) + " end=" + $h$$(this.data_end) + " length=" + $h$$(this.data_length), 32768);
  if (160 === this.current_command) {
    if (this.data_end === this.data_length) {
      this.status = 80, this.bytecount = this.bytecount & -8 | 3, this.push_irq();
    } else {
      this.status = 88;
      this.bytecount = this.bytecount & -8 | 2;
      this.push_irq();
      var $byte_count$jscomp$2_sector_count$jscomp$1$$ = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
      this.data_end + $byte_count$jscomp$2_sector_count$jscomp$1$$ > this.data_length ? (this.cylinder_low = this.data_length - this.data_end & 255, this.cylinder_high = this.data_length - this.data_end >> 8 & 255, this.data_end = this.data_length) : this.data_end += $byte_count$jscomp$2_sector_count$jscomp$1$$;
      $dbg_log$$("data_end=" + $h$$(this.data_end), 32768);
    }
  } else {
    this.error = 0, this.data_pointer >= this.data_length ? this.status = 80 : (196 === this.current_command || 41 === this.current_command ? ($byte_count$jscomp$2_sector_count$jscomp$1$$ = Math.min(this.sectors_per_drq, (this.data_length - this.data_end) / 512), $dbg_assert$$(0 === $byte_count$jscomp$2_sector_count$jscomp$1$$ % 1)) : ($dbg_assert$$(32 === this.current_command || 36 === this.current_command), $byte_count$jscomp$2_sector_count$jscomp$1$$ = 1), this.ata_advance(this.current_command, 
    $byte_count$jscomp$2_sector_count$jscomp$1$$), this.data_end += 512 * $byte_count$jscomp$2_sector_count$jscomp$1$$, this.status = 88, this.push_irq());
  }
};
$IDEInterface$$.prototype.write_data_port = function($data$jscomp$107$$, $length$jscomp$21$$) {
  $dbg_assert$$(0 === this.data_pointer % $length$jscomp$21$$);
  this.data_pointer >= this.data_end ? $dbg_log$$("Redundant write to data port: " + $h$$($data$jscomp$107$$) + " count=" + $h$$(this.data_end) + " cur=" + $h$$(this.data_pointer), 32768) : ((0 === (this.data_pointer + $length$jscomp$21$$ & (0 === (this.data_end & 4095) ? 4095 : 255)) || 20 > this.data_end) && $dbg_log$$("Data port: " + $h$$($data$jscomp$107$$ >>> 0) + " count=" + $h$$(this.data_end) + " cur=" + $h$$(this.data_pointer), 32768), 1 === $length$jscomp$21$$ ? this.data[this.data_pointer++] = 
  $data$jscomp$107$$ : 2 === $length$jscomp$21$$ ? (this.data16[this.data_pointer >>> 1] = $data$jscomp$107$$, this.data_pointer += 2) : (this.data32[this.data_pointer >>> 2] = $data$jscomp$107$$, this.data_pointer += 4), $dbg_assert$$(this.data_pointer <= this.data_end), this.data_pointer === this.data_end && this.write_end());
};
$IDEInterface$$.prototype.write_data_port8 = function($data$jscomp$108$$) {
  this.write_data_port($data$jscomp$108$$, 1);
};
$IDEInterface$$.prototype.write_data_port16 = function($data$jscomp$109$$) {
  this.write_data_port($data$jscomp$109$$, 2);
};
$IDEInterface$$.prototype.write_data_port32 = function($data$jscomp$110$$) {
  this.write_data_port($data$jscomp$110$$, 4);
};
$IDEInterface$$.prototype.write_end = function() {
  160 === this.current_command ? this.atapi_handle() : ($dbg_log$$("write_end data_pointer=" + $h$$(this.data_pointer) + " data_length=" + $h$$(this.data_length), 32768), this.data_pointer >= this.data_length ? this.do_write() : ($dbg_assert$$(48 === this.current_command || 52 === this.current_command || 197 === this.current_command, "Unexpected command: " + $h$$(this.current_command)), this.status = 88, this.data_end += 512, this.push_irq()));
};
$IDEInterface$$.prototype.ata_advance = function($cmd$jscomp$3_new_sector$$, $c_sectors$$) {
  $dbg_log$$("Advance sectors=" + $c_sectors$$ + " old_bytecount=" + this.bytecount, 32768);
  this.bytecount -= $c_sectors$$;
  36 === $cmd$jscomp$3_new_sector$$ || 41 === $cmd$jscomp$3_new_sector$$ || 52 === $cmd$jscomp$3_new_sector$$ || 57 === $cmd$jscomp$3_new_sector$$ || 37 === $cmd$jscomp$3_new_sector$$ || 53 === $cmd$jscomp$3_new_sector$$ ? ($cmd$jscomp$3_new_sector$$ = $c_sectors$$ + this.get_lba48(), this.sector = $cmd$jscomp$3_new_sector$$ & 255 | $cmd$jscomp$3_new_sector$$ >> 16 & 65280, this.cylinder_low = $cmd$jscomp$3_new_sector$$ >> 8 & 255, this.cylinder_high = $cmd$jscomp$3_new_sector$$ >> 16 & 255) : this.is_lba ? 
  ($cmd$jscomp$3_new_sector$$ = $c_sectors$$ + this.get_lba28(), this.sector = $cmd$jscomp$3_new_sector$$ & 255, this.cylinder_low = $cmd$jscomp$3_new_sector$$ >> 8 & 255, this.cylinder_high = $cmd$jscomp$3_new_sector$$ >> 16 & 255, this.head = this.head & -16 | $cmd$jscomp$3_new_sector$$ & 15) : ($cmd$jscomp$3_new_sector$$ = $c_sectors$$ + this.get_chs(), $c_sectors$$ = $cmd$jscomp$3_new_sector$$ / (this.head_count * this.sectors_per_track) | 0, this.cylinder_low = $c_sectors$$ & 255, this.cylinder_high = 
  $c_sectors$$ >> 8 & 255, this.head = ($cmd$jscomp$3_new_sector$$ / this.sectors_per_track | 0) % this.head_count & 15, this.sector = $cmd$jscomp$3_new_sector$$ % this.sectors_per_track + 1 & 255, $dbg_assert$$($cmd$jscomp$3_new_sector$$ === this.get_chs()));
};
$IDEInterface$$.prototype.ata_read_sectors = function($cmd$jscomp$4$$) {
  var $is_lba48_lba$jscomp$2$$ = 36 === $cmd$jscomp$4$$ || 41 === $cmd$jscomp$4$$, $count$jscomp$45$$ = this.get_count($is_lba48_lba$jscomp$2$$);
  $is_lba48_lba$jscomp$2$$ = this.get_lba($is_lba48_lba$jscomp$2$$);
  var $is_single$$ = 32 === $cmd$jscomp$4$$ || 36 === $cmd$jscomp$4$$, $byte_count$jscomp$3$$ = $count$jscomp$45$$ * this.sector_size, $start$jscomp$23$$ = $is_lba48_lba$jscomp$2$$ * this.sector_size;
  $dbg_log$$("ATA read cmd=" + $h$$($cmd$jscomp$4$$) + " mode=" + (this.is_lba ? "lba" : "chs") + " lba=" + $h$$($is_lba48_lba$jscomp$2$$) + " lbacount=" + $h$$($count$jscomp$45$$) + " bytecount=" + $h$$($byte_count$jscomp$3$$), 32768);
  $start$jscomp$23$$ + $byte_count$jscomp$3$$ > this.buffer.byteLength ? ($dbg_assert$$(!1, "ATA read: Outside of disk", 32768), this.status = 255, this.push_irq()) : (this.status = 192, this.report_read_start(), this.read_buffer($start$jscomp$23$$, $byte_count$jscomp$3$$, $data$jscomp$111$$ => {
    $dbg_log$$("ata_read: Data arrived", 32768);
    this.data_set($data$jscomp$111$$);
    this.status = 88;
    this.data_end = $is_single$$ ? 512 : Math.min($byte_count$jscomp$3$$, 512 * this.sectors_per_drq);
    this.ata_advance($cmd$jscomp$4$$, $is_single$$ ? 1 : Math.min($count$jscomp$45$$, this.sectors_per_track));
    this.push_irq();
    this.report_read_end($byte_count$jscomp$3$$);
  }));
};
$IDEInterface$$.prototype.ata_read_sectors_dma = function($cmd$jscomp$5_count$jscomp$46$$) {
  var $is_lba48$jscomp$1_lba$jscomp$3$$ = 37 === $cmd$jscomp$5_count$jscomp$46$$;
  $cmd$jscomp$5_count$jscomp$46$$ = this.get_count($is_lba48$jscomp$1_lba$jscomp$3$$);
  $is_lba48$jscomp$1_lba$jscomp$3$$ = this.get_lba($is_lba48$jscomp$1_lba$jscomp$3$$);
  var $byte_count$jscomp$4$$ = $cmd$jscomp$5_count$jscomp$46$$ * this.sector_size, $start$jscomp$24$$ = $is_lba48$jscomp$1_lba$jscomp$3$$ * this.sector_size;
  $dbg_log$$("ATA DMA read lba=" + $h$$($is_lba48$jscomp$1_lba$jscomp$3$$) + " lbacount=" + $h$$($cmd$jscomp$5_count$jscomp$46$$) + " bytecount=" + $h$$($byte_count$jscomp$4$$), 32768);
  $start$jscomp$24$$ + $byte_count$jscomp$4$$ > this.buffer.byteLength ? ($dbg_assert$$(!1, "ATA read: Outside of disk", 32768), this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1);
};
$IDEInterface$$.prototype.do_ata_read_sectors_dma = function() {
  var $is_lba48$jscomp$2_lba$jscomp$4$$ = 37 === this.current_command, $count$jscomp$47$$ = this.get_count($is_lba48$jscomp$2_lba$jscomp$4$$);
  $is_lba48$jscomp$2_lba$jscomp$4$$ = this.get_lba($is_lba48$jscomp$2_lba$jscomp$4$$);
  var $byte_count$jscomp$5$$ = $count$jscomp$47$$ * this.sector_size, $start$jscomp$25$$ = $is_lba48$jscomp$2_lba$jscomp$4$$ * this.sector_size;
  $dbg_assert$$($is_lba48$jscomp$2_lba$jscomp$4$$ < this.buffer.byteLength);
  this.report_read_start();
  var $orig_prdt_start$$ = this.device.prdt_addr;
  this.read_buffer($start$jscomp$25$$, $byte_count$jscomp$5$$, $data$jscomp$112$$ => {
    $dbg_log$$("do_ata_read_sectors_dma: Data arrived", 32768);
    var $prdt_start$jscomp$1$$ = this.device.prdt_addr, $offset$jscomp$38$$ = 0;
    $dbg_assert$$($orig_prdt_start$$ === $prdt_start$jscomp$1$$);
    do {
      var $prd_addr$$ = this.cpu.read32s($prdt_start$jscomp$1$$), $prd_count$$ = this.cpu.read16($prdt_start$jscomp$1$$ + 4), $end$jscomp$14$$ = this.cpu.read8($prdt_start$jscomp$1$$ + 7) & 128;
      $prd_count$$ || ($prd_count$$ = 65536, $dbg_log$$("dma: prd count was 0", 32768));
      $dbg_log$$("dma read transfer dest=" + $h$$($prd_addr$$) + " prd_count=" + $h$$($prd_count$$), 32768);
      this.cpu.write_blob($data$jscomp$112$$.subarray($offset$jscomp$38$$, $offset$jscomp$38$$ + $prd_count$$), $prd_addr$$);
      $offset$jscomp$38$$ += $prd_count$$;
      $prdt_start$jscomp$1$$ += 8;
    } while (!$end$jscomp$14$$);
    $dbg_assert$$($offset$jscomp$38$$ === $byte_count$jscomp$5$$);
    this.ata_advance(this.current_command, $count$jscomp$47$$);
    this.status = 80;
    this.device.dma_status &= -2;
    this.current_command = -1;
    this.push_irq();
    this.report_read_end($byte_count$jscomp$5$$);
  });
};
$IDEInterface$$.prototype.ata_write_sectors = function($cmd$jscomp$7_is_single$jscomp$1$$) {
  var $is_lba48$jscomp$3_lba$jscomp$5$$ = 52 === $cmd$jscomp$7_is_single$jscomp$1$$ || 57 === $cmd$jscomp$7_is_single$jscomp$1$$, $count$jscomp$48$$ = this.get_count($is_lba48$jscomp$3_lba$jscomp$5$$);
  $is_lba48$jscomp$3_lba$jscomp$5$$ = this.get_lba($is_lba48$jscomp$3_lba$jscomp$5$$);
  $cmd$jscomp$7_is_single$jscomp$1$$ = 48 === $cmd$jscomp$7_is_single$jscomp$1$$ || 52 === $cmd$jscomp$7_is_single$jscomp$1$$;
  var $byte_count$jscomp$6$$ = $count$jscomp$48$$ * this.sector_size, $start$jscomp$26$$ = $is_lba48$jscomp$3_lba$jscomp$5$$ * this.sector_size;
  $dbg_log$$("ATA write lba=" + $h$$($is_lba48$jscomp$3_lba$jscomp$5$$) + " mode=" + (this.is_lba ? "lba" : "chs") + " lbacount=" + $h$$($count$jscomp$48$$) + " bytecount=" + $h$$($byte_count$jscomp$6$$), 32768);
  $start$jscomp$26$$ + $byte_count$jscomp$6$$ > this.buffer.byteLength ? ($dbg_assert$$(!1, "ATA write: Outside of disk", 32768), this.status = 255, this.push_irq()) : (this.status = 88, this.data_allocate_noclear($byte_count$jscomp$6$$), this.data_end = $cmd$jscomp$7_is_single$jscomp$1$$ ? 512 : Math.min($byte_count$jscomp$6$$, 512 * this.sectors_per_drq), this.write_dest = $start$jscomp$26$$);
};
$IDEInterface$$.prototype.ata_write_sectors_dma = function($cmd$jscomp$8_count$jscomp$49$$) {
  var $is_lba48$jscomp$4_lba$jscomp$6$$ = 53 === $cmd$jscomp$8_count$jscomp$49$$;
  $cmd$jscomp$8_count$jscomp$49$$ = this.get_count($is_lba48$jscomp$4_lba$jscomp$6$$);
  $is_lba48$jscomp$4_lba$jscomp$6$$ = this.get_lba($is_lba48$jscomp$4_lba$jscomp$6$$);
  var $byte_count$jscomp$7$$ = $cmd$jscomp$8_count$jscomp$49$$ * this.sector_size, $start$jscomp$27$$ = $is_lba48$jscomp$4_lba$jscomp$6$$ * this.sector_size;
  $dbg_log$$("ATA DMA write lba=" + $h$$($is_lba48$jscomp$4_lba$jscomp$6$$) + " lbacount=" + $h$$($cmd$jscomp$8_count$jscomp$49$$) + " bytecount=" + $h$$($byte_count$jscomp$7$$), 32768);
  $start$jscomp$27$$ + $byte_count$jscomp$7$$ > this.buffer.byteLength ? ($dbg_assert$$(!1, "ATA DMA write: Outside of disk", 32768), this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1);
};
$IDEInterface$$.prototype.do_ata_write_sectors_dma = function() {
  var $byte_count$jscomp$8_is_lba48$jscomp$5$$ = 53 === this.current_command, $count$jscomp$50$$ = this.get_count($byte_count$jscomp$8_is_lba48$jscomp$5$$), $lba$jscomp$7_start$jscomp$28$$ = this.get_lba($byte_count$jscomp$8_is_lba48$jscomp$5$$);
  $byte_count$jscomp$8_is_lba48$jscomp$5$$ = $count$jscomp$50$$ * this.sector_size;
  $lba$jscomp$7_start$jscomp$28$$ *= this.sector_size;
  var $prdt_start$jscomp$2$$ = this.device.prdt_addr, $offset$jscomp$39$$ = 0;
  $dbg_log$$("prdt addr: " + $h$$($prdt_start$jscomp$2$$, 8), 32768);
  const $buffer$jscomp$27$$ = new Uint8Array($byte_count$jscomp$8_is_lba48$jscomp$5$$);
  do {
    var $prd_addr$jscomp$1_slice$jscomp$3$$ = this.cpu.read32s($prdt_start$jscomp$2$$), $prd_count$jscomp$1$$ = this.cpu.read16($prdt_start$jscomp$2$$ + 4), $end$jscomp$15$$ = this.cpu.read8($prdt_start$jscomp$2$$ + 7) & 128;
    $prd_count$jscomp$1$$ || ($prd_count$jscomp$1$$ = 65536, $dbg_log$$("dma: prd count was 0", 32768));
    $dbg_log$$("dma write transfer dest=" + $h$$($prd_addr$jscomp$1_slice$jscomp$3$$) + " prd_count=" + $h$$($prd_count$jscomp$1$$), 32768);
    $prd_addr$jscomp$1_slice$jscomp$3$$ = this.cpu.mem8.subarray($prd_addr$jscomp$1_slice$jscomp$3$$, $prd_addr$jscomp$1_slice$jscomp$3$$ + $prd_count$jscomp$1$$);
    $dbg_assert$$($prd_addr$jscomp$1_slice$jscomp$3$$.length === $prd_count$jscomp$1$$);
    $buffer$jscomp$27$$.set($prd_addr$jscomp$1_slice$jscomp$3$$, $offset$jscomp$39$$);
    $offset$jscomp$39$$ += $prd_count$jscomp$1$$;
    $prdt_start$jscomp$2$$ += 8;
  } while (!$end$jscomp$15$$);
  $dbg_assert$$($offset$jscomp$39$$ === $buffer$jscomp$27$$.length);
  this.buffer.set($lba$jscomp$7_start$jscomp$28$$, $buffer$jscomp$27$$, () => {
    $dbg_log$$("dma write completed", 32768);
    this.ata_advance(this.current_command, $count$jscomp$50$$);
    this.status = 80;
    this.push_irq();
    this.device.dma_status &= -2;
    this.current_command = -1;
  });
  this.report_write($byte_count$jscomp$8_is_lba48$jscomp$5$$);
};
$IDEInterface$$.prototype.get_chs = function() {
  var $c$jscomp$1$$ = this.cylinder_low & 255 | this.cylinder_high << 8 & 65280, $h$jscomp$7$$ = this.head, $s$jscomp$5$$ = this.sector & 255;
  $dbg_log$$("get_chs: c=" + $c$jscomp$1$$ + " h=" + $h$jscomp$7$$ + " s=" + $s$jscomp$5$$, 32768);
  return ($c$jscomp$1$$ * this.head_count + $h$jscomp$7$$) * this.sectors_per_track + $s$jscomp$5$$ - 1;
};
$IDEInterface$$.prototype.get_lba28 = function() {
  return this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | (this.head & 15) << 24;
};
$IDEInterface$$.prototype.get_lba48 = function() {
  return (this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | this.sector >> 8 << 24 & 4278190080) >>> 0;
};
$IDEInterface$$.prototype.get_lba = function($is_lba48$jscomp$6$$) {
  return $is_lba48$jscomp$6$$ ? this.get_lba48() : this.is_lba ? this.get_lba28() : this.get_chs();
};
$IDEInterface$$.prototype.get_count = function($count$jscomp$51_is_lba48$jscomp$7$$) {
  $count$jscomp$51_is_lba48$jscomp$7$$ ? ($count$jscomp$51_is_lba48$jscomp$7$$ = this.bytecount, 0 === $count$jscomp$51_is_lba48$jscomp$7$$ && ($count$jscomp$51_is_lba48$jscomp$7$$ = 65536)) : ($count$jscomp$51_is_lba48$jscomp$7$$ = this.bytecount & 255, 0 === $count$jscomp$51_is_lba48$jscomp$7$$ && ($count$jscomp$51_is_lba48$jscomp$7$$ = 256));
  return $count$jscomp$51_is_lba48$jscomp$7$$;
};
$IDEInterface$$.prototype.create_identify_packet = function() {
  if (this.drive_head & 16) {
    this.data_allocate(0);
  } else {
    for (var $cylinder_count_i$jscomp$17$$ = 0; 512 > $cylinder_count_i$jscomp$17$$; $cylinder_count_i$jscomp$17$$++) {
      this.data[$cylinder_count_i$jscomp$17$$] = 0;
    }
    $cylinder_count_i$jscomp$17$$ = Math.min(16383, this.cylinder_count);
    this.data_set([64, this.is_atapi ? 133 : 0, $cylinder_count_i$jscomp$17$$, $cylinder_count_i$jscomp$17$$ >> 8, 0, 0, this.head_count, this.head_count >> 8, this.sectors_per_track / 512, this.sectors_per_track / 512 >> 8, 0, 2, this.sectors_per_track, this.sectors_per_track >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 118, 32, 54, 68, 72, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 
    32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 128, 0, 1, 0, 0, 2, 0, 0, 0, 2, 0, 2, 7, 0, $cylinder_count_i$jscomp$17$$, $cylinder_count_i$jscomp$17$$ >> 8, this.head_count, this.head_count >> 8, this.sectors_per_track, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, 0, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, 0, 0, 160 === this.current_command ? 
    0 : 7, 160 === this.current_command ? 0 : 4, 0, 0, 30, 0, 30, 0, 30, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 0, 0, 0, 0, 0, 0, 116, 0, 64, 0, 64, 0, 116, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, ]);
    this.data_end = this.data_length = 512;
  }
};
$IDEInterface$$.prototype.data_allocate = function($len$jscomp$12$$) {
  this.data_allocate_noclear($len$jscomp$12$$);
  for (var $i$jscomp$18$$ = 0; $i$jscomp$18$$ < $len$jscomp$12$$ + 3 >> 2; $i$jscomp$18$$++) {
    this.data32[$i$jscomp$18$$] = 0;
  }
};
$IDEInterface$$.prototype.data_allocate_noclear = function($len$jscomp$13$$) {
  this.data.length < $len$jscomp$13$$ && (this.data = new Uint8Array($len$jscomp$13$$ + 3 & -4), this.data16 = new Uint16Array(this.data.buffer), this.data32 = new Int32Array(this.data.buffer));
  this.data_length = $len$jscomp$13$$;
  this.data_pointer = 0;
};
$IDEInterface$$.prototype.data_set = function($data$jscomp$113$$) {
  this.data_allocate_noclear($data$jscomp$113$$.length);
  this.data.set($data$jscomp$113$$);
};
$IDEInterface$$.prototype.report_read_start = function() {
  this.bus.send("ide-read-start");
};
$IDEInterface$$.prototype.report_read_end = function($byte_count$jscomp$9$$) {
  this.bus.send("ide-read-end", [this.nr, $byte_count$jscomp$9$$, $byte_count$jscomp$9$$ / this.sector_size | 0]);
};
$IDEInterface$$.prototype.report_write = function($byte_count$jscomp$10$$) {
  this.bus.send("ide-write-end", [this.nr, $byte_count$jscomp$10$$, $byte_count$jscomp$10$$ / this.sector_size | 0]);
};
$IDEInterface$$.prototype.read_buffer = function($start$jscomp$29$$, $length$jscomp$22$$, $callback$jscomp$46$$) {
  const $id$jscomp$7$$ = this.last_io_id++;
  this.in_progress_io_ids.add($id$jscomp$7$$);
  this.buffer.get($start$jscomp$29$$, $length$jscomp$22$$, $data$jscomp$114$$ => {
    if (this.cancelled_io_ids.delete($id$jscomp$7$$)) {
      $dbg_assert$$(!this.in_progress_io_ids.has($id$jscomp$7$$));
    } else {
      var $removed$$ = this.in_progress_io_ids.delete($id$jscomp$7$$);
      $dbg_assert$$($removed$$);
      $callback$jscomp$46$$($data$jscomp$114$$);
    }
  });
};
$IDEInterface$$.prototype.cancel_io_operations = function() {
  for (const $id$jscomp$8$$ of this.in_progress_io_ids) {
    this.cancelled_io_ids.add($id$jscomp$8$$);
  }
  this.in_progress_io_ids.clear();
};
$IDEInterface$$.prototype.get_state = function() {
  var $state$jscomp$10$$ = [];
  $state$jscomp$10$$[0] = this.bytecount;
  $state$jscomp$10$$[1] = this.cylinder_count;
  $state$jscomp$10$$[2] = this.cylinder_high;
  $state$jscomp$10$$[3] = this.cylinder_low;
  $state$jscomp$10$$[4] = this.data_pointer;
  $state$jscomp$10$$[5] = 0;
  $state$jscomp$10$$[6] = 0;
  $state$jscomp$10$$[7] = 0;
  $state$jscomp$10$$[8] = 0;
  $state$jscomp$10$$[9] = this.drive_head;
  $state$jscomp$10$$[10] = this.error;
  $state$jscomp$10$$[11] = this.head;
  $state$jscomp$10$$[12] = this.head_count;
  $state$jscomp$10$$[13] = this.is_atapi;
  $state$jscomp$10$$[14] = this.is_lba;
  $state$jscomp$10$$[15] = this.lba_count;
  $state$jscomp$10$$[16] = this.data;
  $state$jscomp$10$$[17] = this.data_length;
  $state$jscomp$10$$[18] = this.sector;
  $state$jscomp$10$$[19] = this.sector_count;
  $state$jscomp$10$$[20] = this.sector_size;
  $state$jscomp$10$$[21] = this.sectors_per_drq;
  $state$jscomp$10$$[22] = this.sectors_per_track;
  $state$jscomp$10$$[23] = this.status;
  $state$jscomp$10$$[24] = this.write_dest;
  $state$jscomp$10$$[25] = this.current_command;
  $state$jscomp$10$$[26] = this.data_end;
  $state$jscomp$10$$[27] = this.current_atapi_command;
  $state$jscomp$10$$[28] = this.buffer;
  return $state$jscomp$10$$;
};
$IDEInterface$$.prototype.set_state = function($state$jscomp$11$$) {
  this.bytecount = $state$jscomp$11$$[0];
  this.cylinder_count = $state$jscomp$11$$[1];
  this.cylinder_high = $state$jscomp$11$$[2];
  this.cylinder_low = $state$jscomp$11$$[3];
  this.data_pointer = $state$jscomp$11$$[4];
  this.drive_head = $state$jscomp$11$$[9];
  this.error = $state$jscomp$11$$[10];
  this.head = $state$jscomp$11$$[11];
  this.head_count = $state$jscomp$11$$[12];
  this.is_atapi = $state$jscomp$11$$[13];
  this.is_lba = $state$jscomp$11$$[14];
  this.lba_count = $state$jscomp$11$$[15];
  this.data = $state$jscomp$11$$[16];
  this.data_length = $state$jscomp$11$$[17];
  this.sector = $state$jscomp$11$$[18];
  this.sector_count = $state$jscomp$11$$[19];
  this.sector_size = $state$jscomp$11$$[20];
  this.sectors_per_drq = $state$jscomp$11$$[21];
  this.sectors_per_track = $state$jscomp$11$$[22];
  this.status = $state$jscomp$11$$[23];
  this.write_dest = $state$jscomp$11$$[24];
  this.current_command = $state$jscomp$11$$[25];
  this.data_end = $state$jscomp$11$$[26];
  this.current_atapi_command = $state$jscomp$11$$[27];
  this.data16 = new Uint16Array(this.data.buffer);
  this.data32 = new Int32Array(this.data.buffer);
  this.buffer && this.buffer.set_state($state$jscomp$11$$[28]);
};
function $PCI$$($cpu$jscomp$4$$) {
  this.pci_addr = new Uint8Array(4);
  this.pci_value = new Uint8Array(4);
  this.pci_response = new Uint8Array(4);
  this.pci_status = new Uint8Array(4);
  this.pci_addr32 = new Int32Array(this.pci_addr.buffer);
  this.pci_value32 = new Int32Array(this.pci_value.buffer);
  this.pci_response32 = new Int32Array(this.pci_response.buffer);
  this.pci_status32 = new Int32Array(this.pci_status.buffer);
  this.device_spaces = [];
  this.devices = [];
  this.cpu = $cpu$jscomp$4$$;
  for (var $i$jscomp$19$$ = 0; 256 > $i$jscomp$19$$; $i$jscomp$19$$++) {
    this.device_spaces[$i$jscomp$19$$] = void 0, this.devices[$i$jscomp$19$$] = void 0;
  }
  this.io = $cpu$jscomp$4$$.io;
  $cpu$jscomp$4$$.io.register_write(3324, this, function($value$jscomp$102$$) {
    this.pci_write8(this.pci_addr32[0], $value$jscomp$102$$);
  }, function($value$jscomp$103$$) {
    this.pci_write16(this.pci_addr32[0], $value$jscomp$103$$);
  }, function($value$jscomp$104$$) {
    this.pci_write32(this.pci_addr32[0], $value$jscomp$104$$);
  });
  $cpu$jscomp$4$$.io.register_write(3325, this, function($value$jscomp$105$$) {
    this.pci_write8(this.pci_addr32[0] + 1 | 0, $value$jscomp$105$$);
  });
  $cpu$jscomp$4$$.io.register_write(3326, this, function($value$jscomp$106$$) {
    this.pci_write8(this.pci_addr32[0] + 2 | 0, $value$jscomp$106$$);
  }, function($value$jscomp$107$$) {
    this.pci_write16(this.pci_addr32[0] + 2 | 0, $value$jscomp$107$$);
  });
  $cpu$jscomp$4$$.io.register_write(3327, this, function($value$jscomp$108$$) {
    this.pci_write8(this.pci_addr32[0] + 3 | 0, $value$jscomp$108$$);
  });
  $cpu$jscomp$4$$.io.register_read_consecutive(3324, this, function() {
    return this.pci_response[0];
  }, function() {
    return this.pci_response[1];
  }, function() {
    return this.pci_response[2];
  }, function() {
    return this.pci_response[3];
  });
  $cpu$jscomp$4$$.io.register_read_consecutive(3320, this, function() {
    return this.pci_status[0];
  }, function() {
    return this.pci_status[1];
  }, function() {
    return this.pci_status[2];
  }, function() {
    return this.pci_status[3];
  });
  $cpu$jscomp$4$$.io.register_write_consecutive(3320, this, function($out_byte$$) {
    this.pci_addr[0] = $out_byte$$ & 252;
  }, function($out_byte$jscomp$1$$) {
    2 === (this.pci_addr[1] & 6) && 6 === ($out_byte$jscomp$1$$ & 6) ? ($dbg_log$$("CPU reboot via PCI"), $cpu$jscomp$4$$.reboot_internal()) : this.pci_addr[1] = $out_byte$jscomp$1$$;
  }, function($out_byte$jscomp$2$$) {
    this.pci_addr[2] = $out_byte$jscomp$2$$;
  }, function($out_byte$jscomp$3$$) {
    this.pci_addr[3] = $out_byte$jscomp$3$$;
    this.pci_query();
  });
  this.register_device({pci_id:0, pci_space:[134, 128, 55, 18, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, ], pci_bars:[], name:"82441FX PMC", });
  this.isa_bridge = {pci_id:8, pci_space:[134, 128, 0, 112, 7, 0, 0, 2, 0, 0, 1, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ], pci_bars:[], name:"82371SB PIIX3 ISA", };
  this.isa_bridge_space = this.register_device(this.isa_bridge);
  this.isa_bridge_space8 = new Uint8Array(this.isa_bridge_space.buffer);
}
$PCI$$.prototype.get_state = function() {
  for (var $state$jscomp$12$$ = [], $i$jscomp$20$$ = 0; 256 > $i$jscomp$20$$; $i$jscomp$20$$++) {
    $state$jscomp$12$$[$i$jscomp$20$$] = this.device_spaces[$i$jscomp$20$$];
  }
  $state$jscomp$12$$[256] = this.pci_addr;
  $state$jscomp$12$$[257] = this.pci_value;
  $state$jscomp$12$$[258] = this.pci_response;
  $state$jscomp$12$$[259] = this.pci_status;
  return $state$jscomp$12$$;
};
$PCI$$.prototype.set_state = function($state$jscomp$13$$) {
  for (var $i$jscomp$21$$ = 0; 256 > $i$jscomp$21$$; $i$jscomp$21$$++) {
    var $device$jscomp$5$$ = this.devices[$i$jscomp$21$$], $space$jscomp$1$$ = $state$jscomp$13$$[$i$jscomp$21$$];
    if ($device$jscomp$5$$ && $space$jscomp$1$$) {
      for (var $bar_nr$$ = 0; $bar_nr$$ < $device$jscomp$5$$.pci_bars.length; $bar_nr$$++) {
        var $value$jscomp$109$$ = $space$jscomp$1$$[4 + $bar_nr$$];
        if ($value$jscomp$109$$ & 1) {
          var $bar$$ = $device$jscomp$5$$.pci_bars[$bar_nr$$];
          this.set_io_bars($bar$$, $bar$$.original_bar & 65534, $value$jscomp$109$$ & 65534);
        }
      }
      this.device_spaces[$i$jscomp$21$$].set($space$jscomp$1$$);
    } else {
      $device$jscomp$5$$ && $dbg_log$$("Warning: While restoring PCI device: Device exists in current configuration but not in snapshot (" + $device$jscomp$5$$.name + ")"), $space$jscomp$1$$ && $dbg_log$$("Warning: While restoring PCI device: Device doesn't exist in current configuration but does in snapshot (device " + $h$$($i$jscomp$21$$, 2) + ")");
    }
  }
  this.pci_addr.set($state$jscomp$13$$[256]);
  this.pci_value.set($state$jscomp$13$$[257]);
  this.pci_response.set($state$jscomp$13$$[258]);
  this.pci_status.set($state$jscomp$13$$[259]);
};
$PCI$$.prototype.pci_query = function() {
  var $bdf$$ = this.pci_addr[2] << 8 | this.pci_addr[1], $addr$jscomp$9$$ = this.pci_addr[0] & 252, $dev_device$jscomp$6$$ = $bdf$$ >> 3 & 31;
  var $dbg_line$$ = "query enabled=" + (this.pci_addr[3] >> 7) + (" bdf=" + $h$$($bdf$$, 4));
  $dbg_line$$ += " dev=" + $h$$($dev_device$jscomp$6$$, 2);
  $dbg_line$$ += " addr=" + $h$$($addr$jscomp$9$$, 2);
  $dev_device$jscomp$6$$ = this.device_spaces[$bdf$$];
  void 0 !== $dev_device$jscomp$6$$ ? (this.pci_status32[0] = -2147483648, this.pci_response32[0] = $addr$jscomp$9$$ < $dev_device$jscomp$6$$.byteLength ? $dev_device$jscomp$6$$[$addr$jscomp$9$$ >> 2] : 0, $dbg_line$$ += " " + $h$$(this.pci_addr32[0] >>> 0, 8) + " -> " + $h$$(this.pci_response32[0] >>> 0, 8), $addr$jscomp$9$$ >= $dev_device$jscomp$6$$.byteLength && ($dbg_line$$ += " (undef)"), $dbg_line$$ += " (" + this.devices[$bdf$$].name + ")", $dbg_log$$($dbg_line$$, 2048)) : (this.pci_response32[0] = 
  -1, this.pci_status32[0] = 0);
};
$PCI$$.prototype.pci_write8 = function($addr$jscomp$10_address$$, $written$$) {
  var $bdf$jscomp$1$$ = $addr$jscomp$10_address$$ >> 8 & 65535;
  $addr$jscomp$10_address$$ &= 255;
  var $space$jscomp$2$$ = new Uint8Array(this.device_spaces[$bdf$jscomp$1$$].buffer), $device$jscomp$7$$ = this.devices[$bdf$jscomp$1$$];
  $space$jscomp$2$$ && ($dbg_assert$$(!(16 <= $addr$jscomp$10_address$$ && 44 > $addr$jscomp$10_address$$ || 48 <= $addr$jscomp$10_address$$ && 52 > $addr$jscomp$10_address$$), "PCI: Expected 32-bit write, got 8-bit (addr: " + $h$$($addr$jscomp$10_address$$) + ")"), $dbg_log$$("PCI write8 dev=" + $h$$($bdf$jscomp$1$$ >> 3, 2) + " (" + $device$jscomp$7$$.name + ") addr=" + $h$$($addr$jscomp$10_address$$, 4) + " value=" + $h$$($written$$, 2), 2048), $space$jscomp$2$$[$addr$jscomp$10_address$$] = $written$$);
};
$PCI$$.prototype.pci_write16 = function($addr$jscomp$11_address$jscomp$1$$, $written$jscomp$1$$) {
  $dbg_assert$$(0 === ($addr$jscomp$11_address$jscomp$1$$ & 1));
  var $bdf$jscomp$2$$ = $addr$jscomp$11_address$jscomp$1$$ >> 8 & 65535;
  $addr$jscomp$11_address$jscomp$1$$ &= 255;
  var $space$jscomp$3$$ = new Uint16Array(this.device_spaces[$bdf$jscomp$2$$].buffer), $device$jscomp$8$$ = this.devices[$bdf$jscomp$2$$];
  $space$jscomp$3$$ && (16 <= $addr$jscomp$11_address$jscomp$1$$ && 44 > $addr$jscomp$11_address$jscomp$1$$ ? $dbg_log$$("Warning: PCI: Expected 32-bit write, got 16-bit (addr: " + $h$$($addr$jscomp$11_address$jscomp$1$$) + ")") : ($dbg_assert$$(!(48 <= $addr$jscomp$11_address$jscomp$1$$ && 52 > $addr$jscomp$11_address$jscomp$1$$), "PCI: Expected 32-bit write, got 16-bit (addr: " + $h$$($addr$jscomp$11_address$jscomp$1$$) + ")"), $dbg_log$$("PCI writ16 dev=" + $h$$($bdf$jscomp$2$$ >> 3, 2) + " (" + 
  $device$jscomp$8$$.name + ") addr=" + $h$$($addr$jscomp$11_address$jscomp$1$$, 4) + " value=" + $h$$($written$jscomp$1$$, 4), 2048), $space$jscomp$3$$[$addr$jscomp$11_address$jscomp$1$$ >>> 1] = $written$jscomp$1$$));
};
$PCI$$.prototype.pci_write32 = function($addr$jscomp$12_address$jscomp$2$$, $written$jscomp$2$$) {
  $dbg_assert$$(0 === ($addr$jscomp$12_address$jscomp$2$$ & 3));
  var $bdf$jscomp$3_space_addr$$ = $addr$jscomp$12_address$jscomp$2$$ >> 8 & 65535;
  $addr$jscomp$12_address$jscomp$2$$ &= 255;
  var $space$jscomp$4$$ = this.device_spaces[$bdf$jscomp$3_space_addr$$], $device$jscomp$9_from$jscomp$1_type$jscomp$149$$ = this.devices[$bdf$jscomp$3_space_addr$$];
  if ($space$jscomp$4$$) {
    if (16 <= $addr$jscomp$12_address$jscomp$2$$ && 40 > $addr$jscomp$12_address$jscomp$2$$) {
      var $bar_nr$jscomp$1_original_bar_to$jscomp$1$$ = $addr$jscomp$12_address$jscomp$2$$ - 16 >> 2, $bar$jscomp$1$$ = $device$jscomp$9_from$jscomp$1_type$jscomp$149$$.pci_bars[$bar_nr$jscomp$1_original_bar_to$jscomp$1$$];
      $dbg_log$$("BAR" + $bar_nr$jscomp$1_original_bar_to$jscomp$1$$ + " exists=" + ($bar$jscomp$1$$ ? "y" : "n") + " changed to " + $h$$($written$jscomp$2$$ >>> 0) + " dev=" + $h$$($bdf$jscomp$3_space_addr$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$jscomp$149$$.name + ") ", 2048);
      $bar$jscomp$1$$ ? ($dbg_assert$$(!($bar$jscomp$1$$.size & $bar$jscomp$1$$.size - 1), "bar size should be power of 2"), $bdf$jscomp$3_space_addr$$ = $addr$jscomp$12_address$jscomp$2$$ >> 2, $device$jscomp$9_from$jscomp$1_type$jscomp$149$$ = $space$jscomp$4$$[$bdf$jscomp$3_space_addr$$] & 1, -1 === ($written$jscomp$2$$ | 3 | $bar$jscomp$1$$.size - 1) ? ($written$jscomp$2$$ = ~($bar$jscomp$1$$.size - 1) | $device$jscomp$9_from$jscomp$1_type$jscomp$149$$, 0 === $device$jscomp$9_from$jscomp$1_type$jscomp$149$$ && 
      ($space$jscomp$4$$[$bdf$jscomp$3_space_addr$$] = $written$jscomp$2$$)) : 0 === $device$jscomp$9_from$jscomp$1_type$jscomp$149$$ && ($bar_nr$jscomp$1_original_bar_to$jscomp$1$$ = $bar$jscomp$1$$.original_bar, ($written$jscomp$2$$ & -16) !== ($bar_nr$jscomp$1_original_bar_to$jscomp$1$$ & -16) && $dbg_log$$("Warning: Changing memory bar not supported, ignored", 2048), $space$jscomp$4$$[$bdf$jscomp$3_space_addr$$] = $bar_nr$jscomp$1_original_bar_to$jscomp$1$$), 1 === $device$jscomp$9_from$jscomp$1_type$jscomp$149$$ && 
      ($dbg_assert$$(1 === $device$jscomp$9_from$jscomp$1_type$jscomp$149$$), $device$jscomp$9_from$jscomp$1_type$jscomp$149$$ = $space$jscomp$4$$[$bdf$jscomp$3_space_addr$$] & 65534, $bar_nr$jscomp$1_original_bar_to$jscomp$1$$ = $written$jscomp$2$$ & 65534, $dbg_log$$("io bar changed from " + $h$$($device$jscomp$9_from$jscomp$1_type$jscomp$149$$ >>> 0, 8) + " to " + $h$$($bar_nr$jscomp$1_original_bar_to$jscomp$1$$ >>> 0, 8) + " size=" + $bar$jscomp$1$$.size, 2048), this.set_io_bars($bar$jscomp$1$$, 
      $device$jscomp$9_from$jscomp$1_type$jscomp$149$$, $bar_nr$jscomp$1_original_bar_to$jscomp$1$$), $space$jscomp$4$$[$bdf$jscomp$3_space_addr$$] = $written$jscomp$2$$ | 1)) : $space$jscomp$4$$[$addr$jscomp$12_address$jscomp$2$$ >> 2] = 0;
      $dbg_log$$("BAR effective value: " + $h$$($space$jscomp$4$$[$addr$jscomp$12_address$jscomp$2$$ >> 2] >>> 0), 2048);
    } else {
      48 === $addr$jscomp$12_address$jscomp$2$$ ? ($dbg_log$$("PCI write rom address dev=" + $h$$($bdf$jscomp$3_space_addr$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$jscomp$149$$.name + ") value=" + $h$$($written$jscomp$2$$ >>> 0, 8), 2048), $space$jscomp$4$$[$addr$jscomp$12_address$jscomp$2$$ >> 2] = $device$jscomp$9_from$jscomp$1_type$jscomp$149$$.pci_rom_size ? -1 === ($written$jscomp$2$$ | 2047) ? -$device$jscomp$9_from$jscomp$1_type$jscomp$149$$.pci_rom_size | 0 : $device$jscomp$9_from$jscomp$1_type$jscomp$149$$.pci_rom_address | 
      0 : 0) : 4 === $addr$jscomp$12_address$jscomp$2$$ ? $dbg_log$$("PCI write dev=" + $h$$($bdf$jscomp$3_space_addr$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$jscomp$149$$.name + ") addr=" + $h$$($addr$jscomp$12_address$jscomp$2$$, 4) + " value=" + $h$$($written$jscomp$2$$ >>> 0, 8), 2048) : ($dbg_log$$("PCI write dev=" + $h$$($bdf$jscomp$3_space_addr$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$jscomp$149$$.name + ") addr=" + $h$$($addr$jscomp$12_address$jscomp$2$$, 4) + 
      " value=" + $h$$($written$jscomp$2$$ >>> 0, 8), 2048), $space$jscomp$4$$[$addr$jscomp$12_address$jscomp$2$$ >>> 2] = $written$jscomp$2$$);
    }
  }
};
$PCI$$.prototype.register_device = function($device$jscomp$10$$) {
  $dbg_assert$$(void 0 !== $device$jscomp$10$$.pci_id);
  $dbg_assert$$(void 0 !== $device$jscomp$10$$.pci_space);
  $dbg_assert$$(void 0 !== $device$jscomp$10$$.pci_bars);
  var $bar_space_device_id$$ = $device$jscomp$10$$.pci_id;
  $dbg_log$$("PCI register bdf=" + $h$$($bar_space_device_id$$) + " (" + $device$jscomp$10$$.name + ")", 2048);
  $dbg_assert$$(!this.devices[$bar_space_device_id$$]);
  $dbg_assert$$(64 <= $device$jscomp$10$$.pci_space.length);
  $dbg_assert$$($bar_space_device_id$$ < this.devices.length);
  var $space$jscomp$5$$ = new Int32Array(64);
  $space$jscomp$5$$.set(new Int32Array((new Uint8Array($device$jscomp$10$$.pci_space)).buffer));
  this.device_spaces[$bar_space_device_id$$] = $space$jscomp$5$$;
  this.devices[$bar_space_device_id$$] = $device$jscomp$10$$;
  $bar_space_device_id$$ = $space$jscomp$5$$.slice(4, 10);
  for (var $i$jscomp$22$$ = 0; $i$jscomp$22$$ < $device$jscomp$10$$.pci_bars.length; $i$jscomp$22$$++) {
    var $bar$jscomp$2$$ = $device$jscomp$10$$.pci_bars[$i$jscomp$22$$];
    if ($bar$jscomp$2$$) {
      var $bar_base_port$$ = $bar_space_device_id$$[$i$jscomp$22$$], $j$jscomp$3_type$jscomp$150$$ = $bar_base_port$$ & 1;
      $bar$jscomp$2$$.original_bar = $bar_base_port$$;
      $bar$jscomp$2$$.entries = [];
      if (0 !== $j$jscomp$3_type$jscomp$150$$) {
        for ($dbg_assert$$(1 === $j$jscomp$3_type$jscomp$150$$), $bar_base_port$$ &= -2, $j$jscomp$3_type$jscomp$150$$ = 0; $j$jscomp$3_type$jscomp$150$$ < $bar$jscomp$2$$.size; $j$jscomp$3_type$jscomp$150$$++) {
          $bar$jscomp$2$$.entries[$j$jscomp$3_type$jscomp$150$$] = this.io.ports[$bar_base_port$$ + $j$jscomp$3_type$jscomp$150$$];
        }
      }
    }
  }
  return $space$jscomp$5$$;
};
$PCI$$.prototype.set_io_bars = function($bar$jscomp$3$$, $from$jscomp$2$$, $to$jscomp$2$$) {
  var $count$jscomp$52$$ = $bar$jscomp$3$$.size;
  $dbg_log$$("Move io bars: from=" + $h$$($from$jscomp$2$$) + " to=" + $h$$($to$jscomp$2$$) + " count=" + $count$jscomp$52$$, 2048);
  for (var $ports$$ = this.io.ports, $i$jscomp$23$$ = 0; $i$jscomp$23$$ < $count$jscomp$52$$; $i$jscomp$23$$++) {
    var $entry$jscomp$6_old_entry$$ = $ports$$[$from$jscomp$2$$ + $i$jscomp$23$$];
    4096 <= $from$jscomp$2$$ + $i$jscomp$23$$ && ($ports$$[$from$jscomp$2$$ + $i$jscomp$23$$] = this.io.create_empty_entry());
    $entry$jscomp$6_old_entry$$.read8 === this.io.empty_port_read8 && $entry$jscomp$6_old_entry$$.read16 === this.io.empty_port_read16 && $entry$jscomp$6_old_entry$$.read32 === this.io.empty_port_read32 && $entry$jscomp$6_old_entry$$.write8 === this.io.empty_port_write && $entry$jscomp$6_old_entry$$.write16 === this.io.empty_port_write && $entry$jscomp$6_old_entry$$.write32 === this.io.empty_port_write && $dbg_log$$("Warning: Bad IO bar: Source not mapped, port=" + $h$$($from$jscomp$2$$ + $i$jscomp$23$$, 
    4), 2048);
    $entry$jscomp$6_old_entry$$ = $bar$jscomp$3$$.entries[$i$jscomp$23$$];
    var $empty_entry$$ = $ports$$[$to$jscomp$2$$ + $i$jscomp$23$$];
    $dbg_assert$$($entry$jscomp$6_old_entry$$ && $empty_entry$$);
    4096 <= $to$jscomp$2$$ + $i$jscomp$23$$ && ($ports$$[$to$jscomp$2$$ + $i$jscomp$23$$] = $entry$jscomp$6_old_entry$$);
    $empty_entry$$.read8 !== this.io.empty_port_read8 && $empty_entry$$.read16 !== this.io.empty_port_read16 && $empty_entry$$.read32 !== this.io.empty_port_read32 && $empty_entry$$.write8 !== this.io.empty_port_write && $empty_entry$$.write16 !== this.io.empty_port_write && $empty_entry$$.write32 !== this.io.empty_port_write || $dbg_log$$("Warning: Bad IO bar: Target already mapped, port=" + $h$$($to$jscomp$2$$ + $i$jscomp$23$$, 4), 2048);
  }
};
$PCI$$.prototype.raise_irq = function($pci_id$$) {
  var $space$jscomp$6$$ = this.device_spaces[$pci_id$$];
  $dbg_assert$$($space$jscomp$6$$);
  this.cpu.device_raise_irq(this.isa_bridge_space8[96 + (($space$jscomp$6$$[15] >> 8 & 255) - 1 + (($pci_id$$ >> 3) - 1 & 255) & 3)]);
};
$PCI$$.prototype.lower_irq = function($pci_id$jscomp$1$$) {
  var $space$jscomp$7$$ = this.device_spaces[$pci_id$jscomp$1$$];
  $dbg_assert$$($space$jscomp$7$$);
  this.cpu.device_lower_irq(this.isa_bridge_space8[96 + (($space$jscomp$7$$[15] >> 8 & 255) + ($pci_id$jscomp$1$$ >> 3 & 255) - 2 & 3)]);
};
function $FloppyController$$($cpu$jscomp$5$$, $fda_image$$, $fdb_image$$) {
  this.io = $cpu$jscomp$5$$.io;
  this.cpu = $cpu$jscomp$5$$;
  this.dma = $cpu$jscomp$5$$.devices.dma;
  this.bytes_expecting = 0;
  this.receiving_command = new Uint8Array(10);
  this.receiving_index = 0;
  this.next_command = null;
  this.response_data = new Uint8Array(10);
  this.last_head = this.last_cylinder = this.drive = this.status_reg2 = this.status_reg1 = this.status_reg0 = this.response_length = this.response_index = 0;
  this.last_sector = 1;
  this.dir = this.dor = 0;
  this.fdb_image = this.fda_image = null;
  $fda_image$$ ? this.set_fda($fda_image$$) : (this.eject_fda(), this.cpu.devices.rtc.cmos_write(16, 64));
  $dbg_assert$$(!$fdb_image$$, "FDB not supported");
  this.io.register_read(1008, this, this.port3F0_read);
  this.io.register_read(1010, this, this.port3F2_read);
  this.io.register_read(1012, this, this.port3F4_read);
  this.io.register_read(1013, this, this.port3F5_read);
  this.io.register_read(1015, this, this.port3F7_read);
  this.io.register_write(1010, this, this.port3F2_write);
  this.io.register_write(1012, this, this.port3F4_write);
  this.io.register_write(1013, this, this.port3F5_write);
}
$FloppyController$$.prototype.eject_fda = function() {
  this.fda_image = null;
  this.number_of_cylinders = this.number_of_heads = this.sectors_per_track = 0;
  this.dir = 128;
};
$FloppyController$$.prototype.set_fda = function($fda_image$jscomp$1$$) {
  var $floppy_types_new_image$$ = {[163840]:{type:1, tracks:40, sectors:8, heads:1}, [184320]:{type:1, tracks:40, sectors:9, heads:1}, [204800]:{type:1, tracks:40, sectors:10, heads:1}, [327680]:{type:1, tracks:40, sectors:8, heads:2}, [368640]:{type:1, tracks:40, sectors:9, heads:2}, [409600]:{type:1, tracks:40, sectors:10, heads:2}, [737280]:{type:3, tracks:80, sectors:9, heads:2}, [1228800]:{type:2, tracks:80, sectors:15, heads:2}, [1474560]:{type:4, tracks:80, sectors:18, heads:2}, [1763328]:{type:5, 
  tracks:82, sectors:21, heads:2}, [2949120]:{type:5, tracks:80, sectors:36, heads:2}, 512:{type:1, tracks:1, sectors:1, heads:1}, };
  let $floppy_size$$ = $fda_image$jscomp$1$$.byteLength, $floppy_type$$ = $floppy_types_new_image$$[$floppy_size$$];
  $floppy_type$$ || ($floppy_size$$ = 1474560 < $fda_image$jscomp$1$$.byteLength ? 2949120 : 1474560, $floppy_type$$ = $floppy_types_new_image$$[$floppy_size$$], $dbg_assert$$($fda_image$jscomp$1$$.buffer && $fda_image$jscomp$1$$.buffer instanceof ArrayBuffer), $floppy_types_new_image$$ = new Uint8Array($floppy_size$$), $floppy_types_new_image$$.set(new Uint8Array($fda_image$jscomp$1$$.buffer)), $fda_image$jscomp$1$$ = new $v86util$$.SyncBuffer($floppy_types_new_image$$.buffer), $dbg_log$$("Warning: Unkown floppy size: " + 
  $fda_image$jscomp$1$$.byteLength + ", assuming " + $floppy_size$$));
  this.sectors_per_track = $floppy_type$$.sectors;
  this.number_of_heads = $floppy_type$$.heads;
  this.number_of_cylinders = $floppy_type$$.tracks;
  this.fda_image = $fda_image$jscomp$1$$;
  this.dir = 128;
  this.cpu.devices.rtc.cmos_write(16, $floppy_type$$.type << 4);
};
$FloppyController$$.prototype.get_state = function() {
  var $state$jscomp$14$$ = [];
  $state$jscomp$14$$[0] = this.bytes_expecting;
  $state$jscomp$14$$[1] = this.receiving_command;
  $state$jscomp$14$$[2] = this.receiving_index;
  $state$jscomp$14$$[4] = this.response_data;
  $state$jscomp$14$$[5] = this.response_index;
  $state$jscomp$14$$[6] = this.response_length;
  $state$jscomp$14$$[8] = this.status_reg0;
  $state$jscomp$14$$[9] = this.status_reg1;
  $state$jscomp$14$$[10] = this.status_reg2;
  $state$jscomp$14$$[11] = this.drive;
  $state$jscomp$14$$[12] = this.last_cylinder;
  $state$jscomp$14$$[13] = this.last_head;
  $state$jscomp$14$$[14] = this.last_sector;
  $state$jscomp$14$$[15] = this.dor;
  $state$jscomp$14$$[16] = this.sectors_per_track;
  $state$jscomp$14$$[17] = this.number_of_heads;
  $state$jscomp$14$$[18] = this.number_of_cylinders;
  return $state$jscomp$14$$;
};
$FloppyController$$.prototype.set_state = function($state$jscomp$15$$) {
  this.bytes_expecting = $state$jscomp$15$$[0];
  this.receiving_command = $state$jscomp$15$$[1];
  this.receiving_index = $state$jscomp$15$$[2];
  this.next_command = $state$jscomp$15$$[3];
  this.response_data = $state$jscomp$15$$[4];
  this.response_index = $state$jscomp$15$$[5];
  this.response_length = $state$jscomp$15$$[6];
  this.status_reg0 = $state$jscomp$15$$[8];
  this.status_reg1 = $state$jscomp$15$$[9];
  this.status_reg2 = $state$jscomp$15$$[10];
  this.drive = $state$jscomp$15$$[11];
  this.last_cylinder = $state$jscomp$15$$[12];
  this.last_head = $state$jscomp$15$$[13];
  this.last_sector = $state$jscomp$15$$[14];
  this.dor = $state$jscomp$15$$[15];
  this.sectors_per_track = $state$jscomp$15$$[16];
  this.number_of_heads = $state$jscomp$15$$[17];
  this.number_of_cylinders = $state$jscomp$15$$[18];
};
$FloppyController$$.prototype.port3F0_read = function() {
  $dbg_log$$("3F0 read", 8192);
  return 0;
};
$FloppyController$$.prototype.port3F4_read = function() {
  $dbg_log$$("3F4 read", 8192);
  var $return_byte$$ = 128;
  this.response_index < this.response_length && ($return_byte$$ |= 80);
  0 === (this.dor & 8) && ($return_byte$$ |= 32);
  return $return_byte$$;
};
$FloppyController$$.prototype.port3F7_read = function() {
  $dbg_log$$("3F7 read", 8192);
  return this.dir;
};
$FloppyController$$.prototype.port3F5_read = function() {
  if (this.response_index < this.response_length) {
    return $dbg_log$$("3F5 read: " + this.response_data[this.response_index], 8192), this.cpu.device_lower_irq(6), this.response_data[this.response_index++];
  }
  $dbg_log$$("3F5 read, empty", 8192);
  return 255;
};
$FloppyController$$.prototype.port3F4_write = function($byte$$) {
  $dbg_log$$("3F4/data rate write: " + $h$$($byte$$), 8192);
  $byte$$ & 128 && ($dbg_log$$("dsr reset", 8192), this.status_reg0 = 192, this.cpu.device_raise_irq(6));
};
$FloppyController$$.prototype.port3F5_write = function($log_reg_byte$$) {
  $dbg_log$$("3F5 write " + $h$$($log_reg_byte$$), 8192);
  if (0 < this.bytes_expecting) {
    if (this.receiving_command[this.receiving_index++] = $log_reg_byte$$, this.bytes_expecting--, 0 === this.bytes_expecting) {
      $log_reg_byte$$ = "3F5 command received: ";
      for (var $i$jscomp$24$$ = 0; $i$jscomp$24$$ < this.receiving_index; $i$jscomp$24$$++) {
        $log_reg_byte$$ += $h$$(this.receiving_command[$i$jscomp$24$$]) + " ";
      }
      $dbg_log$$($log_reg_byte$$, 8192);
      this.next_command.call(this, this.receiving_command);
    }
  } else {
    switch($log_reg_byte$$) {
      case 3:
        this.next_command = this.fix_drive_data;
        this.bytes_expecting = 2;
        break;
      case 19:
        this.next_command = this.configure;
        this.bytes_expecting = 3;
        break;
      case 4:
        this.next_command = this.check_drive_status;
        this.bytes_expecting = 1;
        break;
      case 5:
      case 69:
      case 197:
        this.next_command = function($args$$) {
          this.do_sector(!0, $args$$);
        };
        this.bytes_expecting = 8;
        break;
      case 6:
      case 70:
      case 198:
      case 230:
        this.next_command = function($args$jscomp$1$$) {
          this.do_sector(!1, $args$jscomp$1$$);
        };
        this.bytes_expecting = 8;
        break;
      case 7:
        this.next_command = this.calibrate;
        this.bytes_expecting = 1;
        break;
      case 8:
        this.check_interrupt_status();
        break;
      case 74:
        this.next_command = this.read_sector_id;
        this.bytes_expecting = 1;
        break;
      case 15:
        this.bytes_expecting = 2;
        this.next_command = this.seek;
        break;
      case 14:
      case 16:
        $dbg_log$$(14 === $log_reg_byte$$ ? "dump registers" : "determine controller version", 8192);
        this.status_reg0 = 128;
        this.response_data[0] = this.status_reg0;
        this.response_index = 0;
        this.response_length = 1;
        this.bytes_expecting = 0;
        break;
      default:
        $dbg_assert$$(!1, "Unimplemented floppy command call " + $h$$($log_reg_byte$$));
    }
    this.receiving_index = 0;
  }
};
$FloppyController$$.prototype.port3F2_read = function() {
  $dbg_log$$("read 3F2: DOR", 8192);
  return this.dor;
};
$FloppyController$$.prototype.port3F2_write = function($value$jscomp$110$$) {
  4 === ($value$jscomp$110$$ & 4) && 0 === (this.dor & 4) && (this.status_reg0 = 192, this.cpu.device_raise_irq(6));
  $dbg_log$$("start motors: " + $h$$($value$jscomp$110$$ >> 4), 8192);
  $dbg_log$$("enable dma/irq: " + !!($value$jscomp$110$$ & 8), 8192);
  $dbg_log$$("reset fdc: " + !!($value$jscomp$110$$ & 4), 8192);
  $dbg_log$$("drive select: " + ($value$jscomp$110$$ & 3), 8192);
  0 !== ($value$jscomp$110$$ & 3) && $dbg_log$$("guest: fdb not implemented", 8192);
  $dbg_log$$("DOR = " + $h$$($value$jscomp$110$$), 8192);
  this.dor = $value$jscomp$110$$;
};
$FloppyController$$.prototype.check_drive_status = function() {
  $dbg_log$$("check drive status", 8192);
  this.status_reg1 = this.fda_image ? 0 : 5;
  this.response_index = 0;
  this.response_length = 1;
  this.response_data[0] = 0;
};
$FloppyController$$.prototype.seek = function($args$jscomp$3_new_head$$) {
  $dbg_log$$("seek", 8192);
  if (0 !== ($args$jscomp$3_new_head$$[0] & 3)) {
    $dbg_log$$("seek on fdb", 8192);
  } else {
    var $new_cylinder$$ = $args$jscomp$3_new_head$$[1];
    $args$jscomp$3_new_head$$ = $args$jscomp$3_new_head$$[0] >> 2 & 1;
    $new_cylinder$$ !== this.last_cylinder && (this.dir = 0);
    this.status_reg1 = this.fda_image ? 0 : 5;
    this.status_reg0 = 32;
    this.last_cylinder = $new_cylinder$$;
    this.last_head = $args$jscomp$3_new_head$$;
  }
  this.raise_irq();
};
$FloppyController$$.prototype.calibrate = function($args$jscomp$4$$) {
  $dbg_log$$("floppy calibrate", 8192);
  this.seek([$args$jscomp$4$$[0], 0]);
};
$FloppyController$$.prototype.check_interrupt_status = function() {
  $dbg_log$$("floppy check interrupt status", 8192);
  this.response_index = 0;
  this.response_length = 2;
  this.response_data[0] = this.status_reg0;
  this.response_data[1] = this.last_cylinder;
};
$FloppyController$$.prototype.do_sector = function($is_write$$, $args$jscomp$5$$) {
  var $head$$ = $args$jscomp$5$$[2], $cylinder$$ = $args$jscomp$5$$[1], $sector$$ = $args$jscomp$5$$[3], $sector_size$$ = 128 << $args$jscomp$5$$[4], $read_count$$ = $args$jscomp$5$$[5] - $args$jscomp$5$$[3] + 1, $read_offset$$ = (($head$$ + this.number_of_heads * $cylinder$$) * this.sectors_per_track + $sector$$ - 1) * $sector_size$$;
  $dbg_log$$("Floppy " + ($is_write$$ ? "Write" : "Read"), 8192);
  $dbg_log$$("from " + $h$$($read_offset$$) + " length " + $h$$($read_count$$ * $sector_size$$), 8192);
  $dbg_log$$($cylinder$$ + " / " + $head$$ + " / " + $sector$$, 8192);
  $args$jscomp$5$$[4] || $dbg_log$$("FDC: sector count is zero, use data length instead", 8192);
  this.fda_image ? (this.status_reg1 = 0, $is_write$$ ? this.dma.do_write(this.fda_image, $read_offset$$, $read_count$$ * $sector_size$$, 2, this.done.bind(this, $args$jscomp$5$$, $cylinder$$, $head$$, $sector$$)) : this.dma.do_read(this.fda_image, $read_offset$$, $read_count$$ * $sector_size$$, 2, this.done.bind(this, $args$jscomp$5$$, $cylinder$$, $head$$, $sector$$))) : this.status_reg1 = 5;
};
$FloppyController$$.prototype.done = function($args$jscomp$6$$, $cylinder$jscomp$1$$, $head$jscomp$1$$, $sector$jscomp$1$$, $error$jscomp$4$$) {
  $error$jscomp$4$$ ? $dbg_log$$("XXX: Unhandled floppy error", 8192) : ($sector$jscomp$1$$++, $sector$jscomp$1$$ > this.sectors_per_track && ($sector$jscomp$1$$ = 1, $head$jscomp$1$$++, $head$jscomp$1$$ >= this.number_of_heads && ($head$jscomp$1$$ = 0, $cylinder$jscomp$1$$++)), $cylinder$jscomp$1$$ !== this.last_cylinder && (this.dir = 0), this.status_reg0 = 32, this.last_cylinder = $cylinder$jscomp$1$$, this.last_head = $head$jscomp$1$$, this.last_sector = $sector$jscomp$1$$, this.response_index = 
  0, this.response_length = 7, this.response_data[0] = $head$jscomp$1$$ << 2 | 32, this.response_data[1] = 0, this.response_data[2] = 0, this.response_data[3] = $cylinder$jscomp$1$$, this.response_data[4] = $head$jscomp$1$$, this.response_data[5] = $sector$jscomp$1$$, this.response_data[6] = $args$jscomp$6$$[4], this.raise_irq());
};
$FloppyController$$.prototype.fix_drive_data = function($args$jscomp$7$$) {
  $dbg_log$$("floppy fix drive data " + $args$jscomp$7$$.slice(0, this.bytes_expecting), 8192);
};
$FloppyController$$.prototype.configure = function($args$jscomp$8$$) {
  $dbg_log$$("floppy configure " + $args$jscomp$8$$.slice(0, this.bytes_expecting), 8192);
};
$FloppyController$$.prototype.read_sector_id = function($args$jscomp$9$$) {
  $dbg_log$$("floppy read sector id " + $args$jscomp$9$$, 8192);
  this.response_index = 0;
  this.response_length = 7;
  this.response_data[0] = 0;
  this.response_data[1] = 0;
  this.response_data[2] = 0;
  this.response_data[3] = 0;
  this.response_data[4] = 0;
  this.response_data[5] = 0;
  this.response_data[6] = 0;
  this.raise_irq();
};
$FloppyController$$.prototype.raise_irq = function() {
  this.dor & 8 && this.cpu.device_raise_irq(6);
};
$CPU$$.prototype.mmap_read8 = function($addr$jscomp$13_value$jscomp$111$$) {
  $addr$jscomp$13_value$jscomp$111$$ = this.memory_map_read8[$addr$jscomp$13_value$jscomp$111$$ >>> 17]($addr$jscomp$13_value$jscomp$111$$);
  $dbg_assert$$(0 <= $addr$jscomp$13_value$jscomp$111$$ && 255 >= $addr$jscomp$13_value$jscomp$111$$);
  return $addr$jscomp$13_value$jscomp$111$$;
};
$CPU$$.prototype.mmap_write8 = function($addr$jscomp$14$$, $value$jscomp$112$$) {
  $dbg_assert$$(0 <= $value$jscomp$112$$ && 255 >= $value$jscomp$112$$);
  this.memory_map_write8[$addr$jscomp$14$$ >>> 17]($addr$jscomp$14$$, $value$jscomp$112$$);
};
$CPU$$.prototype.mmap_read16 = function($addr$jscomp$15_value$jscomp$113$$) {
  var $fn$jscomp$11$$ = this.memory_map_read8[$addr$jscomp$15_value$jscomp$113$$ >>> 17];
  $addr$jscomp$15_value$jscomp$113$$ = $fn$jscomp$11$$($addr$jscomp$15_value$jscomp$113$$) | $fn$jscomp$11$$($addr$jscomp$15_value$jscomp$113$$ + 1 | 0) << 8;
  $dbg_assert$$(0 <= $addr$jscomp$15_value$jscomp$113$$ && 65535 >= $addr$jscomp$15_value$jscomp$113$$);
  return $addr$jscomp$15_value$jscomp$113$$;
};
$CPU$$.prototype.mmap_write16 = function($addr$jscomp$16$$, $value$jscomp$114$$) {
  var $fn$jscomp$12$$ = this.memory_map_write8[$addr$jscomp$16$$ >>> 17];
  $dbg_assert$$(0 <= $value$jscomp$114$$ && 65535 >= $value$jscomp$114$$);
  $fn$jscomp$12$$($addr$jscomp$16$$, $value$jscomp$114$$ & 255);
  $fn$jscomp$12$$($addr$jscomp$16$$ + 1 | 0, $value$jscomp$114$$ >> 8);
};
$CPU$$.prototype.mmap_read32 = function($addr$jscomp$17$$) {
  return this.memory_map_read32[$addr$jscomp$17$$ >>> 17]($addr$jscomp$17$$);
};
$CPU$$.prototype.mmap_write32 = function($addr$jscomp$18$$, $value$jscomp$115$$) {
  this.memory_map_write32[$addr$jscomp$18$$ >>> 17]($addr$jscomp$18$$, $value$jscomp$115$$);
};
$CPU$$.prototype.mmap_write64 = function($addr$jscomp$19$$, $value0$$, $value1$jscomp$7$$) {
  var $aligned_addr$jscomp$5_write_func32$jscomp$1$$ = $addr$jscomp$19$$ >>> 17;
  $dbg_assert$$($aligned_addr$jscomp$5_write_func32$jscomp$1$$ === $addr$jscomp$19$$ + 7 >>> 17);
  $aligned_addr$jscomp$5_write_func32$jscomp$1$$ = this.memory_map_write32[$aligned_addr$jscomp$5_write_func32$jscomp$1$$];
  $aligned_addr$jscomp$5_write_func32$jscomp$1$$($addr$jscomp$19$$, $value0$$);
  $aligned_addr$jscomp$5_write_func32$jscomp$1$$($addr$jscomp$19$$ + 4, $value1$jscomp$7$$);
};
$CPU$$.prototype.mmap_write128 = function($addr$jscomp$20$$, $value0$jscomp$1$$, $value1$jscomp$8$$, $value2$jscomp$7$$, $value3$jscomp$4$$) {
  var $aligned_addr$jscomp$6_write_func32$jscomp$2$$ = $addr$jscomp$20$$ >>> 17;
  $dbg_assert$$($aligned_addr$jscomp$6_write_func32$jscomp$2$$ === $addr$jscomp$20$$ + 12 >>> 17);
  $aligned_addr$jscomp$6_write_func32$jscomp$2$$ = this.memory_map_write32[$aligned_addr$jscomp$6_write_func32$jscomp$2$$];
  $aligned_addr$jscomp$6_write_func32$jscomp$2$$($addr$jscomp$20$$, $value0$jscomp$1$$);
  $aligned_addr$jscomp$6_write_func32$jscomp$2$$($addr$jscomp$20$$ + 4, $value1$jscomp$8$$);
  $aligned_addr$jscomp$6_write_func32$jscomp$2$$($addr$jscomp$20$$ + 8, $value2$jscomp$7$$);
  $aligned_addr$jscomp$6_write_func32$jscomp$2$$($addr$jscomp$20$$ + 12, $value3$jscomp$4$$);
};
$CPU$$.prototype.write_blob = function($blob$jscomp$13$$, $offset$jscomp$40$$) {
  $dbg_assert$$($blob$jscomp$13$$ && 0 <= $blob$jscomp$13$$.length);
  $blob$jscomp$13$$.length && ($dbg_assert$$(!this.in_mapped_range($offset$jscomp$40$$)), $dbg_assert$$(!this.in_mapped_range($offset$jscomp$40$$ + $blob$jscomp$13$$.length - 1)), this.jit_dirty_cache($offset$jscomp$40$$, $offset$jscomp$40$$ + $blob$jscomp$13$$.length), this.mem8.set($blob$jscomp$13$$, $offset$jscomp$40$$));
};
$CPU$$.prototype.read_blob = function($offset$jscomp$41$$, $length$jscomp$23$$) {
  $length$jscomp$23$$ && ($dbg_assert$$(!this.in_mapped_range($offset$jscomp$41$$)), $dbg_assert$$(!this.in_mapped_range($offset$jscomp$41$$ + $length$jscomp$23$$ - 1)));
  return this.mem8.subarray($offset$jscomp$41$$, $offset$jscomp$41$$ + $length$jscomp$23$$);
};
function $DMA$$($cpu$jscomp$6_io$$) {
  this.cpu = $cpu$jscomp$6_io$$;
  this.channel_page = new Uint8Array(8);
  this.channel_pagehi = new Uint8Array(8);
  this.channel_addr = new Uint16Array(8);
  this.channel_addr_init = new Uint16Array(8);
  this.channel_count = new Uint16Array(8);
  this.channel_count_init = new Uint16Array(8);
  this.channel_mask = new Uint8Array(8);
  this.channel_mode = new Uint8Array(8);
  this.unmask_listeners = [];
  this.lsb_msb_flipflop = 0;
  $cpu$jscomp$6_io$$ = $cpu$jscomp$6_io$$.io;
  $cpu$jscomp$6_io$$.register_write(0, this, this.port_addr_write.bind(this, 0));
  $cpu$jscomp$6_io$$.register_write(2, this, this.port_addr_write.bind(this, 1));
  $cpu$jscomp$6_io$$.register_write(4, this, this.port_addr_write.bind(this, 2));
  $cpu$jscomp$6_io$$.register_write(6, this, this.port_addr_write.bind(this, 3));
  $cpu$jscomp$6_io$$.register_write(1, this, this.port_count_write.bind(this, 0));
  $cpu$jscomp$6_io$$.register_write(3, this, this.port_count_write.bind(this, 1));
  $cpu$jscomp$6_io$$.register_write(5, this, this.port_count_write.bind(this, 2));
  $cpu$jscomp$6_io$$.register_write(7, this, this.port_count_write.bind(this, 3));
  $cpu$jscomp$6_io$$.register_read(0, this, this.port_addr_read.bind(this, 0));
  $cpu$jscomp$6_io$$.register_read(2, this, this.port_addr_read.bind(this, 1));
  $cpu$jscomp$6_io$$.register_read(4, this, this.port_addr_read.bind(this, 2));
  $cpu$jscomp$6_io$$.register_read(6, this, this.port_addr_read.bind(this, 3));
  $cpu$jscomp$6_io$$.register_read(1, this, this.port_count_read.bind(this, 0));
  $cpu$jscomp$6_io$$.register_read(3, this, this.port_count_read.bind(this, 1));
  $cpu$jscomp$6_io$$.register_read(5, this, this.port_count_read.bind(this, 2));
  $cpu$jscomp$6_io$$.register_read(7, this, this.port_count_read.bind(this, 3));
  $cpu$jscomp$6_io$$.register_write(192, this, this.port_addr_write.bind(this, 4));
  $cpu$jscomp$6_io$$.register_write(196, this, this.port_addr_write.bind(this, 5));
  $cpu$jscomp$6_io$$.register_write(200, this, this.port_addr_write.bind(this, 6));
  $cpu$jscomp$6_io$$.register_write(204, this, this.port_addr_write.bind(this, 7));
  $cpu$jscomp$6_io$$.register_write(194, this, this.port_count_write.bind(this, 4));
  $cpu$jscomp$6_io$$.register_write(198, this, this.port_count_write.bind(this, 5));
  $cpu$jscomp$6_io$$.register_write(202, this, this.port_count_write.bind(this, 6));
  $cpu$jscomp$6_io$$.register_write(206, this, this.port_count_write.bind(this, 7));
  $cpu$jscomp$6_io$$.register_read(192, this, this.port_addr_read.bind(this, 4));
  $cpu$jscomp$6_io$$.register_read(196, this, this.port_addr_read.bind(this, 5));
  $cpu$jscomp$6_io$$.register_read(200, this, this.port_addr_read.bind(this, 6));
  $cpu$jscomp$6_io$$.register_read(204, this, this.port_addr_read.bind(this, 7));
  $cpu$jscomp$6_io$$.register_read(194, this, this.port_count_read.bind(this, 4));
  $cpu$jscomp$6_io$$.register_read(198, this, this.port_count_read.bind(this, 5));
  $cpu$jscomp$6_io$$.register_read(202, this, this.port_count_read.bind(this, 6));
  $cpu$jscomp$6_io$$.register_read(206, this, this.port_count_read.bind(this, 7));
  $cpu$jscomp$6_io$$.register_write(135, this, this.port_page_write.bind(this, 0));
  $cpu$jscomp$6_io$$.register_write(131, this, this.port_page_write.bind(this, 1));
  $cpu$jscomp$6_io$$.register_write(129, this, this.port_page_write.bind(this, 2));
  $cpu$jscomp$6_io$$.register_write(130, this, this.port_page_write.bind(this, 3));
  $cpu$jscomp$6_io$$.register_write(143, this, this.port_page_write.bind(this, 4));
  $cpu$jscomp$6_io$$.register_write(139, this, this.port_page_write.bind(this, 5));
  $cpu$jscomp$6_io$$.register_write(137, this, this.port_page_write.bind(this, 6));
  $cpu$jscomp$6_io$$.register_write(138, this, this.port_page_write.bind(this, 7));
  $cpu$jscomp$6_io$$.register_read(135, this, this.port_page_read.bind(this, 0));
  $cpu$jscomp$6_io$$.register_read(131, this, this.port_page_read.bind(this, 1));
  $cpu$jscomp$6_io$$.register_read(129, this, this.port_page_read.bind(this, 2));
  $cpu$jscomp$6_io$$.register_read(130, this, this.port_page_read.bind(this, 3));
  $cpu$jscomp$6_io$$.register_read(143, this, this.port_page_read.bind(this, 4));
  $cpu$jscomp$6_io$$.register_read(139, this, this.port_page_read.bind(this, 5));
  $cpu$jscomp$6_io$$.register_read(137, this, this.port_page_read.bind(this, 6));
  $cpu$jscomp$6_io$$.register_read(138, this, this.port_page_read.bind(this, 7));
  $cpu$jscomp$6_io$$.register_write(1159, this, this.port_pagehi_write.bind(this, 0));
  $cpu$jscomp$6_io$$.register_write(1155, this, this.port_pagehi_write.bind(this, 1));
  $cpu$jscomp$6_io$$.register_write(1153, this, this.port_pagehi_write.bind(this, 2));
  $cpu$jscomp$6_io$$.register_write(1154, this, this.port_pagehi_write.bind(this, 3));
  $cpu$jscomp$6_io$$.register_write(1163, this, this.port_pagehi_write.bind(this, 5));
  $cpu$jscomp$6_io$$.register_write(1161, this, this.port_pagehi_write.bind(this, 6));
  $cpu$jscomp$6_io$$.register_write(1162, this, this.port_pagehi_write.bind(this, 7));
  $cpu$jscomp$6_io$$.register_read(1159, this, this.port_pagehi_read.bind(this, 0));
  $cpu$jscomp$6_io$$.register_read(1155, this, this.port_pagehi_read.bind(this, 1));
  $cpu$jscomp$6_io$$.register_read(1153, this, this.port_pagehi_read.bind(this, 2));
  $cpu$jscomp$6_io$$.register_read(1154, this, this.port_pagehi_read.bind(this, 3));
  $cpu$jscomp$6_io$$.register_read(1163, this, this.port_pagehi_read.bind(this, 5));
  $cpu$jscomp$6_io$$.register_read(1161, this, this.port_pagehi_read.bind(this, 6));
  $cpu$jscomp$6_io$$.register_read(1162, this, this.port_pagehi_read.bind(this, 7));
  $cpu$jscomp$6_io$$.register_write(10, this, this.port_singlemask_write.bind(this, 0));
  $cpu$jscomp$6_io$$.register_write(212, this, this.port_singlemask_write.bind(this, 4));
  $cpu$jscomp$6_io$$.register_write(15, this, this.port_multimask_write.bind(this, 0));
  $cpu$jscomp$6_io$$.register_write(222, this, this.port_multimask_write.bind(this, 4));
  $cpu$jscomp$6_io$$.register_read(15, this, this.port_multimask_read.bind(this, 0));
  $cpu$jscomp$6_io$$.register_read(222, this, this.port_multimask_read.bind(this, 4));
  $cpu$jscomp$6_io$$.register_write(11, this, this.port_mode_write.bind(this, 0));
  $cpu$jscomp$6_io$$.register_write(214, this, this.port_mode_write.bind(this, 4));
  $cpu$jscomp$6_io$$.register_write(12, this, this.portC_write);
  $cpu$jscomp$6_io$$.register_write(216, this, this.portC_write);
}
$DMA$$.prototype.get_state = function() {
  return [this.channel_page, this.channel_pagehi, this.channel_addr, this.channel_addr_init, this.channel_count, this.channel_count_init, this.channel_mask, this.channel_mode, this.lsb_msb_flipflop, ];
};
$DMA$$.prototype.set_state = function($state$jscomp$16$$) {
  this.channel_page = $state$jscomp$16$$[0];
  this.channel_pagehi = $state$jscomp$16$$[1];
  this.channel_addr = $state$jscomp$16$$[2];
  this.channel_addr_init = $state$jscomp$16$$[3];
  this.channel_count = $state$jscomp$16$$[4];
  this.channel_count_init = $state$jscomp$16$$[5];
  this.channel_mask = $state$jscomp$16$$[6];
  this.channel_mode = $state$jscomp$16$$[7];
  this.lsb_msb_flipflop = $state$jscomp$16$$[8];
};
$DMA$$.prototype.port_count_write = function($channel$jscomp$1$$, $data_byte$$) {
  $dbg_log$$("count write [" + $channel$jscomp$1$$ + "] = " + $h$$($data_byte$$), 16);
  this.channel_count[$channel$jscomp$1$$] = this.flipflop_get(this.channel_count[$channel$jscomp$1$$], $data_byte$$, !1);
  this.channel_count_init[$channel$jscomp$1$$] = this.flipflop_get(this.channel_count_init[$channel$jscomp$1$$], $data_byte$$, !0);
};
$DMA$$.prototype.port_count_read = function($channel$jscomp$2$$) {
  $dbg_log$$("count read [" + $channel$jscomp$2$$ + "] -> " + $h$$(this.channel_count[$channel$jscomp$2$$]), 16);
  return this.flipflop_read(this.channel_count[$channel$jscomp$2$$]);
};
$DMA$$.prototype.port_addr_write = function($channel$jscomp$3$$, $data_byte$jscomp$1$$) {
  $dbg_log$$("addr write [" + $channel$jscomp$3$$ + "] = " + $h$$($data_byte$jscomp$1$$), 16);
  this.channel_addr[$channel$jscomp$3$$] = this.flipflop_get(this.channel_addr[$channel$jscomp$3$$], $data_byte$jscomp$1$$, !1);
  this.channel_addr_init[$channel$jscomp$3$$] = this.flipflop_get(this.channel_addr_init[$channel$jscomp$3$$], $data_byte$jscomp$1$$, !0);
};
$DMA$$.prototype.port_addr_read = function($channel$jscomp$4$$) {
  $dbg_log$$("addr read [" + $channel$jscomp$4$$ + "] -> " + $h$$(this.channel_addr[$channel$jscomp$4$$]), 16);
  return this.flipflop_read(this.channel_addr[$channel$jscomp$4$$]);
};
$DMA$$.prototype.port_pagehi_write = function($channel$jscomp$5$$, $data_byte$jscomp$2$$) {
  $dbg_log$$("pagehi write [" + $channel$jscomp$5$$ + "] = " + $h$$($data_byte$jscomp$2$$), 16);
  this.channel_pagehi[$channel$jscomp$5$$] = $data_byte$jscomp$2$$;
};
$DMA$$.prototype.port_pagehi_read = function($channel$jscomp$6$$) {
  $dbg_log$$("pagehi read [" + $channel$jscomp$6$$ + "]", 16);
  return this.channel_pagehi[$channel$jscomp$6$$];
};
$DMA$$.prototype.port_page_write = function($channel$jscomp$7$$, $data_byte$jscomp$3$$) {
  $dbg_log$$("page write [" + $channel$jscomp$7$$ + "] = " + $h$$($data_byte$jscomp$3$$), 16);
  this.channel_page[$channel$jscomp$7$$] = $data_byte$jscomp$3$$;
};
$DMA$$.prototype.port_page_read = function($channel$jscomp$8$$) {
  $dbg_log$$("page read [" + $channel$jscomp$8$$ + "]", 16);
  return this.channel_page[$channel$jscomp$8$$];
};
$DMA$$.prototype.port_singlemask_write = function($channel$jscomp$9_channel_offset$$, $data_byte$jscomp$4_value$jscomp$116$$) {
  $channel$jscomp$9_channel_offset$$ = ($data_byte$jscomp$4_value$jscomp$116$$ & 3) + $channel$jscomp$9_channel_offset$$;
  $data_byte$jscomp$4_value$jscomp$116$$ = $data_byte$jscomp$4_value$jscomp$116$$ & 4 ? 1 : 0;
  $dbg_log$$("singlechannel mask write [" + $channel$jscomp$9_channel_offset$$ + "] = " + $data_byte$jscomp$4_value$jscomp$116$$, 16);
  this.update_mask($channel$jscomp$9_channel_offset$$, $data_byte$jscomp$4_value$jscomp$116$$);
};
$DMA$$.prototype.port_multimask_write = function($channel_offset$jscomp$1$$, $data_byte$jscomp$5$$) {
  $dbg_log$$("multichannel mask write: " + $h$$($data_byte$jscomp$5$$), 16);
  for (var $i$jscomp$25$$ = 0; 4 > $i$jscomp$25$$; $i$jscomp$25$$++) {
    this.update_mask($channel_offset$jscomp$1$$ + $i$jscomp$25$$, $data_byte$jscomp$5$$ & 1 << $i$jscomp$25$$);
  }
};
$DMA$$.prototype.port_multimask_read = function($channel_offset$jscomp$2$$) {
  var $value$jscomp$117$$ = 0 | this.channel_mask[$channel_offset$jscomp$2$$ + 0];
  $value$jscomp$117$$ |= this.channel_mask[$channel_offset$jscomp$2$$ + 1] << 1;
  $value$jscomp$117$$ |= this.channel_mask[$channel_offset$jscomp$2$$ + 2] << 2;
  $value$jscomp$117$$ |= this.channel_mask[$channel_offset$jscomp$2$$ + 3] << 3;
  $dbg_log$$("multichannel mask read: " + $h$$($value$jscomp$117$$), 16);
  return $value$jscomp$117$$;
};
$DMA$$.prototype.port_mode_write = function($channel$jscomp$10_channel_offset$jscomp$3$$, $data_byte$jscomp$6$$) {
  $channel$jscomp$10_channel_offset$jscomp$3$$ = ($data_byte$jscomp$6$$ & 3) + $channel$jscomp$10_channel_offset$jscomp$3$$;
  $dbg_log$$("mode write [" + $channel$jscomp$10_channel_offset$jscomp$3$$ + "] = " + $h$$($data_byte$jscomp$6$$), 16);
  this.channel_mode[$channel$jscomp$10_channel_offset$jscomp$3$$] = $data_byte$jscomp$6$$;
};
$DMA$$.prototype.portC_write = function() {
  $dbg_log$$("flipflop reset", 16);
  this.lsb_msb_flipflop = 0;
};
$DMA$$.prototype.on_unmask = function($fn$jscomp$13$$, $this_value$$) {
  this.unmask_listeners.push({fn:$fn$jscomp$13$$, this_value:$this_value$$, });
};
$DMA$$.prototype.update_mask = function($channel$jscomp$11$$, $i$jscomp$26_value$jscomp$118$$) {
  if (this.channel_mask[$channel$jscomp$11$$] !== $i$jscomp$26_value$jscomp$118$$ && (this.channel_mask[$channel$jscomp$11$$] = $i$jscomp$26_value$jscomp$118$$, !$i$jscomp$26_value$jscomp$118$$)) {
    for ($dbg_log$$("firing on_unmask(" + $channel$jscomp$11$$ + ")", 16), $i$jscomp$26_value$jscomp$118$$ = 0; $i$jscomp$26_value$jscomp$118$$ < this.unmask_listeners.length; $i$jscomp$26_value$jscomp$118$$++) {
      this.unmask_listeners[$i$jscomp$26_value$jscomp$118$$].fn.call(this.unmask_listeners[$i$jscomp$26_value$jscomp$118$$].this_value, $channel$jscomp$11$$);
    }
  }
};
$DMA$$.prototype.do_read = function($buffer$jscomp$28$$, $start$jscomp$30$$, $len$jscomp$14$$, $channel$jscomp$12$$, $fn$jscomp$14$$) {
  var $read_count$jscomp$1$$ = this.count_get_8bit($channel$jscomp$12$$), $addr$jscomp$21$$ = this.address_get_8bit($channel$jscomp$12$$);
  $dbg_log$$("DMA write channel " + $channel$jscomp$12$$, 16);
  $dbg_log$$("to " + $h$$($addr$jscomp$21$$) + " len " + $h$$($read_count$jscomp$1$$), 16);
  $len$jscomp$14$$ < $read_count$jscomp$1$$ && $dbg_log$$("DMA should read more than provided: " + $h$$($len$jscomp$14$$) + " " + $h$$($read_count$jscomp$1$$), 16);
  if ($start$jscomp$30$$ + $read_count$jscomp$1$$ > $buffer$jscomp$28$$.byteLength) {
    $dbg_log$$("DMA read outside of buffer", 16), $fn$jscomp$14$$(!0);
  } else {
    var $cpu$jscomp$7$$ = this.cpu;
    this.channel_addr[$channel$jscomp$12$$] += $read_count$jscomp$1$$;
    $buffer$jscomp$28$$.get($start$jscomp$30$$, $read_count$jscomp$1$$, function($data$jscomp$115$$) {
      $cpu$jscomp$7$$.write_blob($data$jscomp$115$$, $addr$jscomp$21$$);
      $fn$jscomp$14$$(!1);
    });
  }
};
$DMA$$.prototype.do_write = function($buffer$jscomp$29$$, $start$jscomp$31$$, $len$jscomp$15$$, $channel$jscomp$13$$, $fn$jscomp$15$$) {
  var $read_count$jscomp$2$$ = this.channel_count[$channel$jscomp$13$$] + 1 & 65535, $bytes_per_count$$ = 5 <= $channel$jscomp$13$$ ? 2 : 1, $read_bytes$$ = $read_count$jscomp$2$$ * $bytes_per_count$$, $addr$jscomp$22$$ = this.address_get_8bit($channel$jscomp$13$$), $unfinished$$ = !1, $want_more$$ = !1, $autoinit$$ = this.channel_mode[$channel$jscomp$13$$] & 16;
  $dbg_log$$("DMA write channel " + $channel$jscomp$13$$, 16);
  $dbg_log$$("to " + $h$$($addr$jscomp$22$$) + " len " + $h$$($read_bytes$$), 16);
  $len$jscomp$15$$ < $read_bytes$$ ? ($dbg_log$$("DMA should read more than provided", 16), $read_count$jscomp$2$$ = Math.floor($len$jscomp$15$$ / $bytes_per_count$$), $read_bytes$$ = $read_count$jscomp$2$$ * $bytes_per_count$$, $unfinished$$ = !0) : $len$jscomp$15$$ > $read_bytes$$ && ($dbg_log$$("DMA attempted to read more than provided", 16), $want_more$$ = !0);
  $start$jscomp$31$$ + $read_bytes$$ > $buffer$jscomp$29$$.byteLength ? ($dbg_log$$("DMA write outside of buffer", 16), $fn$jscomp$15$$(!0)) : (this.channel_addr[$channel$jscomp$13$$] += $read_count$jscomp$2$$, this.channel_count[$channel$jscomp$13$$] -= $read_count$jscomp$2$$, !$unfinished$$ && $autoinit$$ && ($dbg_log$$("DMA autoinit", 16), this.channel_addr[$channel$jscomp$13$$] = this.channel_addr_init[$channel$jscomp$13$$], this.channel_count[$channel$jscomp$13$$] = this.channel_count_init[$channel$jscomp$13$$]), 
  $buffer$jscomp$29$$.set($start$jscomp$31$$, this.cpu.mem8.subarray($addr$jscomp$22$$, $addr$jscomp$22$$ + $read_bytes$$), () => {
    $want_more$$ && $autoinit$$ ? ($dbg_log$$("DMA continuing from start", 16), this.do_write($buffer$jscomp$29$$, $start$jscomp$31$$ + $read_bytes$$, $len$jscomp$15$$ - $read_bytes$$, $channel$jscomp$13$$, $fn$jscomp$15$$)) : $fn$jscomp$15$$(!1);
  }));
};
$DMA$$.prototype.address_get_8bit = function($channel$jscomp$14$$) {
  var $addr$jscomp$23$$ = this.channel_addr[$channel$jscomp$14$$];
  5 <= $channel$jscomp$14$$ && ($addr$jscomp$23$$ <<= 1);
  $addr$jscomp$23$$ = $addr$jscomp$23$$ & 65535 | this.channel_page[$channel$jscomp$14$$] << 16;
  return $addr$jscomp$23$$ |= this.channel_pagehi[$channel$jscomp$14$$] << 24;
};
$DMA$$.prototype.count_get_8bit = function($channel$jscomp$15$$) {
  var $count$jscomp$53$$ = this.channel_count[$channel$jscomp$15$$] + 1;
  5 <= $channel$jscomp$15$$ && ($count$jscomp$53$$ *= 2);
  return $count$jscomp$53$$;
};
$DMA$$.prototype.flipflop_get = function($old_dword$$, $new_byte$$, $continuing$$) {
  $continuing$$ || (this.lsb_msb_flipflop ^= 1);
  return this.lsb_msb_flipflop ? $old_dword$$ & -256 | $new_byte$$ : $old_dword$$ & -65281 | $new_byte$$ << 8;
};
$DMA$$.prototype.flipflop_read = function($dword$$) {
  return (this.lsb_msb_flipflop ^= 1) ? $dword$$ & 255 : $dword$$ >> 8 & 255;
};
function $PIT$$($cpu$jscomp$8$$, $bus$jscomp$4$$) {
  this.cpu = $cpu$jscomp$8$$;
  this.bus = $bus$jscomp$4$$;
  this.counter_start_time = new Float64Array(3);
  this.counter_start_value = new Uint16Array(3);
  this.counter_next_low = new Uint8Array(4);
  this.counter_enabled = new Uint8Array(4);
  this.counter_mode = new Uint8Array(4);
  this.counter_read_mode = new Uint8Array(4);
  this.counter_latch = new Uint8Array(4);
  this.counter_latch_value = new Uint16Array(3);
  this.counter_reload = new Uint16Array(3);
  $cpu$jscomp$8$$.io.register_read(97, this, function() {
    var $counter2_out_now$$ = $v86$$.microtick(), $ref_toggle$$ = 66.66666666666667 * $counter2_out_now$$ & 1;
    $counter2_out_now$$ = this.did_rollover(2, $counter2_out_now$$);
    return $ref_toggle$$ << 4 | $counter2_out_now$$ << 5;
  });
  $cpu$jscomp$8$$.io.register_write(97, this, function($data$jscomp$116$$) {
    $data$jscomp$116$$ & 1 ? this.bus.send("pcspeaker-enable") : this.bus.send("pcspeaker-disable");
  });
  $cpu$jscomp$8$$.io.register_read(64, this, function() {
    return this.counter_read(0);
  });
  $cpu$jscomp$8$$.io.register_read(65, this, function() {
    return this.counter_read(1);
  });
  $cpu$jscomp$8$$.io.register_read(66, this, function() {
    return this.counter_read(2);
  });
  $cpu$jscomp$8$$.io.register_write(64, this, function($data$jscomp$117$$) {
    this.counter_write(0, $data$jscomp$117$$);
  });
  $cpu$jscomp$8$$.io.register_write(65, this, function($data$jscomp$118$$) {
    this.counter_write(1, $data$jscomp$118$$);
  });
  $cpu$jscomp$8$$.io.register_write(66, this, function($data$jscomp$119$$) {
    this.counter_write(2, $data$jscomp$119$$);
    this.bus.send("pcspeaker-update", [this.counter_mode[2], this.counter_reload[2]]);
  });
  $cpu$jscomp$8$$.io.register_write(67, this, this.port43_write);
}
$PIT$$.prototype.get_state = function() {
  var $state$jscomp$17$$ = [];
  $state$jscomp$17$$[0] = this.counter_next_low;
  $state$jscomp$17$$[1] = this.counter_enabled;
  $state$jscomp$17$$[2] = this.counter_mode;
  $state$jscomp$17$$[3] = this.counter_read_mode;
  $state$jscomp$17$$[4] = this.counter_latch;
  $state$jscomp$17$$[5] = this.counter_latch_value;
  $state$jscomp$17$$[6] = this.counter_reload;
  $state$jscomp$17$$[7] = this.counter_start_time;
  $state$jscomp$17$$[8] = this.counter_start_value;
  return $state$jscomp$17$$;
};
$PIT$$.prototype.set_state = function($state$jscomp$18$$) {
  this.counter_next_low = $state$jscomp$18$$[0];
  this.counter_enabled = $state$jscomp$18$$[1];
  this.counter_mode = $state$jscomp$18$$[2];
  this.counter_read_mode = $state$jscomp$18$$[3];
  this.counter_latch = $state$jscomp$18$$[4];
  this.counter_latch_value = $state$jscomp$18$$[5];
  this.counter_reload = $state$jscomp$18$$[6];
  this.counter_start_time = $state$jscomp$18$$[7];
  this.counter_start_value = $state$jscomp$18$$[8];
};
$PIT$$.prototype.timer = function($now$jscomp$1$$, $no_irq$$) {
  var $time_to_next_interrupt$$ = 100;
  $no_irq$$ || (this.counter_enabled[0] && this.did_rollover(0, $now$jscomp$1$$) ? (this.counter_start_value[0] = this.get_counter_value(0, $now$jscomp$1$$), this.counter_start_time[0] = $now$jscomp$1$$, $dbg_log$$("pit interrupt. new value: " + this.counter_start_value[0], 512), this.cpu.device_lower_irq(0), this.cpu.device_raise_irq(0), 0 === this.counter_mode[0] && (this.counter_enabled[0] = 0)) : this.cpu.device_lower_irq(0), this.counter_enabled[0] && ($time_to_next_interrupt$$ = (this.counter_start_value[0] - 
  Math.floor(1193.1816666 * ($now$jscomp$1$$ - this.counter_start_time[0]))) / 1193.1816666));
  return $time_to_next_interrupt$$;
};
$PIT$$.prototype.get_counter_value = function($i$jscomp$27$$, $now$jscomp$2_value$jscomp$119$$) {
  if (!this.counter_enabled[$i$jscomp$27$$]) {
    return 0;
  }
  var $diff$jscomp$1_reload$$ = $now$jscomp$2_value$jscomp$119$$ - this.counter_start_time[$i$jscomp$27$$], $diff_in_ticks$jscomp$1$$ = Math.floor(1193.1816666 * $diff$jscomp$1_reload$$);
  $now$jscomp$2_value$jscomp$119$$ = this.counter_start_value[$i$jscomp$27$$] - $diff_in_ticks$jscomp$1$$;
  $dbg_log$$("diff=" + $diff$jscomp$1_reload$$ + " dticks=" + $diff_in_ticks$jscomp$1$$ + " value=" + $now$jscomp$2_value$jscomp$119$$ + " reload=" + this.counter_reload[$i$jscomp$27$$], 512);
  $diff$jscomp$1_reload$$ = this.counter_reload[$i$jscomp$27$$];
  $now$jscomp$2_value$jscomp$119$$ >= $diff$jscomp$1_reload$$ ? ($dbg_log$$("Warning: Counter" + $i$jscomp$27$$ + " value " + $now$jscomp$2_value$jscomp$119$$ + " is larger than reload " + $diff$jscomp$1_reload$$, 512), $now$jscomp$2_value$jscomp$119$$ %= $diff$jscomp$1_reload$$) : 0 > $now$jscomp$2_value$jscomp$119$$ && ($now$jscomp$2_value$jscomp$119$$ = $now$jscomp$2_value$jscomp$119$$ % $diff$jscomp$1_reload$$ + $diff$jscomp$1_reload$$);
  return $now$jscomp$2_value$jscomp$119$$;
};
$PIT$$.prototype.did_rollover = function($i$jscomp$28$$, $diff$jscomp$2_now$jscomp$3$$) {
  $diff$jscomp$2_now$jscomp$3$$ -= this.counter_start_time[$i$jscomp$28$$];
  return 0 > $diff$jscomp$2_now$jscomp$3$$ ? ($dbg_log$$("Warning: PIT timer difference is negative, resetting (timer " + $i$jscomp$28$$ + ")"), !0) : this.counter_start_value[$i$jscomp$28$$] < Math.floor(1193.1816666 * $diff$jscomp$2_now$jscomp$3$$);
};
$PIT$$.prototype.counter_read = function($i$jscomp$29_value$jscomp$120$$) {
  var $latch_next_low$$ = this.counter_latch[$i$jscomp$29_value$jscomp$120$$];
  if ($latch_next_low$$) {
    return this.counter_latch[$i$jscomp$29_value$jscomp$120$$]--, 2 === $latch_next_low$$ ? this.counter_latch_value[$i$jscomp$29_value$jscomp$120$$] & 255 : this.counter_latch_value[$i$jscomp$29_value$jscomp$120$$] >> 8;
  }
  $latch_next_low$$ = this.counter_next_low[$i$jscomp$29_value$jscomp$120$$];
  3 === this.counter_mode[$i$jscomp$29_value$jscomp$120$$] && (this.counter_next_low[$i$jscomp$29_value$jscomp$120$$] ^= 1);
  $i$jscomp$29_value$jscomp$120$$ = this.get_counter_value($i$jscomp$29_value$jscomp$120$$, $v86$$.microtick());
  return $latch_next_low$$ ? $i$jscomp$29_value$jscomp$120$$ & 255 : $i$jscomp$29_value$jscomp$120$$ >> 8;
};
$PIT$$.prototype.counter_write = function($i$jscomp$30$$, $value$jscomp$121$$) {
  this.counter_reload[$i$jscomp$30$$] = this.counter_next_low[$i$jscomp$30$$] ? this.counter_reload[$i$jscomp$30$$] & -256 | $value$jscomp$121$$ : this.counter_reload[$i$jscomp$30$$] & 255 | $value$jscomp$121$$ << 8;
  3 === this.counter_read_mode[$i$jscomp$30$$] && this.counter_next_low[$i$jscomp$30$$] || (this.counter_reload[$i$jscomp$30$$] || (this.counter_reload[$i$jscomp$30$$] = 65535), this.counter_start_value[$i$jscomp$30$$] = this.counter_reload[$i$jscomp$30$$], this.counter_enabled[$i$jscomp$30$$] = !0, this.counter_start_time[$i$jscomp$30$$] = $v86$$.microtick(), $dbg_log$$("counter" + $i$jscomp$30$$ + " reload=" + $h$$(this.counter_reload[$i$jscomp$30$$]) + " tick=" + (this.counter_reload[$i$jscomp$30$$] || 
  65536) / 1193.1816666 + "ms", 512));
  3 === this.counter_read_mode[$i$jscomp$30$$] && (this.counter_next_low[$i$jscomp$30$$] ^= 1);
};
$PIT$$.prototype.port43_write = function($read_mode_reg_byte$jscomp$1$$) {
  var $mode$jscomp$18_value$jscomp$122$$ = $read_mode_reg_byte$jscomp$1$$ >> 1 & 7, $binary_mode$$ = $read_mode_reg_byte$jscomp$1$$ & 1, $i$jscomp$31$$ = $read_mode_reg_byte$jscomp$1$$ >> 6 & 3;
  $read_mode_reg_byte$jscomp$1$$ = $read_mode_reg_byte$jscomp$1$$ >> 4 & 3;
  1 === $i$jscomp$31$$ && $dbg_log$$("Unimplemented timer1", 512);
  3 === $i$jscomp$31$$ ? $dbg_log$$("Unimplemented read back", 512) : 0 === $read_mode_reg_byte$jscomp$1$$ ? (this.counter_latch[$i$jscomp$31$$] = 2, $mode$jscomp$18_value$jscomp$122$$ = this.get_counter_value($i$jscomp$31$$, $v86$$.microtick()), $dbg_log$$("latch: " + $mode$jscomp$18_value$jscomp$122$$, 512), this.counter_latch_value[$i$jscomp$31$$] = $mode$jscomp$18_value$jscomp$122$$ ? $mode$jscomp$18_value$jscomp$122$$ - 1 : 0) : (6 <= $mode$jscomp$18_value$jscomp$122$$ && ($mode$jscomp$18_value$jscomp$122$$ &= 
  -5), $dbg_log$$("Control: mode=" + $mode$jscomp$18_value$jscomp$122$$ + " ctr=" + $i$jscomp$31$$ + " read_mode=" + $read_mode_reg_byte$jscomp$1$$ + " bcd=" + $binary_mode$$, 512), this.counter_next_low[$i$jscomp$31$$] = 1 === $read_mode_reg_byte$jscomp$1$$ ? 0 : 1, 0 === $i$jscomp$31$$ && this.cpu.device_lower_irq(0), 0 !== $mode$jscomp$18_value$jscomp$122$$ && 3 !== $mode$jscomp$18_value$jscomp$122$$ && 2 !== $mode$jscomp$18_value$jscomp$122$$ && $dbg_log$$("Unimplemented counter mode: " + $h$$($mode$jscomp$18_value$jscomp$122$$), 
  512), this.counter_mode[$i$jscomp$31$$] = $mode$jscomp$18_value$jscomp$122$$, this.counter_read_mode[$i$jscomp$31$$] = $read_mode_reg_byte$jscomp$1$$, 2 === $i$jscomp$31$$ && this.bus.send("pcspeaker-update", [this.counter_mode[2], this.counter_reload[2]]));
};
$PIT$$.prototype.dump = function() {
  const $reload$jscomp$1$$ = this.counter_reload[0];
  $dbg_log$$("counter0 ticks every " + ($reload$jscomp$1$$ || 65536) / 1193.1816666 + "ms (reload=" + $reload$jscomp$1$$ + ")");
};
const $VGA_HOST_MEMORY_SPACE_START$$ = Uint32Array.from([655360, 655360, 720896, 753664, ]), $VGA_HOST_MEMORY_SPACE_SIZE$$ = Uint32Array.from([131072, 65536, 32768, 32768, ]);
function $VGAScreen$$($cpu$jscomp$9$$, $bus$jscomp$5_io$jscomp$1$$, $screen$jscomp$2_vga_offset$$, $vga_memory_size$$, $options$jscomp$37$$) {
  this.cpu = $cpu$jscomp$9$$;
  this.bus = $bus$jscomp$5_io$jscomp$1$$;
  this.screen = $screen$jscomp$2_vga_offset$$;
  this.vga_memory_size = $vga_memory_size$$;
  this.cursor_address = 0;
  this.cursor_scanline_start = 14;
  this.cursor_scanline_end = 15;
  this.max_cols = 80;
  this.max_rows = 25;
  this.virtual_height = this.virtual_width = this.screen_height = this.screen_width = 0;
  this.layers = [];
  this.start_address_latched = this.start_address = 0;
  this.crtc = new Uint8Array(25);
  this.line_compare = this.offset_register = this.preset_row_scan = this.underline_location_register = this.vertical_blank_start = this.vertical_display_enable_end = this.horizontal_blank_start = this.horizontal_display_enable_end = this.crtc_mode = 0;
  this.graphical_mode = !1;
  this.vga256_palette = new Int32Array(256);
  this.latch_dword = 0;
  this.svga_version = 45253;
  this.svga_height = this.svga_width = 0;
  this.svga_enabled = !1;
  this.svga_bpp = 32;
  this.svga_offset_y = this.svga_offset_x = this.svga_offset = this.svga_bank_offset = 0;
  this.vga_memory_size = void 0 === this.vga_memory_size || 262144 > this.vga_memory_size ? 262144 : 268435456 < this.vga_memory_size ? 268435456 : $v86util$$.round_up_to_next_power_of_2(this.vga_memory_size);
  $dbg_log$$("effective vga memory size: " + this.vga_memory_size, 256);
  this.pci_space = [52, 18, 17, 17, 3, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 8, 14680064, 57344, 224, 0, 0, 0, 0, 0, 0, 191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 190, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
  this.pci_id = 144;
  this.pci_bars = [{size:this.vga_memory_size, }, ];
  this.pci_rom_size = 65536;
  this.pci_rom_address = 4272947200;
  this.name = "vga";
  this.dac_state = this.dac_color_index_read = this.dac_color_index_write = this.index_crtc = 0;
  this.dac_mask = 255;
  this.dac_map = new Uint8Array(16);
  this.attribute_controller_index = -1;
  this.palette_source = 32;
  this.color_select = this.horizontal_panning = this.color_plane_enable = this.attribute_mode = 0;
  this.sequencer_index = -1;
  this.plane_write_bm = 15;
  this.clocking_mode = this.sequencer_memory_mode = 0;
  this.graphics_index = -1;
  this.planar_rotate_reg = this.planar_mode = this.plane_read = this.character_map_select = 0;
  this.planar_bitmap = 255;
  this.max_scan_line = this.color_dont_care = this.color_compare = this.miscellaneous_graphics_register = this.planar_setreset_enable = this.planar_setreset = 0;
  this.port_3DA_value = this.miscellaneous_output_register = 255;
  $bus$jscomp$5_io$jscomp$1$$ = $cpu$jscomp$9$$.io;
  $bus$jscomp$5_io$jscomp$1$$.register_write(960, this, this.port3C0_write);
  $bus$jscomp$5_io$jscomp$1$$.register_read(960, this, this.port3C0_read, this.port3C0_read16);
  $bus$jscomp$5_io$jscomp$1$$.register_read(961, this, this.port3C1_read);
  $bus$jscomp$5_io$jscomp$1$$.register_write(962, this, this.port3C2_write);
  $bus$jscomp$5_io$jscomp$1$$.register_write_consecutive(964, this, this.port3C4_write, this.port3C5_write);
  $bus$jscomp$5_io$jscomp$1$$.register_read(964, this, this.port3C4_read);
  $bus$jscomp$5_io$jscomp$1$$.register_read(965, this, this.port3C5_read);
  $bus$jscomp$5_io$jscomp$1$$.register_write_consecutive(974, this, this.port3CE_write, this.port3CF_write);
  $bus$jscomp$5_io$jscomp$1$$.register_read(974, this, this.port3CE_read);
  $bus$jscomp$5_io$jscomp$1$$.register_read(975, this, this.port3CF_read);
  $bus$jscomp$5_io$jscomp$1$$.register_read(966, this, this.port3C6_read);
  $bus$jscomp$5_io$jscomp$1$$.register_write(966, this, this.port3C6_write);
  $bus$jscomp$5_io$jscomp$1$$.register_write(967, this, this.port3C7_write);
  $bus$jscomp$5_io$jscomp$1$$.register_read(967, this, this.port3C7_read);
  $bus$jscomp$5_io$jscomp$1$$.register_write(968, this, this.port3C8_write);
  $bus$jscomp$5_io$jscomp$1$$.register_read(968, this, this.port3C8_read);
  $bus$jscomp$5_io$jscomp$1$$.register_write(969, this, this.port3C9_write);
  $bus$jscomp$5_io$jscomp$1$$.register_read(969, this, this.port3C9_read);
  $bus$jscomp$5_io$jscomp$1$$.register_read(972, this, this.port3CC_read);
  $bus$jscomp$5_io$jscomp$1$$.register_write(980, this, this.port3D4_write, this.port3D4_write16);
  $bus$jscomp$5_io$jscomp$1$$.register_write(981, this, this.port3D5_write, this.port3D5_write16);
  $bus$jscomp$5_io$jscomp$1$$.register_read(980, this, this.port3D4_read);
  $bus$jscomp$5_io$jscomp$1$$.register_read(981, this, this.port3D5_read, this.port3D5_read16);
  $bus$jscomp$5_io$jscomp$1$$.register_write(948, this, this.port3D4_write, this.port3D4_write16);
  $bus$jscomp$5_io$jscomp$1$$.register_write(949, this, this.port3D5_write, this.port3D5_write16);
  $bus$jscomp$5_io$jscomp$1$$.register_read(948, this, this.port3D4_read);
  $bus$jscomp$5_io$jscomp$1$$.register_read(949, this, this.port3D5_read, this.port3D5_read16);
  $bus$jscomp$5_io$jscomp$1$$.register_read(970, this, function() {
    $dbg_log$$("3CA read", 256);
    return 0;
  });
  $bus$jscomp$5_io$jscomp$1$$.register_read(986, this, this.port3DA_read);
  $bus$jscomp$5_io$jscomp$1$$.register_read(954, this, this.port3DA_read);
  this.dispi_index = -1;
  this.dispi_enable_value = 0;
  $bus$jscomp$5_io$jscomp$1$$.register_write(462, this, void 0, this.port1CE_write);
  $bus$jscomp$5_io$jscomp$1$$.register_write(463, this, void 0, this.port1CF_write);
  $bus$jscomp$5_io$jscomp$1$$.register_read(463, this, void 0, this.port1CF_read);
  $screen$jscomp$2_vga_offset$$ = $cpu$jscomp$9$$.svga_allocate_memory(this.vga_memory_size) >>> 0;
  this.svga_memory = $v86util$$.view(Uint8Array, $cpu$jscomp$9$$.wasm_memory, $screen$jscomp$2_vga_offset$$, this.vga_memory_size);
  this.diff_addr_min = this.vga_memory_size;
  this.diff_addr_max = 0;
  this.diff_plot_min = this.vga_memory_size;
  this.diff_plot_max = 0;
  this.image_data = null;
  this.vga_memory = new Uint8Array(262144);
  this.plane0 = new Uint8Array(this.vga_memory.buffer, 0, 65536);
  this.plane1 = new Uint8Array(this.vga_memory.buffer, 65536, 65536);
  this.plane2 = new Uint8Array(this.vga_memory.buffer, 131072, 65536);
  this.plane3 = new Uint8Array(this.vga_memory.buffer, 196608, 65536);
  this.pixel_buffer = new Uint8Array(524288);
  $bus$jscomp$5_io$jscomp$1$$.mmap_register(655360, 131072, $addr$jscomp$24$$ => this.vga_memory_read($addr$jscomp$24$$), ($addr$jscomp$25$$, $value$jscomp$123$$) => this.vga_memory_write($addr$jscomp$25$$, $value$jscomp$123$$), );
  $options$jscomp$37$$.use_graphical_text && (this.graphical_text = new $GraphicalText$$(this));
  $cpu$jscomp$9$$.devices.pci.register_device(this);
}
$VGAScreen$$.prototype.grab_text_content = function($keep_whitespace$$) {
  var $addr$jscomp$26$$ = this.start_address << 1;
  const $split_screen_row$$ = this.scan_line_to_screen_row(this.line_compare), $row_offset$$ = Math.max(0, 2 * (2 * this.offset_register - this.max_cols)), $text_rows$$ = [];
  for (var $row$jscomp$3$$ = 0; $row$jscomp$3$$ < this.max_rows; $row$jscomp$3$$++) {
    $row$jscomp$3$$ === $split_screen_row$$ && ($addr$jscomp$26$$ = 0);
    let $line$jscomp$2$$ = "";
    for (var $col$jscomp$2$$ = 0; $col$jscomp$2$$ < this.max_cols; $col$jscomp$2$$++, $addr$jscomp$26$$ += 2) {
      $line$jscomp$2$$ += String.fromCodePoint(this.vga_memory[$addr$jscomp$26$$]);
    }
    $text_rows$$.push($keep_whitespace$$ ? $line$jscomp$2$$ : $line$jscomp$2$$.trimEnd());
    $addr$jscomp$26$$ += $row_offset$$;
  }
  return $text_rows$$;
};
$VGAScreen$$.prototype.get_state = function() {
  var $state$jscomp$19$$ = [];
  $state$jscomp$19$$[0] = this.vga_memory_size;
  $state$jscomp$19$$[1] = this.cursor_address;
  $state$jscomp$19$$[2] = this.cursor_scanline_start;
  $state$jscomp$19$$[3] = this.cursor_scanline_end;
  $state$jscomp$19$$[4] = this.max_cols;
  $state$jscomp$19$$[5] = this.max_rows;
  $state$jscomp$19$$[6] = this.vga_memory;
  $state$jscomp$19$$[7] = this.dac_state;
  $state$jscomp$19$$[8] = this.start_address;
  $state$jscomp$19$$[9] = this.graphical_mode;
  $state$jscomp$19$$[10] = this.vga256_palette;
  $state$jscomp$19$$[11] = this.latch_dword;
  $state$jscomp$19$$[12] = this.color_compare;
  $state$jscomp$19$$[13] = this.color_dont_care;
  $state$jscomp$19$$[14] = this.miscellaneous_graphics_register;
  $state$jscomp$19$$[15] = this.svga_width;
  $state$jscomp$19$$[16] = this.svga_height;
  $state$jscomp$19$$[17] = this.crtc_mode;
  $state$jscomp$19$$[18] = this.svga_enabled;
  $state$jscomp$19$$[19] = this.svga_bpp;
  $state$jscomp$19$$[20] = this.svga_bank_offset;
  $state$jscomp$19$$[21] = this.svga_offset;
  $state$jscomp$19$$[22] = this.index_crtc;
  $state$jscomp$19$$[23] = this.dac_color_index_write;
  $state$jscomp$19$$[24] = this.dac_color_index_read;
  $state$jscomp$19$$[25] = this.dac_map;
  $state$jscomp$19$$[26] = this.sequencer_index;
  $state$jscomp$19$$[27] = this.plane_write_bm;
  $state$jscomp$19$$[28] = this.sequencer_memory_mode;
  $state$jscomp$19$$[29] = this.graphics_index;
  $state$jscomp$19$$[30] = this.plane_read;
  $state$jscomp$19$$[31] = this.planar_mode;
  $state$jscomp$19$$[32] = this.planar_rotate_reg;
  $state$jscomp$19$$[33] = this.planar_bitmap;
  $state$jscomp$19$$[34] = this.max_scan_line;
  $state$jscomp$19$$[35] = this.miscellaneous_output_register;
  $state$jscomp$19$$[36] = this.port_3DA_value;
  $state$jscomp$19$$[37] = this.dispi_index;
  $state$jscomp$19$$[38] = this.dispi_enable_value;
  $state$jscomp$19$$[39] = this.svga_memory;
  $state$jscomp$19$$[41] = this.attribute_controller_index;
  $state$jscomp$19$$[42] = this.offset_register;
  $state$jscomp$19$$[43] = this.planar_setreset;
  $state$jscomp$19$$[44] = this.planar_setreset_enable;
  $state$jscomp$19$$[45] = this.start_address_latched;
  $state$jscomp$19$$[46] = this.crtc;
  $state$jscomp$19$$[47] = this.horizontal_display_enable_end;
  $state$jscomp$19$$[48] = this.horizontal_blank_start;
  $state$jscomp$19$$[49] = this.vertical_display_enable_end;
  $state$jscomp$19$$[50] = this.vertical_blank_start;
  $state$jscomp$19$$[51] = this.underline_location_register;
  $state$jscomp$19$$[52] = this.preset_row_scan;
  $state$jscomp$19$$[53] = this.offset_register;
  $state$jscomp$19$$[54] = this.palette_source;
  $state$jscomp$19$$[55] = this.attribute_mode;
  $state$jscomp$19$$[56] = this.color_plane_enable;
  $state$jscomp$19$$[57] = this.horizontal_panning;
  $state$jscomp$19$$[58] = this.color_select;
  $state$jscomp$19$$[59] = this.clocking_mode;
  $state$jscomp$19$$[60] = this.line_compare;
  $state$jscomp$19$$[61] = this.pixel_buffer;
  $state$jscomp$19$$[62] = this.dac_mask;
  $state$jscomp$19$$[63] = this.character_map_select;
  return $state$jscomp$19$$;
};
$VGAScreen$$.prototype.set_state = function($state$jscomp$20$$) {
  this.vga_memory_size = $state$jscomp$20$$[0];
  this.cursor_address = $state$jscomp$20$$[1];
  this.cursor_scanline_start = $state$jscomp$20$$[2];
  this.cursor_scanline_end = $state$jscomp$20$$[3];
  this.max_cols = $state$jscomp$20$$[4];
  this.max_rows = $state$jscomp$20$$[5];
  $state$jscomp$20$$[6] && this.vga_memory.set($state$jscomp$20$$[6]);
  this.dac_state = $state$jscomp$20$$[7];
  this.start_address = $state$jscomp$20$$[8];
  this.graphical_mode = $state$jscomp$20$$[9];
  this.vga256_palette = $state$jscomp$20$$[10];
  this.latch_dword = $state$jscomp$20$$[11];
  this.color_compare = $state$jscomp$20$$[12];
  this.color_dont_care = $state$jscomp$20$$[13];
  this.miscellaneous_graphics_register = $state$jscomp$20$$[14];
  this.svga_width = $state$jscomp$20$$[15];
  this.svga_height = $state$jscomp$20$$[16];
  this.crtc_mode = $state$jscomp$20$$[17];
  this.svga_enabled = $state$jscomp$20$$[18];
  this.svga_bpp = $state$jscomp$20$$[19];
  this.svga_bank_offset = $state$jscomp$20$$[20];
  this.svga_offset = $state$jscomp$20$$[21];
  this.index_crtc = $state$jscomp$20$$[22];
  this.dac_color_index_write = $state$jscomp$20$$[23];
  this.dac_color_index_read = $state$jscomp$20$$[24];
  this.dac_map = $state$jscomp$20$$[25];
  this.sequencer_index = $state$jscomp$20$$[26];
  this.plane_write_bm = $state$jscomp$20$$[27];
  this.sequencer_memory_mode = $state$jscomp$20$$[28];
  this.graphics_index = $state$jscomp$20$$[29];
  this.plane_read = $state$jscomp$20$$[30];
  this.planar_mode = $state$jscomp$20$$[31];
  this.planar_rotate_reg = $state$jscomp$20$$[32];
  this.planar_bitmap = $state$jscomp$20$$[33];
  this.max_scan_line = $state$jscomp$20$$[34];
  this.miscellaneous_output_register = $state$jscomp$20$$[35];
  this.port_3DA_value = $state$jscomp$20$$[36];
  this.dispi_index = $state$jscomp$20$$[37];
  this.dispi_enable_value = $state$jscomp$20$$[38];
  this.svga_memory.set($state$jscomp$20$$[39]);
  this.attribute_controller_index = $state$jscomp$20$$[41];
  this.offset_register = $state$jscomp$20$$[42];
  this.planar_setreset = $state$jscomp$20$$[43];
  this.planar_setreset_enable = $state$jscomp$20$$[44];
  this.start_address_latched = $state$jscomp$20$$[45];
  this.crtc.set($state$jscomp$20$$[46]);
  this.horizontal_display_enable_end = $state$jscomp$20$$[47];
  this.horizontal_blank_start = $state$jscomp$20$$[48];
  this.vertical_display_enable_end = $state$jscomp$20$$[49];
  this.vertical_blank_start = $state$jscomp$20$$[50];
  this.underline_location_register = $state$jscomp$20$$[51];
  this.preset_row_scan = $state$jscomp$20$$[52];
  this.offset_register = $state$jscomp$20$$[53];
  this.palette_source = $state$jscomp$20$$[54];
  this.attribute_mode = $state$jscomp$20$$[55];
  this.color_plane_enable = $state$jscomp$20$$[56];
  this.horizontal_panning = $state$jscomp$20$$[57];
  this.color_select = $state$jscomp$20$$[58];
  this.clocking_mode = $state$jscomp$20$$[59];
  this.line_compare = $state$jscomp$20$$[60];
  $state$jscomp$20$$[61] && this.pixel_buffer.set($state$jscomp$20$$[61]);
  this.dac_mask = void 0 === $state$jscomp$20$$[62] ? 255 : $state$jscomp$20$$[62];
  this.character_map_select = void 0 === $state$jscomp$20$$[63] ? 0 : $state$jscomp$20$$[63];
  this.screen.set_mode(this.graphical_mode || !!this.graphical_text);
  this.graphical_mode ? (this.screen_height = this.screen_width = 0, this.svga_enabled ? (this.set_size_graphical(this.svga_width, this.svga_height, this.svga_width, this.svga_height, this.svga_bpp), this.update_layers()) : (this.update_vga_size(), this.update_layers(), this.complete_replot())) : (this.set_size_text(this.max_cols, this.max_rows), this.update_cursor_scanline(), this.update_cursor());
  this.complete_redraw();
};
$VGAScreen$$.prototype.vga_memory_read = function($addr$jscomp$27$$) {
  if (this.svga_enabled) {
    return this.cpu.read8(($addr$jscomp$27$$ - 655360 | this.svga_bank_offset) + 3758096384 | 0);
  }
  var $memory_space_select_plane_reading$$ = this.miscellaneous_graphics_register >> 2 & 3;
  $addr$jscomp$27$$ -= $VGA_HOST_MEMORY_SPACE_START$$[$memory_space_select_plane_reading$$];
  if (0 > $addr$jscomp$27$$ || $addr$jscomp$27$$ >= $VGA_HOST_MEMORY_SPACE_SIZE$$[$memory_space_select_plane_reading$$]) {
    return $dbg_log$$("vga read outside memory space: addr:" + $h$$($addr$jscomp$27$$), 256), 0;
  }
  this.latch_dword = this.plane0[$addr$jscomp$27$$];
  this.latch_dword |= this.plane1[$addr$jscomp$27$$] << 8;
  this.latch_dword |= this.plane2[$addr$jscomp$27$$] << 16;
  this.latch_dword |= this.plane3[$addr$jscomp$27$$] << 24;
  if (this.planar_mode & 8) {
    return $memory_space_select_plane_reading$$ = 255, this.color_dont_care & 1 && ($memory_space_select_plane_reading$$ &= this.plane0[$addr$jscomp$27$$] ^ ~(this.color_compare & 1 ? 255 : 0)), this.color_dont_care & 2 && ($memory_space_select_plane_reading$$ &= this.plane1[$addr$jscomp$27$$] ^ ~(this.color_compare & 2 ? 255 : 0)), this.color_dont_care & 4 && ($memory_space_select_plane_reading$$ &= this.plane2[$addr$jscomp$27$$] ^ ~(this.color_compare & 4 ? 255 : 0)), this.color_dont_care & 8 && 
    ($memory_space_select_plane_reading$$ &= this.plane3[$addr$jscomp$27$$] ^ ~(this.color_compare & 8 ? 255 : 0)), $memory_space_select_plane_reading$$;
  }
  $memory_space_select_plane_reading$$ = this.plane_read;
  this.graphical_mode ? this.sequencer_memory_mode & 8 ? ($memory_space_select_plane_reading$$ = $addr$jscomp$27$$ & 3, $addr$jscomp$27$$ &= -4) : this.planar_mode & 16 && ($memory_space_select_plane_reading$$ = $addr$jscomp$27$$ & 1, $addr$jscomp$27$$ &= -2) : $memory_space_select_plane_reading$$ &= 3;
  return this.vga_memory[$memory_space_select_plane_reading$$ << 16 | $addr$jscomp$27$$];
};
$VGAScreen$$.prototype.vga_memory_write = function($addr$jscomp$28$$, $value$jscomp$124$$) {
  if (this.svga_enabled) {
    this.cpu.write8(($addr$jscomp$28$$ - 655360 | this.svga_bank_offset) + 3758096384 | 0, $value$jscomp$124$$);
  } else {
    var $memory_space_select$jscomp$1$$ = this.miscellaneous_graphics_register >> 2 & 3;
    $addr$jscomp$28$$ -= $VGA_HOST_MEMORY_SPACE_START$$[$memory_space_select$jscomp$1$$];
    0 > $addr$jscomp$28$$ || $addr$jscomp$28$$ >= $VGA_HOST_MEMORY_SPACE_SIZE$$[$memory_space_select$jscomp$1$$] ? $dbg_log$$("vga write outside memory space: addr:" + $h$$($addr$jscomp$28$$) + ", value:" + $h$$($value$jscomp$124$$), 256) : this.graphical_mode ? this.vga_memory_write_graphical($addr$jscomp$28$$, $value$jscomp$124$$) : this.plane_write_bm & 3 ? this.vga_memory_write_text_mode($addr$jscomp$28$$, $value$jscomp$124$$) : this.plane2[$addr$jscomp$28$$] = $value$jscomp$124$$;
  }
};
$VGAScreen$$.prototype.vga_memory_write_graphical = function($addr$jscomp$29_pixel_addr$$, $plane_select_value$jscomp$125$$) {
  var $write_mode$$ = this.planar_mode & 3, $bitmask$$ = this.apply_feed(this.planar_bitmap), $setreset_dword$$ = this.apply_expand(this.planar_setreset), $setreset_enable_dword$$ = this.apply_expand(this.planar_setreset_enable);
  switch($write_mode$$) {
    case 0:
      $plane_select_value$jscomp$125$$ = this.apply_rotate($plane_select_value$jscomp$125$$);
      var $plane_dword$$ = this.apply_feed($plane_select_value$jscomp$125$$);
      $plane_dword$$ = this.apply_setreset($plane_dword$$, $setreset_enable_dword$$);
      $plane_dword$$ = this.apply_logical($plane_dword$$, this.latch_dword);
      $plane_dword$$ = this.apply_bitmask($plane_dword$$, $bitmask$$);
      break;
    case 1:
      $plane_dword$$ = this.latch_dword;
      break;
    case 2:
      $plane_dword$$ = this.apply_expand($plane_select_value$jscomp$125$$);
      $plane_dword$$ = this.apply_logical($plane_dword$$, this.latch_dword);
      $plane_dword$$ = this.apply_bitmask($plane_dword$$, $bitmask$$);
      break;
    case 3:
      $plane_select_value$jscomp$125$$ = this.apply_rotate($plane_select_value$jscomp$125$$), $bitmask$$ &= this.apply_feed($plane_select_value$jscomp$125$$), $plane_dword$$ = this.apply_bitmask($setreset_dword$$, $bitmask$$);
  }
  $plane_select_value$jscomp$125$$ = 15;
  switch(this.sequencer_memory_mode & 12) {
    case 0:
      $plane_select_value$jscomp$125$$ = 5 << ($addr$jscomp$29_pixel_addr$$ & 1);
      $addr$jscomp$29_pixel_addr$$ &= -2;
      break;
    case 8:
    case 12:
      $plane_select_value$jscomp$125$$ = 1 << ($addr$jscomp$29_pixel_addr$$ & 3), $addr$jscomp$29_pixel_addr$$ &= -4;
  }
  $plane_select_value$jscomp$125$$ &= this.plane_write_bm;
  $plane_select_value$jscomp$125$$ & 1 && (this.plane0[$addr$jscomp$29_pixel_addr$$] = $plane_dword$$ >> 0 & 255);
  $plane_select_value$jscomp$125$$ & 2 && (this.plane1[$addr$jscomp$29_pixel_addr$$] = $plane_dword$$ >> 8 & 255);
  $plane_select_value$jscomp$125$$ & 4 && (this.plane2[$addr$jscomp$29_pixel_addr$$] = $plane_dword$$ >> 16 & 255);
  $plane_select_value$jscomp$125$$ & 8 && (this.plane3[$addr$jscomp$29_pixel_addr$$] = $plane_dword$$ >> 24 & 255);
  $addr$jscomp$29_pixel_addr$$ = this.vga_addr_to_pixel($addr$jscomp$29_pixel_addr$$);
  this.partial_replot($addr$jscomp$29_pixel_addr$$, $addr$jscomp$29_pixel_addr$$ + 7);
};
$VGAScreen$$.prototype.apply_feed = function($data_byte$jscomp$8$$) {
  return $data_byte$jscomp$8$$ | $data_byte$jscomp$8$$ << 8 | $data_byte$jscomp$8$$ << 16 | $data_byte$jscomp$8$$ << 24;
};
$VGAScreen$$.prototype.apply_expand = function($data_byte$jscomp$9$$) {
  return ($data_byte$jscomp$9$$ & 1 ? 255 : 0) | ($data_byte$jscomp$9$$ & 2 ? 255 : 0) << 8 | ($data_byte$jscomp$9$$ & 4 ? 255 : 0) << 16 | ($data_byte$jscomp$9$$ & 8 ? 255 : 0) << 24;
};
$VGAScreen$$.prototype.apply_rotate = function($data_byte$jscomp$10$$) {
  return ($data_byte$jscomp$10$$ | $data_byte$jscomp$10$$ << 8) >>> (this.planar_rotate_reg & 7) & 255;
};
$VGAScreen$$.prototype.apply_setreset = function($data_dword$$, $enable_dword$$) {
  var $setreset_dword$jscomp$1$$ = this.apply_expand(this.planar_setreset);
  return ($data_dword$$ | $enable_dword$$ & $setreset_dword$jscomp$1$$) & (~$enable_dword$$ | $setreset_dword$jscomp$1$$);
};
$VGAScreen$$.prototype.apply_logical = function($data_dword$jscomp$1$$, $latch_dword$$) {
  switch(this.planar_rotate_reg & 24) {
    case 8:
      return $data_dword$jscomp$1$$ & $latch_dword$$;
    case 16:
      return $data_dword$jscomp$1$$ | $latch_dword$$;
    case 24:
      return $data_dword$jscomp$1$$ ^ $latch_dword$$;
  }
  return $data_dword$jscomp$1$$;
};
$VGAScreen$$.prototype.apply_bitmask = function($data_dword$jscomp$2$$, $bitmask_dword$$) {
  return $bitmask_dword$$ & $data_dword$jscomp$2$$ | ~$bitmask_dword$$ & this.latch_dword;
};
$VGAScreen$$.prototype.text_mode_redraw = function() {
  if (!this.graphical_text) {
    var $split_screen_row$jscomp$1$$ = this.scan_line_to_screen_row(this.line_compare), $row_offset$jscomp$1$$ = Math.max(0, 2 * (2 * this.offset_register - this.max_cols)), $blink_flag$$ = this.attribute_mode & 8, $bg_color_mask$$ = $blink_flag$$ ? 7 : 15, $addr$jscomp$30$$ = this.start_address << 1;
    for (let $row$jscomp$4$$ = 0; $row$jscomp$4$$ < this.max_rows; $row$jscomp$4$$++) {
      $row$jscomp$4$$ === $split_screen_row$jscomp$1$$ && ($addr$jscomp$30$$ = 0);
      for (let $col$jscomp$3$$ = 0; $col$jscomp$3$$ < this.max_cols; $col$jscomp$3$$++) {
        const $chr$jscomp$2$$ = this.vga_memory[$addr$jscomp$30$$], $color$jscomp$2$$ = this.vga_memory[$addr$jscomp$30$$ | 1], $blinking$jscomp$2$$ = $blink_flag$$ && $color$jscomp$2$$ & 128;
        this.bus.send("screen-put-char", [$row$jscomp$4$$, $col$jscomp$3$$, $chr$jscomp$2$$]);
        this.screen.put_char($row$jscomp$4$$, $col$jscomp$3$$, $chr$jscomp$2$$, $blinking$jscomp$2$$, this.vga256_palette[this.dac_mask & this.dac_map[$color$jscomp$2$$ >> 4 & $bg_color_mask$$]], this.vga256_palette[this.dac_mask & this.dac_map[$color$jscomp$2$$ & 15]]);
        $addr$jscomp$30$$ += 2;
      }
      $addr$jscomp$30$$ += $row_offset$jscomp$1$$;
    }
  }
};
$VGAScreen$$.prototype.vga_memory_write_text_mode = function($addr$jscomp$31_blinking$jscomp$3$$, $chr$jscomp$3_value$jscomp$126$$) {
  this.vga_memory[$addr$jscomp$31_blinking$jscomp$3$$] = $chr$jscomp$3_value$jscomp$126$$;
  var $col$jscomp$4_max_cols$$ = Math.max(this.max_cols, 2 * this.offset_register);
  let $row$jscomp$5$$;
  if ($addr$jscomp$31_blinking$jscomp$3$$ >> 1 >= this.start_address) {
    var $color$jscomp$3_memory_start_memory_start$jscomp$1$$ = ($addr$jscomp$31_blinking$jscomp$3$$ >> 1) - this.start_address;
    $row$jscomp$5$$ = $color$jscomp$3_memory_start_memory_start$jscomp$1$$ / $col$jscomp$4_max_cols$$ | 0;
    $col$jscomp$4_max_cols$$ = $color$jscomp$3_memory_start_memory_start$jscomp$1$$ % $col$jscomp$4_max_cols$$;
  } else {
    $color$jscomp$3_memory_start_memory_start$jscomp$1$$ = $addr$jscomp$31_blinking$jscomp$3$$ >> 1, $row$jscomp$5$$ = ($color$jscomp$3_memory_start_memory_start$jscomp$1$$ / $col$jscomp$4_max_cols$$ | 0) + this.scan_line_to_screen_row(this.line_compare), $col$jscomp$4_max_cols$$ = $color$jscomp$3_memory_start_memory_start$jscomp$1$$ % $col$jscomp$4_max_cols$$;
  }
  $dbg_assert$$(0 <= $row$jscomp$5$$ && 0 <= $col$jscomp$4_max_cols$$);
  if (!($col$jscomp$4_max_cols$$ >= this.max_cols || $row$jscomp$5$$ >= this.max_rows)) {
    $addr$jscomp$31_blinking$jscomp$3$$ & 1 ? ($color$jscomp$3_memory_start_memory_start$jscomp$1$$ = $chr$jscomp$3_value$jscomp$126$$, $chr$jscomp$3_value$jscomp$126$$ = this.vga_memory[$addr$jscomp$31_blinking$jscomp$3$$ & -2]) : $color$jscomp$3_memory_start_memory_start$jscomp$1$$ = this.vga_memory[$addr$jscomp$31_blinking$jscomp$3$$ | 1];
    var $bg_color_mask$jscomp$1_blink_flag$jscomp$1$$ = this.attribute_mode & 8;
    $addr$jscomp$31_blinking$jscomp$3$$ = $bg_color_mask$jscomp$1_blink_flag$jscomp$1$$ && $color$jscomp$3_memory_start_memory_start$jscomp$1$$ & 128;
    $bg_color_mask$jscomp$1_blink_flag$jscomp$1$$ = $bg_color_mask$jscomp$1_blink_flag$jscomp$1$$ ? 7 : 15;
    this.bus.send("screen-put-char", [$row$jscomp$5$$, $col$jscomp$4_max_cols$$, $chr$jscomp$3_value$jscomp$126$$]);
    this.graphical_text ? this.graphical_text.invalidate_row($row$jscomp$5$$) : this.screen.put_char($row$jscomp$5$$, $col$jscomp$4_max_cols$$, $chr$jscomp$3_value$jscomp$126$$, $addr$jscomp$31_blinking$jscomp$3$$, this.vga256_palette[this.dac_mask & this.dac_map[$color$jscomp$3_memory_start_memory_start$jscomp$1$$ >> 4 & $bg_color_mask$jscomp$1_blink_flag$jscomp$1$$]], this.vga256_palette[this.dac_mask & this.dac_map[$color$jscomp$3_memory_start_memory_start$jscomp$1$$ & 15]]);
  }
};
$VGAScreen$$.prototype.update_cursor = function() {
  var $col$jscomp$5_max_cols$jscomp$1$$ = Math.max(this.max_cols, 2 * this.offset_register);
  let $row$jscomp$6$$;
  this.cursor_address >= this.start_address ? ($row$jscomp$6$$ = (this.cursor_address - this.start_address) / $col$jscomp$5_max_cols$jscomp$1$$ | 0, $col$jscomp$5_max_cols$jscomp$1$$ = (this.cursor_address - this.start_address) % $col$jscomp$5_max_cols$jscomp$1$$) : ($row$jscomp$6$$ = (this.cursor_address / $col$jscomp$5_max_cols$jscomp$1$$ | 0) + this.scan_line_to_screen_row(this.line_compare), $col$jscomp$5_max_cols$jscomp$1$$ = this.cursor_address % $col$jscomp$5_max_cols$jscomp$1$$);
  $dbg_assert$$(0 <= $row$jscomp$6$$ && 0 <= $col$jscomp$5_max_cols$jscomp$1$$);
  this.graphical_text ? this.graphical_text.set_cursor_pos($row$jscomp$6$$, $col$jscomp$5_max_cols$jscomp$1$$) : this.screen.update_cursor($row$jscomp$6$$, $col$jscomp$5_max_cols$jscomp$1$$);
};
$VGAScreen$$.prototype.complete_redraw = function() {
  $dbg_log$$("complete redraw", 256);
  this.graphical_mode ? this.svga_enabled ? this.cpu.svga_mark_dirty() : (this.diff_addr_min = 0, this.diff_addr_max = 524288) : this.text_mode_redraw();
};
$VGAScreen$$.prototype.complete_replot = function() {
  $dbg_log$$("complete replot", 256);
  this.graphical_mode && !this.svga_enabled && (this.diff_plot_min = 0, this.diff_plot_max = 524288, this.complete_redraw());
};
$VGAScreen$$.prototype.partial_redraw = function($min$$, $max$$) {
  $min$$ < this.diff_addr_min && (this.diff_addr_min = $min$$);
  $max$$ > this.diff_addr_max && (this.diff_addr_max = $max$$);
};
$VGAScreen$$.prototype.partial_replot = function($min$jscomp$1$$, $max$jscomp$1$$) {
  $min$jscomp$1$$ < this.diff_plot_min && (this.diff_plot_min = $min$jscomp$1$$);
  $max$jscomp$1$$ > this.diff_plot_max && (this.diff_plot_max = $max$jscomp$1$$);
  this.partial_redraw($min$jscomp$1$$, $max$jscomp$1$$);
};
$VGAScreen$$.prototype.reset_diffs = function() {
  this.diff_addr_min = this.vga_memory_size;
  this.diff_addr_max = 0;
  this.diff_plot_min = this.vga_memory_size;
  this.diff_plot_max = 0;
};
$VGAScreen$$.prototype.destroy = function() {
};
$VGAScreen$$.prototype.vga_bytes_per_line = function() {
  var $bytes_per_line$$ = this.offset_register << 2;
  this.underline_location_register & 64 ? $bytes_per_line$$ <<= 1 : this.crtc_mode & 64 && ($bytes_per_line$$ >>>= 1);
  return $bytes_per_line$$;
};
$VGAScreen$$.prototype.vga_addr_shift_count = function() {
  var $shift_count$$ = 128 + (~this.underline_location_register & this.crtc_mode & 64);
  $shift_count$$ -= this.underline_location_register & 64;
  $shift_count$$ -= this.attribute_mode & 64;
  return $shift_count$$ >>> 6;
};
$VGAScreen$$.prototype.vga_addr_to_pixel = function($addr$jscomp$32$$) {
  var $shift_count$jscomp$1$$ = this.vga_addr_shift_count();
  if (~this.crtc_mode & 3) {
    var $col$jscomp$6_pixel_addr$jscomp$1$$ = $addr$jscomp$32$$ - this.start_address;
    $col$jscomp$6_pixel_addr$jscomp$1$$ &= this.crtc_mode << 13 | -24577;
    $col$jscomp$6_pixel_addr$jscomp$1$$ <<= $shift_count$jscomp$1$$;
    var $row$jscomp$7$$ = $col$jscomp$6_pixel_addr$jscomp$1$$ / this.virtual_width | 0;
    $col$jscomp$6_pixel_addr$jscomp$1$$ %= this.virtual_width;
    switch(this.crtc_mode & 3) {
      case 2:
        $row$jscomp$7$$ = $row$jscomp$7$$ << 1 | $addr$jscomp$32$$ >> 13 & 1;
        break;
      case 1:
        $row$jscomp$7$$ = $row$jscomp$7$$ << 1 | $addr$jscomp$32$$ >> 14 & 1;
        break;
      case 0:
        $row$jscomp$7$$ = $row$jscomp$7$$ << 2 | $addr$jscomp$32$$ >> 13 & 3;
    }
    return $row$jscomp$7$$ * this.virtual_width + $col$jscomp$6_pixel_addr$jscomp$1$$ + (this.start_address << $shift_count$jscomp$1$$);
  }
  return $addr$jscomp$32$$ << $shift_count$jscomp$1$$;
};
$VGAScreen$$.prototype.scan_line_to_screen_row = function($scan_line$$) {
  this.max_scan_line & 128 && ($scan_line$$ >>>= 1);
  $scan_line$$ = Math.ceil($scan_line$$ / (1 + (this.max_scan_line & 31)));
  this.crtc_mode & 1 || ($scan_line$$ <<= 1);
  this.crtc_mode & 2 || ($scan_line$$ <<= 1);
  return $scan_line$$;
};
$VGAScreen$$.prototype.set_size_text = function($cols_count$$, $rows_count$$) {
  $dbg_assert$$(!this.graphical_mode);
  this.max_cols = $cols_count$$;
  this.max_rows = $rows_count$$;
  this.bus.send("screen-set-size", [$cols_count$$, $rows_count$$, 0]);
  this.graphical_text ? this.graphical_text.set_size($rows_count$$, $cols_count$$) : this.screen.set_size_text($cols_count$$, $rows_count$$);
};
$VGAScreen$$.prototype.set_size_graphical = function($width$jscomp$29$$, $height$jscomp$26$$, $virtual_width$$, $virtual_height$$, $bpp$$) {
  $dbg_assert$$(this.graphical_mode);
  $virtual_width$$ = Math.max($virtual_width$$, 1);
  $virtual_height$$ = Math.max($virtual_height$$, 1);
  if (this.screen_width !== $width$jscomp$29$$ || this.screen_height !== $height$jscomp$26$$ || this.virtual_width !== $virtual_width$$ || this.virtual_height !== $virtual_height$$) {
    this.screen_width = $width$jscomp$29$$;
    this.screen_height = $height$jscomp$26$$;
    this.virtual_width = $virtual_width$$;
    this.virtual_height = $virtual_height$$;
    if ("undefined" !== typeof ImageData) {
      const $size$jscomp$32$$ = $virtual_width$$ * $virtual_height$$, $offset$jscomp$42$$ = this.cpu.svga_allocate_dest_buffer($size$jscomp$32$$) >>> 0;
      this.dest_buffet_offset = $offset$jscomp$42$$;
      this.image_data = new ImageData(new Uint8ClampedArray(this.cpu.wasm_memory.buffer, $offset$jscomp$42$$, 4 * $size$jscomp$32$$), $virtual_width$$, $virtual_height$$);
      this.cpu.svga_mark_dirty();
    }
    this.screen.set_size_graphical($width$jscomp$29$$, $height$jscomp$26$$, $virtual_width$$, $virtual_height$$);
    this.bus.send("screen-set-size", [$width$jscomp$29$$, $height$jscomp$26$$, $bpp$$]);
  }
};
$VGAScreen$$.prototype.update_vga_size = function() {
  if (!this.svga_enabled) {
    var $horizontal_characters_screen_width$$ = Math.min(1 + this.horizontal_display_enable_end, this.horizontal_blank_start), $screen_height_vertical_scans$$ = Math.min(1 + this.vertical_display_enable_end, this.vertical_blank_start);
    if ($horizontal_characters_screen_width$$ && $screen_height_vertical_scans$$) {
      if (this.graphical_mode) {
        $horizontal_characters_screen_width$$ <<= 3;
        var $height$jscomp$27_virtual_width$jscomp$1$$ = this.offset_register << 4;
        this.attribute_mode & 64 && ($horizontal_characters_screen_width$$ >>>= 1, $height$jscomp$27_virtual_width$jscomp$1$$ >>>= 1);
        $screen_height_vertical_scans$$ = this.scan_line_to_screen_row($screen_height_vertical_scans$$);
        var $available_bytes$$ = $VGA_HOST_MEMORY_SPACE_SIZE$$[0];
        const $bytes_per_line$jscomp$1$$ = this.vga_bytes_per_line();
        this.set_size_graphical($horizontal_characters_screen_width$$, $screen_height_vertical_scans$$, $height$jscomp$27_virtual_width$jscomp$1$$, $bytes_per_line$jscomp$1$$ ? Math.ceil($available_bytes$$ / $bytes_per_line$jscomp$1$$) : $screen_height_vertical_scans$$, 8);
        this.update_vertical_retrace();
        this.update_layers();
      } else {
        this.max_scan_line & 128 && ($screen_height_vertical_scans$$ >>>= 1), $height$jscomp$27_virtual_width$jscomp$1$$ = $screen_height_vertical_scans$$ / (1 + (this.max_scan_line & 31)) | 0, $horizontal_characters_screen_width$$ && $height$jscomp$27_virtual_width$jscomp$1$$ && this.set_size_text($horizontal_characters_screen_width$$, $height$jscomp$27_virtual_width$jscomp$1$$);
      }
    }
  }
};
$VGAScreen$$.prototype.update_layers = function() {
  this.graphical_mode || this.text_mode_redraw();
  if (this.svga_enabled) {
    this.layers = [];
  } else {
    if (this.virtual_width && this.screen_width) {
      if (!this.palette_source || this.clocking_mode & 32) {
        this.layers = [], this.screen.clear_screen();
      } else {
        var $start_addr_start_buffer_row_start_split_col$$ = this.start_address_latched, $pixel_panning$$ = this.horizontal_panning;
        this.attribute_mode & 64 && ($pixel_panning$$ >>>= 1);
        var $byte_panning$$ = this.preset_row_scan >> 5 & 3, $pixel_addr_start_split_screen_row$jscomp$2$$ = this.vga_addr_to_pixel($start_addr_start_buffer_row_start_split_col$$ + $byte_panning$$);
        $start_addr_start_buffer_row_start_split_col$$ = $pixel_addr_start_split_screen_row$jscomp$2$$ / this.virtual_width | 0;
        var $start_buffer_col_x$jscomp$98$$ = $pixel_addr_start_split_screen_row$jscomp$2$$ % this.virtual_width + $pixel_panning$$;
        $pixel_addr_start_split_screen_row$jscomp$2$$ = this.scan_line_to_screen_row(1 + this.line_compare);
        $pixel_addr_start_split_screen_row$jscomp$2$$ = Math.min($pixel_addr_start_split_screen_row$jscomp$2$$, this.screen_height);
        var $split_buffer_height$$ = this.screen_height - $pixel_addr_start_split_screen_row$jscomp$2$$;
        this.layers = [];
        $start_buffer_col_x$jscomp$98$$ = -$start_buffer_col_x$jscomp$98$$;
        for (var $y$jscomp$76$$ = 0; $start_buffer_col_x$jscomp$98$$ < this.screen_width; $start_buffer_col_x$jscomp$98$$ += this.virtual_width, $y$jscomp$76$$++) {
          this.layers.push({image_data:this.image_data, screen_x:$start_buffer_col_x$jscomp$98$$, screen_y:0, buffer_x:0, buffer_y:$start_addr_start_buffer_row_start_split_col$$ + $y$jscomp$76$$, buffer_width:this.virtual_width, buffer_height:$pixel_addr_start_split_screen_row$jscomp$2$$, });
        }
        $start_addr_start_buffer_row_start_split_col$$ = 0;
        this.attribute_mode & 32 || ($start_addr_start_buffer_row_start_split_col$$ = this.vga_addr_to_pixel($byte_panning$$) + $pixel_panning$$);
        $start_buffer_col_x$jscomp$98$$ = -$start_addr_start_buffer_row_start_split_col$$;
        for ($y$jscomp$76$$ = 0; $start_buffer_col_x$jscomp$98$$ < this.screen_width; $start_buffer_col_x$jscomp$98$$ += this.virtual_width, $y$jscomp$76$$++) {
          this.layers.push({image_data:this.image_data, screen_x:$start_buffer_col_x$jscomp$98$$, screen_y:$pixel_addr_start_split_screen_row$jscomp$2$$, buffer_x:0, buffer_y:$y$jscomp$76$$, buffer_width:this.virtual_width, buffer_height:$split_buffer_height$$, });
        }
      }
    }
  }
};
$VGAScreen$$.prototype.update_vertical_retrace = function() {
  this.port_3DA_value |= 8;
  this.start_address_latched !== this.start_address && (this.start_address_latched = this.start_address, this.update_layers());
};
$VGAScreen$$.prototype.update_cursor_scanline = function() {
  var $end$jscomp$16_max$jscomp$2$$ = this.max_scan_line & 31;
  const $start$jscomp$32$$ = Math.min($end$jscomp$16_max$jscomp$2$$, this.cursor_scanline_start & 31);
  $end$jscomp$16_max$jscomp$2$$ = Math.min($end$jscomp$16_max$jscomp$2$$, this.cursor_scanline_end & 31);
  const $visible$jscomp$1$$ = !(this.cursor_scanline_start & 32) && $start$jscomp$32$$ < $end$jscomp$16_max$jscomp$2$$;
  this.graphical_text ? this.graphical_text.set_cursor_attr($start$jscomp$32$$, $end$jscomp$16_max$jscomp$2$$, $visible$jscomp$1$$) : this.screen.update_cursor_scanline($start$jscomp$32$$, $end$jscomp$16_max$jscomp$2$$, $visible$jscomp$1$$);
};
$VGAScreen$$.prototype.port3C0_write = function($value$jscomp$127$$) {
  if (-1 === this.attribute_controller_index) {
    $dbg_log$$("attribute controller index register: " + $h$$($value$jscomp$127$$), 256), this.attribute_controller_index = $value$jscomp$127$$ & 31, $dbg_log$$("attribute actual index: " + $h$$(this.attribute_controller_index), 256), this.palette_source !== ($value$jscomp$127$$ & 32) && (this.palette_source = $value$jscomp$127$$ & 32, this.update_layers());
  } else {
    if (16 > this.attribute_controller_index) {
      $dbg_log$$("internal palette: " + $h$$(this.attribute_controller_index) + " -> " + $h$$($value$jscomp$127$$), 256), this.dac_map[this.attribute_controller_index] = $value$jscomp$127$$, this.attribute_mode & 64 || this.complete_redraw();
    } else {
      switch(this.attribute_controller_index) {
        case 16:
          $dbg_log$$("3C0 / attribute mode control: " + $h$$($value$jscomp$127$$), 256);
          if (this.attribute_mode !== $value$jscomp$127$$) {
            var $previous_mode$$ = this.attribute_mode;
            this.attribute_mode = $value$jscomp$127$$;
            const $is_graphical$jscomp$1$$ = 0 !== ($value$jscomp$127$$ & 1);
            this.svga_enabled || this.graphical_mode === $is_graphical$jscomp$1$$ || (this.graphical_mode = $is_graphical$jscomp$1$$, this.screen.set_mode(this.graphical_mode || !!this.graphical_text));
            ($previous_mode$$ ^ $value$jscomp$127$$) & 64 && this.complete_replot();
            this.update_vga_size();
            this.complete_redraw();
          }
          break;
        case 18:
          $dbg_log$$("3C0 / color plane enable: " + $h$$($value$jscomp$127$$), 256);
          this.color_plane_enable !== $value$jscomp$127$$ && (this.color_plane_enable = $value$jscomp$127$$, this.complete_redraw());
          break;
        case 19:
          $dbg_log$$("3C0 / horizontal panning: " + $h$$($value$jscomp$127$$), 256);
          this.horizontal_panning !== $value$jscomp$127$$ && (this.horizontal_panning = $value$jscomp$127$$ & 15, this.update_layers());
          break;
        case 20:
          $dbg_log$$("3C0 / color select: " + $h$$($value$jscomp$127$$), 256);
          this.color_select !== $value$jscomp$127$$ && (this.color_select = $value$jscomp$127$$, this.complete_redraw());
          break;
        default:
          $dbg_log$$("3C0 / attribute controller write " + $h$$(this.attribute_controller_index) + ": " + $h$$($value$jscomp$127$$), 256);
      }
    }
    this.attribute_controller_index = -1;
  }
};
$VGAScreen$$.prototype.port3C0_read = function() {
  $dbg_log$$("3C0 read", 256);
  return (this.attribute_controller_index | this.palette_source) & 255;
};
$VGAScreen$$.prototype.port3C0_read16 = function() {
  $dbg_log$$("3C0 read16", 256);
  return this.port3C0_read() | this.port3C1_read() << 8 & 65280;
};
$VGAScreen$$.prototype.port3C1_read = function() {
  if (16 > this.attribute_controller_index) {
    return $dbg_log$$("3C1 / internal palette read: " + $h$$(this.attribute_controller_index) + " -> " + $h$$(this.dac_map[this.attribute_controller_index]), 256), this.dac_map[this.attribute_controller_index] & 255;
  }
  switch(this.attribute_controller_index) {
    case 16:
      return $dbg_log$$("3C1 / attribute mode read: " + $h$$(this.attribute_mode), 256), this.attribute_mode;
    case 18:
      return $dbg_log$$("3C1 / color plane enable read: " + $h$$(this.color_plane_enable), 256), this.color_plane_enable;
    case 19:
      return $dbg_log$$("3C1 / horizontal panning read: " + $h$$(this.horizontal_panning), 256), this.horizontal_panning;
    case 20:
      return $dbg_log$$("3C1 / color select read: " + $h$$(this.color_select), 256), this.color_select;
    default:
      $dbg_log$$("3C1 / attribute controller read " + $h$$(this.attribute_controller_index), 256);
  }
  return 255;
};
$VGAScreen$$.prototype.port3C2_write = function($value$jscomp$128$$) {
  $dbg_log$$("3C2 / miscellaneous output register = " + $h$$($value$jscomp$128$$), 256);
  this.miscellaneous_output_register = $value$jscomp$128$$;
};
$VGAScreen$$.prototype.port3C4_write = function($value$jscomp$129$$) {
  this.sequencer_index = $value$jscomp$129$$;
};
$VGAScreen$$.prototype.port3C4_read = function() {
  return this.sequencer_index;
};
$VGAScreen$$.prototype.port3C5_write = function($value$jscomp$130$$) {
  switch(this.sequencer_index) {
    case 1:
      $dbg_log$$("clocking mode: " + $h$$($value$jscomp$130$$), 256);
      var $previous_character_map_select_previous_clocking_mode_previous_plane_write_bm$$ = this.clocking_mode;
      this.clocking_mode = $value$jscomp$130$$;
      ($previous_character_map_select_previous_clocking_mode_previous_plane_write_bm$$ ^ $value$jscomp$130$$) & 32 && this.update_layers();
      break;
    case 2:
      $dbg_log$$("plane write mask: " + $h$$($value$jscomp$130$$), 256);
      $previous_character_map_select_previous_clocking_mode_previous_plane_write_bm$$ = this.plane_write_bm;
      this.plane_write_bm = $value$jscomp$130$$;
      this.graphical_text && 15 !== $previous_character_map_select_previous_clocking_mode_previous_plane_write_bm$$ && $previous_character_map_select_previous_clocking_mode_previous_plane_write_bm$$ & 4 && !(this.plane_write_bm & 4) && this.graphical_text.invalidate_font_shape();
      break;
    case 3:
      $dbg_log$$("character map select: " + $h$$($value$jscomp$130$$), 256);
      $previous_character_map_select_previous_clocking_mode_previous_plane_write_bm$$ = this.character_map_select;
      this.character_map_select = $value$jscomp$130$$;
      this.graphical_text && $previous_character_map_select_previous_clocking_mode_previous_plane_write_bm$$ !== this.character_map_select && this.graphical_text.set_character_map(this.character_map_select);
      break;
    case 4:
      $dbg_log$$("sequencer memory mode: " + $h$$($value$jscomp$130$$), 256);
      this.sequencer_memory_mode = $value$jscomp$130$$;
      break;
    default:
      $dbg_log$$("3C5 / sequencer write " + $h$$(this.sequencer_index) + ": " + $h$$($value$jscomp$130$$), 256);
  }
};
$VGAScreen$$.prototype.port3C5_read = function() {
  $dbg_log$$("3C5 / sequencer read " + $h$$(this.sequencer_index), 256);
  switch(this.sequencer_index) {
    case 1:
      return this.clocking_mode;
    case 2:
      return this.plane_write_bm;
    case 3:
      return this.character_map_select;
    case 4:
      return this.sequencer_memory_mode;
    case 6:
      return 18;
  }
  return 0;
};
$VGAScreen$$.prototype.port3C6_write = function($data$jscomp$120$$) {
  this.dac_mask = $data$jscomp$120$$;
};
$VGAScreen$$.prototype.port3C6_read = function() {
  return this.dac_mask;
};
$VGAScreen$$.prototype.port3C7_write = function($index$jscomp$80$$) {
  $dbg_log$$("3C7 write: " + $h$$($index$jscomp$80$$), 256);
  this.dac_color_index_read = 3 * $index$jscomp$80$$;
  this.dac_state &= 0;
};
$VGAScreen$$.prototype.port3C7_read = function() {
  return this.dac_state;
};
$VGAScreen$$.prototype.port3C8_write = function($index$jscomp$81$$) {
  this.dac_color_index_write = 3 * $index$jscomp$81$$;
  this.dac_state |= 3;
};
$VGAScreen$$.prototype.port3C8_read = function() {
  return this.dac_color_index_write / 3 & 255;
};
$VGAScreen$$.prototype.port3C9_write = function($color_byte$$) {
  var $index$jscomp$82$$ = this.dac_color_index_write / 3 | 0, $offset$jscomp$43$$ = this.dac_color_index_write % 3, $color$jscomp$4$$ = this.vga256_palette[$index$jscomp$82$$];
  if (0 === (this.dispi_enable_value & 32)) {
    $color_byte$$ &= 63;
    const $b$jscomp$3$$ = $color_byte$$ & 1;
    $color_byte$$ = $color_byte$$ << 2 | $b$jscomp$3$$ << 1 | $b$jscomp$3$$;
  }
  0 === $offset$jscomp$43$$ ? $color$jscomp$4$$ = $color$jscomp$4$$ & -16711681 | $color_byte$$ << 16 : 1 === $offset$jscomp$43$$ ? $color$jscomp$4$$ = $color$jscomp$4$$ & -65281 | $color_byte$$ << 8 : ($color$jscomp$4$$ = $color$jscomp$4$$ & -256 | $color_byte$$, $dbg_log$$("dac set color, index=" + $h$$($index$jscomp$82$$) + " value=" + $h$$($color$jscomp$4$$), 256));
  this.vga256_palette[$index$jscomp$82$$] !== $color$jscomp$4$$ && (this.vga256_palette[$index$jscomp$82$$] = $color$jscomp$4$$, this.complete_redraw());
  this.dac_color_index_write++;
};
$VGAScreen$$.prototype.port3C9_read = function() {
  $dbg_log$$("3C9 read", 256);
  var $color8$$ = this.vga256_palette[this.dac_color_index_read / 3 | 0] >> 8 * (2 - this.dac_color_index_read % 3) & 255;
  this.dac_color_index_read++;
  return this.dispi_enable_value & 32 ? $color8$$ : $color8$$ >> 2;
};
$VGAScreen$$.prototype.port3CC_read = function() {
  $dbg_log$$("3CC read", 256);
  return this.miscellaneous_output_register;
};
$VGAScreen$$.prototype.port3CE_write = function($value$jscomp$131$$) {
  this.graphics_index = $value$jscomp$131$$;
};
$VGAScreen$$.prototype.port3CE_read = function() {
  return this.graphics_index;
};
$VGAScreen$$.prototype.port3CF_write = function($value$jscomp$132$$) {
  switch(this.graphics_index) {
    case 0:
      this.planar_setreset = $value$jscomp$132$$;
      $dbg_log$$("plane set/reset: " + $h$$($value$jscomp$132$$), 256);
      break;
    case 1:
      this.planar_setreset_enable = $value$jscomp$132$$;
      $dbg_log$$("plane set/reset enable: " + $h$$($value$jscomp$132$$), 256);
      break;
    case 2:
      this.color_compare = $value$jscomp$132$$;
      $dbg_log$$("color compare: " + $h$$($value$jscomp$132$$), 256);
      break;
    case 3:
      this.planar_rotate_reg = $value$jscomp$132$$;
      $dbg_log$$("plane rotate: " + $h$$($value$jscomp$132$$), 256);
      break;
    case 4:
      this.plane_read = $value$jscomp$132$$;
      $dbg_log$$("plane read: " + $h$$($value$jscomp$132$$), 256);
      break;
    case 5:
      var $previous_planar_mode$$ = this.planar_mode;
      this.planar_mode = $value$jscomp$132$$;
      $dbg_log$$("planar mode: " + $h$$($value$jscomp$132$$), 256);
      ($previous_planar_mode$$ ^ $value$jscomp$132$$) & 96 && this.complete_replot();
      break;
    case 6:
      $dbg_log$$("miscellaneous graphics register: " + $h$$($value$jscomp$132$$), 256);
      this.miscellaneous_graphics_register !== $value$jscomp$132$$ && (this.miscellaneous_graphics_register = $value$jscomp$132$$, this.update_vga_size());
      break;
    case 7:
      this.color_dont_care = $value$jscomp$132$$;
      $dbg_log$$("color don't care: " + $h$$($value$jscomp$132$$), 256);
      break;
    case 8:
      this.planar_bitmap = $value$jscomp$132$$;
      $dbg_log$$("planar bitmap: " + $h$$($value$jscomp$132$$), 256);
      break;
    default:
      $dbg_log$$("3CF / graphics write " + $h$$(this.graphics_index) + ": " + $h$$($value$jscomp$132$$), 256);
  }
};
$VGAScreen$$.prototype.port3CF_read = function() {
  $dbg_log$$("3CF / graphics read " + $h$$(this.graphics_index), 256);
  switch(this.graphics_index) {
    case 0:
      return this.planar_setreset;
    case 1:
      return this.planar_setreset_enable;
    case 2:
      return this.color_compare;
    case 3:
      return this.planar_rotate_reg;
    case 4:
      return this.plane_read;
    case 5:
      return this.planar_mode;
    case 6:
      return this.miscellaneous_graphics_register;
    case 7:
      return this.color_dont_care;
    case 8:
      return this.planar_bitmap;
  }
  return 0;
};
$VGAScreen$$.prototype.port3D4_write = function($register$$) {
  $dbg_log$$("3D4 / crtc index: " + $register$$, 256);
  this.index_crtc = $register$$;
};
$VGAScreen$$.prototype.port3D4_write16 = function($register$jscomp$1$$) {
  this.port3D4_write($register$jscomp$1$$ & 255);
  this.port3D5_write($register$jscomp$1$$ >> 8 & 255);
};
$VGAScreen$$.prototype.port3D4_read = function() {
  $dbg_log$$("3D4 read / crtc index: " + this.index_crtc, 256);
  return this.index_crtc;
};
$VGAScreen$$.prototype.port3D5_write = function($value$jscomp$133$$) {
  switch(this.index_crtc) {
    case 1:
      $dbg_log$$("3D5 / hdisp enable end write: " + $h$$($value$jscomp$133$$), 256);
      this.horizontal_display_enable_end !== $value$jscomp$133$$ && (this.horizontal_display_enable_end = $value$jscomp$133$$, this.update_vga_size());
      break;
    case 2:
      this.horizontal_blank_start !== $value$jscomp$133$$ && (this.horizontal_blank_start = $value$jscomp$133$$, this.update_vga_size());
      break;
    case 7:
      $dbg_log$$("3D5 / overflow register write: " + $h$$($value$jscomp$133$$), 256);
      var $previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ = this.vertical_display_enable_end;
      this.vertical_display_enable_end &= 255;
      this.vertical_display_enable_end = this.vertical_display_enable_end | $value$jscomp$133$$ << 3 & 512 | $value$jscomp$133$$ << 7 & 256;
      $previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ !== this.vertical_display_enable_end && this.update_vga_size();
      this.line_compare = this.line_compare & 767 | $value$jscomp$133$$ << 4 & 256;
      $previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ = this.vertical_blank_start;
      this.vertical_blank_start = this.vertical_blank_start & 767 | $value$jscomp$133$$ << 5 & 256;
      $previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ !== this.vertical_blank_start && this.update_vga_size();
      this.update_layers();
      break;
    case 8:
      $dbg_log$$("3D5 / preset row scan write: " + $h$$($value$jscomp$133$$), 256);
      this.preset_row_scan = $value$jscomp$133$$;
      this.update_layers();
      break;
    case 9:
      $dbg_log$$("3D5 / max scan line write: " + $h$$($value$jscomp$133$$), 256);
      var $previous_max_scan_line$$ = this.max_scan_line;
      this.max_scan_line = $value$jscomp$133$$;
      this.line_compare = this.line_compare & 511 | $value$jscomp$133$$ << 3 & 512;
      $previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ = this.vertical_blank_start;
      this.vertical_blank_start = this.vertical_blank_start & 511 | $value$jscomp$133$$ << 4 & 512;
      (($previous_max_scan_line$$ ^ this.max_scan_line) & 159 || $previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ !== this.vertical_blank_start) && this.update_vga_size();
      this.update_cursor_scanline();
      this.update_layers();
      break;
    case 10:
      $dbg_log$$("3D5 / cursor scanline start write: " + $h$$($value$jscomp$133$$), 256);
      this.cursor_scanline_start = $value$jscomp$133$$;
      this.update_cursor_scanline();
      break;
    case 11:
      $dbg_log$$("3D5 / cursor scanline end write: " + $h$$($value$jscomp$133$$), 256);
      this.cursor_scanline_end = $value$jscomp$133$$;
      this.update_cursor_scanline();
      break;
    case 12:
      (this.start_address >> 8 & 255) !== $value$jscomp$133$$ && (this.start_address = this.start_address & 255 | $value$jscomp$133$$ << 8, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot());
      $dbg_log$$("3D5 / start addr hi write: " + $h$$($value$jscomp$133$$) + " -> " + $h$$(this.start_address, 4), 256);
      break;
    case 13:
      (this.start_address & 255) !== $value$jscomp$133$$ && (this.start_address = this.start_address & 65280 | $value$jscomp$133$$, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot());
      $dbg_log$$("3D5 / start addr lo write: " + $h$$($value$jscomp$133$$) + " -> " + $h$$(this.start_address, 4), 256);
      break;
    case 14:
      $dbg_log$$("3D5 / cursor address hi write: " + $h$$($value$jscomp$133$$), 256);
      this.cursor_address = this.cursor_address & 255 | $value$jscomp$133$$ << 8;
      this.update_cursor();
      break;
    case 15:
      $dbg_log$$("3D5 / cursor address lo write: " + $h$$($value$jscomp$133$$), 256);
      this.cursor_address = this.cursor_address & 65280 | $value$jscomp$133$$;
      this.update_cursor();
      break;
    case 18:
      $dbg_log$$("3D5 / vdisp enable end write: " + $h$$($value$jscomp$133$$), 256);
      (this.vertical_display_enable_end & 255) !== $value$jscomp$133$$ && (this.vertical_display_enable_end = this.vertical_display_enable_end & 768 | $value$jscomp$133$$, this.update_vga_size());
      break;
    case 19:
      $dbg_log$$("3D5 / offset register write: " + $h$$($value$jscomp$133$$), 256);
      this.offset_register !== $value$jscomp$133$$ && (this.offset_register = $value$jscomp$133$$, this.update_vga_size(), ~this.crtc_mode & 3 && this.complete_replot());
      break;
    case 20:
      $dbg_log$$("3D5 / underline location write: " + $h$$($value$jscomp$133$$), 256);
      this.underline_location_register !== $value$jscomp$133$$ && ($previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ = this.underline_location_register, this.underline_location_register = $value$jscomp$133$$, this.update_vga_size(), ($previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ ^ $value$jscomp$133$$) & 64 && this.complete_replot());
      break;
    case 21:
      $dbg_log$$("3D5 / vertical blank start write: " + $h$$($value$jscomp$133$$), 256);
      (this.vertical_blank_start & 255) !== $value$jscomp$133$$ && (this.vertical_blank_start = this.vertical_blank_start & 768 | $value$jscomp$133$$, this.update_vga_size());
      break;
    case 23:
      $dbg_log$$("3D5 / crtc mode write: " + $h$$($value$jscomp$133$$), 256);
      this.crtc_mode !== $value$jscomp$133$$ && ($previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ = this.crtc_mode, this.crtc_mode = $value$jscomp$133$$, this.update_vga_size(), ($previous_mode$jscomp$1_previous_underline_previous_vertical_blank_start_previous_vertical_display_enable_end$$ ^ $value$jscomp$133$$) & 67 && this.complete_replot());
      break;
    case 24:
      $dbg_log$$("3D5 / line compare write: " + $h$$($value$jscomp$133$$), 256);
      this.line_compare = this.line_compare & 768 | $value$jscomp$133$$;
      this.update_layers();
      break;
    default:
      this.index_crtc < this.crtc.length && (this.crtc[this.index_crtc] = $value$jscomp$133$$), $dbg_log$$("3D5 / CRTC write " + $h$$(this.index_crtc) + ": " + $h$$($value$jscomp$133$$), 256);
  }
};
$VGAScreen$$.prototype.port3D5_write16 = function($register$jscomp$2$$) {
  $dbg_log$$("16-bit write to 3D5: " + $h$$($register$jscomp$2$$, 4), 256);
  this.port3D5_write($register$jscomp$2$$ & 255);
};
$VGAScreen$$.prototype.port3D5_read = function() {
  $dbg_log$$("3D5 read " + $h$$(this.index_crtc), 256);
  switch(this.index_crtc) {
    case 1:
      return this.horizontal_display_enable_end;
    case 2:
      return this.horizontal_blank_start;
    case 7:
      return this.vertical_display_enable_end >> 7 & 2 | this.vertical_blank_start >> 5 & 8 | this.line_compare >> 4 & 16 | this.vertical_display_enable_end >> 3 & 64;
    case 8:
      return this.preset_row_scan;
    case 9:
      return this.max_scan_line;
    case 10:
      return this.cursor_scanline_start;
    case 11:
      return this.cursor_scanline_end;
    case 12:
      return this.start_address & 255;
    case 13:
      return this.start_address >> 8;
    case 14:
      return this.cursor_address >> 8;
    case 15:
      return this.cursor_address & 255;
    case 18:
      return this.vertical_display_enable_end & 255;
    case 19:
      return this.offset_register;
    case 20:
      return this.underline_location_register;
    case 21:
      return this.vertical_blank_start & 255;
    case 23:
      return this.crtc_mode;
    case 24:
      return this.line_compare & 255;
  }
  return this.index_crtc < this.crtc.length ? this.crtc[this.index_crtc] : 0;
};
$VGAScreen$$.prototype.port3D5_read16 = function() {
  $dbg_log$$("Warning: 16-bit read from 3D5", 256);
  return this.port3D5_read();
};
$VGAScreen$$.prototype.port3DA_read = function() {
  $dbg_log$$("3DA read - status 1 and clear attr index", 256);
  var $value$jscomp$134$$ = this.port_3DA_value;
  this.graphical_mode ? (this.port_3DA_value ^= 1, this.port_3DA_value &= 1) : (this.port_3DA_value & 1 && (this.port_3DA_value ^= 8), this.port_3DA_value ^= 1);
  this.attribute_controller_index = -1;
  return $value$jscomp$134$$;
};
$VGAScreen$$.prototype.port1CE_write = function($value$jscomp$135$$) {
  this.dispi_index = $value$jscomp$135$$;
};
$VGAScreen$$.prototype.port1CF_write = function($value$jscomp$136$$) {
  $dbg_log$$("1CF / dispi write " + $h$$(this.dispi_index) + ": " + $h$$($value$jscomp$136$$), 256);
  const $was_enabled$$ = this.svga_enabled;
  switch(this.dispi_index) {
    case 0:
      45248 <= $value$jscomp$136$$ && 45253 >= $value$jscomp$136$$ ? this.svga_version = $value$jscomp$136$$ : $dbg_log$$("Invalid version value: " + $h$$($value$jscomp$136$$), 256);
      break;
    case 1:
      this.svga_width = $value$jscomp$136$$;
      2560 < this.svga_width && ($dbg_log$$("svga_width reduced from " + this.svga_width + " to 2560", 256), this.svga_width = 2560);
      break;
    case 2:
      this.svga_height = $value$jscomp$136$$;
      1600 < this.svga_height && ($dbg_log$$("svga_height reduced from " + this.svga_height + " to 1600", 256), this.svga_height = 1600);
      break;
    case 3:
      this.svga_bpp = $value$jscomp$136$$;
      break;
    case 4:
      (this.svga_enabled = 1 === ($value$jscomp$136$$ & 1)) && 0 === ($value$jscomp$136$$ & 128) && this.svga_memory.fill(0);
      this.dispi_enable_value = $value$jscomp$136$$;
      break;
    case 5:
      $dbg_log$$("SVGA bank offset: " + $h$$($value$jscomp$136$$ << 16), 256);
      this.svga_bank_offset = $value$jscomp$136$$ << 16;
      break;
    case 8:
      $dbg_log$$("SVGA X offset: " + $h$$($value$jscomp$136$$), 256);
      this.svga_offset_x !== $value$jscomp$136$$ && (this.svga_offset_x = $value$jscomp$136$$, this.svga_offset = this.svga_offset_y * this.svga_width + this.svga_offset_x, this.complete_redraw());
      break;
    case 9:
      $dbg_log$$("SVGA Y offset: " + $h$$($value$jscomp$136$$ * this.svga_width) + " y=" + $h$$($value$jscomp$136$$), 256);
      this.svga_offset_y !== $value$jscomp$136$$ && (this.svga_offset_y = $value$jscomp$136$$, this.svga_offset = this.svga_offset_y * this.svga_width + this.svga_offset_x, this.complete_redraw());
      break;
    default:
      $dbg_log$$("Unimplemented dispi write index: " + $h$$(this.dispi_index), 256);
  }
  !this.svga_enabled || this.svga_width && this.svga_height || ($dbg_log$$("SVGA: disabled because of invalid width/height: " + this.svga_width + "x" + this.svga_height, 256), this.svga_enabled = !1);
  $dbg_assert$$(4 !== this.svga_bpp, "unimplemented svga bpp: 4");
  $dbg_assert$$(4 === this.svga_bpp || 8 === this.svga_bpp || 15 === this.svga_bpp || 16 === this.svga_bpp || 24 === this.svga_bpp || 32 === this.svga_bpp, "unexpected svga bpp: " + this.svga_bpp);
  this.svga_enabled ? $dbg_log$$("SVGA: enabled, " + this.svga_width + "x" + this.svga_height + "x" + this.svga_bpp, 256) : $dbg_log$$("SVGA: disabled");
  this.svga_enabled && !$was_enabled$$ && (this.svga_offset_y = this.svga_offset_x = this.svga_offset = 0, this.graphical_mode = !0, this.screen.set_mode(this.graphical_mode), this.set_size_graphical(this.svga_width, this.svga_height, this.svga_width, this.svga_height, this.svga_bpp));
  this.svga_enabled || (this.svga_bank_offset = 0);
  this.update_layers();
};
$VGAScreen$$.prototype.port1CF_read = function() {
  $dbg_log$$("1CF / dispi read " + $h$$(this.dispi_index), 256);
  return this.svga_register_read(this.dispi_index);
};
$VGAScreen$$.prototype.svga_register_read = function($n$jscomp$7$$) {
  switch($n$jscomp$7$$) {
    case 0:
      return this.svga_version;
    case 1:
      return this.dispi_enable_value & 2 ? 2560 : this.svga_width;
    case 2:
      return this.dispi_enable_value & 2 ? 1600 : this.svga_height;
    case 3:
      return this.dispi_enable_value & 2 ? 32 : this.svga_bpp;
    case 4:
      return this.dispi_enable_value;
    case 5:
      return this.svga_bank_offset >>> 16;
    case 6:
      return this.screen_width ? this.screen_width : 1;
    case 8:
      return this.svga_offset_x;
    case 9:
      return this.svga_offset_y;
    case 10:
      return this.vga_memory_size / 65536 | 0;
    default:
      $dbg_log$$("Unimplemented dispi read index: " + $h$$(this.dispi_index), 256);
  }
  return 255;
};
$VGAScreen$$.prototype.vga_replot = function() {
  for (var $pixel_addr$jscomp$2_start$jscomp$33$$ = this.diff_plot_min & -16, $end$jscomp$17$$ = Math.min(this.diff_plot_max | 15, 524287), $addr_shift$$ = this.vga_addr_shift_count(), $addr_substitution$$ = ~this.crtc_mode & 3, $shift_mode$$ = this.planar_mode & 96, $pel_width$$ = this.attribute_mode & 64; $pixel_addr$jscomp$2_start$jscomp$33$$ <= $end$jscomp$17$$;) {
    var $addr$jscomp$33_shift_loads$$ = $pixel_addr$jscomp$2_start$jscomp$33$$ >>> $addr_shift$$;
    if ($addr_substitution$$) {
      var $byte0_j$jscomp$4_row$jscomp$8$$ = $pixel_addr$jscomp$2_start$jscomp$33$$ / this.virtual_width | 0, $byte1_col$jscomp$7$$ = $pixel_addr$jscomp$2_start$jscomp$33$$ - this.virtual_width * $byte0_j$jscomp$4_row$jscomp$8$$;
      switch($addr_substitution$$) {
        case 1:
          $addr$jscomp$33_shift_loads$$ = ($byte0_j$jscomp$4_row$jscomp$8$$ & 1) << 13;
          $byte0_j$jscomp$4_row$jscomp$8$$ >>>= 1;
          break;
        case 2:
          $addr$jscomp$33_shift_loads$$ = ($byte0_j$jscomp$4_row$jscomp$8$$ & 1) << 14;
          $byte0_j$jscomp$4_row$jscomp$8$$ >>>= 1;
          break;
        case 3:
          $addr$jscomp$33_shift_loads$$ = ($byte0_j$jscomp$4_row$jscomp$8$$ & 3) << 13, $byte0_j$jscomp$4_row$jscomp$8$$ >>>= 2;
      }
      $addr$jscomp$33_shift_loads$$ |= ($byte0_j$jscomp$4_row$jscomp$8$$ * this.virtual_width + $byte1_col$jscomp$7$$ >>> $addr_shift$$) + this.start_address;
    }
    $byte0_j$jscomp$4_row$jscomp$8$$ = this.plane0[$addr$jscomp$33_shift_loads$$];
    $byte1_col$jscomp$7$$ = this.plane1[$addr$jscomp$33_shift_loads$$];
    var $byte2$$ = this.plane2[$addr$jscomp$33_shift_loads$$], $byte3$$ = this.plane3[$addr$jscomp$33_shift_loads$$];
    $addr$jscomp$33_shift_loads$$ = new Uint8Array(8);
    switch($shift_mode$$) {
      case 0:
        $byte0_j$jscomp$4_row$jscomp$8$$ <<= 0;
        $byte1_col$jscomp$7$$ <<= 1;
        $byte2$$ <<= 2;
        $byte3$$ <<= 3;
        for (var $i$jscomp$32$$ = 7; 0 <= $i$jscomp$32$$; $i$jscomp$32$$--) {
          $addr$jscomp$33_shift_loads$$[7 - $i$jscomp$32$$] = $byte0_j$jscomp$4_row$jscomp$8$$ >> $i$jscomp$32$$ & 1 | $byte1_col$jscomp$7$$ >> $i$jscomp$32$$ & 2 | $byte2$$ >> $i$jscomp$32$$ & 4 | $byte3$$ >> $i$jscomp$32$$ & 8;
        }
        break;
      case 32:
        $addr$jscomp$33_shift_loads$$[0] = $byte0_j$jscomp$4_row$jscomp$8$$ >> 6 & 3 | $byte2$$ >> 4 & 12;
        $addr$jscomp$33_shift_loads$$[1] = $byte0_j$jscomp$4_row$jscomp$8$$ >> 4 & 3 | $byte2$$ >> 2 & 12;
        $addr$jscomp$33_shift_loads$$[2] = $byte0_j$jscomp$4_row$jscomp$8$$ >> 2 & 3 | $byte2$$ >> 0 & 12;
        $addr$jscomp$33_shift_loads$$[3] = $byte0_j$jscomp$4_row$jscomp$8$$ >> 0 & 3 | $byte2$$ << 2 & 12;
        $addr$jscomp$33_shift_loads$$[4] = $byte1_col$jscomp$7$$ >> 6 & 3 | $byte3$$ >> 4 & 12;
        $addr$jscomp$33_shift_loads$$[5] = $byte1_col$jscomp$7$$ >> 4 & 3 | $byte3$$ >> 2 & 12;
        $addr$jscomp$33_shift_loads$$[6] = $byte1_col$jscomp$7$$ >> 2 & 3 | $byte3$$ >> 0 & 12;
        $addr$jscomp$33_shift_loads$$[7] = $byte1_col$jscomp$7$$ >> 0 & 3 | $byte3$$ << 2 & 12;
        break;
      case 64:
      case 96:
        $addr$jscomp$33_shift_loads$$[0] = $byte0_j$jscomp$4_row$jscomp$8$$ >> 4 & 15, $addr$jscomp$33_shift_loads$$[1] = $byte0_j$jscomp$4_row$jscomp$8$$ >> 0 & 15, $addr$jscomp$33_shift_loads$$[2] = $byte1_col$jscomp$7$$ >> 4 & 15, $addr$jscomp$33_shift_loads$$[3] = $byte1_col$jscomp$7$$ >> 0 & 15, $addr$jscomp$33_shift_loads$$[4] = $byte2$$ >> 4 & 15, $addr$jscomp$33_shift_loads$$[5] = $byte2$$ >> 0 & 15, $addr$jscomp$33_shift_loads$$[6] = $byte3$$ >> 4 & 15, $addr$jscomp$33_shift_loads$$[7] = 
        $byte3$$ >> 0 & 15;
    }
    if ($pel_width$$) {
      for ($byte0_j$jscomp$4_row$jscomp$8$$ = $i$jscomp$32$$ = 0; 4 > $i$jscomp$32$$; $i$jscomp$32$$++, $pixel_addr$jscomp$2_start$jscomp$33$$++, $byte0_j$jscomp$4_row$jscomp$8$$ += 2) {
        this.pixel_buffer[$pixel_addr$jscomp$2_start$jscomp$33$$] = $addr$jscomp$33_shift_loads$$[$byte0_j$jscomp$4_row$jscomp$8$$] << 4 | $addr$jscomp$33_shift_loads$$[$byte0_j$jscomp$4_row$jscomp$8$$ + 1];
      }
    } else {
      for ($i$jscomp$32$$ = 0; 8 > $i$jscomp$32$$; $i$jscomp$32$$++, $pixel_addr$jscomp$2_start$jscomp$33$$++) {
        this.pixel_buffer[$pixel_addr$jscomp$2_start$jscomp$33$$] = $addr$jscomp$33_shift_loads$$[$i$jscomp$32$$];
      }
    }
  }
};
$VGAScreen$$.prototype.vga_redraw = function() {
  var $pixel_addr$jscomp$3_start$jscomp$34$$ = this.diff_addr_min, $end$jscomp$18$$ = Math.min(this.diff_addr_max, 524287);
  const $buffer$jscomp$30$$ = new Int32Array(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, this.virtual_width * this.virtual_height);
  var $mask$jscomp$7$$ = 255, $colorset$$ = 0;
  this.attribute_mode & 128 && ($mask$jscomp$7$$ &= 207, $colorset$$ |= this.color_select << 4 & 48);
  if (this.attribute_mode & 64) {
    for (; $pixel_addr$jscomp$3_start$jscomp$34$$ <= $end$jscomp$18$$; $pixel_addr$jscomp$3_start$jscomp$34$$++) {
      var $color$jscomp$6_color256$$ = this.pixel_buffer[$pixel_addr$jscomp$3_start$jscomp$34$$] & $mask$jscomp$7$$ | $colorset$$;
      $color$jscomp$6_color256$$ = this.vga256_palette[$color$jscomp$6_color256$$];
      $buffer$jscomp$30$$[$pixel_addr$jscomp$3_start$jscomp$34$$] = $color$jscomp$6_color256$$ & 65280 | $color$jscomp$6_color256$$ << 16 | $color$jscomp$6_color256$$ >> 16 | 4278190080;
    }
  } else {
    for ($mask$jscomp$7$$ &= 63, $colorset$$ |= this.color_select << 4 & 192; $pixel_addr$jscomp$3_start$jscomp$34$$ <= $end$jscomp$18$$; $pixel_addr$jscomp$3_start$jscomp$34$$++) {
      $color$jscomp$6_color256$$ = this.dac_map[this.pixel_buffer[$pixel_addr$jscomp$3_start$jscomp$34$$] & this.color_plane_enable] & $mask$jscomp$7$$ | $colorset$$, $color$jscomp$6_color256$$ = this.vga256_palette[$color$jscomp$6_color256$$], $buffer$jscomp$30$$[$pixel_addr$jscomp$3_start$jscomp$34$$] = $color$jscomp$6_color256$$ & 65280 | $color$jscomp$6_color256$$ << 16 | $color$jscomp$6_color256$$ >> 16 | 4278190080;
    }
  }
};
$VGAScreen$$.prototype.screen_fill_buffer = function() {
  if (this.graphical_mode) {
    if (0 === this.image_data.data.byteLength) {
      var $buffer$jscomp$31_image_data_min_y$$ = new Uint8ClampedArray(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, 4 * this.virtual_width * this.virtual_height);
      this.image_data = new ImageData($buffer$jscomp$31_image_data_min_y$$, this.virtual_width, this.virtual_height);
      this.update_layers();
    }
    if (this.svga_enabled) {
      $buffer$jscomp$31_image_data_min_y$$ = 0;
      let $max_y$$ = this.svga_height;
      if (8 === this.svga_bpp) {
        const $buffer$jscomp$32$$ = new Int32Array(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, this.screen_width * this.screen_height), $svga_memory$$ = new Uint8Array(this.cpu.wasm_memory.buffer, this.svga_memory.byteOffset, this.vga_memory_size);
        for (var $bytes_per_pixel_i$jscomp$33$$ = 0; $bytes_per_pixel_i$jscomp$33$$ < $buffer$jscomp$32$$.length; $bytes_per_pixel_i$jscomp$33$$++) {
          var $color$jscomp$7$$ = this.vga256_palette[$svga_memory$$[$bytes_per_pixel_i$jscomp$33$$]];
          $buffer$jscomp$32$$[$bytes_per_pixel_i$jscomp$33$$] = $color$jscomp$7$$ & 65280 | $color$jscomp$7$$ << 16 | $color$jscomp$7$$ >> 16 | 4278190080;
        }
      } else {
        this.cpu.svga_fill_pixel_buffer(this.svga_bpp, this.svga_offset), $bytes_per_pixel_i$jscomp$33$$ = 15 === this.svga_bpp ? 2 : this.svga_bpp / 8, $buffer$jscomp$31_image_data_min_y$$ = ((this.cpu.svga_dirty_bitmap_min_offset[0] / $bytes_per_pixel_i$jscomp$33$$ | 0) - this.svga_offset) / this.svga_width | 0, $max_y$$ = (((this.cpu.svga_dirty_bitmap_max_offset[0] / $bytes_per_pixel_i$jscomp$33$$ | 0) - this.svga_offset) / this.svga_width | 0) + 1;
      }
      $buffer$jscomp$31_image_data_min_y$$ < $max_y$$ && ($buffer$jscomp$31_image_data_min_y$$ = Math.max($buffer$jscomp$31_image_data_min_y$$, 0), $max_y$$ = Math.min($max_y$$, this.svga_height), this.screen.update_buffer([{image_data:this.image_data, screen_x:0, screen_y:$buffer$jscomp$31_image_data_min_y$$, buffer_x:0, buffer_y:$buffer$jscomp$31_image_data_min_y$$, buffer_width:this.svga_width, buffer_height:$max_y$$ - $buffer$jscomp$31_image_data_min_y$$, }]));
    } else {
      this.vga_replot(), this.vga_redraw(), this.screen.update_buffer(this.layers);
    }
    this.reset_diffs();
    this.update_vertical_retrace();
  } else {
    this.graphical_text && ($buffer$jscomp$31_image_data_min_y$$ = this.graphical_text.render(), this.screen.update_buffer([{image_data:$buffer$jscomp$31_image_data_min_y$$, screen_x:0, screen_y:0, buffer_x:0, buffer_y:0, buffer_width:$buffer$jscomp$31_image_data_min_y$$.width, buffer_height:$buffer$jscomp$31_image_data_min_y$$.height}]));
  }
};
function $GraphicalText$$($vga$$) {
  this.vga = $vga$$;
  this.txt_width = 80;
  this.txt_height = 25;
  this.txt_dirty = 0;
  this.txt_row_dirty = new Uint8Array(this.txt_height);
  this.font_data_dirty = !1;
  this.font_width = 9;
  this.font_height = 16;
  this.font_lge = !1;
  this.font_bitmap = new Uint8ClampedArray(2048 * this.font_width * this.font_height);
  this.font_blink_enabled = !1;
  this.font_index_B = this.font_index_A = 0;
  this.cursor_enabled_latch = this.cursor_attr_dirty = !1;
  this.cursor_bottom_latch = this.cursor_top_latch = 0;
  this.cursor_pos_dirty = !1;
  this.cursor_col_latch = this.cursor_row_latch = 0;
  this.cursor_enabled = !1;
  this.vga_max_scan_line = this.vga_clocking_mode = this.vga_attribute_mode = this.cursor_bottom = this.cursor_top = this.cursor_col = this.cursor_row = 0;
  this.gfx_width = this.txt_width * this.font_width;
  this.gfx_height = this.txt_height * this.font_height;
  this.gfx_data = new Uint8ClampedArray(this.gfx_width * this.gfx_height * 4);
  this.image_data = new ImageData(this.gfx_data, this.gfx_width, this.gfx_height);
  this.blink_visible = !1;
  this.frame_count = 0;
}
$GraphicalText$$.prototype.rebuild_font_bitmap = function($width_9px$$, $copy_bit_width_double$$) {
  const $font_height$$ = this.font_height, $font_lge$$ = this.font_lge, $src_bitmap$$ = this.vga.plane2, $dst_bitmap$$ = new Uint8ClampedArray(2048 * this.font_width * $font_height$$), $vga_inc_chr$$ = 32 - $font_height$$;
  let $i_dst$$ = 0;
  $copy_bit_width_double$$ = $copy_bit_width_double$$ ? function($value$jscomp$137$$) {
    $dst_bitmap$$[$i_dst$$++] = $value$jscomp$137$$;
    $dst_bitmap$$[$i_dst$$++] = $value$jscomp$137$$;
  } : function($value$jscomp$138$$) {
    $dst_bitmap$$[$i_dst$$++] = $value$jscomp$138$$;
  };
  let $i_src$$ = 0;
  for (let $i_font$$ = 0; 8 > $i_font$$; ++$i_font$$) {
    for (let $i_chr$$ = 0; 256 > $i_chr$$; ++$i_chr$$, $i_src$$ += $vga_inc_chr$$) {
      for (let $i_line$$ = 0; $i_line$$ < $font_height$$; ++$i_line$$) {
        const $line_bits$$ = $src_bitmap$$[$i_src$$++];
        for (let $i_bit$$ = 128; 0 < $i_bit$$; $i_bit$$ >>= 1) {
          $copy_bit_width_double$$($line_bits$$ & $i_bit$$ ? 1 : 0);
        }
        $width_9px$$ && $copy_bit_width_double$$($font_lge$$ && 192 <= $i_chr$$ && 223 >= $i_chr$$ && $line_bits$$ & 1 ? 1 : 0);
      }
    }
  }
  return $dst_bitmap$$;
};
$GraphicalText$$.prototype.resize_canvas = function() {
  this.txt_dirty = 1;
  this.txt_row_dirty.fill(1);
};
$GraphicalText$$.prototype.rebuild_image_data = function() {
  const $gfx_size$$ = this.gfx_width * this.gfx_height * 4, $gfx_data$$ = new Uint8ClampedArray($gfx_size$$);
  for (let $i$jscomp$34$$ = 3; $i$jscomp$34$$ < $gfx_size$$; $i$jscomp$34$$ += 4) {
    $gfx_data$$[$i$jscomp$34$$] = 255;
  }
  this.gfx_data = $gfx_data$$;
  this.image_data = new ImageData(this.gfx_data, this.gfx_width, this.gfx_height);
  this.resize_canvas();
};
$GraphicalText$$.prototype.mark_blinking_rows_dirty = function() {
  const $vga_memory$$ = this.vga.vga_memory, $txt_row_dirty$$ = this.txt_row_dirty, $txt_width$$ = this.txt_width, $txt_height$$ = this.txt_height, $txt_row_size$$ = 2 * $txt_width$$, $txt_row_step$$ = Math.max(0, 2 * (2 * this.vga.offset_register - $txt_width$$)), $split_screen_row$jscomp$3$$ = this.vga.scan_line_to_screen_row(this.vga.line_compare);
  let $row$jscomp$9$$, $col$jscomp$8$$, $txt_i$$ = this.vga.start_address << 1;
  for ($row$jscomp$9$$ = 0; $row$jscomp$9$$ < $txt_height$$; ++$row$jscomp$9$$, $txt_i$$ += $txt_row_step$$) {
    if ($row$jscomp$9$$ === $split_screen_row$jscomp$3$$ && ($txt_i$$ = 0), $txt_row_dirty$$[$row$jscomp$9$$]) {
      $txt_i$$ += $txt_row_size$$;
    } else {
      for ($col$jscomp$8$$ = 0; $col$jscomp$8$$ < $txt_width$$; ++$col$jscomp$8$$, $txt_i$$ += 2) {
        if ($vga_memory$$[$txt_i$$ | 1] & 128) {
          $txt_row_dirty$$[$row$jscomp$9$$] = this.txt_dirty = 1;
          $txt_i$$ += $txt_row_size$$ - 2 * $col$jscomp$8$$;
          break;
        }
      }
    }
  }
};
$GraphicalText$$.prototype.render_dirty_rows = function() {
  var $txt_i$jscomp$1_vga$jscomp$1$$ = this.vga;
  const $vga_memory$jscomp$1$$ = $txt_i$jscomp$1_vga$jscomp$1$$.vga_memory, $txt_width$jscomp$1$$ = this.txt_width, $txt_height$jscomp$1$$ = this.txt_height, $txt_row_dirty$jscomp$1$$ = this.txt_row_dirty, $gfx_data$jscomp$1$$ = this.gfx_data, $font_bitmap$$ = this.font_bitmap, $font_size$$ = this.font_width * this.font_height, $font_A_offset$$ = 256 * this.font_index_A, $font_B_offset$$ = 256 * this.font_index_B, $font_AB_enabled$$ = $font_A_offset$$ !== $font_B_offset$$;
  var $bg_color_mask$jscomp$2_font_blink_enabled$$ = this.font_blink_enabled;
  const $cursor_visible$$ = this.cursor_enabled && !0, $cursor_top$$ = this.cursor_top, $cursor_height$$ = this.cursor_bottom - $cursor_top$$ + 1, $split_screen_row$jscomp$4$$ = $txt_i$jscomp$1_vga$jscomp$1$$.scan_line_to_screen_row($txt_i$jscomp$1_vga$jscomp$1$$.line_compare);
  $bg_color_mask$jscomp$2_font_blink_enabled$$ = $bg_color_mask$jscomp$2_font_blink_enabled$$ ? 7 : 15;
  const $palette$$ = new Int32Array(16);
  for ($i$jscomp$35_txt_row_size$jscomp$1$$ = 0; 16 > $i$jscomp$35_txt_row_size$jscomp$1$$; ++$i$jscomp$35_txt_row_size$jscomp$1$$) {
    $palette$$[$i$jscomp$35_txt_row_size$jscomp$1$$] = $txt_i$jscomp$1_vga$jscomp$1$$.vga256_palette[$txt_i$jscomp$1_vga$jscomp$1$$.dac_mask & $txt_i$jscomp$1_vga$jscomp$1$$.dac_map[$i$jscomp$35_txt_row_size$jscomp$1$$]];
  }
  var $i$jscomp$35_txt_row_size$jscomp$1$$ = 2 * $txt_width$jscomp$1$$;
  const $txt_row_step$jscomp$1$$ = Math.max(0, 2 * (2 * $txt_i$jscomp$1_vga$jscomp$1$$.offset_register - $txt_width$jscomp$1$$)), $gfx_col_size$$ = 4 * this.font_width, $gfx_line_size$$ = 4 * this.gfx_width, $gfx_row_size$$ = $gfx_line_size$$ * this.font_height, $gfx_col_step$$ = 4 * (this.font_width - this.font_height * this.gfx_width), $gfx_line_step$$ = 4 * (this.gfx_width - this.font_width), $cursor_gfx_i$$ = 4 * (this.cursor_row * this.gfx_width * this.font_height + this.cursor_col * this.font_width);
  let $fg$$, $bg$$, $fg_r$$ = 0, $fg_g$$ = 0, $fg_b$$ = 0, $bg_r$$ = 0, $bg_g$$ = 0, $bg_b$$ = 0, $gfx_i$$, $row$jscomp$10$$, $col$jscomp$9$$;
  $txt_i$jscomp$1_vga$jscomp$1$$ = $txt_i$jscomp$1_vga$jscomp$1$$.start_address << 1;
  for ($row$jscomp$10$$ = 0; $row$jscomp$10$$ < $txt_height$jscomp$1$$; ++$row$jscomp$10$$, $txt_i$jscomp$1_vga$jscomp$1$$ += $txt_row_step$jscomp$1$$) {
    if ($row$jscomp$10$$ === $split_screen_row$jscomp$4$$ && ($txt_i$jscomp$1_vga$jscomp$1$$ = 0), $txt_row_dirty$jscomp$1$$[$row$jscomp$10$$]) {
      for ($gfx_i$$ = $row$jscomp$10$$ * $gfx_row_size$$, $col$jscomp$9$$ = 0; $col$jscomp$9$$ < $txt_width$jscomp$1$$; ++$col$jscomp$9$$, $txt_i$jscomp$1_vga$jscomp$1$$ += 2, $gfx_i$$ += $gfx_col_step$$) {
        var $chr$jscomp$4_gfx_end_y$$ = $vga_memory$jscomp$1$$[$txt_i$jscomp$1_vga$jscomp$1$$];
        var $chr_attr_chr_fg_rgba_glyph_i$$ = $vga_memory$jscomp$1$$[$txt_i$jscomp$1_vga$jscomp$1$$ | 1];
        var $chr_font_ofs_gfx_end_x$$ = $font_AB_enabled$$ ? $chr_attr_chr_fg_rgba_glyph_i$$ & 8 ? $font_A_offset$$ : $font_B_offset$$ : $font_A_offset$$;
        var $chr_bg_rgba_draw_cursor_gfx_ic$$ = $palette$$[$chr_attr_chr_fg_rgba_glyph_i$$ >> 4 & $bg_color_mask$jscomp$2_font_blink_enabled$$];
        $chr_attr_chr_fg_rgba_glyph_i$$ = $palette$$[$chr_attr_chr_fg_rgba_glyph_i$$ & 15];
        $bg$$ !== $chr_bg_rgba_draw_cursor_gfx_ic$$ && ($bg$$ = $chr_bg_rgba_draw_cursor_gfx_ic$$, $bg_r$$ = $bg$$ >> 16, $bg_g$$ = $bg$$ >> 8 & 255, $bg_b$$ = $bg$$ & 255);
        $fg$$ !== $chr_attr_chr_fg_rgba_glyph_i$$ && ($fg$$ = $chr_attr_chr_fg_rgba_glyph_i$$, $fg_r$$ = $fg$$ >> 16, $fg_g$$ = $fg$$ >> 8 & 255, $fg_b$$ = $fg$$ & 255);
        $chr_bg_rgba_draw_cursor_gfx_ic$$ = $cursor_visible$$ && $cursor_gfx_i$$ === $gfx_i$$;
        $chr_attr_chr_fg_rgba_glyph_i$$ = ($chr_font_ofs_gfx_end_x$$ + $chr$jscomp$4_gfx_end_y$$) * $font_size$$;
        for ($chr$jscomp$4_gfx_end_y$$ = $gfx_i$$ + $gfx_row_size$$; $gfx_i$$ < $chr$jscomp$4_gfx_end_y$$; $gfx_i$$ += $gfx_line_step$$) {
          for ($chr_font_ofs_gfx_end_x$$ = $gfx_i$$ + $gfx_col_size$$; $gfx_i$$ < $chr_font_ofs_gfx_end_x$$; $gfx_i$$ += 4) {
            $font_bitmap$$[$chr_attr_chr_fg_rgba_glyph_i$$++] ? ($gfx_data$jscomp$1$$[$gfx_i$$] = $fg_r$$, $gfx_data$jscomp$1$$[$gfx_i$$ + 1] = $fg_g$$, $gfx_data$jscomp$1$$[$gfx_i$$ + 2] = $fg_b$$) : ($gfx_data$jscomp$1$$[$gfx_i$$] = $bg_r$$, $gfx_data$jscomp$1$$[$gfx_i$$ + 1] = $bg_g$$, $gfx_data$jscomp$1$$[$gfx_i$$ + 2] = $bg_b$$);
          }
        }
        if ($chr_bg_rgba_draw_cursor_gfx_ic$$) {
          for ($chr_bg_rgba_draw_cursor_gfx_ic$$ = $cursor_gfx_i$$ + $cursor_top$$ * $gfx_line_size$$, $chr$jscomp$4_gfx_end_y$$ = $chr_bg_rgba_draw_cursor_gfx_ic$$ + $cursor_height$$ * $gfx_line_size$$; $chr_bg_rgba_draw_cursor_gfx_ic$$ < $chr$jscomp$4_gfx_end_y$$; $chr_bg_rgba_draw_cursor_gfx_ic$$ += $gfx_line_step$$) {
            for ($chr_font_ofs_gfx_end_x$$ = $chr_bg_rgba_draw_cursor_gfx_ic$$ + $gfx_col_size$$; $chr_bg_rgba_draw_cursor_gfx_ic$$ < $chr_font_ofs_gfx_end_x$$; $chr_bg_rgba_draw_cursor_gfx_ic$$ += 4) {
              $gfx_data$jscomp$1$$[$chr_bg_rgba_draw_cursor_gfx_ic$$] = $fg_r$$, $gfx_data$jscomp$1$$[$chr_bg_rgba_draw_cursor_gfx_ic$$ + 1] = $fg_g$$, $gfx_data$jscomp$1$$[$chr_bg_rgba_draw_cursor_gfx_ic$$ + 2] = $fg_b$$;
            }
          }
        }
      }
    } else {
      $txt_i$jscomp$1_vga$jscomp$1$$ += $i$jscomp$35_txt_row_size$jscomp$1$$;
    }
  }
};
$GraphicalText$$.prototype.mark_dirty = function() {
  this.txt_row_dirty.fill(1);
  this.txt_dirty = 1;
};
$GraphicalText$$.prototype.invalidate_row = function($row$jscomp$11$$) {
  0 <= $row$jscomp$11$$ && $row$jscomp$11$$ < this.txt_height && (this.txt_row_dirty[$row$jscomp$11$$] = this.txt_dirty = 1);
};
$GraphicalText$$.prototype.invalidate_font_shape = function() {
  this.font_data_dirty = !0;
};
$GraphicalText$$.prototype.set_size = function($rows$jscomp$1$$, $cols$jscomp$1$$) {
  0 < $rows$jscomp$1$$ && 256 > $rows$jscomp$1$$ && 0 < $cols$jscomp$1$$ && 256 > $cols$jscomp$1$$ && (this.txt_width = $cols$jscomp$1$$, this.txt_height = $rows$jscomp$1$$, this.gfx_width = this.txt_width * this.font_width, this.gfx_height = this.txt_height * this.font_height, this.txt_row_dirty = new Uint8Array(this.txt_height), this.vga.screen.set_size_graphical(this.gfx_width, this.gfx_height, this.gfx_width, this.gfx_height), this.mark_dirty(), this.rebuild_image_data());
};
$GraphicalText$$.prototype.set_character_map = function($char_map_select_font_index_B$$) {
  const $linear_index_map$$ = [0, 2, 4, 6, 1, 3, 5, 7], $font_index_A$$ = $linear_index_map$$[($char_map_select_font_index_B$$ & 12) >> 2 | ($char_map_select_font_index_B$$ & 32) >> 3];
  $char_map_select_font_index_B$$ = $linear_index_map$$[$char_map_select_font_index_B$$ & 3 | ($char_map_select_font_index_B$$ & 16) >> 2];
  if (this.font_index_A !== $font_index_A$$ || this.font_index_B !== $char_map_select_font_index_B$$) {
    this.font_index_A = $font_index_A$$, this.font_index_B = $char_map_select_font_index_B$$, this.mark_dirty();
  }
};
$GraphicalText$$.prototype.set_cursor_pos = function($row$jscomp$12$$, $col$jscomp$10$$) {
  this.cursor_pos_dirty = !0;
  this.cursor_row_latch = $row$jscomp$12$$;
  this.cursor_col_latch = $col$jscomp$10$$;
};
$GraphicalText$$.prototype.set_cursor_attr = function($start$jscomp$35$$, $end$jscomp$19$$, $visible$jscomp$2$$) {
  this.cursor_attr_dirty = !0;
  this.cursor_enabled_latch = !!$visible$jscomp$2$$;
  this.cursor_top_latch = $start$jscomp$35$$;
  this.cursor_bottom_latch = $end$jscomp$19$$;
};
$GraphicalText$$.prototype.render = function() {
  this.frame_count = this.frame_count + 1 >>> 0;
  const $curr_clocking_mode$$ = this.vga.clocking_mode & 9, $curr_attribute_mode$$ = this.vga.attribute_mode & 12, $curr_max_scan_line$$ = this.vga.max_scan_line & 159;
  if (this.font_data_dirty || this.vga_clocking_mode !== $curr_clocking_mode$$ || this.vga_attribute_mode !== $curr_attribute_mode$$ || this.vga_max_scan_line !== $curr_max_scan_line$$) {
    const $width_9px$jscomp$1$$ = !($curr_clocking_mode$$ & 1), $width_double$jscomp$1$$ = !!($curr_clocking_mode$$ & 8), $curr_font_width$$ = ($width_9px$jscomp$1$$ ? 9 : 8) * ($width_double$jscomp$1$$ ? 2 : 1), $curr_font_lge$$ = !!($curr_attribute_mode$$ & 4), $curr_font_height$$ = ($curr_max_scan_line$$ & 31) + 1, $font_data_changed$$ = this.font_data_dirty || this.font_lge !== $curr_font_lge$$, $font_size_changed$$ = this.font_width !== $curr_font_width$$ || this.font_height !== $curr_font_height$$;
    this.font_data_dirty = !1;
    this.font_width = $curr_font_width$$;
    this.font_height = $curr_font_height$$;
    this.font_blink_enabled = !!($curr_attribute_mode$$ & 8);
    this.font_lge = $curr_font_lge$$;
    this.vga_clocking_mode = $curr_clocking_mode$$;
    this.vga_attribute_mode = $curr_attribute_mode$$;
    this.vga_max_scan_line = $curr_max_scan_line$$;
    if ($font_data_changed$$ || $font_size_changed$$) {
      $font_size_changed$$ && (this.gfx_width = this.txt_width * this.font_width, this.gfx_height = this.txt_height * this.font_height, this.rebuild_image_data()), this.font_bitmap = this.rebuild_font_bitmap($width_9px$jscomp$1$$, $width_double$jscomp$1$$);
    }
    this.mark_dirty();
  }
  this.cursor_pos_dirty && (this.cursor_pos_dirty = !1, this.cursor_row_latch = Math.min(this.cursor_row_latch, this.txt_height - 1), this.cursor_col_latch = Math.min(this.cursor_col_latch, this.txt_width - 1), this.cursor_row !== this.cursor_row_latch || this.cursor_col !== this.cursor_col_latch) && (this.txt_row_dirty[this.cursor_row] = this.txt_row_dirty[this.cursor_row_latch] = this.txt_dirty = 1, this.cursor_row = this.cursor_row_latch, this.cursor_col = this.cursor_col_latch);
  this.cursor_attr_dirty && (this.cursor_attr_dirty = !1, this.cursor_enabled !== this.cursor_enabled_latch || this.cursor_top !== this.cursor_top_latch || this.cursor_bottom !== this.cursor_bottom_latch) && (this.cursor_enabled = this.cursor_enabled_latch, this.cursor_top = this.cursor_top_latch, this.cursor_bottom = this.cursor_bottom_latch, this.txt_row_dirty[this.cursor_row] = this.txt_dirty = 1);
  this.txt_dirty && (this.render_dirty_rows(), this.txt_dirty = 0, this.txt_row_dirty.fill(0));
  return this.image_data;
};
function $PS2$$($cpu$jscomp$10$$, $bus$jscomp$6$$) {
  this.cpu = $cpu$jscomp$10$$;
  this.bus = $bus$jscomp$6$$;
  this.use_mouse = this.enable_mouse_stream = !1;
  this.have_mouse = !0;
  this.mouse_clicks = this.mouse_delta_y = this.mouse_delta_x = 0;
  this.have_keyboard = !0;
  this.next_read_resolution = this.next_read_rate = this.next_handle_scan_code_set = this.next_read_led = this.next_read_sample = this.next_is_mouse_command = this.enable_keyboard_stream = !1;
  this.kbd_buffer = new $ByteQueue$$(1024);
  this.last_port60_byte = 0;
  this.sample_rate = 100;
  this.mouse_id = this.mouse_detect_state = 0;
  this.mouse_reset_workaround = !1;
  this.wheel_movement = 0;
  this.resolution = 4;
  this.scaling2 = !1;
  this.last_mouse_packet = -1;
  this.mouse_buffer = new $ByteQueue$$(1024);
  this.next_byte_is_aux = this.next_byte_is_ready = !1;
  this.bus.register("keyboard-code", function($code$jscomp$1$$) {
    this.kbd_send_code($code$jscomp$1$$);
  }, this);
  this.bus.register("mouse-click", function($data$jscomp$121$$) {
    this.mouse_send_click($data$jscomp$121$$[0], $data$jscomp$121$$[1], $data$jscomp$121$$[2]);
  }, this);
  this.bus.register("mouse-delta", function($data$jscomp$122$$) {
    this.mouse_send_delta($data$jscomp$122$$[0], $data$jscomp$122$$[1]);
  }, this);
  this.bus.register("mouse-wheel", function($data$jscomp$123$$) {
    this.wheel_movement -= $data$jscomp$123$$[0];
    this.wheel_movement -= 2 * $data$jscomp$123$$[1];
    this.wheel_movement = Math.min(7, Math.max(-8, this.wheel_movement));
    this.send_mouse_packet(0, 0);
  }, this);
  this.command_register = 5;
  this.controller_output_port = 0;
  this.read_controller_output_port = this.read_command_register = this.read_output_register = !1;
  $cpu$jscomp$10$$.io.register_read(96, this, this.port60_read);
  $cpu$jscomp$10$$.io.register_read(100, this, this.port64_read);
  $cpu$jscomp$10$$.io.register_write(96, this, this.port60_write);
  $cpu$jscomp$10$$.io.register_write(100, this, this.port64_write);
}
$PS2$$.prototype.get_state = function() {
  var $state$jscomp$21$$ = [];
  $state$jscomp$21$$[0] = this.enable_mouse_stream;
  $state$jscomp$21$$[1] = this.use_mouse;
  $state$jscomp$21$$[2] = this.have_mouse;
  $state$jscomp$21$$[3] = this.mouse_delta_x;
  $state$jscomp$21$$[4] = this.mouse_delta_y;
  $state$jscomp$21$$[5] = this.mouse_clicks;
  $state$jscomp$21$$[6] = this.have_keyboard;
  $state$jscomp$21$$[7] = this.enable_keyboard_stream;
  $state$jscomp$21$$[8] = this.next_is_mouse_command;
  $state$jscomp$21$$[9] = this.next_read_sample;
  $state$jscomp$21$$[10] = this.next_read_led;
  $state$jscomp$21$$[11] = this.next_handle_scan_code_set;
  $state$jscomp$21$$[12] = this.next_read_rate;
  $state$jscomp$21$$[13] = this.next_read_resolution;
  $state$jscomp$21$$[15] = this.last_port60_byte;
  $state$jscomp$21$$[16] = this.sample_rate;
  $state$jscomp$21$$[17] = this.resolution;
  $state$jscomp$21$$[18] = this.scaling2;
  $state$jscomp$21$$[20] = this.command_register;
  $state$jscomp$21$$[21] = this.read_output_register;
  $state$jscomp$21$$[22] = this.read_command_register;
  $state$jscomp$21$$[23] = this.controller_output_port;
  $state$jscomp$21$$[24] = this.read_controller_output_port;
  $state$jscomp$21$$[25] = this.mouse_id;
  $state$jscomp$21$$[26] = this.mouse_detect_state;
  $state$jscomp$21$$[27] = this.mouse_reset_workaround;
  return $state$jscomp$21$$;
};
$PS2$$.prototype.set_state = function($state$jscomp$22$$) {
  this.enable_mouse_stream = $state$jscomp$22$$[0];
  this.use_mouse = $state$jscomp$22$$[1];
  this.have_mouse = $state$jscomp$22$$[2];
  this.mouse_delta_x = $state$jscomp$22$$[3];
  this.mouse_delta_y = $state$jscomp$22$$[4];
  this.mouse_clicks = $state$jscomp$22$$[5];
  this.have_keyboard = $state$jscomp$22$$[6];
  this.enable_keyboard_stream = $state$jscomp$22$$[7];
  this.next_is_mouse_command = $state$jscomp$22$$[8];
  this.next_read_sample = $state$jscomp$22$$[9];
  this.next_read_led = $state$jscomp$22$$[10];
  this.next_handle_scan_code_set = $state$jscomp$22$$[11];
  this.next_read_rate = $state$jscomp$22$$[12];
  this.next_read_resolution = $state$jscomp$22$$[13];
  this.last_port60_byte = $state$jscomp$22$$[15];
  this.sample_rate = $state$jscomp$22$$[16];
  this.resolution = $state$jscomp$22$$[17];
  this.scaling2 = $state$jscomp$22$$[18];
  this.command_register = $state$jscomp$22$$[20];
  this.read_output_register = $state$jscomp$22$$[21];
  this.read_command_register = $state$jscomp$22$$[22];
  this.controller_output_port = $state$jscomp$22$$[23];
  this.read_controller_output_port = $state$jscomp$22$$[24];
  this.mouse_id = $state$jscomp$22$$[25] || 0;
  this.mouse_detect_state = $state$jscomp$22$$[26] || 0;
  this.mouse_reset_workaround = $state$jscomp$22$$[27] || !1;
  this.next_byte_is_aux = this.next_byte_is_ready = !1;
  this.kbd_buffer.clear();
  this.mouse_buffer.clear();
  this.bus.send("mouse-enable", this.use_mouse);
};
$PS2$$.prototype.raise_irq = function() {
  this.next_byte_is_ready || (this.kbd_buffer.length ? this.kbd_irq() : this.mouse_buffer.length && this.mouse_irq());
};
$PS2$$.prototype.mouse_irq = function() {
  this.next_byte_is_aux = this.next_byte_is_ready = !0;
  this.command_register & 2 && ($dbg_log$$("Mouse irq", 64), this.cpu.device_lower_irq(12), this.cpu.device_raise_irq(12));
};
$PS2$$.prototype.kbd_irq = function() {
  this.next_byte_is_ready = !0;
  this.next_byte_is_aux = !1;
  this.command_register & 1 && ($dbg_log$$("Keyboard irq", 64), this.cpu.device_lower_irq(1), this.cpu.device_raise_irq(1));
};
$PS2$$.prototype.kbd_send_code = function($code$jscomp$2$$) {
  this.enable_keyboard_stream && ($dbg_log$$("adding kbd code: " + $h$$($code$jscomp$2$$), 64), this.kbd_buffer.push($code$jscomp$2$$), this.raise_irq());
};
$PS2$$.prototype.mouse_send_delta = function($change_x_delta_x$$, $change_y_delta_y$$) {
  if (this.have_mouse && this.use_mouse) {
    var $factor$jscomp$1$$ = this.resolution * this.sample_rate / 80;
    this.mouse_delta_x += $change_x_delta_x$$ * $factor$jscomp$1$$;
    this.mouse_delta_y += $change_y_delta_y$$ * $factor$jscomp$1$$;
    this.enable_mouse_stream && ($change_x_delta_x$$ = this.mouse_delta_x | 0, $change_y_delta_y$$ = this.mouse_delta_y | 0, $change_x_delta_x$$ || $change_y_delta_y$$) && (Date.now(), this.mouse_delta_x -= $change_x_delta_x$$, this.mouse_delta_y -= $change_y_delta_y$$, this.send_mouse_packet($change_x_delta_x$$, $change_y_delta_y$$));
  }
};
$PS2$$.prototype.mouse_send_click = function($left$jscomp$2$$, $middle$$, $right$jscomp$2$$) {
  this.have_mouse && this.use_mouse && (this.mouse_clicks = $left$jscomp$2$$ | $right$jscomp$2$$ << 1 | $middle$$ << 2, this.enable_mouse_stream && this.send_mouse_packet(0, 0));
};
$PS2$$.prototype.send_mouse_packet = function($dx$jscomp$4$$, $dy$jscomp$4$$) {
  var $info_byte$$ = (0 > $dy$jscomp$4$$) << 5 | (0 > $dx$jscomp$4$$) << 4 | 8 | this.mouse_clicks;
  this.last_mouse_packet = Date.now();
  this.mouse_buffer.push($info_byte$$);
  this.mouse_buffer.push($dx$jscomp$4$$);
  this.mouse_buffer.push($dy$jscomp$4$$);
  4 === this.mouse_id ? (this.mouse_buffer.push(0 | this.wheel_movement & 15), this.wheel_movement = 0) : 3 === this.mouse_id && (this.mouse_buffer.push(this.wheel_movement & 255), this.wheel_movement = 0);
  this.raise_irq();
};
$PS2$$.prototype.apply_scaling2 = function($n$jscomp$8$$) {
  var $sign$$ = $n$jscomp$8$$ >> 31;
  switch(Math.abs($n$jscomp$8$$)) {
    case 0:
    case 1:
    case 3:
      return $n$jscomp$8$$;
    case 2:
      return $sign$$;
    case 4:
      return 6 * $sign$$;
    case 5:
      return 9 * $sign$$;
    default:
      return $n$jscomp$8$$ << 1;
  }
};
$PS2$$.prototype.port60_read = function() {
  this.next_byte_is_ready = !1;
  if (!this.kbd_buffer.length && !this.mouse_buffer.length) {
    return $dbg_log$$("Port 60 read: Empty", 64), this.last_port60_byte;
  }
  this.next_byte_is_aux ? (this.cpu.device_lower_irq(12), this.last_port60_byte = this.mouse_buffer.shift(), $dbg_log$$("Port 60 read (mouse): " + $h$$(this.last_port60_byte), 64)) : (this.cpu.device_lower_irq(1), this.last_port60_byte = this.kbd_buffer.shift(), $dbg_log$$("Port 60 read (kbd)  : " + $h$$(this.last_port60_byte), 64));
  (this.kbd_buffer.length || this.mouse_buffer.length) && this.raise_irq();
  return this.last_port60_byte;
};
$PS2$$.prototype.port64_read = function() {
  var $status_byte$$ = 16;
  this.next_byte_is_ready && ($status_byte$$ |= 1);
  this.next_byte_is_aux && ($status_byte$$ |= 32);
  $dbg_log$$("port 64 read: " + $h$$($status_byte$$), 64);
  return $status_byte$$;
};
$PS2$$.prototype.port60_write = function($write_byte$$) {
  $dbg_log$$("port 60 write: " + $h$$($write_byte$$), 64);
  if (this.read_command_register) {
    this.command_register = $write_byte$$, this.read_command_register = !1, $dbg_log$$("Keyboard command register = " + $h$$(this.command_register), 64);
  } else {
    if (this.read_output_register) {
      this.read_output_register = !1, this.mouse_buffer.clear(), this.mouse_buffer.push($write_byte$$), this.mouse_irq();
    } else {
      if (this.next_read_sample) {
        this.next_read_sample = !1;
        this.mouse_buffer.clear();
        this.mouse_buffer.push(250);
        this.sample_rate = $write_byte$$;
        switch(this.mouse_detect_state) {
          case -1:
            60 === $write_byte$$ ? (this.mouse_reset_workaround = !0, this.mouse_detect_state = 0) : (this.mouse_reset_workaround = !1, this.mouse_detect_state = 200 === $write_byte$$ ? 1 : 0);
            break;
          case 0:
            200 === $write_byte$$ && (this.mouse_detect_state = 1);
            break;
          case 1:
            this.mouse_detect_state = 100 === $write_byte$$ ? 2 : 200 === $write_byte$$ ? 3 : 0;
            break;
          case 2:
            80 === $write_byte$$ && (this.mouse_id = 3);
            this.mouse_detect_state = -1;
            break;
          case 3:
            80 === $write_byte$$ && (this.mouse_id = 4), this.mouse_detect_state = -1;
        }
        $dbg_log$$("mouse sample rate: " + $h$$($write_byte$$) + ", mouse id: " + $h$$(this.mouse_id), 64);
        this.sample_rate || ($dbg_log$$("invalid sample rate, reset to 100", 64), this.sample_rate = 100);
        this.mouse_irq();
      } else {
        if (this.next_read_resolution) {
          this.next_read_resolution = !1, this.mouse_buffer.clear(), this.mouse_buffer.push(250), 3 < $write_byte$$ ? (this.resolution = 4, $dbg_log$$("invalid resolution, resetting to 4", 64)) : (this.resolution = 1 << $write_byte$$, $dbg_log$$("resolution: " + this.resolution, 64)), this.mouse_irq();
        } else {
          if (this.next_read_led) {
            this.next_read_led = !1, this.kbd_buffer.push(250), this.kbd_irq();
          } else {
            if (this.next_handle_scan_code_set) {
              this.next_handle_scan_code_set = !1, this.kbd_buffer.push(250), this.kbd_irq(), $write_byte$$ || this.kbd_buffer.push(1);
            } else {
              if (this.next_read_rate) {
                this.next_read_rate = !1, this.kbd_buffer.push(250), this.kbd_irq();
              } else {
                if (this.next_is_mouse_command) {
                  if (this.next_is_mouse_command = !1, $dbg_log$$("Port 60 data register write: " + $h$$($write_byte$$), 64), this.have_mouse) {
                    this.kbd_buffer.clear();
                    this.mouse_buffer.clear();
                    this.mouse_buffer.push(250);
                    switch($write_byte$$) {
                      case 230:
                        $dbg_log$$("Scaling 1:1", 64);
                        this.scaling2 = !1;
                        break;
                      case 231:
                        $dbg_log$$("Scaling 2:1", 64);
                        this.scaling2 = !0;
                        break;
                      case 232:
                        this.next_read_resolution = !0;
                        break;
                      case 233:
                        this.send_mouse_packet(0, 0);
                        break;
                      case 235:
                        $dbg_log$$("unimplemented request single packet", 64);
                        this.send_mouse_packet(0, 0);
                        break;
                      case 242:
                        $dbg_log$$("required id: " + $h$$(this.mouse_id), 64);
                        this.mouse_buffer.push(this.mouse_id);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        this.raise_irq();
                        break;
                      case 243:
                        this.next_read_sample = !0;
                        break;
                      case 244:
                        this.use_mouse = this.enable_mouse_stream = !0;
                        this.bus.send("mouse-enable", !0);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        break;
                      case 245:
                        this.enable_mouse_stream = !1;
                        break;
                      case 246:
                        this.enable_mouse_stream = !1;
                        this.sample_rate = 100;
                        this.scaling2 = !1;
                        this.resolution = 4;
                        break;
                      case 255:
                        $dbg_log$$("Mouse reset", 64);
                        this.mouse_buffer.push(170);
                        this.mouse_buffer.push(0);
                        this.use_mouse = !0;
                        this.bus.send("mouse-enable", !0);
                        this.enable_mouse_stream = !1;
                        this.sample_rate = 100;
                        this.scaling2 = !1;
                        this.resolution = 4;
                        this.mouse_reset_workaround || (this.mouse_id = 0);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        break;
                      default:
                        $dbg_log$$("Unimplemented mouse command: " + $h$$($write_byte$$), 64);
                    }
                    this.mouse_irq();
                  }
                } else {
                  if (this.read_controller_output_port) {
                    this.read_controller_output_port = !1, this.controller_output_port = $write_byte$$;
                  } else {
                    $dbg_log$$("Port 60 data register write: " + $h$$($write_byte$$), 64);
                    this.mouse_buffer.clear();
                    this.kbd_buffer.clear();
                    this.kbd_buffer.push(250);
                    switch($write_byte$$) {
                      case 237:
                        this.next_read_led = !0;
                        break;
                      case 240:
                        this.next_handle_scan_code_set = !0;
                        break;
                      case 242:
                        this.kbd_buffer.push(171);
                        this.kbd_buffer.push(131);
                        break;
                      case 243:
                        this.next_read_rate = !0;
                        break;
                      case 244:
                        $dbg_log$$("kbd enable scanning", 64);
                        this.enable_keyboard_stream = !0;
                        break;
                      case 245:
                        $dbg_log$$("kbd disable scanning", 64);
                        this.enable_keyboard_stream = !1;
                        break;
                      case 246:
                        break;
                      case 255:
                        this.kbd_buffer.clear();
                        this.kbd_buffer.push(250);
                        this.kbd_buffer.push(170);
                        this.kbd_buffer.push(0);
                        break;
                      default:
                        $dbg_log$$("Unimplemented keyboard command: " + $h$$($write_byte$$), 64);
                    }
                    this.kbd_irq();
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
$PS2$$.prototype.port64_write = function($write_byte$jscomp$1$$) {
  $dbg_log$$("port 64 write: " + $h$$($write_byte$jscomp$1$$), 64);
  switch($write_byte$jscomp$1$$) {
    case 32:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(this.command_register);
      this.kbd_irq();
      break;
    case 96:
      this.read_command_register = !0;
      break;
    case 209:
      this.read_controller_output_port = !0;
      break;
    case 211:
      this.read_output_register = !0;
      break;
    case 212:
      this.next_is_mouse_command = !0;
      break;
    case 167:
      $dbg_log$$("Disable second port", 64);
      this.command_register |= 32;
      break;
    case 168:
      $dbg_log$$("Enable second port", 64);
      this.command_register &= -33;
      break;
    case 169:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(0);
      this.kbd_irq();
      break;
    case 170:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(85);
      this.kbd_irq();
      break;
    case 171:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(0);
      this.kbd_irq();
      break;
    case 173:
      $dbg_log$$("Disable Keyboard", 64);
      this.command_register |= 16;
      break;
    case 174:
      $dbg_log$$("Enable Keyboard", 64);
      this.command_register &= -17;
      break;
    case 254:
      $dbg_log$$("CPU reboot via PS2");
      this.cpu.reboot_internal();
      break;
    default:
      $dbg_log$$("port 64: Unimplemented command byte: " + $h$$($write_byte$jscomp$1$$), 64);
  }
};
function $RTC$$($cpu$jscomp$11$$) {
  this.cpu = $cpu$jscomp$11$$;
  this.cmos_index = 0;
  this.cmos_data = new Uint8Array(128);
  this.last_update = this.rtc_time = Date.now();
  this.next_interrupt_alarm = this.next_interrupt = 0;
  this.periodic_interrupt = !1;
  this.periodic_interrupt_time = .9765625;
  this.cmos_a = 38;
  this.cmos_b = 2;
  this.nmi_disabled = this.cmos_c = 0;
  $cpu$jscomp$11$$.io.register_write(112, this, function($out_byte$jscomp$4$$) {
    this.cmos_index = $out_byte$jscomp$4$$ & 127;
    this.nmi_disabled = $out_byte$jscomp$4$$ >> 7;
  });
  $cpu$jscomp$11$$.io.register_write(113, this, this.cmos_port_write);
  $cpu$jscomp$11$$.io.register_read(113, this, this.cmos_port_read);
}
$RTC$$.prototype.get_state = function() {
  var $state$jscomp$23$$ = [];
  $state$jscomp$23$$[0] = this.cmos_index;
  $state$jscomp$23$$[1] = this.cmos_data;
  $state$jscomp$23$$[2] = this.rtc_time;
  $state$jscomp$23$$[3] = this.last_update;
  $state$jscomp$23$$[4] = this.next_interrupt;
  $state$jscomp$23$$[5] = this.next_interrupt_alarm;
  $state$jscomp$23$$[6] = this.periodic_interrupt;
  $state$jscomp$23$$[7] = this.periodic_interrupt_time;
  $state$jscomp$23$$[8] = this.cmos_a;
  $state$jscomp$23$$[9] = this.cmos_b;
  $state$jscomp$23$$[10] = this.cmos_c;
  $state$jscomp$23$$[11] = this.nmi_disabled;
  return $state$jscomp$23$$;
};
$RTC$$.prototype.set_state = function($state$jscomp$24$$) {
  this.cmos_index = $state$jscomp$24$$[0];
  this.cmos_data = $state$jscomp$24$$[1];
  this.rtc_time = $state$jscomp$24$$[2];
  this.last_update = $state$jscomp$24$$[3];
  this.next_interrupt = $state$jscomp$24$$[4];
  this.next_interrupt_alarm = $state$jscomp$24$$[5];
  this.periodic_interrupt = $state$jscomp$24$$[6];
  this.periodic_interrupt_time = $state$jscomp$24$$[7];
  this.cmos_a = $state$jscomp$24$$[8];
  this.cmos_b = $state$jscomp$24$$[9];
  this.cmos_c = $state$jscomp$24$$[10];
  this.nmi_disabled = $state$jscomp$24$$[11];
};
$RTC$$.prototype.timer = function($time$jscomp$1$$) {
  $time$jscomp$1$$ = Date.now();
  this.rtc_time += $time$jscomp$1$$ - this.last_update;
  this.last_update = $time$jscomp$1$$;
  this.periodic_interrupt && this.next_interrupt < $time$jscomp$1$$ ? (this.cpu.device_raise_irq(8), this.cmos_c |= 192, this.next_interrupt += this.periodic_interrupt_time * Math.ceil(($time$jscomp$1$$ - this.next_interrupt) / this.periodic_interrupt_time)) : this.next_interrupt_alarm && this.next_interrupt_alarm < $time$jscomp$1$$ && (this.cpu.device_raise_irq(8), this.cmos_c |= 160, this.next_interrupt_alarm = 0);
  let $t$jscomp$8$$ = 100;
  this.periodic_interrupt && this.next_interrupt && ($t$jscomp$8$$ = Math.min($t$jscomp$8$$, Math.max(0, this.next_interrupt - $time$jscomp$1$$)));
  this.next_interrupt_alarm && ($t$jscomp$8$$ = Math.min($t$jscomp$8$$, Math.max(0, this.next_interrupt_alarm - $time$jscomp$1$$)));
  return $t$jscomp$8$$;
};
$RTC$$.prototype.bcd_pack = function($n$jscomp$9$$) {
  for (var $i$jscomp$36$$ = 0, $result$jscomp$6$$ = 0, $digit$$; $n$jscomp$9$$;) {
    $digit$$ = $n$jscomp$9$$ % 10, $result$jscomp$6$$ |= $digit$$ << 4 * $i$jscomp$36$$, $i$jscomp$36$$++, $n$jscomp$9$$ = ($n$jscomp$9$$ - $digit$$) / 10;
  }
  return $result$jscomp$6$$;
};
$RTC$$.prototype.bcd_unpack = function($n$jscomp$10$$) {
  const $low$$ = $n$jscomp$10$$ & 15, $high$$ = $n$jscomp$10$$ >> 4 & 15;
  $dbg_assert$$(256 > $n$jscomp$10$$);
  $dbg_assert$$(10 > $low$$);
  $dbg_assert$$(10 > $high$$);
  return $low$$ + 10 * $high$$;
};
$RTC$$.prototype.encode_time = function($t$jscomp$9$$) {
  return this.cmos_b & 4 ? $t$jscomp$9$$ : this.bcd_pack($t$jscomp$9$$);
};
$RTC$$.prototype.decode_time = function($t$jscomp$10$$) {
  return this.cmos_b & 4 ? $t$jscomp$10$$ : this.bcd_unpack($t$jscomp$10$$);
};
$RTC$$.prototype.cmos_port_read = function() {
  var $c$jscomp$2_index$jscomp$84$$ = this.cmos_index;
  switch($c$jscomp$2_index$jscomp$84$$) {
    case 0:
      return $dbg_log$$("read second: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCSeconds())), 65536), this.encode_time((new Date(this.rtc_time)).getUTCSeconds());
    case 2:
      return $dbg_log$$("read minute: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCMinutes())), 65536), this.encode_time((new Date(this.rtc_time)).getUTCMinutes());
    case 4:
      return $dbg_log$$("read hour: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCHours())), 65536), this.encode_time((new Date(this.rtc_time)).getUTCHours());
    case 6:
      return $dbg_log$$("read day: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCDay() + 1)), 65536), this.encode_time((new Date(this.rtc_time)).getUTCDay() + 1);
    case 7:
      return $dbg_log$$("read day of month: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCDate())), 65536), this.encode_time((new Date(this.rtc_time)).getUTCDate());
    case 8:
      return $dbg_log$$("read month: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCMonth() + 1)), 65536), this.encode_time((new Date(this.rtc_time)).getUTCMonth() + 1);
    case 9:
      return $dbg_log$$("read year: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCFullYear() % 100)), 65536), this.encode_time((new Date(this.rtc_time)).getUTCFullYear() % 100);
    case 10:
      return 999 <= $v86$$.microtick() % 1000 ? this.cmos_a | 128 : this.cmos_a;
    case 11:
      return this.cmos_b;
    case 12:
      return this.cpu.device_lower_irq(8), $dbg_log$$("cmos reg C read", 65536), $c$jscomp$2_index$jscomp$84$$ = this.cmos_c, this.cmos_c &= -241, $c$jscomp$2_index$jscomp$84$$;
    case 13:
      return 0;
    case 50:
    case 55:
      return $dbg_log$$("read century: " + $h$$(this.encode_time((new Date(this.rtc_time)).getUTCFullYear() / 100 | 0)), 65536), this.encode_time((new Date(this.rtc_time)).getUTCFullYear() / 100 | 0);
    default:
      return $dbg_log$$("cmos read from index " + $h$$($c$jscomp$2_index$jscomp$84$$), 65536), this.cmos_data[this.cmos_index];
  }
};
$RTC$$.prototype.cmos_port_write = function($data_byte$jscomp$11_now$jscomp$5$$) {
  switch(this.cmos_index) {
    case 10:
      this.cmos_a = $data_byte$jscomp$11_now$jscomp$5$$ & 127;
      this.periodic_interrupt_time = 1000 / (32768 >> (this.cmos_a & 15) - 1);
      $dbg_log$$("Periodic interrupt, a=" + $h$$(this.cmos_a, 2) + " t=" + this.periodic_interrupt_time, 65536);
      break;
    case 11:
      this.cmos_b = $data_byte$jscomp$11_now$jscomp$5$$;
      this.cmos_b & 64 && (this.next_interrupt = Date.now());
      if (this.cmos_b & 32) {
        $data_byte$jscomp$11_now$jscomp$5$$ = new Date;
        const $seconds$$ = this.decode_time(this.cmos_data[1]), $minutes$$ = this.decode_time(this.cmos_data[3]), $hours$$ = this.decode_time(this.cmos_data[5]), $alarm_date$$ = new Date(Date.UTC($data_byte$jscomp$11_now$jscomp$5$$.getUTCFullYear(), $data_byte$jscomp$11_now$jscomp$5$$.getUTCMonth(), $data_byte$jscomp$11_now$jscomp$5$$.getUTCDate(), $hours$$, $minutes$$, $seconds$$));
        $dbg_log$$("RTC alarm scheduled for " + $alarm_date$$ + " hh:mm:ss=" + $hours$$ + ":" + $minutes$$ + ":" + $seconds$$ + " ms_from_now=" + ($alarm_date$$ - $data_byte$jscomp$11_now$jscomp$5$$), 65536);
        this.next_interrupt_alarm = +$alarm_date$$;
      }
      this.cmos_b & 16 && $dbg_log$$("Unimplemented: updated interrupt", 65536);
      $dbg_log$$("cmos b=" + $h$$(this.cmos_b, 2), 65536);
      break;
    case 1:
    case 3:
    case 5:
      this.cmos_write(this.cmos_index, $data_byte$jscomp$11_now$jscomp$5$$);
      break;
    default:
      $dbg_log$$("cmos write index " + $h$$(this.cmos_index) + ": " + $h$$($data_byte$jscomp$11_now$jscomp$5$$), 65536);
  }
  this.periodic_interrupt = 64 === (this.cmos_b & 64) && 0 < (this.cmos_a & 15);
};
$RTC$$.prototype.cmos_read = function($index$jscomp$85$$) {
  $dbg_assert$$(128 > $index$jscomp$85$$);
  return this.cmos_data[$index$jscomp$85$$];
};
$RTC$$.prototype.cmos_write = function($index$jscomp$86$$, $value$jscomp$139$$) {
  $dbg_log$$("cmos " + $h$$($index$jscomp$86$$) + " <- " + $h$$($value$jscomp$139$$), 65536);
  $dbg_assert$$(128 > $index$jscomp$86$$);
  this.cmos_data[$index$jscomp$86$$] = $value$jscomp$139$$;
};
function $UART$$($cpu$jscomp$12_io$jscomp$2$$, $port$jscomp$1$$, $bus$jscomp$7$$) {
  this.bus = $bus$jscomp$7$$;
  this.cpu = $cpu$jscomp$12_io$jscomp$2$$;
  this.ints = 4;
  this.line_control = this.baud_rate = 0;
  this.lsr = 96;
  this.ier = this.fifo_control = 0;
  this.iir = 1;
  this.irq = this.scratch_register = this.modem_status = this.modem_control = 0;
  this.input = [];
  this.current_line = "";
  switch($port$jscomp$1$$) {
    case 1016:
      this.com = 0;
      this.irq = 4;
      break;
    case 760:
      this.com = 1;
      this.irq = 3;
      break;
    case 1E3:
      this.com = 2;
      this.irq = 4;
      break;
    case 744:
      this.irq = this.com = 3;
      break;
    default:
      $dbg_log$$("Invalid serial port: " + $h$$($port$jscomp$1$$), 16384), this.com = 0, this.irq = 4;
  }
  this.bus.register("serial" + this.com + "-input", function($data$jscomp$124$$) {
    this.data_received($data$jscomp$124$$);
  }, this);
  this.bus.register("serial" + this.com + "-modem-status-input", function($data$jscomp$125$$) {
    this.set_modem_status($data$jscomp$125$$);
  }, this);
  this.bus.register("serial" + this.com + "-carrier-detect-input", function($data$jscomp$126$$) {
    this.set_modem_status($data$jscomp$126$$ ? this.modem_status | 136 : this.modem_status & -137);
  }, this);
  this.bus.register("serial" + this.com + "-ring-indicator-input", function($data$jscomp$127$$) {
    this.set_modem_status($data$jscomp$127$$ ? this.modem_status | 68 : this.modem_status & -69);
  }, this);
  this.bus.register("serial" + this.com + "-data-set-ready-input", function($data$jscomp$128$$) {
    this.set_modem_status($data$jscomp$128$$ ? this.modem_status | 34 : this.modem_status & -35);
  }, this);
  this.bus.register("serial" + this.com + "-clear-to-send-input", function($data$jscomp$129$$) {
    this.set_modem_status($data$jscomp$129$$ ? this.modem_status | 17 : this.modem_status & -18);
  }, this);
  $cpu$jscomp$12_io$jscomp$2$$ = $cpu$jscomp$12_io$jscomp$2$$.io;
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$, this, function($out_byte$jscomp$5$$) {
    this.write_data($out_byte$jscomp$5$$);
  }, function($out_word$$) {
    this.write_data($out_word$$ & 255);
    this.write_data($out_word$$ >> 8);
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$ | 1, this, function($out_byte$jscomp$6$$) {
    this.line_control & 128 ? (this.baud_rate = this.baud_rate & 255 | $out_byte$jscomp$6$$ << 8, $dbg_log$$("baud rate: " + $h$$(this.baud_rate), 16384)) : (0 === (this.ier & 2) && $out_byte$jscomp$6$$ & 2 && this.ThrowInterrupt(2), this.ier = $out_byte$jscomp$6$$ & 15, $dbg_log$$("interrupt enable: " + $h$$($out_byte$jscomp$6$$), 16384), this.CheckInterrupt());
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$, this, function() {
    if (this.line_control & 128) {
      return this.baud_rate & 255;
    }
    let $data$jscomp$130$$ = 0;
    0 === this.input.length ? $dbg_log$$("Read input empty", 16384) : ($data$jscomp$130$$ = this.input.shift(), $dbg_log$$("Read input: " + $h$$($data$jscomp$130$$), 16384));
    0 === this.input.length && (this.lsr &= -2, this.ClearInterrupt(12), this.ClearInterrupt(4));
    return $data$jscomp$130$$;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$ | 1, this, function() {
    return this.line_control & 128 ? this.baud_rate >> 8 : this.ier & 15;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$ | 2, this, function() {
    var $ret$jscomp$2$$ = this.iir & 15;
    $dbg_log$$("read interrupt identification: " + $h$$(this.iir), 16384);
    2 === this.iir && this.ClearInterrupt(2);
    this.fifo_control & 1 && ($ret$jscomp$2$$ |= 192);
    return $ret$jscomp$2$$;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$ | 2, this, function($out_byte$jscomp$7$$) {
    $dbg_log$$("fifo control: " + $h$$($out_byte$jscomp$7$$), 16384);
    this.fifo_control = $out_byte$jscomp$7$$;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$ | 3, this, function() {
    $dbg_log$$("read line control: " + $h$$(this.line_control), 16384);
    return this.line_control;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$ | 3, this, function($out_byte$jscomp$8$$) {
    $dbg_log$$("line control: " + $h$$($out_byte$jscomp$8$$), 16384);
    this.line_control = $out_byte$jscomp$8$$;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$ | 4, this, function() {
    return this.modem_control;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$ | 4, this, function($out_byte$jscomp$9$$) {
    $dbg_log$$("modem control: " + $h$$($out_byte$jscomp$9$$), 16384);
    this.modem_control = $out_byte$jscomp$9$$;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$ | 5, this, function() {
    $dbg_log$$("read line status: " + $h$$(this.lsr), 16384);
    return this.lsr;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$ | 5, this, function() {
    $dbg_log$$("Factory test write", 16384);
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$ | 6, this, function() {
    $dbg_log$$("read modem status: " + $h$$(this.modem_status), 16384);
    return this.modem_status &= 240;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$ | 6, this, function($out_byte$jscomp$11$$) {
    $dbg_log$$("write modem status: " + $h$$($out_byte$jscomp$11$$), 16384);
    this.set_modem_status($out_byte$jscomp$11$$);
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_read($port$jscomp$1$$ | 7, this, function() {
    return this.scratch_register;
  });
  $cpu$jscomp$12_io$jscomp$2$$.register_write($port$jscomp$1$$ | 7, this, function($out_byte$jscomp$12$$) {
    this.scratch_register = $out_byte$jscomp$12$$;
  });
}
$UART$$.prototype.get_state = function() {
  var $state$jscomp$25$$ = [];
  $state$jscomp$25$$[0] = this.ints;
  $state$jscomp$25$$[1] = this.baud_rate;
  $state$jscomp$25$$[2] = this.line_control;
  $state$jscomp$25$$[3] = this.lsr;
  $state$jscomp$25$$[4] = this.fifo_control;
  $state$jscomp$25$$[5] = this.ier;
  $state$jscomp$25$$[6] = this.iir;
  $state$jscomp$25$$[7] = this.modem_control;
  $state$jscomp$25$$[8] = this.modem_status;
  $state$jscomp$25$$[9] = this.scratch_register;
  $state$jscomp$25$$[10] = this.irq;
  return $state$jscomp$25$$;
};
$UART$$.prototype.set_state = function($state$jscomp$26$$) {
  this.ints = $state$jscomp$26$$[0];
  this.baud_rate = $state$jscomp$26$$[1];
  this.line_control = $state$jscomp$26$$[2];
  this.lsr = $state$jscomp$26$$[3];
  this.fifo_control = $state$jscomp$26$$[4];
  this.ier = $state$jscomp$26$$[5];
  this.iir = $state$jscomp$26$$[6];
  this.modem_control = $state$jscomp$26$$[7];
  this.modem_status = $state$jscomp$26$$[8];
  this.scratch_register = $state$jscomp$26$$[9];
  this.irq = $state$jscomp$26$$[10];
};
$UART$$.prototype.CheckInterrupt = function() {
  this.ints & 4096 && this.ier & 1 ? (this.iir = 12, this.cpu.device_raise_irq(this.irq)) : this.ints & 16 && this.ier & 1 ? (this.iir = 4, this.cpu.device_raise_irq(this.irq)) : this.ints & 4 && this.ier & 2 ? (this.iir = 2, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 && this.ier & 8 ? (this.iir = 0, this.cpu.device_raise_irq(this.irq)) : (this.iir = 1, this.cpu.device_lower_irq(this.irq));
};
$UART$$.prototype.ThrowInterrupt = function($line$jscomp$3$$) {
  this.ints |= 1 << $line$jscomp$3$$;
  this.CheckInterrupt();
};
$UART$$.prototype.ClearInterrupt = function($line$jscomp$4$$) {
  this.ints &= ~(1 << $line$jscomp$4$$);
  this.CheckInterrupt();
};
$UART$$.prototype.data_received = function($data$jscomp$131$$) {
  $dbg_log$$("input: " + $h$$($data$jscomp$131$$), 16384);
  this.input.push($data$jscomp$131$$);
  this.lsr |= 1;
  this.fifo_control & 1 ? this.ThrowInterrupt(12) : this.ThrowInterrupt(4);
};
$UART$$.prototype.write_data = function($char_line$jscomp$5_out_byte$jscomp$13$$) {
  this.line_control & 128 ? this.baud_rate = this.baud_rate & -256 | $char_line$jscomp$5_out_byte$jscomp$13$$ : ($dbg_log$$("data: " + $h$$($char_line$jscomp$5_out_byte$jscomp$13$$), 16384), this.ThrowInterrupt(2), this.bus.send("serial" + this.com + "-output-byte", $char_line$jscomp$5_out_byte$jscomp$13$$), $char_line$jscomp$5_out_byte$jscomp$13$$ = String.fromCharCode($char_line$jscomp$5_out_byte$jscomp$13$$), this.current_line += $char_line$jscomp$5_out_byte$jscomp$13$$, "\n" === $char_line$jscomp$5_out_byte$jscomp$13$$ && 
  ($char_line$jscomp$5_out_byte$jscomp$13$$ = this.current_line.trimRight().replace(/[\x00-\x08\x0b-\x1f\x7f\x80-\xff]/g, ""), $dbg_log$$("SERIAL: " + $char_line$jscomp$5_out_byte$jscomp$13$$), this.current_line = ""));
};
$UART$$.prototype.set_modem_status = function($status$jscomp$4$$) {
  $dbg_log$$("modem status: " + $h$$($status$jscomp$4$$), 16384);
  const $prev_delta_bits$$ = this.modem_status & 15;
  let $delta$jscomp$3$$ = (this.modem_status ^ $status$jscomp$4$$) >> 4;
  this.modem_status = $status$jscomp$4$$;
  this.modem_status = this.modem_status | $delta$jscomp$3$$ | $prev_delta_bits$$;
};
function $ACPI$$($cpu$jscomp$13$$) {
  this.cpu = $cpu$jscomp$13$$;
  var $io$jscomp$3$$ = $cpu$jscomp$13$$.io;
  $cpu$jscomp$13$$.devices.pci.register_device({pci_id:56, pci_space:[134, 128, 19, 113, 7, 0, 128, 2, 8, 0, 128, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, ], pci_bars:[], name:"acpi", });
  this.timer_imprecision_offset = this.timer_last_value = 0;
  this.status = 1;
  this.pm1_enable = this.pm1_status = 0;
  this.last_timer = this.get_timer($v86$$.microtick());
  this.gpe = new Uint8Array(4);
  $io$jscomp$3$$.register_read(45056, this, void 0, function() {
    $dbg_log$$("ACPI pm1_status read", 262144);
    return this.pm1_status;
  });
  $io$jscomp$3$$.register_write(45056, this, void 0, function($value$jscomp$140$$) {
    $dbg_log$$("ACPI pm1_status write: " + $h$$($value$jscomp$140$$, 4), 262144);
    this.pm1_status &= ~$value$jscomp$140$$;
  });
  $io$jscomp$3$$.register_read(45058, this, void 0, function() {
    $dbg_log$$("ACPI pm1_enable read", 262144);
    return this.pm1_enable;
  });
  $io$jscomp$3$$.register_write(45058, this, void 0, function($value$jscomp$141$$) {
    $dbg_log$$("ACPI pm1_enable write: " + $h$$($value$jscomp$141$$), 262144);
    this.pm1_enable = $value$jscomp$141$$;
  });
  $io$jscomp$3$$.register_read(45060, this, void 0, function() {
    $dbg_log$$("ACPI status read", 262144);
    return this.status;
  });
  $io$jscomp$3$$.register_write(45060, this, void 0, function($value$jscomp$142$$) {
    $dbg_log$$("ACPI status write: " + $h$$($value$jscomp$142$$), 262144);
    this.status = $value$jscomp$142$$;
  });
  $io$jscomp$3$$.register_read(45064, this, void 0, void 0, function() {
    return this.get_timer($v86$$.microtick()) & 16777215;
  });
  $io$jscomp$3$$.register_read(45024, this, function() {
    $dbg_log$$("Read gpe#0", 262144);
    return this.gpe[0];
  });
  $io$jscomp$3$$.register_read(45025, this, function() {
    $dbg_log$$("Read gpe#1", 262144);
    return this.gpe[1];
  });
  $io$jscomp$3$$.register_read(45026, this, function() {
    $dbg_log$$("Read gpe#2", 262144);
    return this.gpe[2];
  });
  $io$jscomp$3$$.register_read(45027, this, function() {
    $dbg_log$$("Read gpe#3", 262144);
    return this.gpe[3];
  });
  $io$jscomp$3$$.register_write(45024, this, function($value$jscomp$144$$) {
    $dbg_log$$("Write gpe#0: " + $h$$($value$jscomp$144$$), 262144);
    this.gpe[0] = $value$jscomp$144$$;
  });
  $io$jscomp$3$$.register_write(45025, this, function($value$jscomp$145$$) {
    $dbg_log$$("Write gpe#1: " + $h$$($value$jscomp$145$$), 262144);
    this.gpe[1] = $value$jscomp$145$$;
  });
  $io$jscomp$3$$.register_write(45026, this, function($value$jscomp$146$$) {
    $dbg_log$$("Write gpe#2: " + $h$$($value$jscomp$146$$), 262144);
    this.gpe[2] = $value$jscomp$146$$;
  });
  $io$jscomp$3$$.register_write(45027, this, function($value$jscomp$147$$) {
    $dbg_log$$("Write gpe#3: " + $h$$($value$jscomp$147$$), 262144);
    this.gpe[3] = $value$jscomp$147$$;
  });
}
$ACPI$$.prototype.timer = function($now$jscomp$6_timer$$) {
  $now$jscomp$6_timer$$ = this.get_timer($now$jscomp$6_timer$$);
  var $highest_bit_changed$$ = 0 !== (($now$jscomp$6_timer$$ ^ this.last_timer) & 8388608);
  this.pm1_enable & 1 && $highest_bit_changed$$ ? ($dbg_log$$("ACPI raise irq", 262144), this.pm1_status |= 1, this.cpu.device_raise_irq(9)) : this.cpu.device_lower_irq(9);
  this.last_timer = $now$jscomp$6_timer$$;
  return 100;
};
$ACPI$$.prototype.get_timer = function($now$jscomp$7_t$jscomp$11$$) {
  $now$jscomp$7_t$jscomp$11$$ = Math.round(3579.545 * $now$jscomp$7_t$jscomp$11$$);
  $now$jscomp$7_t$jscomp$11$$ === this.timer_last_value ? 3579.545 > this.timer_imprecision_offset && this.timer_imprecision_offset++ : ($dbg_assert$$($now$jscomp$7_t$jscomp$11$$ > this.timer_last_value), this.timer_last_value + this.timer_imprecision_offset <= $now$jscomp$7_t$jscomp$11$$ ? (this.timer_imprecision_offset = 0, this.timer_last_value = $now$jscomp$7_t$jscomp$11$$) : $dbg_log$$("Warning: Overshot pmtimer, waiting; current=" + $now$jscomp$7_t$jscomp$11$$ + " last=" + this.timer_last_value + 
  " offset=" + this.timer_imprecision_offset, 262144));
  return this.timer_last_value + this.timer_imprecision_offset;
};
$ACPI$$.prototype.get_state = function() {
  var $state$jscomp$27$$ = [];
  $state$jscomp$27$$[0] = this.status;
  $state$jscomp$27$$[1] = this.pm1_status;
  $state$jscomp$27$$[2] = this.pm1_enable;
  $state$jscomp$27$$[3] = this.gpe;
  return $state$jscomp$27$$;
};
$ACPI$$.prototype.set_state = function($state$jscomp$28$$) {
  this.status = $state$jscomp$28$$[0];
  this.pm1_status = $state$jscomp$28$$[1];
  this.pm1_enable = $state$jscomp$28$$[2];
  this.gpe = $state$jscomp$28$$[3];
};
var $DELIVERY_MODES$$ = "Fixed (0);Lowest Prio (1);SMI (2);Reserved (3);NMI (4);INIT (5);Reserved (6);ExtINT (7)".split(";"), $DESTINATION_MODES$$ = ["physical", "logical"];
function $APIC$$($cpu$jscomp$14$$) {
  this.cpu = $cpu$jscomp$14$$;
  this.timer_divider = this.apic_id = 0;
  this.timer_divider_shift = 1;
  this.timer_current_count = this.timer_initial_count = 0;
  this.next_tick = $v86$$.microtick();
  this.lvt_error = this.lvt_int1 = this.lvt_int0 = this.lvt_perf_counter = this.lvt_timer = 65536;
  this.icr1 = this.icr0 = this.tpr = 0;
  this.irr = new Int32Array(8);
  this.isr = new Int32Array(8);
  this.tmr = new Int32Array(8);
  this.spurious_vector = 254;
  this.destination_format = -1;
  this.read_error = this.error = this.local_destination = 0;
  $cpu$jscomp$14$$.io.mmap_register(4276092928, 1048576, $addr$jscomp$34$$ => {
    $dbg_log$$("Unsupported read8 from apic: " + $h$$($addr$jscomp$34$$ >>> 0), 524288);
    var $off$$ = $addr$jscomp$34$$ & 3;
    return this.read32($addr$jscomp$34$$ & -4) >> 8 * $off$$ & 255;
  }, ($addr$jscomp$35$$, $value$jscomp$148$$) => {
    $dbg_log$$("Unsupported write8 from apic: " + $h$$($addr$jscomp$35$$) + " <- " + $h$$($value$jscomp$148$$), 524288);
    $dbg_log$$(Error().stack, void 0);
    $dbg_assert$$(!1);
  }, $addr$jscomp$36$$ => this.read32($addr$jscomp$36$$), ($addr$jscomp$37$$, $value$jscomp$149$$) => this.write32($addr$jscomp$37$$, $value$jscomp$149$$));
}
$APIC$$.prototype.read32 = function($addr$jscomp$38_index$jscomp$87$$) {
  $addr$jscomp$38_index$jscomp$87$$ = $addr$jscomp$38_index$jscomp$87$$ - 4276092928 | 0;
  switch($addr$jscomp$38_index$jscomp$87$$) {
    case 32:
      return $dbg_log$$("APIC read id", 524288), this.apic_id;
    case 48:
      return $dbg_log$$("APIC read version", 524288), 327700;
    case 128:
      return this.tpr;
    case 208:
      return $dbg_log$$("Read local destination", 524288), this.local_destination;
    case 224:
      return $dbg_log$$("Read destination format", 524288), this.destination_format;
    case 240:
      return this.spurious_vector;
    case 256:
    case 272:
    case 288:
    case 304:
    case 320:
    case 336:
    case 352:
    case 368:
      return $addr$jscomp$38_index$jscomp$87$$ = $addr$jscomp$38_index$jscomp$87$$ - 256 >> 4, $dbg_log$$("Read isr " + $addr$jscomp$38_index$jscomp$87$$ + ": " + $h$$(this.isr[$addr$jscomp$38_index$jscomp$87$$] >>> 0, 8), 524288), this.isr[$addr$jscomp$38_index$jscomp$87$$];
    case 384:
    case 400:
    case 416:
    case 432:
    case 448:
    case 464:
    case 480:
    case 496:
      return $addr$jscomp$38_index$jscomp$87$$ = $addr$jscomp$38_index$jscomp$87$$ - 384 >> 4, $dbg_log$$("Read tmr " + $addr$jscomp$38_index$jscomp$87$$ + ": " + $h$$(this.tmr[$addr$jscomp$38_index$jscomp$87$$] >>> 0, 8), 524288), this.tmr[$addr$jscomp$38_index$jscomp$87$$];
    case 512:
    case 528:
    case 544:
    case 560:
    case 576:
    case 592:
    case 608:
    case 624:
      return $addr$jscomp$38_index$jscomp$87$$ = $addr$jscomp$38_index$jscomp$87$$ - 512 >> 4, $dbg_log$$("Read irr " + $addr$jscomp$38_index$jscomp$87$$ + ": " + $h$$(this.irr[$addr$jscomp$38_index$jscomp$87$$] >>> 0, 8), 524288), this.irr[$addr$jscomp$38_index$jscomp$87$$];
    case 640:
      return $dbg_log$$("Read error: " + $h$$(this.read_error >>> 0, 8), 524288), this.read_error;
    case 768:
      return this.icr0;
    case 784:
      return $dbg_log$$("APIC read icr1", 524288), this.icr1;
    case 800:
      return $dbg_log$$("read timer lvt", 524288), this.lvt_timer;
    case 832:
      return $dbg_log$$("read lvt perf counter", 524288), this.lvt_perf_counter;
    case 848:
      return $dbg_log$$("read lvt int0", 524288), this.lvt_int0;
    case 864:
      return $dbg_log$$("read lvt int1", 524288), this.lvt_int1;
    case 880:
      return $dbg_log$$("read lvt error", 524288), this.lvt_error;
    case 992:
      return $dbg_log$$("read timer divider", 524288), this.timer_divider;
    case 896:
      return $dbg_log$$("read timer initial count", 524288), this.timer_initial_count;
    case 912:
      return $dbg_log$$("read timer current count: " + $h$$(this.timer_current_count >>> 0, 8), 524288), this.timer_current_count;
    default:
      return $dbg_log$$("APIC read " + $h$$($addr$jscomp$38_index$jscomp$87$$), 524288), $dbg_assert$$(!1), 0;
  }
};
$APIC$$.prototype.write32 = function($addr$jscomp$39_vector$$, $divide_shift_highest_isr_value$jscomp$150$$) {
  $addr$jscomp$39_vector$$ = $addr$jscomp$39_vector$$ - 4276092928 | 0;
  switch($addr$jscomp$39_vector$$) {
    case 32:
      $dbg_log$$("APIC write id: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 8, 8), 524288);
      this.apic_id = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 48:
      $dbg_log$$("APIC write version: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8) + ", ignored", 524288);
      break;
    case 128:
      this.tpr = $divide_shift_highest_isr_value$jscomp$150$$ & 255;
      this.check_vector();
      break;
    case 176:
      $divide_shift_highest_isr_value$jscomp$150$$ = this.highest_isr();
      -1 !== $divide_shift_highest_isr_value$jscomp$150$$ ? (this.register_clear_bit(this.isr, $divide_shift_highest_isr_value$jscomp$150$$), this.register_get_bit(this.tmr, $divide_shift_highest_isr_value$jscomp$150$$) && this.cpu.devices.ioapic.remote_eoi($divide_shift_highest_isr_value$jscomp$150$$), this.check_vector()) : $dbg_log$$("Bad eoi: No isr set", 524288);
      break;
    case 208:
      $dbg_log$$("Set local destination: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.local_destination = $divide_shift_highest_isr_value$jscomp$150$$ & 4278190080;
      break;
    case 224:
      $dbg_log$$("Set destination format: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.destination_format = $divide_shift_highest_isr_value$jscomp$150$$ | 16777215;
      break;
    case 240:
      $dbg_log$$("Set spurious vector: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.spurious_vector = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 640:
      $dbg_log$$("Write error: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.read_error = this.error;
      this.error = 0;
      break;
    case 768:
      $addr$jscomp$39_vector$$ = $divide_shift_highest_isr_value$jscomp$150$$ & 255;
      var $delivery_mode$$ = $divide_shift_highest_isr_value$jscomp$150$$ >> 8 & 7, $destination_mode$$ = $divide_shift_highest_isr_value$jscomp$150$$ >> 11 & 1, $is_level$$ = $divide_shift_highest_isr_value$jscomp$150$$ >> 15 & 1, $destination_shorthand$$ = $divide_shift_highest_isr_value$jscomp$150$$ >> 18 & 3, $destination$jscomp$3$$ = this.icr1 >>> 24;
      $dbg_log$$("APIC write icr0: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$, 8) + " vector=" + $h$$($addr$jscomp$39_vector$$, 2) + " destination_mode=" + $DESTINATION_MODES$$[$destination_mode$$] + " delivery_mode=" + $DELIVERY_MODES$$[$delivery_mode$$] + " destination_shorthand=" + ["no", "self", "all with self", "all without self"][$destination_shorthand$$], 524288);
      this.icr0 = $divide_shift_highest_isr_value$jscomp$150$$ & -4097;
      0 === $destination_shorthand$$ ? this.route($addr$jscomp$39_vector$$, $delivery_mode$$, $is_level$$, $destination$jscomp$3$$, $destination_mode$$) : 1 === $destination_shorthand$$ ? this.deliver($addr$jscomp$39_vector$$, 0, $is_level$$) : 2 === $destination_shorthand$$ ? this.deliver($addr$jscomp$39_vector$$, $delivery_mode$$, $is_level$$) : 3 !== $destination_shorthand$$ && $dbg_assert$$(!1);
      break;
    case 784:
      $dbg_log$$("APIC write icr1: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.icr1 = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 800:
      $dbg_log$$("timer lvt: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.lvt_timer = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 832:
      $dbg_log$$("lvt perf counter: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.lvt_perf_counter = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 848:
      $dbg_log$$("lvt int0: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.lvt_int0 = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 864:
      $dbg_log$$("lvt int1: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.lvt_int1 = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 880:
      $dbg_log$$("lvt error: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.lvt_error = $divide_shift_highest_isr_value$jscomp$150$$;
      break;
    case 992:
      $dbg_log$$("timer divider: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.timer_divider = $divide_shift_highest_isr_value$jscomp$150$$;
      $divide_shift_highest_isr_value$jscomp$150$$ = $divide_shift_highest_isr_value$jscomp$150$$ & 3 | ($divide_shift_highest_isr_value$jscomp$150$$ & 8) >> 1;
      this.timer_divider_shift = 7 === $divide_shift_highest_isr_value$jscomp$150$$ ? 0 : $divide_shift_highest_isr_value$jscomp$150$$ + 1;
      break;
    case 896:
      $dbg_log$$("timer initial: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      this.timer_initial_count = $divide_shift_highest_isr_value$jscomp$150$$ >>> 0;
      this.timer_current_count = $divide_shift_highest_isr_value$jscomp$150$$ >>> 0;
      this.next_tick = $v86$$.microtick();
      this.timer_active = !0;
      break;
    case 912:
      $dbg_log$$("timer current: " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288);
      $dbg_assert$$(!1, "read-only register");
      break;
    default:
      $dbg_log$$("APIC write32 " + $h$$($addr$jscomp$39_vector$$) + " <- " + $h$$($divide_shift_highest_isr_value$jscomp$150$$ >>> 0, 8), 524288), $dbg_assert$$(!1);
  }
};
$APIC$$.prototype.timer = function($mode$jscomp$19_now$jscomp$8_steps$$) {
  if (0 === this.timer_current_count) {
    return 100;
  }
  const $freq$$ = 1E6 / (1 << this.timer_divider_shift);
  $mode$jscomp$19_now$jscomp$8_steps$$ = ($mode$jscomp$19_now$jscomp$8_steps$$ - this.next_tick) * $freq$$ >>> 0;
  this.next_tick += $mode$jscomp$19_now$jscomp$8_steps$$ / $freq$$;
  this.timer_current_count -= $mode$jscomp$19_now$jscomp$8_steps$$;
  0 >= this.timer_current_count && ($mode$jscomp$19_now$jscomp$8_steps$$ = this.lvt_timer & 393216, 131072 === $mode$jscomp$19_now$jscomp$8_steps$$ ? (this.timer_current_count %= this.timer_initial_count, 0 >= this.timer_current_count && (this.timer_current_count += this.timer_initial_count), $dbg_assert$$(0 !== this.timer_current_count), 0 === (this.lvt_timer & 65536) && this.deliver(this.lvt_timer & 255, 0, !1)) : 0 === $mode$jscomp$19_now$jscomp$8_steps$$ && (this.timer_current_count = 0, $dbg_log$$("APIC timer one shot end", 
  524288), 0 === (this.lvt_timer & 65536) && this.deliver(this.lvt_timer & 255, 0, !1)));
  return Math.max(0, this.timer_current_count / $freq$$);
};
$APIC$$.prototype.route = function($vector$jscomp$1$$, $mode$jscomp$20$$, $is_level$jscomp$1$$) {
  this.deliver($vector$jscomp$1$$, $mode$jscomp$20$$, $is_level$jscomp$1$$);
};
$APIC$$.prototype.deliver = function($vector$jscomp$2$$, $mode$jscomp$21$$, $is_level$jscomp$2$$) {
  5 !== $mode$jscomp$21$$ && 4 !== $mode$jscomp$21$$ && ((16 > $vector$jscomp$2$$ || 255 === $vector$jscomp$2$$) && $dbg_assert$$(!1, "TODO: Invalid vector"), this.register_get_bit(this.irr, $vector$jscomp$2$$) ? $dbg_log$$("Not delivered: irr already set, vector=" + $h$$($vector$jscomp$2$$, 2), 524288) : (this.register_set_bit(this.irr, $vector$jscomp$2$$), $is_level$jscomp$2$$ ? this.register_set_bit(this.tmr, $vector$jscomp$2$$) : this.register_clear_bit(this.tmr, $vector$jscomp$2$$), this.check_vector()));
};
$APIC$$.prototype.highest_irr = function() {
  var $highest$$ = this.register_get_highest_bit(this.irr);
  $dbg_assert$$(255 !== $highest$$);
  $dbg_assert$$(16 <= $highest$$ || -1 === $highest$$);
  return $highest$$;
};
$APIC$$.prototype.highest_isr = function() {
  var $highest$jscomp$1$$ = this.register_get_highest_bit(this.isr);
  $dbg_assert$$(255 !== $highest$jscomp$1$$);
  $dbg_assert$$(16 <= $highest$jscomp$1$$ || -1 === $highest$jscomp$1$$);
  return $highest$jscomp$1$$;
};
$APIC$$.prototype.check_vector = function() {
  var $highest_irr$$ = this.highest_irr();
  -1 !== $highest_irr$$ && (this.highest_isr() >= $highest_irr$$ || ($highest_irr$$ & 240) <= (this.tpr & 240) || this.cpu.handle_irqs());
};
$APIC$$.prototype.acknowledge_irq = function() {
  var $highest_irr$jscomp$1$$ = this.highest_irr();
  if (-1 === $highest_irr$jscomp$1$$ || this.highest_isr() >= $highest_irr$jscomp$1$$ || ($highest_irr$jscomp$1$$ & 240) <= (this.tpr & 240)) {
    return -1;
  }
  this.register_clear_bit(this.irr, $highest_irr$jscomp$1$$);
  this.register_set_bit(this.isr, $highest_irr$jscomp$1$$);
  this.check_vector();
  return $highest_irr$jscomp$1$$;
};
$APIC$$.prototype.get_state = function() {
  var $state$jscomp$29$$ = [];
  $state$jscomp$29$$[0] = this.apic_id;
  $state$jscomp$29$$[1] = this.timer_divider;
  $state$jscomp$29$$[2] = this.timer_divider_shift;
  $state$jscomp$29$$[3] = this.timer_initial_count;
  $state$jscomp$29$$[4] = this.timer_current_count;
  $state$jscomp$29$$[5] = this.next_tick;
  $state$jscomp$29$$[6] = this.lvt_timer;
  $state$jscomp$29$$[7] = this.lvt_perf_counter;
  $state$jscomp$29$$[8] = this.lvt_int0;
  $state$jscomp$29$$[9] = this.lvt_int1;
  $state$jscomp$29$$[10] = this.lvt_error;
  $state$jscomp$29$$[11] = this.tpr;
  $state$jscomp$29$$[12] = this.icr0;
  $state$jscomp$29$$[13] = this.icr1;
  $state$jscomp$29$$[14] = this.irr;
  $state$jscomp$29$$[15] = this.isr;
  $state$jscomp$29$$[16] = this.tmr;
  $state$jscomp$29$$[17] = this.spurious_vector;
  $state$jscomp$29$$[18] = this.destination_format;
  $state$jscomp$29$$[19] = this.local_destination;
  $state$jscomp$29$$[20] = this.error;
  $state$jscomp$29$$[21] = this.read_error;
  return $state$jscomp$29$$;
};
$APIC$$.prototype.set_state = function($state$jscomp$30$$) {
  this.apic_id = $state$jscomp$30$$[0];
  this.timer_divider = $state$jscomp$30$$[1];
  this.timer_divider_shift = $state$jscomp$30$$[2];
  this.timer_initial_count = $state$jscomp$30$$[3];
  this.timer_current_count = $state$jscomp$30$$[4];
  this.next_tick = $state$jscomp$30$$[5];
  this.lvt_timer = $state$jscomp$30$$[6];
  this.lvt_perf_counter = $state$jscomp$30$$[7];
  this.lvt_int0 = $state$jscomp$30$$[8];
  this.lvt_int1 = $state$jscomp$30$$[9];
  this.lvt_error = $state$jscomp$30$$[10];
  this.tpr = $state$jscomp$30$$[11];
  this.icr0 = $state$jscomp$30$$[12];
  this.icr1 = $state$jscomp$30$$[13];
  this.irr = $state$jscomp$30$$[14];
  this.isr = $state$jscomp$30$$[15];
  this.tmr = $state$jscomp$30$$[16];
  this.spurious_vector = $state$jscomp$30$$[17];
  this.destination_format = $state$jscomp$30$$[18];
  this.local_destination = $state$jscomp$30$$[19];
  this.error = $state$jscomp$30$$[20];
  this.read_error = $state$jscomp$30$$[21];
};
$APIC$$.prototype.register_get_bit = function($v$$, $bit$$) {
  $dbg_assert$$(0 <= $bit$$ && 256 > $bit$$);
  return $v$$[$bit$$ >> 5] >> ($bit$$ & 31) & 1;
};
$APIC$$.prototype.register_set_bit = function($v$jscomp$1$$, $bit$jscomp$1$$) {
  $dbg_assert$$(0 <= $bit$jscomp$1$$ && 256 > $bit$jscomp$1$$);
  $v$jscomp$1$$[$bit$jscomp$1$$ >> 5] |= 1 << ($bit$jscomp$1$$ & 31);
};
$APIC$$.prototype.register_clear_bit = function($v$jscomp$2$$, $bit$jscomp$2$$) {
  $dbg_assert$$(0 <= $bit$jscomp$2$$ && 256 > $bit$jscomp$2$$);
  $v$jscomp$2$$[$bit$jscomp$2$$ >> 5] &= ~(1 << ($bit$jscomp$2$$ & 31));
};
$APIC$$.prototype.register_get_highest_bit = function($v$jscomp$3$$) {
  for (var $i$jscomp$37$$ = 7; 0 <= $i$jscomp$37$$; $i$jscomp$37$$--) {
    var $word$$ = $v$jscomp$3$$[$i$jscomp$37$$];
    if ($word$$) {
      return $v86util$$.int_log2($word$$ >>> 0) | $i$jscomp$37$$ << 5;
    }
  }
  return -1;
};
function $IOAPIC$$($cpu$jscomp$15$$) {
  this.cpu = $cpu$jscomp$15$$;
  this.ioredtbl_config = new Int32Array(24);
  this.ioredtbl_destination = new Int32Array(24);
  for (var $i$jscomp$38$$ = 0; $i$jscomp$38$$ < this.ioredtbl_config.length; $i$jscomp$38$$++) {
    this.ioredtbl_config[$i$jscomp$38$$] = 65536;
  }
  this.irq_value = this.irr = this.ioapic_id = this.ioregsel = 0;
  $dbg_assert$$(!0);
  $cpu$jscomp$15$$.io.mmap_register(4273995776, 131072, $addr$jscomp$40_byte$jscomp$1$$ => {
    $addr$jscomp$40_byte$jscomp$1$$ = $addr$jscomp$40_byte$jscomp$1$$ - 4273995776 | 0;
    if (16 <= $addr$jscomp$40_byte$jscomp$1$$ && 20 > $addr$jscomp$40_byte$jscomp$1$$) {
      return $addr$jscomp$40_byte$jscomp$1$$ -= 16, $dbg_log$$("ioapic read8 byte " + $addr$jscomp$40_byte$jscomp$1$$ + " " + $h$$(this.ioregsel), 524288), this.read(this.ioregsel) >> 8 * $addr$jscomp$40_byte$jscomp$1$$ & 255;
    }
    $dbg_log$$("Unexpected IOAPIC register read: " + $h$$($addr$jscomp$40_byte$jscomp$1$$ >>> 0), 524288);
    $dbg_assert$$(!1);
    return 0;
  }, $addr$jscomp$41$$ => {
    $dbg_assert$$(!1, "unsupported write8 from ioapic: " + $h$$($addr$jscomp$41$$ >>> 0));
  }, $addr$jscomp$42$$ => {
    $addr$jscomp$42$$ = $addr$jscomp$42$$ - 4273995776 | 0;
    if (0 === $addr$jscomp$42$$) {
      return this.ioregsel;
    }
    if (16 === $addr$jscomp$42$$) {
      return this.read(this.ioregsel);
    }
    $dbg_log$$("Unexpected IOAPIC register read: " + $h$$($addr$jscomp$42$$ >>> 0), 524288);
    $dbg_assert$$(!1);
    return 0;
  }, ($addr$jscomp$43$$, $value$jscomp$152$$) => {
    $addr$jscomp$43$$ = $addr$jscomp$43$$ - 4273995776 | 0;
    0 === $addr$jscomp$43$$ ? this.ioregsel = $value$jscomp$152$$ : 16 === $addr$jscomp$43$$ ? this.write(this.ioregsel, $value$jscomp$152$$) : ($dbg_log$$("Unexpected IOAPIC register write: " + $h$$($addr$jscomp$43$$ >>> 0) + " <- " + $h$$($value$jscomp$152$$ >>> 0, 8), 524288), $dbg_assert$$(!1));
  });
}
$IOAPIC$$.prototype.remote_eoi = function($vector$jscomp$3$$) {
  for (var $i$jscomp$39$$ = 0; 24 > $i$jscomp$39$$; $i$jscomp$39$$++) {
    var $config$jscomp$2$$ = this.ioredtbl_config[$i$jscomp$39$$];
    ($config$jscomp$2$$ & 255) === $vector$jscomp$3$$ && $config$jscomp$2$$ & 16384 && ($dbg_log$$("Clear remote IRR for irq=" + $h$$($i$jscomp$39$$), 524288), this.ioredtbl_config[$i$jscomp$39$$] &= -16385, this.check_irq($i$jscomp$39$$));
  }
};
$IOAPIC$$.prototype.check_irq = function($irq$jscomp$2$$) {
  var $mask$jscomp$8$$ = 1 << $irq$jscomp$2$$;
  if (0 !== (this.irr & $mask$jscomp$8$$)) {
    var $config$jscomp$3$$ = this.ioredtbl_config[$irq$jscomp$2$$];
    if (0 === ($config$jscomp$3$$ & 65536)) {
      var $delivery_mode$jscomp$1$$ = $config$jscomp$3$$ >> 8 & 7, $destination_mode$jscomp$2$$ = $config$jscomp$3$$ >> 11 & 1, $vector$jscomp$4$$ = $config$jscomp$3$$ & 255, $destination$jscomp$5$$ = this.ioredtbl_destination[$irq$jscomp$2$$] >>> 24, $is_level$jscomp$3$$ = 32768 === ($config$jscomp$3$$ & 32768);
      if (0 === ($config$jscomp$3$$ & 32768)) {
        this.irr &= ~$mask$jscomp$8$$;
      } else {
        if (this.ioredtbl_config[$irq$jscomp$2$$] |= 16384, $config$jscomp$3$$ & 16384) {
          $dbg_log$$("No route: level interrupt and remote IRR still set", 524288);
          return;
        }
      }
      0 === $delivery_mode$jscomp$1$$ || 1 === $delivery_mode$jscomp$1$$ ? this.cpu.devices.apic.route($vector$jscomp$4$$, $delivery_mode$jscomp$1$$, $is_level$jscomp$3$$, $destination$jscomp$5$$, $destination_mode$jscomp$2$$) : $dbg_assert$$(!1, "TODO");
      this.ioredtbl_config[$irq$jscomp$2$$] &= -4097;
    }
  }
};
$IOAPIC$$.prototype.set_irq = function($i$jscomp$40$$) {
  if (24 <= $i$jscomp$40$$) {
    $dbg_assert$$(!1, "Bad irq: " + $i$jscomp$40$$, 524288);
  } else {
    var $mask$jscomp$9$$ = 1 << $i$jscomp$40$$;
    0 === (this.irq_value & $mask$jscomp$9$$) && (this.irq_value |= $mask$jscomp$9$$, 65536 !== (this.ioredtbl_config[$i$jscomp$40$$] & 98304) && (this.irr |= $mask$jscomp$9$$, this.check_irq($i$jscomp$40$$)));
  }
};
$IOAPIC$$.prototype.clear_irq = function($i$jscomp$41$$) {
  if (24 <= $i$jscomp$41$$) {
    $dbg_assert$$(!1, "Bad irq: " + $i$jscomp$41$$, 524288);
  } else {
    var $mask$jscomp$10$$ = 1 << $i$jscomp$41$$;
    (this.irq_value & $mask$jscomp$10$$) === $mask$jscomp$10$$ && (this.irq_value &= ~$mask$jscomp$10$$, this.ioredtbl_config[$i$jscomp$41$$] & 32768 && (this.irr &= ~$mask$jscomp$10$$));
  }
};
$IOAPIC$$.prototype.read = function($reg$jscomp$1_value$jscomp$153$$) {
  if (0 === $reg$jscomp$1_value$jscomp$153$$) {
    return $dbg_log$$("IOAPIC Read id", 524288), this.ioapic_id << 24;
  }
  if (1 === $reg$jscomp$1_value$jscomp$153$$) {
    return $dbg_log$$("IOAPIC Read version", 524288), 1507345;
  }
  if (2 === $reg$jscomp$1_value$jscomp$153$$) {
    return $dbg_log$$("IOAPIC Read arbitration id", 524288), this.ioapic_id << 24;
  }
  if (16 <= $reg$jscomp$1_value$jscomp$153$$ && 64 > $reg$jscomp$1_value$jscomp$153$$) {
    var $irq$jscomp$3$$ = $reg$jscomp$1_value$jscomp$153$$ - 16 >> 1;
    $reg$jscomp$1_value$jscomp$153$$ & 1 ? ($reg$jscomp$1_value$jscomp$153$$ = this.ioredtbl_destination[$irq$jscomp$3$$], $dbg_log$$("IOAPIC Read destination irq=" + $h$$($irq$jscomp$3$$) + " -> " + $h$$($reg$jscomp$1_value$jscomp$153$$, 8), 524288)) : ($reg$jscomp$1_value$jscomp$153$$ = this.ioredtbl_config[$irq$jscomp$3$$], $dbg_log$$("IOAPIC Read config irq=" + $h$$($irq$jscomp$3$$) + " -> " + $h$$($reg$jscomp$1_value$jscomp$153$$, 8), 524288));
    return $reg$jscomp$1_value$jscomp$153$$;
  }
  $dbg_log$$("IOAPIC register read outside of range " + $h$$($reg$jscomp$1_value$jscomp$153$$), 524288);
  $dbg_assert$$(!1);
  return 0;
};
$IOAPIC$$.prototype.write = function($reg$jscomp$2_vector$jscomp$5$$, $value$jscomp$154$$) {
  if (0 === $reg$jscomp$2_vector$jscomp$5$$) {
    this.ioapic_id = $value$jscomp$154$$ >>> 24 & 15;
  } else {
    if (1 === $reg$jscomp$2_vector$jscomp$5$$ || 2 === $reg$jscomp$2_vector$jscomp$5$$) {
      $dbg_log$$("Invalid write: " + $reg$jscomp$2_vector$jscomp$5$$, 524288);
    } else {
      if (16 <= $reg$jscomp$2_vector$jscomp$5$$ && 64 > $reg$jscomp$2_vector$jscomp$5$$) {
        var $irq$jscomp$4$$ = $reg$jscomp$2_vector$jscomp$5$$ - 16 >> 1;
        if ($reg$jscomp$2_vector$jscomp$5$$ & 1) {
          this.ioredtbl_destination[$irq$jscomp$4$$] = $value$jscomp$154$$ & 4278190080, $dbg_log$$("Write destination " + $h$$($value$jscomp$154$$ >>> 0, 8) + " irq=" + $h$$($irq$jscomp$4$$) + " dest=" + $h$$($value$jscomp$154$$ >>> 24, 2), 524288);
        } else {
          this.ioredtbl_config[$irq$jscomp$4$$] = $value$jscomp$154$$ & 110591 | this.ioredtbl_config[$irq$jscomp$4$$] & -110592;
          $reg$jscomp$2_vector$jscomp$5$$ = $value$jscomp$154$$ & 255;
          var $delivery_mode$jscomp$2$$ = $value$jscomp$154$$ >> 8 & 7, $destination_mode$jscomp$3$$ = $value$jscomp$154$$ >> 11 & 1, $is_level$jscomp$4$$ = $value$jscomp$154$$ >> 15 & 1, $disabled$jscomp$1$$ = $value$jscomp$154$$ >> 16 & 1;
          $dbg_log$$("Write config " + $h$$($value$jscomp$154$$ >>> 0, 8) + " irq=" + $h$$($irq$jscomp$4$$) + " vector=" + $h$$($reg$jscomp$2_vector$jscomp$5$$, 2) + " deliverymode=" + $DELIVERY_MODES$$[$delivery_mode$jscomp$2$$] + " destmode=" + $DESTINATION_MODES$$[$destination_mode$jscomp$3$$] + " is_level=" + $is_level$jscomp$4$$ + " disabled=" + $disabled$jscomp$1$$, 524288);
          this.check_irq($irq$jscomp$4$$);
        }
      } else {
        $dbg_log$$("IOAPIC register write outside of range " + $h$$($reg$jscomp$2_vector$jscomp$5$$) + ": " + $h$$($value$jscomp$154$$ >>> 0, 8), 524288), $dbg_assert$$(!1);
      }
    }
  }
};
$IOAPIC$$.prototype.get_state = function() {
  var $state$jscomp$31$$ = [];
  $state$jscomp$31$$[0] = this.ioredtbl_config;
  $state$jscomp$31$$[1] = this.ioredtbl_destination;
  $state$jscomp$31$$[2] = this.ioregsel;
  $state$jscomp$31$$[3] = this.ioapic_id;
  $state$jscomp$31$$[4] = this.irr;
  $state$jscomp$31$$[5] = this.irq_value;
  return $state$jscomp$31$$;
};
$IOAPIC$$.prototype.set_state = function($state$jscomp$32$$) {
  this.ioredtbl_config = $state$jscomp$32$$[0];
  this.ioredtbl_destination = $state$jscomp$32$$[1];
  this.ioregsel = $state$jscomp$32$$[2];
  this.ioapic_id = $state$jscomp$32$$[3];
  this.irr = $state$jscomp$32$$[4];
  this.irq_value = $state$jscomp$32$$[5];
};
function $StateLoadError$$($msg$$) {
  this.message = $msg$$;
}
$StateLoadError$$.prototype = Error();
const $CONSTRUCTOR_TABLE$$ = {Uint8Array, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array, };
function $save_object$$($constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$, $saved_buffers$$) {
  if ("object" !== typeof $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$ || null === $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$) {
    return $dbg_assert$$("function" !== typeof $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$), $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$;
  }
  if ($constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$ instanceof Array) {
    return $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.map($x$jscomp$99$$ => $save_object$$($x$jscomp$99$$, $saved_buffers$$));
  }
  $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.constructor === Object && (console.log($constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$), $dbg_assert$$($constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.constructor !== Object, "Expected non-object"));
  if ($constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.BYTES_PER_ELEMENT) {
    var $buffer$jscomp$33_state$jscomp$33$$ = new Uint8Array($constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.buffer, $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.byteOffset, $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.length * $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.BYTES_PER_ELEMENT);
    $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$ = $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.constructor.name.replace("bound ", "");
    $dbg_assert$$($CONSTRUCTOR_TABLE$$[$constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$]);
    return {__state_type__:$constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$, buffer_id:$saved_buffers$$.push($buffer$jscomp$33_state$jscomp$33$$) - 1, };
  }
  !$constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.get_state && console.log("Object without get_state: ", $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$);
  $buffer$jscomp$33_state$jscomp$33$$ = $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$.get_state();
  $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$ = [];
  for (var $i$jscomp$42$$ = 0; $i$jscomp$42$$ < $buffer$jscomp$33_state$jscomp$33$$.length; $i$jscomp$42$$++) {
    var $value$jscomp$155$$ = $buffer$jscomp$33_state$jscomp$33$$[$i$jscomp$42$$];
    $dbg_assert$$("function" !== typeof $value$jscomp$155$$);
    $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$[$i$jscomp$42$$] = $save_object$$($value$jscomp$155$$, $saved_buffers$$);
  }
  return $constructor$jscomp$1_obj$jscomp$27_result$jscomp$7$$;
}
function $restore_buffers$$($obj$jscomp$28$$, $buffers$jscomp$2$$) {
  if ("object" !== typeof $obj$jscomp$28$$ || null === $obj$jscomp$28$$) {
    return $dbg_assert$$("function" !== typeof $obj$jscomp$28$$), $obj$jscomp$28$$;
  }
  if ($obj$jscomp$28$$ instanceof Array) {
    for ($i$jscomp$43_type$jscomp$151$$ = 0; $i$jscomp$43_type$jscomp$151$$ < $obj$jscomp$28$$.length; $i$jscomp$43_type$jscomp$151$$++) {
      $obj$jscomp$28$$[$i$jscomp$43_type$jscomp$151$$] = $restore_buffers$$($obj$jscomp$28$$[$i$jscomp$43_type$jscomp$151$$], $buffers$jscomp$2$$);
    }
    return $obj$jscomp$28$$;
  }
  var $i$jscomp$43_type$jscomp$151$$ = $obj$jscomp$28$$.__state_type__;
  $dbg_assert$$(void 0 !== $i$jscomp$43_type$jscomp$151$$);
  const $constructor$jscomp$2$$ = $CONSTRUCTOR_TABLE$$[$i$jscomp$43_type$jscomp$151$$];
  $dbg_assert$$($constructor$jscomp$2$$, "Unkown type: " + $i$jscomp$43_type$jscomp$151$$);
  return new $constructor$jscomp$2$$($buffers$jscomp$2$$[$obj$jscomp$28$$.buffer_id]);
}
$CPU$$.prototype.save_state = function() {
  for (var $saved_buffers$jscomp$1$$ = [], $info_block_info_object_state$jscomp$34$$ = $save_object$$(this, $saved_buffers$jscomp$1$$), $buffer_infos$$ = [], $result$jscomp$8_total_buffer_size$$ = 0, $buffer_block_start_i$jscomp$44$$ = 0; $buffer_block_start_i$jscomp$44$$ < $saved_buffers$jscomp$1$$.length; $buffer_block_start_i$jscomp$44$$++) {
    var $buffer_block_len$jscomp$16$$ = $saved_buffers$jscomp$1$$[$buffer_block_start_i$jscomp$44$$].byteLength;
    $buffer_infos$$[$buffer_block_start_i$jscomp$44$$] = {offset:$result$jscomp$8_total_buffer_size$$, length:$buffer_block_len$jscomp$16$$, };
    $result$jscomp$8_total_buffer_size$$ += $buffer_block_len$jscomp$16$$;
    $result$jscomp$8_total_buffer_size$$ = $result$jscomp$8_total_buffer_size$$ + 3 & -4;
  }
  $info_block_info_object_state$jscomp$34$$ = JSON.stringify({buffer_infos:$buffer_infos$$, state:$info_block_info_object_state$jscomp$34$$, });
  $info_block_info_object_state$jscomp$34$$ = (new TextEncoder).encode($info_block_info_object_state$jscomp$34$$);
  $buffer_block_start_i$jscomp$44$$ = 16 + $info_block_info_object_state$jscomp$34$$.length;
  $buffer_block_start_i$jscomp$44$$ = $buffer_block_start_i$jscomp$44$$ + 3 & -4;
  var $buffer$jscomp$35_total_size$$ = $buffer_block_start_i$jscomp$44$$ + $result$jscomp$8_total_buffer_size$$;
  $result$jscomp$8_total_buffer_size$$ = new ArrayBuffer($buffer$jscomp$35_total_size$$);
  var $header_block$$ = new Int32Array($result$jscomp$8_total_buffer_size$$, 0, 4);
  (new Uint8Array($result$jscomp$8_total_buffer_size$$, 16, $info_block_info_object_state$jscomp$34$$.length)).set($info_block_info_object_state$jscomp$34$$);
  $buffer_block_len$jscomp$16$$ = new Uint8Array($result$jscomp$8_total_buffer_size$$, $buffer_block_start_i$jscomp$44$$);
  $header_block$$[0] = -2039052682;
  $header_block$$[1] = 6;
  $header_block$$[2] = $buffer$jscomp$35_total_size$$;
  $header_block$$[3] = $info_block_info_object_state$jscomp$34$$.length;
  for ($buffer_block_start_i$jscomp$44$$ = 0; $buffer_block_start_i$jscomp$44$$ < $saved_buffers$jscomp$1$$.length; $buffer_block_start_i$jscomp$44$$++) {
    $buffer$jscomp$35_total_size$$ = $saved_buffers$jscomp$1$$[$buffer_block_start_i$jscomp$44$$], $dbg_assert$$($buffer$jscomp$35_total_size$$.constructor === Uint8Array), $buffer_block_len$jscomp$16$$.set($buffer$jscomp$35_total_size$$, $buffer_infos$$[$buffer_block_start_i$jscomp$44$$].offset);
  }
  $dbg_log$$("State: json size " + ($info_block_info_object_state$jscomp$34$$.byteLength >> 10) + "k");
  $dbg_log$$("State: Total buffers size " + ($buffer_block_len$jscomp$16$$.byteLength >> 10) + "k");
  return $result$jscomp$8_total_buffer_size$$;
};
$CPU$$.prototype.restore_state = function($state$jscomp$35$$) {
  function $read_state_header$$($header_block$jscomp$1_state$jscomp$36$$, $check_length$$) {
    const $len$jscomp$17$$ = $header_block$jscomp$1_state$jscomp$36$$.length;
    if (16 > $len$jscomp$17$$) {
      throw new $StateLoadError$$("Invalid length: " + $len$jscomp$17$$);
    }
    $header_block$jscomp$1_state$jscomp$36$$ = new Int32Array($header_block$jscomp$1_state$jscomp$36$$.buffer, $header_block$jscomp$1_state$jscomp$36$$.byteOffset, 4);
    if (-2039052682 !== $header_block$jscomp$1_state$jscomp$36$$[0]) {
      throw new $StateLoadError$$("Invalid header: " + $h$$($header_block$jscomp$1_state$jscomp$36$$[0] >>> 0));
    }
    if (6 !== $header_block$jscomp$1_state$jscomp$36$$[1]) {
      throw new $StateLoadError$$("Version mismatch: dump=" + $header_block$jscomp$1_state$jscomp$36$$[1] + " we=6");
    }
    if ($check_length$$ && $header_block$jscomp$1_state$jscomp$36$$[2] !== $len$jscomp$17$$) {
      throw new $StateLoadError$$("Length doesn't match header: real=" + $len$jscomp$17$$ + " header=" + $header_block$jscomp$1_state$jscomp$36$$[2]);
    }
    return $header_block$jscomp$1_state$jscomp$36$$[3];
  }
  function $read_info_block$$($info_block$jscomp$1_info_block_buffer$$) {
    $info_block$jscomp$1_info_block_buffer$$ = (new TextDecoder).decode($info_block$jscomp$1_info_block_buffer$$);
    return JSON.parse($info_block$jscomp$1_info_block_buffer$$);
  }
  $state$jscomp$35$$ = new Uint8Array($state$jscomp$35$$);
  if (4247762216 === (new Uint32Array($state$jscomp$35$$.buffer, 0, 1))[0]) {
    var $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$ = this.zstd_create_ctx($state$jscomp$35$$.length);
    (new Uint8Array(this.wasm_memory.buffer, this.zstd_get_src_ptr($buffers$jscomp$4_ctx_info_block_len$jscomp$1$$), $state$jscomp$35$$.length)).set($state$jscomp$35$$);
    var $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$jscomp$1$$, 16), $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$ = new Uint8Array(this.wasm_memory.buffer, $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$, 16), $info_block_len_position$jscomp$1$$ = $read_state_header$$($buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$, !1);
    this.zstd_read_free($buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$, 16);
    $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$jscomp$1$$, $info_block_len_position$jscomp$1$$);
    $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$ = new Uint8Array(this.wasm_memory.buffer, $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$, $info_block_len_position$jscomp$1$$);
    $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$ = $read_info_block$$($buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$);
    this.zstd_read_free($buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$, $info_block_len_position$jscomp$1$$);
    $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$ = $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$.state;
    var $buffer_infos$jscomp$1_front_padding$$ = $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$.buffer_infos;
    $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$ = [];
    $info_block_len_position$jscomp$1$$ = 16 + $info_block_len_position$jscomp$1$$;
    for (var $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$ of $buffer_infos$jscomp$1_front_padding$$) {
      $buffer_infos$jscomp$1_front_padding$$ = ($info_block_len_position$jscomp$1$$ + 3 & -4) - $info_block_len_position$jscomp$1$$;
      if (1048576 < $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length) {
        var $buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$jscomp$1$$, $buffer_infos$jscomp$1_front_padding$$);
        this.zstd_read_free($buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$, $buffer_infos$jscomp$1_front_padding$$);
        $buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$ = new Uint8Array($buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length);
        $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$.push($buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$.buffer);
        for (var $have_offset$jscomp$45$$ = 0; $have_offset$jscomp$45$$ < $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length;) {
          var $remaining_to_read$$ = $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length - $have_offset$jscomp$45$$;
          $dbg_assert$$(0 <= $remaining_to_read$$);
          $remaining_to_read$$ = Math.min($remaining_to_read$$, 1048576);
          const $ptr$jscomp$2$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$jscomp$1$$, $remaining_to_read$$);
          $buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$.set(new Uint8Array(this.wasm_memory.buffer, $ptr$jscomp$2$$, $remaining_to_read$$), $have_offset$jscomp$45$$);
          this.zstd_read_free($ptr$jscomp$2$$, $remaining_to_read$$);
          $have_offset$jscomp$45$$ += $remaining_to_read$$;
        }
      } else {
        $buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$jscomp$1$$, $buffer_infos$jscomp$1_front_padding$$ + $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length), $have_offset$jscomp$45$$ = $buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$ + $buffer_infos$jscomp$1_front_padding$$, $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$.push(this.wasm_memory.buffer.slice($have_offset$jscomp$45$$, $have_offset$jscomp$45$$ + 
        $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length)), this.zstd_read_free($buffer$jscomp$36_ptr$jscomp$1_ptr$jscomp$3$$, $buffer_infos$jscomp$1_front_padding$$ + $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length);
      }
      $info_block_len_position$jscomp$1$$ += $buffer_infos$jscomp$1_front_padding$$ + $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$.length;
    }
    $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$ = $restore_buffers$$($buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$, $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$jscomp$1_info_block_obj$$);
    this.set_state($buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$);
    this.zstd_free_ctx($buffers$jscomp$4_ctx_info_block_len$jscomp$1$$);
  } else {
    $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$ = $read_state_header$$($state$jscomp$35$$, !0);
    if (0 > $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$ || $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$ + 12 >= $state$jscomp$35$$.length) {
      throw new $StateLoadError$$("Invalid info block length: " + $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$);
    }
    $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$ = $state$jscomp$35$$.subarray(16, 16 + $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$);
    $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$ = $read_info_block$$($buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$);
    $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$ = $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$.state;
    $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$ = $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$.buffer_infos;
    let $buffer_block_start$jscomp$1$$ = 16 + $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$;
    $buffer_block_start$jscomp$1$$ = $buffer_block_start$jscomp$1$$ + 3 & -4;
    $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$ = $buffer_infos$jscomp$2_info_block_obj$jscomp$1_ptr_state_object$$.map($buffer_info$jscomp$1$$ => {
      const $offset$jscomp$46$$ = $buffer_block_start$jscomp$1$$ + $buffer_info$jscomp$1$$.offset;
      return $state$jscomp$35$$.buffer.slice($offset$jscomp$46$$, $offset$jscomp$46$$ + $buffer_info$jscomp$1$$.length);
    });
    $buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$ = $restore_buffers$$($buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$, $buffers$jscomp$4_ctx_info_block_len$jscomp$1$$);
    this.set_state($buffer_info_info_block_buffer$jscomp$2_state_object$jscomp$1$$);
  }
};
function $translate_mac_address$$($arp_packet_ipv4_packet_packet_udp_packet$$, $search_mac$$, $replacement_mac$$) {
  $arp_packet_ipv4_packet_packet_udp_packet$$[0] === $search_mac$$[0] && $arp_packet_ipv4_packet_packet_udp_packet$$[1] === $search_mac$$[1] && $arp_packet_ipv4_packet_packet_udp_packet$$[2] === $search_mac$$[2] && $arp_packet_ipv4_packet_packet_udp_packet$$[3] === $search_mac$$[3] && $arp_packet_ipv4_packet_packet_udp_packet$$[4] === $search_mac$$[4] && $arp_packet_ipv4_packet_packet_udp_packet$$[5] === $search_mac$$[5] && ($dbg_log$$("Replace mac in eth destination field", 1048576), $arp_packet_ipv4_packet_packet_udp_packet$$[0] = 
  $replacement_mac$$[0], $arp_packet_ipv4_packet_packet_udp_packet$$[1] = $replacement_mac$$[1], $arp_packet_ipv4_packet_packet_udp_packet$$[2] = $replacement_mac$$[2], $arp_packet_ipv4_packet_packet_udp_packet$$[3] = $replacement_mac$$[3], $arp_packet_ipv4_packet_packet_udp_packet$$[4] = $replacement_mac$$[4], $arp_packet_ipv4_packet_packet_udp_packet$$[5] = $replacement_mac$$[5]);
  $arp_packet_ipv4_packet_packet_udp_packet$$[6] === $search_mac$$[0] && $arp_packet_ipv4_packet_packet_udp_packet$$[7] === $search_mac$$[1] && $arp_packet_ipv4_packet_packet_udp_packet$$[8] === $search_mac$$[2] && $arp_packet_ipv4_packet_packet_udp_packet$$[9] === $search_mac$$[3] && $arp_packet_ipv4_packet_packet_udp_packet$$[10] === $search_mac$$[4] && $arp_packet_ipv4_packet_packet_udp_packet$$[11] === $search_mac$$[5] && ($dbg_log$$("Replace mac in eth source field", 1048576), $arp_packet_ipv4_packet_packet_udp_packet$$[6] = 
  $replacement_mac$$[0], $arp_packet_ipv4_packet_packet_udp_packet$$[7] = $replacement_mac$$[1], $arp_packet_ipv4_packet_packet_udp_packet$$[8] = $replacement_mac$$[2], $arp_packet_ipv4_packet_packet_udp_packet$$[9] = $replacement_mac$$[3], $arp_packet_ipv4_packet_packet_udp_packet$$[10] = $replacement_mac$$[4], $arp_packet_ipv4_packet_packet_udp_packet$$[11] = $replacement_mac$$[5]);
  var $dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[12] << 8 | $arp_packet_ipv4_packet_packet_udp_packet$$[13];
  if (2048 === $dhcp_packet_ethertype_ipv4_version_source_port$$) {
    if ($arp_packet_ipv4_packet_packet_udp_packet$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(14), $dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[0] >> 4, 4 !== $dhcp_packet_ethertype_ipv4_version_source_port$$) {
      $dbg_log$$("Expected ipv4.version==4 but got: " + $dhcp_packet_ethertype_ipv4_version_source_port$$, 1048576);
    } else {
      if ($dbg_assert$$(5 === ($arp_packet_ipv4_packet_packet_udp_packet$$[0] & 15), "TODO: ihl!=5"), 17 === $arp_packet_ipv4_packet_packet_udp_packet$$[9] && ($arp_packet_ipv4_packet_packet_udp_packet$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(20), $dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[0] << 8 | $arp_packet_ipv4_packet_packet_udp_packet$$[1], $destination_port_dhcp_magic_offset$jscomp$47$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[2] << 
      8 | $arp_packet_ipv4_packet_packet_udp_packet$$[3], $dbg_log$$("udp srcport=" + $dhcp_packet_ethertype_ipv4_version_source_port$$ + " dstport=" + $destination_port_dhcp_magic_offset$jscomp$47$$ + " checksum=" + $h$$($arp_packet_ipv4_packet_packet_udp_packet$$[6] << 8 | $arp_packet_ipv4_packet_packet_udp_packet$$[7], 4), 1048576), 67 === $dhcp_packet_ethertype_ipv4_version_source_port$$ || 67 === $destination_port_dhcp_magic_offset$jscomp$47$$)) {
        if ($dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(8), $destination_port_dhcp_magic_offset$jscomp$47$$ = $dhcp_packet_ethertype_ipv4_version_source_port$$[236] << 24 | $dhcp_packet_ethertype_ipv4_version_source_port$$[237] << 16 | $dhcp_packet_ethertype_ipv4_version_source_port$$[238] << 8 | $dhcp_packet_ethertype_ipv4_version_source_port$$[239], 1669485411 !== $destination_port_dhcp_magic_offset$jscomp$47$$) {
          $dbg_log$$("dhcp packet didn't match magic: " + $h$$($destination_port_dhcp_magic_offset$jscomp$47$$, 8));
        } else {
          $dhcp_packet_ethertype_ipv4_version_source_port$$[28] === $search_mac$$[0] && $dhcp_packet_ethertype_ipv4_version_source_port$$[29] === $search_mac$$[1] && $dhcp_packet_ethertype_ipv4_version_source_port$$[30] === $search_mac$$[2] && $dhcp_packet_ethertype_ipv4_version_source_port$$[31] === $search_mac$$[3] && $dhcp_packet_ethertype_ipv4_version_source_port$$[32] === $search_mac$$[4] && $dhcp_packet_ethertype_ipv4_version_source_port$$[33] === $search_mac$$[5] && ($dbg_log$$("Replace mac in dhcp.chaddr", 
          1048576), $dhcp_packet_ethertype_ipv4_version_source_port$$[28] = $replacement_mac$$[0], $dhcp_packet_ethertype_ipv4_version_source_port$$[29] = $replacement_mac$$[1], $dhcp_packet_ethertype_ipv4_version_source_port$$[30] = $replacement_mac$$[2], $dhcp_packet_ethertype_ipv4_version_source_port$$[31] = $replacement_mac$$[3], $dhcp_packet_ethertype_ipv4_version_source_port$$[32] = $replacement_mac$$[4], $dhcp_packet_ethertype_ipv4_version_source_port$$[33] = $replacement_mac$$[5], $arp_packet_ipv4_packet_packet_udp_packet$$[6] = 
          $arp_packet_ipv4_packet_packet_udp_packet$$[7] = 0);
          for (var $destination_port_dhcp_magic_offset$jscomp$47$$ = 240; $destination_port_dhcp_magic_offset$jscomp$47$$ < $dhcp_packet_ethertype_ipv4_version_source_port$$.length;) {
            const $dhcp_option_type$$ = $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$++];
            if (255 === $dhcp_option_type$$) {
              break;
            }
            const $length$jscomp$24$$ = $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$++];
            61 === $dhcp_option_type$$ && 1 === $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 0] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 1] === $search_mac$$[0] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 2] === $search_mac$$[1] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 
            3] === $search_mac$$[2] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 4] === $search_mac$$[3] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 5] === $search_mac$$[4] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 6] === $search_mac$$[5] && ($dbg_log$$("Replace mac in dhcp.clientidentifier", 1048576), $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 
            1] = $replacement_mac$$[0], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 2] = $replacement_mac$$[1], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 3] = $replacement_mac$$[2], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 4] = $replacement_mac$$[3], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 
            5] = $replacement_mac$$[4], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$jscomp$47$$ + 6] = $replacement_mac$$[5], $arp_packet_ipv4_packet_packet_udp_packet$$[6] = $arp_packet_ipv4_packet_packet_udp_packet$$[7] = 0);
            $destination_port_dhcp_magic_offset$jscomp$47$$ += $length$jscomp$24$$;
          }
        }
      }
    }
  } else {
    2054 === $dhcp_packet_ethertype_ipv4_version_source_port$$ && ($arp_packet_ipv4_packet_packet_udp_packet$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(14), $dbg_log$$("arp oper=" + $arp_packet_ipv4_packet_packet_udp_packet$$[7] + " " + $format_mac$$($arp_packet_ipv4_packet_packet_udp_packet$$.subarray(8, 14)) + " " + $format_mac$$($arp_packet_ipv4_packet_packet_udp_packet$$.subarray(18, 24)), 1048576), $arp_packet_ipv4_packet_packet_udp_packet$$[8] === $search_mac$$[0] && $arp_packet_ipv4_packet_packet_udp_packet$$[9] === 
    $search_mac$$[1] && $arp_packet_ipv4_packet_packet_udp_packet$$[10] === $search_mac$$[2] && $arp_packet_ipv4_packet_packet_udp_packet$$[11] === $search_mac$$[3] && $arp_packet_ipv4_packet_packet_udp_packet$$[12] === $search_mac$$[4] && $arp_packet_ipv4_packet_packet_udp_packet$$[13] === $search_mac$$[5] && ($dbg_log$$("Replace mac in arp.sha", 1048576), $arp_packet_ipv4_packet_packet_udp_packet$$[8] = $replacement_mac$$[0], $arp_packet_ipv4_packet_packet_udp_packet$$[9] = $replacement_mac$$[1], 
    $arp_packet_ipv4_packet_packet_udp_packet$$[10] = $replacement_mac$$[2], $arp_packet_ipv4_packet_packet_udp_packet$$[11] = $replacement_mac$$[3], $arp_packet_ipv4_packet_packet_udp_packet$$[12] = $replacement_mac$$[4], $arp_packet_ipv4_packet_packet_udp_packet$$[13] = $replacement_mac$$[5]));
  }
}
function $format_mac$$($mac$$) {
  return [$mac$$[0].toString(16).padStart(2, "0"), $mac$$[1].toString(16).padStart(2, "0"), $mac$$[2].toString(16).padStart(2, "0"), $mac$$[3].toString(16).padStart(2, "0"), $mac$$[4].toString(16).padStart(2, "0"), $mac$$[5].toString(16).padStart(2, "0"), ].join(":");
}
function $Ne2k$$($cpu$jscomp$16$$, $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$, $preserve_mac_from_state_image$$, $mac_address_translation$$, $id$jscomp$9$$) {
  this.cpu = $cpu$jscomp$16$$;
  this.pci = $cpu$jscomp$16$$.devices.pci;
  this.id = $id$jscomp$9$$ || 0;
  this.preserve_mac_from_state_image = $preserve_mac_from_state_image$$;
  this.mac_address_translation = $mac_address_translation$$;
  this.bus = $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$;
  this.bus.register("net" + this.id + "-receive", function($data$jscomp$132$$) {
    this.receive($data$jscomp$132$$);
  }, this);
  this.port = 768 + 256 * this.id;
  this.name = "ne2k";
  this.pci_space = [236, 16, 41, 128, 3, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, this.port & 255 | 1, this.port >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 184, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, ];
  this.pci_id = (0 === this.id ? 5 : 7 + this.id) << 3;
  this.pci_bars = [{size:32, }, ];
  this.imr = this.isr = 0;
  this.cr = 1;
  this.tpsr = this.tcnt = this.rcnt = this.dcfg = 0;
  this.memory = new Uint8Array(32768);
  this.txcr = this.rxcr = 0;
  this.tsr = 1;
  this.mac = new Uint8Array([0, 34, 21, 255 * Math.random() | 0, 255 * Math.random() | 0, 255 * Math.random() | 0, ]);
  this.bus.send("net" + this.id + "-mac", $format_mac$$(this.mac));
  this.mar = Uint8Array.of(255, 255, 255, 255, 255, 255, 255, 255);
  this.mac_address_in_state = null;
  for ($bus$jscomp$8_i$jscomp$45_io$jscomp$4$$ = 0; 6 > $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$; $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$++) {
    this.memory[$bus$jscomp$8_i$jscomp$45_io$jscomp$4$$ << 1] = this.memory[$bus$jscomp$8_i$jscomp$45_io$jscomp$4$$ << 1 | 1] = this.mac[$bus$jscomp$8_i$jscomp$45_io$jscomp$4$$];
  }
  this.memory[28] = this.memory[29] = 87;
  this.memory[30] = this.memory[31] = 87;
  $dbg_log$$("Mac: " + $format_mac$$(this.mac), 1048576);
  this.rsar = 0;
  this.pstart = 64;
  this.pstop = 128;
  this.boundary = this.curpg = 76;
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$ = $cpu$jscomp$16$$.io;
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 0, this, function() {
    $dbg_log$$("Read cmd", 1048576);
    return this.cr;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 0, this, function($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$) {
    this.cr = $data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$;
    $dbg_log$$("Write command: " + $h$$($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$, 2) + " newpg=" + (this.cr >> 6) + " txcr=" + $h$$(this.txcr, 2), 1048576);
    this.cr & 1 || ($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$ & 24 && 0 === this.rcnt && this.do_interrupt(64), $data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$ & 4 && ($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$ = this.tpsr << 8, $data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$ = this.memory.subarray($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$, $data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$ + this.tcnt), this.mac_address_in_state && ($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$ = 
    new Uint8Array($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$), $translate_mac_address$$($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$, this.mac_address_in_state, this.mac)), this.bus.send("net" + this.id + "-send", $data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$), this.bus.send("eth-transmit-end", [$data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$.length]), this.cr &= -5, this.do_interrupt(2), $dbg_log$$("Command: Transfer. length=" + $h$$($data$jscomp$133_data_byte$jscomp$12_start$jscomp$36$$.byteLength), 
    1048576)));
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 13, this, function() {
    var $pg$$ = this.get_page();
    if (1 === $pg$$) {
      return $dbg_log$$("Read mar5", 1048576), this.mar[5];
    }
    $dbg_log$$("Read counter0 pg=" + $pg$$, 1048576);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 14, this, function() {
    var $pg$jscomp$1$$ = this.get_page();
    if (1 === $pg$jscomp$1$$) {
      return $dbg_log$$("Read mar6", 1048576), this.mar[6];
    }
    $dbg_log$$("Read8 counter1 pg=" + $pg$jscomp$1$$, 1048576);
    return 0;
  }, function() {
    $dbg_log$$("Read16 counter1 pg=" + this.get_page(), 1048576);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 15, this, function() {
    var $pg$jscomp$2$$ = this.get_page();
    if (1 === $pg$jscomp$2$$) {
      return $dbg_log$$("Read mar7", 1048576), this.mar[7];
    }
    $dbg_log$$("Read counter2 pg=" + $pg$jscomp$2$$, 1048576);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 31, this, function() {
    this.get_page();
    $dbg_log$$("Read reset", 1048576);
    this.do_interrupt(128);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 31, this, function($data_byte$jscomp$13$$) {
    this.get_page();
    $dbg_log$$("Write reset: " + $h$$($data_byte$jscomp$13$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 1, this, function() {
    var $pg$jscomp$5$$ = this.get_page();
    if (0 === $pg$jscomp$5$$) {
      return this.pstart;
    }
    if (1 === $pg$jscomp$5$$) {
      return $dbg_log$$("Read pg1/01 (mac[0])", 1048576), this.mac[0];
    }
    if (2 === $pg$jscomp$5$$) {
      return this.pstart;
    }
    $dbg_log$$("Read pg" + $pg$jscomp$5$$ + "/01");
    $dbg_assert$$(!1);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 1, this, function($data_byte$jscomp$14$$) {
    var $pg$jscomp$6$$ = this.get_page();
    0 === $pg$jscomp$6$$ ? ($dbg_log$$("start page: " + $h$$($data_byte$jscomp$14$$, 2), 1048576), this.pstart = $data_byte$jscomp$14$$) : 1 === $pg$jscomp$6$$ ? ($dbg_log$$("mac[0] = " + $h$$($data_byte$jscomp$14$$), 1048576), this.mac[0] = $data_byte$jscomp$14$$) : 3 === $pg$jscomp$6$$ ? $dbg_log$$("Unimplemented: Write pg3/01 (9346CR): " + $h$$($data_byte$jscomp$14$$), 1048576) : ($dbg_log$$("Write pg" + $pg$jscomp$6$$ + "/01: " + $h$$($data_byte$jscomp$14$$), 1048576), $dbg_assert$$(!1));
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 2, this, function() {
    var $pg$jscomp$7$$ = this.get_page();
    if (0 === $pg$jscomp$7$$) {
      return this.pstop;
    }
    if (1 === $pg$jscomp$7$$) {
      return $dbg_log$$("Read pg1/02 (mac[1])", 1048576), this.mac[1];
    }
    if (2 === $pg$jscomp$7$$) {
      return this.pstop;
    }
    $dbg_log$$("Read pg" + $pg$jscomp$7$$ + "/02", 1048576);
    $dbg_assert$$(!1);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 2, this, function($data_byte$jscomp$15$$) {
    var $pg$jscomp$8$$ = this.get_page();
    0 === $pg$jscomp$8$$ ? ($dbg_log$$("stop page: " + $h$$($data_byte$jscomp$15$$, 2), 1048576), $data_byte$jscomp$15$$ > this.memory.length >> 8 && ($data_byte$jscomp$15$$ = this.memory.length >> 8, $dbg_log$$("XXX: Adjusting stop page to " + $h$$($data_byte$jscomp$15$$), 1048576)), this.pstop = $data_byte$jscomp$15$$) : 1 === $pg$jscomp$8$$ ? ($dbg_log$$("mac[1] = " + $h$$($data_byte$jscomp$15$$), 1048576), this.mac[1] = $data_byte$jscomp$15$$) : ($dbg_log$$("Write pg" + $pg$jscomp$8$$ + "/02: " + 
    $h$$($data_byte$jscomp$15$$), 1048576), $dbg_assert$$(!1));
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 7, this, function() {
    var $pg$jscomp$9$$ = this.get_page();
    if (0 === $pg$jscomp$9$$) {
      return $dbg_log$$("Read isr: " + $h$$(this.isr, 2), 1048576), this.isr;
    }
    if (1 === $pg$jscomp$9$$) {
      return $dbg_log$$("Read curpg: " + $h$$(this.curpg, 2), 1048576), this.curpg;
    }
    $dbg_assert$$(!1);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 7, this, function($data_byte$jscomp$16$$) {
    var $pg$jscomp$10$$ = this.get_page();
    0 === $pg$jscomp$10$$ ? ($dbg_log$$("Write isr: " + $h$$($data_byte$jscomp$16$$, 2), 1048576), this.isr &= ~$data_byte$jscomp$16$$, this.update_irq()) : 1 === $pg$jscomp$10$$ ? ($dbg_log$$("Write curpg: " + $h$$($data_byte$jscomp$16$$, 2), 1048576), this.curpg = $data_byte$jscomp$16$$) : $dbg_assert$$(!1);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 13, this, function($data_byte$jscomp$17$$) {
    var $pg$jscomp$11$$ = this.get_page();
    0 === $pg$jscomp$11$$ ? (this.txcr = $data_byte$jscomp$17$$, $dbg_log$$("Write tx config: " + $h$$($data_byte$jscomp$17$$, 2), 1048576)) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$11$$ + "/0d " + $h$$($data_byte$jscomp$17$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 14, this, function($data_byte$jscomp$18$$) {
    var $pg$jscomp$12$$ = this.get_page();
    0 === $pg$jscomp$12$$ ? ($dbg_log$$("Write data configuration: " + $h$$($data_byte$jscomp$18$$, 2), 1048576), this.dcfg = $data_byte$jscomp$18$$) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$12$$ + "/0e " + $h$$($data_byte$jscomp$18$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 10, this, function() {
    var $pg$jscomp$13$$ = this.get_page();
    if (0 === $pg$jscomp$13$$) {
      return $dbg_log$$("Read pg0/0a", 1048576), 80;
    }
    if (1 === $pg$jscomp$13$$) {
      return $dbg_log$$("Read mar2", 1048576), this.mar[2];
    }
    $dbg_assert$$(!1, "TODO");
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 10, this, function($data_byte$jscomp$19$$) {
    var $pg$jscomp$14$$ = this.get_page();
    0 === $pg$jscomp$14$$ ? ($dbg_log$$("Write remote byte count low: " + $h$$($data_byte$jscomp$19$$, 2), 1048576), this.rcnt = this.rcnt & 65280 | $data_byte$jscomp$19$$ & 255) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$14$$ + "/0a " + $h$$($data_byte$jscomp$19$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 11, this, function() {
    var $pg$jscomp$15$$ = this.get_page();
    if (0 === $pg$jscomp$15$$) {
      return $dbg_log$$("Read pg0/0b", 1048576), 67;
    }
    if (1 === $pg$jscomp$15$$) {
      return $dbg_log$$("Read mar3", 1048576), this.mar[3];
    }
    $dbg_assert$$(!1, "TODO");
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 11, this, function($data_byte$jscomp$20$$) {
    var $pg$jscomp$16$$ = this.get_page();
    0 === $pg$jscomp$16$$ ? ($dbg_log$$("Write remote byte count high: " + $h$$($data_byte$jscomp$20$$, 2), 1048576), this.rcnt = this.rcnt & 255 | $data_byte$jscomp$20$$ << 8 & 65280) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$16$$ + "/0b " + $h$$($data_byte$jscomp$20$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 8, this, function() {
    var $pg$jscomp$17$$ = this.get_page();
    if (0 === $pg$jscomp$17$$) {
      return $dbg_log$$("Read remote start address low", 1048576), this.rsar & 255;
    }
    if (1 === $pg$jscomp$17$$) {
      return $dbg_log$$("Read mar0", 1048576), this.mar[0];
    }
    $dbg_log$$("Unimplemented: Read pg" + $pg$jscomp$17$$ + "/08", 1048576);
    $dbg_assert$$(!1);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 8, this, function($data_byte$jscomp$21$$) {
    var $pg$jscomp$18$$ = this.get_page();
    0 === $pg$jscomp$18$$ ? ($dbg_log$$("Write remote start address low: " + $h$$($data_byte$jscomp$21$$, 2), 1048576), this.rsar = this.rsar & 65280 | $data_byte$jscomp$21$$ & 255) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$18$$ + "/08 " + $h$$($data_byte$jscomp$21$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 9, this, function() {
    var $pg$jscomp$19$$ = this.get_page();
    if (0 === $pg$jscomp$19$$) {
      return $dbg_log$$("Read remote start address high", 1048576), this.rsar >> 8 & 255;
    }
    if (1 === $pg$jscomp$19$$) {
      return $dbg_log$$("Read mar1", 1048576), this.mar[1];
    }
    $dbg_log$$("Unimplemented: Read pg" + $pg$jscomp$19$$ + "/09", 1048576);
    $dbg_assert$$(!1);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 9, this, function($data_byte$jscomp$22$$) {
    var $pg$jscomp$20$$ = this.get_page();
    0 === $pg$jscomp$20$$ ? ($dbg_log$$("Write remote start address low: " + $h$$($data_byte$jscomp$22$$, 2), 1048576), this.rsar = this.rsar & 255 | $data_byte$jscomp$22$$ << 8 & 65280) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$20$$ + "/09 " + $h$$($data_byte$jscomp$22$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 15, this, function($data_byte$jscomp$23$$) {
    var $pg$jscomp$21$$ = this.get_page();
    0 === $pg$jscomp$21$$ ? ($dbg_log$$("Write interrupt mask register: " + $h$$($data_byte$jscomp$23$$, 2) + " isr=" + $h$$(this.isr, 2), 1048576), this.imr = $data_byte$jscomp$23$$, this.update_irq()) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$21$$ + "/0f " + $h$$($data_byte$jscomp$23$$, 2), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 3, this, function() {
    var $pg$jscomp$22$$ = this.get_page();
    if (0 === $pg$jscomp$22$$) {
      return $dbg_log$$("Read boundary: " + $h$$(this.boundary, 2), 1048576), this.boundary;
    }
    if (1 === $pg$jscomp$22$$) {
      return $dbg_log$$("Read pg1/03 (mac[2])", 1048576), this.mac[2];
    }
    3 === $pg$jscomp$22$$ ? $dbg_log$$("Unimplemented: Read pg3/03 (CONFIG0)", 1048576) : ($dbg_log$$("Read pg" + $pg$jscomp$22$$ + "/03", 1048576), $dbg_assert$$(!1));
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 3, this, function($data_byte$jscomp$24$$) {
    var $pg$jscomp$23$$ = this.get_page();
    0 === $pg$jscomp$23$$ ? ($dbg_log$$("Write boundary: " + $h$$($data_byte$jscomp$24$$, 2), 1048576), this.boundary = $data_byte$jscomp$24$$) : 1 === $pg$jscomp$23$$ ? ($dbg_log$$("mac[2] = " + $h$$($data_byte$jscomp$24$$), 1048576), this.mac[2] = $data_byte$jscomp$24$$) : ($dbg_log$$("Write pg" + $pg$jscomp$23$$ + "/03: " + $h$$($data_byte$jscomp$24$$), 1048576), $dbg_assert$$(!1));
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 4, this, function() {
    var $pg$jscomp$24$$ = this.get_page();
    if (0 === $pg$jscomp$24$$) {
      return this.tsr;
    }
    if (1 === $pg$jscomp$24$$) {
      return $dbg_log$$("Read pg1/04 (mac[3])", 1048576), this.mac[3];
    }
    $dbg_log$$("Read pg" + $pg$jscomp$24$$ + "/04", 1048576);
    $dbg_assert$$(!1);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 4, this, function($data_byte$jscomp$25$$) {
    var $pg$jscomp$25$$ = this.get_page();
    0 === $pg$jscomp$25$$ ? ($dbg_log$$("Write tpsr: " + $h$$($data_byte$jscomp$25$$, 2), 1048576), this.tpsr = $data_byte$jscomp$25$$) : 1 === $pg$jscomp$25$$ ? ($dbg_log$$("mac[3] = " + $h$$($data_byte$jscomp$25$$), 1048576), this.mac[3] = $data_byte$jscomp$25$$) : ($dbg_log$$("Write pg" + $pg$jscomp$25$$ + "/04: " + $h$$($data_byte$jscomp$25$$), 1048576), $dbg_assert$$(!1));
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 5, this, function() {
    var $pg$jscomp$26$$ = this.get_page();
    if (0 === $pg$jscomp$26$$) {
      return $dbg_log$$("Unimplemented: Read pg0/05 (NCR: Number of Collisions Register)", 1048576), 0;
    }
    if (1 === $pg$jscomp$26$$) {
      return $dbg_log$$("Read pg1/05 (mac[4])", 1048576), this.mac[4];
    }
    3 === $pg$jscomp$26$$ ? $dbg_log$$("Unimplemented: Read pg3/05 (CONFIG2)", 1048576) : ($dbg_log$$("Read pg" + $pg$jscomp$26$$ + "/05", 1048576), $dbg_assert$$(!1));
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 5, this, function($data_byte$jscomp$26$$) {
    var $pg$jscomp$27$$ = this.get_page();
    0 === $pg$jscomp$27$$ ? ($dbg_log$$("Write tcnt low: " + $h$$($data_byte$jscomp$26$$, 2), 1048576), this.tcnt = this.tcnt & -256 | $data_byte$jscomp$26$$) : 1 === $pg$jscomp$27$$ ? ($dbg_log$$("mac[4] = " + $h$$($data_byte$jscomp$26$$), 1048576), this.mac[4] = $data_byte$jscomp$26$$) : 3 === $pg$jscomp$27$$ ? $dbg_log$$("Unimplemented: Write pg3/05 (CONFIG2): " + $h$$($data_byte$jscomp$26$$), 1048576) : ($dbg_log$$("Write pg" + $pg$jscomp$27$$ + "/05: " + $h$$($data_byte$jscomp$26$$), 1048576), 
    $dbg_assert$$(!1));
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 6, this, function() {
    var $pg$jscomp$28$$ = this.get_page();
    if (0 === $pg$jscomp$28$$) {
      return $dbg_assert$$(!1, "TODO"), 0;
    }
    if (1 === $pg$jscomp$28$$) {
      return $dbg_log$$("Read pg1/06 (mac[5])", 1048576), this.mac[5];
    }
    3 === $pg$jscomp$28$$ ? $dbg_log$$("Unimplemented: Read pg3/06 (CONFIG3)", 1048576) : ($dbg_log$$("Read pg" + $pg$jscomp$28$$ + "/06", 1048576), $dbg_assert$$(!1));
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 6, this, function($data_byte$jscomp$27$$) {
    var $pg$jscomp$29$$ = this.get_page();
    0 === $pg$jscomp$29$$ ? ($dbg_log$$("Write tcnt high: " + $h$$($data_byte$jscomp$27$$, 2), 1048576), this.tcnt = this.tcnt & 255 | $data_byte$jscomp$27$$ << 8) : 1 === $pg$jscomp$29$$ ? ($dbg_log$$("mac[5] = " + $h$$($data_byte$jscomp$27$$), 1048576), this.mac[5] = $data_byte$jscomp$27$$) : 3 === $pg$jscomp$29$$ ? $dbg_log$$("Unimplemented: Write pg3/06 (CONFIG3): " + $h$$($data_byte$jscomp$27$$), 1048576) : ($dbg_log$$("Write pg" + $pg$jscomp$29$$ + "/06: " + $h$$($data_byte$jscomp$27$$), 1048576), 
    $dbg_assert$$(!1));
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 12, this, function() {
    var $pg$jscomp$30$$ = this.get_page();
    if (0 === $pg$jscomp$30$$) {
      return 9;
    }
    if (1 === $pg$jscomp$30$$) {
      return $dbg_log$$("Read mar4", 1048576), this.mar[4];
    }
    $dbg_log$$("Unimplemented: Read pg" + $pg$jscomp$30$$ + "/0c", 1048576);
    $dbg_assert$$(!1);
    return 0;
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 12, this, function($data_byte$jscomp$28$$) {
    var $pg$jscomp$31$$ = this.get_page();
    0 === $pg$jscomp$31$$ ? ($dbg_log$$("RX configuration reg write: " + $h$$($data_byte$jscomp$28$$, 2), 1048576), this.rxcr = $data_byte$jscomp$28$$) : $dbg_log$$("Unimplemented: Write pg" + $pg$jscomp$31$$ + "/0c: " + $h$$($data_byte$jscomp$28$$), 1048576);
  });
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_read(this.port | 16, this, this.data_port_read8, this.data_port_read16, this.data_port_read32);
  $bus$jscomp$8_i$jscomp$45_io$jscomp$4$$.register_write(this.port | 16, this, this.data_port_write16, this.data_port_write16, this.data_port_write32);
  $cpu$jscomp$16$$.devices.pci.register_device(this);
}
$Ne2k$$.prototype.get_state = function() {
  var $state$jscomp$37$$ = [];
  $state$jscomp$37$$[0] = this.isr;
  $state$jscomp$37$$[1] = this.imr;
  $state$jscomp$37$$[2] = this.cr;
  $state$jscomp$37$$[3] = this.dcfg;
  $state$jscomp$37$$[4] = this.rcnt;
  $state$jscomp$37$$[5] = this.tcnt;
  $state$jscomp$37$$[6] = this.tpsr;
  $state$jscomp$37$$[7] = this.rsar;
  $state$jscomp$37$$[8] = this.pstart;
  $state$jscomp$37$$[9] = this.curpg;
  $state$jscomp$37$$[10] = this.boundary;
  $state$jscomp$37$$[11] = this.pstop;
  $state$jscomp$37$$[12] = this.rxcr;
  $state$jscomp$37$$[13] = this.txcr;
  $state$jscomp$37$$[14] = this.tsr;
  $state$jscomp$37$$[15] = this.mac;
  $state$jscomp$37$$[16] = this.memory;
  return $state$jscomp$37$$;
};
$Ne2k$$.prototype.set_state = function($state$jscomp$38$$) {
  this.isr = $state$jscomp$38$$[0];
  this.imr = $state$jscomp$38$$[1];
  this.cr = $state$jscomp$38$$[2];
  this.dcfg = $state$jscomp$38$$[3];
  this.rcnt = $state$jscomp$38$$[4];
  this.tcnt = $state$jscomp$38$$[5];
  this.tpsr = $state$jscomp$38$$[6];
  this.rsar = $state$jscomp$38$$[7];
  this.pstart = $state$jscomp$38$$[8];
  this.curpg = $state$jscomp$38$$[9];
  this.boundary = $state$jscomp$38$$[10];
  this.pstop = $state$jscomp$38$$[11];
  this.rxcr = $state$jscomp$38$$[12];
  this.txcr = $state$jscomp$38$$[13];
  this.tsr = $state$jscomp$38$$[14];
  this.preserve_mac_from_state_image ? (this.mac = $state$jscomp$38$$[15], this.memory = $state$jscomp$38$$[16]) : this.mac_address_translation && (this.mac_address_in_state = $state$jscomp$38$$[15], this.memory = $state$jscomp$38$$[16], $dbg_log$$("Using mac address translation guest_os_mac=" + $format_mac$$(this.mac_address_in_state) + " real_mac=" + $format_mac$$(this.mac), 1048576));
  this.bus.send("net" + this.id + "-mac", $format_mac$$(this.mac));
};
$Ne2k$$.prototype.do_interrupt = function($ir_mask$$) {
  $dbg_log$$("Do interrupt " + $h$$($ir_mask$$, 2), 1048576);
  this.isr |= $ir_mask$$;
  this.update_irq();
};
$Ne2k$$.prototype.update_irq = function() {
  this.imr & this.isr ? this.pci.raise_irq(this.pci_id) : this.pci.lower_irq(this.pci_id);
};
$Ne2k$$.prototype.data_port_write = function($data_byte$jscomp$29$$) {
  if (16 >= this.rsar || 16384 <= this.rsar && 32768 > this.rsar) {
    this.memory[this.rsar] = $data_byte$jscomp$29$$;
  }
  this.rsar++;
  this.rcnt--;
  this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8);
  0 === this.rcnt && this.do_interrupt(64);
};
$Ne2k$$.prototype.data_port_write16 = function($data$jscomp$134$$) {
  this.data_port_write($data$jscomp$134$$);
  this.dcfg & 1 && this.data_port_write($data$jscomp$134$$ >> 8);
};
$Ne2k$$.prototype.data_port_write32 = function($data$jscomp$135$$) {
  this.data_port_write($data$jscomp$135$$);
  this.data_port_write($data$jscomp$135$$ >> 8);
  this.data_port_write($data$jscomp$135$$ >> 16);
  this.data_port_write($data$jscomp$135$$ >> 24);
};
$Ne2k$$.prototype.data_port_read = function() {
  let $data$jscomp$136$$ = 0;
  32768 > this.rsar && ($data$jscomp$136$$ = this.memory[this.rsar]);
  this.rsar++;
  this.rcnt--;
  this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8);
  0 === this.rcnt && this.do_interrupt(64);
  return $data$jscomp$136$$;
};
$Ne2k$$.prototype.data_port_read8 = function() {
  return this.data_port_read16() & 255;
};
$Ne2k$$.prototype.data_port_read16 = function() {
  return this.dcfg & 1 ? this.data_port_read() | this.data_port_read() << 8 : this.data_port_read();
};
$Ne2k$$.prototype.data_port_read32 = function() {
  return this.data_port_read() | this.data_port_read() << 8 | this.data_port_read() << 16 | this.data_port_read() << 24;
};
$Ne2k$$.prototype.receive = function($data$jscomp$137$$) {
  if (!(this.cr & 1) && (this.bus.send("eth-receive-end", [$data$jscomp$137$$.length]), this.rxcr & 16 || this.rxcr & 4 && 255 === $data$jscomp$137$$[0] && 255 === $data$jscomp$137$$[1] && 255 === $data$jscomp$137$$[2] && 255 === $data$jscomp$137$$[3] && 255 === $data$jscomp$137$$[4] && 255 === $data$jscomp$137$$[5] || !(this.rxcr & 8 && 1 === ($data$jscomp$137$$[0] & 1) || $data$jscomp$137$$[0] !== this.mac[0] || $data$jscomp$137$$[1] !== this.mac[1] || $data$jscomp$137$$[2] !== this.mac[2] || $data$jscomp$137$$[3] !== 
  this.mac[3] || $data$jscomp$137$$[4] !== this.mac[4] || $data$jscomp$137$$[5] !== this.mac[5]))) {
    this.mac_address_in_state && ($data$jscomp$137$$ = new Uint8Array($data$jscomp$137$$), $translate_mac_address$$($data$jscomp$137$$, this.mac, this.mac_address_in_state));
    var $offset$jscomp$48$$ = this.curpg << 8, $total_length$$ = Math.max(60, $data$jscomp$137$$.length) + 4, $data_start$$ = $offset$jscomp$48$$ + 4, $next$$ = this.curpg + 1 + ($total_length$$ >> 8), $cut_end$jscomp$20$$ = $offset$jscomp$48$$ + $total_length$$, $needed$$ = 1 + ($total_length$$ >> 8), $available$$ = this.boundary > this.curpg ? this.boundary - this.curpg : this.pstop - this.curpg + this.boundary - this.pstart;
    $available$$ < $needed$$ && 0 !== this.boundary ? $dbg_log$$("Buffer full, dropping packet pstart=" + $h$$(this.pstart) + " pstop=" + $h$$(this.pstop) + " curpg=" + $h$$(this.curpg) + " needed=" + $h$$($needed$$) + " boundary=" + $h$$(this.boundary) + " available=" + $h$$($available$$), 1048576) : ($cut_end$jscomp$20$$ > this.pstop << 8 ? ($dbg_assert$$(60 <= $data$jscomp$137$$.length), $cut_end$jscomp$20$$ = (this.pstop << 8) - $data_start$$, $dbg_assert$$(0 <= $cut_end$jscomp$20$$), this.memory.set($data$jscomp$137$$.subarray(0, 
    $cut_end$jscomp$20$$), $data_start$$), this.memory.set($data$jscomp$137$$.subarray($cut_end$jscomp$20$$), this.pstart << 8), $dbg_log$$("rcv cut=" + $h$$($cut_end$jscomp$20$$), 1048576)) : (this.memory.set($data$jscomp$137$$, $data_start$$), 60 > $data$jscomp$137$$.length && this.memory.fill(0, $data_start$$ + $data$jscomp$137$$.length, $data_start$$ + 60)), $next$$ >= this.pstop && ($next$$ += this.pstart - this.pstop), this.memory[$offset$jscomp$48$$] = 1, this.memory[$offset$jscomp$48$$ + 
    1] = $next$$, this.memory[$offset$jscomp$48$$ + 2] = $total_length$$, this.memory[$offset$jscomp$48$$ + 3] = $total_length$$ >> 8, this.curpg = $next$$, $dbg_log$$("rcv offset=" + $h$$($offset$jscomp$48$$) + " len=" + $h$$($total_length$$) + " next=" + $h$$($next$$), 1048576), this.do_interrupt(1));
  }
};
$Ne2k$$.prototype.get_page = function() {
  return this.cr >> 6 & 3;
};
var $DSP_COMMAND_SIZES$$ = new Uint8Array(256), $DSP_COMMAND_HANDLERS$$ = [], $MIXER_READ_HANDLERS$$ = [], $MIXER_WRITE_HANDLERS$$ = [], $MIXER_REGISTER_IS_LEGACY$$ = new Uint8Array(256), $FM_HANDLERS$$ = [];
function $SB16$$($cpu$jscomp$17$$, $bus$jscomp$9$$) {
  this.cpu = $cpu$jscomp$17$$;
  this.bus = $bus$jscomp$9$$;
  this.write_buffer = new $ByteQueue$$(64);
  this.read_buffer = new $ByteQueue$$(64);
  this.mixer_current_address = this.command_size = this.command = this.read_buffer_lastvalue = 0;
  this.mixer_registers = new Uint8Array(256);
  this.mixer_reset();
  this.dummy_speaker_enabled = !1;
  this.test_register = 0;
  this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1;
  this.dac_buffers = [new $FloatQueue$$(65536), new $FloatQueue$$(65536), ];
  this.dma = $cpu$jscomp$17$$.devices.dma;
  this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0;
  this.dma_channel_8bit = 1;
  this.dma_channel_16bit = 5;
  this.dma_autoinit = !1;
  this.dma_buffer = new ArrayBuffer(65536);
  this.dma_buffer_int8 = new Int8Array(this.dma_buffer);
  this.dma_buffer_uint8 = new Uint8Array(this.dma_buffer);
  this.dma_buffer_int16 = new Int16Array(this.dma_buffer);
  this.dma_buffer_uint16 = new Uint16Array(this.dma_buffer);
  this.dma_syncbuffer = new $v86util$$.SyncBuffer(this.dma_buffer);
  this.dma_paused = this.dma_waiting_transfer = !1;
  this.sampling_rate = 22050;
  $bus$jscomp$9$$.send("dac-tell-sampling-rate", this.sampling_rate);
  this.bytes_per_sample = 1;
  this.e2_value = 170;
  this.e2_count = 0;
  this.asp_registers = new Uint8Array(256);
  this.mpu_read_buffer = new $ByteQueue$$(64);
  this.fm_current_address1 = this.fm_current_address0 = this.mpu_read_buffer_lastvalue = 0;
  this.fm_waveform_select_enable = !1;
  this.irq = 5;
  this.irq_triggered = new Uint8Array(16);
  $cpu$jscomp$17$$.io.register_read_consecutive(544, this, this.port2x0_read, this.port2x1_read, this.port2x2_read, this.port2x3_read);
  $cpu$jscomp$17$$.io.register_read_consecutive(904, this, this.port2x0_read, this.port2x1_read);
  $cpu$jscomp$17$$.io.register_read_consecutive(548, this, this.port2x4_read, this.port2x5_read);
  $cpu$jscomp$17$$.io.register_read(550, this, this.port2x6_read);
  $cpu$jscomp$17$$.io.register_read(551, this, this.port2x7_read);
  $cpu$jscomp$17$$.io.register_read(552, this, this.port2x8_read);
  $cpu$jscomp$17$$.io.register_read(553, this, this.port2x9_read);
  $cpu$jscomp$17$$.io.register_read(554, this, this.port2xA_read);
  $cpu$jscomp$17$$.io.register_read(555, this, this.port2xB_read);
  $cpu$jscomp$17$$.io.register_read(556, this, this.port2xC_read);
  $cpu$jscomp$17$$.io.register_read(557, this, this.port2xD_read);
  $cpu$jscomp$17$$.io.register_read_consecutive(558, this, this.port2xE_read, this.port2xF_read);
  $cpu$jscomp$17$$.io.register_write_consecutive(544, this, this.port2x0_write, this.port2x1_write, this.port2x2_write, this.port2x3_write);
  $cpu$jscomp$17$$.io.register_write_consecutive(904, this, this.port2x0_write, this.port2x1_write);
  $cpu$jscomp$17$$.io.register_write_consecutive(548, this, this.port2x4_write, this.port2x5_write);
  $cpu$jscomp$17$$.io.register_write(550, this, this.port2x6_write);
  $cpu$jscomp$17$$.io.register_write(551, this, this.port2x7_write);
  $cpu$jscomp$17$$.io.register_write_consecutive(552, this, this.port2x8_write, this.port2x9_write);
  $cpu$jscomp$17$$.io.register_write(554, this, this.port2xA_write);
  $cpu$jscomp$17$$.io.register_write(555, this, this.port2xB_write);
  $cpu$jscomp$17$$.io.register_write(556, this, this.port2xC_write);
  $cpu$jscomp$17$$.io.register_write(557, this, this.port2xD_write);
  $cpu$jscomp$17$$.io.register_write(558, this, this.port2xE_write);
  $cpu$jscomp$17$$.io.register_write(559, this, this.port2xF_write);
  $cpu$jscomp$17$$.io.register_read_consecutive(816, this, this.port3x0_read, this.port3x1_read);
  $cpu$jscomp$17$$.io.register_write_consecutive(816, this, this.port3x0_write, this.port3x1_write);
  this.dma.on_unmask(this.dma_on_unmask, this);
  $bus$jscomp$9$$.register("dac-request-data", function() {
    this.dac_handle_request();
  }, this);
  $bus$jscomp$9$$.register("speaker-has-initialized", function() {
    this.mixer_reset();
  }, this);
  $bus$jscomp$9$$.send("speaker-confirm-initialized");
  this.dsp_reset();
}
$SB16$$.prototype.dsp_reset = function() {
  this.write_buffer.clear();
  this.read_buffer.clear();
  this.command_size = this.command = 0;
  this.dummy_speaker_enabled = !1;
  this.test_register = 0;
  this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1;
  this.dac_buffers[0].clear();
  this.dac_buffers[1].clear();
  this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0;
  this.dma_autoinit = !1;
  this.dma_buffer_uint8.fill(0);
  this.dma_paused = this.dma_waiting_transfer = !1;
  this.e2_value = 170;
  this.e2_count = 0;
  this.sampling_rate = 22050;
  this.bytes_per_sample = 1;
  this.lower_irq(1);
  this.irq_triggered.fill(0);
  this.asp_registers.fill(0);
  this.asp_registers[5] = 1;
  this.asp_registers[9] = 248;
};
$SB16$$.prototype.get_state = function() {
  var $state$jscomp$39$$ = [];
  $state$jscomp$39$$[2] = this.read_buffer_lastvalue;
  $state$jscomp$39$$[3] = this.command;
  $state$jscomp$39$$[4] = this.command_size;
  $state$jscomp$39$$[5] = this.mixer_current_address;
  $state$jscomp$39$$[6] = this.mixer_registers;
  $state$jscomp$39$$[7] = this.dummy_speaker_enabled;
  $state$jscomp$39$$[8] = this.test_register;
  $state$jscomp$39$$[9] = this.dsp_highspeed;
  $state$jscomp$39$$[10] = this.dsp_stereo;
  $state$jscomp$39$$[11] = this.dsp_16bit;
  $state$jscomp$39$$[12] = this.dsp_signed;
  $state$jscomp$39$$[15] = this.dma_sample_count;
  $state$jscomp$39$$[16] = this.dma_bytes_count;
  $state$jscomp$39$$[17] = this.dma_bytes_left;
  $state$jscomp$39$$[18] = this.dma_bytes_block;
  $state$jscomp$39$$[19] = this.dma_irq;
  $state$jscomp$39$$[20] = this.dma_channel;
  $state$jscomp$39$$[21] = this.dma_channel_8bit;
  $state$jscomp$39$$[22] = this.dma_channel_16bit;
  $state$jscomp$39$$[23] = this.dma_autoinit;
  $state$jscomp$39$$[24] = this.dma_buffer_uint8;
  $state$jscomp$39$$[25] = this.dma_waiting_transfer;
  $state$jscomp$39$$[26] = this.dma_paused;
  $state$jscomp$39$$[27] = this.sampling_rate;
  $state$jscomp$39$$[28] = this.bytes_per_sample;
  $state$jscomp$39$$[29] = this.e2_value;
  $state$jscomp$39$$[30] = this.e2_count;
  $state$jscomp$39$$[31] = this.asp_registers;
  $state$jscomp$39$$[33] = this.mpu_read_buffer_last_value;
  $state$jscomp$39$$[34] = this.irq;
  $state$jscomp$39$$[35] = this.irq_triggered;
  return $state$jscomp$39$$;
};
$SB16$$.prototype.set_state = function($state$jscomp$40$$) {
  this.read_buffer_lastvalue = $state$jscomp$40$$[2];
  this.command = $state$jscomp$40$$[3];
  this.command_size = $state$jscomp$40$$[4];
  this.mixer_current_address = $state$jscomp$40$$[5];
  this.mixer_registers = $state$jscomp$40$$[6];
  this.mixer_full_update();
  this.dummy_speaker_enabled = $state$jscomp$40$$[7];
  this.test_register = $state$jscomp$40$$[8];
  this.dsp_highspeed = $state$jscomp$40$$[9];
  this.dsp_stereo = $state$jscomp$40$$[10];
  this.dsp_16bit = $state$jscomp$40$$[11];
  this.dsp_signed = $state$jscomp$40$$[12];
  this.dma_sample_count = $state$jscomp$40$$[15];
  this.dma_bytes_count = $state$jscomp$40$$[16];
  this.dma_bytes_left = $state$jscomp$40$$[17];
  this.dma_bytes_block = $state$jscomp$40$$[18];
  this.dma_irq = $state$jscomp$40$$[19];
  this.dma_channel = $state$jscomp$40$$[20];
  this.dma_channel_8bit = $state$jscomp$40$$[21];
  this.dma_channel_16bit = $state$jscomp$40$$[22];
  this.dma_autoinit = $state$jscomp$40$$[23];
  this.dma_buffer_uint8 = $state$jscomp$40$$[24];
  this.dma_waiting_transfer = $state$jscomp$40$$[25];
  this.dma_paused = $state$jscomp$40$$[26];
  this.sampling_rate = $state$jscomp$40$$[27];
  this.bytes_per_sample = $state$jscomp$40$$[28];
  this.e2_value = $state$jscomp$40$$[29];
  this.e2_count = $state$jscomp$40$$[30];
  this.asp_registers = $state$jscomp$40$$[31];
  this.mpu_read_buffer_last_value = $state$jscomp$40$$[33];
  this.irq = $state$jscomp$40$$[34];
  this.irq_triggered = $state$jscomp$40$$[35];
  this.dma_buffer = this.dma_buffer_uint8.buffer;
  this.dma_buffer_int8 = new Int8Array(this.dma_buffer);
  this.dma_buffer_int16 = new Int16Array(this.dma_buffer);
  this.dma_buffer_uint16 = new Uint16Array(this.dma_buffer);
  this.dma_syncbuffer = new $v86util$$.SyncBuffer(this.dma_buffer);
  this.dma_paused ? this.bus.send("dac-disable") : this.bus.send("dac-enable");
};
$SB16$$.prototype.port2x0_read = function() {
  $dbg_log$$("220 read: fm music status port (unimplemented)", 8388608);
  return 255;
};
$SB16$$.prototype.port2x1_read = function() {
  $dbg_log$$("221 read: fm music data port (write only)", 8388608);
  return 255;
};
$SB16$$.prototype.port2x2_read = function() {
  $dbg_log$$("222 read: advanced fm music status port (unimplemented)", 8388608);
  return 255;
};
$SB16$$.prototype.port2x3_read = function() {
  $dbg_log$$("223 read: advanced music data port (write only)", 8388608);
  return 255;
};
$SB16$$.prototype.port2x4_read = function() {
  $dbg_log$$("224 read: mixer address port", 8388608);
  return this.mixer_current_address;
};
$SB16$$.prototype.port2x5_read = function() {
  $dbg_log$$("225 read: mixer data port", 8388608);
  return this.mixer_read(this.mixer_current_address);
};
$SB16$$.prototype.port2x6_read = function() {
  $dbg_log$$("226 read: (write only)", 8388608);
  return 255;
};
$SB16$$.prototype.port2x7_read = function() {
  $dbg_log$$("227 read: undocumented", 8388608);
  return 255;
};
$SB16$$.prototype.port2x8_read = function() {
  $dbg_log$$("228 read: fm music status port (unimplemented)", 8388608);
  return 255;
};
$SB16$$.prototype.port2x9_read = function() {
  $dbg_log$$("229 read: fm music data port (write only)", 8388608);
  return 255;
};
$SB16$$.prototype.port2xA_read = function() {
  $dbg_log$$("22A read: read data", 8388608);
  this.read_buffer.length && (this.read_buffer_lastvalue = this.read_buffer.shift());
  $dbg_log$$(" <- " + this.read_buffer_lastvalue + " " + $h$$(this.read_buffer_lastvalue) + " '" + String.fromCharCode(this.read_buffer_lastvalue) + "'", 8388608);
  return this.read_buffer_lastvalue;
};
$SB16$$.prototype.port2xB_read = function() {
  $dbg_log$$("22B read: undocumented", 8388608);
  return 255;
};
$SB16$$.prototype.port2xC_read = function() {
  $dbg_log$$("22C read: write-buffer status", 8388608);
  return 127;
};
$SB16$$.prototype.port2xD_read = function() {
  $dbg_log$$("22D read: undocumented", 8388608);
  return 255;
};
$SB16$$.prototype.port2xE_read = function() {
  $dbg_log$$("22E read: read-buffer status / irq 8bit ack.", 8388608);
  this.irq_triggered[1] && this.lower_irq(1);
  return (this.read_buffer.length && !this.dsp_highspeed) << 7 | 127;
};
$SB16$$.prototype.port2xF_read = function() {
  $dbg_log$$("22F read: irq 16bit ack", 8388608);
  this.lower_irq(2);
  return 0;
};
$SB16$$.prototype.port2x0_write = function($value$jscomp$156$$) {
  $dbg_log$$("220 write: (unimplemented) fm register 0 address = " + $h$$($value$jscomp$156$$), 8388608);
  this.fm_current_address0 = 0;
};
$SB16$$.prototype.port2x1_write = function($value$jscomp$157$$) {
  $dbg_log$$("221 write: (unimplemented) fm register 0 data = " + $h$$($value$jscomp$157$$), 8388608);
  var $handler$jscomp$3$$ = $FM_HANDLERS$$[this.fm_current_address0];
  $handler$jscomp$3$$ || ($handler$jscomp$3$$ = this.fm_default_write);
  $handler$jscomp$3$$.call(this, $value$jscomp$157$$, 0, this.fm_current_address0);
};
$SB16$$.prototype.port2x2_write = function($value$jscomp$158$$) {
  $dbg_log$$("222 write: (unimplemented) fm register 1 address = " + $h$$($value$jscomp$158$$), 8388608);
  this.fm_current_address1 = 0;
};
$SB16$$.prototype.port2x3_write = function($value$jscomp$159$$) {
  $dbg_log$$("223 write: (unimplemented) fm register 1 data =" + $h$$($value$jscomp$159$$), 8388608);
  var $handler$jscomp$4$$ = $FM_HANDLERS$$[this.fm_current_address1];
  $handler$jscomp$4$$ || ($handler$jscomp$4$$ = this.fm_default_write);
  $handler$jscomp$4$$.call(this, $value$jscomp$159$$, 1, this.fm_current_address1);
};
$SB16$$.prototype.port2x4_write = function($value$jscomp$160$$) {
  $dbg_log$$("224 write: mixer address = " + $h$$($value$jscomp$160$$), 8388608);
  this.mixer_current_address = $value$jscomp$160$$;
};
$SB16$$.prototype.port2x5_write = function($value$jscomp$161$$) {
  $dbg_log$$("225 write: mixer data = " + $h$$($value$jscomp$161$$), 8388608);
  this.mixer_write(this.mixer_current_address, $value$jscomp$161$$);
};
$SB16$$.prototype.port2x6_write = function($yesplease$$) {
  $dbg_log$$("226 write: reset = " + $h$$($yesplease$$), 8388608);
  this.dsp_highspeed ? ($dbg_log$$(" -> exit highspeed", 8388608), this.dsp_highspeed = !1) : $yesplease$$ && ($dbg_log$$(" -> reset", 8388608), this.dsp_reset());
  this.read_buffer.clear();
  this.read_buffer.push(170);
};
$SB16$$.prototype.port2x7_write = function() {
  $dbg_log$$("227 write: undocumented", 8388608);
};
$SB16$$.prototype.port2x8_write = function() {
  $dbg_log$$("228 write: fm music register port (unimplemented)", 8388608);
};
$SB16$$.prototype.port2x9_write = function() {
  $dbg_log$$("229 write: fm music data port (unimplemented)", 8388608);
};
$SB16$$.prototype.port2xA_write = function() {
  $dbg_log$$("22A write: dsp read data port (read only)", 8388608);
};
$SB16$$.prototype.port2xB_write = function() {
  $dbg_log$$("22B write: undocumented", 8388608);
};
$SB16$$.prototype.port2xC_write = function($value$jscomp$167$$) {
  $dbg_log$$("22C write: write command/data", 8388608);
  0 === this.command ? ($dbg_log$$("22C write: command = " + $h$$($value$jscomp$167$$), 8388608), this.command = $value$jscomp$167$$, this.write_buffer.clear(), this.command_size = $DSP_COMMAND_SIZES$$[$value$jscomp$167$$]) : ($dbg_log$$("22C write: data: " + $h$$($value$jscomp$167$$), 8388608), this.write_buffer.push($value$jscomp$167$$));
  this.write_buffer.length >= this.command_size && this.command_do();
};
$SB16$$.prototype.port2xD_write = function() {
  $dbg_log$$("22D write: undocumented", 8388608);
};
$SB16$$.prototype.port2xE_write = function() {
  $dbg_log$$("22E write: dsp read buffer status (read only)", 8388608);
};
$SB16$$.prototype.port2xF_write = function() {
  $dbg_log$$("22F write: undocumented", 8388608);
};
$SB16$$.prototype.port3x0_read = function() {
  $dbg_log$$("330 read: mpu data", 8388608);
  this.mpu_read_buffer.length && (this.mpu_read_buffer_lastvalue = this.mpu_read_buffer.shift());
  $dbg_log$$(" <- " + $h$$(this.mpu_read_buffer_lastvalue), 8388608);
  return this.mpu_read_buffer_lastvalue;
};
$SB16$$.prototype.port3x0_write = function($value$jscomp$171$$) {
  $dbg_log$$("330 write: mpu data (unimplemented) : " + $h$$($value$jscomp$171$$), 8388608);
};
$SB16$$.prototype.port3x1_read = function() {
  $dbg_log$$("331 read: mpu status", 8388608);
  return 0 | 128 * !this.mpu_read_buffer.length;
};
$SB16$$.prototype.port3x1_write = function($value$jscomp$172$$) {
  $dbg_log$$("331 write: mpu command: " + $h$$($value$jscomp$172$$), 8388608);
  255 === $value$jscomp$172$$ && (this.mpu_read_buffer.clear(), this.mpu_read_buffer.push(254));
};
$SB16$$.prototype.command_do = function() {
  var $handler$jscomp$5$$ = $DSP_COMMAND_HANDLERS$$[this.command];
  $handler$jscomp$5$$ || ($handler$jscomp$5$$ = this.dsp_default_handler);
  $handler$jscomp$5$$.call(this);
  this.command_size = this.command = 0;
  this.write_buffer.clear();
};
$SB16$$.prototype.dsp_default_handler = function() {
  $dbg_log$$("Unhandled command: " + $h$$(this.command), 8388608);
};
function $register_dsp_command$$($commands$$, $size$jscomp$33$$, $handler$jscomp$6$$) {
  $handler$jscomp$6$$ || ($handler$jscomp$6$$ = $SB16$$.prototype.dsp_default_handler);
  for (var $i$jscomp$46$$ = 0; $i$jscomp$46$$ < $commands$$.length; $i$jscomp$46$$++) {
    $DSP_COMMAND_SIZES$$[$commands$$[$i$jscomp$46$$]] = $size$jscomp$33$$, $DSP_COMMAND_HANDLERS$$[$commands$$[$i$jscomp$46$$]] = $handler$jscomp$6$$;
  }
}
function $any_first_digit$$($base$jscomp$3$$) {
  for (var $commands$jscomp$1$$ = [], $i$jscomp$47$$ = 0; 16 > $i$jscomp$47$$; $i$jscomp$47$$++) {
    $commands$jscomp$1$$.push($base$jscomp$3$$ + $i$jscomp$47$$);
  }
  return $commands$jscomp$1$$;
}
$register_dsp_command$$([14], 2, function() {
  this.asp_registers[this.write_buffer.shift()] = this.write_buffer.shift();
});
$register_dsp_command$$([15], 1, function() {
  this.read_buffer.clear();
  this.read_buffer.push(this.asp_registers[this.write_buffer.shift()]);
});
$register_dsp_command$$([16], 1, function() {
  var $value$jscomp$173_value$jscomp$inline_20$$ = this.write_buffer.shift();
  $value$jscomp$173_value$jscomp$inline_20$$ = $audio_clip$$($value$jscomp$173_value$jscomp$inline_20$$ / 127.5 + -1, -1, 1);
  this.dac_buffers[0].push($value$jscomp$173_value$jscomp$inline_20$$);
  this.dac_buffers[1].push($value$jscomp$173_value$jscomp$inline_20$$);
  this.bus.send("dac-enable");
});
$register_dsp_command$$([20, 21], 2, function() {
  this.dma_irq = 1;
  this.dma_channel = this.dma_channel_8bit;
  this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = this.dma_autoinit = !1;
  this.dma_transfer_size_set();
  this.dma_transfer_start();
});
$register_dsp_command$$([22], 2);
$register_dsp_command$$([23], 2);
$register_dsp_command$$([28], 0, function() {
  this.dma_irq = 1;
  this.dma_channel = this.dma_channel_8bit;
  this.dma_autoinit = !0;
  this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = !1;
  this.dma_transfer_start();
});
$register_dsp_command$$([31], 0);
$register_dsp_command$$([32], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(127);
});
$register_dsp_command$$([36], 2);
$register_dsp_command$$([44], 0);
$register_dsp_command$$([48], 0);
$register_dsp_command$$([49], 0);
$register_dsp_command$$([52], 0);
$register_dsp_command$$([53], 0);
$register_dsp_command$$([54], 0);
$register_dsp_command$$([55], 0);
$register_dsp_command$$([56], 0);
$register_dsp_command$$([64], 1, function() {
  this.sampling_rate_change(1000000 / (256 - this.write_buffer.shift()) / this.get_channel_count());
});
$register_dsp_command$$([65, 66], 2, function() {
  this.sampling_rate_change(this.write_buffer.shift() << 8 | this.write_buffer.shift());
});
$register_dsp_command$$([72], 2, function() {
  this.dma_transfer_size_set();
});
$register_dsp_command$$([116], 2);
$register_dsp_command$$([117], 2);
$register_dsp_command$$([118], 2);
$register_dsp_command$$([119], 2);
$register_dsp_command$$([125], 0);
$register_dsp_command$$([127], 0);
$register_dsp_command$$([128], 2);
$register_dsp_command$$([144], 0, function() {
  this.dma_irq = 1;
  this.dma_channel = this.dma_channel_8bit;
  this.dma_autoinit = !0;
  this.dsp_signed = !1;
  this.dsp_highspeed = !0;
  this.dsp_16bit = !1;
  this.dma_transfer_start();
});
$register_dsp_command$$([145], 0);
$register_dsp_command$$([152], 0);
$register_dsp_command$$([153], 0);
$register_dsp_command$$([160], 0);
$register_dsp_command$$([168], 0);
$register_dsp_command$$($any_first_digit$$(176), 3, function() {
  if (this.command & 8) {
    this.dsp_default_handler();
  } else {
    var $mode$jscomp$22$$ = this.write_buffer.shift();
    this.dma_irq = 2;
    this.dma_channel = this.dma_channel_16bit;
    this.dma_autoinit = !!(this.command & 4);
    this.dsp_signed = !!($mode$jscomp$22$$ & 16);
    this.dsp_stereo = !!($mode$jscomp$22$$ & 32);
    this.dsp_16bit = !0;
    this.dma_transfer_size_set();
    this.dma_transfer_start();
  }
});
$register_dsp_command$$($any_first_digit$$(192), 3, function() {
  if (this.command & 8) {
    this.dsp_default_handler();
  } else {
    var $mode$jscomp$23$$ = this.write_buffer.shift();
    this.dma_irq = 1;
    this.dma_channel = this.dma_channel_8bit;
    this.dma_autoinit = !!(this.command & 4);
    this.dsp_signed = !!($mode$jscomp$23$$ & 16);
    this.dsp_stereo = !!($mode$jscomp$23$$ & 32);
    this.dsp_16bit = !1;
    this.dma_transfer_size_set();
    this.dma_transfer_start();
  }
});
$register_dsp_command$$([208], 0, function() {
  this.dma_paused = !0;
  this.bus.send("dac-disable");
});
$register_dsp_command$$([209], 0, function() {
  this.dummy_speaker_enabled = !0;
});
$register_dsp_command$$([211], 0, function() {
  this.dummy_speaker_enabled = !1;
});
$register_dsp_command$$([212], 0, function() {
  this.dma_paused = !1;
  this.bus.send("dac-enable");
});
$register_dsp_command$$([213], 0, function() {
  this.dma_paused = !0;
  this.bus.send("dac-disable");
});
$register_dsp_command$$([214], 0, function() {
  this.dma_paused = !1;
  this.bus.send("dac-enable");
});
$register_dsp_command$$([216], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(255 * this.dummy_speaker_enabled);
});
$register_dsp_command$$([217, 218], 0, function() {
  this.dma_autoinit = !1;
});
$register_dsp_command$$([224], 1, function() {
  this.read_buffer.clear();
  this.read_buffer.push(~this.write_buffer.shift());
});
$register_dsp_command$$([225], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(4);
  this.read_buffer.push(5);
});
$register_dsp_command$$([226], 1);
$register_dsp_command$$([227], 0, function() {
  this.read_buffer.clear();
  for (var $i$jscomp$48$$ = 0; 44 > $i$jscomp$48$$; $i$jscomp$48$$++) {
    this.read_buffer.push("COPYRIGHT (C) CREATIVE TECHNOLOGY LTD, 1992.".charCodeAt($i$jscomp$48$$));
  }
  this.read_buffer.push(0);
});
$register_dsp_command$$([228], 1, function() {
  this.test_register = this.write_buffer.shift();
});
$register_dsp_command$$([232], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(this.test_register);
});
$register_dsp_command$$([242, 243], 0, function() {
  this.raise_irq();
});
var $SB_F9$$ = new Uint8Array(256);
$SB_F9$$[14] = 255;
$SB_F9$$[15] = 7;
$SB_F9$$[55] = 56;
$register_dsp_command$$([249], 1, function() {
  var $input$jscomp$9$$ = this.write_buffer.shift();
  $dbg_log$$("dsp 0xf9: unknown function. input: " + $input$jscomp$9$$, 8388608);
  this.read_buffer.clear();
  this.read_buffer.push($SB_F9$$[$input$jscomp$9$$]);
});
$SB16$$.prototype.mixer_read = function($address$jscomp$3$$) {
  var $data$jscomp$138_handler$jscomp$7$$ = $MIXER_READ_HANDLERS$$[$address$jscomp$3$$];
  $data$jscomp$138_handler$jscomp$7$$ ? $data$jscomp$138_handler$jscomp$7$$ = $data$jscomp$138_handler$jscomp$7$$.call(this) : ($data$jscomp$138_handler$jscomp$7$$ = this.mixer_registers[$address$jscomp$3$$], $dbg_log$$("unhandled mixer register read. addr:" + $h$$($address$jscomp$3$$) + " data:" + $h$$($data$jscomp$138_handler$jscomp$7$$), 8388608));
  return $data$jscomp$138_handler$jscomp$7$$;
};
$SB16$$.prototype.mixer_write = function($address$jscomp$4$$, $data$jscomp$139$$) {
  var $handler$jscomp$8$$ = $MIXER_WRITE_HANDLERS$$[$address$jscomp$4$$];
  $handler$jscomp$8$$ ? $handler$jscomp$8$$.call(this, $data$jscomp$139$$) : $dbg_log$$("unhandled mixer register write. addr:" + $h$$($address$jscomp$4$$) + " data:" + $h$$($data$jscomp$139$$), 8388608);
};
$SB16$$.prototype.mixer_default_read = function() {
  $dbg_log$$("mixer register read. addr:" + $h$$(this.mixer_current_address), 8388608);
  return this.mixer_registers[this.mixer_current_address];
};
$SB16$$.prototype.mixer_default_write = function($data$jscomp$140$$) {
  $dbg_log$$("mixer register write. addr:" + $h$$(this.mixer_current_address) + " data:" + $h$$($data$jscomp$140$$), 8388608);
  this.mixer_registers[this.mixer_current_address] = $data$jscomp$140$$;
};
$SB16$$.prototype.mixer_reset = function() {
  this.mixer_registers[4] = 204;
  this.mixer_registers[34] = 204;
  this.mixer_registers[38] = 204;
  this.mixer_registers[40] = 0;
  this.mixer_registers[46] = 0;
  this.mixer_registers[10] = 0;
  this.mixer_registers[48] = 192;
  this.mixer_registers[49] = 192;
  this.mixer_registers[50] = 192;
  this.mixer_registers[51] = 192;
  this.mixer_registers[52] = 192;
  this.mixer_registers[53] = 192;
  this.mixer_registers[54] = 0;
  this.mixer_registers[55] = 0;
  this.mixer_registers[56] = 0;
  this.mixer_registers[57] = 0;
  this.mixer_registers[59] = 0;
  this.mixer_registers[60] = 31;
  this.mixer_registers[61] = 21;
  this.mixer_registers[62] = 11;
  this.mixer_registers[63] = 0;
  this.mixer_registers[64] = 0;
  this.mixer_registers[65] = 0;
  this.mixer_registers[66] = 0;
  this.mixer_registers[67] = 0;
  this.mixer_registers[68] = 128;
  this.mixer_registers[69] = 128;
  this.mixer_registers[70] = 128;
  this.mixer_registers[71] = 128;
  this.mixer_full_update();
};
$SB16$$.prototype.mixer_full_update = function() {
  for (var $i$jscomp$49$$ = 1; $i$jscomp$49$$ < this.mixer_registers.length; $i$jscomp$49$$++) {
    $MIXER_REGISTER_IS_LEGACY$$[$i$jscomp$49$$] || this.mixer_write($i$jscomp$49$$, this.mixer_registers[$i$jscomp$49$$]);
  }
};
function $register_mixer_read$$($address$jscomp$5$$, $handler$jscomp$9$$) {
  $handler$jscomp$9$$ || ($handler$jscomp$9$$ = $SB16$$.prototype.mixer_default_read);
  $MIXER_READ_HANDLERS$$[$address$jscomp$5$$] = $handler$jscomp$9$$;
}
function $register_mixer_write$$($address$jscomp$6$$, $handler$jscomp$10$$) {
  $handler$jscomp$10$$ || ($handler$jscomp$10$$ = $SB16$$.prototype.mixer_default_write);
  $MIXER_WRITE_HANDLERS$$[$address$jscomp$6$$] = $handler$jscomp$10$$;
}
function $register_mixer_legacy$$($address_old$$, $address_new_left$$, $address_new_right$$) {
  $MIXER_REGISTER_IS_LEGACY$$[$address_old$$] = 1;
  $MIXER_READ_HANDLERS$$[$address_old$$] = function() {
    return this.mixer_registers[$address_new_left$$] & 240 | this.mixer_registers[$address_new_right$$] >>> 4;
  };
  $MIXER_WRITE_HANDLERS$$[$address_old$$] = function($data$jscomp$141$$) {
    this.mixer_registers[$address_old$$] = $data$jscomp$141$$;
    var $right$jscomp$4$$ = $data$jscomp$141$$ << 4 & 240 | this.mixer_registers[$address_new_right$$] & 15;
    this.mixer_write($address_new_left$$, $data$jscomp$141$$ & 240 | this.mixer_registers[$address_new_left$$] & 15);
    this.mixer_write($address_new_right$$, $right$jscomp$4$$);
  };
}
function $register_mixer_volume$$($address$jscomp$7$$, $mixer_source$$, $channel$jscomp$16$$) {
  $MIXER_READ_HANDLERS$$[$address$jscomp$7$$] = $SB16$$.prototype.mixer_default_read;
  $MIXER_WRITE_HANDLERS$$[$address$jscomp$7$$] = function($data$jscomp$142$$) {
    this.mixer_registers[$address$jscomp$7$$] = $data$jscomp$142$$;
    this.bus.send("mixer-volume", [$mixer_source$$, $channel$jscomp$16$$, ($data$jscomp$142$$ >>> 2) - 62]);
  };
}
$register_mixer_read$$(0, function() {
  this.mixer_reset();
  return 0;
});
$register_mixer_write$$(0);
$register_mixer_legacy$$(4, 50, 51);
$register_mixer_legacy$$(34, 48, 49);
$register_mixer_legacy$$(38, 52, 53);
$register_mixer_legacy$$(40, 54, 55);
$register_mixer_legacy$$(46, 56, 57);
$register_mixer_volume$$(48, 0, 0);
$register_mixer_volume$$(49, 0, 1);
$register_mixer_volume$$(50, 2, 0);
$register_mixer_volume$$(51, 2, 1);
$register_mixer_read$$(59);
$register_mixer_write$$(59, function($data$jscomp$143$$) {
  this.mixer_registers[59] = $data$jscomp$143$$;
  this.bus.send("mixer-volume", [1, 2, 6 * ($data$jscomp$143$$ >>> 6) - 18]);
});
$register_mixer_read$$(65);
$register_mixer_write$$(65, function($data$jscomp$144$$) {
  this.mixer_registers[65] = $data$jscomp$144$$;
  this.bus.send("mixer-gain-left", 6 * ($data$jscomp$144$$ >>> 6));
});
$register_mixer_read$$(66);
$register_mixer_write$$(66, function($data$jscomp$145$$) {
  this.mixer_registers[66] = $data$jscomp$145$$;
  this.bus.send("mixer-gain-right", 6 * ($data$jscomp$145$$ >>> 6));
});
$register_mixer_read$$(68);
$register_mixer_write$$(68, function($data$jscomp$146$$) {
  this.mixer_registers[68] = $data$jscomp$146$$;
  $data$jscomp$146$$ >>>= 3;
  this.bus.send("mixer-treble-left", $data$jscomp$146$$ - (16 > $data$jscomp$146$$ ? 14 : 16));
});
$register_mixer_read$$(69);
$register_mixer_write$$(69, function($data$jscomp$147$$) {
  this.mixer_registers[69] = $data$jscomp$147$$;
  $data$jscomp$147$$ >>>= 3;
  this.bus.send("mixer-treble-right", $data$jscomp$147$$ - (16 > $data$jscomp$147$$ ? 14 : 16));
});
$register_mixer_read$$(70);
$register_mixer_write$$(70, function($data$jscomp$148$$) {
  this.mixer_registers[70] = $data$jscomp$148$$;
  $data$jscomp$148$$ >>>= 3;
  this.bus.send("mixer-bass-right", $data$jscomp$148$$ - (16 > $data$jscomp$148$$ ? 14 : 16));
});
$register_mixer_read$$(71);
$register_mixer_write$$(71, function($data$jscomp$149$$) {
  this.mixer_registers[71] = $data$jscomp$149$$;
  $data$jscomp$149$$ >>>= 3;
  this.bus.send("mixer-bass-right", $data$jscomp$149$$ - (16 > $data$jscomp$149$$ ? 14 : 16));
});
$register_mixer_read$$(128, function() {
  switch(this.irq) {
    case 2:
      return 1;
    case 5:
      return 2;
    case 7:
      return 4;
    case 10:
      return 8;
    default:
      return 0;
  }
});
$register_mixer_write$$(128, function($bits$$) {
  $bits$$ & 1 && (this.irq = 2);
  $bits$$ & 2 && (this.irq = 5);
  $bits$$ & 4 && (this.irq = 7);
  $bits$$ & 8 && (this.irq = 10);
});
$register_mixer_read$$(129, function() {
  var $ret$jscomp$3$$ = 0;
  switch(this.dma_channel_8bit) {
    case 0:
      $ret$jscomp$3$$ |= 1;
      break;
    case 1:
      $ret$jscomp$3$$ |= 2;
      break;
    case 3:
      $ret$jscomp$3$$ |= 8;
  }
  switch(this.dma_channel_16bit) {
    case 5:
      $ret$jscomp$3$$ |= 32;
      break;
    case 6:
      $ret$jscomp$3$$ |= 64;
      break;
    case 7:
      $ret$jscomp$3$$ |= 128;
  }
  return $ret$jscomp$3$$;
});
$register_mixer_write$$(129, function($bits$jscomp$1$$) {
  $bits$jscomp$1$$ & 1 && (this.dma_channel_8bit = 0);
  $bits$jscomp$1$$ & 2 && (this.dma_channel_8bit = 1);
  $bits$jscomp$1$$ & 8 && (this.dma_channel_8bit = 3);
  $bits$jscomp$1$$ & 32 && (this.dma_channel_16bit = 5);
  $bits$jscomp$1$$ & 64 && (this.dma_channel_16bit = 6);
  $bits$jscomp$1$$ & 128 && (this.dma_channel_16bit = 7);
});
$register_mixer_read$$(130, function() {
  for (var $ret$jscomp$4$$ = 32, $i$jscomp$50$$ = 0; 16 > $i$jscomp$50$$; $i$jscomp$50$$++) {
    $ret$jscomp$4$$ |= $i$jscomp$50$$ * this.irq_triggered[$i$jscomp$50$$];
  }
  return $ret$jscomp$4$$;
});
$SB16$$.prototype.fm_default_write = function($data$jscomp$150$$, $register$jscomp$3$$, $address$jscomp$8$$) {
  $dbg_log$$("unhandled fm register write. addr:" + $register$jscomp$3$$ + "|" + $h$$($address$jscomp$8$$) + " data:" + $h$$($data$jscomp$150$$), 8388608);
};
function $register_fm_write$$($addresses$$, $handler$jscomp$11$$) {
  $handler$jscomp$11$$ || ($handler$jscomp$11$$ = $SB16$$.prototype.fm_default_write);
  for (var $i$jscomp$51$$ = 0; $i$jscomp$51$$ < $addresses$$.length; $i$jscomp$51$$++) {
    $FM_HANDLERS$$[$addresses$$[$i$jscomp$51$$]] = $handler$jscomp$11$$;
  }
}
function $between$$($i$jscomp$52_start$jscomp$37$$, $end$jscomp$21$$) {
  for (var $a$jscomp$2$$ = []; $i$jscomp$52_start$jscomp$37$$ <= $end$jscomp$21$$; $i$jscomp$52_start$jscomp$37$$++) {
    $a$jscomp$2$$.push($i$jscomp$52_start$jscomp$37$$);
  }
  return $a$jscomp$2$$;
}
var $SB_FM_OPERATORS_BY_OFFSET$$ = new Uint8Array(32);
$SB_FM_OPERATORS_BY_OFFSET$$[0] = 0;
$SB_FM_OPERATORS_BY_OFFSET$$[1] = 1;
$SB_FM_OPERATORS_BY_OFFSET$$[2] = 2;
$SB_FM_OPERATORS_BY_OFFSET$$[3] = 3;
$SB_FM_OPERATORS_BY_OFFSET$$[4] = 4;
$SB_FM_OPERATORS_BY_OFFSET$$[5] = 5;
$SB_FM_OPERATORS_BY_OFFSET$$[8] = 6;
$SB_FM_OPERATORS_BY_OFFSET$$[9] = 7;
$SB_FM_OPERATORS_BY_OFFSET$$[10] = 8;
$SB_FM_OPERATORS_BY_OFFSET$$[11] = 9;
$SB_FM_OPERATORS_BY_OFFSET$$[12] = 10;
$SB_FM_OPERATORS_BY_OFFSET$$[13] = 11;
$SB_FM_OPERATORS_BY_OFFSET$$[16] = 12;
$SB_FM_OPERATORS_BY_OFFSET$$[17] = 13;
$SB_FM_OPERATORS_BY_OFFSET$$[18] = 14;
$SB_FM_OPERATORS_BY_OFFSET$$[19] = 15;
$SB_FM_OPERATORS_BY_OFFSET$$[20] = 16;
$SB_FM_OPERATORS_BY_OFFSET$$[21] = 17;
$register_fm_write$$([1], function($bits$jscomp$2$$, $register$jscomp$5$$) {
  this.fm_waveform_select_enable[$register$jscomp$5$$] = $bits$jscomp$2$$ & 1;
  this.fm_update_waveforms();
});
$register_fm_write$$([2]);
$register_fm_write$$([3]);
$register_fm_write$$([4], function() {
});
$register_fm_write$$([5], function($bits$jscomp$4$$, $register$jscomp$7$$, $address$jscomp$11$$) {
  0 === $register$jscomp$7$$ && this.fm_default_write($bits$jscomp$4$$, $register$jscomp$7$$, $address$jscomp$11$$);
});
$register_fm_write$$([8], function() {
});
$register_fm_write$$($between$$(32, 53), function() {
});
$register_fm_write$$($between$$(64, 85), function() {
});
$register_fm_write$$($between$$(96, 117), function() {
});
$register_fm_write$$($between$$(128, 149), function() {
});
$register_fm_write$$($between$$(160, 168), function() {
});
$register_fm_write$$($between$$(176, 184), function() {
});
$register_fm_write$$([189], function() {
});
$register_fm_write$$($between$$(192, 200), function() {
});
$register_fm_write$$($between$$(224, 245), function() {
});
$SB16$$.prototype.fm_update_waveforms = function() {
};
$SB16$$.prototype.sampling_rate_change = function($rate$jscomp$1$$) {
  this.sampling_rate = $rate$jscomp$1$$;
  this.bus.send("dac-tell-sampling-rate", $rate$jscomp$1$$);
};
$SB16$$.prototype.get_channel_count = function() {
  return this.dsp_stereo ? 2 : 1;
};
$SB16$$.prototype.dma_transfer_size_set = function() {
  this.dma_sample_count = 1 + (this.write_buffer.shift() << 0) + (this.write_buffer.shift() << 8);
};
$SB16$$.prototype.dma_transfer_start = function() {
  $dbg_log$$("begin dma transfer", 8388608);
  this.bytes_per_sample = 1;
  this.dsp_16bit && (this.bytes_per_sample *= 2);
  this.dma_bytes_count = this.dma_sample_count * this.bytes_per_sample;
  this.dma_bytes_block = 1024 * this.bytes_per_sample;
  this.dma_bytes_block = Math.min(Math.max(this.dma_bytes_count >> 2 & -4, 32), this.dma_bytes_block);
  this.dma_waiting_transfer = !0;
  this.dma.channel_mask[this.dma_channel] || this.dma_on_unmask(this.dma_channel);
};
$SB16$$.prototype.dma_on_unmask = function($channel$jscomp$18$$) {
  $channel$jscomp$18$$ === this.dma_channel && this.dma_waiting_transfer && (this.dma_waiting_transfer = !1, this.dma_bytes_left = this.dma_bytes_count, this.dma_paused = !1, this.bus.send("dac-enable"));
};
$SB16$$.prototype.dma_transfer_next = function() {
  $dbg_log$$("dma transfering next block", 8388608);
  var $size$jscomp$34$$ = Math.min(this.dma_bytes_left, this.dma_bytes_block), $samples$jscomp$2$$ = Math.floor($size$jscomp$34$$ / this.bytes_per_sample);
  this.dma.do_write(this.dma_syncbuffer, 0, $size$jscomp$34$$, this.dma_channel, $error$jscomp$5$$ => {
    $dbg_log$$("dma block transfer " + ($error$jscomp$5$$ ? "unsuccessful" : "successful"), 8388608);
    $error$jscomp$5$$ || (this.dma_to_dac($samples$jscomp$2$$), this.dma_bytes_left -= $size$jscomp$34$$, this.dma_bytes_left || (this.raise_irq(this.dma_irq), this.dma_autoinit && (this.dma_bytes_left = this.dma_bytes_count)));
  });
};
$SB16$$.prototype.dma_to_dac = function($sample_count$$) {
  var $amplitude$$ = this.dsp_16bit ? 32767.5 : 127.5, $offset$jscomp$50$$ = this.dsp_signed ? 0 : -1, $repeats$$ = this.dsp_stereo ? 1 : 2;
  var $buffer$jscomp$37$$ = this.dsp_16bit ? this.dsp_signed ? this.dma_buffer_int16 : this.dma_buffer_uint16 : this.dsp_signed ? this.dma_buffer_int8 : this.dma_buffer_uint8;
  for (var $channel$jscomp$19$$ = 0, $i$jscomp$53$$ = 0; $i$jscomp$53$$ < $sample_count$$; $i$jscomp$53$$++) {
    for (var $sample$$ = $audio_clip$$($buffer$jscomp$37$$[$i$jscomp$53$$] / $amplitude$$ + $offset$jscomp$50$$, -1, 1), $j$jscomp$5$$ = 0; $j$jscomp$5$$ < $repeats$$; $j$jscomp$5$$++) {
      this.dac_buffers[$channel$jscomp$19$$].push($sample$$), $channel$jscomp$19$$ ^= 1;
    }
  }
  this.dac_send();
};
$SB16$$.prototype.dac_handle_request = function() {
  !this.dma_bytes_left || this.dma_paused ? this.dac_send() : this.dma_transfer_next();
};
$SB16$$.prototype.dac_send = function() {
  if (this.dac_buffers[0].length) {
    var $out0$$ = this.dac_buffers[0].shift_block(this.dac_buffers[0].length), $out1$$ = this.dac_buffers[1].shift_block(this.dac_buffers[1].length);
    this.bus.send("dac-send-data", [$out0$$, $out1$$], [$out0$$.buffer, $out1$$.buffer]);
  }
};
$SB16$$.prototype.raise_irq = function($type$jscomp$152$$) {
  $dbg_log$$("raise irq", 8388608);
  this.irq_triggered[$type$jscomp$152$$] = 1;
  this.cpu.device_raise_irq(this.irq);
};
$SB16$$.prototype.lower_irq = function($type$jscomp$153$$) {
  $dbg_log$$("lower irq", 8388608);
  this.irq_triggered[$type$jscomp$153$$] = 0;
  this.cpu.device_lower_irq(this.irq);
};
function $audio_clip$$($value$jscomp$175$$, $low$jscomp$1$$, $high$jscomp$1$$) {
  return ($value$jscomp$175$$ < $low$jscomp$1$$) * $low$jscomp$1$$ + ($value$jscomp$175$$ > $high$jscomp$1$$) * $high$jscomp$1$$ + ($low$jscomp$1$$ <= $value$jscomp$175$$ && $value$jscomp$175$$ <= $high$jscomp$1$$) * $value$jscomp$175$$;
}
;function $VirtIO$$($cpu$jscomp$18$$, $options$jscomp$38$$) {
  this.cpu = $cpu$jscomp$18$$;
  this.pci = $cpu$jscomp$18$$.devices.pci;
  this.device_id = $options$jscomp$38$$.device_id;
  this.pci_space = [244, 26, $options$jscomp$38$$.device_id & 255, $options$jscomp$38$$.device_id >> 8, 7, 5, 16, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 168, 0, 0, 0, 16, 191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, $options$jscomp$38$$.subsystem_device_id & 255, $options$jscomp$38$$.subsystem_device_id >> 8, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, ];
  this.pci_space = this.pci_space.concat($v86util$$.zeros(256 - this.pci_space.length));
  this.pci_id = $options$jscomp$38$$.pci_id;
  this.pci_bars = [];
  this.name = $options$jscomp$38$$.name;
  this.driver_feature_select = this.device_feature_select = 0;
  this.device_feature = new Uint32Array(4);
  this.driver_feature = new Uint32Array(4);
  for ($f$jscomp$3_offsets$$ of $options$jscomp$38$$.common.features) {
    $dbg_assert$$(0 <= $f$jscomp$3_offsets$$, "VirtIO device<" + this.name + "> feature bit numbers must be non-negative"), $dbg_assert$$(128 > $f$jscomp$3_offsets$$, "VirtIO device<" + this.name + "> feature bit numbers assumed less than 128 in implementation"), this.device_feature[$f$jscomp$3_offsets$$ >>> 5] |= 1 << ($f$jscomp$3_offsets$$ & 31), this.driver_feature[$f$jscomp$3_offsets$$ >>> 5] |= 1 << ($f$jscomp$3_offsets$$ & 31);
  }
  $dbg_assert$$($options$jscomp$38$$.common.features.includes(32), "VirtIO device<" + this.name + "> only non-transitional devices are supported");
  this.features_ok = !0;
  this.device_status = 0;
  this.config_has_changed = !1;
  this.config_generation = 0;
  this.queues = [];
  for (var $effective_offset_queue_options$$ of $options$jscomp$38$$.common.queues) {
    this.queues.push(new $VirtQueue$$($cpu$jscomp$18$$, this, $effective_offset_queue_options$$));
  }
  this.queue_select = 0;
  this.queue_selected = this.queues[0];
  this.isr_status = 0;
  var $f$jscomp$3_offsets$$ = new Set;
  for ($capabilities_offset$jscomp$52$$ of this.queues.map($q$$ => $q$$.notify_offset)) {
    $effective_offset_queue_options$$ = $options$jscomp$38$$.notification.single_handler ? 0 : $capabilities_offset$jscomp$52$$, $f$jscomp$3_offsets$$.add($effective_offset_queue_options$$), $dbg_assert$$($options$jscomp$38$$.notification.handlers[$effective_offset_queue_options$$], "VirtIO device<" + this.name + "> every queue's notifier must exist");
  }
  for (const [$index$jscomp$90$$, $handler$jscomp$12$$] of $options$jscomp$38$$.notification.handlers.entries()) {
    $dbg_assert$$(!$handler$jscomp$12$$ || $f$jscomp$3_offsets$$.has($index$jscomp$90$$), "VirtIO device<" + this.name + "> no defined notify handler should be unused");
  }
  var $capabilities_offset$jscomp$52$$ = [];
  $capabilities_offset$jscomp$52$$.push(this.create_common_capability($options$jscomp$38$$.common));
  $capabilities_offset$jscomp$52$$.push(this.create_notification_capability($options$jscomp$38$$.notification));
  $capabilities_offset$jscomp$52$$.push(this.create_isr_capability($options$jscomp$38$$.isr_status));
  $options$jscomp$38$$.device_specific && $capabilities_offset$jscomp$52$$.push(this.create_device_specific_capability($options$jscomp$38$$.device_specific));
  this.init_capabilities($capabilities_offset$jscomp$52$$);
  $cpu$jscomp$18$$.devices.pci.register_device(this);
  this.reset();
}
$VirtIO$$.prototype.create_common_capability = function($options$jscomp$39$$) {
  return {type:1, bar:0, port:$options$jscomp$39$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array(0), struct:[{bytes:4, name:"device_feature_select", read:() => this.device_feature_select, write:$data$jscomp$151$$ => {
    this.device_feature_select = $data$jscomp$151$$;
  }, }, {bytes:4, name:"device_feature", read:() => this.device_feature[this.device_feature_select] || 0, write:() => {
  }, }, {bytes:4, name:"driver_feature_select", read:() => this.driver_feature_select, write:$data$jscomp$153$$ => {
    this.driver_feature_select = $data$jscomp$153$$;
  }, }, {bytes:4, name:"driver_feature", read:() => this.driver_feature[this.driver_feature_select] || 0, write:$data$jscomp$154$$ => {
    const $supported_feature$$ = this.device_feature[this.driver_feature_select];
    this.driver_feature_select < this.driver_feature.length && (this.driver_feature[this.driver_feature_select] = $data$jscomp$154$$ & $supported_feature$$);
    this.features_ok = this.features_ok && !($data$jscomp$154$$ & ~$supported_feature$$);
  }, }, {bytes:2, name:"msix_config", read:() => {
    $dbg_log$$("No msi-x capability supported.", 2097152);
    return 65535;
  }, write:() => {
    $dbg_log$$("No msi-x capability supported.", 2097152);
  }, }, {bytes:2, name:"num_queues", read:() => this.queues.length, write:() => {
  }, }, {bytes:1, name:"device_status", read:() => this.device_status, write:$data$jscomp$157$$ => {
    0 === $data$jscomp$157$$ ? ($dbg_log$$("Reset device<" + this.name + ">", 2097152), this.reset()) : $data$jscomp$157$$ & 128 ? $dbg_log$$("Warning: Device<" + this.name + "> status failed", 2097152) : $dbg_log$$("Device<" + this.name + "> status: " + ($data$jscomp$157$$ & 1 ? "ACKNOWLEDGE " : "") + ($data$jscomp$157$$ & 2 ? "DRIVER " : "") + ($data$jscomp$157$$ & 4 ? "DRIVER_OK" : "") + ($data$jscomp$157$$ & 8 ? "FEATURES_OK " : "") + ($data$jscomp$157$$ & 64 ? "DEVICE_NEEDS_RESET" : ""), 2097152);
    $data$jscomp$157$$ & ~this.device_status & 4 && this.device_status & 64 && this.notify_config_changes();
    this.features_ok || ($data$jscomp$157$$ & 8 && $dbg_log$$("Removing FEATURES_OK", 2097152), $data$jscomp$157$$ &= -9);
    this.device_status = $data$jscomp$157$$;
    if ($data$jscomp$157$$ & ~this.device_status & 4) {
      $options$jscomp$39$$.on_driver_ok();
    }
  }, }, {bytes:1, name:"config_generation", read:() => this.config_generation, write:() => {
  }, }, {bytes:2, name:"queue_select", read:() => this.queue_select, write:$data$jscomp$159$$ => {
    this.queue_select = $data$jscomp$159$$;
    this.queue_selected = this.queue_select < this.queues.length ? this.queues[this.queue_select] : null;
  }, }, {bytes:2, name:"queue_size", read:() => this.queue_selected ? this.queue_selected.size : 0, write:$data$jscomp$160$$ => {
    this.queue_selected && ($data$jscomp$160$$ & $data$jscomp$160$$ - 1 && ($dbg_log$$("Warning: dev<" + this.name + "> Given queue size was not a power of 2. Rounding up to next power of 2.", 2097152), $data$jscomp$160$$ = 1 << $v86util$$.int_log2($data$jscomp$160$$ - 1) + 1), $data$jscomp$160$$ > this.queue_selected.size_supported && ($dbg_log$$("Warning: dev<" + this.name + "> Trying to set queue size greater than supported. Clamping to supported size.", 2097152), $data$jscomp$160$$ = this.queue_selected.size_supported), 
    this.queue_selected.set_size($data$jscomp$160$$));
  }, }, {bytes:2, name:"queue_msix_vector", read:() => {
    $dbg_log$$("No msi-x capability supported.", 2097152);
    return 65535;
  }, write:() => {
    $dbg_log$$("No msi-x capability supported.", 2097152);
  }, }, {bytes:2, name:"queue_enable", read:() => this.queue_selected ? this.queue_selected.enabled | 0 : 0, write:$data$jscomp$162$$ => {
    this.queue_selected && (1 === $data$jscomp$162$$ ? this.queue_selected.is_configured() ? this.queue_selected.enable() : $dbg_log$$("Driver bug: tried enabling unconfigured queue", 2097152) : 0 === $data$jscomp$162$$ && $dbg_log$$("Driver bug: tried writing 0 to queue_enable", 2097152));
  }, }, {bytes:2, name:"queue_notify_off", read:() => this.queue_selected ? this.queue_selected.notify_offset : 0, write:() => {
  }, }, {bytes:4, name:"queue_desc (low dword)", read:() => this.queue_selected ? this.queue_selected.desc_addr : 0, write:$data$jscomp$164$$ => {
    this.queue_selected && (this.queue_selected.desc_addr = $data$jscomp$164$$);
  }, }, {bytes:4, name:"queue_desc (high dword)", read:() => 0, write:$data$jscomp$165$$ => {
    0 !== $data$jscomp$165$$ && $dbg_log$$("Warning: High dword of 64 bit queue_desc ignored:" + $data$jscomp$165$$, 2097152);
  }, }, {bytes:4, name:"queue_avail (low dword)", read:() => this.queue_selected ? this.queue_selected.avail_addr : 0, write:$data$jscomp$166$$ => {
    this.queue_selected && (this.queue_selected.avail_addr = $data$jscomp$166$$);
  }, }, {bytes:4, name:"queue_avail (high dword)", read:() => 0, write:$data$jscomp$167$$ => {
    0 !== $data$jscomp$167$$ && $dbg_log$$("Warning: High dword of 64 bit queue_avail ignored:" + $data$jscomp$167$$, 2097152);
  }, }, {bytes:4, name:"queue_used (low dword)", read:() => this.queue_selected ? this.queue_selected.used_addr : 0, write:$data$jscomp$168$$ => {
    this.queue_selected && (this.queue_selected.used_addr = $data$jscomp$168$$);
  }, }, {bytes:4, name:"queue_used (high dword)", read:() => 0, write:$data$jscomp$169$$ => {
    0 !== $data$jscomp$169$$ && $dbg_log$$("Warning: High dword of 64 bit queue_used ignored:" + $data$jscomp$169$$, 2097152);
  }, }, ], };
};
$VirtIO$$.prototype.create_notification_capability = function($options$jscomp$40$$) {
  const $notify_struct$$ = [];
  let $notify_off_multiplier$$;
  $options$jscomp$40$$.single_handler ? ($dbg_assert$$(1 === $options$jscomp$40$$.handlers.length, "VirtIO device<" + this.name + "> too many notify handlers specified: expected single handler"), $notify_off_multiplier$$ = 0) : $notify_off_multiplier$$ = 2;
  for (const [$i$jscomp$54$$, $handler$jscomp$13$$] of $options$jscomp$40$$.handlers.entries()) {
    $notify_struct$$.push({bytes:2, name:"notify" + $i$jscomp$54$$, read:() => 65535, write:$handler$jscomp$13$$ || (() => {
    }), });
  }
  return {type:2, bar:1, port:$options$jscomp$40$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array([$notify_off_multiplier$$ & 255, $notify_off_multiplier$$ >> 8 & 255, $notify_off_multiplier$$ >> 16 & 255, $notify_off_multiplier$$ >> 24, ]), struct:$notify_struct$$, };
};
$VirtIO$$.prototype.create_isr_capability = function($options$jscomp$41$$) {
  return {type:3, bar:2, port:$options$jscomp$41$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array(0), struct:[{bytes:1, name:"isr_status", read:() => {
    const $isr_status$$ = this.isr_status;
    this.lower_irq();
    return $isr_status$$;
  }, write:() => {
  }, }, ], };
};
$VirtIO$$.prototype.create_device_specific_capability = function($options$jscomp$42$$) {
  $dbg_assert$$(~$options$jscomp$42$$.offset & 3, "VirtIO device<" + this.name + "> device specific cap offset must be 4-byte aligned");
  return {type:4, bar:3, port:$options$jscomp$42$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array(0), struct:$options$jscomp$42$$.struct, };
};
$VirtIO$$.prototype.init_capabilities = function($cap_len$jscomp$1_capabilities$jscomp$1_write$$) {
  let $cap_next$$ = this.pci_space[52] = 64;
  var $bar_offset_cap_ptr_port$jscomp$2$$ = $cap_next$$;
  for (const $cap$jscomp$2$$ of $cap_len$jscomp$1_capabilities$jscomp$1_write$$) {
    $cap_len$jscomp$1_capabilities$jscomp$1_write$$ = 16 + $cap$jscomp$2$$.extra.length;
    $bar_offset_cap_ptr_port$jscomp$2$$ = $cap_next$$;
    $cap_next$$ = $bar_offset_cap_ptr_port$jscomp$2$$ + $cap_len$jscomp$1_capabilities$jscomp$1_write$$;
    $dbg_assert$$(256 >= $cap_next$$, "VirtIO device<" + this.name + "> can't fit all capabilities into 256byte configspace");
    $dbg_assert$$(0 <= $cap$jscomp$2$$.bar && 6 > $cap$jscomp$2$$.bar, "VirtIO device<" + this.name + "> capability invalid bar number");
    var $bar_size_shim_read8_on_16$$ = $cap$jscomp$2$$.struct.reduce(($bytes$jscomp$3$$, $field$$) => $bytes$jscomp$3$$ + $field$$.bytes, 0);
    $bar_size_shim_read8_on_16$$ += $cap$jscomp$2$$.offset;
    $bar_size_shim_read8_on_16$$ = 16 > $bar_size_shim_read8_on_16$$ ? 16 : 1 << $v86util$$.int_log2($bar_size_shim_read8_on_16$$ - 1) + 1;
    $dbg_assert$$(0 === ($cap$jscomp$2$$.port & $bar_size_shim_read8_on_16$$ - 1), "VirtIO device<" + this.name + "> capability port should be aligned to pci bar size");
    this.pci_bars[$cap$jscomp$2$$.bar] = {size:$bar_size_shim_read8_on_16$$, };
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$] = 9;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 1] = $cap_next$$;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 2] = $cap_len$jscomp$1_capabilities$jscomp$1_write$$;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 3] = $cap$jscomp$2$$.type;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 4] = $cap$jscomp$2$$.bar;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 5] = 0;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 6] = 0;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 7] = 0;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 8] = $cap$jscomp$2$$.offset & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 9] = $cap$jscomp$2$$.offset >>> 8 & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 10] = $cap$jscomp$2$$.offset >>> 16 & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 11] = $cap$jscomp$2$$.offset >>> 24;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 12] = $bar_size_shim_read8_on_16$$ & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 13] = $bar_size_shim_read8_on_16$$ >>> 8 & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 14] = $bar_size_shim_read8_on_16$$ >>> 16 & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 15] = $bar_size_shim_read8_on_16$$ >>> 24;
    for (const [$i$jscomp$55$$, $extra_byte$$] of $cap$jscomp$2$$.extra.entries()) {
      this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 16 + $i$jscomp$55$$] = $extra_byte$$;
    }
    $bar_offset_cap_ptr_port$jscomp$2$$ = 16 + 4 * $cap$jscomp$2$$.bar;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$] = $cap$jscomp$2$$.port & 254 | !$cap$jscomp$2$$.use_mmio;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 1] = $cap$jscomp$2$$.port >>> 8 & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 2] = $cap$jscomp$2$$.port >>> 16 & 255;
    this.pci_space[$bar_offset_cap_ptr_port$jscomp$2$$ + 3] = $cap$jscomp$2$$.port >>> 24 & 255;
    $bar_offset_cap_ptr_port$jscomp$2$$ = $cap$jscomp$2$$.port + $cap$jscomp$2$$.offset;
    for (const $field$jscomp$1$$ of $cap$jscomp$2$$.struct) {
      let $read$$ = $field$jscomp$1$$.read;
      $cap_len$jscomp$1_capabilities$jscomp$1_write$$ = $field$jscomp$1$$.write;
      $read$$ = () => {
        const $val$$ = $field$jscomp$1$$.read();
        $dbg_log$$("Device<" + this.name + "> cap[" + $cap$jscomp$2$$.type + "] read[" + $field$jscomp$1$$.name + "] => " + $h$$($val$$, 8 * $field$jscomp$1$$.bytes), 2097152);
        return $val$$;
      };
      $cap_len$jscomp$1_capabilities$jscomp$1_write$$ = $data$jscomp$172$$ => {
        $dbg_log$$("Device<" + this.name + "> cap[" + $cap$jscomp$2$$.type + "] write[" + $field$jscomp$1$$.name + "] <= " + $h$$($data$jscomp$172$$, 8 * $field$jscomp$1$$.bytes), 2097152);
        $field$jscomp$1$$.write($data$jscomp$172$$);
      };
      if ($cap$jscomp$2$$.use_mmio) {
        $dbg_assert$$(!1, "VirtIO device <" + this.name + "> mmio capability not implemented.");
      } else {
        $bar_size_shim_read8_on_16$$ = function($addr$jscomp$44$$) {
          $dbg_log$$("Warning: 8-bit read from 16-bit virtio port", 2097152);
          return $read$$($addr$jscomp$44$$ & -2) >> (($addr$jscomp$44$$ & 1) << 3) & 255;
        };
        const $shim_read8_on_32$$ = function($addr$jscomp$45$$) {
          $dbg_log$$("Warning: 8-bit read from 32-bit virtio port", 2097152);
          return $read$$($addr$jscomp$45$$ & -4) >> (($addr$jscomp$45$$ & 3) << 3) & 255;
        };
        switch($field$jscomp$1$$.bytes) {
          case 4:
            this.cpu.io.register_read($bar_offset_cap_ptr_port$jscomp$2$$, this, $shim_read8_on_32$$, void 0, $read$$);
            this.cpu.io.register_write($bar_offset_cap_ptr_port$jscomp$2$$, this, void 0, void 0, $cap_len$jscomp$1_capabilities$jscomp$1_write$$);
            break;
          case 2:
            this.cpu.io.register_read($bar_offset_cap_ptr_port$jscomp$2$$, this, $bar_size_shim_read8_on_16$$, $read$$);
            this.cpu.io.register_write($bar_offset_cap_ptr_port$jscomp$2$$, this, void 0, $cap_len$jscomp$1_capabilities$jscomp$1_write$$);
            break;
          case 1:
            this.cpu.io.register_read($bar_offset_cap_ptr_port$jscomp$2$$, this, $read$$);
            this.cpu.io.register_write($bar_offset_cap_ptr_port$jscomp$2$$, this, $cap_len$jscomp$1_capabilities$jscomp$1_write$$);
            break;
          default:
            $dbg_assert$$(!1, "VirtIO device <" + this.name + "> invalid capability field width of " + $field$jscomp$1$$.bytes + " bytes");
        }
      }
      $bar_offset_cap_ptr_port$jscomp$2$$ += $field$jscomp$1$$.bytes;
    }
  }
  $dbg_assert$$(256 >= $cap_next$$ + 20, "VirtIO device<" + this.name + "> can't fit all capabilities into 256byte configspace");
  this.pci_space[$cap_next$$] = 9;
  this.pci_space[$cap_next$$ + 1] = 0;
  this.pci_space[$cap_next$$ + 2] = 20;
  this.pci_space[$cap_next$$ + 3] = 5;
  this.pci_space[$cap_next$$ + 4] = 0;
  this.pci_space[$cap_next$$ + 5] = 0;
  this.pci_space[$cap_next$$ + 6] = 0;
  this.pci_space[$cap_next$$ + 7] = 0;
  this.pci_space[$cap_next$$ + 8] = 0;
  this.pci_space[$cap_next$$ + 9] = 0;
  this.pci_space[$cap_next$$ + 10] = 0;
  this.pci_space[$cap_next$$ + 11] = 0;
  this.pci_space[$cap_next$$ + 12] = 0;
  this.pci_space[$cap_next$$ + 13] = 0;
  this.pci_space[$cap_next$$ + 14] = 0;
  this.pci_space[$cap_next$$ + 15] = 0;
  this.pci_space[$cap_next$$ + 16] = 0;
  this.pci_space[$cap_next$$ + 17] = 0;
  this.pci_space[$cap_next$$ + 18] = 0;
  this.pci_space[$cap_next$$ + 19] = 0;
};
$VirtIO$$.prototype.get_state = function() {
  let $state$jscomp$41$$ = [];
  $state$jscomp$41$$[0] = this.device_feature_select;
  $state$jscomp$41$$[1] = this.driver_feature_select;
  $state$jscomp$41$$[2] = this.device_feature;
  $state$jscomp$41$$[3] = this.driver_feature;
  $state$jscomp$41$$[4] = this.features_ok;
  $state$jscomp$41$$[5] = this.device_status;
  $state$jscomp$41$$[6] = this.config_has_changed;
  $state$jscomp$41$$[7] = this.config_generation;
  $state$jscomp$41$$[8] = this.isr_status;
  $state$jscomp$41$$[9] = this.queue_select;
  return $state$jscomp$41$$ = $state$jscomp$41$$.concat(this.queues);
};
$VirtIO$$.prototype.set_state = function($state$jscomp$42$$) {
  this.device_feature_select = $state$jscomp$42$$[0];
  this.driver_feature_select = $state$jscomp$42$$[1];
  this.device_feature = $state$jscomp$42$$[2];
  this.driver_feature = $state$jscomp$42$$[3];
  this.features_ok = $state$jscomp$42$$[4];
  this.device_status = $state$jscomp$42$$[5];
  this.config_has_changed = $state$jscomp$42$$[6];
  this.config_generation = $state$jscomp$42$$[7];
  this.isr_status = $state$jscomp$42$$[8];
  this.queue_select = $state$jscomp$42$$[9];
  let $i$jscomp$56$$ = 0;
  for (const $queue$$ of $state$jscomp$42$$.slice(10)) {
    this.queues[$i$jscomp$56$$].set_state($queue$$), $i$jscomp$56$$++;
  }
  this.queue_selected = this.queues[this.queue_select] || null;
};
$VirtIO$$.prototype.reset = function() {
  this.driver_feature_select = this.device_feature_select = 0;
  this.driver_feature.set(this.device_feature);
  this.features_ok = !0;
  this.queue_select = this.device_status = 0;
  this.queue_selected = this.queues[0];
  for (const $queue$jscomp$1$$ of this.queues) {
    $queue$jscomp$1$$.reset();
  }
  this.config_has_changed = !1;
  this.config_generation = 0;
  this.lower_irq();
};
$VirtIO$$.prototype.notify_config_changes = function() {
  this.config_has_changed = !0;
  this.device_status & 4 ? this.raise_irq(2) : $dbg_assert$$(!1, "VirtIO device<" + this.name + "> attempted to notify driver before DRIVER_OK");
};
$VirtIO$$.prototype.update_config_generation = function() {
  this.config_has_changed && (this.config_generation++, this.config_generation &= 255, this.config_has_changed = !1);
};
$VirtIO$$.prototype.is_feature_negotiated = function($feature$jscomp$4$$) {
  return 0 < (this.driver_feature[$feature$jscomp$4$$ >>> 5] & 1 << ($feature$jscomp$4$$ & 31));
};
$VirtIO$$.prototype.needs_reset = function() {
  $dbg_log$$("Device<" + this.name + "> experienced error - requires reset", 2097152);
  this.device_status |= 64;
  this.device_status & 4 && this.notify_config_changes();
};
$VirtIO$$.prototype.raise_irq = function($type$jscomp$154$$) {
  $dbg_log$$("Raise irq " + $h$$($type$jscomp$154$$), 2097152);
  this.isr_status |= $type$jscomp$154$$;
  this.pci.raise_irq(this.pci_id);
};
$VirtIO$$.prototype.lower_irq = function() {
  $dbg_log$$("Lower irq ", 2097152);
  this.isr_status = 0;
  this.pci.lower_irq(this.pci_id);
};
function $VirtQueue$$($cpu$jscomp$19$$, $virtio$$, $options$jscomp$43$$) {
  this.cpu = $cpu$jscomp$19$$;
  this.virtio = $virtio$$;
  this.size_supported = this.size = $options$jscomp$43$$.size_supported;
  this.mask = this.size - 1;
  this.enabled = !1;
  this.notify_offset = $options$jscomp$43$$.notify_offset;
  this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0;
  this.reset();
}
$VirtQueue$$.prototype.get_state = function() {
  const $state$jscomp$43$$ = [];
  $state$jscomp$43$$[0] = this.size;
  $state$jscomp$43$$[1] = this.size_supported;
  $state$jscomp$43$$[2] = this.enabled;
  $state$jscomp$43$$[3] = this.notify_offset;
  $state$jscomp$43$$[4] = this.desc_addr;
  $state$jscomp$43$$[5] = this.avail_addr;
  $state$jscomp$43$$[6] = this.avail_last_idx;
  $state$jscomp$43$$[7] = this.used_addr;
  $state$jscomp$43$$[8] = this.num_staged_replies;
  return $state$jscomp$43$$;
};
$VirtQueue$$.prototype.set_state = function($state$jscomp$44$$) {
  this.size = $state$jscomp$44$$[0];
  this.size_supported = $state$jscomp$44$$[1];
  this.enabled = $state$jscomp$44$$[2];
  this.notify_offset = $state$jscomp$44$$[3];
  this.desc_addr = $state$jscomp$44$$[4];
  this.avail_addr = $state$jscomp$44$$[5];
  this.avail_last_idx = $state$jscomp$44$$[6];
  this.used_addr = $state$jscomp$44$$[7];
  this.num_staged_replies = $state$jscomp$44$$[8];
  this.mask = this.size - 1;
};
$VirtQueue$$.prototype.reset = function() {
  this.enabled = !1;
  this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0;
  this.set_size(this.size_supported);
};
$VirtQueue$$.prototype.is_configured = function() {
  return this.desc_addr && this.avail_addr && this.used_addr;
};
$VirtQueue$$.prototype.enable = function() {
  $dbg_assert$$(this.is_configured(), "VirtQueue must be configured before enabled");
  this.enabled = !0;
};
$VirtQueue$$.prototype.set_size = function($size$jscomp$35$$) {
  $dbg_assert$$(0 === ($size$jscomp$35$$ & $size$jscomp$35$$ - 1), "VirtQueue size must be power of 2 or zero");
  $dbg_assert$$($size$jscomp$35$$ <= this.size_supported, "VirtQueue size must be within supported size");
  this.size = $size$jscomp$35$$;
  this.mask = $size$jscomp$35$$ - 1;
};
$VirtQueue$$.prototype.count_requests = function() {
  $dbg_assert$$(this.avail_addr, "VirtQueue addresses must be configured before use");
  return this.avail_get_idx() - this.avail_last_idx & this.mask;
};
$VirtQueue$$.prototype.has_request = function() {
  $dbg_assert$$(this.avail_addr, "VirtQueue addresses must be configured before use");
  return (this.avail_get_idx() & this.mask) !== this.avail_last_idx;
};
$VirtQueue$$.prototype.pop_request = function() {
  $dbg_assert$$(this.avail_addr, "VirtQueue addresses must be configured before use");
  $dbg_assert$$(this.has_request(), "VirtQueue must not pop nonexistent request");
  var $bufchain$jscomp$3_desc_idx$$ = this.avail_get_entry(this.avail_last_idx);
  $dbg_log$$("Pop request: avail_last_idx=" + this.avail_last_idx + " desc_idx=" + $bufchain$jscomp$3_desc_idx$$, 2097152);
  $bufchain$jscomp$3_desc_idx$$ = new $VirtQueueBufferChain$$(this, $bufchain$jscomp$3_desc_idx$$);
  this.avail_last_idx = this.avail_last_idx + 1 & this.mask;
  return $bufchain$jscomp$3_desc_idx$$;
};
$VirtQueue$$.prototype.push_reply = function($bufchain$jscomp$4$$) {
  $dbg_assert$$(this.used_addr, "VirtQueue addresses must be configured before use");
  $dbg_assert$$(this.num_staged_replies < this.size, "VirtQueue replies must not exceed queue size");
  const $used_idx$$ = this.used_get_idx() + this.num_staged_replies & this.mask;
  $dbg_log$$("Push reply: used_idx=" + $used_idx$$ + " desc_idx=" + $bufchain$jscomp$4$$.head_idx, 2097152);
  this.used_set_entry($used_idx$$, $bufchain$jscomp$4$$.head_idx, $bufchain$jscomp$4$$.length_written);
  this.num_staged_replies++;
};
$VirtQueue$$.prototype.flush_replies = function() {
  $dbg_assert$$(this.used_addr, "VirtQueue addresses must be configured before use");
  if (0 === this.num_staged_replies) {
    $dbg_log$$("flush_replies: Nothing to flush", 2097152);
  } else {
    $dbg_log$$("Flushing " + this.num_staged_replies + " replies", 2097152);
    var $new_idx$$ = this.used_get_idx() + this.num_staged_replies & 65535;
    this.used_set_idx($new_idx$$);
    this.num_staged_replies = 0;
    this.virtio.is_feature_negotiated(29) ? (this.avail_get_used_event(), this.virtio.raise_irq(1)) : ~this.avail_get_flags() & 1 && this.virtio.raise_irq(1);
  }
};
$VirtQueue$$.prototype.notify_me_after = function($avail_event_num_skipped_requests$$) {
  $dbg_assert$$(0 <= $avail_event_num_skipped_requests$$, "Must skip a non-negative number of requests");
  $avail_event_num_skipped_requests$$ = this.avail_get_idx() + $avail_event_num_skipped_requests$$ & 65535;
  this.used_set_avail_event($avail_event_num_skipped_requests$$);
};
$VirtQueue$$.prototype.get_descriptor = function($table_address$$, $i$jscomp$57$$) {
  return {addr_low:this.cpu.read32s($table_address$$ + 16 * $i$jscomp$57$$), addr_high:this.cpu.read32s($table_address$$ + 16 * $i$jscomp$57$$ + 4), len:this.cpu.read32s($table_address$$ + 16 * $i$jscomp$57$$ + 8), flags:this.cpu.read16($table_address$$ + 16 * $i$jscomp$57$$ + 12), next:this.cpu.read16($table_address$$ + 16 * $i$jscomp$57$$ + 14), };
};
$VirtQueue$$.prototype.avail_get_flags = function() {
  return this.cpu.read16(this.avail_addr);
};
$VirtQueue$$.prototype.avail_get_idx = function() {
  return this.cpu.read16(this.avail_addr + 2);
};
$VirtQueue$$.prototype.avail_get_entry = function($i$jscomp$58$$) {
  return this.cpu.read16(this.avail_addr + 4 + 2 * $i$jscomp$58$$);
};
$VirtQueue$$.prototype.avail_get_used_event = function() {
  return this.cpu.read16(this.avail_addr + 4 + 2 * this.size);
};
$VirtQueue$$.prototype.used_get_flags = function() {
  return this.cpu.read16(this.used_addr);
};
$VirtQueue$$.prototype.used_set_flags = function($value$jscomp$176$$) {
  this.cpu.write16(this.used_addr, $value$jscomp$176$$);
};
$VirtQueue$$.prototype.used_get_idx = function() {
  return this.cpu.read16(this.used_addr + 2);
};
$VirtQueue$$.prototype.used_set_idx = function($value$jscomp$177$$) {
  this.cpu.write16(this.used_addr + 2, $value$jscomp$177$$);
};
$VirtQueue$$.prototype.used_set_entry = function($i$jscomp$59$$, $desc_idx$jscomp$1$$, $length_written$$) {
  this.cpu.write32(this.used_addr + 4 + 8 * $i$jscomp$59$$, $desc_idx$jscomp$1$$);
  this.cpu.write32(this.used_addr + 8 + 8 * $i$jscomp$59$$, $length_written$$);
};
$VirtQueue$$.prototype.used_set_avail_event = function($value$jscomp$178$$) {
  this.cpu.write16(this.used_addr + 4 + 8 * this.size, $value$jscomp$178$$);
};
function $VirtQueueBufferChain$$($virtqueue$$, $desc_idx$jscomp$2_head_idx$$) {
  this.cpu = $virtqueue$$.cpu;
  this.virtio = $virtqueue$$.virtio;
  this.head_idx = $desc_idx$jscomp$2_head_idx$$;
  this.read_buffers = [];
  this.length_readable = this.read_buffer_offset = this.read_buffer_idx = 0;
  this.write_buffers = [];
  this.length_writable = this.length_written = this.write_buffer_offset = this.write_buffer_idx = 0;
  let $table_address$jscomp$1$$ = $virtqueue$$.desc_addr, $chain_length$$ = 0, $chain_max$$ = $virtqueue$$.size, $writable_region$$ = !1;
  const $has_indirect_feature$$ = this.virtio.is_feature_negotiated(28);
  $dbg_log$$("<<< Descriptor chain start", 2097152);
  do {
    const $desc$$ = $virtqueue$$.get_descriptor($table_address$jscomp$1$$, $desc_idx$jscomp$2_head_idx$$);
    $dbg_log$$("descriptor: idx=" + $desc_idx$jscomp$2_head_idx$$ + " addr=" + $h$$($desc$$.addr_high, 8) + ":" + $h$$($desc$$.addr_low, 8) + " len=" + $h$$($desc$$.len, 8) + " flags=" + $h$$($desc$$.flags, 4) + " next=" + $h$$($desc$$.next, 4), 2097152);
    if ($has_indirect_feature$$ && $desc$$.flags & 4) {
      $desc$$.flags & 1 && $dbg_log$$("Driver bug: has set VIRTQ_DESC_F_NEXT flag in an indirect table descriptor", 2097152), $table_address$jscomp$1$$ = $desc$$.addr_low, $chain_length$$ = $desc_idx$jscomp$2_head_idx$$ = 0, $chain_max$$ = $desc$$.len / 16, $dbg_log$$("start indirect", 2097152);
    } else {
      if ($desc$$.flags & 2) {
        $writable_region$$ = !0, this.write_buffers.push($desc$$), this.length_writable += $desc$$.len;
      } else {
        if ($writable_region$$) {
          $dbg_log$$("Driver bug: readonly buffer after writeonly buffer within chain", 2097152);
          break;
        }
        this.read_buffers.push($desc$$);
        this.length_readable += $desc$$.len;
      }
      $chain_length$$++;
      if ($chain_length$$ > $chain_max$$) {
        $dbg_log$$("Driver bug: descriptor chain cycle detected", 2097152);
        break;
      }
      if ($desc$$.flags & 1) {
        $desc_idx$jscomp$2_head_idx$$ = $desc$$.next;
      } else {
        break;
      }
    }
  } while (1);
  $dbg_log$$("Descriptor chain end >>>", 2097152);
}
$VirtQueueBufferChain$$.prototype.get_next_blob = function($dest_buffer$$) {
  let $dest_offset$$ = 0, $remaining$jscomp$1$$ = $dest_buffer$$.length;
  for (; $remaining$jscomp$1$$;) {
    if (this.read_buffer_idx === this.read_buffers.length) {
      $dbg_log$$("Device<" + this.virtio.name + "> Read more than device-readable buffers has", 2097152);
      break;
    }
    var $buf$jscomp$1_read_length$$ = this.read_buffers[this.read_buffer_idx];
    const $read_address$$ = $buf$jscomp$1_read_length$$.addr_low + this.read_buffer_offset;
    $buf$jscomp$1_read_length$$ = $buf$jscomp$1_read_length$$.len - this.read_buffer_offset;
    $buf$jscomp$1_read_length$$ > $remaining$jscomp$1$$ ? ($buf$jscomp$1_read_length$$ = $remaining$jscomp$1$$, this.read_buffer_offset += $remaining$jscomp$1$$) : (this.read_buffer_idx++, this.read_buffer_offset = 0);
    $dest_buffer$$.set(this.cpu.read_blob($read_address$$, $buf$jscomp$1_read_length$$), $dest_offset$$);
    $dest_offset$$ += $buf$jscomp$1_read_length$$;
    $remaining$jscomp$1$$ -= $buf$jscomp$1_read_length$$;
  }
  return $dest_offset$$;
};
$VirtQueueBufferChain$$.prototype.set_next_blob = function($src_buffer$$) {
  let $src_offset$$ = 0, $remaining$jscomp$2$$ = $src_buffer$$.length;
  for (; $remaining$jscomp$2$$;) {
    if (this.write_buffer_idx === this.write_buffers.length) {
      $dbg_log$$("Device<" + this.virtio.name + "> Write more than device-writable capacity", 2097152);
      break;
    }
    var $buf$jscomp$2_write_length$$ = this.write_buffers[this.write_buffer_idx];
    const $write_address$$ = $buf$jscomp$2_write_length$$.addr_low + this.write_buffer_offset;
    $buf$jscomp$2_write_length$$ = $buf$jscomp$2_write_length$$.len - this.write_buffer_offset;
    $buf$jscomp$2_write_length$$ > $remaining$jscomp$2$$ ? ($buf$jscomp$2_write_length$$ = $remaining$jscomp$2$$, this.write_buffer_offset += $remaining$jscomp$2$$) : (this.write_buffer_idx++, this.write_buffer_offset = 0);
    this.cpu.write_blob($src_buffer$$.subarray($src_offset$$, $src_offset$$ + $buf$jscomp$2_write_length$$), $write_address$$);
    $src_offset$$ += $buf$jscomp$2_write_length$$;
    $remaining$jscomp$2$$ -= $buf$jscomp$2_write_length$$;
  }
  this.length_written += $src_offset$$;
  return $src_offset$$;
};
function $VirtioConsole$$($cpu$jscomp$20$$, $bus$jscomp$10_queues$$) {
  this.bus = $bus$jscomp$10_queues$$;
  this.rows = 25;
  this.cols = 80;
  this.ports = 4;
  $bus$jscomp$10_queues$$ = [{size_supported:16, notify_offset:0, }, {size_supported:16, notify_offset:1, }, {size_supported:16, notify_offset:2, }, {size_supported:16, notify_offset:3, }, ];
  for (let $i$jscomp$60$$ = 1; $i$jscomp$60$$ < this.ports; ++$i$jscomp$60$$) {
    $bus$jscomp$10_queues$$.push({size_supported:16, notify_offset:0}), $bus$jscomp$10_queues$$.push({size_supported:8, notify_offset:1});
  }
  this.virtio = new $VirtIO$$($cpu$jscomp$20$$, {name:"virtio-console", pci_id:56, device_id:4163, subsystem_device_id:3, common:{initial_port:47104, queues:$bus$jscomp$10_queues$$, features:[0, 1, 32, ], on_driver_ok:() => {
  }, }, notification:{initial_port:47360, single_handler:!1, handlers:[$queue$jscomp$2_queue_id$jscomp$1$$ => {
    for ($queue$jscomp$2_queue_id$jscomp$1$$ = this.virtio.queues[$queue$jscomp$2_queue_id$jscomp$1$$]; $queue$jscomp$2_queue_id$jscomp$1$$.count_requests() > $queue$jscomp$2_queue_id$jscomp$1$$.size - 2;) {
      $queue$jscomp$2_queue_id$jscomp$1$$.pop_request();
    }
  }, $queue_id$jscomp$2$$ => {
    const $queue$jscomp$3$$ = this.virtio.queues[$queue_id$jscomp$2$$], $port$jscomp$3$$ = 3 < $queue_id$jscomp$2$$ ? $queue_id$jscomp$2$$ - 3 >> 1 : 0;
    for (; $queue$jscomp$3$$.has_request();) {
      const $bufchain$jscomp$5$$ = $queue$jscomp$3$$.pop_request(), $buffer$jscomp$38$$ = new Uint8Array($bufchain$jscomp$5$$.length_readable);
      $bufchain$jscomp$5$$.get_next_blob($buffer$jscomp$38$$);
      this.bus.send("virtio-console" + $port$jscomp$3$$ + "-output-bytes", $buffer$jscomp$38$$);
      this.Ack($queue_id$jscomp$2$$, $bufchain$jscomp$5$$);
    }
  }, $queue$jscomp$4_queue_id$jscomp$3$$ => {
    if (2 !== $queue$jscomp$4_queue_id$jscomp$3$$) {
      $dbg_assert$$(!1, "VirtioConsole Notified for wrong queue: " + $queue$jscomp$4_queue_id$jscomp$3$$ + " (expected queue_id of 2)");
    } else {
      for ($queue$jscomp$4_queue_id$jscomp$3$$ = this.virtio.queues[$queue$jscomp$4_queue_id$jscomp$3$$]; $queue$jscomp$4_queue_id$jscomp$3$$.count_requests() > $queue$jscomp$4_queue_id$jscomp$3$$.size - 2;) {
        $queue$jscomp$4_queue_id$jscomp$3$$.pop_request();
      }
    }
  }, $queue_id$jscomp$4$$ => {
    if (3 !== $queue_id$jscomp$4$$) {
      $dbg_assert$$(!1, "VirtioConsole Notified for wrong queue: " + $queue_id$jscomp$4$$ + " (expected queue_id of 3)");
    } else {
      for (var $queue$jscomp$5$$ = this.virtio.queues[$queue_id$jscomp$4$$]; $queue$jscomp$5$$.has_request();) {
        var $bufchain$jscomp$6_i$jscomp$61$$ = $queue$jscomp$5$$.pop_request(), $buffer$jscomp$39_port$jscomp$4$$ = new Uint8Array($bufchain$jscomp$6_i$jscomp$61$$.length_readable);
        $bufchain$jscomp$6_i$jscomp$61$$.get_next_blob($buffer$jscomp$39_port$jscomp$4$$);
        var $event$jscomp$4_parts$jscomp$2$$ = $marshall$$.Unmarshall(["w", "h", "h"], $buffer$jscomp$39_port$jscomp$4$$, {offset:0});
        $buffer$jscomp$39_port$jscomp$4$$ = $event$jscomp$4_parts$jscomp$2$$[0];
        $event$jscomp$4_parts$jscomp$2$$ = $event$jscomp$4_parts$jscomp$2$$[1];
        this.Ack($queue_id$jscomp$4$$, $bufchain$jscomp$6_i$jscomp$61$$);
        switch($event$jscomp$4_parts$jscomp$2$$) {
          case 0:
            for ($bufchain$jscomp$6_i$jscomp$61$$ = 0; $bufchain$jscomp$6_i$jscomp$61$$ < this.ports; ++$bufchain$jscomp$6_i$jscomp$61$$) {
              this.SendEvent($bufchain$jscomp$6_i$jscomp$61$$, 1, 0);
            }
            break;
          case 3:
            this.Ack($queue_id$jscomp$4$$, $bufchain$jscomp$6_i$jscomp$61$$);
            this.SendEvent($buffer$jscomp$39_port$jscomp$4$$, 4, 1);
            this.SendName($buffer$jscomp$39_port$jscomp$4$$, "virtio-" + $buffer$jscomp$39_port$jscomp$4$$);
            this.SendEvent($buffer$jscomp$39_port$jscomp$4$$, 6, 1);
            break;
          case 6:
            this.Ack($queue_id$jscomp$4$$, $bufchain$jscomp$6_i$jscomp$61$$);
            0 === $buffer$jscomp$39_port$jscomp$4$$ && this.SendWindowSize($buffer$jscomp$39_port$jscomp$4$$);
            break;
          default:
            $dbg_assert$$(!1, " VirtioConsole received unknown event: " + $event$jscomp$4_parts$jscomp$2$$[1]);
            return;
        }
      }
    }
  }, ], }, isr_status:{initial_port:46848, }, device_specific:{initial_port:46592, struct:[{bytes:2, name:"cols", read:() => this.cols, write:() => {
  }, }, {bytes:2, name:"rows", read:() => this.rows, write:() => {
  }, }, {bytes:4, name:"max_nr_ports", read:() => this.ports, write:() => {
  }, }, {bytes:4, name:"emerg_wr", read:() => 0, write:() => {
    $dbg_assert$$(!1, "Emergency write!");
  }, }, ]}, });
  for (let $port$jscomp$5$$ = 0; $port$jscomp$5$$ < this.ports; ++$port$jscomp$5$$) {
    const $queue_id$jscomp$5$$ = 0 === $port$jscomp$5$$ ? 0 : 2 * $port$jscomp$5$$ + 2;
    this.bus.register("virtio-console" + $port$jscomp$5$$ + "-input-bytes", function($data$jscomp$177$$) {
      var $bufchain$jscomp$7_queue$jscomp$6$$ = this.virtio.queues[$queue_id$jscomp$5$$];
      $bufchain$jscomp$7_queue$jscomp$6$$.has_request() && ($bufchain$jscomp$7_queue$jscomp$6$$ = $bufchain$jscomp$7_queue$jscomp$6$$.pop_request(), this.Send($queue_id$jscomp$5$$, $bufchain$jscomp$7_queue$jscomp$6$$, new Uint8Array($data$jscomp$177$$)));
    }, this);
    this.bus.register("virtio-console" + $port$jscomp$5$$ + "-resize", function($size$jscomp$36$$) {
      this.cols = $size$jscomp$36$$[0];
      this.rows = $size$jscomp$36$$[1];
      this.virtio.queues[2].is_configured() && this.virtio.queues[2].has_request() && this.SendWindowSize($port$jscomp$5$$);
    }, this);
  }
}
$VirtioConsole$$.prototype.SendWindowSize = function($port$jscomp$6$$) {
  const $bufchain$jscomp$8$$ = this.virtio.queues[2].pop_request(), $buf$jscomp$3$$ = new Uint8Array(12);
  $marshall$$.Marshall(["w", "h", "h", "h", "h"], [$port$jscomp$6$$, 5, 0, this.rows, this.cols], $buf$jscomp$3$$, 0);
  this.Send(2, $bufchain$jscomp$8$$, $buf$jscomp$3$$);
};
$VirtioConsole$$.prototype.SendName = function($i$jscomp$62_port$jscomp$7$$, $name$jscomp$79_namex$$) {
  const $bufchain$jscomp$9$$ = this.virtio.queues[2].pop_request();
  $name$jscomp$79_namex$$ = (new TextEncoder).encode($name$jscomp$79_namex$$);
  const $buf$jscomp$4$$ = new Uint8Array(8 + $name$jscomp$79_namex$$.length + 1);
  $marshall$$.Marshall(["w", "h", "h"], [$i$jscomp$62_port$jscomp$7$$, 7, 1], $buf$jscomp$4$$, 0);
  for ($i$jscomp$62_port$jscomp$7$$ = 0; $i$jscomp$62_port$jscomp$7$$ < $name$jscomp$79_namex$$.length; ++$i$jscomp$62_port$jscomp$7$$) {
    $buf$jscomp$4$$[$i$jscomp$62_port$jscomp$7$$ + 8] = $name$jscomp$79_namex$$[$i$jscomp$62_port$jscomp$7$$];
  }
  $buf$jscomp$4$$[8 + $name$jscomp$79_namex$$.length] = 0;
  this.Send(2, $bufchain$jscomp$9$$, $buf$jscomp$4$$);
};
$VirtioConsole$$.prototype.get_state = function() {
  const $state$jscomp$45$$ = [];
  $state$jscomp$45$$[0] = this.virtio;
  $state$jscomp$45$$[1] = this.rows;
  $state$jscomp$45$$[2] = this.cols;
  $state$jscomp$45$$[3] = this.ports;
  return $state$jscomp$45$$;
};
$VirtioConsole$$.prototype.set_state = function($state$jscomp$46$$) {
  this.virtio.set_state($state$jscomp$46$$[0]);
  this.rows = $state$jscomp$46$$[1];
  this.cols = $state$jscomp$46$$[2];
  this.ports = $state$jscomp$46$$[3];
};
$VirtioConsole$$.prototype.reset = function() {
  this.virtio.reset();
};
$VirtioConsole$$.prototype.SendEvent = function($port$jscomp$8$$, $event$jscomp$5$$, $value$jscomp$180$$) {
  const $bufchain$jscomp$10$$ = this.virtio.queues[2].pop_request(), $buf$jscomp$5$$ = new Uint8Array(8);
  $marshall$$.Marshall(["w", "h", "h"], [$port$jscomp$8$$, $event$jscomp$5$$, $value$jscomp$180$$], $buf$jscomp$5$$, 0);
  this.Send(2, $bufchain$jscomp$10$$, $buf$jscomp$5$$);
};
$VirtioConsole$$.prototype.Send = function($queue_id$jscomp$6$$, $bufchain$jscomp$11$$, $blob$jscomp$14$$) {
  $bufchain$jscomp$11$$.set_next_blob($blob$jscomp$14$$);
  this.virtio.queues[$queue_id$jscomp$6$$].push_reply($bufchain$jscomp$11$$);
  this.virtio.queues[$queue_id$jscomp$6$$].flush_replies();
};
$VirtioConsole$$.prototype.Ack = function($queue_id$jscomp$7$$, $bufchain$jscomp$12$$) {
  $bufchain$jscomp$12$$.set_next_blob(new Uint8Array(0));
  this.virtio.queues[$queue_id$jscomp$7$$].push_reply($bufchain$jscomp$12$$);
  this.virtio.queues[$queue_id$jscomp$7$$].flush_replies();
};
function $VirtioNet$$($cpu$jscomp$21$$, $bus$jscomp$11_queues$jscomp$1$$, $i$jscomp$63_preserve_mac_from_state_image$jscomp$1$$) {
  this.bus = $bus$jscomp$11_queues$jscomp$1$$;
  this.id = $cpu$jscomp$21$$.devices.net ? 1 : 0;
  this.status = this.pairs = 1;
  this.preserve_mac_from_state_image = $i$jscomp$63_preserve_mac_from_state_image$jscomp$1$$;
  this.mac = new Uint8Array([0, 34, 21, 255 * Math.random() | 0, 255 * Math.random() | 0, 255 * Math.random() | 0, ]);
  this.bus.send("net" + this.id + "-mac", $format_mac$$(this.mac));
  $bus$jscomp$11_queues$jscomp$1$$ = [];
  for ($i$jscomp$63_preserve_mac_from_state_image$jscomp$1$$ = 0; $i$jscomp$63_preserve_mac_from_state_image$jscomp$1$$ < this.pairs; ++$i$jscomp$63_preserve_mac_from_state_image$jscomp$1$$) {
    $bus$jscomp$11_queues$jscomp$1$$.push({size_supported:32, notify_offset:0}), $bus$jscomp$11_queues$jscomp$1$$.push({size_supported:32, notify_offset:1});
  }
  $bus$jscomp$11_queues$jscomp$1$$.push({size_supported:16, notify_offset:2, });
  this.virtio = new $VirtIO$$($cpu$jscomp$21$$, {name:"virtio-net", pci_id:80, device_id:4161, subsystem_device_id:1, common:{initial_port:51200, queues:$bus$jscomp$11_queues$jscomp$1$$, features:[5, 16, 22, 3, 17, 23, 32, ], on_driver_ok:() => {
  }, }, notification:{initial_port:51456, single_handler:!1, handlers:[$queue$jscomp$8_queue_id$jscomp$8$$ => {
    $queue$jscomp$8_queue_id$jscomp$8$$ = this.virtio.queues[$queue$jscomp$8_queue_id$jscomp$8$$];
    var $bufchain$jscomp$13_desc_idx$jscomp$3$$ = $queue$jscomp$8_queue_id$jscomp$8$$.avail_get_entry($queue$jscomp$8_queue_id$jscomp$8$$.avail_last_idx);
    $bufchain$jscomp$13_desc_idx$jscomp$3$$ = new $VirtQueueBufferChain$$($queue$jscomp$8_queue_id$jscomp$8$$, $bufchain$jscomp$13_desc_idx$jscomp$3$$);
    $queue$jscomp$8_queue_id$jscomp$8$$.avail_last_idx = $queue$jscomp$8_queue_id$jscomp$8$$.avail_last_idx + 1 & $queue$jscomp$8_queue_id$jscomp$8$$.mask;
    this.virtio.queues[0].push_reply($bufchain$jscomp$13_desc_idx$jscomp$3$$);
    this.virtio.queues[0].flush_replies();
  }, $queue_id$jscomp$9$$ => {
    const $queue$jscomp$9$$ = this.virtio.queues[$queue_id$jscomp$9$$];
    for (; $queue$jscomp$9$$.has_request();) {
      const $bufchain$jscomp$14$$ = $queue$jscomp$9$$.pop_request(), $buffer$jscomp$40$$ = new Uint8Array($bufchain$jscomp$14$$.length_readable);
      $bufchain$jscomp$14$$.get_next_blob($buffer$jscomp$40$$);
      this.bus.send("net" + this.id + "-send", $buffer$jscomp$40$$.subarray(12));
      this.bus.send("eth-transmit-end", [$buffer$jscomp$40$$.length - 12]);
      this.virtio.queues[$queue_id$jscomp$9$$].push_reply($bufchain$jscomp$14$$);
    }
    this.virtio.queues[$queue_id$jscomp$9$$].flush_replies();
  }, $queue_id$jscomp$10$$ => {
    if ($queue_id$jscomp$10$$ !== 2 * this.pairs) {
      $dbg_assert$$(!1, "VirtioConsole Notified for wrong queue: " + $queue_id$jscomp$10$$ + " (expected queue_id of 3)");
    } else {
      for (var $queue$jscomp$10$$ = this.virtio.queues[$queue_id$jscomp$10$$]; $queue$jscomp$10$$.has_request();) {
        const $bufchain$jscomp$15$$ = $queue$jscomp$10$$.pop_request();
        var $buffer$jscomp$41_data$jscomp$178$$ = new Uint8Array($bufchain$jscomp$15$$.length_readable);
        $bufchain$jscomp$15$$.get_next_blob($buffer$jscomp$41_data$jscomp$178$$);
        var $command_parts$jscomp$3$$ = $marshall$$.Unmarshall(["b", "b"], $buffer$jscomp$41_data$jscomp$178$$, {offset:0});
        const $xclass$$ = $command_parts$jscomp$3$$[0];
        $command_parts$jscomp$3$$ = $command_parts$jscomp$3$$[1];
        switch($xclass$$ << 8 | $command_parts$jscomp$3$$) {
          case 1024:
            $buffer$jscomp$41_data$jscomp$178$$ = $marshall$$.Unmarshall(["h"], $buffer$jscomp$41_data$jscomp$178$$, {offset:2});
            $dbg_assert$$(1 === $buffer$jscomp$41_data$jscomp$178$$[0]);
            this.Send($queue_id$jscomp$10$$, $bufchain$jscomp$15$$, new Uint8Array([0]));
            break;
          case 257:
            this.mac = $buffer$jscomp$41_data$jscomp$178$$.subarray(2, 8);
            this.Send($queue_id$jscomp$10$$, $bufchain$jscomp$15$$, new Uint8Array([0]));
            this.bus.send("net" + this.id + "-mac", $format_mac$$(this.mac));
            break;
          default:
            $dbg_assert$$(!1, " VirtioConsole received unknown command: " + $xclass$$ + ":" + $command_parts$jscomp$3$$);
            this.Send($queue_id$jscomp$10$$, $bufchain$jscomp$15$$, new Uint8Array([1]));
            return;
        }
      }
    }
  }, ], }, isr_status:{initial_port:50944, }, device_specific:{initial_port:50688, struct:[0, 1, 2, 3, 4, 5].map(($v$jscomp$4$$, $k$$) => ({bytes:1, name:"mac_" + $k$$, read:() => this.mac[$k$$], write:() => {
  }, })).concat([{bytes:2, name:"status", read:() => this.status, write:() => {
  }, }, {bytes:2, name:"max_pairs", read:() => this.pairs, write:() => {
  }, }, {bytes:2, name:"mtu", read:() => 1500, write:() => {
  }, }])}, });
  this.bus.register("net" + this.id + "-receive", $bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$ => {
    this.bus.send("eth-receive-end", [$bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$.length]);
    const $with_header$$ = new Uint8Array(12 + $bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$.byteLength);
    (new DataView($with_header$$.buffer, $with_header$$.byteOffset, $with_header$$.byteLength)).setInt16(10, 1);
    $with_header$$.set($bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$, 12);
    $bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$ = this.virtio.queues[0];
    $bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$.has_request() ? ($bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$ = $bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$.pop_request(), $bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$.set_next_blob($with_header$$), this.virtio.queues[0].push_reply($bufchain$jscomp$16_data$jscomp$183_queue$jscomp$11$$), this.virtio.queues[0].flush_replies()) : console.log("No buffer to write into!");
  }, this);
}
$VirtioNet$$.prototype.get_state = function() {
  const $state$jscomp$47$$ = [];
  $state$jscomp$47$$[0] = this.virtio;
  $state$jscomp$47$$[1] = this.id;
  this.preserve_mac_from_state_image && (this.mac = $state$jscomp$47$$[2], this.bus.send("net" + this.id + "-mac", $format_mac$$(this.mac)));
  return $state$jscomp$47$$;
};
$VirtioNet$$.prototype.set_state = function($state$jscomp$48$$) {
  this.virtio.set_state($state$jscomp$48$$[0]);
};
$VirtioNet$$.prototype.Reset = function() {
};
$VirtioNet$$.prototype.Send = function($queue_id$jscomp$11$$, $bufchain$jscomp$17$$, $blob$jscomp$15$$) {
  $bufchain$jscomp$17$$.set_next_blob($blob$jscomp$15$$);
  this.virtio.queues[$queue_id$jscomp$11$$].push_reply($bufchain$jscomp$17$$);
  this.virtio.queues[$queue_id$jscomp$11$$].flush_replies();
};
$VirtioNet$$.prototype.Ack = function($queue_id$jscomp$12$$, $bufchain$jscomp$18$$) {
  this.virtio.queues[$queue_id$jscomp$12$$].push_reply($bufchain$jscomp$18$$);
  this.virtio.queues[$queue_id$jscomp$12$$].flush_replies();
};
var $Bus$$ = {};
function $BusConnector$$() {
  this.listeners = {};
  this.pair = void 0;
}
$BusConnector$$.prototype.register = function($name$jscomp$80$$, $fn$jscomp$16$$, $this_value$jscomp$1$$) {
  var $listeners$$ = this.listeners[$name$jscomp$80$$];
  void 0 === $listeners$$ && ($listeners$$ = this.listeners[$name$jscomp$80$$] = []);
  $listeners$$.push({fn:$fn$jscomp$16$$, this_value:$this_value$jscomp$1$$, });
};
$BusConnector$$.prototype.unregister = function($name$jscomp$81$$, $fn$jscomp$17$$) {
  var $listeners$jscomp$1$$ = this.listeners[$name$jscomp$81$$];
  void 0 !== $listeners$jscomp$1$$ && (this.listeners[$name$jscomp$81$$] = $listeners$jscomp$1$$.filter(function($l$$) {
    return $l$$.fn !== $fn$jscomp$17$$;
  }));
};
$BusConnector$$.prototype.send = function($listeners$jscomp$2_name$jscomp$82$$, $value$jscomp$181$$) {
  if (this.pair && ($listeners$jscomp$2_name$jscomp$82$$ = this.pair.listeners[$listeners$jscomp$2_name$jscomp$82$$], void 0 !== $listeners$jscomp$2_name$jscomp$82$$)) {
    for (var $i$jscomp$64$$ = 0; $i$jscomp$64$$ < $listeners$jscomp$2_name$jscomp$82$$.length; $i$jscomp$64$$++) {
      var $listener$jscomp$64$$ = $listeners$jscomp$2_name$jscomp$82$$[$i$jscomp$64$$];
      $listener$jscomp$64$$.fn.call($listener$jscomp$64$$.this_value, $value$jscomp$181$$);
    }
  }
};
$BusConnector$$.prototype.send_async = function($name$jscomp$83$$, $value$jscomp$182$$) {
  $dbg_assert$$(1 === arguments.length || 2 === arguments.length);
  setTimeout(this.send.bind(this, $name$jscomp$83$$, $value$jscomp$182$$), 0);
};
$Bus$$.create = function() {
  var $c0$$ = new $BusConnector$$, $c1$$ = new $BusConnector$$;
  $c0$$.pair = $c1$$;
  $c1$$.pair = $c0$$;
  return [$c0$$, $c1$$];
};
var $dbg_log$$ = function() {
  var $dbg_names$$ = $LOG_NAMES$$.reduce(function($a$jscomp$3$$, $x$jscomp$100$$) {
    $a$jscomp$3$$[$x$jscomp$100$$[0]] = $x$jscomp$100$$[1];
    return $a$jscomp$3$$;
  }, {}), $log_last_message$$ = "", $log_message_repetitions$$ = 0;
  return function($message$jscomp$30_stuff$$, $level$jscomp$19_now$jscomp$9_time_str$$) {
    $level$jscomp$19_now$jscomp$9_time_str$$ = $level$jscomp$19_now$jscomp$9_time_str$$ || 1;
    if ($level$jscomp$19_now$jscomp$9_time_str$$ & $LOG_LEVEL$$) {
      $message$jscomp$30_stuff$$ = "[" + $v86util$$.pads($dbg_names$$[$level$jscomp$19_now$jscomp$9_time_str$$] || "", 4) + "] " + $message$jscomp$30_stuff$$;
      if ($message$jscomp$30_stuff$$ === $log_last_message$$ && ($log_message_repetitions$$++, 2048 > $log_message_repetitions$$)) {
        return;
      }
      $level$jscomp$19_now$jscomp$9_time_str$$ = new Date;
      $level$jscomp$19_now$jscomp$9_time_str$$ = $v86util$$.pad0($level$jscomp$19_now$jscomp$9_time_str$$.getHours(), 2) + ":" + $v86util$$.pad0($level$jscomp$19_now$jscomp$9_time_str$$.getMinutes(), 2) + ":" + $v86util$$.pad0($level$jscomp$19_now$jscomp$9_time_str$$.getSeconds(), 2) + "+" + $v86util$$.pad0($level$jscomp$19_now$jscomp$9_time_str$$.getMilliseconds(), 3) + " ";
      $log_message_repetitions$$ && (1 === $log_message_repetitions$$ ? console.log($level$jscomp$19_now$jscomp$9_time_str$$ + $log_last_message$$) : console.log("Previous message repeated " + $log_message_repetitions$$ + " times"), $log_message_repetitions$$ = 0);
      console.log($level$jscomp$19_now$jscomp$9_time_str$$ + $message$jscomp$30_stuff$$);
      $log_last_message$$ = $message$jscomp$30_stuff$$;
    }
  };
}();
function $dbg_assert$$($cond$$, $msg$jscomp$1$$) {
  if (!$cond$$) {
    debugger;
    console.trace();
    if ($msg$jscomp$1$$) {
      throw "Assert failed: " + $msg$jscomp$1$$;
    }
    throw "Assert failed";
  }
}
;function $CPU$$($bus$jscomp$12$$, $memory$jscomp$1_wm$$, $stop_idling$$) {
  this.stop_idling = $stop_idling$$;
  this.wm = $memory$jscomp$1_wm$$;
  this.wasm_patch();
  this.create_jit_imports();
  this.wasm_memory = $memory$jscomp$1_wm$$ = this.wm.exports.memory;
  this.memory_size = $v86util$$.view(Uint32Array, $memory$jscomp$1_wm$$, 812, 1);
  this.mem8 = new Uint8Array(0);
  this.mem32s = new Int32Array(this.mem8.buffer);
  this.segment_is_null = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 724, 8);
  this.segment_offsets = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 736, 8);
  this.segment_limits = $v86util$$.view(Uint32Array, $memory$jscomp$1_wm$$, 768, 8);
  this.segment_access_bytes = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 512, 8);
  this.protected_mode = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 800, 1);
  this.idtr_size = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 564, 1);
  this.idtr_offset = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 568, 1);
  this.gdtr_size = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 572, 1);
  this.gdtr_offset = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 576, 1);
  this.tss_size_32 = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 1128, 1);
  this.page_fault = $v86util$$.view(Uint32Array, $memory$jscomp$1_wm$$, 540, 8);
  this.cr = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 580, 8);
  this.cpl = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 612, 1);
  this.is_32 = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 804, 1);
  this.stack_size_32 = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 808, 1);
  this.in_hlt = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 616, 1);
  this.last_virt_eip = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 620, 1);
  this.eip_phys = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 624, 1);
  this.sysenter_cs = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 636, 1);
  this.sysenter_esp = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 640, 1);
  this.sysenter_eip = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 644, 1);
  this.prefixes = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 648, 1);
  this.flags = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 120, 1);
  this.flags_changed = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 100, 1);
  this.last_op_size = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 96, 1);
  this.last_op1 = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 104, 1);
  this.last_result = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 112, 1);
  this.current_tsc = $v86util$$.view(Uint32Array, $memory$jscomp$1_wm$$, 960, 2);
  this.devices = {};
  this.instruction_pointer = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 556, 1);
  this.previous_ip = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 560, 1);
  this.apic_enabled = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 548, 1);
  this.acpi_enabled = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 552, 1);
  this.memory_map_read8 = [];
  this.memory_map_write8 = [];
  this.memory_map_read32 = [];
  this.memory_map_write32 = [];
  this.bios = {main:null, vga:null, };
  this.instruction_counter = $v86util$$.view(Uint32Array, $memory$jscomp$1_wm$$, 664, 1);
  this.reg32 = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 64, 8);
  this.fpu_st = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 1152, 32);
  this.fpu_stack_empty = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 816, 1);
  this.fpu_stack_empty[0] = 255;
  this.fpu_stack_ptr = $v86util$$.view(Uint8Array, $memory$jscomp$1_wm$$, 1032, 1);
  this.fpu_stack_ptr[0] = 0;
  this.fpu_control_word = $v86util$$.view(Uint16Array, $memory$jscomp$1_wm$$, 1036, 1);
  this.fpu_control_word[0] = 895;
  this.fpu_status_word = $v86util$$.view(Uint16Array, $memory$jscomp$1_wm$$, 1040, 1);
  this.fpu_status_word[0] = 0;
  this.fpu_ip = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 1048, 1);
  this.fpu_ip[0] = 0;
  this.fpu_ip_selector = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 1052, 1);
  this.fpu_ip_selector[0] = 0;
  this.fpu_opcode = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 1044, 1);
  this.fpu_opcode[0] = 0;
  this.fpu_dp = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 1056, 1);
  this.fpu_dp[0] = 0;
  this.fpu_dp_selector = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 1060, 1);
  this.fpu_dp_selector[0] = 0;
  this.reg_xmm32s = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 832, 32);
  this.mxcsr = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 824, 1);
  this.sreg = $v86util$$.view(Uint16Array, $memory$jscomp$1_wm$$, 668, 8);
  this.dreg = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 684, 8);
  this.reg_pdpte = $v86util$$.view(Int32Array, $memory$jscomp$1_wm$$, 968, 8);
  this.svga_dirty_bitmap_min_offset = $v86util$$.view(Uint32Array, $memory$jscomp$1_wm$$, 716, 1);
  this.svga_dirty_bitmap_max_offset = $v86util$$.view(Uint32Array, $memory$jscomp$1_wm$$, 720, 1);
  this.fw_value = [];
  this.fw_pointer = 0;
  this.option_roms = [];
  this.io = void 0;
  this.bus = $bus$jscomp$12$$;
  this.set_tsc(0, 0);
  this.debug_init();
  this.seen_code = {};
  this.seen_code_uncompiled = {};
}
$CPU$$.prototype.clear_opstats = function() {
  (new Uint8Array(this.wasm_memory.buffer, 32768, 131072)).fill(0);
  this.wm.exports.profiler_init();
};
$CPU$$.prototype.create_jit_imports = function() {
  const $jit_imports$$ = Object.create(null);
  $jit_imports$$.m = this.wm.exports.memory;
  for (const $name$jscomp$84$$ of Object.keys(this.wm.exports)) {
    $name$jscomp$84$$.startsWith("_") || $name$jscomp$84$$.startsWith("zstd") || $name$jscomp$84$$.endsWith("_js") || ($jit_imports$$[$name$jscomp$84$$] = this.wm.exports[$name$jscomp$84$$]);
  }
  this.jit_imports = $jit_imports$$;
};
$CPU$$.prototype.wasm_patch = function() {
  const $get_optional_import$$ = $name$jscomp$85$$ => this.wm.exports[$name$jscomp$85$$], $get_import$$ = $name$jscomp$86$$ => {
    const $f$jscomp$4$$ = $get_optional_import$$($name$jscomp$86$$);
    console.assert($f$jscomp$4$$, "Missing import: " + $name$jscomp$86$$);
    return $f$jscomp$4$$;
  };
  this.reset_cpu = $get_import$$("reset_cpu");
  this.getiopl = $get_import$$("getiopl");
  this.get_eflags = $get_import$$("get_eflags");
  this.handle_irqs = $get_import$$("handle_irqs");
  this.main_loop = $get_import$$("main_loop");
  this.set_jit_config = $get_import$$("set_jit_config");
  this.read8 = $get_import$$("read8");
  this.read16 = $get_import$$("read16");
  this.read32s = $get_import$$("read32s");
  this.write8 = $get_import$$("write8");
  this.write16 = $get_import$$("write16");
  this.write32 = $get_import$$("write32");
  this.in_mapped_range = $get_import$$("in_mapped_range");
  this.fpu_load_tag_word = $get_import$$("fpu_load_tag_word");
  this.fpu_load_status_word = $get_import$$("fpu_load_status_word");
  this.fpu_get_sti_f64 = $get_import$$("fpu_get_sti_f64");
  this.translate_address_system_read = $get_import$$("translate_address_system_read_js");
  this.get_seg_cs = $get_import$$("get_seg_cs");
  this.get_real_eip = $get_import$$("get_real_eip");
  this.clear_tlb = $get_import$$("clear_tlb");
  this.full_clear_tlb = $get_import$$("full_clear_tlb");
  this.update_state_flags = $get_import$$("update_state_flags");
  this.set_tsc = $get_import$$("set_tsc");
  this.store_current_tsc = $get_import$$("store_current_tsc");
  this.set_cpuid_level = $get_import$$("set_cpuid_level");
  this.pic_set_irq = $get_import$$("pic_set_irq");
  this.pic_clear_irq = $get_import$$("pic_clear_irq");
  this.jit_force_generate_unsafe = $get_optional_import$$("jit_force_generate_unsafe");
  this.jit_clear_cache = $get_import$$("jit_clear_cache_js");
  this.jit_dirty_cache = $get_import$$("jit_dirty_cache");
  this.codegen_finalize_finished = $get_import$$("codegen_finalize_finished");
  this.allocate_memory = $get_import$$("allocate_memory");
  this.zero_memory = $get_import$$("zero_memory");
  this.svga_allocate_memory = $get_import$$("svga_allocate_memory");
  this.svga_allocate_dest_buffer = $get_import$$("svga_allocate_dest_buffer");
  this.svga_fill_pixel_buffer = $get_import$$("svga_fill_pixel_buffer");
  this.svga_mark_dirty = $get_import$$("svga_mark_dirty");
  this.get_pic_addr_master = $get_import$$("get_pic_addr_master");
  this.get_pic_addr_slave = $get_import$$("get_pic_addr_slave");
  this.zstd_create_ctx = $get_import$$("zstd_create_ctx");
  this.zstd_get_src_ptr = $get_import$$("zstd_get_src_ptr");
  this.zstd_free_ctx = $get_import$$("zstd_free_ctx");
  this.zstd_read = $get_import$$("zstd_read");
  this.zstd_read_free = $get_import$$("zstd_read_free");
  this.port20_read = $get_import$$("port20_read");
  this.port21_read = $get_import$$("port21_read");
  this.portA0_read = $get_import$$("portA0_read");
  this.portA1_read = $get_import$$("portA1_read");
  this.port20_write = $get_import$$("port20_write");
  this.port21_write = $get_import$$("port21_write");
  this.portA0_write = $get_import$$("portA0_write");
  this.portA1_write = $get_import$$("portA1_write");
  this.port4D0_read = $get_import$$("port4D0_read");
  this.port4D1_read = $get_import$$("port4D1_read");
  this.port4D0_write = $get_import$$("port4D0_write");
  this.port4D1_write = $get_import$$("port4D1_write");
};
$CPU$$.prototype.jit_force_generate = function($addr$jscomp$46$$) {
  this.jit_force_generate_unsafe ? this.jit_force_generate_unsafe($addr$jscomp$46$$) : $dbg_assert$$(!1, "Not supported in this wasm build: jit_force_generate_unsafe");
};
$CPU$$.prototype.jit_clear_func = function($index$jscomp$91$$) {
  $dbg_assert$$(0 <= $index$jscomp$91$$ && 900 > $index$jscomp$91$$);
  this.wm.wasm_table.set($index$jscomp$91$$ + 1024, null);
};
$CPU$$.prototype.jit_clear_all_funcs = function() {
  const $table$$ = this.wm.wasm_table;
  for (let $i$jscomp$65$$ = 0; 900 > $i$jscomp$65$$; $i$jscomp$65$$++) {
    $table$$.set(1024 + $i$jscomp$65$$, null);
  }
};
$CPU$$.prototype.get_state = function() {
  var $state$jscomp$49$$ = [];
  $state$jscomp$49$$[0] = this.memory_size[0];
  $state$jscomp$49$$[1] = new Uint8Array([...this.segment_is_null, ...this.segment_access_bytes]);
  $state$jscomp$49$$[2] = this.segment_offsets;
  $state$jscomp$49$$[3] = this.segment_limits;
  $state$jscomp$49$$[4] = this.protected_mode[0];
  $state$jscomp$49$$[5] = this.idtr_offset[0];
  $state$jscomp$49$$[6] = this.idtr_size[0];
  $state$jscomp$49$$[7] = this.gdtr_offset[0];
  $state$jscomp$49$$[8] = this.gdtr_size[0];
  $state$jscomp$49$$[9] = this.page_fault[0];
  $state$jscomp$49$$[10] = this.cr;
  $state$jscomp$49$$[11] = this.cpl[0];
  $state$jscomp$49$$[13] = this.is_32[0];
  $state$jscomp$49$$[16] = this.stack_size_32[0];
  $state$jscomp$49$$[17] = this.in_hlt[0];
  $state$jscomp$49$$[18] = this.last_virt_eip[0];
  $state$jscomp$49$$[19] = this.eip_phys[0];
  $state$jscomp$49$$[22] = this.sysenter_cs[0];
  $state$jscomp$49$$[23] = this.sysenter_eip[0];
  $state$jscomp$49$$[24] = this.sysenter_esp[0];
  $state$jscomp$49$$[25] = this.prefixes[0];
  $state$jscomp$49$$[26] = this.flags[0];
  $state$jscomp$49$$[27] = this.flags_changed[0];
  $state$jscomp$49$$[28] = this.last_op1[0];
  $state$jscomp$49$$[30] = this.last_op_size[0];
  $state$jscomp$49$$[37] = this.instruction_pointer[0];
  $state$jscomp$49$$[38] = this.previous_ip[0];
  $state$jscomp$49$$[39] = this.reg32;
  $state$jscomp$49$$[40] = this.sreg;
  $state$jscomp$49$$[41] = this.dreg;
  $state$jscomp$49$$[42] = this.reg_pdpte;
  this.store_current_tsc();
  $state$jscomp$49$$[43] = this.current_tsc;
  $state$jscomp$49$$[45] = this.devices.virtio_9p;
  $state$jscomp$49$$[46] = this.devices.apic;
  $state$jscomp$49$$[47] = this.devices.rtc;
  $state$jscomp$49$$[48] = this.devices.pci;
  $state$jscomp$49$$[49] = this.devices.dma;
  $state$jscomp$49$$[50] = this.devices.acpi;
  $state$jscomp$49$$[52] = this.devices.vga;
  $state$jscomp$49$$[53] = this.devices.ps2;
  $state$jscomp$49$$[54] = this.devices.uart0;
  $state$jscomp$49$$[55] = this.devices.fdc;
  $state$jscomp$49$$[56] = this.devices.cdrom;
  $state$jscomp$49$$[57] = this.devices.hda;
  $state$jscomp$49$$[58] = this.devices.pit;
  $state$jscomp$49$$[59] = this.devices.net;
  $state$jscomp$49$$[60] = this.get_state_pic();
  $state$jscomp$49$$[61] = this.devices.sb16;
  $state$jscomp$49$$[62] = this.fw_value;
  $state$jscomp$49$$[63] = this.devices.ioapic;
  $state$jscomp$49$$[64] = this.tss_size_32[0];
  $state$jscomp$49$$[66] = this.reg_xmm32s;
  $state$jscomp$49$$[67] = this.fpu_st;
  $state$jscomp$49$$[68] = this.fpu_stack_empty[0];
  $state$jscomp$49$$[69] = this.fpu_stack_ptr[0];
  $state$jscomp$49$$[70] = this.fpu_control_word[0];
  $state$jscomp$49$$[71] = this.fpu_ip[0];
  $state$jscomp$49$$[72] = this.fpu_ip_selector[0];
  $state$jscomp$49$$[73] = this.fpu_dp[0];
  $state$jscomp$49$$[74] = this.fpu_dp_selector[0];
  $state$jscomp$49$$[75] = this.fpu_opcode[0];
  const {packed_memory:$packed_memory$$, bitmap:$bitmap$$} = this.pack_memory();
  $state$jscomp$49$$[77] = $packed_memory$$;
  $state$jscomp$49$$[78] = new Uint8Array($bitmap$$.get_buffer());
  $state$jscomp$49$$[79] = this.devices.uart1;
  $state$jscomp$49$$[80] = this.devices.uart2;
  $state$jscomp$49$$[81] = this.devices.uart3;
  $state$jscomp$49$$[82] = this.devices.virtio_console;
  $state$jscomp$49$$[83] = this.devices.virtio_net;
  return $state$jscomp$49$$;
};
$CPU$$.prototype.get_state_pic = function() {
  const $pic$$ = new Uint8Array(this.wasm_memory.buffer, this.get_pic_addr_master(), 13), $pic_slave$$ = new Uint8Array(this.wasm_memory.buffer, this.get_pic_addr_slave(), 13), $state$jscomp$50$$ = [], $state_slave$$ = [];
  $state$jscomp$50$$[0] = $pic$$[0];
  $state$jscomp$50$$[1] = $pic$$[1];
  $state$jscomp$50$$[2] = $pic$$[2];
  $state$jscomp$50$$[3] = $pic$$[3];
  $state$jscomp$50$$[4] = $pic$$[4];
  $state$jscomp$50$$[5] = $state_slave$$;
  $state$jscomp$50$$[6] = $pic$$[6];
  $state$jscomp$50$$[7] = $pic$$[7];
  $state$jscomp$50$$[8] = $pic$$[8];
  $state$jscomp$50$$[9] = $pic$$[9];
  $state$jscomp$50$$[10] = $pic$$[10];
  $state$jscomp$50$$[11] = $pic$$[11];
  $state$jscomp$50$$[12] = $pic$$[12];
  $state_slave$$[0] = $pic_slave$$[0];
  $state_slave$$[1] = $pic_slave$$[1];
  $state_slave$$[2] = $pic_slave$$[2];
  $state_slave$$[3] = $pic_slave$$[3];
  $state_slave$$[4] = $pic_slave$$[4];
  $state_slave$$[5] = null;
  $state_slave$$[6] = $pic_slave$$[6];
  $state_slave$$[7] = $pic_slave$$[7];
  $state_slave$$[8] = $pic_slave$$[8];
  $state_slave$$[9] = $pic_slave$$[9];
  $state_slave$$[10] = $pic_slave$$[10];
  $state_slave$$[11] = $pic_slave$$[11];
  $state_slave$$[12] = $pic_slave$$[12];
  return $state$jscomp$50$$;
};
$CPU$$.prototype.set_state = function($state$jscomp$51$$) {
  this.memory_size[0] = $state$jscomp$51$$[0];
  this.mem8.length !== this.memory_size[0] && console.warn("Note: Memory size mismatch. we=" + this.mem8.length + " state=" + this.memory_size[0]);
  8 === $state$jscomp$51$$[1].length ? (this.segment_is_null.set($state$jscomp$51$$[1]), this.segment_access_bytes.fill(242), this.segment_access_bytes[1] = 250) : 16 === $state$jscomp$51$$[1].length ? (this.segment_is_null.set($state$jscomp$51$$[1].subarray(0, 8)), this.segment_access_bytes.set($state$jscomp$51$$[1].subarray(8, 16))) : $dbg_assert$$("Unexpected cpu segment state length:" + $state$jscomp$51$$[1].length);
  this.segment_offsets.set($state$jscomp$51$$[2]);
  this.segment_limits.set($state$jscomp$51$$[3]);
  this.protected_mode[0] = $state$jscomp$51$$[4];
  this.idtr_offset[0] = $state$jscomp$51$$[5];
  this.idtr_size[0] = $state$jscomp$51$$[6];
  this.gdtr_offset[0] = $state$jscomp$51$$[7];
  this.gdtr_size[0] = $state$jscomp$51$$[8];
  this.page_fault[0] = $state$jscomp$51$$[9];
  this.cr.set($state$jscomp$51$$[10]);
  this.cpl[0] = $state$jscomp$51$$[11];
  this.is_32[0] = $state$jscomp$51$$[13];
  this.stack_size_32[0] = $state$jscomp$51$$[16];
  this.in_hlt[0] = $state$jscomp$51$$[17];
  this.last_virt_eip[0] = $state$jscomp$51$$[18];
  this.eip_phys[0] = $state$jscomp$51$$[19];
  this.sysenter_cs[0] = $state$jscomp$51$$[22];
  this.sysenter_eip[0] = $state$jscomp$51$$[23];
  this.sysenter_esp[0] = $state$jscomp$51$$[24];
  this.prefixes[0] = $state$jscomp$51$$[25];
  this.flags[0] = $state$jscomp$51$$[26];
  this.flags_changed[0] = $state$jscomp$51$$[27];
  this.last_op1[0] = $state$jscomp$51$$[28];
  this.last_op_size[0] = $state$jscomp$51$$[30];
  this.instruction_pointer[0] = $state$jscomp$51$$[37];
  this.previous_ip[0] = $state$jscomp$51$$[38];
  this.reg32.set($state$jscomp$51$$[39]);
  this.sreg.set($state$jscomp$51$$[40]);
  this.dreg.set($state$jscomp$51$$[41]);
  $state$jscomp$51$$[42] && this.reg_pdpte.set($state$jscomp$51$$[42]);
  this.set_tsc($state$jscomp$51$$[43][0], $state$jscomp$51$$[43][1]);
  this.devices.virtio_9p && this.devices.virtio_9p.set_state($state$jscomp$51$$[45]);
  this.devices.apic && this.devices.apic.set_state($state$jscomp$51$$[46]);
  this.devices.rtc && this.devices.rtc.set_state($state$jscomp$51$$[47]);
  this.devices.pci && this.devices.pci.set_state($state$jscomp$51$$[48]);
  this.devices.dma && this.devices.dma.set_state($state$jscomp$51$$[49]);
  this.devices.acpi && this.devices.acpi.set_state($state$jscomp$51$$[50]);
  this.devices.vga && this.devices.vga.set_state($state$jscomp$51$$[52]);
  this.devices.ps2 && this.devices.ps2.set_state($state$jscomp$51$$[53]);
  this.devices.uart0 && this.devices.uart0.set_state($state$jscomp$51$$[54]);
  this.devices.fdc && this.devices.fdc.set_state($state$jscomp$51$$[55]);
  this.devices.cdrom && this.devices.cdrom.set_state($state$jscomp$51$$[56]);
  this.devices.hda && this.devices.hda.set_state($state$jscomp$51$$[57]);
  this.devices.pit && this.devices.pit.set_state($state$jscomp$51$$[58]);
  this.devices.net && this.devices.net.set_state($state$jscomp$51$$[59]);
  this.set_state_pic($state$jscomp$51$$[60]);
  this.devices.sb16 && this.devices.sb16.set_state($state$jscomp$51$$[61]);
  this.devices.uart1 && this.devices.uart1.set_state($state$jscomp$51$$[79]);
  this.devices.uart2 && this.devices.uart2.set_state($state$jscomp$51$$[80]);
  this.devices.uart3 && this.devices.uart3.set_state($state$jscomp$51$$[81]);
  this.devices.virtio_console && this.devices.virtio_console.set_state($state$jscomp$51$$[82]);
  this.devices.virtio_net && this.devices.virtio_net.set_state($state$jscomp$51$$[83]);
  this.fw_value = $state$jscomp$51$$[62];
  this.devices.ioapic && this.devices.ioapic.set_state($state$jscomp$51$$[63]);
  this.tss_size_32[0] = $state$jscomp$51$$[64];
  this.reg_xmm32s.set($state$jscomp$51$$[66]);
  this.fpu_st.set($state$jscomp$51$$[67]);
  this.fpu_stack_empty[0] = $state$jscomp$51$$[68];
  this.fpu_stack_ptr[0] = $state$jscomp$51$$[69];
  this.fpu_control_word[0] = $state$jscomp$51$$[70];
  this.fpu_ip[0] = $state$jscomp$51$$[71];
  this.fpu_ip_selector[0] = $state$jscomp$51$$[72];
  this.fpu_dp[0] = $state$jscomp$51$$[73];
  this.fpu_dp_selector[0] = $state$jscomp$51$$[74];
  this.fpu_opcode[0] = $state$jscomp$51$$[75];
  const $bitmap$jscomp$1$$ = new $v86util$$.Bitmap($state$jscomp$51$$[78].buffer);
  this.unpack_memory($bitmap$jscomp$1$$, $state$jscomp$51$$[77]);
  this.update_state_flags();
  this.full_clear_tlb();
  this.jit_clear_cache();
};
$CPU$$.prototype.set_state_pic = function($state$jscomp$52$$) {
  const $pic$jscomp$1$$ = new Uint8Array(this.wasm_memory.buffer, this.get_pic_addr_master(), 13), $pic_slave$jscomp$1$$ = new Uint8Array(this.wasm_memory.buffer, this.get_pic_addr_slave(), 13);
  $pic$jscomp$1$$[0] = $state$jscomp$52$$[0];
  $pic$jscomp$1$$[1] = $state$jscomp$52$$[1];
  $pic$jscomp$1$$[2] = $state$jscomp$52$$[2];
  $pic$jscomp$1$$[3] = $state$jscomp$52$$[3];
  $pic$jscomp$1$$[4] = $state$jscomp$52$$[4];
  const $state_slave$jscomp$1$$ = $state$jscomp$52$$[5];
  $pic$jscomp$1$$[6] = $state$jscomp$52$$[6];
  $pic$jscomp$1$$[7] = $state$jscomp$52$$[7];
  $pic$jscomp$1$$[8] = $state$jscomp$52$$[8];
  $pic$jscomp$1$$[9] = $state$jscomp$52$$[9];
  $pic$jscomp$1$$[10] = $state$jscomp$52$$[10];
  $pic$jscomp$1$$[11] = $state$jscomp$52$$[11];
  $pic$jscomp$1$$[12] = $state$jscomp$52$$[12];
  $pic_slave$jscomp$1$$[0] = $state_slave$jscomp$1$$[0];
  $pic_slave$jscomp$1$$[1] = $state_slave$jscomp$1$$[1];
  $pic_slave$jscomp$1$$[2] = $state_slave$jscomp$1$$[2];
  $pic_slave$jscomp$1$$[3] = $state_slave$jscomp$1$$[3];
  $pic_slave$jscomp$1$$[4] = $state_slave$jscomp$1$$[4];
  $pic_slave$jscomp$1$$[6] = $state_slave$jscomp$1$$[6];
  $pic_slave$jscomp$1$$[7] = $state_slave$jscomp$1$$[7];
  $pic_slave$jscomp$1$$[8] = $state_slave$jscomp$1$$[8];
  $pic_slave$jscomp$1$$[9] = $state_slave$jscomp$1$$[9];
  $pic_slave$jscomp$1$$[10] = $state_slave$jscomp$1$$[10];
  $pic_slave$jscomp$1$$[11] = $state_slave$jscomp$1$$[11];
  $pic_slave$jscomp$1$$[12] = $state_slave$jscomp$1$$[12];
};
$CPU$$.prototype.pack_memory = function() {
  $dbg_assert$$(0 === (this.mem8.length & 4095));
  var $bitmap$jscomp$2_page_count$$ = this.mem8.length >> 12, $nonzero_pages_offset$jscomp$54_page_contents$$ = [];
  for ($packed_memory$jscomp$2_page$$ = 0; $packed_memory$jscomp$2_page$$ < $bitmap$jscomp$2_page_count$$; $packed_memory$jscomp$2_page$$++) {
    var $offset$jscomp$53_view$jscomp$6$$ = $packed_memory$jscomp$2_page$$ << 12;
    $offset$jscomp$53_view$jscomp$6$$ = this.mem32s.subarray($offset$jscomp$53_view$jscomp$6$$ >> 2, $offset$jscomp$53_view$jscomp$6$$ + 4096 >> 2);
    let $is_zero$$ = !0;
    for (let $i$jscomp$66$$ = 0; $i$jscomp$66$$ < $offset$jscomp$53_view$jscomp$6$$.length; $i$jscomp$66$$++) {
      if (0 !== $offset$jscomp$53_view$jscomp$6$$[$i$jscomp$66$$]) {
        $is_zero$$ = !1;
        break;
      }
    }
    $is_zero$$ || $nonzero_pages_offset$jscomp$54_page_contents$$.push($packed_memory$jscomp$2_page$$);
  }
  $bitmap$jscomp$2_page_count$$ = new $v86util$$.Bitmap($bitmap$jscomp$2_page_count$$);
  var $packed_memory$jscomp$2_page$$ = new Uint8Array($nonzero_pages_offset$jscomp$54_page_contents$$.length << 12);
  for (const [$i$jscomp$67$$, $page$jscomp$1$$] of $nonzero_pages_offset$jscomp$54_page_contents$$.entries()) {
    $bitmap$jscomp$2_page_count$$.set($page$jscomp$1$$, 1), $nonzero_pages_offset$jscomp$54_page_contents$$ = $page$jscomp$1$$ << 12, $nonzero_pages_offset$jscomp$54_page_contents$$ = this.mem8.subarray($nonzero_pages_offset$jscomp$54_page_contents$$, $nonzero_pages_offset$jscomp$54_page_contents$$ + 4096), $packed_memory$jscomp$2_page$$.set($nonzero_pages_offset$jscomp$54_page_contents$$, $i$jscomp$67$$ << 12);
  }
  return {bitmap:$bitmap$jscomp$2_page_count$$, packed_memory:$packed_memory$jscomp$2_page$$};
};
$CPU$$.prototype.unpack_memory = function($bitmap$jscomp$3$$, $packed_memory$jscomp$3$$) {
  this.zero_memory(this.memory_size[0]);
  const $page_count$jscomp$1$$ = this.memory_size[0] >> 12;
  let $packed_page$$ = 0;
  for (let $page$jscomp$2$$ = 0; $page$jscomp$2$$ < $page_count$jscomp$1$$; $page$jscomp$2$$++) {
    if ($bitmap$jscomp$3$$.get($page$jscomp$2$$)) {
      var $offset$jscomp$55_view$jscomp$7$$ = $packed_page$$ << 12;
      $offset$jscomp$55_view$jscomp$7$$ = $packed_memory$jscomp$3$$.subarray($offset$jscomp$55_view$jscomp$7$$, $offset$jscomp$55_view$jscomp$7$$ + 4096);
      this.mem8.set($offset$jscomp$55_view$jscomp$7$$, $page$jscomp$2$$ << 12);
      $packed_page$$++;
    }
  }
};
$CPU$$.prototype.reboot_internal = function() {
  this.reset_cpu();
  this.fw_value = [];
  this.devices.virtio_9p && this.devices.virtio_9p.Reset();
  this.devices.virtio_console && this.devices.virtio_console.Reset();
  this.devices.virtio_net && this.devices.virtio_net.Reset();
  this.load_bios();
};
$CPU$$.prototype.reset_memory = function() {
  this.mem8.fill(0);
};
$CPU$$.prototype.create_memory = function($size$jscomp$37$$, $memory_offset_minimum_size$$) {
  $size$jscomp$37$$ < $memory_offset_minimum_size$$ ? ($size$jscomp$37$$ = $memory_offset_minimum_size$$, $dbg_log$$("Rounding memory size up to " + $size$jscomp$37$$, 2)) : 0 > ($size$jscomp$37$$ | 0) && ($size$jscomp$37$$ = Math.pow(2, 31) - 131072, $dbg_log$$("Rounding memory size down to " + $size$jscomp$37$$, 2));
  $size$jscomp$37$$ = ($size$jscomp$37$$ - 1 | 131071) + 1 | 0;
  $dbg_assert$$(0 < ($size$jscomp$37$$ | 0));
  $dbg_assert$$(0 === ($size$jscomp$37$$ & 131071));
  console.assert(0 === this.memory_size[0], "Expected uninitialised memory");
  this.memory_size[0] = $size$jscomp$37$$;
  $memory_offset_minimum_size$$ = this.allocate_memory($size$jscomp$37$$);
  this.mem8 = $v86util$$.view(Uint8Array, this.wasm_memory, $memory_offset_minimum_size$$, $size$jscomp$37$$);
  this.mem32s = $v86util$$.view(Uint32Array, this.wasm_memory, $memory_offset_minimum_size$$, $size$jscomp$37$$ >> 2);
};
$CPU$$.prototype.init = function($option_rom$jscomp$1_settings$jscomp$1$$, $device_bus$$) {
  this.create_memory($option_rom$jscomp$1_settings$jscomp$1$$.memory_size || 67108864, $option_rom$jscomp$1_settings$jscomp$1$$.initrd ? 67108864 : 1048576, );
  $option_rom$jscomp$1_settings$jscomp$1$$.disable_jit && this.set_jit_config(0, 1);
  $option_rom$jscomp$1_settings$jscomp$1$$.cpuid_level && this.set_cpuid_level($option_rom$jscomp$1_settings$jscomp$1$$.cpuid_level);
  this.acpi_enabled[0] = +$option_rom$jscomp$1_settings$jscomp$1$$.acpi;
  this.reset_cpu();
  var $ide_device_count_io$jscomp$6$$ = new $IO$$(this);
  this.io = $ide_device_count_io$jscomp$6$$;
  this.bios.main = $option_rom$jscomp$1_settings$jscomp$1$$.bios;
  this.bios.vga = $option_rom$jscomp$1_settings$jscomp$1$$.vga_bios;
  this.load_bios();
  if ($option_rom$jscomp$1_settings$jscomp$1$$.bzimage) {
    const $option_rom$$ = $load_kernel$$(this.mem8, $option_rom$jscomp$1_settings$jscomp$1$$.bzimage, $option_rom$jscomp$1_settings$jscomp$1$$.initrd, $option_rom$jscomp$1_settings$jscomp$1$$.cmdline || "");
    $option_rom$$ && this.option_roms.push($option_rom$$);
  }
  $ide_device_count_io$jscomp$6$$.register_read(179, this, function() {
    $dbg_log$$("port 0xB3 read");
    return 0;
  });
  var $a20_byte$$ = 0;
  $ide_device_count_io$jscomp$6$$.register_read(146, this, function() {
    return $a20_byte$$;
  });
  $ide_device_count_io$jscomp$6$$.register_write(146, this, function($out_byte$jscomp$14$$) {
    $a20_byte$$ = $out_byte$jscomp$14$$;
  });
  $ide_device_count_io$jscomp$6$$.register_read(1297, this, function() {
    if (this.fw_pointer < this.fw_value.length) {
      return this.fw_value[this.fw_pointer++];
    }
    $dbg_assert$$(!1, "config port: Read past value");
    return 0;
  });
  $ide_device_count_io$jscomp$6$$.register_write(1296, this, void 0, function($buffer32_value$jscomp$183$$) {
    function $i32$$($x$jscomp$101$$) {
      return new Uint8Array(Int32Array.of($x$jscomp$101$$).buffer);
    }
    function $to_be16$$($x$jscomp$102$$) {
      return $x$jscomp$102$$ >> 8 | $x$jscomp$102$$ << 8 & 65280;
    }
    function $to_be32$$($x$jscomp$103$$) {
      return $x$jscomp$103$$ << 24 | $x$jscomp$103$$ << 8 & 16711680 | $x$jscomp$103$$ >> 8 & 65280 | $x$jscomp$103$$ >>> 24;
    }
    $dbg_log$$("bios config port, index=" + $h$$($buffer32_value$jscomp$183$$));
    this.fw_pointer = 0;
    if (0 === $buffer32_value$jscomp$183$$) {
      this.fw_value = $i32$$(1431127377);
    } else {
      if (1 === $buffer32_value$jscomp$183$$) {
        this.fw_value = $i32$$(0);
      } else {
        if (3 === $buffer32_value$jscomp$183$$) {
          this.fw_value = $i32$$(this.memory_size[0]);
        } else {
          if (5 === $buffer32_value$jscomp$183$$) {
            this.fw_value = $i32$$(1);
          } else {
            if (15 === $buffer32_value$jscomp$183$$) {
              this.fw_value = $i32$$(1);
            } else {
              if (13 === $buffer32_value$jscomp$183$$) {
                this.fw_value = new Uint8Array(16);
              } else {
                if (25 === $buffer32_value$jscomp$183$$) {
                  $buffer32_value$jscomp$183$$ = new Int32Array(4 + 64 * this.option_roms.length);
                  const $buffer8$$ = new Uint8Array($buffer32_value$jscomp$183$$.buffer);
                  $buffer32_value$jscomp$183$$[0] = $to_be32$$(this.option_roms.length);
                  for (let $i$jscomp$68$$ = 0; $i$jscomp$68$$ < this.option_roms.length; $i$jscomp$68$$++) {
                    const {name:$name$jscomp$87$$, data:$data$jscomp$184$$} = this.option_roms[$i$jscomp$68$$], $file_struct_ptr$$ = 4 + 64 * $i$jscomp$68$$;
                    $dbg_assert$$(65536 > 49152 + $i$jscomp$68$$);
                    $buffer32_value$jscomp$183$$[$file_struct_ptr$$ + 0 >> 2] = $to_be32$$($data$jscomp$184$$.length);
                    $buffer32_value$jscomp$183$$[$file_struct_ptr$$ + 4 >> 2] = $to_be16$$(49152 + $i$jscomp$68$$);
                    $dbg_assert$$(56 > $name$jscomp$87$$.length);
                    for (let $j$jscomp$6$$ = 0; $j$jscomp$6$$ < $name$jscomp$87$$.length; $j$jscomp$6$$++) {
                      $buffer8$$[$file_struct_ptr$$ + 8 + $j$jscomp$6$$] = $name$jscomp$87$$.charCodeAt($j$jscomp$6$$);
                    }
                  }
                  this.fw_value = $buffer8$$;
                } else {
                  32768 <= $buffer32_value$jscomp$183$$ && 49152 > $buffer32_value$jscomp$183$$ ? this.fw_value = $i32$$(0) : 49152 <= $buffer32_value$jscomp$183$$ && $buffer32_value$jscomp$183$$ - 49152 < this.option_roms.length ? this.fw_value = this.option_roms[$buffer32_value$jscomp$183$$ - 49152].data : ($dbg_log$$("Warning: Unimplemented fw index: " + $h$$($buffer32_value$jscomp$183$$)), this.fw_value = $i32$$(0));
                }
              }
            }
          }
        }
      }
    }
  });
  $ide_device_count_io$jscomp$6$$.register_write(128, this, function() {
  });
  $ide_device_count_io$jscomp$6$$.register_read(128, this, function() {
    return 255;
  });
  $ide_device_count_io$jscomp$6$$.register_write(233, this, function() {
  });
  $ide_device_count_io$jscomp$6$$.register_read(32, this, this.port20_read);
  $ide_device_count_io$jscomp$6$$.register_read(33, this, this.port21_read);
  $ide_device_count_io$jscomp$6$$.register_read(160, this, this.portA0_read);
  $ide_device_count_io$jscomp$6$$.register_read(161, this, this.portA1_read);
  $ide_device_count_io$jscomp$6$$.register_write(32, this, this.port20_write);
  $ide_device_count_io$jscomp$6$$.register_write(33, this, this.port21_write);
  $ide_device_count_io$jscomp$6$$.register_write(160, this, this.portA0_write);
  $ide_device_count_io$jscomp$6$$.register_write(161, this, this.portA1_write);
  $ide_device_count_io$jscomp$6$$.register_read(1232, this, this.port4D0_read);
  $ide_device_count_io$jscomp$6$$.register_read(1233, this, this.port4D1_read);
  $ide_device_count_io$jscomp$6$$.register_write(1232, this, this.port4D0_write);
  $ide_device_count_io$jscomp$6$$.register_write(1233, this, this.port4D1_write);
  this.devices = {};
  $option_rom$jscomp$1_settings$jscomp$1$$.load_devices && (this.devices.pci = new $PCI$$(this), this.acpi_enabled[0] && (this.devices.ioapic = new $IOAPIC$$(this), this.devices.apic = new $APIC$$(this), this.devices.acpi = new $ACPI$$(this)), this.devices.rtc = new $RTC$$(this), this.fill_cmos(this.devices.rtc, $option_rom$jscomp$1_settings$jscomp$1$$), this.devices.dma = new $DMA$$(this), this.devices.vga = new $VGAScreen$$(this, $device_bus$$, $option_rom$jscomp$1_settings$jscomp$1$$.screen, $option_rom$jscomp$1_settings$jscomp$1$$.vga_memory_size || 
  8388608, $option_rom$jscomp$1_settings$jscomp$1$$.screen_options || {}), this.devices.ps2 = new $PS2$$(this, $device_bus$$), this.devices.uart0 = new $UART$$(this, 1016, $device_bus$$), $option_rom$jscomp$1_settings$jscomp$1$$.uart1 && (this.devices.uart1 = new $UART$$(this, 760, $device_bus$$)), $option_rom$jscomp$1_settings$jscomp$1$$.uart2 && (this.devices.uart2 = new $UART$$(this, 1E3, $device_bus$$)), $option_rom$jscomp$1_settings$jscomp$1$$.uart3 && (this.devices.uart3 = new $UART$$(this, 
  744, $device_bus$$)), this.devices.fdc = new $FloppyController$$(this, $option_rom$jscomp$1_settings$jscomp$1$$.fda, $option_rom$jscomp$1_settings$jscomp$1$$.fdb), $ide_device_count_io$jscomp$6$$ = 0, $option_rom$jscomp$1_settings$jscomp$1$$.hda && (this.devices.hda = new $IDEDevice$$(this, $option_rom$jscomp$1_settings$jscomp$1$$.hda, $option_rom$jscomp$1_settings$jscomp$1$$.hdb, !1, $ide_device_count_io$jscomp$6$$++, $device_bus$$)), $option_rom$jscomp$1_settings$jscomp$1$$.cdrom && (this.devices.cdrom = 
  new $IDEDevice$$(this, $option_rom$jscomp$1_settings$jscomp$1$$.cdrom, void 0, !0, $ide_device_count_io$jscomp$6$$++, $device_bus$$)), this.devices.pit = new $PIT$$(this, $device_bus$$), "ne2k" === $option_rom$jscomp$1_settings$jscomp$1$$.net_device.type ? this.devices.net = new $Ne2k$$(this, $device_bus$$, $option_rom$jscomp$1_settings$jscomp$1$$.preserve_mac_from_state_image, $option_rom$jscomp$1_settings$jscomp$1$$.mac_address_translation) : "virtio" === $option_rom$jscomp$1_settings$jscomp$1$$.net_device.type && 
  (this.devices.virtio_net = new $VirtioNet$$(this, $device_bus$$, $option_rom$jscomp$1_settings$jscomp$1$$.preserve_mac_from_state_image)), $option_rom$jscomp$1_settings$jscomp$1$$.fs9p && (this.devices.virtio_9p = new $Virtio9p$$($option_rom$jscomp$1_settings$jscomp$1$$.fs9p, this, $device_bus$$)), $option_rom$jscomp$1_settings$jscomp$1$$.virtio_console && (this.devices.virtio_console = new $VirtioConsole$$(this, $device_bus$$)), this.devices.sb16 = new $SB16$$(this, $device_bus$$));
  $option_rom$jscomp$1_settings$jscomp$1$$.multiboot && ($dbg_log$$("loading multiboot", 2), $option_rom$jscomp$1_settings$jscomp$1$$ = this.load_multiboot_option_rom($option_rom$jscomp$1_settings$jscomp$1$$.multiboot, $option_rom$jscomp$1_settings$jscomp$1$$.initrd, $option_rom$jscomp$1_settings$jscomp$1$$.cmdline)) && (this.bios.main ? ($dbg_log$$("adding option rom for multiboot", 2), this.option_roms.push($option_rom$jscomp$1_settings$jscomp$1$$)) : ($dbg_log$$("loaded multiboot without bios", 
  2), this.reg32[0] = this.io.port_read32(244)));
  this.debug.init();
};
$CPU$$.prototype.load_multiboot = function($buffer$jscomp$42$$) {
  this.bios.main && $dbg_assert$$(!1, "load_multiboot not supported with BIOS");
  this.load_multiboot_option_rom($buffer$jscomp$42$$, void 0, "") && ($dbg_log$$("loaded multiboot", 2), this.reg32[0] = this.io.port_read32(244));
};
$CPU$$.prototype.load_multiboot_option_rom = function($buffer$jscomp$43$$, $initrd$$, $cmdline$$) {
  $dbg_log$$("Trying multiboot from buffer of size " + $buffer$jscomp$43$$.byteLength, 2);
  if (8192 > $buffer$jscomp$43$$.byteLength) {
    var $buf32$$ = new Int32Array(2048);
    (new Uint8Array($buf32$$.buffer)).set(new Uint8Array($buffer$jscomp$43$$));
  } else {
    $buf32$$ = new Int32Array($buffer$jscomp$43$$, 0, 2048);
  }
  for (var $offset$jscomp$56$$ = 0; 8192 > $offset$jscomp$56$$; $offset$jscomp$56$$ += 4) {
    if (464367618 === $buf32$$[$offset$jscomp$56$$ >> 2]) {
      var $flags$jscomp$8$$ = $buf32$$[$offset$jscomp$56$$ + 4 >> 2];
      if (464367618 + $flags$jscomp$8$$ + $buf32$$[$offset$jscomp$56$$ + 8 >> 2] | 0) {
        $dbg_log$$("Multiboot checksum check failed", 2);
        continue;
      }
    } else {
      continue;
    }
    $dbg_log$$("Multiboot magic found, flags: " + $h$$($flags$jscomp$8$$ >>> 0, 8), 2);
    $dbg_assert$$(0 === ($flags$jscomp$8$$ & -65540), "TODO");
    var $cpu$jscomp$22$$ = this;
    this.io.register_read(244, this, function() {
      return 0;
    }, function() {
      return 0;
    }, function() {
      var $i$jscomp$71_multiboot_data$$ = 31860, $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ = 0;
      $cmdline$$ && ($entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ |= 4, $cpu$jscomp$22$$.write32(31760, $i$jscomp$71_multiboot_data$$), $cmdline$$ += "\x00", $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ = (new TextEncoder).encode($cmdline$$), $cpu$jscomp$22$$.write_blob($cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$, $i$jscomp$71_multiboot_data$$), $i$jscomp$71_multiboot_data$$ += $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$.length);
      if ($flags$jscomp$8$$ & 2) {
        $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ |= 64;
        $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ = 0;
        $cpu$jscomp$22$$.write32(31788, 0);
        $cpu$jscomp$22$$.write32(31792, $i$jscomp$71_multiboot_data$$);
        var $start$jscomp$38_view$jscomp$inline_27$$ = 0;
        let $was_memory$$ = !1;
        for (let $addr$jscomp$47$$ = 0; 4294967296 > $addr$jscomp$47$$; $addr$jscomp$47$$ += 131072) {
          $was_memory$$ && void 0 !== $cpu$jscomp$22$$.memory_map_read8[$addr$jscomp$47$$ >>> 17] ? ($cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$, 20), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 4, $start$jscomp$38_view$jscomp$inline_27$$), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 8, 0), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 12, $addr$jscomp$47$$ - $start$jscomp$38_view$jscomp$inline_27$$), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 
          16, 0), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 20, 1), $i$jscomp$71_multiboot_data$$ += 24, $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ += 24, $was_memory$$ = !1) : $was_memory$$ || void 0 !== $cpu$jscomp$22$$.memory_map_read8[$addr$jscomp$47$$ >>> 17] || ($start$jscomp$38_view$jscomp$inline_27$$ = $addr$jscomp$47$$, $was_memory$$ = !0);
        }
        $dbg_assert$$(!$was_memory$$, "top of 4GB shouldn't have memory");
        $cpu$jscomp$22$$.write32(31788, $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$);
      }
      $cpu$jscomp$22$$.write32(31744, $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$);
      var $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ = $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ = 0;
      if ($flags$jscomp$8$$ & 65536) {
        $dbg_log$$("Multiboot specifies its own address table", 2);
        var $blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$ = $buf32$$[$offset$jscomp$56$$ + 12 >> 2];
        var $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$ = $buf32$$[$offset$jscomp$56$$ + 16 >> 2];
        var $load_end_addr_program$jscomp$63_ramdisk_address$$ = $buf32$$[$offset$jscomp$56$$ + 20 >> 2];
        var $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$ = $buf32$$[$offset$jscomp$56$$ + 24 >> 2];
        $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ = $buf32$$[$offset$jscomp$56$$ + 28 >> 2];
        $dbg_log$$("header=" + $h$$($blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$, 8) + " load=" + $h$$($JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$, 8) + " load_end=" + $h$$($load_end_addr_program$jscomp$63_ramdisk_address$$, 8) + " bss_end=" + $h$$($JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$, 8) + " entry=" + $h$$($entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$, 
        8));
        $dbg_assert$$($JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$ <= $blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$);
        $blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$ = $offset$jscomp$56$$ - ($blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$ - $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$);
        0 === $load_end_addr_program$jscomp$63_ramdisk_address$$ ? $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ = void 0 : ($dbg_assert$$($load_end_addr_program$jscomp$63_ramdisk_address$$ >= $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$), $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ = $load_end_addr_program$jscomp$63_ramdisk_address$$ - $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$);
        $blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$ = new Uint8Array($buffer$jscomp$43$$, $blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$, $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$);
        $cpu$jscomp$22$$.write_blob($blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$, $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$);
        $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ |= 0;
        $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ = Math.max($load_end_addr_program$jscomp$63_ramdisk_address$$, $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$);
      } else {
        if (1179403647 === $buf32$$[0]) {
          $dbg_log$$("Multiboot image is in elf format", 2);
          $start$jscomp$38_view$jscomp$inline_27$$ = new DataView($buffer$jscomp$43$$);
          const [$header$jscomp$inline_28$$, $offset$jscomp$inline_29$$] = $read_struct$$($start$jscomp$38_view$jscomp$inline_27$$, $Header$$);
          console.assert(52 === $offset$jscomp$inline_29$$);
          for ($blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$ of Object.keys($header$jscomp$inline_28$$)) {
            $dbg_log$$($blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$ + ": 0x" + ($header$jscomp$inline_28$$[$blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$].toString(16) >>> 0));
          }
          console.assert(1179403647 === $header$jscomp$inline_28$$.magic, "Bad magic");
          console.assert(1 === $header$jscomp$inline_28$$.class, "Unimplemented: 64 bit elf");
          console.assert(1 === $header$jscomp$inline_28$$.data, "Unimplemented: big endian");
          console.assert(1 === $header$jscomp$inline_28$$.version0, "Bad version0");
          console.assert(2 === $header$jscomp$inline_28$$.type, "Unimplemented type");
          console.assert(1 === $header$jscomp$inline_28$$.version1, "Bad version1");
          console.assert(52 === $header$jscomp$inline_28$$.ehsize, "Bad header size");
          console.assert(32 === $header$jscomp$inline_28$$.phentsize, "Bad program header size");
          console.assert(40 === $header$jscomp$inline_28$$.shentsize, "Bad section header size");
          [$entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$] = $read_structs$$(new DataView($start$jscomp$38_view$jscomp$inline_27$$.buffer, $start$jscomp$38_view$jscomp$inline_27$$.byteOffset + $header$jscomp$inline_28$$.phoff, $header$jscomp$inline_28$$.phentsize * $header$jscomp$inline_28$$.phnum), $ProgramHeader$$, $header$jscomp$inline_28$$.phnum);
          [$blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$] = $read_structs$$(new DataView($start$jscomp$38_view$jscomp$inline_27$$.buffer, $start$jscomp$38_view$jscomp$inline_27$$.byteOffset + $header$jscomp$inline_28$$.shoff, $header$jscomp$inline_28$$.shentsize * $header$jscomp$inline_28$$.shnum), $SectionHeader$$, $header$jscomp$inline_28$$.shnum);
          if ($LOG_LEVEL$$) {
            console.log("%d program headers:", $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$.length);
            for ($JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$ of $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$) {
              console.log("type=%s offset=%s vaddr=%s paddr=%s filesz=%s memsz=%s flags=%s align=%s", $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.type.toString(16), $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.offset.toString(16), $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.vaddr.toString(16), $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.paddr.toString(16), 
              $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.filesz.toString(16), $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.memsz.toString(16), $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.flags.toString(16), $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.align.toString(16));
            }
            console.log("%d section headers:", $blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$.length);
            for ($JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$ of $blob$jscomp$16_file_start_header_addr_key$jscomp$inline_34_sections_headers$jscomp$inline_32$$) {
              console.log("name=%s type=%s flags=%s addr=%s offset=%s size=%s link=%s info=%s addralign=%s entsize=%s", $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.name.toString(16), $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.type.toString(16), $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.flags.toString(16), $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.addr.toString(16), 
              $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.offset.toString(16), $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.size.toString(16), $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.link.toString(16), $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.info.toString(16), $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.addralign.toString(16), 
              $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$.entsize.toString(16));
            }
          }
          $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$ = $header$jscomp$inline_28$$;
          $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$ = $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$;
          $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ = $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.entry;
          for ($load_end_addr_program$jscomp$63_ramdisk_address$$ of $JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$) {
            0 !== $load_end_addr_program$jscomp$63_ramdisk_address$$.type && (1 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type ? ($dbg_assert$$($load_end_addr_program$jscomp$63_ramdisk_address$$.filesz <= $load_end_addr_program$jscomp$63_ramdisk_address$$.memsz), $load_end_addr_program$jscomp$63_ramdisk_address$$.paddr + $load_end_addr_program$jscomp$63_ramdisk_address$$.memsz < $cpu$jscomp$22$$.memory_size[0] ? ($load_end_addr_program$jscomp$63_ramdisk_address$$.filesz && ($JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$ = 
            new Uint8Array($buffer$jscomp$43$$, $load_end_addr_program$jscomp$63_ramdisk_address$$.offset, $load_end_addr_program$jscomp$63_ramdisk_address$$.filesz), $cpu$jscomp$22$$.write_blob($JSCompiler_object_inline_program_headers_151_blob$jscomp$17_load_addr_section$jscomp$inline_36$$, $load_end_addr_program$jscomp$63_ramdisk_address$$.paddr)), $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$ = Math.max($cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$, $load_end_addr_program$jscomp$63_ramdisk_address$$.paddr + 
            $load_end_addr_program$jscomp$63_ramdisk_address$$.memsz), $dbg_log$$("prg load " + $load_end_addr_program$jscomp$63_ramdisk_address$$.paddr + " to " + ($load_end_addr_program$jscomp$63_ramdisk_address$$.paddr + $load_end_addr_program$jscomp$63_ramdisk_address$$.memsz), 2), $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ === $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$.entry && $load_end_addr_program$jscomp$63_ramdisk_address$$.vaddr <= 
            $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ && $load_end_addr_program$jscomp$63_ramdisk_address$$.vaddr + $load_end_addr_program$jscomp$63_ramdisk_address$$.memsz > $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ && ($entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ = $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ - $load_end_addr_program$jscomp$63_ramdisk_address$$.vaddr + $load_end_addr_program$jscomp$63_ramdisk_address$$.paddr)) : 
            $dbg_log$$("Warning: Skipped loading section, paddr=" + $h$$($load_end_addr_program$jscomp$63_ramdisk_address$$.paddr) + " memsz=" + $load_end_addr_program$jscomp$63_ramdisk_address$$.memsz, 2)) : 2 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 3 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 4 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 6 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 7 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 
            1685382480 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 1685382481 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 1685382482 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type || 1685382483 === $load_end_addr_program$jscomp$63_ramdisk_address$$.type ? $dbg_log$$("skip load type " + $load_end_addr_program$jscomp$63_ramdisk_address$$.type + " " + $load_end_addr_program$jscomp$63_ramdisk_address$$.paddr + " to " + ($load_end_addr_program$jscomp$63_ramdisk_address$$.paddr + 
            $load_end_addr_program$jscomp$63_ramdisk_address$$.memsz), 2) : $dbg_assert$$(!1, "unimplemented elf section type: " + $h$$($load_end_addr_program$jscomp$63_ramdisk_address$$.type)));
          }
        } else {
          $dbg_assert$$(!1, "Not a bootable multiboot format");
        }
      }
      $initrd$$ && ($cpu$jscomp$22$$.write32(31764, 1), $cpu$jscomp$22$$.write32(31768, $i$jscomp$71_multiboot_data$$), $load_end_addr_program$jscomp$63_ramdisk_address$$ = $cmdline_utf8_length$jscomp$25_multiboot_mmap_count_top_of_load$$, 0 !== ($load_end_addr_program$jscomp$63_ramdisk_address$$ & 4095) && ($load_end_addr_program$jscomp$63_ramdisk_address$$ = ($load_end_addr_program$jscomp$63_ramdisk_address$$ & -4096) + 4096), $dbg_log$$("ramdisk address " + $load_end_addr_program$jscomp$63_ramdisk_address$$), 
      $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$ = $load_end_addr_program$jscomp$63_ramdisk_address$$ + $initrd$$.byteLength, $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$, $load_end_addr_program$jscomp$63_ramdisk_address$$), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 4, $JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 8, 0), $cpu$jscomp$22$$.write32($i$jscomp$71_multiboot_data$$ + 
      12, 0), $dbg_assert$$($JSCompiler_object_inline_header_150_bss_end_addr_program$jscomp$inline_35_ramdisk_top$$ < $cpu$jscomp$22$$.memory_size[0]), $cpu$jscomp$22$$.write_blob(new Uint8Array($initrd$$), $load_end_addr_program$jscomp$63_ramdisk_address$$));
      $cpu$jscomp$22$$.reg32[3] = 31744;
      $cpu$jscomp$22$$.cr[0] = 1;
      $cpu$jscomp$22$$.protected_mode[0] = 1;
      $cpu$jscomp$22$$.flags[0] = 2;
      $cpu$jscomp$22$$.is_32[0] = 1;
      $cpu$jscomp$22$$.stack_size_32[0] = 1;
      for ($i$jscomp$71_multiboot_data$$ = 0; 6 > $i$jscomp$71_multiboot_data$$; $i$jscomp$71_multiboot_data$$++) {
        $cpu$jscomp$22$$.segment_is_null[$i$jscomp$71_multiboot_data$$] = 0, $cpu$jscomp$22$$.segment_offsets[$i$jscomp$71_multiboot_data$$] = 0, $cpu$jscomp$22$$.segment_limits[$i$jscomp$71_multiboot_data$$] = 4294967295, $cpu$jscomp$22$$.sreg[$i$jscomp$71_multiboot_data$$] = 45058;
      }
      $cpu$jscomp$22$$.instruction_pointer[0] = $cpu$jscomp$22$$.get_seg_cs() + $entry_addr_entrypoint_info_program_headers$jscomp$inline_30$$ | 0;
      $cpu$jscomp$22$$.update_state_flags();
      $dbg_log$$("Starting multiboot kernel at:", 2);
      $cpu$jscomp$22$$.debug.dump_state();
      $cpu$jscomp$22$$.debug.dump_regs();
      return 732803074;
    });
    this.io.register_write_consecutive(244, this, function($value$jscomp$184$$) {
      console.log("Test exited with code " + $h$$($value$jscomp$184$$, 2));
      throw "HALT";
    }, function() {
    }, function() {
    }, function() {
    });
    for (let $i$jscomp$72$$ = 0; 15 >= $i$jscomp$72$$; $i$jscomp$72$$++) {
      function $handle_write$$($value$jscomp$185$$) {
        $dbg_log$$("kvm-unit-test: Set irq " + $h$$($i$jscomp$72$$) + " to " + $h$$($value$jscomp$185$$, 2));
        $value$jscomp$185$$ ? this.device_raise_irq($i$jscomp$72$$) : this.device_lower_irq($i$jscomp$72$$);
      }
      this.io.register_write(8192 + $i$jscomp$72$$, this, $handle_write$$, $handle_write$$, $handle_write$$);
    }
    const $data8$$ = new Uint8Array(512);
    (new Uint16Array($data8$$.buffer))[0] = 43605;
    $data8$$[2] = 1;
    var $checksum_index_i$jscomp$70$$ = 3;
    $data8$$[$checksum_index_i$jscomp$70$$++] = 102;
    $data8$$[$checksum_index_i$jscomp$70$$++] = 229;
    $data8$$[$checksum_index_i$jscomp$70$$++] = 244;
    $dbg_assert$$(512 > $checksum_index_i$jscomp$70$$);
    let $rom_checksum$$ = $data8$$[$checksum_index_i$jscomp$70$$] = 0;
    for (let $i$jscomp$73$$ = 0; $i$jscomp$73$$ < $data8$$.length; $i$jscomp$73$$++) {
      $rom_checksum$$ += $data8$$[$i$jscomp$73$$];
    }
    $data8$$[$checksum_index_i$jscomp$70$$] = -$rom_checksum$$;
    return {name:"genroms/multiboot.bin", data:$data8$$};
  }
  $dbg_log$$("Multiboot header not found", 2);
};
$CPU$$.prototype.fill_cmos = function($rtc$jscomp$1$$, $settings$jscomp$2$$) {
  var $boot_order_memory_above_16m_memory_above_1m$$ = $settings$jscomp$2$$.boot_order || 291;
  $rtc$jscomp$1$$.cmos_write(56, 1 | $boot_order_memory_above_16m_memory_above_1m$$ >> 4 & 240);
  $rtc$jscomp$1$$.cmos_write(61, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$jscomp$1$$.cmos_write(21, 128);
  $rtc$jscomp$1$$.cmos_write(22, 2);
  $boot_order_memory_above_16m_memory_above_1m$$ = 0;
  1048576 <= this.memory_size[0] && ($boot_order_memory_above_16m_memory_above_1m$$ = this.memory_size[0] - 1048576 >> 10, $boot_order_memory_above_16m_memory_above_1m$$ = Math.min($boot_order_memory_above_16m_memory_above_1m$$, 65535));
  $rtc$jscomp$1$$.cmos_write(23, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$jscomp$1$$.cmos_write(24, $boot_order_memory_above_16m_memory_above_1m$$ >> 8 & 255);
  $rtc$jscomp$1$$.cmos_write(48, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$jscomp$1$$.cmos_write(49, $boot_order_memory_above_16m_memory_above_1m$$ >> 8 & 255);
  $boot_order_memory_above_16m_memory_above_1m$$ = 0;
  16777216 <= this.memory_size[0] && ($boot_order_memory_above_16m_memory_above_1m$$ = this.memory_size[0] - 16777216 >> 16, $boot_order_memory_above_16m_memory_above_1m$$ = Math.min($boot_order_memory_above_16m_memory_above_1m$$, 65535));
  $rtc$jscomp$1$$.cmos_write(52, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$jscomp$1$$.cmos_write(53, $boot_order_memory_above_16m_memory_above_1m$$ >> 8 & 255);
  $rtc$jscomp$1$$.cmos_write(91, 0);
  $rtc$jscomp$1$$.cmos_write(92, 0);
  $rtc$jscomp$1$$.cmos_write(93, 0);
  $rtc$jscomp$1$$.cmos_write(20, 47);
  $rtc$jscomp$1$$.cmos_write(95, 0);
  $settings$jscomp$2$$.fastboot && $rtc$jscomp$1$$.cmos_write(63, 1);
};
$CPU$$.prototype.load_bios = function() {
  var $bios$$ = this.bios.main, $vga_bios$$ = this.bios.vga;
  if ($bios$$) {
    var $data$jscomp$185$$ = new Uint8Array($bios$$);
    this.write_blob($data$jscomp$185$$, 1048576 - $bios$$.byteLength);
    if ($vga_bios$$) {
      var $vga_bios8$$ = new Uint8Array($vga_bios$$);
      this.write_blob($vga_bios8$$, 786432);
      this.io.mmap_register(4272947200, 1048576, function($addr$jscomp$48$$) {
        $addr$jscomp$48$$ = $addr$jscomp$48$$ - 4272947200 | 0;
        return $addr$jscomp$48$$ < $vga_bios8$$.length ? $vga_bios8$$[$addr$jscomp$48$$] : 0;
      }, function() {
        $dbg_assert$$(!1, "Unexpected write to VGA rom");
      });
    } else {
      $dbg_log$$("Warning: No VGA BIOS");
    }
    this.io.mmap_register(4293918720, 1048576, function($addr$jscomp$50$$) {
      return this.mem8[$addr$jscomp$50$$ & 1048575];
    }.bind(this), function($addr$jscomp$51$$, $value$jscomp$187$$) {
      this.mem8[$addr$jscomp$51$$ & 1048575] = $value$jscomp$187$$;
    }.bind(this));
  } else {
    $dbg_log$$("Warning: No BIOS");
  }
};
$CPU$$.prototype.codegen_finalize = function($wasm_table_index$$, $start$jscomp$40$$, $state_flags$$, $ptr$jscomp$4$$, $len$jscomp$18$$) {
  $ptr$jscomp$4$$ >>>= 0;
  $len$jscomp$18$$ >>>= 0;
  $dbg_assert$$(0 <= $wasm_table_index$$ && 900 > $wasm_table_index$$);
  const $code$jscomp$3$$ = new Uint8Array(this.wasm_memory.buffer, $ptr$jscomp$4$$, $len$jscomp$18$$);
  this.seen_code[$start$jscomp$40$$] = (this.seen_code[$start$jscomp$40$$] || 0) + 1;
  this.test_hook_did_generate_wasm && this.test_hook_did_generate_wasm($code$jscomp$3$$);
  WebAssembly.instantiate($code$jscomp$3$$, {e:this.jit_imports}).then($result$jscomp$11$$ => {
    this.wm.wasm_table.set($wasm_table_index$$ + 1024, $result$jscomp$11$$.instance.exports.f);
    this.codegen_finalize_finished($wasm_table_index$$, $start$jscomp$40$$, $state_flags$$);
    this.test_hook_did_finalize_wasm && this.test_hook_did_finalize_wasm($code$jscomp$3$$);
  }).catch($e$jscomp$14$$ => {
    console.log($e$jscomp$14$$);
    debugger;
    throw $e$jscomp$14$$;
  });
};
$CPU$$.prototype.log_uncompiled_code = function() {
};
$CPU$$.prototype.dump_function_code = function() {
};
$CPU$$.prototype.run_hardware_timers = function($acpi_enabled$$, $now$jscomp$10$$) {
  const $pit_time$$ = this.devices.pit.timer($now$jscomp$10$$, !1), $rtc_time$$ = this.devices.rtc.timer($now$jscomp$10$$, !1);
  let $acpi_time$$ = 100, $apic_time$$ = 100;
  $acpi_enabled$$ && ($acpi_time$$ = this.devices.acpi.timer($now$jscomp$10$$), $apic_time$$ = this.devices.apic.timer($now$jscomp$10$$));
  return Math.min($pit_time$$, $rtc_time$$, $acpi_time$$, $apic_time$$);
};
$CPU$$.prototype.device_raise_irq = function($i$jscomp$78$$) {
  $dbg_assert$$(1 === arguments.length);
  this.pic_set_irq($i$jscomp$78$$);
  this.devices.ioapic && this.devices.ioapic.set_irq($i$jscomp$78$$);
};
$CPU$$.prototype.device_lower_irq = function($i$jscomp$79$$) {
  this.pic_clear_irq($i$jscomp$79$$);
  this.devices.ioapic && this.devices.ioapic.clear_irq($i$jscomp$79$$);
};
$CPU$$.prototype.debug_init = function() {
  function $get_state$$($where$jscomp$2$$) {
    for (var $mode$jscomp$24$$ = $cpu$jscomp$23$$.protected_mode[0] ? "prot" : "real", $flags$jscomp$9$$ = $cpu$jscomp$23$$.get_eflags(), $iopl$$ = $cpu$jscomp$23$$.getiopl(), $cpl$$ = $cpu$jscomp$23$$.cpl[0], $cs_eip$$ = $h$$($cpu$jscomp$23$$.sreg[1], 4) + ":" + $h$$($cpu$jscomp$23$$.get_real_eip() >>> 0, 8), $ss_esp$$ = $h$$($cpu$jscomp$23$$.sreg[2], 4) + ":" + $h$$($cpu$jscomp$23$$.reg32[0] >>> 0, 8), $op_size$$ = $cpu$jscomp$23$$.is_32[0] ? "32" : "16", $if_$$ = $cpu$jscomp$23$$.flags[0] & 512 ? 
    1 : 0, $flag_names$$ = {[1]:"c", [4]:"p", [16]:"a", [64]:"z", [128]:"s", [256]:"t", [512]:"i", [1024]:"d", [2048]:"o", }, $flag_string$$ = "", $i$jscomp$81$$ = 0; 16 > $i$jscomp$81$$; $i$jscomp$81$$++) {
      $flag_names$$[1 << $i$jscomp$81$$] && ($flag_string$$ = $flags$jscomp$9$$ & 1 << $i$jscomp$81$$ ? $flag_string$$ + $flag_names$$[1 << $i$jscomp$81$$] : $flag_string$$ + " ");
    }
    return "mode=" + $mode$jscomp$24$$ + "/" + $op_size$$ + " paging=" + +(0 !== ($cpu$jscomp$23$$.cr[0] & -2147483648)) + " pae=" + +(0 !== ($cpu$jscomp$23$$.cr[4] & 32)) + " iopl=" + $iopl$$ + " cpl=" + $cpl$$ + " if=" + $if_$$ + " cs:eip=" + $cs_eip$$ + " cs_off=" + $h$$($cpu$jscomp$23$$.get_seg_cs() >>> 0, 8) + " flgs=" + $h$$($cpu$jscomp$23$$.get_eflags() >>> 0, 6) + " (" + $flag_string$$ + ") ss:esp=" + $ss_esp$$ + " ssize=" + +$cpu$jscomp$23$$.stack_size_32[0] + ($where$jscomp$2$$ ? " in " + 
    $where$jscomp$2$$ : "");
  }
  function $get_regs_short$$() {
    for (var $r32$jscomp$2$$ = {eax:0, ecx:1, edx:2, ebx:3, esp:4, ebp:5, esi:6, edi:7}, $r32_names$$ = "eax ecx edx ebx esp ebp esi edi".split(" "), $line1$$ = "", $line2$$ = "", $i$jscomp$82$$ = 0; 4 > $i$jscomp$82$$; $i$jscomp$82$$++) {
      $line1$$ += $r32_names$$[$i$jscomp$82$$] + "=" + $h$$($cpu$jscomp$23$$.reg32[$r32$jscomp$2$$[$r32_names$$[$i$jscomp$82$$]]] >>> 0, 8) + " ", $line2$$ += $r32_names$$[$i$jscomp$82$$ + 4] + "=" + $h$$($cpu$jscomp$23$$.reg32[$r32$jscomp$2$$[$r32_names$$[$i$jscomp$82$$ + 4]]] >>> 0, 8) + " ";
    }
    $line1$$ += "  ds=" + $h$$($cpu$jscomp$23$$.sreg[3], 4) + " es=" + $h$$($cpu$jscomp$23$$.sreg[0], 4) + " fs=" + $h$$($cpu$jscomp$23$$.sreg[4], 4);
    $line2$$ += "  gs=" + $h$$($cpu$jscomp$23$$.sreg[5], 4) + " cs=" + $h$$($cpu$jscomp$23$$.sreg[1], 4) + " ss=" + $h$$($cpu$jscomp$23$$.sreg[2], 4);
    return [$line1$$, $line2$$];
  }
  function $load_page_entry$$($dword_entry$$, $pae$$, $is_directory$$) {
    if (!($dword_entry$$ & 1)) {
      return !1;
    }
    var $size$jscomp$39$$ = 128 === ($dword_entry$$ & 128);
    return {size:$size$jscomp$39$$, global:256 === ($dword_entry$$ & 256), accessed:32 === ($dword_entry$$ & 32), dirty:64 === ($dword_entry$$ & 64), cache_disable:16 === ($dword_entry$$ & 16), user:4 === ($dword_entry$$ & 4), read_write:2 === ($dword_entry$$ & 2), address:($size$jscomp$39$$ && !$is_directory$$ ? $dword_entry$$ & ($pae$$ ? 4292870144 : 4290772992) : $dword_entry$$ & 4294963200) >>> 0};
  }
  function $dump_page_directory$$($pd_addr$$, $pae$jscomp$2$$, $start$jscomp$44$$) {
    for (var $n$jscomp$11$$ = $pae$jscomp$2$$ ? 512 : 1024, $entry_size$$ = $pae$jscomp$2$$ ? 8 : 4, $pd_shift$$ = $pae$jscomp$2$$ ? 21 : 22, $i$jscomp$86$$ = 0; $i$jscomp$86$$ < $n$jscomp$11$$; $i$jscomp$86$$++) {
      var $dword$jscomp$4_flags$jscomp$11$$ = $cpu$jscomp$23$$.read32s($pd_addr$$ + $i$jscomp$86$$ * $entry_size$$), $entry$jscomp$7$$ = $load_page_entry$$($dword$jscomp$4_flags$jscomp$11$$, $pae$jscomp$2$$, !0);
      if ($entry$jscomp$7$$) {
        if ($dword$jscomp$4_flags$jscomp$11$$ = "", $dword$jscomp$4_flags$jscomp$11$$ += $entry$jscomp$7$$.size ? "S " : "  ", $dword$jscomp$4_flags$jscomp$11$$ += $entry$jscomp$7$$.accessed ? "A " : "  ", $dword$jscomp$4_flags$jscomp$11$$ += $entry$jscomp$7$$.cache_disable ? "Cd " : "  ", $dword$jscomp$4_flags$jscomp$11$$ += $entry$jscomp$7$$.user ? "U " : "  ", $dword$jscomp$4_flags$jscomp$11$$ += $entry$jscomp$7$$.read_write ? "Rw " : "   ", $entry$jscomp$7$$.size) {
          $dbg_log$$("=== " + $h$$($start$jscomp$44$$ + ($i$jscomp$86$$ << $pd_shift$$) >>> 0, 8) + " -> " + $h$$($entry$jscomp$7$$.address >>> 0, 8) + " | " + $dword$jscomp$4_flags$jscomp$11$$);
        } else {
          $dbg_log$$("=== " + $h$$($start$jscomp$44$$ + ($i$jscomp$86$$ << $pd_shift$$) >>> 0, 8) + " | " + $dword$jscomp$4_flags$jscomp$11$$);
          for (var $j$jscomp$7$$ = 0; $j$jscomp$7$$ < $n$jscomp$11$$; $j$jscomp$7$$++) {
            var $sub_addr$$ = $entry$jscomp$7$$.address + $j$jscomp$7$$ * $entry_size$$;
            $dword$jscomp$4_flags$jscomp$11$$ = $cpu$jscomp$23$$.read32s($sub_addr$$);
            var $subentry$$ = $load_page_entry$$($dword$jscomp$4_flags$jscomp$11$$, $pae$jscomp$2$$, !1);
            $subentry$$ && ($dword$jscomp$4_flags$jscomp$11$$ = "", $dword$jscomp$4_flags$jscomp$11$$ += $subentry$$.cache_disable ? "Cd " : "   ", $dword$jscomp$4_flags$jscomp$11$$ += $subentry$$.user ? "U " : "  ", $dword$jscomp$4_flags$jscomp$11$$ += $subentry$$.read_write ? "Rw " : "   ", $dword$jscomp$4_flags$jscomp$11$$ += $subentry$$.global ? "G " : "  ", $dword$jscomp$4_flags$jscomp$11$$ += $subentry$$.accessed ? "A " : "  ", $dword$jscomp$4_flags$jscomp$11$$ += $subentry$$.dirty ? "Di " : 
            "   ", $dbg_log$$("# " + $h$$($start$jscomp$44$$ + ($i$jscomp$86$$ << $pd_shift$$ | $j$jscomp$7$$ << 12) >>> 0, 8) + " -> " + $h$$($subentry$$.address, 8) + " | " + $dword$jscomp$4_flags$jscomp$11$$ + "        (at " + $h$$($sub_addr$$, 8) + ")"));
          }
        }
      }
    }
  }
  var $cpu$jscomp$23$$ = this, $debug$$ = {};
  this.debug = $debug$$;
  $debug$$.init = function() {
    function $handle$jscomp$12$$($out_byte$jscomp$17$$) {
      10 === $out_byte$jscomp$17$$ ? ($dbg_log$$($seabios_debug$$, 4096), $seabios_debug$$ = "") : $seabios_debug$$ += String.fromCharCode($out_byte$jscomp$17$$);
    }
    if ($cpu$jscomp$23$$.io) {
      var $seabios_debug$$ = "";
      $cpu$jscomp$23$$.io.register_write(1026, this, $handle$jscomp$12$$);
      $cpu$jscomp$23$$.io.register_write(1280, this, $handle$jscomp$12$$);
    }
  };
  $debug$$.get_regs_short = $get_regs_short$$;
  $debug$$.dump_regs = function() {
    var $lines$$ = $get_regs_short$$();
    $dbg_log$$($lines$$[0], 2);
    $dbg_log$$($lines$$[1], 2);
  };
  $debug$$.get_state = $get_state$$;
  $debug$$.dump_state = function($where$jscomp$3$$) {
    $dbg_log$$($get_state$$($where$jscomp$3$$), 2);
  };
  $debug$$.dump_stack = function($i$jscomp$80_start$jscomp$43$$, $end$jscomp$25$$) {
    var $esp$$ = $cpu$jscomp$23$$.reg32[4];
    $dbg_log$$("========= STACK ==========");
    if ($end$jscomp$25$$ >= $i$jscomp$80_start$jscomp$43$$ || void 0 === $end$jscomp$25$$) {
      $i$jscomp$80_start$jscomp$43$$ = 5, $end$jscomp$25$$ = -5;
    }
    for (; $i$jscomp$80_start$jscomp$43$$ > $end$jscomp$25$$; $i$jscomp$80_start$jscomp$43$$--) {
      var $line$jscomp$6$$ = "    ";
      $i$jscomp$80_start$jscomp$43$$ || ($line$jscomp$6$$ = "=>  ");
      $line$jscomp$6$$ += $h$$($i$jscomp$80_start$jscomp$43$$, 2) + " | ";
      $dbg_log$$($line$jscomp$6$$ + $h$$($esp$$ + 4 * $i$jscomp$80_start$jscomp$43$$, 8) + " | " + $h$$($cpu$jscomp$23$$.read32s($esp$$ + 4 * $i$jscomp$80_start$jscomp$43$$) >>> 0));
    }
  };
  $debug$$.dump_page_structures = function() {
    if ($cpu$jscomp$23$$.cr[4] & 32) {
      $dbg_log$$("PAE enabled");
      for (var $i$jscomp$85$$ = 0; 4 > $i$jscomp$85$$; $i$jscomp$85$$++) {
        var $dword$jscomp$3$$ = $cpu$jscomp$23$$.read32s($cpu$jscomp$23$$.cr[3] + 8 * $i$jscomp$85$$);
        $dword$jscomp$3$$ & 1 && $dump_page_directory$$($dword$jscomp$3$$ & 4294963200, !0, $i$jscomp$85$$ << 30);
      }
    } else {
      $dbg_log$$("PAE disabled"), $dump_page_directory$$($cpu$jscomp$23$$.cr[3], !1, 0);
    }
  };
  $debug$$.dump_gdt_ldt = function() {
    function $dump_table$$($addr$jscomp$52$$, $size$jscomp$38$$) {
      for (var $i$jscomp$83$$ = 0; $i$jscomp$83$$ < $size$jscomp$38$$; $i$jscomp$83$$ += 8, $addr$jscomp$52$$ += 8) {
        var $base$jscomp$4$$ = $cpu$jscomp$23$$.read16($addr$jscomp$52$$ + 2) | $cpu$jscomp$23$$.read8($addr$jscomp$52$$ + 4) << 16 | $cpu$jscomp$23$$.read8($addr$jscomp$52$$ + 7) << 24, $limit$$ = $cpu$jscomp$23$$.read16($addr$jscomp$52$$) | ($cpu$jscomp$23$$.read8($addr$jscomp$52$$ + 6) & 15) << 16, $access$jscomp$1$$ = $cpu$jscomp$23$$.read8($addr$jscomp$52$$ + 5), $flags$jscomp$10$$ = $cpu$jscomp$23$$.read8($addr$jscomp$52$$ + 6) >> 4, $flags_str$$ = "", $dpl$$ = $access$jscomp$1$$ >> 5 & 3;
        $flags_str$$ = $access$jscomp$1$$ & 128 ? $flags_str$$ + " P " : $flags_str$$ + "NP ";
        $access$jscomp$1$$ & 16 ? ($flags_str$$ = $flags$jscomp$10$$ & 4 ? $flags_str$$ + "32b " : $flags_str$$ + "16b ", $access$jscomp$1$$ & 8 ? ($flags_str$$ += "X ", $access$jscomp$1$$ & 4 && ($flags_str$$ += "C ")) : $flags_str$$ += "R ", $flags_str$$ += "RW ") : $flags_str$$ += "sys: " + $h$$($access$jscomp$1$$ & 15);
        $flags$jscomp$10$$ & 8 && ($limit$$ = $limit$$ << 12 | 4095);
        $dbg_log$$($h$$($i$jscomp$83$$ & -8, 4) + " " + $h$$($base$jscomp$4$$ >>> 0, 8) + " (" + $h$$($limit$$ >>> 0, 8) + " bytes) " + $flags_str$$ + ";  dpl = " + $dpl$$ + ", a = " + $access$jscomp$1$$.toString(2) + ", f = " + $flags$jscomp$10$$.toString(2));
      }
    }
    $dbg_log$$("gdt: (len = " + $h$$($cpu$jscomp$23$$.gdtr_size[0]) + ")");
    $dump_table$$($cpu$jscomp$23$$.translate_address_system_read($cpu$jscomp$23$$.gdtr_offset[0]), $cpu$jscomp$23$$.gdtr_size[0]);
    $dbg_log$$("\nldt: (len = " + $h$$($cpu$jscomp$23$$.segment_limits[7]) + ")");
    $dump_table$$($cpu$jscomp$23$$.translate_address_system_read($cpu$jscomp$23$$.segment_offsets[7]), $cpu$jscomp$23$$.segment_limits[7]);
  };
  $debug$$.dump_idt = function() {
    for (var $i$jscomp$84$$ = 0; $i$jscomp$84$$ < $cpu$jscomp$23$$.idtr_size[0]; $i$jscomp$84$$ += 8) {
      var $addr$jscomp$53_type$jscomp$155$$ = $cpu$jscomp$23$$.translate_address_system_read($cpu$jscomp$23$$.idtr_offset[0] + $i$jscomp$84$$), $base$jscomp$5$$ = $cpu$jscomp$23$$.read16($addr$jscomp$53_type$jscomp$155$$) | $cpu$jscomp$23$$.read16($addr$jscomp$53_type$jscomp$155$$ + 6) << 16, $selector$jscomp$1$$ = $cpu$jscomp$23$$.read16($addr$jscomp$53_type$jscomp$155$$ + 2);
      $addr$jscomp$53_type$jscomp$155$$ = $cpu$jscomp$23$$.read8($addr$jscomp$53_type$jscomp$155$$ + 5);
      var $dpl$jscomp$1$$ = $addr$jscomp$53_type$jscomp$155$$ >> 5 & 3;
      var $line$jscomp$7$$ = 5 === ($addr$jscomp$53_type$jscomp$155$$ & 31) ? "task gate " : 14 === ($addr$jscomp$53_type$jscomp$155$$ & 31) ? "intr gate " : 15 === ($addr$jscomp$53_type$jscomp$155$$ & 31) ? "trap gate " : "invalid   ";
      $line$jscomp$7$$ = $addr$jscomp$53_type$jscomp$155$$ & 128 ? $line$jscomp$7$$ + " P" : $line$jscomp$7$$ + "NP";
      $dbg_log$$($h$$($i$jscomp$84$$ >> 3, 4) + " " + $h$$($base$jscomp$5$$ >>> 0, 8) + ", " + $h$$($selector$jscomp$1$$, 4) + "; " + $line$jscomp$7$$ + ";  dpl = " + $dpl$jscomp$1$$ + ", t = " + $addr$jscomp$53_type$jscomp$155$$.toString(2));
    }
  };
  $debug$$.get_memory_dump = function($start$jscomp$45$$, $count$jscomp$56$$) {
    void 0 === $start$jscomp$45$$ ? ($start$jscomp$45$$ = 0, $count$jscomp$56$$ = $cpu$jscomp$23$$.memory_size[0]) : void 0 === $count$jscomp$56$$ && ($count$jscomp$56$$ = $start$jscomp$45$$, $start$jscomp$45$$ = 0);
    return $cpu$jscomp$23$$.mem8.slice($start$jscomp$45$$, $start$jscomp$45$$ + $count$jscomp$56$$).buffer;
  };
  $debug$$.memory_hex_dump = function($addr$jscomp$56$$, $length$jscomp$26$$) {
    $length$jscomp$26$$ = $length$jscomp$26$$ || 64;
    for (var $line$jscomp$8$$, $byt$$, $i$jscomp$87$$ = 0; $i$jscomp$87$$ < $length$jscomp$26$$ >> 4; $i$jscomp$87$$++) {
      $line$jscomp$8$$ = $h$$($addr$jscomp$56$$ + ($i$jscomp$87$$ << 4), 5) + "   ";
      for (var $j$jscomp$8$$ = 0; 16 > $j$jscomp$8$$; $j$jscomp$8$$++) {
        $byt$$ = $cpu$jscomp$23$$.read8($addr$jscomp$56$$ + ($i$jscomp$87$$ << 4) + $j$jscomp$8$$), $line$jscomp$8$$ += $h$$($byt$$, 2) + " ";
      }
      $line$jscomp$8$$ += "  ";
      for ($j$jscomp$8$$ = 0; 16 > $j$jscomp$8$$; $j$jscomp$8$$++) {
        $byt$$ = $cpu$jscomp$23$$.read8($addr$jscomp$56$$ + ($i$jscomp$87$$ << 4) + $j$jscomp$8$$), $line$jscomp$8$$ += 33 > $byt$$ || 126 < $byt$$ ? "." : String.fromCharCode($byt$$);
      }
      $dbg_log$$($line$jscomp$8$$);
    }
  };
  $debug$$.used_memory_dump = function() {
    for (var $block_size$$ = $cpu$jscomp$23$$.memory_size[0] / 128 / 16 | 0, $row$jscomp$13$$, $i$jscomp$88$$ = 0; 16 > $i$jscomp$88$$; $i$jscomp$88$$++) {
      $row$jscomp$13$$ = $h$$(128 * $i$jscomp$88$$ * $block_size$$, 8) + " | ";
      for (var $j$jscomp$9$$ = 0; 128 > $j$jscomp$9$$; $j$jscomp$9$$++) {
        $row$jscomp$13$$ += 0 < $cpu$jscomp$23$$.mem32s[(128 * $i$jscomp$88$$ + $j$jscomp$9$$) * $block_size$$] ? "X" : " ";
      }
      $dbg_log$$($row$jscomp$13$$);
    }
  };
  $debug$$.debug_interrupt = function() {
  };
  let $cs$jscomp$1$$, $capstone_decoder$$;
  $debug$$.dump_code = function($is_32$jscomp$1$$, $buffer$jscomp$47$$, $start$jscomp$46$$) {
    if (!$capstone_decoder$$) {
      if (void 0 === $cs$jscomp$1$$ && ($cs$jscomp$1$$ = "function" === typeof require ? require("./capstone-x86.min.js") : window.cs, void 0 === $cs$jscomp$1$$)) {
        $dbg_log$$("Warning: Missing capstone library, disassembly not available");
        return;
      }
      $capstone_decoder$$ = [new $cs$jscomp$1$$.Capstone($cs$jscomp$1$$.ARCH_X86, $cs$jscomp$1$$.MODE_16), new $cs$jscomp$1$$.Capstone($cs$jscomp$1$$.ARCH_X86, $cs$jscomp$1$$.MODE_32), ];
    }
    try {
      $capstone_decoder$$[$is_32$jscomp$1$$].disasm($buffer$jscomp$47$$, $start$jscomp$46$$).forEach(function($instr$$) {
        $dbg_log$$($h$$($instr$$.address >>> 0) + ": " + $v86util$$.pads($instr$$.bytes.map($x$jscomp$104$$ => $h$$($x$jscomp$104$$, 2).slice(-2)).join(" "), 20) + " " + $instr$$.mnemonic + " " + $instr$$.op_str);
      }), $dbg_log$$("");
    } catch ($e$jscomp$15$$) {
      $dbg_log$$("Could not disassemble: " + Array.from($buffer$jscomp$47$$).map($x$jscomp$105$$ => $h$$($x$jscomp$105$$, 2)).join(" "));
    }
  };
  let $wabt$$;
  $debug$$.dump_wasm = function($buffer$jscomp$48$$) {
    if (void 0 === $wabt$$ && ($wabt$$ = "function" === typeof require ? require("./libwabt.js") : new window.WabtModule, void 0 === $wabt$$)) {
      $dbg_log$$("Warning: Missing libwabt, wasm dump not available");
      return;
    }
    $buffer$jscomp$48$$ = $buffer$jscomp$48$$.slice();
    try {
      var $module$jscomp$2$$ = $wabt$$.readWasm($buffer$jscomp$48$$, {readDebugNames:!1});
      $module$jscomp$2$$.generateNames();
      $module$jscomp$2$$.applyNames();
      const $result$jscomp$12$$ = $module$jscomp$2$$.toText({foldExprs:!0, inlineExport:!0});
      $dbg_log$$($result$jscomp$12$$);
    } catch ($e$jscomp$16$$) {
      var $blob$jscomp$inline_40$$ = new Blob([$buffer$jscomp$48$$]), $a$jscomp$inline_41$$ = document.createElement("a");
      $a$jscomp$inline_41$$.download = "failed.wasm";
      $a$jscomp$inline_41$$.href = window.URL.createObjectURL($blob$jscomp$inline_40$$);
      $a$jscomp$inline_41$$.dataset.downloadurl = ["application/octet-stream", $a$jscomp$inline_41$$.download, $a$jscomp$inline_41$$.href].join(":");
      $a$jscomp$inline_41$$.click();
      window.URL.revokeObjectURL($a$jscomp$inline_41$$.src);
      console.log($e$jscomp$16$$.toString());
    } finally {
      $module$jscomp$2$$ && $module$jscomp$2$$.destroy();
    }
  };
};
const $types$$ = DataView.prototype, $U8$$ = {size:1, get:$types$$.getUint8, set:$types$$.setUint8, }, $U16$$ = {size:2, get:$types$$.getUint16, set:$types$$.setUint16, }, $U32$$ = {size:4, get:$types$$.getUint32, set:$types$$.setUint32, }, $Header$$ = $create_struct$$([{magic:$U32$$, }, {class:$U8$$, }, {data:$U8$$, }, {version0:$U8$$, }, {osabi:$U8$$, }, {abiversion:$U8$$, }, {pad0:function($size$jscomp$40$$) {
  return {size:$size$jscomp$40$$, get:() => -1, };
}(7)}, {type:$U16$$, }, {machine:$U16$$, }, {version1:$U32$$, }, {entry:$U32$$, }, {phoff:$U32$$, }, {shoff:$U32$$, }, {flags:$U32$$, }, {ehsize:$U16$$, }, {phentsize:$U16$$, }, {phnum:$U16$$, }, {shentsize:$U16$$, }, {shnum:$U16$$, }, {shstrndx:$U16$$, }, ]);
console.assert(52 === $Header$$.reduce(($a$jscomp$5$$, $entry$jscomp$8$$) => $a$jscomp$5$$ + $entry$jscomp$8$$.size, 0));
const $ProgramHeader$$ = $create_struct$$([{type:$U32$$, }, {offset:$U32$$, }, {vaddr:$U32$$, }, {paddr:$U32$$, }, {filesz:$U32$$, }, {memsz:$U32$$, }, {flags:$U32$$, }, {align:$U32$$, }, ]);
console.assert(32 === $ProgramHeader$$.reduce(($a$jscomp$6$$, $entry$jscomp$9$$) => $a$jscomp$6$$ + $entry$jscomp$9$$.size, 0));
const $SectionHeader$$ = $create_struct$$([{name:$U32$$, }, {type:$U32$$, }, {flags:$U32$$, }, {addr:$U32$$, }, {offset:$U32$$, }, {size:$U32$$, }, {link:$U32$$, }, {info:$U32$$, }, {addralign:$U32$$, }, {entsize:$U32$$, }, ]);
console.assert(40 === $SectionHeader$$.reduce(($a$jscomp$7$$, $entry$jscomp$10$$) => $a$jscomp$7$$ + $entry$jscomp$10$$.size, 0));
function $create_struct$$($struct$$) {
  return $struct$$.map(function($entry$jscomp$11_type$jscomp$156$$) {
    var $keys_name$jscomp$89$$ = Object.keys($entry$jscomp$11_type$jscomp$156$$);
    console.assert(1 === $keys_name$jscomp$89$$.length);
    $keys_name$jscomp$89$$ = $keys_name$jscomp$89$$[0];
    $entry$jscomp$11_type$jscomp$156$$ = $entry$jscomp$11_type$jscomp$156$$[$keys_name$jscomp$89$$];
    console.assert(0 < $entry$jscomp$11_type$jscomp$156$$.size);
    return {name:$keys_name$jscomp$89$$, type:$entry$jscomp$11_type$jscomp$156$$, size:$entry$jscomp$11_type$jscomp$156$$.size, get:$entry$jscomp$11_type$jscomp$156$$.get, set:$entry$jscomp$11_type$jscomp$156$$.set, };
  });
}
function $read_struct$$($view$jscomp$9$$, $Struct_value$jscomp$188$$) {
  const $result$jscomp$13$$ = {};
  let $offset$jscomp$59$$ = 0;
  for (const $entry$jscomp$12$$ of $Struct_value$jscomp$188$$) {
    $Struct_value$jscomp$188$$ = $entry$jscomp$12$$.get.call($view$jscomp$9$$, $offset$jscomp$59$$, !0), console.assert(void 0 === $result$jscomp$13$$[$entry$jscomp$12$$.name]), $result$jscomp$13$$[$entry$jscomp$12$$.name] = $Struct_value$jscomp$188$$, $offset$jscomp$59$$ += $entry$jscomp$12$$.size;
  }
  return [$result$jscomp$13$$, $offset$jscomp$59$$];
}
function $read_structs$$($view$jscomp$10$$, $Struct$jscomp$1$$, $count$jscomp$57$$) {
  const $result$jscomp$14$$ = [];
  let $offset$jscomp$60$$ = 0;
  for (var $i$jscomp$89$$ = 0; $i$jscomp$89$$ < $count$jscomp$57$$; $i$jscomp$89$$++) {
    const [$s$jscomp$7$$, $size$jscomp$41$$] = $read_struct$$(new DataView($view$jscomp$10$$.buffer, $view$jscomp$10$$.byteOffset + $offset$jscomp$60$$, void 0), $Struct$jscomp$1$$);
    $result$jscomp$14$$.push($s$jscomp$7$$);
    $offset$jscomp$60$$ += $size$jscomp$41$$;
  }
  return [$result$jscomp$14$$, $offset$jscomp$60$$];
}
;function $load_kernel$$($data8$jscomp$inline_46_mem8$$, $bzimage_i$jscomp$inline_51_protected_mode_kernel$$, $checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$, $cmdline$jscomp$1_real_mode_kernel$$) {
  $dbg_log$$("Trying to load kernel of size " + $bzimage_i$jscomp$inline_51_protected_mode_kernel$$.byteLength);
  var $bzimage8_i$jscomp$90_ramdisk_size$$ = new Uint8Array($bzimage_i$jscomp$inline_51_protected_mode_kernel$$);
  const $bzimage16$$ = new Uint16Array($bzimage_i$jscomp$inline_51_protected_mode_kernel$$);
  var $bzimage32_checksum$jscomp$inline_50$$ = new Uint32Array($bzimage_i$jscomp$inline_51_protected_mode_kernel$$), $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$ = $bzimage8_i$jscomp$90_ramdisk_size$$[497] || 4, $checksum1_checksum2_protocol$jscomp$1$$ = $bzimage16$$[255];
  if (43605 !== $checksum1_checksum2_protocol$jscomp$1$$) {
    $dbg_log$$("Bad checksum1: " + $h$$($checksum1_checksum2_protocol$jscomp$1$$));
  } else {
    if ($checksum1_checksum2_protocol$jscomp$1$$ = $bzimage16$$[257] | $bzimage16$$[258] << 16, 1400005704 !== $checksum1_checksum2_protocol$jscomp$1$$) {
      $dbg_log$$("Bad checksum2: " + $h$$($checksum1_checksum2_protocol$jscomp$1$$));
    } else {
      $checksum1_checksum2_protocol$jscomp$1$$ = $bzimage16$$[259];
      $dbg_assert$$(514 <= $checksum1_checksum2_protocol$jscomp$1$$);
      var $flags$jscomp$12$$ = $bzimage8_i$jscomp$90_ramdisk_size$$[529];
      $dbg_assert$$($flags$jscomp$12$$ & 1);
      var $flags2$$ = $bzimage16$$[283], $initrd_addr_max$$ = $bzimage32_checksum$jscomp$inline_50$$[139], $kernel_alignment$$ = $bzimage32_checksum$jscomp$inline_50$$[140], $relocatable_kernel$$ = $bzimage8_i$jscomp$90_ramdisk_size$$[564], $min_alignment$$ = $bzimage8_i$jscomp$90_ramdisk_size$$[565], $cmdline_size$$ = 518 <= $checksum1_checksum2_protocol$jscomp$1$$ ? $bzimage32_checksum$jscomp$inline_50$$[142] : 255, $payload_offset$$ = $bzimage32_checksum$jscomp$inline_50$$[146], $payload_length$$ = 
      $bzimage32_checksum$jscomp$inline_50$$[147], $pref_address$$ = $bzimage32_checksum$jscomp$inline_50$$[150], $pref_address_high$$ = $bzimage32_checksum$jscomp$inline_50$$[151], $init_size$$ = $bzimage32_checksum$jscomp$inline_50$$[152];
      $dbg_log$$("kernel boot protocol version: " + $h$$($checksum1_checksum2_protocol$jscomp$1$$));
      $dbg_log$$("flags=" + $h$$($flags$jscomp$12$$) + " xflags=" + $h$$($flags2$$));
      $dbg_log$$("code32_start=" + $h$$($bzimage32_checksum$jscomp$inline_50$$[133]));
      $dbg_log$$("initrd_addr_max=" + $h$$($initrd_addr_max$$));
      $dbg_log$$("kernel_alignment=" + $h$$($kernel_alignment$$));
      $dbg_log$$("relocatable=" + $relocatable_kernel$$);
      $dbg_log$$("min_alignment=" + $h$$($min_alignment$$));
      $dbg_log$$("cmdline max=" + $h$$($cmdline_size$$));
      $dbg_log$$("payload offset=" + $h$$($payload_offset$$) + " size=" + $h$$($payload_length$$));
      $dbg_log$$("pref_address=" + $h$$($pref_address_high$$) + ":" + $h$$($pref_address$$));
      $dbg_log$$("init_size=" + $h$$($init_size$$));
      $bzimage8_i$jscomp$90_ramdisk_size$$[528] = 255;
      $bzimage8_i$jscomp$90_ramdisk_size$$[529] = $flags$jscomp$12$$ & -97 | 128;
      $bzimage16$$[274] = 56832;
      $bzimage16$$[253] = 65535;
      $dbg_log$$("heap_end_ptr=" + $h$$(56832));
      $cmdline$jscomp$1_real_mode_kernel$$ += "\x00";
      $dbg_assert$$($cmdline$jscomp$1_real_mode_kernel$$.length < $cmdline_size$$);
      $dbg_log$$("cmd_line_ptr=" + $h$$(581632));
      $bzimage32_checksum$jscomp$inline_50$$[138] = 581632;
      for ($bzimage8_i$jscomp$90_ramdisk_size$$ = 0; $bzimage8_i$jscomp$90_ramdisk_size$$ < $cmdline$jscomp$1_real_mode_kernel$$.length; $bzimage8_i$jscomp$90_ramdisk_size$$++) {
        $data8$jscomp$inline_46_mem8$$[581632 + $bzimage8_i$jscomp$90_ramdisk_size$$] = $cmdline$jscomp$1_real_mode_kernel$$.charCodeAt($bzimage8_i$jscomp$90_ramdisk_size$$);
      }
      $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$ = 512 * ($prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$ + 1);
      $dbg_log$$("prot_mode_kernel_start=" + $h$$($prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$));
      $cmdline$jscomp$1_real_mode_kernel$$ = new Uint8Array($bzimage_i$jscomp$inline_51_protected_mode_kernel$$, 0, $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$);
      $bzimage_i$jscomp$inline_51_protected_mode_kernel$$ = new Uint8Array($bzimage_i$jscomp$inline_51_protected_mode_kernel$$, $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$);
      $bzimage8_i$jscomp$90_ramdisk_size$$ = $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$ = 0;
      $checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$ && ($prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$ = 67108864, $bzimage8_i$jscomp$90_ramdisk_size$$ = $checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$.byteLength, $dbg_assert$$(1048576 + $bzimage_i$jscomp$inline_51_protected_mode_kernel$$.length < $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$), $data8$jscomp$inline_46_mem8$$.set(new Uint8Array($checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$), 
      $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$));
      $bzimage32_checksum$jscomp$inline_50$$[134] = $prot_mode_kernel_start_ramdisk_address$jscomp$1_setup_sects$$;
      $bzimage32_checksum$jscomp$inline_50$$[135] = $bzimage8_i$jscomp$90_ramdisk_size$$;
      $dbg_assert$$(655360 > 524288 + $cmdline$jscomp$1_real_mode_kernel$$.length);
      $data8$jscomp$inline_46_mem8$$.set($cmdline$jscomp$1_real_mode_kernel$$, 524288);
      $data8$jscomp$inline_46_mem8$$.set($bzimage_i$jscomp$inline_51_protected_mode_kernel$$, 1048576);
      $data8$jscomp$inline_46_mem8$$ = new Uint8Array(512);
      (new Uint16Array($data8$jscomp$inline_46_mem8$$.buffer))[0] = 43605;
      $data8$jscomp$inline_46_mem8$$[2] = 1;
      $checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$ = 3;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 250;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 184;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 32768;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 128;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 142;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 192;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 142;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 216;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 142;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 224;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 142;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 232;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 142;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 208;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 188;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 57344;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 224;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 234;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 0;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 0;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 32800;
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$++] = 128;
      $dbg_assert$$(512 > $checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$);
      $bzimage32_checksum$jscomp$inline_50$$ = $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$] = 0;
      for ($bzimage_i$jscomp$inline_51_protected_mode_kernel$$ = 0; $bzimage_i$jscomp$inline_51_protected_mode_kernel$$ < $data8$jscomp$inline_46_mem8$$.length; $bzimage_i$jscomp$inline_51_protected_mode_kernel$$++) {
        $bzimage32_checksum$jscomp$inline_50$$ += $data8$jscomp$inline_46_mem8$$[$bzimage_i$jscomp$inline_51_protected_mode_kernel$$];
      }
      $data8$jscomp$inline_46_mem8$$[$checksum_index$jscomp$inline_49_i$jscomp$inline_48_initrd$jscomp$1$$] = -$bzimage32_checksum$jscomp$inline_50$$;
      return {name:"genroms/kernel.bin", data:$data8$jscomp$inline_46_mem8$$, };
    }
  }
}
;const $PLATFOM_WINDOWS$$ = "undefined" !== typeof window && 0 <= window.navigator.platform.toString().toLowerCase().search("win");
function $KeyboardAdapter$$($bus$jscomp$13$$) {
  function $may_handle$$($e$jscomp$17$$) {
    return $e$jscomp$17$$.shiftKey && $e$jscomp$17$$.ctrlKey && (73 === $e$jscomp$17$$.keyCode || 74 === $e$jscomp$17$$.keyCode || 75 === $e$jscomp$17$$.keyCode) || !$keyboard$$.emu_enabled ? !1 : $e$jscomp$17$$.target ? $e$jscomp$17$$.target.classList.contains("phone_keyboard") || "INPUT" !== $e$jscomp$17$$.target.nodeName && "TEXTAREA" !== $e$jscomp$17$$.target.nodeName : !0;
  }
  function $keyup_handler$$($e$jscomp$19$$) {
    !$e$jscomp$19$$.altKey && $keys_pressed$$[56] && $handle_code$$(56, !1);
    return $handler$jscomp$14$$($e$jscomp$19$$, !1);
  }
  function $keydown_handler$$($e$jscomp$20$$) {
    !$e$jscomp$20$$.altKey && $keys_pressed$$[56] && $handle_code$$(56, !1);
    return $handler$jscomp$14$$($e$jscomp$20$$, !0);
  }
  function $blur_handler$$() {
    for (var $keys$jscomp$1$$ = Object.keys($keys_pressed$$), $key$jscomp$38$$, $i$jscomp$93$$ = 0; $i$jscomp$93$$ < $keys$jscomp$1$$.length; $i$jscomp$93$$++) {
      $key$jscomp$38$$ = +$keys$jscomp$1$$[$i$jscomp$93$$], $keys_pressed$$[$key$jscomp$38$$] && $handle_code$$($key$jscomp$38$$, !1);
    }
    $keys_pressed$$ = {};
  }
  function $handler$jscomp$14$$($e$jscomp$22$$, $keydown$$) {
    if ($keyboard$$.bus && $may_handle$$($e$jscomp$22$$)) {
      $e$jscomp$22$$.preventDefault && $e$jscomp$22$$.preventDefault();
      if ($PLATFOM_WINDOWS$$ && ($deferred_event$$ && (clearTimeout($deferred_timeout_id$$), $e$jscomp$22$$.getModifierState && $e$jscomp$22$$.getModifierState("AltGraph") && $deferred_keydown$$ === $keydown$$ && "ControlLeft" === $deferred_event$$.code && "AltRight" === $e$jscomp$22$$.code || $handle_event$$($deferred_event$$, $deferred_keydown$$), $deferred_event$$ = null), "ControlLeft" === $e$jscomp$22$$.code)) {
        return $deferred_event$$ = $e$jscomp$22$$, $deferred_keydown$$ = $keydown$$, $deferred_timeout_id$$ = setTimeout(() => {
          $handle_event$$($deferred_event$$, $deferred_keydown$$);
          $deferred_event$$ = null;
        }, 10), !1;
      }
      $handle_event$$($e$jscomp$22$$, $keydown$$);
      return !1;
    }
  }
  function $handle_event$$($e$jscomp$23$$, $keydown$jscomp$1$$) {
    a: {
      if (void 0 !== $e$jscomp$23$$.code) {
        var $code$jscomp$7_code$jscomp$inline_54$$ = $codemap$$[$e$jscomp$23$$.code];
        if (void 0 !== $code$jscomp$7_code$jscomp$inline_54$$) {
          break a;
        }
      }
      $code$jscomp$7_code$jscomp$inline_54$$ = $charmap$jscomp$1$$[$e$jscomp$23$$.keyCode];
    }
    $code$jscomp$7_code$jscomp$inline_54$$ ? $handle_code$$($code$jscomp$7_code$jscomp$inline_54$$, $keydown$jscomp$1$$, $e$jscomp$23$$.repeat) : console.log("Missing char in map: keyCode=" + ($e$jscomp$23$$.keyCode || -1).toString(16) + " code=" + $e$jscomp$23$$.code);
  }
  function $handle_code$$($code$jscomp$8$$, $keydown$jscomp$2$$, $is_repeat$$) {
    if ($keydown$jscomp$2$$) {
      $keys_pressed$$[$code$jscomp$8$$] && !$is_repeat$$ && $handle_code$$($code$jscomp$8$$, !1);
    } else {
      if (!$keys_pressed$$[$code$jscomp$8$$]) {
        return;
      }
    }
    ($keys_pressed$$[$code$jscomp$8$$] = $keydown$jscomp$2$$) || ($code$jscomp$8$$ |= 128);
    255 < $code$jscomp$8$$ ? ($send_to_controller$$($code$jscomp$8$$ >> 8), $send_to_controller$$($code$jscomp$8$$ & 255)) : $send_to_controller$$($code$jscomp$8$$);
  }
  function $send_to_controller$$($code$jscomp$9$$) {
    $keyboard$$.bus.send("keyboard-code", $code$jscomp$9$$);
  }
  var $keys_pressed$$ = {}, $deferred_event$$ = null, $deferred_keydown$$ = !1, $deferred_timeout_id$$ = 0, $keyboard$$ = this;
  this.emu_enabled = !0;
  var $charmap$jscomp$1$$ = new Uint16Array([0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 28, 0, 0, 42, 29, 56, 0, 58, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 57, 57417, 57425, 57423, 57415, 57419, 57416, 57421, 80, 0, 0, 0, 0, 82, 83, 0, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 39, 0, 13, 0, 0, 0, 30, 48, 46, 32, 18, 33, 34, 35, 23, 36, 37, 38, 50, 49, 24, 25, 16, 19, 31, 20, 22, 47, 17, 45, 21, 44, 57435, 57436, 57437, 0, 0, 82, 79, 80, 81, 75, 76, 77, 71, 72, 73, 0, 0, 0, 0, 0, 0, 59, 60, 61, 62, 63, 64, 65, 66, 
  67, 68, 87, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 13, 51, 12, 52, 53, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 43, 27, 40, 0, 57435, 57400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]), $asciimap$$ = {8:8, 10:13, 32:32, 39:222, 44:188, 45:189, 46:190, 47:191, 48:48, 49:49, 50:50, 51:51, 52:52, 53:53, 
  54:54, 55:55, 56:56, 57:57, 59:186, 61:187, 91:219, 92:220, 93:221, 96:192, 97:65, 98:66, 99:67, 100:68, 101:69, 102:70, 103:71, 104:72, 105:73, 106:74, 107:75, 108:76, 109:77, 110:78, 111:79, 112:80, 113:81, 114:82, 115:83, 116:84, 117:85, 118:86, 119:87, 120:88, 121:89, 122:90}, $asciimap_shift$$ = {33:49, 34:222, 35:51, 36:52, 37:53, 38:55, 40:57, 41:48, 42:56, 43:187, 58:186, 60:188, 62:190, 63:191, 64:50, 65:65, 66:66, 67:67, 68:68, 69:69, 70:70, 71:71, 72:72, 73:73, 74:74, 75:75, 76:76, 77:77, 
  78:78, 79:79, 80:80, 81:81, 82:82, 83:83, 84:84, 85:85, 86:86, 87:87, 88:88, 89:89, 90:90, 94:54, 95:189, 123:219, 124:220, 125:221, 126:192}, $codemap$$ = {Escape:1, Digit1:2, Digit2:3, Digit3:4, Digit4:5, Digit5:6, Digit6:7, Digit7:8, Digit8:9, Digit9:10, Digit0:11, Minus:12, Equal:13, Backspace:14, Tab:15, KeyQ:16, KeyW:17, KeyE:18, KeyR:19, KeyT:20, KeyY:21, KeyU:22, KeyI:23, KeyO:24, KeyP:25, BracketLeft:26, BracketRight:27, Enter:28, ControlLeft:29, KeyA:30, KeyS:31, KeyD:32, KeyF:33, KeyG:34, 
  KeyH:35, KeyJ:36, KeyK:37, KeyL:38, Semicolon:39, Quote:40, Backquote:41, ShiftLeft:42, Backslash:43, KeyZ:44, KeyX:45, KeyC:46, KeyV:47, KeyB:48, KeyN:49, KeyM:50, Comma:51, Period:52, Slash:53, IntlRo:53, ShiftRight:54, NumpadMultiply:55, AltLeft:56, Space:57, CapsLock:58, F1:59, F2:60, F3:61, F4:62, F5:63, F6:64, F7:65, F8:66, F9:67, F10:68, NumLock:69, ScrollLock:70, Numpad7:71, Numpad8:72, Numpad9:73, NumpadSubtract:74, Numpad4:75, Numpad5:76, Numpad6:77, NumpadAdd:78, Numpad1:79, Numpad2:80, 
  Numpad3:81, Numpad0:82, NumpadDecimal:83, IntlBackslash:86, F11:87, F12:88, NumpadEnter:57372, ControlRight:57373, NumpadDivide:57397, AltRight:57400, Home:57415, ArrowUp:57416, PageUp:57417, ArrowLeft:57419, ArrowRight:57421, End:57423, ArrowDown:57424, PageDown:57425, Insert:57426, Delete:57427, OSLeft:57435, OSRight:57436, ContextMenu:57437, };
  this.bus = $bus$jscomp$13$$;
  this.destroy = function() {
    "undefined" !== typeof window && (window.removeEventListener("keyup", $keyup_handler$$, !1), window.removeEventListener("keydown", $keydown_handler$$, !1), window.removeEventListener("blur", $blur_handler$$, !1));
  };
  this.init = function() {
    "undefined" !== typeof window && (this.destroy(), window.addEventListener("keyup", $keyup_handler$$, !1), window.addEventListener("keydown", $keydown_handler$$, !1), window.addEventListener("blur", $blur_handler$$, !1));
  };
  this.init();
  this.simulate_press = function($code$jscomp$4_ev$jscomp$1$$) {
    $code$jscomp$4_ev$jscomp$1$$ = {keyCode:$code$jscomp$4_ev$jscomp$1$$};
    $handler$jscomp$14$$($code$jscomp$4_ev$jscomp$1$$, !0);
    $handler$jscomp$14$$($code$jscomp$4_ev$jscomp$1$$, !1);
  };
  this.simulate_char = function($chr$jscomp$5$$) {
    var $code$jscomp$5$$ = $chr$jscomp$5$$.charCodeAt(0);
    $code$jscomp$5$$ in $asciimap$$ ? this.simulate_press($asciimap$$[$code$jscomp$5$$]) : $code$jscomp$5$$ in $asciimap_shift$$ ? ($send_to_controller$$(42), this.simulate_press($asciimap_shift$$[$code$jscomp$5$$]), $send_to_controller$$(170)) : console.log("ascii -> keyCode not found: ", $code$jscomp$5$$, $chr$jscomp$5$$);
  };
}
;function $MouseAdapter$$($bus$jscomp$14$$, $screen_container$jscomp$1$$) {
  function $may_handle$jscomp$1$$($child$jscomp$inline_176_e$jscomp$24$$) {
    if (!$mouse$$.enabled || !$mouse$$.emu_enabled) {
      return !1;
    }
    var $parent$jscomp$5$$ = $screen_container$jscomp$1$$ || document.body, $JSCompiler_temp$jscomp$158$$;
    if (!($JSCompiler_temp$jscomp$158$$ = document.pointerLockElement)) {
      a: {
        for ($child$jscomp$inline_176_e$jscomp$24$$ = $child$jscomp$inline_176_e$jscomp$24$$.target; $child$jscomp$inline_176_e$jscomp$24$$.parentNode;) {
          if ($child$jscomp$inline_176_e$jscomp$24$$ === $parent$jscomp$5$$) {
            $JSCompiler_temp$jscomp$158$$ = !0;
            break a;
          }
          $child$jscomp$inline_176_e$jscomp$24$$ = $child$jscomp$inline_176_e$jscomp$24$$.parentNode;
        }
        $JSCompiler_temp$jscomp$158$$ = !1;
      }
    }
    return $JSCompiler_temp$jscomp$158$$;
  }
  function $touch_start_handler$$($e$jscomp$25_touch_touches$jscomp$2$$) {
    $may_handle$jscomp$1$$($e$jscomp$25_touch_touches$jscomp$2$$) && ($e$jscomp$25_touch_touches$jscomp$2$$ = $e$jscomp$25_touch_touches$jscomp$2$$.changedTouches) && $e$jscomp$25_touch_touches$jscomp$2$$.length && ($e$jscomp$25_touch_touches$jscomp$2$$ = $e$jscomp$25_touch_touches$jscomp$2$$[$e$jscomp$25_touch_touches$jscomp$2$$.length - 1], $last_x$$ = $e$jscomp$25_touch_touches$jscomp$2$$.clientX, $last_y$$ = $e$jscomp$25_touch_touches$jscomp$2$$.clientY);
  }
  function $touch_end_handler$$() {
    if ($left_down$$ || $middle_down$$ || $right_down$$) {
      $mouse$$.bus.send("mouse-click", [!1, !1, !1]), $left_down$$ = $middle_down$$ = $right_down$$ = !1;
    }
  }
  function $mousemove_handler$$($e$jscomp$27$$) {
    if ($mouse$$.bus && $may_handle$jscomp$1$$($e$jscomp$27$$) && $mouse$$.is_running) {
      var $delta_x$jscomp$2$$ = 0, $delta_y$jscomp$2$$ = 0, $touch$jscomp$1_touches$jscomp$3$$ = $e$jscomp$27$$.changedTouches;
      $touch$jscomp$1_touches$jscomp$3$$ ? $touch$jscomp$1_touches$jscomp$3$$.length && ($touch$jscomp$1_touches$jscomp$3$$ = $touch$jscomp$1_touches$jscomp$3$$[$touch$jscomp$1_touches$jscomp$3$$.length - 1], $delta_x$jscomp$2$$ = $touch$jscomp$1_touches$jscomp$3$$.clientX - $last_x$$, $delta_y$jscomp$2$$ = $touch$jscomp$1_touches$jscomp$3$$.clientY - $last_y$$, $last_x$$ = $touch$jscomp$1_touches$jscomp$3$$.clientX, $last_y$$ = $touch$jscomp$1_touches$jscomp$3$$.clientY, $e$jscomp$27$$.preventDefault()) : 
      "number" === typeof $e$jscomp$27$$.movementX ? ($delta_x$jscomp$2$$ = $e$jscomp$27$$.movementX, $delta_y$jscomp$2$$ = $e$jscomp$27$$.movementY) : "number" === typeof $e$jscomp$27$$.webkitMovementX ? ($delta_x$jscomp$2$$ = $e$jscomp$27$$.webkitMovementX, $delta_y$jscomp$2$$ = $e$jscomp$27$$.webkitMovementY) : "number" === typeof $e$jscomp$27$$.mozMovementX ? ($delta_x$jscomp$2$$ = $e$jscomp$27$$.mozMovementX, $delta_y$jscomp$2$$ = $e$jscomp$27$$.mozMovementY) : ($delta_x$jscomp$2$$ = $e$jscomp$27$$.clientX - 
      $last_x$$, $delta_y$jscomp$2$$ = $e$jscomp$27$$.clientY - $last_y$$, $last_x$$ = $e$jscomp$27$$.clientX, $last_y$$ = $e$jscomp$27$$.clientY);
      $mouse$$.bus.send("mouse-delta", [0.15 * $delta_x$jscomp$2$$, -(0.15 * $delta_y$jscomp$2$$)]);
      $screen_container$jscomp$1$$ && $mouse$$.bus.send("mouse-absolute", [$e$jscomp$27$$.pageX - $screen_container$jscomp$1$$.offsetLeft, $e$jscomp$27$$.pageY - $screen_container$jscomp$1$$.offsetTop, $screen_container$jscomp$1$$.offsetWidth, $screen_container$jscomp$1$$.offsetHeight]);
    }
  }
  function $mousedown_handler$$($e$jscomp$28$$) {
    $may_handle$jscomp$1$$($e$jscomp$28$$) && $click_event$$($e$jscomp$28$$, !0);
  }
  function $mouseup_handler$$($e$jscomp$29$$) {
    $may_handle$jscomp$1$$($e$jscomp$29$$) && $click_event$$($e$jscomp$29$$, !1);
  }
  function $click_event$$($e$jscomp$30$$, $down$$) {
    $mouse$$.bus && (1 === $e$jscomp$30$$.which ? $left_down$$ = $down$$ : 2 === $e$jscomp$30$$.which ? $middle_down$$ = $down$$ : 3 === $e$jscomp$30$$.which ? $right_down$$ = $down$$ : $dbg_log$$("Unknown event.which: " + $e$jscomp$30$$.which), $mouse$$.bus.send("mouse-click", [$left_down$$, $middle_down$$, $right_down$$]), $e$jscomp$30$$.preventDefault());
  }
  function $mousewheel_handler$$($e$jscomp$31$$) {
    if ($may_handle$jscomp$1$$($e$jscomp$31$$)) {
      var $delta_x$jscomp$3$$ = $e$jscomp$31$$.wheelDelta || -$e$jscomp$31$$.detail;
      0 > $delta_x$jscomp$3$$ ? $delta_x$jscomp$3$$ = -1 : 0 < $delta_x$jscomp$3$$ && ($delta_x$jscomp$3$$ = 1);
      $mouse$$.bus.send("mouse-wheel", [$delta_x$jscomp$3$$, 0]);
      $e$jscomp$31$$.preventDefault();
    }
  }
  var $left_down$$ = !1, $right_down$$ = !1, $middle_down$$ = !1, $last_x$$ = 0, $last_y$$ = 0, $mouse$$ = this;
  this.enabled = !1;
  this.emu_enabled = !0;
  this.bus = $bus$jscomp$14$$;
  this.bus.register("mouse-enable", function($enabled$jscomp$1$$) {
    this.enabled = $enabled$jscomp$1$$;
  }, this);
  this.is_running = !1;
  this.bus.register("emulator-stopped", function() {
    this.is_running = !1;
  }, this);
  this.bus.register("emulator-started", function() {
    this.is_running = !0;
  }, this);
  this.destroy = function() {
    "undefined" !== typeof window && (window.removeEventListener("touchstart", $touch_start_handler$$, !1), window.removeEventListener("touchend", $touch_end_handler$$, !1), window.removeEventListener("touchmove", $mousemove_handler$$, !1), window.removeEventListener("mousemove", $mousemove_handler$$, !1), window.removeEventListener("mousedown", $mousedown_handler$$, !1), window.removeEventListener("mouseup", $mouseup_handler$$, !1), window.removeEventListener("wheel", $mousewheel_handler$$, {passive:!1}));
  };
  this.init = function() {
    "undefined" !== typeof window && (this.destroy(), window.addEventListener("touchstart", $touch_start_handler$$, !1), window.addEventListener("touchend", $touch_end_handler$$, !1), window.addEventListener("touchmove", $mousemove_handler$$, !1), window.addEventListener("mousemove", $mousemove_handler$$, !1), window.addEventListener("mousedown", $mousedown_handler$$, !1), window.addEventListener("mouseup", $mouseup_handler$$, !1), window.addEventListener("wheel", $mousewheel_handler$$, {passive:!1}));
  };
  this.init();
}
;function $SpeakerAdapter$$($bus$jscomp$15$$) {
  if ("undefined" !== typeof window) {
    if (window.AudioContext || window.webkitAudioContext) {
      var $SpeakerDAC$$ = window.AudioWorklet ? $SpeakerWorkletDAC$$ : $SpeakerBufferSourceDAC$$;
      this.bus = $bus$jscomp$15$$;
      this.audio_context = window.AudioContext ? new AudioContext : new webkitAudioContext;
      this.mixer = new $SpeakerMixer$$($bus$jscomp$15$$, this.audio_context);
      this.pcspeaker = new $PCSpeaker$$($bus$jscomp$15$$, this.audio_context, this.mixer);
      this.dac = new $SpeakerDAC$$($bus$jscomp$15$$, this.audio_context, this.mixer);
      this.pcspeaker.start();
      $bus$jscomp$15$$.register("emulator-stopped", function() {
        this.audio_context.suspend();
      }, this);
      $bus$jscomp$15$$.register("emulator-started", function() {
        this.audio_context.resume();
      }, this);
      $bus$jscomp$15$$.register("speaker-confirm-initialized", function() {
        $bus$jscomp$15$$.send("speaker-has-initialized");
      }, this);
      $bus$jscomp$15$$.send("speaker-has-initialized");
    } else {
      console.warn("Web browser doesn't support Web Audio API");
    }
  }
}
$SpeakerAdapter$$.prototype.destroy = function() {
  this.audio_context && this.audio_context.close();
  this.audio_context = null;
  this.dac && this.dac.node_processor && this.dac.node_processor.port.close();
  this.dac = null;
};
function $SpeakerMixer$$($bus$jscomp$16$$, $audio_context$$) {
  function $create_gain_handler$$($audio_node$$) {
    return function($decibels$jscomp$3$$) {
      $audio_node$$.gain.setValueAtTime($decibels$jscomp$3$$, this.audio_context.currentTime);
    };
  }
  this.audio_context = $audio_context$$;
  this.sources = new Map;
  this.gain_right = this.gain_left = this.volume_right = this.volume_left = this.volume_both = 1;
  this.node_treble_left = this.audio_context.createBiquadFilter();
  this.node_treble_right = this.audio_context.createBiquadFilter();
  this.node_treble_left.type = "highshelf";
  this.node_treble_right.type = "highshelf";
  this.node_treble_left.frequency.setValueAtTime(2000, this.audio_context.currentTime);
  this.node_treble_right.frequency.setValueAtTime(2000, this.audio_context.currentTime);
  this.node_bass_left = this.audio_context.createBiquadFilter();
  this.node_bass_right = this.audio_context.createBiquadFilter();
  this.node_bass_left.type = "lowshelf";
  this.node_bass_right.type = "lowshelf";
  this.node_bass_left.frequency.setValueAtTime(200, this.audio_context.currentTime);
  this.node_bass_right.frequency.setValueAtTime(200, this.audio_context.currentTime);
  this.node_gain_left = this.audio_context.createGain();
  this.node_gain_right = this.audio_context.createGain();
  this.node_merger = this.audio_context.createChannelMerger(2);
  this.input_left = this.node_treble_left;
  this.input_right = this.node_treble_right;
  this.node_treble_left.connect(this.node_bass_left);
  this.node_bass_left.connect(this.node_gain_left);
  this.node_gain_left.connect(this.node_merger, 0, 0);
  this.node_treble_right.connect(this.node_bass_right);
  this.node_bass_right.connect(this.node_gain_right);
  this.node_gain_right.connect(this.node_merger, 0, 1);
  this.node_merger.connect(this.audio_context.destination);
  $bus$jscomp$16$$.register("mixer-connect", function($data$jscomp$186$$) {
    this.connect_source($data$jscomp$186$$[0], $data$jscomp$186$$[1]);
  }, this);
  $bus$jscomp$16$$.register("mixer-disconnect", function($data$jscomp$187$$) {
    this.disconnect_source($data$jscomp$187$$[0], $data$jscomp$187$$[1]);
  }, this);
  $bus$jscomp$16$$.register("mixer-volume", function($data$jscomp$188_gain$$) {
    var $source_id$jscomp$2$$ = $data$jscomp$188_gain$$[0], $channel$jscomp$22$$ = $data$jscomp$188_gain$$[1];
    $data$jscomp$188_gain$$ = Math.pow(10, $data$jscomp$188_gain$$[2] / 20);
    var $source$jscomp$16$$ = 0 === $source_id$jscomp$2$$ ? this : this.sources.get($source_id$jscomp$2$$);
    void 0 === $source$jscomp$16$$ ? $dbg_assert$$(!1, "Mixer set volume - cannot set volume for undefined source: " + $source_id$jscomp$2$$) : $source$jscomp$16$$.set_volume($data$jscomp$188_gain$$, $channel$jscomp$22$$);
  }, this);
  $bus$jscomp$16$$.register("mixer-gain-left", function($decibels$jscomp$1$$) {
    this.gain_left = Math.pow(10, $decibels$jscomp$1$$ / 20);
    this.update();
  }, this);
  $bus$jscomp$16$$.register("mixer-gain-right", function($decibels$jscomp$2$$) {
    this.gain_right = Math.pow(10, $decibels$jscomp$2$$ / 20);
    this.update();
  }, this);
  $bus$jscomp$16$$.register("mixer-treble-left", $create_gain_handler$$(this.node_treble_left), this);
  $bus$jscomp$16$$.register("mixer-treble-right", $create_gain_handler$$(this.node_treble_right), this);
  $bus$jscomp$16$$.register("mixer-bass-left", $create_gain_handler$$(this.node_bass_left), this);
  $bus$jscomp$16$$.register("mixer-bass-right", $create_gain_handler$$(this.node_bass_right), this);
}
$SpeakerMixer$$.prototype.add_source = function($source$jscomp$17_source_node$$, $source_id$jscomp$3$$) {
  $source$jscomp$17_source_node$$ = new $SpeakerMixerSource$$(this.audio_context, $source$jscomp$17_source_node$$, this.input_left, this.input_right);
  $dbg_assert$$(!this.sources.has($source_id$jscomp$3$$), "Mixer add source - overwritting source: " + $source_id$jscomp$3$$);
  this.sources.set($source_id$jscomp$3$$, $source$jscomp$17_source_node$$);
  return $source$jscomp$17_source_node$$;
};
$SpeakerMixer$$.prototype.connect_source = function($source_id$jscomp$4$$, $channel$jscomp$23$$) {
  var $source$jscomp$18$$ = this.sources.get($source_id$jscomp$4$$);
  void 0 === $source$jscomp$18$$ ? $dbg_assert$$(!1, "Mixer connect - cannot connect undefined source: " + $source_id$jscomp$4$$) : $source$jscomp$18$$.connect($channel$jscomp$23$$);
};
$SpeakerMixer$$.prototype.disconnect_source = function($source_id$jscomp$5$$, $channel$jscomp$24$$) {
  var $source$jscomp$19$$ = this.sources.get($source_id$jscomp$5$$);
  void 0 === $source$jscomp$19$$ ? $dbg_assert$$(!1, "Mixer disconnect - cannot disconnect undefined source: " + $source_id$jscomp$5$$) : $source$jscomp$19$$.disconnect($channel$jscomp$24$$);
};
$SpeakerMixer$$.prototype.set_volume = function($value$jscomp$189$$, $channel$jscomp$25$$) {
  void 0 === $channel$jscomp$25$$ && ($channel$jscomp$25$$ = 2);
  switch($channel$jscomp$25$$) {
    case 0:
      this.volume_left = $value$jscomp$189$$;
      break;
    case 1:
      this.volume_right = $value$jscomp$189$$;
      break;
    case 2:
      this.volume_both = $value$jscomp$189$$;
      break;
    default:
      $dbg_assert$$(!1, "Mixer set master volume - unknown channel: " + $channel$jscomp$25$$);
      return;
  }
  this.update();
};
$SpeakerMixer$$.prototype.update = function() {
  var $net_gain_right$$ = this.volume_both * this.volume_right * this.gain_right;
  this.node_gain_left.gain.setValueAtTime(this.volume_both * this.volume_left * this.gain_left, this.audio_context.currentTime);
  this.node_gain_right.gain.setValueAtTime($net_gain_right$$, this.audio_context.currentTime);
};
function $SpeakerMixerSource$$($audio_context$jscomp$1$$, $source_node$jscomp$1$$, $destination_left$$, $destination_right$$) {
  this.audio_context = $audio_context$jscomp$1$$;
  this.connected_right = this.connected_left = !0;
  this.volume_right = this.volume_left = this.volume_both = this.gain_hidden = 1;
  this.node_splitter = $audio_context$jscomp$1$$.createChannelSplitter(2);
  this.node_gain_left = $audio_context$jscomp$1$$.createGain();
  this.node_gain_right = $audio_context$jscomp$1$$.createGain();
  $source_node$jscomp$1$$.connect(this.node_splitter);
  this.node_splitter.connect(this.node_gain_left, 0);
  this.node_gain_left.connect($destination_left$$);
  this.node_splitter.connect(this.node_gain_right, 1);
  this.node_gain_right.connect($destination_right$$);
}
$SpeakerMixerSource$$.prototype.update = function() {
  var $net_gain_right$jscomp$1$$ = this.connected_right * this.gain_hidden * this.volume_both * this.volume_right;
  this.node_gain_left.gain.setValueAtTime(this.connected_left * this.gain_hidden * this.volume_both * this.volume_left, this.audio_context.currentTime);
  this.node_gain_right.gain.setValueAtTime($net_gain_right$jscomp$1$$, this.audio_context.currentTime);
};
$SpeakerMixerSource$$.prototype.connect = function($channel$jscomp$26$$) {
  var $both$$ = !$channel$jscomp$26$$ || 2 === $channel$jscomp$26$$;
  if ($both$$ || 0 === $channel$jscomp$26$$) {
    this.connected_left = !0;
  }
  if ($both$$ || 1 === $channel$jscomp$26$$) {
    this.connected_right = !0;
  }
  this.update();
};
$SpeakerMixerSource$$.prototype.disconnect = function($channel$jscomp$27$$) {
  var $both$jscomp$1$$ = !$channel$jscomp$27$$ || 2 === $channel$jscomp$27$$;
  if ($both$jscomp$1$$ || 0 === $channel$jscomp$27$$) {
    this.connected_left = !1;
  }
  if ($both$jscomp$1$$ || 1 === $channel$jscomp$27$$) {
    this.connected_right = !1;
  }
  this.update();
};
$SpeakerMixerSource$$.prototype.set_volume = function($value$jscomp$190$$, $channel$jscomp$28$$) {
  void 0 === $channel$jscomp$28$$ && ($channel$jscomp$28$$ = 2);
  switch($channel$jscomp$28$$) {
    case 0:
      this.volume_left = $value$jscomp$190$$;
      break;
    case 1:
      this.volume_right = $value$jscomp$190$$;
      break;
    case 2:
      this.volume_both = $value$jscomp$190$$;
      break;
    default:
      $dbg_assert$$(!1, "Mixer set volume - unknown channel: " + $channel$jscomp$28$$);
      return;
  }
  this.update();
};
$SpeakerMixerSource$$.prototype.set_gain_hidden = function($value$jscomp$191$$) {
  this.gain_hidden = $value$jscomp$191$$;
};
function $PCSpeaker$$($bus$jscomp$17$$, $audio_context$jscomp$2$$, $mixer$$) {
  this.node_oscillator = $audio_context$jscomp$2$$.createOscillator();
  this.node_oscillator.type = "square";
  this.node_oscillator.frequency.setValueAtTime(440, $audio_context$jscomp$2$$.currentTime);
  this.mixer_connection = $mixer$$.add_source(this.node_oscillator, 1);
  this.mixer_connection.disconnect();
  $bus$jscomp$17$$.register("pcspeaker-enable", function() {
    $mixer$$.connect_source(1);
  }, this);
  $bus$jscomp$17$$.register("pcspeaker-disable", function() {
    $mixer$$.disconnect_source(1);
  }, this);
  $bus$jscomp$17$$.register("pcspeaker-update", function($data$jscomp$189$$) {
    var $counter_reload$$ = $data$jscomp$189$$[1], $frequency$$ = 0;
    3 === $data$jscomp$189$$[0] && ($frequency$$ = Math.min(1193181.6665999999 / $counter_reload$$, this.node_oscillator.frequency.maxValue), $frequency$$ = Math.max($frequency$$, 0));
    this.node_oscillator.frequency.setValueAtTime($frequency$$, $audio_context$jscomp$2$$.currentTime);
  }, this);
}
$PCSpeaker$$.prototype.start = function() {
  this.node_oscillator.start();
};
function $SpeakerWorkletDAC$$($bus$jscomp$18$$, $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$, $mixer$jscomp$1$$) {
  this.bus = $bus$jscomp$18$$;
  this.audio_context = $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$;
  this.enabled = !1;
  this.sampling_rate = 48000;
  $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$ = function() {
    function $sinc$$($x$jscomp$106$$) {
      if (0 === $x$jscomp$106$$) {
        return 1;
      }
      $x$jscomp$106$$ *= Math.PI;
      return Math.sin($x$jscomp$106$$) / $x$jscomp$106$$;
    }
    function $DACProcessor$$() {
      var $self$jscomp$1$$ = Reflect.construct(AudioWorkletProcessor, [], $DACProcessor$$);
      $self$jscomp$1$$.kernel_size = 3;
      $self$jscomp$1$$.queue_data = Array(1024);
      $self$jscomp$1$$.queue_start = 0;
      $self$jscomp$1$$.queue_end = 0;
      $self$jscomp$1$$.queue_length = 0;
      $self$jscomp$1$$.queue_size = $self$jscomp$1$$.queue_data.length;
      $self$jscomp$1$$.queued_samples = 0;
      $self$jscomp$1$$.source_buffer_previous = $EMPTY_BUFFER$$;
      $self$jscomp$1$$.source_buffer_current = $EMPTY_BUFFER$$;
      $self$jscomp$1$$.source_samples_per_destination = 1.0;
      $self$jscomp$1$$.source_block_start = 0;
      $self$jscomp$1$$.source_time = 0.0;
      $self$jscomp$1$$.source_offset = 0;
      $self$jscomp$1$$.port.onmessage = $event$jscomp$6$$ => {
        switch($event$jscomp$6$$.data.type) {
          case "queue":
            $self$jscomp$1$$.queue_push($event$jscomp$6$$.data.value);
            break;
          case "sampling-rate":
            $self$jscomp$1$$.source_samples_per_destination = $event$jscomp$6$$.data.value / sampleRate;
        }
      };
      return $self$jscomp$1$$;
    }
    var $EMPTY_BUFFER$$ = [new Float32Array(256), new Float32Array(256), ];
    Reflect.setPrototypeOf($DACProcessor$$.prototype, AudioWorkletProcessor.prototype);
    Reflect.setPrototypeOf($DACProcessor$$, AudioWorkletProcessor);
    $DACProcessor$$.prototype.process = $DACProcessor$$.prototype.process = function($i$jscomp$94_inputs$jscomp$1$$, $outputs$jscomp$1_samples_needed_per_block$$) {
      for ($i$jscomp$94_inputs$jscomp$1$$ = 0; $i$jscomp$94_inputs$jscomp$1$$ < $outputs$jscomp$1_samples_needed_per_block$$[0][0].length; $i$jscomp$94_inputs$jscomp$1$$++) {
        for (var $sum0$$ = 0, $sum1$$ = 0, $end$jscomp$26$$ = this.source_offset + this.kernel_size, $j$jscomp$10$$ = this.source_offset - this.kernel_size + 1; $j$jscomp$10$$ <= $end$jscomp$26$$; $j$jscomp$10$$++) {
          var $convolute_index$$ = this.source_block_start + $j$jscomp$10$$;
          $sum0$$ += this.get_sample($convolute_index$$, 0) * this.kernel(this.source_time - $j$jscomp$10$$);
          $sum1$$ += this.get_sample($convolute_index$$, 1) * this.kernel(this.source_time - $j$jscomp$10$$);
        }
        if (isNaN($sum0$$) || isNaN($sum1$$)) {
          $sum0$$ = $sum1$$ = 0, this.dbg_log("ERROR: NaN values! Ignoring for now.");
        }
        $outputs$jscomp$1_samples_needed_per_block$$[0][0][$i$jscomp$94_inputs$jscomp$1$$] = $sum0$$;
        $outputs$jscomp$1_samples_needed_per_block$$[0][1][$i$jscomp$94_inputs$jscomp$1$$] = $sum1$$;
        this.source_time += this.source_samples_per_destination;
        this.source_offset = Math.floor(this.source_time);
      }
      $outputs$jscomp$1_samples_needed_per_block$$ = this.source_offset;
      $outputs$jscomp$1_samples_needed_per_block$$ += this.kernel_size + 2;
      this.source_time -= this.source_offset;
      this.source_block_start += this.source_offset;
      this.source_offset = 0;
      this.ensure_enough_data($outputs$jscomp$1_samples_needed_per_block$$);
      return !0;
    };
    $DACProcessor$$.prototype.kernel = function($x$jscomp$107$$) {
      return $sinc$$($x$jscomp$107$$) * $sinc$$($x$jscomp$107$$ / this.kernel_size);
    };
    $DACProcessor$$.prototype.get_sample = function($index$jscomp$92$$, $channel$jscomp$29$$) {
      return 0 > $index$jscomp$92$$ ? ($index$jscomp$92$$ += this.source_buffer_previous[0].length, this.source_buffer_previous[$channel$jscomp$29$$][$index$jscomp$92$$]) : this.source_buffer_current[$channel$jscomp$29$$][$index$jscomp$92$$];
    };
    $DACProcessor$$.prototype.ensure_enough_data = function($needed$jscomp$1$$) {
      var $current_length$$ = this.source_buffer_current[0].length;
      $current_length$$ - this.source_block_start < $needed$jscomp$1$$ && (this.prepare_next_buffer(), this.source_block_start -= $current_length$$);
    };
    $DACProcessor$$.prototype.prepare_next_buffer = function() {
      256 > this.queued_samples && this.queue_length && this.dbg_log("Not enough samples - should not happen during midway of playback");
      this.source_buffer_previous = this.source_buffer_current;
      this.source_buffer_current = this.queue_shift();
      var $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$ = this.source_buffer_current[0].length;
      if (256 > $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$) {
        for (var $new_big_buffer_pos_queue_pos$$ = this.queue_start, $buffer_count$$ = 0; 256 > $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$ && $buffer_count$$ < this.queue_length;) {
          $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$ += this.queue_data[$new_big_buffer_pos_queue_pos$$][0].length, $new_big_buffer_pos_queue_pos$$ = $new_big_buffer_pos_queue_pos$$ + 1 & this.queue_size - 1, $buffer_count$$++;
        }
        $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$ = Math.max($new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$, 256);
        $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$ = [new Float32Array($new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$), new Float32Array($new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$), ];
        $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$[0].set(this.source_buffer_current[0]);
        $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$[1].set(this.source_buffer_current[1]);
        $new_big_buffer_pos_queue_pos$$ = this.source_buffer_current[0].length;
        for (var $i$jscomp$95$$ = 0; $i$jscomp$95$$ < $buffer_count$$; $i$jscomp$95$$++) {
          var $small_buffer$$ = this.queue_shift();
          $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$[0].set($small_buffer$$[0], $new_big_buffer_pos_queue_pos$$);
          $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$[1].set($small_buffer$$[1], $new_big_buffer_pos_queue_pos$$);
          $new_big_buffer_pos_queue_pos$$ += $small_buffer$$[0].length;
        }
        this.source_buffer_current = $new_big_buffer_new_big_buffer_size_sample_count$jscomp$1$$;
      }
      this.pump();
    };
    $DACProcessor$$.prototype.pump = function() {
      1024 > this.queued_samples / this.source_samples_per_destination && this.port.postMessage({type:"pump", });
    };
    $DACProcessor$$.prototype.queue_push = function($item$jscomp$6$$) {
      this.queue_length < this.queue_size && (this.queue_data[this.queue_end] = $item$jscomp$6$$, this.queue_end = this.queue_end + 1 & this.queue_size - 1, this.queue_length++, this.queued_samples += $item$jscomp$6$$[0].length, this.pump());
    };
    $DACProcessor$$.prototype.queue_shift = function() {
      if (!this.queue_length) {
        return $EMPTY_BUFFER$$;
      }
      var $item$jscomp$7$$ = this.queue_data[this.queue_start];
      this.queue_data[this.queue_start] = null;
      this.queue_start = this.queue_start + 1 & this.queue_size - 1;
      this.queue_length--;
      this.queued_samples -= $item$jscomp$7$$[0].length;
      return $item$jscomp$7$$;
    };
    $DACProcessor$$.prototype.dbg_log = function($message$jscomp$31$$) {
      this.port.postMessage({type:"debug-log", value:$message$jscomp$31$$, });
    };
    registerProcessor("dac-processor", $DACProcessor$$);
  }.toString();
  var $worklet_code_start$$ = $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$.indexOf("{") + 1, $worklet_code_end$$ = $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$.lastIndexOf("}");
  $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$ = $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$.substring($worklet_code_start$$, $worklet_code_end$$);
  $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$ = new Blob(["var DEBUG = true;\n" + $audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$], {type:"application/javascript"});
  var $worklet_url$$ = URL.createObjectURL($audio_context$jscomp$3_worklet_blob_worklet_code_worklet_string$$);
  this.node_processor = null;
  this.node_output = this.audio_context.createGain();
  this.audio_context.audioWorklet.addModule($worklet_url$$).then(() => {
    URL.revokeObjectURL($worklet_url$$);
    this.node_processor = new AudioWorkletNode(this.audio_context, "dac-processor", {numberOfInputs:0, numberOfOutputs:1, outputChannelCount:[2], parameterData:{}, processorOptions:{}, });
    this.node_processor.port.postMessage({type:"sampling-rate", value:this.sampling_rate, });
    this.node_processor.port.onmessage = $event$jscomp$7$$ => {
      switch($event$jscomp$7$$.data.type) {
        case "pump":
          this.pump();
          break;
        case "debug-log":
          $dbg_log$$("SpeakerWorkletDAC - Worklet: " + $event$jscomp$7$$.data.value);
      }
    };
    this.node_processor.connect(this.node_output);
  });
  this.mixer_connection = $mixer$jscomp$1$$.add_source(this.node_output, 2);
  this.mixer_connection.set_gain_hidden(3);
  $bus$jscomp$18$$.register("dac-send-data", function($data$jscomp$190$$) {
    this.queue($data$jscomp$190$$);
  }, this);
  $bus$jscomp$18$$.register("dac-enable", function() {
    this.enabled = !0;
  }, this);
  $bus$jscomp$18$$.register("dac-disable", function() {
    this.enabled = !1;
  }, this);
  $bus$jscomp$18$$.register("dac-tell-sampling-rate", function($rate$jscomp$2$$) {
    $dbg_assert$$(0 < $rate$jscomp$2$$, "Sampling rate should be nonzero");
    this.sampling_rate = $rate$jscomp$2$$;
    this.node_processor && this.node_processor.port.postMessage({type:"sampling-rate", value:$rate$jscomp$2$$, });
  }, this);
  this.debugger = new $SpeakerDACDebugger$$(this.audio_context, this.node_output);
}
$SpeakerWorkletDAC$$.prototype.queue = function($data$jscomp$191$$) {
  this.node_processor && (this.debugger.push_queued_data($data$jscomp$191$$), this.node_processor.port.postMessage({type:"queue", value:$data$jscomp$191$$, }, [$data$jscomp$191$$[0].buffer, $data$jscomp$191$$[1].buffer]));
};
$SpeakerWorkletDAC$$.prototype.pump = function() {
  this.enabled && this.bus.send("dac-request-data");
};
function $SpeakerBufferSourceDAC$$($bus$jscomp$19$$, $audio_context$jscomp$4$$, $mixer$jscomp$2$$) {
  this.bus = $bus$jscomp$19$$;
  this.audio_context = $audio_context$jscomp$4$$;
  this.enabled = !1;
  this.sampling_rate = 22050;
  this.buffered_time = 0;
  this.rate_ratio = 1;
  this.node_lowpass = this.audio_context.createBiquadFilter();
  this.node_lowpass.type = "lowpass";
  this.node_output = this.node_lowpass;
  this.mixer_connection = $mixer$jscomp$2$$.add_source(this.node_output, 2);
  this.mixer_connection.set_gain_hidden(3);
  $bus$jscomp$19$$.register("dac-send-data", function($data$jscomp$192$$) {
    this.queue($data$jscomp$192$$);
  }, this);
  $bus$jscomp$19$$.register("dac-enable", function() {
    this.enabled = !0;
    this.pump();
  }, this);
  $bus$jscomp$19$$.register("dac-disable", function() {
    this.enabled = !1;
  }, this);
  $bus$jscomp$19$$.register("dac-tell-sampling-rate", function($rate$jscomp$3$$) {
    $dbg_assert$$(0 < $rate$jscomp$3$$, "Sampling rate should be nonzero");
    this.sampling_rate = $rate$jscomp$3$$;
    this.rate_ratio = Math.ceil(8000 / $rate$jscomp$3$$);
    this.node_lowpass.frequency.setValueAtTime($rate$jscomp$3$$ / 2, this.audio_context.currentTime);
  }, this);
  this.debugger = new $SpeakerDACDebugger$$(this.audio_context, this.node_output);
}
$SpeakerBufferSourceDAC$$.prototype.queue = function($data$jscomp$193_source$jscomp$20$$) {
  this.debugger.push_queued_data($data$jscomp$193_source$jscomp$20$$);
  var $current_silence_duration_sample_count$jscomp$2$$ = $data$jscomp$193_source$jscomp$20$$[0].length, $block_duration$$ = $current_silence_duration_sample_count$jscomp$2$$ / this.sampling_rate;
  if (1 < this.rate_ratio) {
    var $buffer$jscomp$50_current_time_target_silence_duration$$ = this.audio_context.createBuffer(2, $current_silence_duration_sample_count$jscomp$2$$ * this.rate_ratio, this.sampling_rate * this.rate_ratio);
    for (var $buffer_data0$$ = $buffer$jscomp$50_current_time_target_silence_duration$$.getChannelData(0), $buffer_data1$$ = $buffer$jscomp$50_current_time_target_silence_duration$$.getChannelData(1), $buffer_index$$ = 0, $i$jscomp$96$$ = 0; $i$jscomp$96$$ < $current_silence_duration_sample_count$jscomp$2$$; $i$jscomp$96$$++) {
      for (var $j$jscomp$11$$ = 0; $j$jscomp$11$$ < this.rate_ratio; $j$jscomp$11$$++, $buffer_index$$++) {
        $buffer_data0$$[$buffer_index$$] = $data$jscomp$193_source$jscomp$20$$[0][$i$jscomp$96$$], $buffer_data1$$[$buffer_index$$] = $data$jscomp$193_source$jscomp$20$$[1][$i$jscomp$96$$];
      }
    }
  } else {
    $buffer$jscomp$50_current_time_target_silence_duration$$ = this.audio_context.createBuffer(2, $current_silence_duration_sample_count$jscomp$2$$, this.sampling_rate), $buffer$jscomp$50_current_time_target_silence_duration$$.copyToChannel ? ($buffer$jscomp$50_current_time_target_silence_duration$$.copyToChannel($data$jscomp$193_source$jscomp$20$$[0], 0), $buffer$jscomp$50_current_time_target_silence_duration$$.copyToChannel($data$jscomp$193_source$jscomp$20$$[1], 1)) : ($buffer$jscomp$50_current_time_target_silence_duration$$.getChannelData(0).set($data$jscomp$193_source$jscomp$20$$[0]), 
    $buffer$jscomp$50_current_time_target_silence_duration$$.getChannelData(1).set($data$jscomp$193_source$jscomp$20$$[1]));
  }
  $data$jscomp$193_source$jscomp$20$$ = this.audio_context.createBufferSource();
  $data$jscomp$193_source$jscomp$20$$.buffer = $buffer$jscomp$50_current_time_target_silence_duration$$;
  $data$jscomp$193_source$jscomp$20$$.connect(this.node_lowpass);
  $data$jscomp$193_source$jscomp$20$$.addEventListener("ended", this.pump.bind(this));
  $buffer$jscomp$50_current_time_target_silence_duration$$ = this.audio_context.currentTime;
  if (this.buffered_time < $buffer$jscomp$50_current_time_target_silence_duration$$) {
    for ($dbg_log$$("Speaker DAC - Creating/Recreating reserve - shouldn't occur frequently during playback"), this.buffered_time = $buffer$jscomp$50_current_time_target_silence_duration$$, $buffer$jscomp$50_current_time_target_silence_duration$$ = 0.2 - $block_duration$$, $current_silence_duration_sample_count$jscomp$2$$ = 0; $current_silence_duration_sample_count$jscomp$2$$ <= $buffer$jscomp$50_current_time_target_silence_duration$$;) {
      $current_silence_duration_sample_count$jscomp$2$$ += $block_duration$$, this.buffered_time += $block_duration$$, setTimeout(() => this.pump(), 1000 * $current_silence_duration_sample_count$jscomp$2$$);
    }
  }
  $data$jscomp$193_source$jscomp$20$$.start(this.buffered_time);
  this.buffered_time += $block_duration$$;
  setTimeout(() => this.pump(), 0);
};
$SpeakerBufferSourceDAC$$.prototype.pump = function() {
  this.enabled && (0.2 < this.buffered_time - this.audio_context.currentTime || this.bus.send("dac-request-data"));
};
function $SpeakerDACDebugger$$($audio_context$jscomp$5$$, $source_node$jscomp$2$$) {
  this.audio_context = $audio_context$jscomp$5$$;
  this.node_source = $source_node$jscomp$2$$;
  this.node_processor = null;
  this.node_gain = this.audio_context.createGain();
  this.node_gain.gain.setValueAtTime(0, this.audio_context.currentTime);
  this.node_gain.connect(this.audio_context.destination);
  this.is_active = !1;
  this.queued_history = [];
  this.output_history = [];
  this.queued = [[], []];
  this.output = [[], []];
}
$SpeakerDACDebugger$$.prototype.start = function($duration_ms$$) {
  this.is_active = !0;
  this.queued = [[], []];
  this.output = [[], []];
  this.queued_history.push(this.queued);
  this.output_history.push(this.output);
  this.node_processor = this.audio_context.createScriptProcessor(1024, 2, 2);
  this.node_processor.onaudioprocess = $event$jscomp$8$$ => {
    this.output[0].push($event$jscomp$8$$.inputBuffer.getChannelData(0).slice());
    this.output[1].push($event$jscomp$8$$.inputBuffer.getChannelData(1).slice());
  };
  this.node_source.connect(this.node_processor);
  this.node_processor.connect(this.node_gain);
  setTimeout(() => {
    this.stop();
  }, $duration_ms$$);
};
$SpeakerDACDebugger$$.prototype.stop = function() {
  this.is_active = !1;
  this.node_source.disconnect(this.node_processor);
  this.node_processor.disconnect();
  this.node_processor = null;
};
$SpeakerDACDebugger$$.prototype.push_queued_data = function($data$jscomp$194$$) {
  this.is_active && (this.queued[0].push($data$jscomp$194$$[0].slice()), this.queued[1].push($data$jscomp$194$$[1].slice()));
};
$SpeakerDACDebugger$$.prototype.download_txt = function($history_id_txt$$, $channel$jscomp$30$$) {
  $history_id_txt$$ = this.output_history[$history_id_txt$$][$channel$jscomp$30$$].map($v$jscomp$5$$ => $v$jscomp$5$$.join(" ")).join(" ");
  $dump_file$$($history_id_txt$$, "dacdata.txt");
};
$SpeakerDACDebugger$$.prototype.download_csv = function($buffers$jscomp$5_history_id$jscomp$1$$) {
  $buffers$jscomp$5_history_id$jscomp$1$$ = this.output_history[$buffers$jscomp$5_history_id$jscomp$1$$];
  for (var $csv_rows$$ = [], $buffer_id$$ = 0; $buffer_id$$ < $buffers$jscomp$5_history_id$jscomp$1$$[0].length; $buffer_id$$++) {
    for (var $i$jscomp$97$$ = 0; $i$jscomp$97$$ < $buffers$jscomp$5_history_id$jscomp$1$$[0][$buffer_id$$].length; $i$jscomp$97$$++) {
      $csv_rows$$.push(`${$buffers$jscomp$5_history_id$jscomp$1$$[0][$buffer_id$$][$i$jscomp$97$$]},${$buffers$jscomp$5_history_id$jscomp$1$$[1][$buffer_id$$][$i$jscomp$97$$]}`);
    }
  }
  $dump_file$$($csv_rows$$.join("\n"), "dacdata.csv");
};
function $SerialAdapter$$($element$jscomp$8$$, $bus$jscomp$20$$) {
  function $keypress_handler$$($e$jscomp$33$$) {
    $serial$$.bus && $serial$$.enabled && ($serial$$.send_char($e$jscomp$33$$.which), $e$jscomp$33$$.preventDefault());
  }
  function $keydown_handler$jscomp$1$$($e$jscomp$34$$) {
    var $chr$jscomp$9$$ = $e$jscomp$34$$.which;
    8 === $chr$jscomp$9$$ ? ($serial$$.send_char(127), $e$jscomp$34$$.preventDefault()) : 9 === $chr$jscomp$9$$ && ($serial$$.send_char(9), $e$jscomp$34$$.preventDefault());
  }
  function $paste_handler$$($e$jscomp$35$$) {
    if ($serial$$.enabled) {
      for (var $data$jscomp$195$$ = $e$jscomp$35$$.clipboardData.getData("text/plain"), $i$jscomp$98$$ = 0; $i$jscomp$98$$ < $data$jscomp$195$$.length; $i$jscomp$98$$++) {
        $serial$$.send_char($data$jscomp$195$$.charCodeAt($i$jscomp$98$$));
      }
      $e$jscomp$35$$.preventDefault();
    }
  }
  function $window_click_handler$$($e$jscomp$36$$) {
    $e$jscomp$36$$.target !== $element$jscomp$8$$ && $element$jscomp$8$$.blur();
  }
  var $serial$$ = this;
  this.enabled = !0;
  this.bus = $bus$jscomp$20$$;
  this.text = "";
  this.text_new_line = !1;
  this.last_update = 0;
  this.bus.register("serial0-output-byte", function($byte$jscomp$2_chr$jscomp$6$$) {
    $byte$jscomp$2_chr$jscomp$6$$ = String.fromCharCode($byte$jscomp$2_chr$jscomp$6$$);
    this.show_char($byte$jscomp$2_chr$jscomp$6$$);
  }, this);
  this.destroy = function() {
    $element$jscomp$8$$.removeEventListener("keypress", $keypress_handler$$, !1);
    $element$jscomp$8$$.removeEventListener("keydown", $keydown_handler$jscomp$1$$, !1);
    $element$jscomp$8$$.removeEventListener("paste", $paste_handler$$, !1);
    window.removeEventListener("mousedown", $window_click_handler$$, !1);
  };
  this.init = function() {
    this.destroy();
    $element$jscomp$8$$.style.display = "block";
    $element$jscomp$8$$.addEventListener("keypress", $keypress_handler$$, !1);
    $element$jscomp$8$$.addEventListener("keydown", $keydown_handler$jscomp$1$$, !1);
    $element$jscomp$8$$.addEventListener("paste", $paste_handler$$, !1);
    window.addEventListener("mousedown", $window_click_handler$$, !1);
  };
  this.init();
  this.show_char = function($chr$jscomp$7$$) {
    "\b" === $chr$jscomp$7$$ ? (this.text = this.text.slice(0, -1), this.update()) : "\r" !== $chr$jscomp$7$$ && (this.text += $chr$jscomp$7$$, "\n" === $chr$jscomp$7$$ && (this.text_new_line = !0), this.update());
  };
  this.update = function() {
    var $now$jscomp$11$$ = Date.now(), $delta$jscomp$4$$ = $now$jscomp$11$$ - this.last_update;
    16 > $delta$jscomp$4$$ ? void 0 === this.update_timer && (this.update_timer = setTimeout(() => {
      this.update_timer = void 0;
      var $now$jscomp$12$$ = Date.now();
      $dbg_assert$$(15 <= $now$jscomp$12$$ - this.last_update);
      this.last_update = $now$jscomp$12$$;
      this.render();
    }, 16 - $delta$jscomp$4$$)) : (void 0 !== this.update_timer && (clearTimeout(this.update_timer), this.update_timer = void 0), this.last_update = $now$jscomp$11$$, this.render());
  };
  this.render = function() {
    $element$jscomp$8$$.value = this.text;
    this.text_new_line && (this.text_new_line = !1, $element$jscomp$8$$.scrollTop = 1e9);
  };
  this.send_char = function($chr_code$$) {
    $serial$$.bus && $serial$$.bus.send("serial0-input", $chr_code$$);
  };
}
function $SerialAdapterXtermJS$$($element$jscomp$9$$, $bus$jscomp$22$$) {
  this.element = $element$jscomp$9$$;
  if (window.Terminal) {
    var $term$$ = this.term = new window.Terminal({logLevel:"off", });
    $term$$.write("This is the serial console. Whatever you type or paste here will be sent to COM1");
    var $on_data_disposable$$ = $term$$.onData(function($data$jscomp$196$$) {
      for (let $i$jscomp$99$$ = 0; $i$jscomp$99$$ < $data$jscomp$196$$.length; $i$jscomp$99$$++) {
        $bus$jscomp$22$$.send("serial0-input", $data$jscomp$196$$.charCodeAt($i$jscomp$99$$));
      }
    });
    $bus$jscomp$22$$.register("serial0-output-byte", function($byte$jscomp$4$$) {
      $term$$.write(Uint8Array.of($byte$jscomp$4$$));
    }, this);
    this.destroy = function() {
      $on_data_disposable$$.dispose();
      $term$$.dispose();
    };
  }
}
$SerialAdapterXtermJS$$.prototype.show = function() {
  this.term && this.term.open(this.element);
};
function $NetworkAdapter$$($url$jscomp$24$$, $bus$jscomp$23$$, $id$jscomp$10$$) {
  this.bus = $bus$jscomp$23$$;
  this.socket = void 0;
  this.id = $id$jscomp$10$$ || 0;
  this.send_queue = [];
  this.url = $url$jscomp$24$$;
  this.reconnect_interval = 10000;
  this.last_connect_attempt = Date.now() - this.reconnect_interval;
  this.send_queue_limit = 64;
  this.bus.register("net" + this.id + "-send", function($data$jscomp$197$$) {
    this.send($data$jscomp$197$$);
  }, this);
}
$NetworkAdapter$$.prototype.handle_message = function($e$jscomp$37$$) {
  this.bus && this.bus.send("net" + this.id + "-receive", new Uint8Array($e$jscomp$37$$.data));
};
$NetworkAdapter$$.prototype.handle_close = function() {
  this.connect();
  setTimeout(this.connect.bind(this), this.reconnect_interval);
};
$NetworkAdapter$$.prototype.handle_open = function() {
  for (var $i$jscomp$100$$ = 0; $i$jscomp$100$$ < this.send_queue.length; $i$jscomp$100$$++) {
    this.send(this.send_queue[$i$jscomp$100$$]);
  }
  this.send_queue = [];
};
$NetworkAdapter$$.prototype.handle_error = function() {
};
$NetworkAdapter$$.prototype.destroy = function() {
  this.socket && this.socket.close();
};
$NetworkAdapter$$.prototype.connect = function() {
  if ("undefined" !== typeof WebSocket) {
    if (this.socket) {
      var $now$jscomp$13_state$jscomp$53$$ = this.socket.readyState;
      if (0 === $now$jscomp$13_state$jscomp$53$$ || 1 === $now$jscomp$13_state$jscomp$53$$) {
        return;
      }
    }
    $now$jscomp$13_state$jscomp$53$$ = Date.now();
    if (!(this.last_connect_attempt + this.reconnect_interval > $now$jscomp$13_state$jscomp$53$$)) {
      this.last_connect_attempt = Date.now();
      try {
        this.socket = new WebSocket(this.url);
      } catch ($e$jscomp$41$$) {
        console.error($e$jscomp$41$$);
        return;
      }
      this.socket.binaryType = "arraybuffer";
      this.socket.onopen = this.handle_open.bind(this);
      this.socket.onmessage = this.handle_message.bind(this);
      this.socket.onclose = this.handle_close.bind(this);
      this.socket.onerror = this.handle_error.bind(this);
    }
  }
};
$NetworkAdapter$$.prototype.send = function($data$jscomp$198$$) {
  this.socket && 1 === this.socket.readyState ? this.socket.send($data$jscomp$198$$) : (this.send_queue.push($data$jscomp$198$$), this.send_queue.length > 2 * this.send_queue_limit && (this.send_queue = this.send_queue.slice(-this.send_queue_limit)), this.connect());
};
$NetworkAdapter$$.prototype.change_proxy = function($url$jscomp$25$$) {
  this.url = $url$jscomp$25$$;
  this.socket && (this.socket.onclose = function() {
  }, this.socket.onerror = function() {
  }, this.socket.close(), this.socket = void 0);
};
function $V86$$($options$jscomp$44$$) {
  "number" === typeof $options$jscomp$44$$.log_level && ($LOG_LEVEL$$ = $options$jscomp$44$$.log_level);
  this.cpu_is_running = !1;
  this.cpu_exception_hook = function() {
  };
  var $bus$jscomp$24_wasm_shared_funcs$$ = $Bus$$.create();
  this.bus = $bus$jscomp$24_wasm_shared_funcs$$[0];
  this.emulator_bus = $bus$jscomp$24_wasm_shared_funcs$$[1];
  var $cpu$jscomp$24$$, $wasm_memory$$;
  const $wasm_table$$ = new WebAssembly.Table({element:"anyfunc", initial:1924});
  $bus$jscomp$24_wasm_shared_funcs$$ = {cpu_exception_hook:$n$jscomp$13$$ => this.cpu_exception_hook($n$jscomp$13$$), run_hardware_timers:function($a$jscomp$8$$, $t$jscomp$12$$) {
    return $cpu$jscomp$24$$.run_hardware_timers($a$jscomp$8$$, $t$jscomp$12$$);
  }, cpu_event_halt:() => {
    this.emulator_bus.send("cpu-event-halt");
  }, abort:function() {
    $dbg_assert$$(!1);
  }, microtick:$v86$$.microtick, get_rand_int:function() {
    return $v86util$$.get_rand_int();
  }, apic_acknowledge_irq:function() {
    return $cpu$jscomp$24$$.devices.apic.acknowledge_irq();
  }, stop_idling:function() {
    return $cpu$jscomp$24$$.stop_idling();
  }, io_port_read8:function($addr$jscomp$57$$) {
    return $cpu$jscomp$24$$.io.port_read8($addr$jscomp$57$$);
  }, io_port_read16:function($addr$jscomp$58$$) {
    return $cpu$jscomp$24$$.io.port_read16($addr$jscomp$58$$);
  }, io_port_read32:function($addr$jscomp$59$$) {
    return $cpu$jscomp$24$$.io.port_read32($addr$jscomp$59$$);
  }, io_port_write8:function($addr$jscomp$60$$, $value$jscomp$192$$) {
    $cpu$jscomp$24$$.io.port_write8($addr$jscomp$60$$, $value$jscomp$192$$);
  }, io_port_write16:function($addr$jscomp$61$$, $value$jscomp$193$$) {
    $cpu$jscomp$24$$.io.port_write16($addr$jscomp$61$$, $value$jscomp$193$$);
  }, io_port_write32:function($addr$jscomp$62$$, $value$jscomp$194$$) {
    $cpu$jscomp$24$$.io.port_write32($addr$jscomp$62$$, $value$jscomp$194$$);
  }, mmap_read8:function($addr$jscomp$63$$) {
    return $cpu$jscomp$24$$.mmap_read8($addr$jscomp$63$$);
  }, mmap_read16:function($addr$jscomp$64$$) {
    return $cpu$jscomp$24$$.mmap_read16($addr$jscomp$64$$);
  }, mmap_read32:function($addr$jscomp$65$$) {
    return $cpu$jscomp$24$$.mmap_read32($addr$jscomp$65$$);
  }, mmap_write8:function($addr$jscomp$66$$, $value$jscomp$195$$) {
    $cpu$jscomp$24$$.mmap_write8($addr$jscomp$66$$, $value$jscomp$195$$);
  }, mmap_write16:function($addr$jscomp$67$$, $value$jscomp$196$$) {
    $cpu$jscomp$24$$.mmap_write16($addr$jscomp$67$$, $value$jscomp$196$$);
  }, mmap_write32:function($addr$jscomp$68$$, $value$jscomp$197$$) {
    $cpu$jscomp$24$$.mmap_write32($addr$jscomp$68$$, $value$jscomp$197$$);
  }, mmap_write64:function($addr$jscomp$69$$, $value0$jscomp$2$$, $value1$jscomp$9$$) {
    $cpu$jscomp$24$$.mmap_write64($addr$jscomp$69$$, $value0$jscomp$2$$, $value1$jscomp$9$$);
  }, mmap_write128:function($addr$jscomp$70$$, $value0$jscomp$3$$, $value1$jscomp$10$$, $value2$jscomp$8$$, $value3$jscomp$5$$) {
    $cpu$jscomp$24$$.mmap_write128($addr$jscomp$70$$, $value0$jscomp$3$$, $value1$jscomp$10$$, $value2$jscomp$8$$, $value3$jscomp$5$$);
  }, log_from_wasm:function($offset$jscomp$62_str$jscomp$9$$, $len$jscomp$19$$) {
    $offset$jscomp$62_str$jscomp$9$$ = $v86util$$.read_sized_string_from_mem($wasm_memory$$, $offset$jscomp$62_str$jscomp$9$$, $len$jscomp$19$$);
    $dbg_log$$($offset$jscomp$62_str$jscomp$9$$, 2);
  }, console_log_from_wasm:function($offset$jscomp$63_str$jscomp$10$$, $len$jscomp$20$$) {
    $offset$jscomp$63_str$jscomp$10$$ = $v86util$$.read_sized_string_from_mem($wasm_memory$$, $offset$jscomp$63_str$jscomp$10$$, $len$jscomp$20$$);
    console.error($offset$jscomp$63_str$jscomp$10$$);
  }, dbg_trace_from_wasm:function() {
    $dbg_log$$(Error().stack, 2);
  }, codegen_finalize:($wasm_table_index$jscomp$1$$, $start$jscomp$48$$, $state_flags$jscomp$1$$, $ptr$jscomp$5$$, $len$jscomp$21$$) => {
    $cpu$jscomp$24$$.codegen_finalize($wasm_table_index$jscomp$1$$, $start$jscomp$48$$, $state_flags$jscomp$1$$, $ptr$jscomp$5$$, $len$jscomp$21$$);
  }, jit_clear_func:$wasm_table_index$jscomp$2$$ => $cpu$jscomp$24$$.jit_clear_func($wasm_table_index$jscomp$2$$), jit_clear_all_funcs:() => $cpu$jscomp$24$$.jit_clear_all_funcs(), __indirect_function_table:$wasm_table$$, };
  let $wasm_fn$$ = $options$jscomp$44$$.wasm_fn;
  $wasm_fn$$ || ($wasm_fn$$ = $env$$ => new Promise($resolve$$ => {
    let $v86_bin$$ = "v86-debug.wasm", $v86_bin_fallback$$ = "v86-fallback.wasm";
    if ($options$jscomp$44$$.wasm_path) {
      $v86_bin$$ = $options$jscomp$44$$.wasm_path;
      const $slash$$ = $v86_bin$$.lastIndexOf("/");
      $v86_bin_fallback$$ = (-1 === $slash$$ ? "" : $v86_bin$$.substr(0, $slash$$)) + "/" + $v86_bin_fallback$$;
    } else {
      "undefined" === typeof window && "string" === typeof __dirname ? ($v86_bin$$ = __dirname + "/" + $v86_bin$$, $v86_bin_fallback$$ = __dirname + "/" + $v86_bin_fallback$$) : ($v86_bin$$ = "build/" + $v86_bin$$, $v86_bin_fallback$$ = "build/" + $v86_bin_fallback$$);
    }
    $v86util$$.load_file($v86_bin$$, {done:async $bytes$jscomp$4$$ => {
      try {
        const {instance:$instance$$} = await WebAssembly.instantiate($bytes$jscomp$4$$, $env$$);
        this.wasm_source = $bytes$jscomp$4$$;
        $resolve$$($instance$$.exports);
      } catch ($err$jscomp$8$$) {
        $v86util$$.load_file($v86_bin_fallback$$, {done:async $bytes$jscomp$5$$ => {
          const {instance:$instance$jscomp$1$$} = await WebAssembly.instantiate($bytes$jscomp$5$$, $env$$);
          this.wasm_source = $bytes$jscomp$5$$;
          $resolve$$($instance$jscomp$1$$.exports);
        }, });
      }
    }, progress:$e$jscomp$42$$ => {
      this.emulator_bus.send("download-progress", {file_index:0, file_count:1, file_name:$v86_bin$$, lengthComputable:$e$jscomp$42$$.lengthComputable, total:$e$jscomp$42$$.total, loaded:$e$jscomp$42$$.loaded, });
    }});
  }));
  $wasm_fn$$({env:$bus$jscomp$24_wasm_shared_funcs$$}).then($emulator_exports$$ => {
    $wasm_memory$$ = $emulator_exports$$.memory;
    $emulator_exports$$.rust_init();
    $emulator_exports$$ = this.v86 = new $v86$$(this.emulator_bus, {exports:$emulator_exports$$, wasm_table:$wasm_table$$});
    $cpu$jscomp$24$$ = $emulator_exports$$.cpu;
    this.continue_init($emulator_exports$$, $options$jscomp$44$$);
  });
  this.zstd_worker = null;
  this.zstd_worker_request_id = 0;
}
$V86$$.prototype.continue_init = async function($emulator$jscomp$1$$, $options$jscomp$45$$) {
  function $put_on_settings$$($name$jscomp$90$$, $buffer$jscomp$51$$) {
    switch($name$jscomp$90$$) {
      case "hda":
        $settings$jscomp$3$$.hda = this.disk_images.hda = $buffer$jscomp$51$$;
        break;
      case "hdb":
        $settings$jscomp$3$$.hdb = this.disk_images.hdb = $buffer$jscomp$51$$;
        break;
      case "cdrom":
        $settings$jscomp$3$$.cdrom = this.disk_images.cdrom = $buffer$jscomp$51$$;
        break;
      case "fda":
        $settings$jscomp$3$$.fda = this.disk_images.fda = $buffer$jscomp$51$$;
        break;
      case "fdb":
        $settings$jscomp$3$$.fdb = this.disk_images.fdb = $buffer$jscomp$51$$;
        break;
      case "multiboot":
        $settings$jscomp$3$$.multiboot = this.disk_images.multiboot = $buffer$jscomp$51$$.buffer;
        break;
      case "bzimage":
        $settings$jscomp$3$$.bzimage = this.disk_images.bzimage = $buffer$jscomp$51$$.buffer;
        break;
      case "initrd":
        $settings$jscomp$3$$.initrd = this.disk_images.initrd = $buffer$jscomp$51$$.buffer;
        break;
      case "bios":
        $settings$jscomp$3$$.bios = $buffer$jscomp$51$$.buffer;
        break;
      case "vga_bios":
        $settings$jscomp$3$$.vga_bios = $buffer$jscomp$51$$.buffer;
        break;
      case "initial_state":
        $settings$jscomp$3$$.initial_state = $buffer$jscomp$51$$.buffer;
        break;
      case "fs9p_json":
        $settings$jscomp$3$$.fs9p_json = $buffer$jscomp$51$$;
        break;
      default:
        $dbg_assert$$(!1, $name$jscomp$90$$);
    }
  }
  async function $done$jscomp$3$$() {
    if ($settings$jscomp$3$$.fs9p && $settings$jscomp$3$$.fs9p_json) {
      if ($settings$jscomp$3$$.initial_state) {
        $dbg_log$$("Filesystem basefs ignored: Overridden by state image");
      } else {
        if ($settings$jscomp$3$$.fs9p.load_from_json($settings$jscomp$3$$.fs9p_json), $options$jscomp$45$$.bzimage_initrd_from_filesystem) {
          const {bzimage_path:$bzimage_path$$, initrd_path:$initrd_path$$} = this.get_bzimage_initrd_from_filesystem($settings$jscomp$3$$.fs9p);
          $dbg_log$$("Found bzimage: " + $bzimage_path$$ + " and initrd: " + $initrd_path$$);
          const [$initrd$jscomp$2$$, $bzimage$jscomp$1$$] = await Promise.all([$settings$jscomp$3$$.fs9p.read_file($initrd_path$$), $settings$jscomp$3$$.fs9p.read_file($bzimage_path$$), ]);
          $put_on_settings$$.call(this, "initrd", new $v86util$$.SyncBuffer($initrd$jscomp$2$$.buffer));
          $put_on_settings$$.call(this, "bzimage", new $v86util$$.SyncBuffer($bzimage$jscomp$1$$.buffer));
        }
      }
    } else {
      $dbg_assert$$(!$options$jscomp$45$$.bzimage_initrd_from_filesystem || $settings$jscomp$3$$.initial_state, "bzimage_initrd_from_filesystem: Requires a filesystem");
    }
    this.serial_adapter && this.serial_adapter.show && this.serial_adapter.show();
    this.v86.init($settings$jscomp$3$$);
    $settings$jscomp$3$$.initial_state && ($emulator$jscomp$1$$.restore_state($settings$jscomp$3$$.initial_state), $settings$jscomp$3$$.initial_state = void 0);
    $options$jscomp$45$$.autostart && this.v86.run();
    this.emulator_bus.send("emulator-loaded");
  }
  this.bus.register("emulator-stopped", function() {
    this.cpu_is_running = !1;
    this.screen_adapter.pause();
  }, this);
  this.bus.register("emulator-started", function() {
    this.cpu_is_running = !0;
    this.screen_adapter.continue();
  }, this);
  var $settings$jscomp$3$$ = {};
  this.disk_images = {fda:void 0, fdb:void 0, hda:void 0, hdb:void 0, cdrom:void 0, };
  var $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$ = $options$jscomp$45$$.boot_order ? $options$jscomp$45$$.boot_order : $options$jscomp$45$$.fda ? 801 : $options$jscomp$45$$.hda ? 786 : 291;
  $settings$jscomp$3$$.acpi = $options$jscomp$45$$.acpi;
  $settings$jscomp$3$$.disable_jit = $options$jscomp$45$$.disable_jit;
  $settings$jscomp$3$$.load_devices = !0;
  $settings$jscomp$3$$.memory_size = $options$jscomp$45$$.memory_size || 67108864;
  $settings$jscomp$3$$.vga_memory_size = $options$jscomp$45$$.vga_memory_size || 8388608;
  $settings$jscomp$3$$.boot_order = $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$;
  $settings$jscomp$3$$.fastboot = $options$jscomp$45$$.fastboot || !1;
  $settings$jscomp$3$$.fda = void 0;
  $settings$jscomp$3$$.fdb = void 0;
  $settings$jscomp$3$$.uart1 = $options$jscomp$45$$.uart1;
  $settings$jscomp$3$$.uart2 = $options$jscomp$45$$.uart2;
  $settings$jscomp$3$$.uart3 = $options$jscomp$45$$.uart3;
  $settings$jscomp$3$$.cmdline = $options$jscomp$45$$.cmdline;
  $settings$jscomp$3$$.preserve_mac_from_state_image = $options$jscomp$45$$.preserve_mac_from_state_image;
  $settings$jscomp$3$$.mac_address_translation = $options$jscomp$45$$.mac_address_translation;
  $settings$jscomp$3$$.cpuid_level = $options$jscomp$45$$.cpuid_level;
  $settings$jscomp$3$$.virtio_console = $options$jscomp$45$$.virtio_console;
  $settings$jscomp$3$$.virtio_net = $options$jscomp$45$$.virtio_net;
  $settings$jscomp$3$$.screen_options = $options$jscomp$45$$.screen_options;
  if ($add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$ = $options$jscomp$45$$.network_relay_url || $options$jscomp$45$$.net_device && $options$jscomp$45$$.net_device.relay_url) {
    "fetch" === $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$ ? this.network_adapter = new $FetchNetworkAdapter$$(this.bus) : $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$.startsWith("wisp://") || $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$.startsWith("wisps://") ? this.network_adapter = new $WispNetworkAdapter$$($add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$, this.bus, $options$jscomp$45$$) : this.network_adapter = new $NetworkAdapter$$($add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$, 
    this.bus);
  }
  $settings$jscomp$3$$.net_device = $options$jscomp$45$$.net_device || {type:"ne2k"};
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$ = $options$jscomp$45$$.screen || {};
  $options$jscomp$45$$.screen_container && ($add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$.container = $options$jscomp$45$$.screen_container);
  $options$jscomp$45$$.disable_keyboard || (this.keyboard_adapter = new $KeyboardAdapter$$(this.bus));
  $options$jscomp$45$$.disable_mouse || (this.mouse_adapter = new $MouseAdapter$$(this.bus, $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$.container));
  this.screen_adapter = $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$.container ? new $ScreenAdapter$$($add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$, () => this.v86.cpu.devices.vga && this.v86.cpu.devices.vga.screen_fill_buffer()) : new $DummyScreenAdapter$$;
  $settings$jscomp$3$$.screen = this.screen_adapter;
  $settings$jscomp$3$$.screen_options = $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$;
  $options$jscomp$45$$.serial_container && (this.serial_adapter = new $SerialAdapter$$($options$jscomp$45$$.serial_container, this.bus));
  $options$jscomp$45$$.serial_container_xtermjs && (this.serial_adapter = new $SerialAdapterXtermJS$$($options$jscomp$45$$.serial_container_xtermjs, this.bus));
  $options$jscomp$45$$.disable_speaker || (this.speaker_adapter = new $SpeakerAdapter$$(this.bus));
  var $files_to_load$$ = [];
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$ = ($name$jscomp$91$$, $file$jscomp$3$$) => {
    if ($file$jscomp$3$$) {
      if ($file$jscomp$3$$.get && $file$jscomp$3$$.set && $file$jscomp$3$$.load) {
        $files_to_load$$.push({name:$name$jscomp$91$$, loadable:$file$jscomp$3$$, });
      } else {
        if ("bios" === $name$jscomp$91$$ || "vga_bios" === $name$jscomp$91$$ || "initial_state" === $name$jscomp$91$$ || "multiboot" === $name$jscomp$91$$ || "bzimage" === $name$jscomp$91$$ || "initrd" === $name$jscomp$91$$) {
          $file$jscomp$3$$.async = !1;
        }
        if ("fda" === $name$jscomp$91$$ || "fdb" === $name$jscomp$91$$) {
          $file$jscomp$3$$.async = !1;
        }
        $file$jscomp$3$$.url && !$file$jscomp$3$$.async ? $files_to_load$$.push({name:$name$jscomp$91$$, url:$file$jscomp$3$$.url, size:$file$jscomp$3$$.size, }) : $files_to_load$$.push({name:$name$jscomp$91$$, loadable:$v86util$$.buffer_from_object($file$jscomp$3$$, this.zstd_decompress_worker.bind(this)), });
      }
    }
  };
  $options$jscomp$45$$.state && console.warn("Warning: Unknown option 'state'. Did you mean 'initial_state'?");
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("bios", $options$jscomp$45$$.bios);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("vga_bios", $options$jscomp$45$$.vga_bios);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("cdrom", $options$jscomp$45$$.cdrom);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("hda", $options$jscomp$45$$.hda);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("hdb", $options$jscomp$45$$.hdb);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("fda", $options$jscomp$45$$.fda);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("fdb", $options$jscomp$45$$.fdb);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("initial_state", $options$jscomp$45$$.initial_state);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("multiboot", $options$jscomp$45$$.multiboot);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("bzimage", $options$jscomp$45$$.bzimage);
  $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$("initrd", $options$jscomp$45$$.initrd);
  if ($options$jscomp$45$$.filesystem) {
    $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$ = $options$jscomp$45$$.filesystem.basefs;
    var $base_url$$ = $options$jscomp$45$$.filesystem.baseurl;
    let $file_storage$$ = new $MemoryFileStorage$$;
    $base_url$$ && ($file_storage$$ = new $ServerFileStorageWrapper$$($file_storage$$, $base_url$$));
    $settings$jscomp$3$$.fs9p = this.fs9p = new $FS$$($file_storage$$);
    if ($add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$) {
      $dbg_assert$$($base_url$$, "Filesystem: baseurl must be specified");
      if ("object" === typeof $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$) {
        var $size$jscomp$42$$ = $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$.size;
        $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$ = $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$.url;
      }
      $dbg_assert$$("string" === typeof $add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$);
      $files_to_load$$.push({name:"fs9p_json", url:$add_file_boot_order$jscomp$1_fs_url_relay_url_screen_options$$, size:$size$jscomp$42$$, as_json:!0, });
    }
  }
  var $starter$$ = this, $total$jscomp$1$$ = $files_to_load$$.length, $cont$$ = function($index$jscomp$93$$) {
    if ($index$jscomp$93$$ === $total$jscomp$1$$) {
      setTimeout($done$jscomp$3$$.bind(this), 0);
    } else {
      var $f$jscomp$7$$ = $files_to_load$$[$index$jscomp$93$$];
      $f$jscomp$7$$.loadable ? ($f$jscomp$7$$.loadable.onload = function() {
        $put_on_settings$$.call(this, $f$jscomp$7$$.name, $f$jscomp$7$$.loadable);
        $cont$$($index$jscomp$93$$ + 1);
      }.bind(this), $f$jscomp$7$$.loadable.load()) : $v86util$$.load_file($f$jscomp$7$$.url, {done:function($result$jscomp$15$$) {
        $f$jscomp$7$$.url.endsWith(".zst") && "initial_state" !== $f$jscomp$7$$.name && ($dbg_assert$$($f$jscomp$7$$.size, "A size must be provided for compressed images"), $result$jscomp$15$$ = this.zstd_decompress($f$jscomp$7$$.size, new Uint8Array($result$jscomp$15$$)));
        $put_on_settings$$.call(this, $f$jscomp$7$$.name, $f$jscomp$7$$.as_json ? $result$jscomp$15$$ : new $v86util$$.SyncBuffer($result$jscomp$15$$));
        $cont$$($index$jscomp$93$$ + 1);
      }.bind(this), progress:function($e$jscomp$44$$) {
        200 === $e$jscomp$44$$.target.status ? $starter$$.emulator_bus.send("download-progress", {file_index:$index$jscomp$93$$, file_count:$total$jscomp$1$$, file_name:$f$jscomp$7$$.url, lengthComputable:$e$jscomp$44$$.lengthComputable, total:$e$jscomp$44$$.total || $f$jscomp$7$$.size, loaded:$e$jscomp$44$$.loaded, }) : $starter$$.emulator_bus.send("download-error", {file_index:$index$jscomp$93$$, file_count:$total$jscomp$1$$, file_name:$f$jscomp$7$$.url, request:$e$jscomp$44$$.target, });
      }, as_json:$f$jscomp$7$$.as_json, });
    }
  }.bind(this);
  $cont$$(0);
};
$V86$$.prototype.zstd_decompress = function($decompressed_size$$, $ptr$jscomp$6_src$jscomp$4$$) {
  const $cpu$jscomp$25$$ = this.v86.cpu;
  $dbg_assert$$(!this.zstd_context);
  this.zstd_context = $cpu$jscomp$25$$.zstd_create_ctx($ptr$jscomp$6_src$jscomp$4$$.length);
  (new Uint8Array($cpu$jscomp$25$$.wasm_memory.buffer)).set($ptr$jscomp$6_src$jscomp$4$$, $cpu$jscomp$25$$.zstd_get_src_ptr(this.zstd_context));
  $ptr$jscomp$6_src$jscomp$4$$ = $cpu$jscomp$25$$.zstd_read(this.zstd_context, $decompressed_size$$);
  const $result$jscomp$16$$ = $cpu$jscomp$25$$.wasm_memory.buffer.slice($ptr$jscomp$6_src$jscomp$4$$, $ptr$jscomp$6_src$jscomp$4$$ + $decompressed_size$$);
  $cpu$jscomp$25$$.zstd_read_free($ptr$jscomp$6_src$jscomp$4$$, $decompressed_size$$);
  $cpu$jscomp$25$$.zstd_free_ctx(this.zstd_context);
  this.zstd_context = null;
  return $result$jscomp$16$$;
};
$V86$$.prototype.zstd_decompress_worker = async function($decompressed_size$jscomp$1$$, $src$jscomp$5$$) {
  if (!this.zstd_worker) {
    const $url$jscomp$26$$ = URL.createObjectURL(new Blob(["(" + function() {
      let $wasm$jscomp$1$$;
      globalThis.onmessage = function($e$jscomp$45_exports$jscomp$1$$) {
        if ($wasm$jscomp$1$$) {
          var {src:$src$jscomp$6$$, decompressed_size:$decompressed_size$jscomp$2$$, id:$id$jscomp$11$$} = $e$jscomp$45_exports$jscomp$1$$.data;
          $e$jscomp$45_exports$jscomp$1$$ = $wasm$jscomp$1$$.exports;
          var $env$jscomp$1_zstd_context$$ = $e$jscomp$45_exports$jscomp$1$$.zstd_create_ctx($src$jscomp$6$$.length);
          (new Uint8Array($e$jscomp$45_exports$jscomp$1$$.memory.buffer)).set($src$jscomp$6$$, $e$jscomp$45_exports$jscomp$1$$.zstd_get_src_ptr($env$jscomp$1_zstd_context$$));
          var $ptr$jscomp$7$$ = $e$jscomp$45_exports$jscomp$1$$.zstd_read($env$jscomp$1_zstd_context$$, $decompressed_size$jscomp$2$$), $result$jscomp$17$$ = $e$jscomp$45_exports$jscomp$1$$.memory.buffer.slice($ptr$jscomp$7$$, $ptr$jscomp$7$$ + $decompressed_size$jscomp$2$$);
          $e$jscomp$45_exports$jscomp$1$$.zstd_read_free($ptr$jscomp$7$$, $decompressed_size$jscomp$2$$);
          $e$jscomp$45_exports$jscomp$1$$.zstd_free_ctx($env$jscomp$1_zstd_context$$);
          postMessage({result:$result$jscomp$17$$, id:$id$jscomp$11$$}, [$result$jscomp$17$$]);
        } else {
          $env$jscomp$1_zstd_context$$ = Object.fromEntries("cpu_exception_hook run_hardware_timers cpu_event_halt microtick get_rand_int apic_acknowledge_irq stop_idling io_port_read8 io_port_read16 io_port_read32 io_port_write8 io_port_write16 io_port_write32 mmap_read8 mmap_read16 mmap_read32 mmap_write8 mmap_write16 mmap_write32 mmap_write64 mmap_write128 codegen_finalize jit_clear_func jit_clear_all_funcs".split(" ").map($f$jscomp$8$$ => [$f$jscomp$8$$, () => console.error("zstd worker unexpectedly called " + 
          $f$jscomp$8$$)])), $env$jscomp$1_zstd_context$$.__indirect_function_table = new WebAssembly.Table({element:"anyfunc", initial:1024}), $env$jscomp$1_zstd_context$$.abort = () => {
            throw Error("zstd worker aborted");
          }, $env$jscomp$1_zstd_context$$.log_from_wasm = $env$jscomp$1_zstd_context$$.console_log_from_wasm = ($off$jscomp$1$$, $len$jscomp$22$$) => {
            console.log(String.fromCharCode(...(new Uint8Array($wasm$jscomp$1$$.exports.memory.buffer, $off$jscomp$1$$, $len$jscomp$22$$))));
          }, $env$jscomp$1_zstd_context$$.dbg_trace_from_wasm = () => console.trace(), $wasm$jscomp$1$$ = new WebAssembly.Instance(new WebAssembly.Module($e$jscomp$45_exports$jscomp$1$$.data), {env:$env$jscomp$1_zstd_context$$});
        }
      };
    }.toString() + ")()"], {type:"text/javascript"}));
    this.zstd_worker = new Worker($url$jscomp$26$$);
    URL.revokeObjectURL($url$jscomp$26$$);
    this.zstd_worker.postMessage(this.wasm_source, [this.wasm_source]);
  }
  return new Promise($resolve$jscomp$1$$ => {
    const $id$jscomp$12$$ = this.zstd_worker_request_id++, $done$jscomp$4$$ = async $e$jscomp$46$$ => {
      $e$jscomp$46$$.data.id === $id$jscomp$12$$ && (this.zstd_worker.removeEventListener("message", $done$jscomp$4$$), $dbg_assert$$($decompressed_size$jscomp$1$$ === $e$jscomp$46$$.data.result.byteLength), $resolve$jscomp$1$$($e$jscomp$46$$.data.result));
    };
    this.zstd_worker.addEventListener("message", $done$jscomp$4$$);
    this.zstd_worker.postMessage({src:$src$jscomp$5$$, decompressed_size:$decompressed_size$jscomp$1$$, id:$id$jscomp$12$$}, [$src$jscomp$5$$.buffer]);
  });
};
$V86$$.prototype.get_bzimage_initrd_from_filesystem = function($boot_filesystem$jscomp$1$$) {
  const $root$jscomp$3$$ = ($boot_filesystem$jscomp$1$$.read_dir("/") || []).map($x$jscomp$108$$ => "/" + $x$jscomp$108$$);
  $boot_filesystem$jscomp$1$$ = ($boot_filesystem$jscomp$1$$.read_dir("/boot/") || []).map($x$jscomp$109$$ => "/boot/" + $x$jscomp$109$$);
  let $initrd_path$jscomp$1$$, $bzimage_path$jscomp$1$$;
  for (const $f$jscomp$9$$ of [].concat($root$jscomp$3$$, $boot_filesystem$jscomp$1$$)) {
    const $old$$ = /old/i.test($f$jscomp$9$$) || /fallback/i.test($f$jscomp$9$$), $is_bzimage$$ = /vmlinuz/i.test($f$jscomp$9$$) || /bzimage/i.test($f$jscomp$9$$), $is_initrd$$ = /initrd/i.test($f$jscomp$9$$) || /initramfs/i.test($f$jscomp$9$$);
    !$is_bzimage$$ || $bzimage_path$jscomp$1$$ && $old$$ || ($bzimage_path$jscomp$1$$ = $f$jscomp$9$$);
    !$is_initrd$$ || $initrd_path$jscomp$1$$ && $old$$ || ($initrd_path$jscomp$1$$ = $f$jscomp$9$$);
  }
  $initrd_path$jscomp$1$$ && $bzimage_path$jscomp$1$$ || (console.log("Failed to find bzimage or initrd in filesystem. Files:"), console.log($root$jscomp$3$$.join(" ")), console.log($boot_filesystem$jscomp$1$$.join(" ")));
  return {initrd_path:$initrd_path$jscomp$1$$, bzimage_path:$bzimage_path$jscomp$1$$};
};
$V86$$.prototype.run = async function() {
  this.v86.run();
};
$goog$$.exportProperty($V86$$.prototype, "run", $V86$$.prototype.run);
$V86$$.prototype.stop = async function() {
  this.cpu_is_running && await new Promise($resolve$jscomp$2$$ => {
    const $listener$jscomp$65$$ = () => {
      this.remove_listener("emulator-stopped", $listener$jscomp$65$$);
      $resolve$jscomp$2$$();
    };
    this.add_listener("emulator-stopped", $listener$jscomp$65$$);
    this.v86.stop();
  });
};
$goog$$.exportProperty($V86$$.prototype, "stop", $V86$$.prototype.stop);
$V86$$.prototype.destroy = async function() {
  await this.stop();
  this.v86.destroy();
  this.keyboard_adapter && this.keyboard_adapter.destroy();
  this.network_adapter && this.network_adapter.destroy();
  this.mouse_adapter && this.mouse_adapter.destroy();
  this.screen_adapter && this.screen_adapter.destroy();
  this.serial_adapter && this.serial_adapter.destroy();
  this.speaker_adapter && this.speaker_adapter.destroy();
};
$goog$$.exportProperty($V86$$.prototype, "destroy", $V86$$.prototype.destroy);
$V86$$.prototype.restart = function() {
  this.v86.restart();
};
$goog$$.exportProperty($V86$$.prototype, "restart", $V86$$.prototype.restart);
$V86$$.prototype.add_listener = function($event$jscomp$9$$, $listener$jscomp$66$$) {
  this.bus.register($event$jscomp$9$$, $listener$jscomp$66$$, this);
};
$goog$$.exportProperty($V86$$.prototype, "add_listener", $V86$$.prototype.add_listener);
$V86$$.prototype.remove_listener = function($event$jscomp$10$$, $listener$jscomp$67$$) {
  this.bus.unregister($event$jscomp$10$$, $listener$jscomp$67$$);
};
$goog$$.exportProperty($V86$$.prototype, "remove_listener", $V86$$.prototype.remove_listener);
$V86$$.prototype.restore_state = async function($state$jscomp$54$$) {
  $dbg_assert$$(1 === arguments.length);
  this.v86.restore_state($state$jscomp$54$$);
};
$goog$$.exportProperty($V86$$.prototype, "restore_state", $V86$$.prototype.restore_state);
$V86$$.prototype.save_state = async function() {
  $dbg_assert$$(0 === arguments.length);
  return this.v86.save_state();
};
$goog$$.exportProperty($V86$$.prototype, "save_state", $V86$$.prototype.save_state);
$V86$$.prototype.get_instruction_counter = function() {
  return this.v86 ? this.v86.cpu.instruction_counter[0] >>> 0 : 0;
};
$goog$$.exportProperty($V86$$.prototype, "get_instruction_counter", $V86$$.prototype.get_instruction_counter);
$V86$$.prototype.is_running = function() {
  return this.cpu_is_running;
};
$goog$$.exportProperty($V86$$.prototype, "is_running", $V86$$.prototype.is_running);
$V86$$.prototype.set_fda = async function($file$jscomp$4$$) {
  if ($file$jscomp$4$$.url && !$file$jscomp$4$$.async) {
    $v86util$$.load_file($file$jscomp$4$$.url, {done:$result$jscomp$18$$ => {
      this.v86.cpu.devices.fdc.set_fda(new $v86util$$.SyncBuffer($result$jscomp$18$$));
    }, });
  } else {
    const $image$jscomp$4$$ = $v86util$$.buffer_from_object($file$jscomp$4$$, this.zstd_decompress_worker.bind(this));
    $image$jscomp$4$$.onload = () => {
      this.v86.cpu.devices.fdc.set_fda($image$jscomp$4$$);
    };
    await $image$jscomp$4$$.load();
  }
};
$goog$$.exportProperty($V86$$.prototype, "set_fda", $V86$$.prototype.set_fda);
$V86$$.prototype.eject_fda = function() {
  this.v86.cpu.devices.fdc.eject_fda();
};
$goog$$.exportProperty($V86$$.prototype, "eject_fda", $V86$$.prototype.eject_fda);
$V86$$.prototype.keyboard_send_scancodes = function($codes$$) {
  for (var $i$jscomp$101$$ = 0; $i$jscomp$101$$ < $codes$$.length; $i$jscomp$101$$++) {
    this.bus.send("keyboard-code", $codes$$[$i$jscomp$101$$]);
  }
};
$goog$$.exportProperty($V86$$.prototype, "keyboard_send_scancodes", $V86$$.prototype.keyboard_send_scancodes);
$V86$$.prototype.keyboard_send_keys = function($codes$jscomp$1$$) {
  for (var $i$jscomp$102$$ = 0; $i$jscomp$102$$ < $codes$jscomp$1$$.length; $i$jscomp$102$$++) {
    this.keyboard_adapter.simulate_press($codes$jscomp$1$$[$i$jscomp$102$$]);
  }
};
$goog$$.exportProperty($V86$$.prototype, "keyboard_send_keys", $V86$$.prototype.keyboard_send_keys);
$V86$$.prototype.keyboard_send_text = function($string$jscomp$3$$) {
  for (var $i$jscomp$103$$ = 0; $i$jscomp$103$$ < $string$jscomp$3$$.length; $i$jscomp$103$$++) {
    this.keyboard_adapter.simulate_char($string$jscomp$3$$[$i$jscomp$103$$]);
  }
};
$goog$$.exportProperty($V86$$.prototype, "keyboard_send_text", $V86$$.prototype.keyboard_send_text);
$V86$$.prototype.screen_make_screenshot = function() {
  return this.screen_adapter ? this.screen_adapter.make_screenshot() : null;
};
$goog$$.exportProperty($V86$$.prototype, "screen_make_screenshot", $V86$$.prototype.screen_make_screenshot);
$V86$$.prototype.screen_set_scale = function($sx$jscomp$3$$, $sy$jscomp$4$$) {
  this.screen_adapter && this.screen_adapter.set_scale($sx$jscomp$3$$, $sy$jscomp$4$$);
};
$goog$$.exportProperty($V86$$.prototype, "screen_set_scale", $V86$$.prototype.screen_set_scale);
$V86$$.prototype.screen_go_fullscreen = function() {
  if (this.screen_adapter) {
    var $elem$jscomp$2_focus_element$$ = document.getElementById("screen_container");
    if ($elem$jscomp$2_focus_element$$) {
      var $fn$jscomp$18$$ = $elem$jscomp$2_focus_element$$.requestFullScreen || $elem$jscomp$2_focus_element$$.webkitRequestFullscreen || $elem$jscomp$2_focus_element$$.mozRequestFullScreen || $elem$jscomp$2_focus_element$$.msRequestFullScreen;
      $fn$jscomp$18$$ && ($fn$jscomp$18$$.call($elem$jscomp$2_focus_element$$), ($elem$jscomp$2_focus_element$$ = document.getElementsByClassName("phone_keyboard")[0]) && $elem$jscomp$2_focus_element$$.focus());
      try {
        navigator.keyboard.lock();
      } catch ($e$jscomp$47$$) {
      }
      this.lock_mouse();
    }
  }
};
$goog$$.exportProperty($V86$$.prototype, "screen_go_fullscreen", $V86$$.prototype.screen_go_fullscreen);
$V86$$.prototype.lock_mouse = function() {
  var $elem$jscomp$3$$ = document.body, $fn$jscomp$19$$ = $elem$jscomp$3$$.requestPointerLock || $elem$jscomp$3$$.mozRequestPointerLock || $elem$jscomp$3$$.webkitRequestPointerLock;
  $fn$jscomp$19$$ && $fn$jscomp$19$$.call($elem$jscomp$3$$);
};
$goog$$.exportProperty($V86$$.prototype, "lock_mouse", $V86$$.prototype.lock_mouse);
$V86$$.prototype.mouse_set_status = function($enabled$jscomp$4$$) {
  this.mouse_adapter && (this.mouse_adapter.emu_enabled = $enabled$jscomp$4$$);
};
$V86$$.prototype.keyboard_set_status = function($enabled$jscomp$5$$) {
  this.keyboard_adapter && (this.keyboard_adapter.emu_enabled = $enabled$jscomp$5$$);
};
$goog$$.exportProperty($V86$$.prototype, "keyboard_set_status", $V86$$.prototype.keyboard_set_status);
$V86$$.prototype.serial0_send = function($data$jscomp$199$$) {
  for (var $i$jscomp$104$$ = 0; $i$jscomp$104$$ < $data$jscomp$199$$.length; $i$jscomp$104$$++) {
    this.bus.send("serial0-input", $data$jscomp$199$$.charCodeAt($i$jscomp$104$$));
  }
};
$goog$$.exportProperty($V86$$.prototype, "serial0_send", $V86$$.prototype.serial0_send);
$V86$$.prototype.serial_send_bytes = function($serial$jscomp$2$$, $data$jscomp$200$$) {
  for (var $i$jscomp$105$$ = 0; $i$jscomp$105$$ < $data$jscomp$200$$.length; $i$jscomp$105$$++) {
    this.bus.send("serial" + $serial$jscomp$2$$ + "-input", $data$jscomp$200$$[$i$jscomp$105$$]);
  }
};
$goog$$.exportProperty($V86$$.prototype, "serial_send_bytes", $V86$$.prototype.serial_send_bytes);
$V86$$.prototype.serial_set_modem_status = function($serial$jscomp$3$$, $status$jscomp$6$$) {
  this.bus.send("serial" + $serial$jscomp$3$$ + "-modem-status-input", $status$jscomp$6$$);
};
$V86$$.prototype.serial_set_carrier_detect = function($serial$jscomp$4$$, $status$jscomp$7$$) {
  this.bus.send("serial" + $serial$jscomp$4$$ + "-carrier-detect-input", $status$jscomp$7$$);
};
$V86$$.prototype.serial_set_ring_indicator = function($serial$jscomp$5$$, $status$jscomp$8$$) {
  this.bus.send("serial" + $serial$jscomp$5$$ + "-ring-indicator-input", $status$jscomp$8$$);
};
$V86$$.prototype.serial_set_data_set_ready = function($serial$jscomp$6$$, $status$jscomp$9$$) {
  this.bus.send("serial" + $serial$jscomp$6$$ + "-data-set-ready-input", $status$jscomp$9$$);
};
$V86$$.prototype.serial_set_clear_to_send = function($serial$jscomp$7$$, $status$jscomp$10$$) {
  this.bus.send("serial" + $serial$jscomp$7$$ + "-clear-to-send-input", $status$jscomp$10$$);
};
$V86$$.prototype.mount_fs = async function($idx$jscomp$2_path$jscomp$6$$, $baseurl$$, $basefs$$) {
  var $file_storage$jscomp$1_newfs$$ = new $MemoryFileStorage$$;
  $baseurl$$ && ($file_storage$jscomp$1_newfs$$ = new $ServerFileStorageWrapper$$($file_storage$jscomp$1_newfs$$, $baseurl$$));
  $file_storage$jscomp$1_newfs$$ = new $FS$$($file_storage$jscomp$1_newfs$$, this.fs9p.qidcounter);
  $baseurl$$ && ($dbg_assert$$("object" === typeof $basefs$$, "Filesystem: basefs must be a JSON object"), $file_storage$jscomp$1_newfs$$.load_from_json($basefs$$));
  $idx$jscomp$2_path$jscomp$6$$ = this.fs9p.Mount($idx$jscomp$2_path$jscomp$6$$, $file_storage$jscomp$1_newfs$$);
  if (-2 === $idx$jscomp$2_path$jscomp$6$$) {
    throw new $FileNotFoundError$$;
  }
  if (-17 === $idx$jscomp$2_path$jscomp$6$$) {
    throw new $FileExistsError$$;
  }
  if (0 > $idx$jscomp$2_path$jscomp$6$$) {
    throw $dbg_assert$$(!1, "Unexpected error code: " + -$idx$jscomp$2_path$jscomp$6$$), Error("Failed to mount. Error number: " + -$idx$jscomp$2_path$jscomp$6$$);
  }
};
$goog$$.exportProperty($V86$$.prototype, "mount_fs", $V86$$.prototype.mount_fs);
$V86$$.prototype.create_file = async function($file$jscomp$5$$, $data$jscomp$201$$) {
  $dbg_assert$$(2 === arguments.length);
  var $fs$jscomp$1$$ = this.fs9p;
  if ($fs$jscomp$1$$) {
    var $filename$jscomp$7_parts$jscomp$4$$ = $file$jscomp$5$$.split("/");
    $filename$jscomp$7_parts$jscomp$4$$ = $filename$jscomp$7_parts$jscomp$4$$[$filename$jscomp$7_parts$jscomp$4$$.length - 1];
    var $parent_id$$ = $fs$jscomp$1$$.SearchPath($file$jscomp$5$$).parentid;
    if ("" !== $filename$jscomp$7_parts$jscomp$4$$ && -1 !== $parent_id$$) {
      await $fs$jscomp$1$$.CreateBinaryFile($filename$jscomp$7_parts$jscomp$4$$, $parent_id$$, $data$jscomp$201$$);
    } else {
      return Promise.reject(new $FileNotFoundError$$);
    }
  }
};
$goog$$.exportProperty($V86$$.prototype, "create_file", $V86$$.prototype.create_file);
$V86$$.prototype.read_file = async function($file$jscomp$6$$) {
  $dbg_assert$$(1 === arguments.length);
  var $fs$jscomp$2_result$jscomp$19$$ = this.fs9p;
  if ($fs$jscomp$2_result$jscomp$19$$) {
    return ($fs$jscomp$2_result$jscomp$19$$ = await $fs$jscomp$2_result$jscomp$19$$.read_file($file$jscomp$6$$)) ? $fs$jscomp$2_result$jscomp$19$$ : Promise.reject(new $FileNotFoundError$$);
  }
};
$goog$$.exportProperty($V86$$.prototype, "read_file", $V86$$.prototype.read_file);
$V86$$.prototype.automatically = function($steps$jscomp$1$$) {
  const $run$$ = $steps$jscomp$2$$ => {
    const $step$$ = $steps$jscomp$2$$[0];
    if ($step$$) {
      var $remaining_steps$$ = $steps$jscomp$2$$.slice(1);
      $step$$.sleep ? setTimeout(() => $run$$($remaining_steps$$), 1000 * $step$$.sleep) : $step$$.vga_text ? this.wait_until_vga_screen_contains($step$$.vga_text).then(() => $run$$($remaining_steps$$)) : $step$$.keyboard_send ? ($step$$.keyboard_send instanceof Array ? this.keyboard_send_scancodes($step$$.keyboard_send) : ($dbg_assert$$("string" === typeof $step$$.keyboard_send), this.keyboard_send_text($step$$.keyboard_send)), $run$$($remaining_steps$$)) : $step$$.call ? ($step$$.call(), $run$$($remaining_steps$$)) : 
      $dbg_assert$$(!1, $step$$);
    }
  };
  $run$$($steps$jscomp$1$$);
};
$V86$$.prototype.wait_until_vga_screen_contains = function($text$jscomp$11$$) {
  return new Promise($resolve$jscomp$3$$ => {
    function $test_line$$($line$jscomp$9$$) {
      return "string" === typeof $text$jscomp$11$$ ? $line$jscomp$9$$.includes($text$jscomp$11$$) : $text$jscomp$11$$.test($line$jscomp$9$$);
    }
    function $put_char$$($args$jscomp$10_col$jscomp$11$$) {
      [, $args$jscomp$10_col$jscomp$11$$] = $args$jscomp$10_col$jscomp$11$$;
      $changed_rows$jscomp$1$$.add($args$jscomp$10_col$jscomp$11$$);
    }
    for (const $line$jscomp$10$$ of this.screen_adapter.get_text_screen()) {
      if ($test_line$$($line$jscomp$10$$)) {
        $resolve$jscomp$3$$(!0);
        return;
      }
    }
    const $changed_rows$jscomp$1$$ = new Set, $check$$ = () => {
      for (const $row$jscomp$15$$ of $changed_rows$jscomp$1$$) {
        const $line$jscomp$11$$ = this.screen_adapter.get_text_row($row$jscomp$15$$);
        if ($test_line$$($line$jscomp$11$$)) {
          this.remove_listener("screen-put-char", $put_char$$);
          $resolve$jscomp$3$$();
          return;
        }
      }
      $changed_rows$jscomp$1$$.clear();
      setTimeout($check$$, 100);
    };
    $check$$();
    this.add_listener("screen-put-char", $put_char$$);
  });
};
$V86$$.prototype.read_memory = function($offset$jscomp$64$$, $length$jscomp$28$$) {
  return this.v86.cpu.read_blob($offset$jscomp$64$$, $length$jscomp$28$$);
};
$V86$$.prototype.write_memory = function($blob$jscomp$19$$, $offset$jscomp$65$$) {
  this.v86.cpu.write_blob($blob$jscomp$19$$, $offset$jscomp$65$$);
};
$V86$$.prototype.set_serial_container_xtermjs = function($element$jscomp$10$$) {
  this.serial_adapter && this.serial_adapter.destroy && this.serial_adapter.destroy();
  this.serial_adapter = new $SerialAdapterXtermJS$$($element$jscomp$10$$, this.bus);
  this.serial_adapter.show();
};
function $FileExistsError$$($message$jscomp$32$$) {
  this.message = $message$jscomp$32$$ || "File already exists";
}
$FileExistsError$$.prototype = Error.prototype;
function $FileNotFoundError$$($message$jscomp$33$$) {
  this.message = $message$jscomp$33$$ || "File not found";
}
$FileNotFoundError$$.prototype = Error.prototype;
"undefined" !== typeof module && "undefined" !== typeof module.exports ? module.exports.V86 = $V86$$ : "undefined" !== typeof window ? window.V86 = $V86$$ : "function" === typeof importScripts && (self.V86 = $V86$$);
var $WorkerBus$$ = {Connector:function($pair$$) {
  this.listeners = {};
  this.pair = $pair$$;
  $pair$$.addEventListener("message", function($data$jscomp$202_e$jscomp$48$$) {
    $data$jscomp$202_e$jscomp$48$$ = $data$jscomp$202_e$jscomp$48$$.data;
    for (var $listeners$jscomp$3$$ = this.listeners[$data$jscomp$202_e$jscomp$48$$[0]], $i$jscomp$106$$ = 0; $i$jscomp$106$$ < $listeners$jscomp$3$$.length; $i$jscomp$106$$++) {
      var $listener$jscomp$68$$ = $listeners$jscomp$3$$[$i$jscomp$106$$];
      $listener$jscomp$68$$.fn.call($listener$jscomp$68$$.this_value, $data$jscomp$202_e$jscomp$48$$[1]);
    }
  }.bind(this), !1);
}};
$WorkerBus$$.Connector.prototype.register = function($name$jscomp$92$$, $fn$jscomp$20$$, $this_value$jscomp$2$$) {
  var $listeners$jscomp$4$$ = this.listeners[$name$jscomp$92$$];
  void 0 === $listeners$jscomp$4$$ && ($listeners$jscomp$4$$ = this.listeners[$name$jscomp$92$$] = []);
  $listeners$jscomp$4$$.push({fn:$fn$jscomp$20$$, this_value:$this_value$jscomp$2$$, });
};
$WorkerBus$$.Connector.prototype.send = function($name$jscomp$93$$, $value$jscomp$198$$, $transfer_list$$) {
  $dbg_assert$$(1 <= arguments.length);
  this.pair && this.pair.postMessage([$name$jscomp$93$$, $value$jscomp$198$$], $transfer_list$$);
};
$WorkerBus$$.init = function($worker$$) {
  return new $WorkerBus$$.Connector($worker$$);
};
function $DummyScreenAdapter$$() {
  var $text_mode_data$jscomp$1$$, $text_mode_width$jscomp$1$$ = 0, $text_mode_height$jscomp$1$$ = 0;
  this.put_char = function($row$jscomp$16$$, $col$jscomp$12$$, $chr$jscomp$11$$) {
    $dbg_assert$$(0 <= $row$jscomp$16$$ && $row$jscomp$16$$ < $text_mode_height$jscomp$1$$);
    $dbg_assert$$(0 <= $col$jscomp$12$$ && $col$jscomp$12$$ < $text_mode_width$jscomp$1$$);
    $text_mode_data$jscomp$1$$[$row$jscomp$16$$ * $text_mode_width$jscomp$1$$ + $col$jscomp$12$$] = $chr$jscomp$11$$;
  };
  this.destroy = function() {
  };
  this.pause = function() {
  };
  this.continue = function() {
  };
  this.set_mode = function() {
  };
  this.clear_screen = function() {
  };
  this.set_size_text = function($cols$jscomp$2$$, $rows$jscomp$2$$) {
    if ($cols$jscomp$2$$ !== $text_mode_width$jscomp$1$$ || $rows$jscomp$2$$ !== $text_mode_height$jscomp$1$$) {
      $text_mode_data$jscomp$1$$ = new Uint8Array($cols$jscomp$2$$ * $rows$jscomp$2$$), $text_mode_width$jscomp$1$$ = $cols$jscomp$2$$, $text_mode_height$jscomp$1$$ = $rows$jscomp$2$$;
    }
  };
  this.set_size_graphical = function() {
  };
  this.set_scale = function() {
  };
  this.update_cursor_scanline = function() {
  };
  this.update_cursor = function() {
  };
  this.update_buffer = function() {
  };
  this.get_text_screen = function() {
    for (var $screen$jscomp$3$$ = [], $i$jscomp$107$$ = 0; $i$jscomp$107$$ < $text_mode_height$jscomp$1$$; $i$jscomp$107$$++) {
      $screen$jscomp$3$$.push(this.get_text_row($i$jscomp$107$$));
    }
    return $screen$jscomp$3$$;
  };
  this.get_text_row = function($i$jscomp$108_offset$jscomp$66$$) {
    $i$jscomp$108_offset$jscomp$66$$ *= $text_mode_width$jscomp$1$$;
    return String.fromCharCode.apply(String, $text_mode_data$jscomp$1$$.subarray($i$jscomp$108_offset$jscomp$66$$, $i$jscomp$108_offset$jscomp$66$$ + $text_mode_width$jscomp$1$$));
  };
  this.set_size_text(80, 25);
}
;const $UNIX_EPOCH$$ = (new Date("1970-01-01T00:00:00Z")).getTime(), $NTP_EPOCH$$ = (new Date("1900-01-01T00:00:00Z")).getTime(), $NTP_EPOC_DIFF$$ = $UNIX_EPOCH$$ - $NTP_EPOCH$$, $TWO_TO_32$$ = Math.pow(2, 32), $V86_ASCII$$ = [118, 56, 54];
function $a2ethaddr$$($bytes$jscomp$6$$) {
  return [0, 1, 2, 3, 4, 5].map($i$jscomp$109$$ => $bytes$jscomp$6$$[$i$jscomp$109$$].toString(16)).map($x$jscomp$110$$ => 1 === $x$jscomp$110$$.length ? "0" + $x$jscomp$110$$ : $x$jscomp$110$$).join(":");
}
function $iptolong$$($parts$jscomp$6$$) {
  return $parts$jscomp$6$$[0] << 24 | $parts$jscomp$6$$[1] << 16 | $parts$jscomp$6$$[2] << 8 | $parts$jscomp$6$$[3];
}
function $handle_fake_ntp$$($packet$jscomp$4$$, $adapter$jscomp$2$$) {
  let $now_n$$ = Date.now() + $NTP_EPOC_DIFF$$, $now_n_f$$ = $now_n$$ % 1000 / 1000 * $TWO_TO_32$$, $reply$jscomp$2$$ = {};
  $reply$jscomp$2$$.eth = {ethertype:2048, src:$adapter$jscomp$2$$.router_mac, dest:$packet$jscomp$4$$.eth.src};
  $reply$jscomp$2$$.ipv4 = {proto:17, src:$packet$jscomp$4$$.ipv4.dest, dest:$packet$jscomp$4$$.ipv4.src, };
  $reply$jscomp$2$$.udp = {sport:123, dport:$packet$jscomp$4$$.udp.sport};
  $reply$jscomp$2$$.ntp = Object.assign({}, $packet$jscomp$4$$.ntp);
  $reply$jscomp$2$$.ntp.flags = 36;
  $reply$jscomp$2$$.ntp.poll = 10;
  $reply$jscomp$2$$.ntp.ori_ts_i = $packet$jscomp$4$$.ntp.trans_ts_i;
  $reply$jscomp$2$$.ntp.ori_ts_f = $packet$jscomp$4$$.ntp.trans_ts_f;
  $reply$jscomp$2$$.ntp.rec_ts_i = $now_n$$ / 1000;
  $reply$jscomp$2$$.ntp.rec_ts_f = $now_n_f$$;
  $reply$jscomp$2$$.ntp.trans_ts_i = $now_n$$ / 1000;
  $reply$jscomp$2$$.ntp.trans_ts_f = $now_n_f$$;
  $reply$jscomp$2$$.ntp.stratum = 2;
  $adapter$jscomp$2$$.receive($make_packet$$($reply$jscomp$2$$));
  return !0;
}
function $handle_fake_dhcp$$($packet$jscomp$5_router_ip$$, $adapter$jscomp$3$$) {
  let $reply$jscomp$3$$ = {};
  $reply$jscomp$3$$.eth = {ethertype:2048, src:$adapter$jscomp$3$$.router_mac, dest:$packet$jscomp$5_router_ip$$.eth.src};
  $reply$jscomp$3$$.ipv4 = {proto:17, src:$adapter$jscomp$3$$.router_ip, dest:$adapter$jscomp$3$$.vm_ip, };
  $reply$jscomp$3$$.udp = {sport:67, dport:68, };
  $reply$jscomp$3$$.dhcp = {htype:1, hlen:6, hops:0, xid:$packet$jscomp$5_router_ip$$.dhcp.xid, secs:0, flags:0, ciaddr:0, yiaddr:$iptolong$$($adapter$jscomp$3$$.vm_ip), siaddr:$iptolong$$($adapter$jscomp$3$$.router_ip), giaddr:$iptolong$$($adapter$jscomp$3$$.router_ip), chaddr:$packet$jscomp$5_router_ip$$.dhcp.chaddr, };
  let $options$jscomp$46$$ = [], $fix$$ = $packet$jscomp$5_router_ip$$.dhcp.options.find(function($x$jscomp$112$$) {
    return 53 === $x$jscomp$112$$[0];
  });
  $fix$$ && 3 === $fix$$[2] && ($packet$jscomp$5_router_ip$$.dhcp.op = 3);
  1 === $packet$jscomp$5_router_ip$$.dhcp.op && ($reply$jscomp$3$$.dhcp.op = 2, $options$jscomp$46$$.push(new Uint8Array([53, 1, 2])));
  3 === $packet$jscomp$5_router_ip$$.dhcp.op && ($reply$jscomp$3$$.dhcp.op = 2, $options$jscomp$46$$.push(new Uint8Array([53, 1, 5])), $options$jscomp$46$$.push(new Uint8Array([51, 4, 8, 0, 0, 0])));
  $packet$jscomp$5_router_ip$$ = [$adapter$jscomp$3$$.router_ip[0], $adapter$jscomp$3$$.router_ip[1], $adapter$jscomp$3$$.router_ip[2], $adapter$jscomp$3$$.router_ip[3]];
  $options$jscomp$46$$.push(new Uint8Array([1, 4, 255, 255, 255, 0]));
  $adapter$jscomp$3$$.masquerade && ($options$jscomp$46$$.push(new Uint8Array([3, 4].concat($packet$jscomp$5_router_ip$$))), $options$jscomp$46$$.push(new Uint8Array([6, 4].concat($packet$jscomp$5_router_ip$$))));
  $options$jscomp$46$$.push(new Uint8Array([54, 4].concat($packet$jscomp$5_router_ip$$)));
  $options$jscomp$46$$.push(new Uint8Array([60, 3].concat($V86_ASCII$$)));
  $options$jscomp$46$$.push(new Uint8Array([255, 0]));
  $reply$jscomp$3$$.dhcp.options = $options$jscomp$46$$;
  $adapter$jscomp$3$$.receive($make_packet$$($reply$jscomp$3$$));
}
function $parse_eth$$($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$, $o$jscomp$1$$) {
  var $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ = (new DataView($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.buffer, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteOffset, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteLength)).getUint16(12), 
  $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$ = {ethertype:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$, dest:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(0, 6), dest_s:$a2ethaddr$$($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(0, 
  6)), src:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(6, 12), src_s:$a2ethaddr$$($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(6, 12)), };
  $o$jscomp$1$$.eth = $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$;
  $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$ = $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(14, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.length);
  if (2048 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$) {
    var $ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$ = new DataView($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.buffer, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteOffset, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteLength), $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ = 
    $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$[0] >> 4 & 15;
    $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$ = $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$[0] & 15;
    var $start$jscomp$inline_204_tos$jscomp$inline_79$$ = $ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$.getUint8(1);
    $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$ = $ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$.getUint16(2);
    var $len$jscomp$inline_205_ttl$jscomp$inline_81$$ = $ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$.getUint8(8);
    $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ = $ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$.getUint8(9);
    $ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$ = $ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$.getUint16(10);
    $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ = {version:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$, ihl:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$, tos:$start$jscomp$inline_204_tos$jscomp$inline_79$$, len:$data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$, 
    ttl:$len$jscomp$inline_205_ttl$jscomp$inline_81$$, proto:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$, ip_checksum:$ip_checksum$jscomp$inline_83_view$jscomp$inline_76$$, src:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(12, 16), dest:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(16, 
    20), };
    Math.max($data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$, 46) !== $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.length && $dbg_log$$(`ipv4 Length mismatch: ${$data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$} != ${$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.length}`, 
    16777216);
    $o$jscomp$1$$.ipv4 = $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$;
    $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$ = $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(4 * $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$, $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$);
    1 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ && ($data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$ = $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$, $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$ = 
    new DataView($data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.buffer, $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.byteOffset, $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.byteLength), $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$ = 
    {type:$data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.getUint8(0), code:$data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.getUint8(1), checksum:$data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.getUint16(2), data:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.subarray(4)}, 
    $o$jscomp$1$$.icmp = $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$);
    6 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ && ($data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$ = $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$, $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ = 
    new DataView($data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.buffer, $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.byteOffset, $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.byteLength), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$ = 
    {sport:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint16(0), dport:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint16(2), seq:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint32(4), ackn:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint32(8), 
    doff:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint8(12) >> 4, winsize:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint16(14), checksum:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint16(16), urgent:$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint16(18), 
    }, $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ = $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$.getUint8(13), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.fin = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 
    1), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.syn = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 2), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.rst = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 
    4), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.psh = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 8), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.ack = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 
    16), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.urg = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 32), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.ece = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 
    64), $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.cwr = !!($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ & 128), $o$jscomp$1$$.tcp = $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$, $o$jscomp$1$$.tcp_data = $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.subarray(4 * 
    $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.doff));
    if (17 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$) {
      $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ = new DataView($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.buffer, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteOffset, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteLength);
      $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ = {sport:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.getUint16(0), dport:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.getUint16(2), len:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.getUint16(4), 
      checksum:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.getUint16(6), data:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(8), data_s:(new TextDecoder).decode($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(8))};
      if (67 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.dport || 67 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.sport) {
        var $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$ = $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(8);
        $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$ = new DataView($data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.buffer, $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.byteOffset, $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.byteLength);
        $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.subarray(44, 236);
        $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$ = {op:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint8(0), htype:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint8(1), hlen:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint8(2), 
        hops:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint8(3), xid:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint32(4), secs:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint16(8), flags:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint16(10), 
        ciaddr:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint32(12), yiaddr:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint32(16), siaddr:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint32(20), 
        giaddr:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint32(24), chaddr:$data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.subarray(28, 44), magic:$data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.getUint32(236), options:[], };
        $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$ = $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.subarray(240);
        for ($flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ = 0; $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ < $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.length; ++$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$) {
          $start$jscomp$inline_204_tos$jscomp$inline_79$$ = $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$, 0 !== $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$[$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$] && (++$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$, 
          $len$jscomp$inline_205_ttl$jscomp$inline_81$$ = $data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$[$flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$], $flags$jscomp$inline_192_i$jscomp$inline_203_ipv4$jscomp$inline_84_version$jscomp$inline_77_view$jscomp$inline_190$$ += $len$jscomp$inline_205_ttl$jscomp$inline_81$$, $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.options.push($data$jscomp$inline_198_len$jscomp$inline_80_options$jscomp$inline_202_tcp$jscomp$inline_191_view$jscomp$inline_185$$.subarray($start$jscomp$inline_204_tos$jscomp$inline_79$$, 
          $start$jscomp$inline_204_tos$jscomp$inline_79$$ + $len$jscomp$inline_205_ttl$jscomp$inline_81$$ + 2)));
        }
        $o$jscomp$1$$.dhcp = $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$;
        $o$jscomp$1$$.dhcp_options = $data$jscomp$inline_183_data$jscomp$inline_188_dhcp$jscomp$inline_201_eth_icmp$jscomp$inline_186_ihl$jscomp$inline_78_view$jscomp$inline_200$$.options;
      }
      53 !== $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.dport && 53 !== $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.sport || $parse_dns$$($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(8), $o$jscomp$1$$);
      123 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.dport && ($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$ = $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(8), $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$ = 
      new DataView($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.buffer, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteOffset, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteLength), $o$jscomp$1$$.ntp = {flags:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint8(0), 
      stratum:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint8(1), poll:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint8(2), precision:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint8(3), root_delay:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(4), 
      root_disp:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(8), ref_id:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(12), ref_ts_i:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(16), ref_ts_f:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(20), 
      ori_ts_i:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(24), ori_ts_f:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(28), rec_ts_i:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(32), rec_ts_f:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(36), 
      trans_ts_i:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(40), trans_ts_f:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.getUint32(44), });
      $o$jscomp$1$$.udp = $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$;
    }
  } else {
    2054 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ ? ($arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ = new DataView($data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.buffer, $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteOffset, 
    $data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.byteLength), $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ = {htype:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.getUint16(0), ptype:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.getUint16(2), 
    oper:$arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$.getUint16(6), sha:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(8, 14), spa:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(14, 18), tha:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(18, 
    24), tpa:$data$jscomp$204_data$jscomp$inline_194_data$jscomp$inline_199_ipdata$jscomp$inline_85_payload_view$jscomp$inline_206$$.subarray(24, 28), }, $o$jscomp$1$$.arp = $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$) : 34525 === $arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$ ? $dbg_log$$("Unimplemented: ipv6") : $dbg_log$$("Unknown ethertype: " + 
    $h$$($arp$jscomp$inline_92_ethertype$jscomp$2_proto$jscomp$inline_82_udp$jscomp$inline_197_view$jscomp$inline_196_view$jscomp$inline_89$$), 16777216);
  }
}
function $parse_dns$$($data$jscomp$214$$, $o$jscomp$6$$) {
  function $read_dstr$$() {
    let $o$jscomp$7$$ = [], $len$jscomp$26$$;
    do {
      $len$jscomp$26$$ = $view$jscomp$22$$.getUint8($offset$jscomp$67$$), $o$jscomp$7$$.push((new TextDecoder).decode($data$jscomp$214$$.subarray($offset$jscomp$67$$ + 1, $offset$jscomp$67$$ + 1 + $len$jscomp$26$$))), $offset$jscomp$67$$ += $len$jscomp$26$$ + 1;
    } while (0 < $len$jscomp$26$$);
    return $o$jscomp$7$$;
  }
  let $view$jscomp$22$$ = new DataView($data$jscomp$214$$.buffer, $data$jscomp$214$$.byteOffset, $data$jscomp$214$$.byteLength), $dns$$ = {id:$view$jscomp$22$$.getUint16(0), flags:$view$jscomp$22$$.getUint16(2), questions:[], answers:[]};
  var $i$jscomp$122_qdcount$$ = $view$jscomp$22$$.getUint16(4);
  let $ancount$$ = $view$jscomp$22$$.getUint16(6);
  $view$jscomp$22$$.getUint16(8);
  $view$jscomp$22$$.getUint16(10);
  let $offset$jscomp$67$$ = 12;
  for (var $ans_i$jscomp$121$$ = 0; $ans_i$jscomp$121$$ < $i$jscomp$122_qdcount$$; $ans_i$jscomp$121$$++) {
    $dns$$.questions.push({name:$read_dstr$$(), type:$view$jscomp$22$$.getInt16($offset$jscomp$67$$), class:$view$jscomp$22$$.getInt16($offset$jscomp$67$$ + 2)}), $offset$jscomp$67$$ += 4;
  }
  for ($i$jscomp$122_qdcount$$ = 0; $i$jscomp$122_qdcount$$ < $ancount$$; $i$jscomp$122_qdcount$$++) {
    $ans_i$jscomp$121$$ = {name:$read_dstr$$(), type:$view$jscomp$22$$.getInt16($offset$jscomp$67$$), class:$view$jscomp$22$$.getUint16($offset$jscomp$67$$ + 2), ttl:$view$jscomp$22$$.getUint32($offset$jscomp$67$$ + 4)};
    $offset$jscomp$67$$ += 8;
    let $rdlen$$ = $view$jscomp$22$$.getUint16($offset$jscomp$67$$);
    $offset$jscomp$67$$ += 2;
    $ans_i$jscomp$121$$.data = $data$jscomp$214$$.subarray($offset$jscomp$67$$, $offset$jscomp$67$$ + $rdlen$$);
    $offset$jscomp$67$$ += $rdlen$$;
    $dns$$.answers.push($ans_i$jscomp$121$$);
  }
  $o$jscomp$6$$.dns = $dns$$;
}
function $make_packet$$($checksum$jscomp$inline_227_spec$jscomp$9$$) {
  let $bytes$jscomp$7$$ = new Uint8Array(1518);
  $dbg_assert$$($checksum$jscomp$inline_227_spec$jscomp$9$$.eth);
  var $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$ = new DataView($bytes$jscomp$7$$.buffer, $bytes$jscomp$7$$.byteOffset, $bytes$jscomp$7$$.byteLength);
  $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$.setUint16(12, $checksum$jscomp$inline_227_spec$jscomp$9$$.eth.ethertype);
  for ($data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$ = 0; 6 > $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$; ++$data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$) {
    $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$.setUint8(0 + $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.eth.dest[$data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$]);
  }
  for ($data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$ = 0; 6 > $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$; ++$data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$) {
    $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$.setUint8(6 + $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.eth.src[$data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$]);
  }
  $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$ = 14;
  if ($checksum$jscomp$inline_227_spec$jscomp$9$$.arp) {
    var $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$ = $bytes$jscomp$7$$.subarray(14);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$ = new DataView($data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.buffer, $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.byteOffset, $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.byteLength);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint16(0, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.htype);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint16(2, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.ptype);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(4, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.sha.length);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(5, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.spa.length);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint16(6, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.oper);
    for ($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = 0; 6 > $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$; ++$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$) {
      $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(8 + $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.sha[$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$]), 
      $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(18 + $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.tha[$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$]);
    }
    for ($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = 0; 4 > $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$; ++$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$) {
      $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(14 + $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.spa[$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$]), 
      $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(24 + $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.arp.tpa[$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$]);
    }
    $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$ += 28;
  }
  if ($checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4) {
    var $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = $bytes$jscomp$7$$.subarray(14);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$ = new DataView($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.buffer, $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.byteOffset, $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.byteLength);
    $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ = 20;
    if ($checksum$jscomp$inline_227_spec$jscomp$9$$.icmp) {
      var $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ = $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$, $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$ = $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.subarray(20);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$ = new DataView($data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.buffer, $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.byteOffset, $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.byteLength);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint8(0, $checksum$jscomp$inline_227_spec$jscomp$9$$.icmp.type);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint8(1, $checksum$jscomp$inline_227_spec$jscomp$9$$.icmp.code);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint16(2, 0);
      for ($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ = 0; $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ < $checksum$jscomp$inline_227_spec$jscomp$9$$.icmp.data.length; ++$checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$) {
        $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint8($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ + 4, $checksum$jscomp$inline_227_spec$jscomp$9$$.icmp.data[$checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$]);
      }
      $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ = 0;
      for (var $i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$ = 0; $i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$ < 4 + $checksum$jscomp$inline_227_spec$jscomp$9$$.icmp.data.length; $i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$ += 2) {
        $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.getUint16($i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$), 65535 < $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ && ($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ = 
        ($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ & 65535) + 1);
      }
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint16(2, $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ ^ 65535);
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ += 4 + $checksum$jscomp$inline_227_spec$jscomp$9$$.icmp.data.length;
    }
    if ($checksum$jscomp$inline_227_spec$jscomp$9$$.udp) {
      var $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ = $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.subarray(20);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$ = new DataView($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$.buffer, $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$.byteOffset, $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$.byteLength);
      if ($checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp) {
        var $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$.subarray(8);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = new DataView($JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.buffer, $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.byteOffset, 
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.byteLength);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(0, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.op);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(1, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.htype);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(2, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.hlen);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(3, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.hops);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(4, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.xid);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint16(8, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.secs);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint16(10, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.flags);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(12, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.ciaddr);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(16, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.yiaddr);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(20, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.siaddr);
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(24, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.giaddr);
        for ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = 0; $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ < $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.chaddr.length; ++$a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$) {
          $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(28 + $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.chaddr[$a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$]);
        }
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(236, 1669485411);
        $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = 240;
        for ($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ of $checksum$jscomp$inline_227_spec$jscomp$9$$.dhcp.options) {
          for ($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ = 0; $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ < $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.length; ++$checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$) {
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$[$checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$]), 
            ++$a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$;
          }
        }
        $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$;
      } else {
        if ($checksum$jscomp$inline_227_spec$jscomp$9$$.dns) {
          var $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$.subarray(8);
          $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = new DataView($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.buffer, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.byteOffset, 
          $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.byteLength);
          $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16(0, $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.id);
          $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16(2, $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.flags);
          $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16(4, $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.questions.length);
          $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16(6, $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.answers.length);
          $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ = 12;
          for ($i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$ = 0; $i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$ < $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.questions.length; ++$i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$) {
            var $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$ = $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.questions[$i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$];
            for ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ of $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$.name) {
              $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint8($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.length);
              $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$++;
              for (let $ii$jscomp$inline_286$$ = 0; $ii$jscomp$inline_286$$ < $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.length; ++$ii$jscomp$inline_286$$) {
                $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint8($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.charCodeAt($ii$jscomp$inline_286$$)), 
                $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$++;
              }
            }
            $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$.type);
            $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += 2;
            $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$.class);
            $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += 2;
          }
          for ($i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$ = 0; $i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$ < $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.answers.length; ++$i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$) {
            var $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = $checksum$jscomp$inline_227_spec$jscomp$9$$.dns.answers[$i$jscomp$inline_231_i$jscomp$inline_283_i$jscomp$inline_287$$];
            for ($JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ of $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.name) {
              for ($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint8($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.length), 
              $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$++, $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$ = 0; $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$ < $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.length; ++$ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$) {
                $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint8($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.charCodeAt($ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$)), 
                $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$++;
              }
            }
            $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.type);
            $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += 2;
            $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.class);
            $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += 2;
            $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint32($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.ttl);
            $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += 4;
            $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint16($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.data.length);
            $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += 2;
            for ($ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$ = 0; $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$ < $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.data.length; ++$ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$) {
              $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.setUint8($checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ + $ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.data[$ii$jscomp$inline_289_ii$jscomp$inline_290_q$jscomp$inline_284$$]);
            }
            $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$ += $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.data.length;
          }
          $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$;
        } else {
          if ($checksum$jscomp$inline_227_spec$jscomp$9$$.ntp) {
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = $checksum$jscomp$inline_229_data$jscomp$inline_223_i$jscomp$inline_230_i$jscomp$inline_276_offset$jscomp$inline_281$$.subarray(8), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = 
            new DataView($JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.buffer, $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.byteOffset, $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.byteLength), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(0, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.flags), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(1, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.stratum), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(2, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.poll), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint8(3, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.precision), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(4, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.root_delay), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(8, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.root_disp), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(12, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.ref_id), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(16, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.ref_ts_i), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(20, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.ref_ts_f), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(24, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.ori_ts_i), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(28, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.ori_ts_f), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(32, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.rec_ts_i), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(36, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.rec_ts_f), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(40, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.trans_ts_i), 
            $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$.setUint32(44, $checksum$jscomp$inline_227_spec$jscomp$9$$.ntp.trans_ts_f), $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = 48;
          } else {
            for ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = $checksum$jscomp$inline_227_spec$jscomp$9$$.udp.data, $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.length, 
            $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = 0; $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ < $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$.length; ++$data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$) {
              $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint8(8 + $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$[$data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$]);
            }
          }
        }
      }
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint16(0, $checksum$jscomp$inline_227_spec$jscomp$9$$.udp.sport);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint16(2, $checksum$jscomp$inline_227_spec$jscomp$9$$.udp.dport);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint16(4, 8 + $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$);
      $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$.setUint16(6, 0);
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ += 8 + $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$;
    }
    if ($checksum$jscomp$inline_227_spec$jscomp$9$$.tcp) {
      $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ = $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$;
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.subarray(20);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = new DataView($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.buffer, $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.byteOffset, 
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.byteLength);
      $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = 0;
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp;
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.fin && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 1);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.syn && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 2);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.rst && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 4);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.psh && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 8);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.ack && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 16);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.urg && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 32);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.ece && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 64);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.cwr && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ |= 128);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint16(0, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.sport);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint16(2, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.dport);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint32(4, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.seq);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint32(8, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.ackn);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint8(12, 80);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint8(13, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint16(14, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.winsize);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint16(16, 0);
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint16(18, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$.urgent || 0);
      $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = 20 + ($checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data ? $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data.length : 0);
      $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = 0;
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ = new Uint8Array(12);
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ = new DataView($JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.buffer, $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.byteOffset, 
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.byteLength);
      for ($data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$ = 0; 4 > $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$; ++$data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$) {
        $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.setUint8($data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.src[$data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$]), $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.setUint8(4 + 
        $data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.dest[$data$jscomp$inline_220_i$jscomp$inline_243_view$jscomp$inline_228_view$jscomp$inline_232$$]);
      }
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.setUint8(9, 6);
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.setUint16(10, $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$);
      for ($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = 0; 6 > $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$; ++$data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$) {
        $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ += $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$.getUint16($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ << 
        1), 65535 < $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ & 
        65535) + 1);
      }
      for ($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = 0; 10 > $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$; ++$data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$) {
        $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ += $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.getUint16($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ << 
        1), 65535 < $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ & 
        65535) + 1);
      }
      if ($checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data) {
        for ($data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ = 0; $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ < $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data.length; $data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ += 
        2) {
          $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ += $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data[$data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$] << 8 | $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data[$data$jscomp$inline_279_i$jscomp$inline_235_i$jscomp$inline_244_i$jscomp$inline_245_i$jscomp$inline_246_o$jscomp$inline_275_tcp$jscomp$inline_238_total_len$jscomp$inline_239_view$jscomp$inline_280$$ + 
          1], 65535 < $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ && ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ = ($a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ & 
          65535) + 1);
        }
      }
      $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$.setUint16(16, $a$jscomp$inline_282_checksum$jscomp$inline_240_flags$jscomp$inline_237_i$jscomp$inline_274_offset$jscomp$inline_273_raw_data$jscomp$inline_234_s$jscomp$inline_285$$ ^ 65535);
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ = $JSCompiler_temp_const$jscomp$inline_224_data$jscomp$inline_271_data$jscomp$inline_293_payload_length$jscomp$inline_233_s$jscomp$inline_288_view$jscomp$inline_272_view$jscomp$inline_294$$ + 20;
    }
    if ($checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data) {
      for ($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = 0; $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ < $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data.length; ++$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$) {
        $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8($JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ + $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data[$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$]);
      }
      $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$ += $checksum$jscomp$inline_227_spec$jscomp$9$$.tcp_data.length;
    }
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(0, 69);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(1, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.tos || 0);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint16(2, $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint16(4, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.id || 0);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(6, 64);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(8, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.ttl || 32);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(9, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.proto);
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint16(10, 0);
    for ($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = 0; 4 > $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$; ++$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$) {
      $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(12 + $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.src[$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$]), 
      $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint8(16 + $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$, $checksum$jscomp$inline_227_spec$jscomp$9$$.ipv4.dest[$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$]);
    }
    $checksum$jscomp$inline_227_spec$jscomp$9$$ = 0;
    for ($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ = 0; 10 > $data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$; ++$data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$) {
      $checksum$jscomp$inline_227_spec$jscomp$9$$ += $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.getUint16($data$jscomp$inline_215_data$jscomp$inline_226_i$jscomp$inline_211_i$jscomp$inline_212_i$jscomp$inline_247_i$jscomp$inline_248_i$jscomp$inline_249_view$jscomp$inline_236$$ << 1), 65535 < $checksum$jscomp$inline_227_spec$jscomp$9$$ && ($checksum$jscomp$inline_227_spec$jscomp$9$$ = ($checksum$jscomp$inline_227_spec$jscomp$9$$ & 
      65535) + 1);
    }
    $data$jscomp$inline_209_i$jscomp$inline_147_i$jscomp$inline_148_view$jscomp$inline_210_view$jscomp$inline_216$$.setUint16(10, $checksum$jscomp$inline_227_spec$jscomp$9$$ ^ 65535);
    $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$ += $JSCompiler_temp_const$jscomp$inline_218_JSCompiler_temp_const$jscomp$inline_221_len$jscomp$inline_217_phview$jscomp$inline_242_psudo_header$jscomp$inline_241$$;
  }
  return $bytes$jscomp$7$$.subarray(0, $JSCompiler_temp_const$jscomp$160_JSCompiler_temp_const$jscomp$163_len$jscomp$inline_146_view$jscomp$inline_145$$);
}
function $fake_tcp_connect$$($dport$$, $adapter$jscomp$5$$) {
  let $sport$$ = 49152 + Math.floor(1000 * Math.random()), $tuple$jscomp$1$$ = [$adapter$jscomp$5$$.vm_ip.join("."), $dport$$, $adapter$jscomp$5$$.router_ip.join("."), $sport$$].join(":"), $reader$$, $connector$$, $conn$$ = new $TCPConnection$$;
  $conn$$.net = $adapter$jscomp$5$$;
  $conn$$.on_data = function($data$jscomp$222$$) {
    $reader$$ && $reader$$.call($handle$jscomp$13$$, $data$jscomp$222$$);
  };
  $conn$$.on_connect = function() {
    $connector$$ && $connector$$.call($handle$jscomp$13$$);
  };
  $conn$$.tuple = $tuple$jscomp$1$$;
  $conn$$.hsrc = $adapter$jscomp$5$$.router_mac;
  $conn$$.psrc = $adapter$jscomp$5$$.router_ip;
  $conn$$.sport = $sport$$;
  $conn$$.hdest = $adapter$jscomp$5$$.vm_mac;
  $conn$$.dport = $dport$$;
  $conn$$.pdest = $adapter$jscomp$5$$.vm_ip;
  $adapter$jscomp$5$$.tcp_conn[$tuple$jscomp$1$$] = $conn$$;
  $conn$$.connect();
  let $handle$jscomp$13$$ = {write:function($data$jscomp$223$$) {
    $conn$$.write($data$jscomp$223$$);
  }, on:function($event$jscomp$11$$, $cb$jscomp$2$$) {
    "data" === $event$jscomp$11$$ && ($reader$$ = $cb$jscomp$2$$);
    "connect" === $event$jscomp$11$$ && ($connector$$ = $cb$jscomp$2$$);
  }, close:function() {
    $conn$$.close();
  }};
  return $handle$jscomp$13$$;
}
function $TCPConnection$$() {
  this.send_buffer = new Uint8Array([]);
  this.seq_history = [];
}
$TCPConnection$$.prototype.ipv4_reply = function() {
  let $reply$jscomp$4$$ = {};
  $reply$jscomp$4$$.eth = {ethertype:2048, src:this.hsrc, dest:this.hdest};
  $reply$jscomp$4$$.ipv4 = {proto:6, src:this.psrc, dest:this.pdest};
  $reply$jscomp$4$$.tcp = {sport:this.sport, dport:this.dport, winsize:this.winsize, ackn:this.ack, seq:this.seq, ack:!0};
  return $reply$jscomp$4$$;
};
$TCPConnection$$.prototype.connect = function() {
  this.seq = 1338;
  this.ack = 1;
  this.start_seq = 0;
  this.winsize = 64240;
  this.state = "syn-sent";
  let $reply$jscomp$5$$ = this.ipv4_reply();
  $reply$jscomp$5$$.ipv4.id = 2345;
  $reply$jscomp$5$$.tcp = {sport:this.sport, dport:this.dport, seq:1337, ackn:0, winsize:0, syn:!0, };
  this.net.receive($make_packet$$($reply$jscomp$5$$));
};
$TCPConnection$$.prototype.accept = function($packet$jscomp$7$$) {
  this.seq = 1338;
  this.ack = $packet$jscomp$7$$.tcp.seq + 1;
  this.start_seq = $packet$jscomp$7$$.tcp.seq;
  this.hsrc = this.net.router_mac;
  this.psrc = $packet$jscomp$7$$.ipv4.dest;
  this.sport = $packet$jscomp$7$$.tcp.dport;
  this.hdest = $packet$jscomp$7$$.eth.src;
  this.dport = $packet$jscomp$7$$.tcp.sport;
  this.pdest = $packet$jscomp$7$$.ipv4.src;
  this.winsize = $packet$jscomp$7$$.tcp.winsize;
  let $reply$jscomp$6$$ = this.ipv4_reply();
  $reply$jscomp$6$$.tcp = {sport:this.sport, dport:this.dport, seq:1337, ackn:this.ack, winsize:$packet$jscomp$7$$.tcp.winsize, syn:!0, ack:!0};
  this.net.receive($make_packet$$($reply$jscomp$6$$));
};
$TCPConnection$$.prototype.process = function($packet$jscomp$8_reply$jscomp$7$$) {
  if ($packet$jscomp$8_reply$jscomp$7$$.tcp.syn) {
    $dbg_assert$$($packet$jscomp$8_reply$jscomp$7$$.tcp.ack), $dbg_assert$$("syn-sent" === this.state), this.ack = $packet$jscomp$8_reply$jscomp$7$$.tcp.seq + 1, this.start_seq = $packet$jscomp$8_reply$jscomp$7$$.tcp.seq, this.last_received_ackn = $packet$jscomp$8_reply$jscomp$7$$.tcp.ackn, $packet$jscomp$8_reply$jscomp$7$$ = this.ipv4_reply(), this.net.receive($make_packet$$($packet$jscomp$8_reply$jscomp$7$$)), this.state = "established", this.on_connect && this.on_connect.call(this);
  } else {
    if ($packet$jscomp$8_reply$jscomp$7$$.tcp.fin) {
      $dbg_log$$(`All done with ${this.tuple} resetting`, 16777216), this.ack !== $packet$jscomp$8_reply$jscomp$7$$.tcp.seq && ($dbg_log$$("Closing the connecton, but seq was wrong", 16777216), ++this.ack), $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$ = this.ipv4_reply(), $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$.tcp = {sport:$packet$jscomp$8_reply$jscomp$7$$.tcp.dport, dport:$packet$jscomp$8_reply$jscomp$7$$.tcp.sport, seq:this.seq, ackn:this.ack, winsize:$packet$jscomp$8_reply$jscomp$7$$.tcp.winsize, 
      rst:!0, }, delete this.net.tcp_conn[this.tuple], this.net.receive($make_packet$$($nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$));
    } else {
      if (this.ack !== $packet$jscomp$8_reply$jscomp$7$$.tcp.seq) {
        $dbg_log$$(`Packet seq was wrong ex: ${this.ack} ~${this.ack - this.start_seq} pk: ${$packet$jscomp$8_reply$jscomp$7$$.tcp.seq} ~${this.start_seq - $packet$jscomp$8_reply$jscomp$7$$.tcp.seq} (${this.ack - $packet$jscomp$8_reply$jscomp$7$$.tcp.seq}) = ${this.name}`, 16777216), $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$ = this.ipv4_reply(), $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$.tcp = {sport:$packet$jscomp$8_reply$jscomp$7$$.tcp.dport, dport:$packet$jscomp$8_reply$jscomp$7$$.tcp.sport, 
        seq:this.seq, ackn:this.ack, winsize:$packet$jscomp$8_reply$jscomp$7$$.tcp.winsize, ack:!0}, this.net.receive($make_packet$$($nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$));
      } else {
        this.seq_history.push(`${$packet$jscomp$8_reply$jscomp$7$$.tcp.seq - this.start_seq}:${$packet$jscomp$8_reply$jscomp$7$$.tcp.seq + $packet$jscomp$8_reply$jscomp$7$$.tcp_data.length - this.start_seq}`);
        this.ack += $packet$jscomp$8_reply$jscomp$7$$.tcp_data.length;
        0 < $packet$jscomp$8_reply$jscomp$7$$.tcp_data.length && ($nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$ = this.ipv4_reply(), this.net.receive($make_packet$$($nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$)));
        void 0 === this.last_received_ackn && (this.last_received_ackn = $packet$jscomp$8_reply$jscomp$7$$.tcp.ackn);
        var $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$ = $packet$jscomp$8_reply$jscomp$7$$.tcp.ackn - this.last_received_ackn;
        0 < $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$ && (this.last_received_ackn = $packet$jscomp$8_reply$jscomp$7$$.tcp.ackn, this.send_buffer = this.send_buffer.subarray($nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$), this.seq += $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$, this.pending = !1);
        0 > $nread_reply$jscomp$10_reply$jscomp$8_reply$jscomp$9$$ || (this.on_data($packet$jscomp$8_reply$jscomp$7$$.tcp_data), this.pump());
      }
    }
  }
};
$TCPConnection$$.prototype.write = function($data$jscomp$224$$) {
  if (0 < this.send_buffer.length) {
    let $concat$$ = new Uint8Array(this.send_buffer.byteLength + $data$jscomp$224$$.byteLength);
    $concat$$.set(this.send_buffer, 0);
    $concat$$.set($data$jscomp$224$$, this.send_buffer.byteLength);
    this.send_buffer = $concat$$;
  } else {
    this.send_buffer = $data$jscomp$224$$;
  }
  this.pump();
};
$TCPConnection$$.prototype.close = function() {
  this.state = "fin-wait-1";
  let $reply$jscomp$11$$ = this.ipv4_reply();
  $reply$jscomp$11$$.tcp.fin = !0;
  this.net.receive($make_packet$$($reply$jscomp$11$$));
  this.pump();
};
$TCPConnection$$.prototype.pump = function() {
  if (0 < this.send_buffer.length && !this.pending) {
    let $data$jscomp$225$$ = this.send_buffer.subarray(0, 500), $reply$jscomp$12$$ = this.ipv4_reply();
    this.pending = !0;
    1 > this.send_buffer.length && ($reply$jscomp$12$$.tcp.fin = !0);
    $reply$jscomp$12$$.tcp.psh = !0;
    $reply$jscomp$12$$.tcp_data = $data$jscomp$225$$;
    this.net.receive($make_packet$$($reply$jscomp$12$$));
  }
};
function $arp_whohas$$($packet$jscomp$9$$, $adapter$jscomp$6$$) {
  var $packet_subnet_reply$jscomp$13$$ = $iptolong$$($packet$jscomp$9$$.arp.tpa) & 4294967040;
  let $router_subnet$$ = $iptolong$$($adapter$jscomp$6$$.router_ip) & 4294967040;
  !$adapter$jscomp$6$$.masquerade && $packet_subnet_reply$jscomp$13$$ !== $router_subnet$$ || $packet_subnet_reply$jscomp$13$$ === $router_subnet$$ && 99 < $packet$jscomp$9$$.arp.tpa[3] || ($packet_subnet_reply$jscomp$13$$ = {}, $packet_subnet_reply$jscomp$13$$.eth = {ethertype:2054, src:$adapter$jscomp$6$$.router_mac, dest:$packet$jscomp$9$$.eth.src}, $packet_subnet_reply$jscomp$13$$.arp = {htype:1, ptype:2048, oper:2, sha:$adapter$jscomp$6$$.router_mac, spa:$packet$jscomp$9$$.arp.tpa, tha:$packet$jscomp$9$$.eth.src, 
  tpa:$packet$jscomp$9$$.arp.spa}, $adapter$jscomp$6$$.receive($make_packet$$($packet_subnet_reply$jscomp$13$$)));
}
function $handle_udp_echo$$($packet$jscomp$11$$, $adapter$jscomp$8$$) {
  let $reply$jscomp$15$$ = {};
  $reply$jscomp$15$$.eth = {ethertype:2048, src:$adapter$jscomp$8$$.router_mac, dest:$packet$jscomp$11$$.eth.src};
  $reply$jscomp$15$$.ipv4 = {proto:17, src:$packet$jscomp$11$$.ipv4.dest, dest:$packet$jscomp$11$$.ipv4.src, };
  $reply$jscomp$15$$.udp = {sport:$packet$jscomp$11$$.udp.dport, dport:$packet$jscomp$11$$.udp.sport, data:(new TextEncoder).encode($packet$jscomp$11$$.udp.data_s)};
  $adapter$jscomp$8$$.receive($make_packet$$($reply$jscomp$15$$));
}
;function $WispNetworkAdapter$$($wisp_url$$, $bus$jscomp$25$$, $config$jscomp$6$$) {
  this.register_ws($wisp_url$$);
  this.last_stream = 1;
  this.connections = {0:{congestion:0}};
  this.congested_buffer = [];
  $config$jscomp$6$$ = $config$jscomp$6$$ || {};
  this.bus = $bus$jscomp$25$$;
  this.id = $config$jscomp$6$$.id || 0;
  this.router_mac = new Uint8Array(($config$jscomp$6$$.router_mac || "52:54:0:1:2:3").split(":").map(function($x$jscomp$113$$) {
    return parseInt($x$jscomp$113$$, 16);
  }));
  this.router_ip = new Uint8Array(($config$jscomp$6$$.router_ip || "192.168.86.1").split(".").map(function($x$jscomp$114$$) {
    return parseInt($x$jscomp$114$$, 10);
  }));
  this.vm_ip = new Uint8Array(($config$jscomp$6$$.vm_ip || "192.168.86.100").split(".").map(function($x$jscomp$115$$) {
    return parseInt($x$jscomp$115$$, 10);
  }));
  this.masquerade = void 0 === $config$jscomp$6$$.masquerade || !!$config$jscomp$6$$.masquerade;
  this.vm_mac = new Uint8Array(6);
  this.doh_server = $config$jscomp$6$$.doh_server || "cloudflare-dns.com";
  this.tcp_conn = {};
  this.bus.register("net" + this.id + "-mac", function($mac$jscomp$1$$) {
    this.vm_mac = new Uint8Array($mac$jscomp$1$$.split(":").map(function($x$jscomp$116$$) {
      return parseInt($x$jscomp$116$$, 16);
    }));
  }, this);
  this.bus.register("net" + this.id + "-send", function($data$jscomp$226$$) {
    this.send($data$jscomp$226$$);
  }, this);
}
$WispNetworkAdapter$$.prototype.register_ws = function($wisp_url$jscomp$1$$) {
  this.wispws = new WebSocket($wisp_url$jscomp$1$$.replace("wisp://", "ws://").replace("wisps://", "wss://"));
  this.wispws.binaryType = "arraybuffer";
  this.wispws.onmessage = $event$jscomp$12$$ => {
    this.process_incoming_wisp_frame(new Uint8Array($event$jscomp$12$$.data));
  };
  this.wispws.onclose = () => {
    setTimeout(() => {
      this.register_ws($wisp_url$jscomp$1$$);
    }, 10000);
  };
};
$WispNetworkAdapter$$.prototype.send_packet = function($data$jscomp$227$$, $type$jscomp$157$$, $stream_id$$) {
  0 < this.connections[$stream_id$$].congestion ? ("DATA" === $type$jscomp$157$$ && this.connections[$stream_id$$].congestion--, this.wispws.send($data$jscomp$227$$)) : (this.connections[$stream_id$$].congested = !0, this.congested_buffer.push({data:$data$jscomp$227$$, type:$type$jscomp$157$$}));
};
$WispNetworkAdapter$$.prototype.process_incoming_wisp_frame = function($frame$$) {
  const $view$jscomp$30$$ = new DataView($frame$$.buffer), $stream_id$jscomp$1$$ = $view$jscomp$30$$.getUint32(1, !0);
  switch($frame$$[0]) {
    case 1:
      $dbg_log$$("Server sent client-only packet CONNECT", 1048576);
      break;
    case 2:
      if (this.connections[$stream_id$jscomp$1$$]) {
        this.connections[$stream_id$jscomp$1$$].data_callback($frame$$.slice(5));
      } else {
        throw Error("Got a DATA packet but stream not registered. ID: " + $stream_id$jscomp$1$$);
      }
      break;
    case 3:
      this.connections[$stream_id$jscomp$1$$] && (this.connections[$stream_id$jscomp$1$$].congestion = $view$jscomp$30$$.getUint32(5, !0));
      if (this.connections[$stream_id$jscomp$1$$].congested) {
        for (const $packet$jscomp$12$$ of this.congested_buffer) {
          this.send_packet($packet$jscomp$12$$.data, $packet$jscomp$12$$.type, $stream_id$jscomp$1$$);
        }
        this.connections[$stream_id$jscomp$1$$].congested = !1;
      }
      break;
    case 4:
      this.connections[$stream_id$jscomp$1$$] && this.connections[$stream_id$jscomp$1$$].close_callback($view$jscomp$30$$.getUint8(5));
      delete this.connections[$stream_id$jscomp$1$$];
      break;
    case 5:
      $dbg_log$$("got a wisp V2 upgrade request, ignoring", 1048576);
      break;
    default:
      $dbg_log$$("Wisp server returned unknown packet: " + $frame$$[0], 1048576);
  }
};
$WispNetworkAdapter$$.prototype.send_wisp_frame = function($frame_obj$$) {
  let $full_packet$$, $view$jscomp$31$$;
  switch($frame_obj$$.type) {
    case "CONNECT":
      const $hostname_buffer$$ = (new TextEncoder).encode($frame_obj$$.hostname);
      $full_packet$$ = new Uint8Array(8 + $hostname_buffer$$.length);
      $view$jscomp$31$$ = new DataView($full_packet$$.buffer);
      $view$jscomp$31$$.setUint8(0, 1);
      $view$jscomp$31$$.setUint32(1, $frame_obj$$.stream_id, !0);
      $view$jscomp$31$$.setUint8(5, 1);
      $view$jscomp$31$$.setUint16(6, $frame_obj$$.port, !0);
      $full_packet$$.set($hostname_buffer$$, 8);
      this.connections[$frame_obj$$.stream_id] = {data_callback:$frame_obj$$.data_callback, close_callback:$frame_obj$$.close_callback, congestion:this.connections[0].congestion};
      break;
    case "DATA":
      $full_packet$$ = new Uint8Array(5 + $frame_obj$$.data.length);
      $view$jscomp$31$$ = new DataView($full_packet$$.buffer);
      $view$jscomp$31$$.setUint8(0, 2);
      $view$jscomp$31$$.setUint32(1, $frame_obj$$.stream_id, !0);
      $full_packet$$.set($frame_obj$$.data, 5);
      break;
    case "CLOSE":
      $full_packet$$ = new Uint8Array(6);
      $view$jscomp$31$$ = new DataView($full_packet$$.buffer);
      $view$jscomp$31$$.setUint8(0, 4);
      $view$jscomp$31$$.setUint32(1, $frame_obj$$.stream_id, !0);
      $view$jscomp$31$$.setUint8(5, $frame_obj$$.reason);
      break;
    default:
      $dbg_log$$("Client tried to send unknown packet: " + $frame_obj$$.type, 1048576);
  }
  this.send_packet($full_packet$$, $frame_obj$$.type, $frame_obj$$.stream_id);
};
$WispNetworkAdapter$$.prototype.destroy = function() {
  this.wispws && (this.wispws.onmessage = null, this.wispws.onclose = null, this.wispws.close(), this.wispws = null);
};
$WispNetworkAdapter$$.prototype.send = function($data$jscomp$228_reply$jscomp$16$$) {
  let $packet$jscomp$13$$ = {};
  $parse_eth$$($data$jscomp$228_reply$jscomp$16$$, $packet$jscomp$13$$);
  if ($packet$jscomp$13$$.tcp) {
    $data$jscomp$228_reply$jscomp$16$$ = {};
    $data$jscomp$228_reply$jscomp$16$$.eth = {ethertype:2048, src:this.router_mac, dest:$packet$jscomp$13$$.eth.src};
    $data$jscomp$228_reply$jscomp$16$$.ipv4 = {proto:6, src:$packet$jscomp$13$$.ipv4.dest, dest:$packet$jscomp$13$$.ipv4.src};
    var $bop$jscomp$1_tuple$jscomp$2$$ = [$packet$jscomp$13$$.ipv4.src.join("."), $packet$jscomp$13$$.tcp.sport, $packet$jscomp$13$$.ipv4.dest.join("."), $packet$jscomp$13$$.tcp.dport].join(":");
    if ($packet$jscomp$13$$.tcp.syn) {
      this.tcp_conn[$bop$jscomp$1_tuple$jscomp$2$$] && $dbg_log$$("SYN to already opened port", 16777216);
      const $tcp_conn$$ = new $TCPConnection$$;
      $tcp_conn$$.state = "syn-received";
      $tcp_conn$$.net = this;
      $tcp_conn$$.tuple = $bop$jscomp$1_tuple$jscomp$2$$;
      $tcp_conn$$.stream_id = this.last_stream++;
      this.tcp_conn[$bop$jscomp$1_tuple$jscomp$2$$] = $tcp_conn$$;
      $tcp_conn$$.on_data = $data$jscomp$229$$ => {
        0 !== $data$jscomp$229$$.length && this.send_wisp_frame({type:"DATA", stream_id:$tcp_conn$$.stream_id, data:$data$jscomp$229$$});
      };
      this.send_wisp_frame({type:"CONNECT", stream_id:$tcp_conn$$.stream_id, hostname:$packet$jscomp$13$$.ipv4.dest.join("."), port:$packet$jscomp$13$$.tcp.dport, data_callback:$data$jscomp$230$$ => {
        $tcp_conn$$.write($data$jscomp$230$$);
      }, close_callback:() => {
        $tcp_conn$$.close();
      }});
      $tcp_conn$$.accept($packet$jscomp$13$$);
      return;
    }
    if (!this.tcp_conn[$bop$jscomp$1_tuple$jscomp$2$$]) {
      $dbg_log$$(`I dont know about ${$bop$jscomp$1_tuple$jscomp$2$$}, so restting`, 16777216);
      $bop$jscomp$1_tuple$jscomp$2$$ = $packet$jscomp$13$$.tcp.ackn;
      if ($packet$jscomp$13$$.tcp.fin || $packet$jscomp$13$$.tcp.syn) {
        $bop$jscomp$1_tuple$jscomp$2$$ += 1;
      }
      $data$jscomp$228_reply$jscomp$16$$.tcp = {sport:$packet$jscomp$13$$.tcp.dport, dport:$packet$jscomp$13$$.tcp.sport, seq:$bop$jscomp$1_tuple$jscomp$2$$, ackn:$packet$jscomp$13$$.tcp.seq + ($packet$jscomp$13$$.tcp.syn ? 1 : 0), winsize:$packet$jscomp$13$$.tcp.winsize, rst:!0, ack:$packet$jscomp$13$$.tcp.syn};
      this.receive($make_packet$$($data$jscomp$228_reply$jscomp$16$$));
      return;
    }
    this.tcp_conn[$bop$jscomp$1_tuple$jscomp$2$$].process($packet$jscomp$13$$);
  }
  $packet$jscomp$13$$.arp && 1 === $packet$jscomp$13$$.arp.oper && 2048 === $packet$jscomp$13$$.arp.ptype && $arp_whohas$$($packet$jscomp$13$$, this);
  $packet$jscomp$13$$.dns && (async() => {
    let $reply$jscomp$17$$ = {};
    $reply$jscomp$17$$.eth = {ethertype:2048, src:this.router_mac, dest:$packet$jscomp$13$$.eth.src};
    $reply$jscomp$17$$.ipv4 = {proto:17, src:this.router_ip, dest:$packet$jscomp$13$$.ipv4.src, };
    $reply$jscomp$17$$.udp = {sport:53, dport:$packet$jscomp$13$$.udp.sport};
    const $result$jscomp$20$$ = await (await fetch(`https://${this.doh_server}/dns-query`, {method:"POST", headers:[["content-type", "application/dns-message"]], body:$packet$jscomp$13$$.udp.data})).arrayBuffer();
    $reply$jscomp$17$$.udp.data = new Uint8Array($result$jscomp$20$$);
    this.receive($make_packet$$($reply$jscomp$17$$));
  })();
  $packet$jscomp$13$$.ntp ? $handle_fake_ntp$$($packet$jscomp$13$$, this) : $packet$jscomp$13$$.dhcp ? $handle_fake_dhcp$$($packet$jscomp$13$$, this) : $packet$jscomp$13$$.udp && 8 === $packet$jscomp$13$$.udp.dport && $handle_udp_echo$$($packet$jscomp$13$$, this);
};
$WispNetworkAdapter$$.prototype.receive = function($data$jscomp$232$$) {
  this.bus.send("net" + this.id + "-receive", new Uint8Array($data$jscomp$232$$));
};
function $FetchNetworkAdapter$$($bus$jscomp$26$$, $config$jscomp$7$$) {
  $config$jscomp$7$$ = $config$jscomp$7$$ || {};
  this.bus = $bus$jscomp$26$$;
  this.id = $config$jscomp$7$$.id || 0;
  this.router_mac = new Uint8Array(($config$jscomp$7$$.router_mac || "52:54:0:1:2:3").split(":").map(function($x$jscomp$117$$) {
    return parseInt($x$jscomp$117$$, 16);
  }));
  this.router_ip = new Uint8Array(($config$jscomp$7$$.router_ip || "192.168.86.1").split(".").map(function($x$jscomp$118$$) {
    return parseInt($x$jscomp$118$$, 10);
  }));
  this.vm_ip = new Uint8Array(($config$jscomp$7$$.vm_ip || "192.168.86.100").split(".").map(function($x$jscomp$119$$) {
    return parseInt($x$jscomp$119$$, 10);
  }));
  this.masquerade = void 0 === $config$jscomp$7$$.masquerade || !!$config$jscomp$7$$.masquerade;
  this.vm_mac = new Uint8Array(6);
  this.tcp_conn = {};
  this.cors_proxy = $config$jscomp$7$$.cors_proxy;
  this.bus.register("net" + this.id + "-mac", function($mac$jscomp$2$$) {
    this.vm_mac = new Uint8Array($mac$jscomp$2$$.split(":").map(function($x$jscomp$120$$) {
      return parseInt($x$jscomp$120$$, 16);
    }));
  }, this);
  this.bus.register("net" + this.id + "-send", function($data$jscomp$233$$) {
    this.send($data$jscomp$233$$);
  }, this);
}
$FetchNetworkAdapter$$.prototype.destroy = function() {
};
$FetchNetworkAdapter$$.prototype.on_tcp_connection = function($adapter$jscomp$9$$, $packet$jscomp$14$$, $tuple$jscomp$3$$) {
  if (80 === $packet$jscomp$14$$.tcp.dport) {
    let $conn$jscomp$1$$ = new $TCPConnection$$;
    $conn$jscomp$1$$.state = "syn-received";
    $conn$jscomp$1$$.net = this;
    $conn$jscomp$1$$.on_data = $on_data_http$$;
    $conn$jscomp$1$$.tuple = $tuple$jscomp$3$$;
    $conn$jscomp$1$$.accept($packet$jscomp$14$$);
    $adapter$jscomp$9$$.tcp_conn[$tuple$jscomp$3$$] = $conn$jscomp$1$$;
    return !0;
  }
  return !1;
};
async function $on_data_http$$($data$jscomp$234_headers_opts$$) {
  if ($data$jscomp$234_headers_opts$$ && (this.read = this.read || "", (this.read += (new TextDecoder).decode($data$jscomp$234_headers_opts$$)) && -1 !== this.read.indexOf("\r\n\r\n"))) {
    var $data$jscomp$235_offset$jscomp$71$$ = this.read.indexOf("\r\n\r\n");
    $data$jscomp$234_headers_opts$$ = this.read.substring(0, $data$jscomp$235_offset$jscomp$71$$).split(/\r\n/);
    $data$jscomp$235_offset$jscomp$71$$ = this.read.substring($data$jscomp$235_offset$jscomp$71$$ + 4);
    this.read = "";
    let $first_line$$ = $data$jscomp$234_headers_opts$$[0].split(" "), $target$jscomp$93$$;
    $target$jscomp$93$$ = /^https?:/.test($first_line$$[1]) ? new URL($first_line$$[1]) : new URL("http://host" + $first_line$$[1]);
    "undefined" !== typeof window && "http:" === $target$jscomp$93$$.protocol && "https:" === window.location.protocol && ($target$jscomp$93$$.protocol = "https:");
    let $req_headers$$ = new Headers;
    for (let $i$jscomp$132$$ = 1; $i$jscomp$132$$ < $data$jscomp$234_headers_opts$$.length; ++$i$jscomp$132$$) {
      let $parts$jscomp$7$$ = $data$jscomp$234_headers_opts$$[$i$jscomp$132$$].split(": "), $key$jscomp$39$$ = $parts$jscomp$7$$[0].toLowerCase(), $value$jscomp$199$$ = $parts$jscomp$7$$[1];
      "host" === $key$jscomp$39$$ ? $target$jscomp$93$$.host = $value$jscomp$199$$ : 1 < $key$jscomp$39$$.length && $req_headers$$.set($parts$jscomp$7$$[0], $value$jscomp$199$$);
    }
    $dbg_log$$("HTTP Dispatch: " + $target$jscomp$93$$.href, 16777216);
    this.name = $target$jscomp$93$$.href;
    $data$jscomp$234_headers_opts$$ = {method:$first_line$$[0], headers:$req_headers$$, };
    -1 !== ["put", "post"].indexOf($data$jscomp$234_headers_opts$$.method.toLowerCase()) && ($data$jscomp$234_headers_opts$$.body = $data$jscomp$235_offset$jscomp$71$$);
    const [$resp$$, $ab$jscomp$2$$] = await this.net.fetch($target$jscomp$93$$.href, $data$jscomp$234_headers_opts$$), $lines$jscomp$1$$ = [`HTTP/1.1 ${$resp$$.status} ${$resp$$.statusText}`, "connection: Closed", "content-length: " + $ab$jscomp$2$$.byteLength];
    $lines$jscomp$1$$.push("x-was-fetch-redirected: " + String($resp$$.redirected));
    $lines$jscomp$1$$.push("x-fetch-resp-url: " + String($resp$$.url));
    $resp$$.headers.forEach(function($value$jscomp$200$$, $key$jscomp$40$$) {
      -1 === ["content-encoding", "connection", "content-length", "transfer-encoding"].indexOf($key$jscomp$40$$.toLowerCase()) && $lines$jscomp$1$$.push($key$jscomp$40$$ + ": " + $value$jscomp$200$$);
    });
    $lines$jscomp$1$$.push("");
    $lines$jscomp$1$$.push("");
    this.write((new TextEncoder).encode($lines$jscomp$1$$.join("\r\n")));
    this.write(new Uint8Array($ab$jscomp$2$$));
  }
}
$FetchNetworkAdapter$$.prototype.fetch = async function($url$jscomp$27$$, $headers$jscomp$1_options$jscomp$48$$) {
  this.cors_proxy && ($url$jscomp$27$$ = this.cors_proxy + encodeURIComponent($url$jscomp$27$$));
  try {
    const $resp$jscomp$1$$ = await fetch($url$jscomp$27$$, $headers$jscomp$1_options$jscomp$48$$), $ab$jscomp$3$$ = await $resp$jscomp$1$$.arrayBuffer();
    return [$resp$jscomp$1$$, $ab$jscomp$3$$];
  } catch ($e$jscomp$49$$) {
    return console.warn("Fetch Failed: " + $url$jscomp$27$$ + "\n" + $e$jscomp$49$$), $headers$jscomp$1_options$jscomp$48$$ = new Headers, $headers$jscomp$1_options$jscomp$48$$.set("Content-Type", "text/plain"), [{status:502, statusText:"Fetch Error", headers:$headers$jscomp$1_options$jscomp$48$$, }, (new TextEncoder).encode(`Fetch ${$url$jscomp$27$$} failed:\n\n${$e$jscomp$49$$.stack}`).buffer];
  }
};
$FetchNetworkAdapter$$.prototype.send = function($JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$) {
  a: {
    let $packet$jscomp$inline_253$$ = {};
    $parse_eth$$($JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$, $packet$jscomp$inline_253$$);
    if ($packet$jscomp$inline_253$$.tcp) {
      b: {
        $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$ = {};
        $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.eth = {ethertype:2048, src:this.router_mac, dest:$packet$jscomp$inline_253$$.eth.src};
        $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.ipv4 = {proto:6, src:$packet$jscomp$inline_253$$.ipv4.dest, dest:$packet$jscomp$inline_253$$.ipv4.src};
        var $answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$ = [$packet$jscomp$inline_253$$.ipv4.src.join("."), $packet$jscomp$inline_253$$.tcp.sport, $packet$jscomp$inline_253$$.ipv4.dest.join("."), $packet$jscomp$inline_253$$.tcp.dport].join(":");
        if ($packet$jscomp$inline_253$$.tcp.syn && (this.tcp_conn[$answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$] && $dbg_log$$("SYN to already opened port", 16777216), this.on_tcp_connection(this, $packet$jscomp$inline_253$$, $answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$))) {
          $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$ = void 0;
          break b;
        }
        if (this.tcp_conn[$answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$]) {
          this.tcp_conn[$answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$].process($packet$jscomp$inline_253$$), $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$ = void 0;
        } else {
          $dbg_log$$(`I dont know about ${$answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$}, so restting`, 16777216);
          $answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$ = $packet$jscomp$inline_253$$.tcp.ackn;
          if ($packet$jscomp$inline_253$$.tcp.fin || $packet$jscomp$inline_253$$.tcp.syn) {
            $answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$ += 1;
          }
          $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.tcp = {sport:$packet$jscomp$inline_253$$.tcp.dport, dport:$packet$jscomp$inline_253$$.tcp.sport, seq:$answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$, ackn:$packet$jscomp$inline_253$$.tcp.seq + ($packet$jscomp$inline_253$$.tcp.syn ? 1 : 0), winsize:$packet$jscomp$inline_253$$.tcp.winsize, rst:!0, ack:$packet$jscomp$inline_253$$.tcp.syn};
          this.receive($make_packet$$($JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$));
          $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$ = !0;
        }
      }
      if ($JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$) {
        break a;
      }
    }
    $packet$jscomp$inline_253$$.arp && 1 === $packet$jscomp$inline_253$$.arp.oper && 2048 === $packet$jscomp$inline_253$$.arp.ptype && $arp_whohas$$($packet$jscomp$inline_253$$, this);
    if ($packet$jscomp$inline_253$$.dns) {
      $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$ = {};
      $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.eth = {ethertype:2048, src:this.router_mac, dest:$packet$jscomp$inline_253$$.eth.src};
      $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.ipv4 = {proto:17, src:this.router_ip, dest:$packet$jscomp$inline_253$$.ipv4.src, };
      $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.udp = {sport:53, dport:$packet$jscomp$inline_253$$.udp.sport};
      $answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$ = [];
      for (let $i$jscomp$inline_261$$ = 0; $i$jscomp$inline_261$$ < $packet$jscomp$inline_253$$.dns.questions.length; ++$i$jscomp$inline_261$$) {
        let $q$jscomp$inline_262$$ = $packet$jscomp$inline_253$$.dns.questions[$i$jscomp$inline_261$$];
        switch($q$jscomp$inline_262$$.type) {
          case 1:
            $answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$.push({name:$q$jscomp$inline_262$$.name, type:$q$jscomp$inline_262$$.type, class:$q$jscomp$inline_262$$.class, ttl:600, data:[192, 168, 87, 1]});
        }
      }
      $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.dns = {id:$packet$jscomp$inline_253$$.dns.id, flags:33152, questions:$packet$jscomp$inline_253$$.dns.questions, answers:$answers$jscomp$inline_259_bop$jscomp$inline_257_tuple$jscomp$inline_256$$};
      this.receive($make_packet$$($JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$));
    } else {
      $packet$jscomp$inline_253$$.ntp && $handle_fake_ntp$$($packet$jscomp$inline_253$$, this) || ($packet$jscomp$inline_253$$.icmp && 8 === $packet$jscomp$inline_253$$.icmp.type && ($JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$ = {}, $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.eth = {ethertype:2048, src:this.router_mac, 
      dest:$packet$jscomp$inline_253$$.eth.src}, $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.ipv4 = {proto:1, src:this.router_ip, dest:$packet$jscomp$inline_253$$.ipv4.src, }, $JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$.icmp = {type:0, code:$packet$jscomp$inline_253$$.icmp.code, data:$packet$jscomp$inline_253$$.icmp.data}, 
      this.receive($make_packet$$($JSCompiler_inline_result$jscomp$inline_254_data$jscomp$236_reply$jscomp$inline_255_reply$jscomp$inline_258_reply$jscomp$inline_263$$))), $packet$jscomp$inline_253$$.dhcp && $handle_fake_dhcp$$($packet$jscomp$inline_253$$, this) || $packet$jscomp$inline_253$$.udp && 8 === $packet$jscomp$inline_253$$.udp.dport && $handle_udp_echo$$($packet$jscomp$inline_253$$, this));
    }
  }
};
$FetchNetworkAdapter$$.prototype.tcp_connect = function($dport$jscomp$1$$) {
  return $fake_tcp_connect$$($dport$jscomp$1$$, this);
};
$FetchNetworkAdapter$$.prototype.receive = function($data$jscomp$237$$) {
  this.bus.send("net" + this.id + "-receive", new Uint8Array($data$jscomp$237$$));
};
"undefined" !== typeof module && "undefined" !== typeof module.exports && (module.exports.FetchNetworkAdapter = $FetchNetworkAdapter$$);
const $print_stats$$ = {stats_to_string:function($cpu$jscomp$26$$) {
  return $print_stats$$.print_misc_stats($cpu$jscomp$26$$) + $print_stats$$.print_instruction_counts($cpu$jscomp$26$$);
}, print_misc_stats:function($cpu$jscomp$27$$) {
  let $text$jscomp$12$$ = "";
  var $stat_names_tlb_entries$$ = "COMPILE COMPILE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_WRONG_ADDRESS_SPACE COMPILE_CUT_OFF_AT_END_OF_PAGE COMPILE_WITH_LOOP_SAFETY COMPILE_PAGE COMPILE_PAGE/COMPILE COMPILE_BASIC_BLOCK COMPILE_DUPLICATED_BASIC_BLOCK COMPILE_WASM_BLOCK COMPILE_WASM_LOOP COMPILE_DISPATCHER COMPILE_ENTRY_POINT COMPILE_WASM_TOTAL_BYTES COMPILE_WASM_TOTAL_BYTES/COMPILE_PAGE RUN_INTERPRETED RUN_INTERPRETED_NEW_PAGE RUN_INTERPRETED_PAGE_HAS_CODE RUN_INTERPRETED_PAGE_HAS_ENTRY_AFTER_PAGE_WALK RUN_INTERPRETED_NEAR_END_OF_PAGE RUN_INTERPRETED_DIFFERENT_STATE RUN_INTERPRETED_DIFFERENT_STATE_CPL3 RUN_INTERPRETED_DIFFERENT_STATE_FLAT RUN_INTERPRETED_DIFFERENT_STATE_IS32 RUN_INTERPRETED_DIFFERENT_STATE_SS32 RUN_INTERPRETED_MISSED_COMPILED_ENTRY_RUN_INTERPRETED RUN_INTERPRETED_STEPS RUN_FROM_CACHE RUN_FROM_CACHE_STEPS RUN_FROM_CACHE_STEPS/RUN_FROM_CACHE RUN_FROM_CACHE_STEPS/RUN_INTERPRETED_STEPS DIRECT_EXIT INDIRECT_JUMP INDIRECT_JUMP_NO_ENTRY NORMAL_PAGE_CHANGE NORMAL_FALLTHRU NORMAL_FALLTHRU_WITH_TARGET_BLOCK NORMAL_BRANCH NORMAL_BRANCH_WITH_TARGET_BLOCK CONDITIONAL_JUMP CONDITIONAL_JUMP_PAGE_CHANGE CONDITIONAL_JUMP_EXIT CONDITIONAL_JUMP_FALLTHRU CONDITIONAL_JUMP_FALLTHRU_WITH_TARGET_BLOCK CONDITIONAL_JUMP_BRANCH CONDITIONAL_JUMP_BRANCH_WITH_TARGET_BLOCK DISPATCHER_SMALL DISPATCHER_LARGE LOOP LOOP_SAFETY CONDITION_OPTIMISED CONDITION_UNOPTIMISED CONDITION_UNOPTIMISED_PF CONDITION_UNOPTIMISED_UNHANDLED_L CONDITION_UNOPTIMISED_UNHANDLED_LE FAILED_PAGE_CHANGE SAFE_READ_FAST SAFE_READ_SLOW_PAGE_CROSSED SAFE_READ_SLOW_NOT_VALID SAFE_READ_SLOW_NOT_USER SAFE_READ_SLOW_IN_MAPPED_RANGE SAFE_WRITE_FAST SAFE_WRITE_SLOW_PAGE_CROSSED SAFE_WRITE_SLOW_NOT_VALID SAFE_WRITE_SLOW_NOT_USER SAFE_WRITE_SLOW_IN_MAPPED_RANGE SAFE_WRITE_SLOW_READ_ONLY SAFE_WRITE_SLOW_HAS_CODE SAFE_READ_WRITE_FAST SAFE_READ_WRITE_SLOW_PAGE_CROSSED SAFE_READ_WRITE_SLOW_NOT_VALID SAFE_READ_WRITE_SLOW_NOT_USER SAFE_READ_WRITE_SLOW_IN_MAPPED_RANGE SAFE_READ_WRITE_SLOW_READ_ONLY SAFE_READ_WRITE_SLOW_HAS_CODE PAGE_FAULT TLB_MISS MAIN_LOOP MAIN_LOOP_IDLE DO_MANY_CYCLES CYCLE_INTERNAL INVALIDATE_ALL_MODULES_NO_FREE_WASM_INDICES INVALIDATE_MODULE_WRITTEN_WHILE_COMPILED INVALIDATE_MODULE_UNUSED_AFTER_OVERWRITE INVALIDATE_MODULE_DIRTY_PAGE INVALIDATE_PAGE_HAD_CODE INVALIDATE_PAGE_HAD_ENTRY_POINTS DIRTY_PAGE_DID_NOT_HAVE_CODE RUN_FROM_CACHE_EXIT_SAME_PAGE RUN_FROM_CACHE_EXIT_NEAR_END_OF_PAGE RUN_FROM_CACHE_EXIT_DIFFERENT_PAGE CLEAR_TLB FULL_CLEAR_TLB TLB_FULL TLB_GLOBAL_FULL MODRM_SIMPLE_REG MODRM_SIMPLE_REG_WITH_OFFSET MODRM_SIMPLE_CONST_OFFSET MODRM_COMPLEX SEG_OFFSET_OPTIMISED SEG_OFFSET_NOT_OPTIMISED SEG_OFFSET_NOT_OPTIMISED_ES SEG_OFFSET_NOT_OPTIMISED_FS SEG_OFFSET_NOT_OPTIMISED_GS SEG_OFFSET_NOT_OPTIMISED_NOT_FLAT".split(" "), 
  $global_tlb_entries_j$jscomp$12$$ = 0;
  const $stat_values$$ = {};
  for (let $i$jscomp$133$$ = 0; $i$jscomp$133$$ < $stat_names_tlb_entries$$.length; $i$jscomp$133$$++) {
    const $name$jscomp$94$$ = $stat_names_tlb_entries$$[$i$jscomp$133$$];
    var $stat_value$jscomp$201$$ = void 0;
    if ($name$jscomp$94$$.includes("/")) {
      $global_tlb_entries_j$jscomp$12$$++;
      const [$left$jscomp$5$$, $right$jscomp$5$$] = $name$jscomp$94$$.split("/");
      $stat_value$jscomp$201$$ = $stat_values$$[$left$jscomp$5$$] / $stat_values$$[$right$jscomp$5$$];
    } else {
      $stat_value$jscomp$201$$ = $stat_values$$[$name$jscomp$94$$] = $cpu$jscomp$27$$.wm.exports.profiler_stat_get($i$jscomp$133$$ - $global_tlb_entries_j$jscomp$12$$), $stat_value$jscomp$201$$ = 100e6 <= $stat_value$jscomp$201$$ ? Math.round($stat_value$jscomp$201$$ / 1e6) + "m" : 100e3 <= $stat_value$jscomp$201$$ ? Math.round($stat_value$jscomp$201$$ / 1e3) + "k" : $stat_value$jscomp$201$$;
    }
    $text$jscomp$12$$ += $name$jscomp$94$$ + "=" + $stat_value$jscomp$201$$ + "\n";
  }
  $text$jscomp$12$$ += "\n";
  $stat_names_tlb_entries$$ = $cpu$jscomp$27$$.wm.exports.get_valid_tlb_entries_count();
  $global_tlb_entries_j$jscomp$12$$ = $cpu$jscomp$27$$.wm.exports.get_valid_global_tlb_entries_count();
  $text$jscomp$12$$ = $text$jscomp$12$$ + ("TLB_ENTRIES=" + $stat_names_tlb_entries$$ + " (" + $global_tlb_entries_j$jscomp$12$$ + " global, " + ($stat_names_tlb_entries$$ - $global_tlb_entries_j$jscomp$12$$) + " non-global)\nWASM_TABLE_FREE=") + ($cpu$jscomp$27$$.wm.exports.jit_get_wasm_table_index_free_list_count() + "\n");
  $text$jscomp$12$$ += "JIT_CACHE_SIZE=" + $cpu$jscomp$27$$.wm.exports.jit_get_cache_size() + "\n";
  $text$jscomp$12$$ += "FLAT_SEGMENTS=" + $cpu$jscomp$27$$.wm.exports.has_flat_segmentation() + "\n";
  $text$jscomp$12$$ += "wasm memory size: " + ($cpu$jscomp$27$$.wasm_memory.buffer.byteLength >> 20) + "m\n";
  $text$jscomp$12$$ = $text$jscomp$12$$ + "Config:\nJIT_DISABLED=" + ($cpu$jscomp$27$$.wm.exports.get_jit_config(0) + "\n");
  $text$jscomp$12$$ += "MAX_PAGES=" + $cpu$jscomp$27$$.wm.exports.get_jit_config(1) + "\n";
  $text$jscomp$12$$ += "JIT_USE_LOOP_SAFETY=" + !!$cpu$jscomp$27$$.wm.exports.get_jit_config(2) + "\n";
  return $text$jscomp$12$$ += "MAX_EXTRA_BASIC_BLOCKS=" + $cpu$jscomp$27$$.wm.exports.get_jit_config(3) + "\n";
}, print_instruction_counts:function($cpu$jscomp$28$$) {
  return [$print_stats$$.print_instruction_counts_offset($cpu$jscomp$28$$, !1, !1, !1, !1), $print_stats$$.print_instruction_counts_offset($cpu$jscomp$28$$, !0, !1, !1, !1), $print_stats$$.print_instruction_counts_offset($cpu$jscomp$28$$, !1, !0, !1, !1), $print_stats$$.print_instruction_counts_offset($cpu$jscomp$28$$, !1, !1, !0, !1), $print_stats$$.print_instruction_counts_offset($cpu$jscomp$28$$, !1, !1, !1, !0), ].join("\n\n");
}, print_instruction_counts_offset:function($cpu$jscomp$29_total$jscomp$2$$, $compiled_per_opcode0f_prefixes$$, $jit_exit_per_opcode$$, $max_count_pad_length_unguarded_register$$, $i$jscomp$134_wasm_size$$) {
  let $text$jscomp$13$$ = "";
  var $counts_opcode_description_top_counts$$ = [], $i$jscomp$135_label$jscomp$9$$ = $compiled_per_opcode0f_prefixes$$ ? "compiled" : $jit_exit_per_opcode$$ ? "jit exit" : $max_count_pad_length_unguarded_register$$ ? "unguarded register" : $i$jscomp$134_wasm_size$$ ? "wasm size" : "executed";
  for (let $opcode$$ = 0; 256 > $opcode$$; $opcode$$++) {
    for (let $fixed_g$$ = 0; 8 > $fixed_g$$; $fixed_g$$++) {
      for (const $is_mem$$ of [!1, !0]) {
        var $count$jscomp$58_count_0f$$ = $cpu$jscomp$29_total$jscomp$2$$.wm.exports.get_opstats_buffer($compiled_per_opcode0f_prefixes$$, $jit_exit_per_opcode$$, $max_count_pad_length_unguarded_register$$, $i$jscomp$134_wasm_size$$, $opcode$$, !1, $is_mem$$, $fixed_g$$);
        $counts_opcode_description_top_counts$$.push({opcode:$opcode$$, count:$count$jscomp$58_count_0f$$, is_mem:$is_mem$$, fixed_g:$fixed_g$$});
        $count$jscomp$58_count_0f$$ = $cpu$jscomp$29_total$jscomp$2$$.wm.exports.get_opstats_buffer($compiled_per_opcode0f_prefixes$$, $jit_exit_per_opcode$$, $max_count_pad_length_unguarded_register$$, $i$jscomp$134_wasm_size$$, $opcode$$, !0, $is_mem$$, $fixed_g$$);
        $counts_opcode_description_top_counts$$.push({opcode:3840 | $opcode$$, count:$count$jscomp$58_count_0f$$, is_mem:$is_mem$$, fixed_g:$fixed_g$$});
      }
    }
  }
  $cpu$jscomp$29_total$jscomp$2$$ = 0;
  $compiled_per_opcode0f_prefixes$$ = new Set([38, 46, 54, 62, 100, 101, 102, 103, 240, 242, 243, ]);
  for (const {count:$count$jscomp$59$$, opcode:$opcode$jscomp$1$$} of $counts_opcode_description_top_counts$$) {
    $compiled_per_opcode0f_prefixes$$.has($opcode$jscomp$1$$) || ($cpu$jscomp$29_total$jscomp$2$$ += $count$jscomp$59$$);
  }
  if (0 === $cpu$jscomp$29_total$jscomp$2$$) {
    return "";
  }
  $jit_exit_per_opcode$$ = new Uint32Array(256);
  $compiled_per_opcode0f_prefixes$$ = new Uint32Array(256);
  for (const {opcode:$opcode$jscomp$2$$, count:$count$jscomp$60$$} of $counts_opcode_description_top_counts$$) {
    3840 === ($opcode$jscomp$2$$ & 65280) ? $compiled_per_opcode0f_prefixes$$[$opcode$jscomp$2$$ & 255] += $count$jscomp$60$$ : $jit_exit_per_opcode$$[$opcode$jscomp$2$$ & 255] += $count$jscomp$60$$;
  }
  $text$jscomp$13$$ = $text$jscomp$13$$ + "------------------\nTotal: " + ($cpu$jscomp$29_total$jscomp$2$$ + "\n");
  const $factor$jscomp$2$$ = 1e7 < $cpu$jscomp$29_total$jscomp$2$$ ? 1000 : 1;
  $max_count_pad_length_unguarded_register$$ = Math.max.apply(Math, $counts_opcode_description_top_counts$$.map(({count:$count$jscomp$61$$}) => Math.round($count$jscomp$61$$ / $factor$jscomp$2$$)));
  $max_count_pad_length_unguarded_register$$ = String($max_count_pad_length_unguarded_register$$).length;
  $text$jscomp$13$$ += `Instruction counts ${$i$jscomp$135_label$jscomp$9$$} (in ${$factor$jscomp$2$$}):\n`;
  for ($i$jscomp$134_wasm_size$$ = 0; 256 > $i$jscomp$134_wasm_size$$; $i$jscomp$134_wasm_size$$++) {
    $text$jscomp$13$$ += $i$jscomp$134_wasm_size$$.toString(16).padStart(2, "0") + ":" + $v86util$$.pads(Math.round($jit_exit_per_opcode$$[$i$jscomp$134_wasm_size$$] / $factor$jscomp$2$$), $max_count_pad_length_unguarded_register$$), $text$jscomp$13$$ = 15 === $i$jscomp$134_wasm_size$$ % 16 ? $text$jscomp$13$$ + "\n" : $text$jscomp$13$$ + " ";
  }
  $text$jscomp$13$$ = $text$jscomp$13$$ + "\n" + `Instruction counts ${$i$jscomp$135_label$jscomp$9$$} (0f, in ${$factor$jscomp$2$$}):\n`;
  for ($i$jscomp$135_label$jscomp$9$$ = 0; 256 > $i$jscomp$135_label$jscomp$9$$; $i$jscomp$135_label$jscomp$9$$++) {
    $text$jscomp$13$$ += ($i$jscomp$135_label$jscomp$9$$ & 255).toString(16).padStart(2, "0") + ":" + $v86util$$.pads(Math.round($compiled_per_opcode0f_prefixes$$[$i$jscomp$135_label$jscomp$9$$] / $factor$jscomp$2$$), $max_count_pad_length_unguarded_register$$), $text$jscomp$13$$ = 15 === $i$jscomp$135_label$jscomp$9$$ % 16 ? $text$jscomp$13$$ + "\n" : $text$jscomp$13$$ + " ";
  }
  $text$jscomp$13$$ += "\n";
  $counts_opcode_description_top_counts$$ = $counts_opcode_description_top_counts$$.filter(({count:$count$jscomp$62$$}) => $count$jscomp$62$$).sort(({count:$count1$$}, {count:$count2$$}) => $count2$$ - $count1$$);
  for (const {opcode:$opcode$jscomp$3$$, is_mem:$is_mem$jscomp$1$$, fixed_g:$fixed_g$jscomp$1$$, count:$count$jscomp$63$$} of $counts_opcode_description_top_counts$$.slice(0, 200)) {
    $counts_opcode_description_top_counts$$ = $opcode$jscomp$3$$.toString(16) + "_" + $fixed_g$jscomp$1$$ + ($is_mem$jscomp$1$$ ? "_m" : "_r"), $text$jscomp$13$$ += $counts_opcode_description_top_counts$$ + ":" + ($count$jscomp$63$$ / $cpu$jscomp$29_total$jscomp$2$$ * 100).toFixed(2) + " ";
  }
  return $text$jscomp$13$$ + "\n";
}, };
"undefined" !== typeof module && "undefined" !== typeof module.exports && (module.exports.print_stats = $print_stats$$);
function $MemoryFileStorage$$() {
  this.filedata = new Map;
}
$MemoryFileStorage$$.prototype.read = async function($data$jscomp$239_sha256sum$jscomp$3$$, $offset$jscomp$73$$, $count$jscomp$65$$) {
  $dbg_assert$$($data$jscomp$239_sha256sum$jscomp$3$$, "MemoryFileStorage read: sha256sum should be a non-empty string");
  return ($data$jscomp$239_sha256sum$jscomp$3$$ = this.filedata.get($data$jscomp$239_sha256sum$jscomp$3$$)) ? $data$jscomp$239_sha256sum$jscomp$3$$.subarray($offset$jscomp$73$$, $offset$jscomp$73$$ + $count$jscomp$65$$) : null;
};
$MemoryFileStorage$$.prototype.cache = async function($sha256sum$jscomp$4$$, $data$jscomp$240$$) {
  $dbg_assert$$($sha256sum$jscomp$4$$, "MemoryFileStorage cache: sha256sum should be a non-empty string");
  this.filedata.set($sha256sum$jscomp$4$$, $data$jscomp$240$$);
};
$MemoryFileStorage$$.prototype.uncache = function($sha256sum$jscomp$5$$) {
  this.filedata.delete($sha256sum$jscomp$5$$);
};
function $ServerFileStorageWrapper$$($file_storage$jscomp$2$$, $baseurl$jscomp$1$$) {
  $dbg_assert$$($baseurl$jscomp$1$$, "ServerMemoryFileStorage: baseurl should not be empty");
  $baseurl$jscomp$1$$.endsWith("/") || ($baseurl$jscomp$1$$ += "/");
  this.storage = $file_storage$jscomp$2$$;
  this.baseurl = $baseurl$jscomp$1$$;
}
$ServerFileStorageWrapper$$.prototype.load_from_server = function($sha256sum$jscomp$6$$) {
  return new Promise($resolve$jscomp$4$$ => {
    $v86util$$.load_file(this.baseurl + $sha256sum$jscomp$6$$, {done:async $buffer$jscomp$52_data$jscomp$241$$ => {
      $buffer$jscomp$52_data$jscomp$241$$ = new Uint8Array($buffer$jscomp$52_data$jscomp$241$$);
      await this.cache($sha256sum$jscomp$6$$, $buffer$jscomp$52_data$jscomp$241$$);
      $resolve$jscomp$4$$($buffer$jscomp$52_data$jscomp$241$$);
    }});
  });
};
$ServerFileStorageWrapper$$.prototype.read = async function($sha256sum$jscomp$7$$, $offset$jscomp$74$$, $count$jscomp$66$$) {
  const $data$jscomp$242$$ = await this.storage.read($sha256sum$jscomp$7$$, $offset$jscomp$74$$, $count$jscomp$66$$);
  return $data$jscomp$242$$ ? $data$jscomp$242$$ : (await this.load_from_server($sha256sum$jscomp$7$$)).subarray($offset$jscomp$74$$, $offset$jscomp$74$$ + $count$jscomp$66$$);
};
$ServerFileStorageWrapper$$.prototype.cache = async function($sha256sum$jscomp$8$$, $data$jscomp$243$$) {
  return await this.storage.cache($sha256sum$jscomp$8$$, $data$jscomp$243$$);
};
$ServerFileStorageWrapper$$.prototype.uncache = function($sha256sum$jscomp$9$$) {
  this.storage.uncache($sha256sum$jscomp$9$$);
};
var $S_IFREG$$ = 32768, $S_IFDIR$$ = 16384, $STATUS_UNLINKED$$ = 4;
function $FS$$($storage$$, $qidcounter$$) {
  this.inodes = [];
  this.events = [];
  this.storage = $storage$$;
  this.qidcounter = $qidcounter$$ || {last_qidnumber:0};
  this.inodedata = {};
  this.total_size = 274877906944;
  this.used_size = 0;
  this.mounts = [];
  this.CreateDirectory("", -1);
}
$FS$$.prototype.get_state = function() {
  let $state$jscomp$55$$ = [];
  $state$jscomp$55$$[0] = this.inodes;
  $state$jscomp$55$$[1] = this.qidcounter.last_qidnumber;
  $state$jscomp$55$$[2] = [];
  for (const [$id$jscomp$13$$, $data$jscomp$244$$] of Object.entries(this.inodedata)) {
    0 === (this.inodes[$id$jscomp$13$$].mode & $S_IFDIR$$) && $state$jscomp$55$$[2].push([$id$jscomp$13$$, $data$jscomp$244$$]);
  }
  $state$jscomp$55$$[3] = this.total_size;
  $state$jscomp$55$$[4] = this.used_size;
  return $state$jscomp$55$$ = $state$jscomp$55$$.concat(this.mounts);
};
$FS$$.prototype.set_state = function($state$jscomp$56$$) {
  this.inodes = $state$jscomp$56$$[0].map($state$jscomp$57$$ => {
    const $inode$jscomp$1$$ = new $Inode$$(0);
    $inode$jscomp$1$$.set_state($state$jscomp$57$$);
    return $inode$jscomp$1$$;
  });
  this.qidcounter.last_qidnumber = $state$jscomp$56$$[1];
  this.inodedata = {};
  for (let [$key$jscomp$41$$, $value$jscomp$202$$] of $state$jscomp$56$$[2]) {
    $value$jscomp$202$$.buffer.byteLength !== $value$jscomp$202$$.byteLength && ($value$jscomp$202$$ = $value$jscomp$202$$.slice()), this.inodedata[$key$jscomp$41$$] = $value$jscomp$202$$;
  }
  this.total_size = $state$jscomp$56$$[3];
  this.used_size = $state$jscomp$56$$[4];
  this.mounts = $state$jscomp$56$$.slice(5);
};
$FS$$.prototype.AddEvent = function($id$jscomp$14$$, $OnEvent$$) {
  var $inode$jscomp$2$$ = this.inodes[$id$jscomp$14$$];
  0 === $inode$jscomp$2$$.status || 2 === $inode$jscomp$2$$.status ? $OnEvent$$() : this.is_forwarder($inode$jscomp$2$$) ? this.follow_fs($inode$jscomp$2$$).AddEvent($inode$jscomp$2$$.foreign_id, $OnEvent$$) : this.events.push({id:$id$jscomp$14$$, OnEvent:$OnEvent$$});
};
$FS$$.prototype.HandleEvent = function($id$jscomp$15$$) {
  var $inode$jscomp$3_newevents$$ = this.inodes[$id$jscomp$15$$];
  this.is_forwarder($inode$jscomp$3_newevents$$) && this.follow_fs($inode$jscomp$3_newevents$$).HandleEvent($inode$jscomp$3_newevents$$.foreign_id);
  $inode$jscomp$3_newevents$$ = [];
  for (var $i$jscomp$136$$ = 0; $i$jscomp$136$$ < this.events.length; $i$jscomp$136$$++) {
    this.events[$i$jscomp$136$$].id === $id$jscomp$15$$ ? this.events[$i$jscomp$136$$].OnEvent() : $inode$jscomp$3_newevents$$.push(this.events[$i$jscomp$136$$]);
  }
  this.events = $inode$jscomp$3_newevents$$;
};
$FS$$.prototype.load_from_json = function($fs$jscomp$3_i$jscomp$137$$) {
  $dbg_assert$$($fs$jscomp$3_i$jscomp$137$$, "Invalid fs passed to load_from_json");
  if (3 !== $fs$jscomp$3_i$jscomp$137$$.version) {
    throw "The filesystem JSON format has changed. Please update your fs2json (https://github.com/copy/fs2json) and recreate the filesystem JSON.";
  }
  var $fsroot$$ = $fs$jscomp$3_i$jscomp$137$$.fsroot;
  this.used_size = $fs$jscomp$3_i$jscomp$137$$.size;
  for ($fs$jscomp$3_i$jscomp$137$$ = 0; $fs$jscomp$3_i$jscomp$137$$ < $fsroot$$.length; $fs$jscomp$3_i$jscomp$137$$++) {
    this.LoadRecursive($fsroot$$[$fs$jscomp$3_i$jscomp$137$$], 0);
  }
};
$FS$$.prototype.LoadRecursive = function($data$jscomp$245$$, $parentid$$) {
  var $inode$jscomp$4$$ = this.CreateInode();
  const $name$jscomp$95$$ = $data$jscomp$245$$[0];
  $inode$jscomp$4$$.size = $data$jscomp$245$$[1];
  $inode$jscomp$4$$.mtime = $data$jscomp$245$$[2];
  $inode$jscomp$4$$.ctime = $inode$jscomp$4$$.mtime;
  $inode$jscomp$4$$.atime = $inode$jscomp$4$$.mtime;
  $inode$jscomp$4$$.mode = $data$jscomp$245$$[3];
  $inode$jscomp$4$$.uid = $data$jscomp$245$$[4];
  $inode$jscomp$4$$.gid = $data$jscomp$245$$[5];
  var $ifmt$$ = $inode$jscomp$4$$.mode & 61440;
  $ifmt$$ === $S_IFDIR$$ ? (this.PushInode($inode$jscomp$4$$, $parentid$$, $name$jscomp$95$$), this.LoadDir(this.inodes.length - 1, $data$jscomp$245$$[6])) : $ifmt$$ === $S_IFREG$$ ? ($inode$jscomp$4$$.status = 2, $inode$jscomp$4$$.sha256sum = $data$jscomp$245$$[6], $dbg_assert$$($inode$jscomp$4$$.sha256sum), this.PushInode($inode$jscomp$4$$, $parentid$$, $name$jscomp$95$$)) : 40960 === $ifmt$$ ? ($inode$jscomp$4$$.symlink = $data$jscomp$245$$[6], this.PushInode($inode$jscomp$4$$, $parentid$$, $name$jscomp$95$$)) : 
  49152 !== $ifmt$$ && $dbg_log$$("Unexpected ifmt: " + $h$$($ifmt$$) + " (" + $name$jscomp$95$$ + ")");
};
$FS$$.prototype.LoadDir = function($parentid$jscomp$1$$, $children$jscomp$2$$) {
  for (var $i$jscomp$138$$ = 0; $i$jscomp$138$$ < $children$jscomp$2$$.length; $i$jscomp$138$$++) {
    this.LoadRecursive($children$jscomp$2$$[$i$jscomp$138$$], $parentid$jscomp$1$$);
  }
};
$FS$$.prototype.should_be_linked = function($inode$jscomp$5$$) {
  return !this.is_forwarder($inode$jscomp$5$$) || 0 === $inode$jscomp$5$$.foreign_id;
};
$FS$$.prototype.link_under_dir = function($parentid$jscomp$2$$, $idx$jscomp$3$$, $name$jscomp$96$$) {
  const $inode$jscomp$6$$ = this.inodes[$idx$jscomp$3$$], $parent_inode$$ = this.inodes[$parentid$jscomp$2$$];
  $dbg_assert$$(!this.is_forwarder($parent_inode$$), "Filesystem: Shouldn't link under fowarder parents");
  $dbg_assert$$(this.IsDirectory($parentid$jscomp$2$$), "Filesystem: Can't link under non-directories");
  $dbg_assert$$(this.should_be_linked($inode$jscomp$6$$), "Filesystem: Can't link across filesystems apart from their root");
  $dbg_assert$$(0 <= $inode$jscomp$6$$.nlinks, "Filesystem: Found negative nlinks value of " + $inode$jscomp$6$$.nlinks);
  $dbg_assert$$(!$parent_inode$$.direntries.has($name$jscomp$96$$), "Filesystem: Name '" + $name$jscomp$96$$ + "' is already taken");
  $parent_inode$$.direntries.set($name$jscomp$96$$, $idx$jscomp$3$$);
  $inode$jscomp$6$$.nlinks++;
  this.IsDirectory($idx$jscomp$3$$) && ($dbg_assert$$(!$inode$jscomp$6$$.direntries.has(".."), "Filesystem: Cannot link a directory twice"), $inode$jscomp$6$$.direntries.has(".") || $inode$jscomp$6$$.nlinks++, $inode$jscomp$6$$.direntries.set(".", $idx$jscomp$3$$), $inode$jscomp$6$$.direntries.set("..", $parentid$jscomp$2$$), $parent_inode$$.nlinks++);
};
$FS$$.prototype.unlink_from_dir = function($parentid$jscomp$3$$, $name$jscomp$97$$) {
  const $idx$jscomp$4$$ = this.Search($parentid$jscomp$3$$, $name$jscomp$97$$), $inode$jscomp$7$$ = this.inodes[$idx$jscomp$4$$], $parent_inode$jscomp$1$$ = this.inodes[$parentid$jscomp$3$$];
  $dbg_assert$$(!this.is_forwarder($parent_inode$jscomp$1$$), "Filesystem: Can't unlink from forwarders");
  $dbg_assert$$(this.IsDirectory($parentid$jscomp$3$$), "Filesystem: Can't unlink from non-directories");
  $parent_inode$jscomp$1$$.direntries.delete($name$jscomp$97$$) ? ($inode$jscomp$7$$.nlinks--, this.IsDirectory($idx$jscomp$4$$) && ($dbg_assert$$($inode$jscomp$7$$.direntries.get("..") === $parentid$jscomp$3$$, "Filesystem: Found directory with bad parent id"), $inode$jscomp$7$$.direntries.delete(".."), $parent_inode$jscomp$1$$.nlinks--), $dbg_assert$$(0 <= $inode$jscomp$7$$.nlinks, "Filesystem: Found negative nlinks value of " + $inode$jscomp$7$$.nlinks)) : $dbg_assert$$(!1, "Filesystem: Can't unlink non-existent file: " + 
  $name$jscomp$97$$);
};
$FS$$.prototype.PushInode = function($inode$jscomp$8$$, $parentid$jscomp$4$$, $name$jscomp$98$$) {
  -1 !== $parentid$jscomp$4$$ ? (this.inodes.push($inode$jscomp$8$$), $inode$jscomp$8$$.fid = this.inodes.length - 1, this.link_under_dir($parentid$jscomp$4$$, $inode$jscomp$8$$.fid, $name$jscomp$98$$)) : 0 === this.inodes.length ? (this.inodes.push($inode$jscomp$8$$), $inode$jscomp$8$$.direntries.set(".", 0), $inode$jscomp$8$$.direntries.set("..", 0), $inode$jscomp$8$$.nlinks = 2) : ($message$$.Debug("Error in Filesystem: Pushed inode with name = " + $name$jscomp$98$$ + " has no parent"), $message$$.Abort());
};
function $Inode$$($qidnumber$$) {
  this.direntries = new Map;
  this.minor = this.major = this.mtime = this.atime = this.ctime = this.fid = this.gid = this.uid = this.size = this.status = 0;
  this.symlink = "";
  this.mode = 493;
  this.qid = {type:0, version:0, path:$qidnumber$$, };
  this.caps = void 0;
  this.nlinks = 0;
  this.sha256sum = "";
  this.locks = [];
  this.foreign_id = this.mount_id = -1;
}
$Inode$$.prototype.get_state = function() {
  const $state$jscomp$58$$ = [];
  $state$jscomp$58$$[0] = this.mode;
  $state$jscomp$58$$[1] = (this.mode & 61440) === $S_IFDIR$$ ? [...this.direntries] : (this.mode & 61440) === $S_IFREG$$ ? this.sha256sum : 40960 === (this.mode & 61440) ? this.symlink : 49152 === (this.mode & 61440) ? [this.minor, this.major] : null;
  $state$jscomp$58$$[2] = this.locks;
  $state$jscomp$58$$[3] = this.status;
  $state$jscomp$58$$[4] = this.size;
  $state$jscomp$58$$[5] = this.uid;
  $state$jscomp$58$$[6] = this.gid;
  $state$jscomp$58$$[7] = this.fid;
  $state$jscomp$58$$[8] = this.ctime;
  $state$jscomp$58$$[9] = this.atime;
  $state$jscomp$58$$[10] = this.mtime;
  $state$jscomp$58$$[11] = this.qid.version;
  $state$jscomp$58$$[12] = this.qid.path;
  $state$jscomp$58$$[13] = this.nlinks;
  return $state$jscomp$58$$;
};
$Inode$$.prototype.set_state = function($state$jscomp$59$$) {
  this.mode = $state$jscomp$59$$[0];
  if ((this.mode & 61440) === $S_IFDIR$$) {
    this.direntries = new Map;
    for (const [$name$jscomp$99$$, $entry$jscomp$13$$] of $state$jscomp$59$$[1]) {
      this.direntries.set($name$jscomp$99$$, $entry$jscomp$13$$);
    }
  } else {
    (this.mode & 61440) === $S_IFREG$$ ? this.sha256sum = $state$jscomp$59$$[1] : 40960 === (this.mode & 61440) ? this.symlink = $state$jscomp$59$$[1] : 49152 === (this.mode & 61440) && ([this.minor, this.major] = $state$jscomp$59$$[1]);
  }
  this.locks = [];
  for (const $lock_state$$ of $state$jscomp$59$$[2]) {
    const $lock$$ = new $FSLockRegion$$;
    $lock$$.set_state($lock_state$$);
    this.locks.push($lock$$);
  }
  this.status = $state$jscomp$59$$[3];
  this.size = $state$jscomp$59$$[4];
  this.uid = $state$jscomp$59$$[5];
  this.gid = $state$jscomp$59$$[6];
  this.fid = $state$jscomp$59$$[7];
  this.ctime = $state$jscomp$59$$[8];
  this.atime = $state$jscomp$59$$[9];
  this.mtime = $state$jscomp$59$$[10];
  this.qid.type = (this.mode & 61440) >> 8;
  this.qid.version = $state$jscomp$59$$[11];
  this.qid.path = $state$jscomp$59$$[12];
  this.nlinks = $state$jscomp$59$$[13];
};
$FS$$.prototype.divert = function($parentid$jscomp$5$$, $filename$jscomp$8$$) {
  const $old_idx$jscomp$1$$ = this.Search($parentid$jscomp$5$$, $filename$jscomp$8$$), $old_inode$$ = this.inodes[$old_idx$jscomp$1$$], $new_inode$$ = new $Inode$$(-1);
  $dbg_assert$$($old_inode$$, "Filesystem divert: name (" + $filename$jscomp$8$$ + ") not found");
  $dbg_assert$$(this.IsDirectory($old_idx$jscomp$1$$) || 1 >= $old_inode$$.nlinks, "Filesystem: can't divert hardlinked file '" + $filename$jscomp$8$$ + "' with nlinks=" + $old_inode$$.nlinks);
  Object.assign($new_inode$$, $old_inode$$);
  const $idx$jscomp$5$$ = this.inodes.length;
  this.inodes.push($new_inode$$);
  $new_inode$$.fid = $idx$jscomp$5$$;
  this.is_forwarder($old_inode$$) && this.mounts[$old_inode$$.mount_id].backtrack.set($old_inode$$.foreign_id, $idx$jscomp$5$$);
  this.should_be_linked($old_inode$$) && (this.unlink_from_dir($parentid$jscomp$5$$, $filename$jscomp$8$$), this.link_under_dir($parentid$jscomp$5$$, $idx$jscomp$5$$, $filename$jscomp$8$$));
  if (this.IsDirectory($old_idx$jscomp$1$$) && !this.is_forwarder($old_inode$$)) {
    for (const [$name$jscomp$100$$, $child_id$$] of $new_inode$$.direntries) {
      "." !== $name$jscomp$100$$ && ".." !== $name$jscomp$100$$ && this.IsDirectory($child_id$$) && this.inodes[$child_id$$].direntries.set("..", $idx$jscomp$5$$);
    }
  }
  this.inodedata[$idx$jscomp$5$$] = this.inodedata[$old_idx$jscomp$1$$];
  delete this.inodedata[$old_idx$jscomp$1$$];
  $old_inode$$.direntries = new Map;
  $old_inode$$.nlinks = 0;
  return $idx$jscomp$5$$;
};
$FS$$.prototype.copy_inode = function($src_inode$$, $dest_inode$$) {
  Object.assign($dest_inode$$, $src_inode$$, {fid:$dest_inode$$.fid, direntries:$dest_inode$$.direntries, nlinks:$dest_inode$$.nlinks, });
};
$FS$$.prototype.CreateInode = function() {
  const $now$jscomp$15$$ = Math.round(Date.now() / 1000), $inode$jscomp$9$$ = new $Inode$$(++this.qidcounter.last_qidnumber);
  $inode$jscomp$9$$.atime = $inode$jscomp$9$$.ctime = $inode$jscomp$9$$.mtime = $now$jscomp$15$$;
  return $inode$jscomp$9$$;
};
$FS$$.prototype.CreateDirectory = function($foreign_id_name$jscomp$101$$, $foreign_parentid_parentid$jscomp$6$$) {
  var $parent_inode$jscomp$2_x$jscomp$121$$ = this.inodes[$foreign_parentid_parentid$jscomp$6$$];
  if (0 <= $foreign_parentid_parentid$jscomp$6$$ && this.is_forwarder($parent_inode$jscomp$2_x$jscomp$121$$)) {
    return $foreign_parentid_parentid$jscomp$6$$ = $parent_inode$jscomp$2_x$jscomp$121$$.foreign_id, $foreign_id_name$jscomp$101$$ = this.follow_fs($parent_inode$jscomp$2_x$jscomp$121$$).CreateDirectory($foreign_id_name$jscomp$101$$, $foreign_parentid_parentid$jscomp$6$$), this.create_forwarder($parent_inode$jscomp$2_x$jscomp$121$$.mount_id, $foreign_id_name$jscomp$101$$);
  }
  $parent_inode$jscomp$2_x$jscomp$121$$ = this.CreateInode();
  $parent_inode$jscomp$2_x$jscomp$121$$.mode = 511 | $S_IFDIR$$;
  0 <= $foreign_parentid_parentid$jscomp$6$$ && ($parent_inode$jscomp$2_x$jscomp$121$$.uid = this.inodes[$foreign_parentid_parentid$jscomp$6$$].uid, $parent_inode$jscomp$2_x$jscomp$121$$.gid = this.inodes[$foreign_parentid_parentid$jscomp$6$$].gid, $parent_inode$jscomp$2_x$jscomp$121$$.mode = this.inodes[$foreign_parentid_parentid$jscomp$6$$].mode & 511 | $S_IFDIR$$);
  $parent_inode$jscomp$2_x$jscomp$121$$.qid.type = $S_IFDIR$$ >> 8;
  this.PushInode($parent_inode$jscomp$2_x$jscomp$121$$, $foreign_parentid_parentid$jscomp$6$$, $foreign_id_name$jscomp$101$$);
  this.NotifyListeners(this.inodes.length - 1, "newdir");
  return this.inodes.length - 1;
};
$FS$$.prototype.CreateFile = function($filename$jscomp$9_foreign_id$jscomp$1$$, $foreign_parentid$jscomp$1_parentid$jscomp$7$$) {
  var $parent_inode$jscomp$3_x$jscomp$122$$ = this.inodes[$foreign_parentid$jscomp$1_parentid$jscomp$7$$];
  if (this.is_forwarder($parent_inode$jscomp$3_x$jscomp$122$$)) {
    return $foreign_parentid$jscomp$1_parentid$jscomp$7$$ = $parent_inode$jscomp$3_x$jscomp$122$$.foreign_id, $filename$jscomp$9_foreign_id$jscomp$1$$ = this.follow_fs($parent_inode$jscomp$3_x$jscomp$122$$).CreateFile($filename$jscomp$9_foreign_id$jscomp$1$$, $foreign_parentid$jscomp$1_parentid$jscomp$7$$), this.create_forwarder($parent_inode$jscomp$3_x$jscomp$122$$.mount_id, $filename$jscomp$9_foreign_id$jscomp$1$$);
  }
  $parent_inode$jscomp$3_x$jscomp$122$$ = this.CreateInode();
  $parent_inode$jscomp$3_x$jscomp$122$$.uid = this.inodes[$foreign_parentid$jscomp$1_parentid$jscomp$7$$].uid;
  $parent_inode$jscomp$3_x$jscomp$122$$.gid = this.inodes[$foreign_parentid$jscomp$1_parentid$jscomp$7$$].gid;
  $parent_inode$jscomp$3_x$jscomp$122$$.qid.type = $S_IFREG$$ >> 8;
  $parent_inode$jscomp$3_x$jscomp$122$$.mode = this.inodes[$foreign_parentid$jscomp$1_parentid$jscomp$7$$].mode & 438 | $S_IFREG$$;
  this.PushInode($parent_inode$jscomp$3_x$jscomp$122$$, $foreign_parentid$jscomp$1_parentid$jscomp$7$$, $filename$jscomp$9_foreign_id$jscomp$1$$);
  this.NotifyListeners(this.inodes.length - 1, "newfile");
  return this.inodes.length - 1;
};
$FS$$.prototype.CreateNode = function($filename$jscomp$10_foreign_id$jscomp$2$$, $foreign_parentid$jscomp$2_parentid$jscomp$8$$, $major$jscomp$1$$, $minor$jscomp$1$$) {
  var $parent_inode$jscomp$4_x$jscomp$123$$ = this.inodes[$foreign_parentid$jscomp$2_parentid$jscomp$8$$];
  if (this.is_forwarder($parent_inode$jscomp$4_x$jscomp$123$$)) {
    return $foreign_parentid$jscomp$2_parentid$jscomp$8$$ = $parent_inode$jscomp$4_x$jscomp$123$$.foreign_id, $filename$jscomp$10_foreign_id$jscomp$2$$ = this.follow_fs($parent_inode$jscomp$4_x$jscomp$123$$).CreateNode($filename$jscomp$10_foreign_id$jscomp$2$$, $foreign_parentid$jscomp$2_parentid$jscomp$8$$, $major$jscomp$1$$, $minor$jscomp$1$$), this.create_forwarder($parent_inode$jscomp$4_x$jscomp$123$$.mount_id, $filename$jscomp$10_foreign_id$jscomp$2$$);
  }
  $parent_inode$jscomp$4_x$jscomp$123$$ = this.CreateInode();
  $parent_inode$jscomp$4_x$jscomp$123$$.major = $major$jscomp$1$$;
  $parent_inode$jscomp$4_x$jscomp$123$$.minor = $minor$jscomp$1$$;
  $parent_inode$jscomp$4_x$jscomp$123$$.uid = this.inodes[$foreign_parentid$jscomp$2_parentid$jscomp$8$$].uid;
  $parent_inode$jscomp$4_x$jscomp$123$$.gid = this.inodes[$foreign_parentid$jscomp$2_parentid$jscomp$8$$].gid;
  $parent_inode$jscomp$4_x$jscomp$123$$.qid.type = 192;
  $parent_inode$jscomp$4_x$jscomp$123$$.mode = this.inodes[$foreign_parentid$jscomp$2_parentid$jscomp$8$$].mode & 438;
  this.PushInode($parent_inode$jscomp$4_x$jscomp$123$$, $foreign_parentid$jscomp$2_parentid$jscomp$8$$, $filename$jscomp$10_foreign_id$jscomp$2$$);
  return this.inodes.length - 1;
};
$FS$$.prototype.CreateSymlink = function($filename$jscomp$11_foreign_id$jscomp$3$$, $foreign_parentid$jscomp$3_parentid$jscomp$9$$, $symlink$$) {
  var $parent_inode$jscomp$5_x$jscomp$124$$ = this.inodes[$foreign_parentid$jscomp$3_parentid$jscomp$9$$];
  if (this.is_forwarder($parent_inode$jscomp$5_x$jscomp$124$$)) {
    return $foreign_parentid$jscomp$3_parentid$jscomp$9$$ = $parent_inode$jscomp$5_x$jscomp$124$$.foreign_id, $filename$jscomp$11_foreign_id$jscomp$3$$ = this.follow_fs($parent_inode$jscomp$5_x$jscomp$124$$).CreateSymlink($filename$jscomp$11_foreign_id$jscomp$3$$, $foreign_parentid$jscomp$3_parentid$jscomp$9$$, $symlink$$), this.create_forwarder($parent_inode$jscomp$5_x$jscomp$124$$.mount_id, $filename$jscomp$11_foreign_id$jscomp$3$$);
  }
  $parent_inode$jscomp$5_x$jscomp$124$$ = this.CreateInode();
  $parent_inode$jscomp$5_x$jscomp$124$$.uid = this.inodes[$foreign_parentid$jscomp$3_parentid$jscomp$9$$].uid;
  $parent_inode$jscomp$5_x$jscomp$124$$.gid = this.inodes[$foreign_parentid$jscomp$3_parentid$jscomp$9$$].gid;
  $parent_inode$jscomp$5_x$jscomp$124$$.qid.type = 160;
  $parent_inode$jscomp$5_x$jscomp$124$$.symlink = $symlink$$;
  $parent_inode$jscomp$5_x$jscomp$124$$.mode = 40960;
  this.PushInode($parent_inode$jscomp$5_x$jscomp$124$$, $foreign_parentid$jscomp$3_parentid$jscomp$9$$, $filename$jscomp$11_foreign_id$jscomp$3$$);
  return this.inodes.length - 1;
};
$FS$$.prototype.CreateTextFile = async function($data$jscomp$246_filename$jscomp$12$$, $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$, $foreign_id$jscomp$4_str$jscomp$11$$) {
  var $id$jscomp$16_parent_inode$jscomp$6$$ = this.inodes[$foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$];
  if (this.is_forwarder($id$jscomp$16_parent_inode$jscomp$6$$)) {
    return $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$ = $id$jscomp$16_parent_inode$jscomp$6$$.foreign_id, $foreign_id$jscomp$4_str$jscomp$11$$ = await this.follow_fs($id$jscomp$16_parent_inode$jscomp$6$$).CreateTextFile($data$jscomp$246_filename$jscomp$12$$, $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$, $foreign_id$jscomp$4_str$jscomp$11$$), this.create_forwarder($id$jscomp$16_parent_inode$jscomp$6$$.mount_id, $foreign_id$jscomp$4_str$jscomp$11$$);
  }
  $id$jscomp$16_parent_inode$jscomp$6$$ = this.CreateFile($data$jscomp$246_filename$jscomp$12$$, $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$);
  $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$ = this.inodes[$id$jscomp$16_parent_inode$jscomp$6$$];
  $data$jscomp$246_filename$jscomp$12$$ = new Uint8Array($foreign_id$jscomp$4_str$jscomp$11$$.length);
  $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$.size = $foreign_id$jscomp$4_str$jscomp$11$$.length;
  for ($foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$ = 0; $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$ < $foreign_id$jscomp$4_str$jscomp$11$$.length; $foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$++) {
    $data$jscomp$246_filename$jscomp$12$$[$foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$] = $foreign_id$jscomp$4_str$jscomp$11$$.charCodeAt($foreign_parentid$jscomp$4_j$jscomp$13_parentid$jscomp$10_x$jscomp$125$$);
  }
  await this.set_data($id$jscomp$16_parent_inode$jscomp$6$$, $data$jscomp$246_filename$jscomp$12$$);
  return $id$jscomp$16_parent_inode$jscomp$6$$;
};
$FS$$.prototype.CreateBinaryFile = async function($filename$jscomp$13_x$jscomp$126$$, $data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$, $buffer$jscomp$53_foreign_id$jscomp$5$$) {
  var $id$jscomp$17_parent_inode$jscomp$7$$ = this.inodes[$data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$];
  if (this.is_forwarder($id$jscomp$17_parent_inode$jscomp$7$$)) {
    return $data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$ = $id$jscomp$17_parent_inode$jscomp$7$$.foreign_id, $buffer$jscomp$53_foreign_id$jscomp$5$$ = await this.follow_fs($id$jscomp$17_parent_inode$jscomp$7$$).CreateBinaryFile($filename$jscomp$13_x$jscomp$126$$, $data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$, $buffer$jscomp$53_foreign_id$jscomp$5$$), this.create_forwarder($id$jscomp$17_parent_inode$jscomp$7$$.mount_id, $buffer$jscomp$53_foreign_id$jscomp$5$$);
  }
  $id$jscomp$17_parent_inode$jscomp$7$$ = this.CreateFile($filename$jscomp$13_x$jscomp$126$$, $data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$);
  $filename$jscomp$13_x$jscomp$126$$ = this.inodes[$id$jscomp$17_parent_inode$jscomp$7$$];
  $data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$ = new Uint8Array($buffer$jscomp$53_foreign_id$jscomp$5$$.length);
  $data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$.set($buffer$jscomp$53_foreign_id$jscomp$5$$);
  await this.set_data($id$jscomp$17_parent_inode$jscomp$7$$, $data$jscomp$247_foreign_parentid$jscomp$5_parentid$jscomp$11$$);
  $filename$jscomp$13_x$jscomp$126$$.size = $buffer$jscomp$53_foreign_id$jscomp$5$$.length;
  return $id$jscomp$17_parent_inode$jscomp$7$$;
};
$FS$$.prototype.OpenInode = function($id$jscomp$18$$, $mode$jscomp$25$$) {
  var $inode$jscomp$10$$ = this.inodes[$id$jscomp$18$$];
  if (this.is_forwarder($inode$jscomp$10$$)) {
    return this.follow_fs($inode$jscomp$10$$).OpenInode($inode$jscomp$10$$.foreign_id, $mode$jscomp$25$$);
  }
  ($inode$jscomp$10$$.mode & 61440) === $S_IFDIR$$ && this.FillDirectory($id$jscomp$18$$);
  return !0;
};
$FS$$.prototype.CloseInode = async function($id$jscomp$19$$) {
  var $inode$jscomp$11$$ = this.inodes[$id$jscomp$19$$];
  if (this.is_forwarder($inode$jscomp$11$$)) {
    return await this.follow_fs($inode$jscomp$11$$).CloseInode($inode$jscomp$11$$.foreign_id);
  }
  2 === $inode$jscomp$11$$.status && this.storage.uncache($inode$jscomp$11$$.sha256sum);
  $inode$jscomp$11$$.status === $STATUS_UNLINKED$$ && ($inode$jscomp$11$$.status = -1, await this.DeleteData($id$jscomp$19$$));
};
$FS$$.prototype.Rename = async function($olddirid_ret$jscomp$6_ret$jscomp$7$$, $oldname$jscomp$1$$, $foreign_fs_new_real_inode_newdirid$$, $foreign_id$jscomp$6_newname$jscomp$2$$) {
  if ($olddirid_ret$jscomp$6_ret$jscomp$7$$ === $foreign_fs_new_real_inode_newdirid$$ && $oldname$jscomp$1$$ === $foreign_id$jscomp$6_newname$jscomp$2$$) {
    return 0;
  }
  var $oldid$$ = this.Search($olddirid_ret$jscomp$6_ret$jscomp$7$$, $oldname$jscomp$1$$);
  if (-1 === $oldid$$) {
    return -2;
  }
  var $oldpath$$ = this.GetFullPath($olddirid_ret$jscomp$6_ret$jscomp$7$$) + "/" + $oldname$jscomp$1$$;
  if (-1 !== this.Search($foreign_fs_new_real_inode_newdirid$$, $foreign_id$jscomp$6_newname$jscomp$2$$) && ($newdir_ret$jscomp$5_ret$jscomp$8$$ = this.Unlink($foreign_fs_new_real_inode_newdirid$$, $foreign_id$jscomp$6_newname$jscomp$2$$), 0 > $newdir_ret$jscomp$5_ret$jscomp$8$$)) {
    return $newdir_ret$jscomp$5_ret$jscomp$8$$;
  }
  var $inode$jscomp$12$$ = this.inodes[$oldid$$], $diverted_old_idx_olddir$$ = this.inodes[$olddirid_ret$jscomp$6_ret$jscomp$7$$], $newdir_ret$jscomp$5_ret$jscomp$8$$ = this.inodes[$foreign_fs_new_real_inode_newdirid$$];
  if (this.is_forwarder($diverted_old_idx_olddir$$) || this.is_forwarder($newdir_ret$jscomp$5_ret$jscomp$8$$)) {
    if (this.is_forwarder($diverted_old_idx_olddir$$) && $diverted_old_idx_olddir$$.mount_id === $newdir_ret$jscomp$5_ret$jscomp$8$$.mount_id) {
      if ($olddirid_ret$jscomp$6_ret$jscomp$7$$ = await this.follow_fs($diverted_old_idx_olddir$$).Rename($diverted_old_idx_olddir$$.foreign_id, $oldname$jscomp$1$$, $newdir_ret$jscomp$5_ret$jscomp$8$$.foreign_id, $foreign_id$jscomp$6_newname$jscomp$2$$), 0 > $olddirid_ret$jscomp$6_ret$jscomp$7$$) {
        return $olddirid_ret$jscomp$6_ret$jscomp$7$$;
      }
    } else {
      if (this.is_a_root($oldid$$)) {
        return $dbg_log$$("XXX: Attempted to move mountpoint (" + $oldname$jscomp$1$$ + ") - skipped", 4194304), -1;
      }
      if (!this.IsDirectory($oldid$$) && 1 < this.GetInode($oldid$$).nlinks) {
        return $dbg_log$$("XXX: Attempted to move hardlinked file (" + $oldname$jscomp$1$$ + ") across filesystems - skipped", 4194304), -1;
      }
      $diverted_old_idx_olddir$$ = this.divert($olddirid_ret$jscomp$6_ret$jscomp$7$$, $oldname$jscomp$1$$);
      const $old_real_inode$$ = this.GetInode($oldid$$), $data$jscomp$248$$ = await this.Read($diverted_old_idx_olddir$$, 0, $old_real_inode$$.size);
      this.is_forwarder($newdir_ret$jscomp$5_ret$jscomp$8$$) ? ($foreign_fs_new_real_inode_newdirid$$ = this.follow_fs($newdir_ret$jscomp$5_ret$jscomp$8$$), $foreign_id$jscomp$6_newname$jscomp$2$$ = this.IsDirectory($diverted_old_idx_olddir$$) ? $foreign_fs_new_real_inode_newdirid$$.CreateDirectory($foreign_id$jscomp$6_newname$jscomp$2$$, $newdir_ret$jscomp$5_ret$jscomp$8$$.foreign_id) : $foreign_fs_new_real_inode_newdirid$$.CreateFile($foreign_id$jscomp$6_newname$jscomp$2$$, $newdir_ret$jscomp$5_ret$jscomp$8$$.foreign_id), 
      $foreign_fs_new_real_inode_newdirid$$ = $foreign_fs_new_real_inode_newdirid$$.GetInode($foreign_id$jscomp$6_newname$jscomp$2$$), this.copy_inode($old_real_inode$$, $foreign_fs_new_real_inode_newdirid$$), this.set_forwarder($oldid$$, $newdir_ret$jscomp$5_ret$jscomp$8$$.mount_id, $foreign_id$jscomp$6_newname$jscomp$2$$)) : (this.delete_forwarder($inode$jscomp$12$$), this.copy_inode($old_real_inode$$, $inode$jscomp$12$$), this.link_under_dir($foreign_fs_new_real_inode_newdirid$$, $oldid$$, $foreign_id$jscomp$6_newname$jscomp$2$$));
      await this.ChangeSize($oldid$$, $old_real_inode$$.size);
      $data$jscomp$248$$ && $data$jscomp$248$$.length && await this.Write($oldid$$, 0, $data$jscomp$248$$.length, $data$jscomp$248$$);
      if (this.IsDirectory($oldid$$)) {
        for (const $child_filename$$ of this.GetChildren($diverted_old_idx_olddir$$)) {
          if ($newdir_ret$jscomp$5_ret$jscomp$8$$ = await this.Rename($diverted_old_idx_olddir$$, $child_filename$$, $oldid$$, $child_filename$$), 0 > $newdir_ret$jscomp$5_ret$jscomp$8$$) {
            return $newdir_ret$jscomp$5_ret$jscomp$8$$;
          }
        }
      }
      await this.DeleteData($diverted_old_idx_olddir$$);
      $olddirid_ret$jscomp$6_ret$jscomp$7$$ = this.Unlink($olddirid_ret$jscomp$6_ret$jscomp$7$$, $oldname$jscomp$1$$);
      if (0 > $olddirid_ret$jscomp$6_ret$jscomp$7$$) {
        return $olddirid_ret$jscomp$6_ret$jscomp$7$$;
      }
    }
  } else {
    this.unlink_from_dir($olddirid_ret$jscomp$6_ret$jscomp$7$$, $oldname$jscomp$1$$), this.link_under_dir($foreign_fs_new_real_inode_newdirid$$, $oldid$$, $foreign_id$jscomp$6_newname$jscomp$2$$), $inode$jscomp$12$$.qid.version++;
  }
  this.NotifyListeners($oldid$$, "rename", {oldpath:$oldpath$$});
  return 0;
};
$FS$$.prototype.Write = async function($foreign_id$jscomp$7_id$jscomp$20$$, $offset$jscomp$75$$, $count$jscomp$67$$, $buffer$jscomp$54$$) {
  this.NotifyListeners($foreign_id$jscomp$7_id$jscomp$20$$, "write");
  var $inode$jscomp$13$$ = this.inodes[$foreign_id$jscomp$7_id$jscomp$20$$];
  if (this.is_forwarder($inode$jscomp$13$$)) {
    $foreign_id$jscomp$7_id$jscomp$20$$ = $inode$jscomp$13$$.foreign_id, await this.follow_fs($inode$jscomp$13$$).Write($foreign_id$jscomp$7_id$jscomp$20$$, $offset$jscomp$75$$, $count$jscomp$67$$, $buffer$jscomp$54$$);
  } else {
    var $data$jscomp$249$$ = await this.get_buffer($foreign_id$jscomp$7_id$jscomp$20$$);
    !$data$jscomp$249$$ || $data$jscomp$249$$.length < $offset$jscomp$75$$ + $count$jscomp$67$$ ? (await this.ChangeSize($foreign_id$jscomp$7_id$jscomp$20$$, Math.floor(3 * ($offset$jscomp$75$$ + $count$jscomp$67$$) / 2)), $inode$jscomp$13$$.size = $offset$jscomp$75$$ + $count$jscomp$67$$, $data$jscomp$249$$ = await this.get_buffer($foreign_id$jscomp$7_id$jscomp$20$$)) : $inode$jscomp$13$$.size < $offset$jscomp$75$$ + $count$jscomp$67$$ && ($inode$jscomp$13$$.size = $offset$jscomp$75$$ + $count$jscomp$67$$);
    $buffer$jscomp$54$$ && $data$jscomp$249$$.set($buffer$jscomp$54$$.subarray(0, $count$jscomp$67$$), $offset$jscomp$75$$);
    await this.set_data($foreign_id$jscomp$7_id$jscomp$20$$, $data$jscomp$249$$);
  }
};
$FS$$.prototype.Read = async function($foreign_id$jscomp$8_inodeid$jscomp$2$$, $offset$jscomp$76$$, $count$jscomp$68$$) {
  const $inode$jscomp$14$$ = this.inodes[$foreign_id$jscomp$8_inodeid$jscomp$2$$];
  return this.is_forwarder($inode$jscomp$14$$) ? ($foreign_id$jscomp$8_inodeid$jscomp$2$$ = $inode$jscomp$14$$.foreign_id, await this.follow_fs($inode$jscomp$14$$).Read($foreign_id$jscomp$8_inodeid$jscomp$2$$, $offset$jscomp$76$$, $count$jscomp$68$$)) : await this.get_data($foreign_id$jscomp$8_inodeid$jscomp$2$$, $offset$jscomp$76$$, $count$jscomp$68$$);
};
$FS$$.prototype.Search = function($parent_inode$jscomp$8_parentid$jscomp$12$$, $childid_foreign_id$jscomp$9_name$jscomp$102$$) {
  $parent_inode$jscomp$8_parentid$jscomp$12$$ = this.inodes[$parent_inode$jscomp$8_parentid$jscomp$12$$];
  if (this.is_forwarder($parent_inode$jscomp$8_parentid$jscomp$12$$)) {
    const $foreign_parentid$jscomp$6$$ = $parent_inode$jscomp$8_parentid$jscomp$12$$.foreign_id;
    $childid_foreign_id$jscomp$9_name$jscomp$102$$ = this.follow_fs($parent_inode$jscomp$8_parentid$jscomp$12$$).Search($foreign_parentid$jscomp$6$$, $childid_foreign_id$jscomp$9_name$jscomp$102$$);
    return -1 === $childid_foreign_id$jscomp$9_name$jscomp$102$$ ? -1 : this.get_forwarder($parent_inode$jscomp$8_parentid$jscomp$12$$.mount_id, $childid_foreign_id$jscomp$9_name$jscomp$102$$);
  }
  $childid_foreign_id$jscomp$9_name$jscomp$102$$ = $parent_inode$jscomp$8_parentid$jscomp$12$$.direntries.get($childid_foreign_id$jscomp$9_name$jscomp$102$$);
  return void 0 === $childid_foreign_id$jscomp$9_name$jscomp$102$$ ? -1 : $childid_foreign_id$jscomp$9_name$jscomp$102$$;
};
$FS$$.prototype.CountUsedInodes = function() {
  let $count$jscomp$69$$ = this.inodes.length;
  for (const {fs:$fs$jscomp$4$$, backtrack:$backtrack$$} of this.mounts) {
    $count$jscomp$69$$ += $fs$jscomp$4$$.CountUsedInodes(), $count$jscomp$69$$ -= $backtrack$$.size;
  }
  return $count$jscomp$69$$;
};
$FS$$.prototype.CountFreeInodes = function() {
  let $count$jscomp$70$$ = 1048576;
  for (const {fs:$fs$jscomp$5$$} of this.mounts) {
    $count$jscomp$70$$ += $fs$jscomp$5$$.CountFreeInodes();
  }
  return $count$jscomp$70$$;
};
$FS$$.prototype.GetTotalSize = function() {
  let $size$jscomp$43$$ = this.used_size;
  for (const {fs:$fs$jscomp$6$$} of this.mounts) {
    $size$jscomp$43$$ += $fs$jscomp$6$$.GetTotalSize();
  }
  return $size$jscomp$43$$;
};
$FS$$.prototype.GetSpace = function() {
  let $size$jscomp$44$$ = this.total_size;
  for (const {fs:$fs$jscomp$7$$} of this.mounts) {
    $size$jscomp$44$$ += $fs$jscomp$7$$.GetSpace();
  }
  return this.total_size;
};
$FS$$.prototype.GetDirectoryName = function($idx$jscomp$7$$) {
  const $parent_inode$jscomp$9$$ = this.inodes[this.GetParent($idx$jscomp$7$$)];
  if (this.is_forwarder($parent_inode$jscomp$9$$)) {
    return this.follow_fs($parent_inode$jscomp$9$$).GetDirectoryName(this.inodes[$idx$jscomp$7$$].foreign_id);
  }
  if (!$parent_inode$jscomp$9$$) {
    return "";
  }
  for (const [$name$jscomp$103$$, $childid$jscomp$1$$] of $parent_inode$jscomp$9$$.direntries) {
    if ($childid$jscomp$1$$ === $idx$jscomp$7$$) {
      return $name$jscomp$103$$;
    }
  }
  $dbg_assert$$(!1, "Filesystem: Found directory inode whose parent doesn't link to it");
  return "";
};
$FS$$.prototype.GetFullPath = function($idx$jscomp$8$$) {
  $dbg_assert$$(this.IsDirectory($idx$jscomp$8$$), "Filesystem: Cannot get full path of non-directory inode");
  for (var $path$jscomp$7$$ = ""; 0 !== $idx$jscomp$8$$;) {
    $path$jscomp$7$$ = "/" + this.GetDirectoryName($idx$jscomp$8$$) + $path$jscomp$7$$, $idx$jscomp$8$$ = this.GetParent($idx$jscomp$8$$);
  }
  return $path$jscomp$7$$.substring(1);
};
$FS$$.prototype.Link = function($parentid$jscomp$13$$, $targetid$$, $name$jscomp$104$$) {
  if (this.IsDirectory($targetid$$)) {
    return -1;
  }
  const $parent_inode$jscomp$10$$ = this.inodes[$parentid$jscomp$13$$], $inode$jscomp$15$$ = this.inodes[$targetid$$];
  if (this.is_forwarder($parent_inode$jscomp$10$$)) {
    return this.is_forwarder($inode$jscomp$15$$) && $inode$jscomp$15$$.mount_id === $parent_inode$jscomp$10$$.mount_id ? this.follow_fs($parent_inode$jscomp$10$$).Link($parent_inode$jscomp$10$$.foreign_id, $inode$jscomp$15$$.foreign_id, $name$jscomp$104$$) : ($dbg_log$$("XXX: Attempted to hardlink a file into a child filesystem - skipped", 4194304), -1);
  }
  if (this.is_forwarder($inode$jscomp$15$$)) {
    return $dbg_log$$("XXX: Attempted to hardlink file across filesystems - skipped", 4194304), -1;
  }
  this.link_under_dir($parentid$jscomp$13$$, $targetid$$, $name$jscomp$104$$);
  return 0;
};
$FS$$.prototype.Unlink = function($foreign_parentid$jscomp$7_parentid$jscomp$14$$, $name$jscomp$105$$) {
  if ("." === $name$jscomp$105$$ || ".." === $name$jscomp$105$$) {
    return -1;
  }
  const $idx$jscomp$9$$ = this.Search($foreign_parentid$jscomp$7_parentid$jscomp$14$$, $name$jscomp$105$$), $inode$jscomp$16$$ = this.inodes[$idx$jscomp$9$$], $parent_inode$jscomp$11$$ = this.inodes[$foreign_parentid$jscomp$7_parentid$jscomp$14$$];
  if (this.is_forwarder($parent_inode$jscomp$11$$)) {
    return $dbg_assert$$(this.is_forwarder($inode$jscomp$16$$), "Children of forwarders should be forwarders"), $foreign_parentid$jscomp$7_parentid$jscomp$14$$ = $parent_inode$jscomp$11$$.foreign_id, this.follow_fs($parent_inode$jscomp$11$$).Unlink($foreign_parentid$jscomp$7_parentid$jscomp$14$$, $name$jscomp$105$$);
  }
  if (this.IsDirectory($idx$jscomp$9$$) && !this.IsEmpty($idx$jscomp$9$$)) {
    return -39;
  }
  this.unlink_from_dir($foreign_parentid$jscomp$7_parentid$jscomp$14$$, $name$jscomp$105$$);
  0 === $inode$jscomp$16$$.nlinks && ($inode$jscomp$16$$.status = $STATUS_UNLINKED$$, this.NotifyListeners($idx$jscomp$9$$, "delete"));
  return 0;
};
$FS$$.prototype.DeleteData = async function($idx$jscomp$10$$) {
  const $inode$jscomp$17$$ = this.inodes[$idx$jscomp$10$$];
  this.is_forwarder($inode$jscomp$17$$) ? await this.follow_fs($inode$jscomp$17$$).DeleteData($inode$jscomp$17$$.foreign_id) : ($inode$jscomp$17$$.size = 0, delete this.inodedata[$idx$jscomp$10$$]);
};
$FS$$.prototype.get_buffer = async function($idx$jscomp$11$$) {
  const $inode$jscomp$18$$ = this.inodes[$idx$jscomp$11$$];
  $dbg_assert$$($inode$jscomp$18$$, `Filesystem get_buffer: idx ${$idx$jscomp$11$$} does not point to an inode`);
  return this.inodedata[$idx$jscomp$11$$] ? this.inodedata[$idx$jscomp$11$$] : 2 === $inode$jscomp$18$$.status ? ($dbg_assert$$($inode$jscomp$18$$.sha256sum, "Filesystem get_data: found inode on server without sha256sum"), await this.storage.read($inode$jscomp$18$$.sha256sum, 0, $inode$jscomp$18$$.size)) : null;
};
$FS$$.prototype.get_data = async function($idx$jscomp$12$$, $offset$jscomp$77$$, $count$jscomp$71$$) {
  const $inode$jscomp$19$$ = this.inodes[$idx$jscomp$12$$];
  $dbg_assert$$($inode$jscomp$19$$, `Filesystem get_data: idx ${$idx$jscomp$12$$} does not point to an inode`);
  return this.inodedata[$idx$jscomp$12$$] ? this.inodedata[$idx$jscomp$12$$].subarray($offset$jscomp$77$$, $offset$jscomp$77$$ + $count$jscomp$71$$) : 2 === $inode$jscomp$19$$.status ? ($dbg_assert$$($inode$jscomp$19$$.sha256sum, "Filesystem get_data: found inode on server without sha256sum"), await this.storage.read($inode$jscomp$19$$.sha256sum, $offset$jscomp$77$$, $count$jscomp$71$$)) : null;
};
$FS$$.prototype.set_data = async function($idx$jscomp$13$$, $buffer$jscomp$55$$) {
  this.inodedata[$idx$jscomp$13$$] = $buffer$jscomp$55$$;
  2 === this.inodes[$idx$jscomp$13$$].status && (this.inodes[$idx$jscomp$13$$].status = 0, this.storage.uncache(this.inodes[$idx$jscomp$13$$].sha256sum));
};
$FS$$.prototype.GetInode = function($idx$jscomp$14_inode$jscomp$20$$) {
  $dbg_assert$$(!isNaN($idx$jscomp$14_inode$jscomp$20$$), "Filesystem GetInode: NaN idx");
  $dbg_assert$$(0 <= $idx$jscomp$14_inode$jscomp$20$$ && $idx$jscomp$14_inode$jscomp$20$$ < this.inodes.length, "Filesystem GetInode: out of range idx:" + $idx$jscomp$14_inode$jscomp$20$$);
  $idx$jscomp$14_inode$jscomp$20$$ = this.inodes[$idx$jscomp$14_inode$jscomp$20$$];
  return this.is_forwarder($idx$jscomp$14_inode$jscomp$20$$) ? this.follow_fs($idx$jscomp$14_inode$jscomp$20$$).GetInode($idx$jscomp$14_inode$jscomp$20$$.foreign_id) : $idx$jscomp$14_inode$jscomp$20$$;
};
$FS$$.prototype.ChangeSize = async function($idx$jscomp$15$$, $newsize$$) {
  var $inode$jscomp$21$$ = this.GetInode($idx$jscomp$15$$), $temp$$ = await this.get_data($idx$jscomp$15$$, 0, $inode$jscomp$21$$.size);
  if ($newsize$$ !== $inode$jscomp$21$$.size) {
    var $data$jscomp$250$$ = new Uint8Array($newsize$$);
    $inode$jscomp$21$$.size = $newsize$$;
    $temp$$ && $data$jscomp$250$$.set($temp$$.subarray(0, Math.min($temp$$.length, $inode$jscomp$21$$.size)), 0);
    await this.set_data($idx$jscomp$15$$, $data$jscomp$250$$);
  }
};
$FS$$.prototype.SearchPath = function($path$jscomp$8_walk$jscomp$1$$) {
  $path$jscomp$8_walk$jscomp$1$$ = $path$jscomp$8_walk$jscomp$1$$.replace("//", "/");
  $path$jscomp$8_walk$jscomp$1$$ = $path$jscomp$8_walk$jscomp$1$$.split("/");
  0 < $path$jscomp$8_walk$jscomp$1$$.length && 0 === $path$jscomp$8_walk$jscomp$1$$[$path$jscomp$8_walk$jscomp$1$$.length - 1].length && $path$jscomp$8_walk$jscomp$1$$.pop();
  0 < $path$jscomp$8_walk$jscomp$1$$.length && 0 === $path$jscomp$8_walk$jscomp$1$$[0].length && $path$jscomp$8_walk$jscomp$1$$.shift();
  const $n$jscomp$14$$ = $path$jscomp$8_walk$jscomp$1$$.length;
  var $parentid$jscomp$15$$ = -1, $id$jscomp$21$$ = 0;
  let $forward_path$$ = null;
  for (var $i$jscomp$139$$ = 0; $i$jscomp$139$$ < $n$jscomp$14$$; $i$jscomp$139$$++) {
    if ($parentid$jscomp$15$$ = $id$jscomp$21$$, $id$jscomp$21$$ = this.Search($parentid$jscomp$15$$, $path$jscomp$8_walk$jscomp$1$$[$i$jscomp$139$$]), !$forward_path$$ && this.is_forwarder(this.inodes[$parentid$jscomp$15$$]) && ($forward_path$$ = "/" + $path$jscomp$8_walk$jscomp$1$$.slice($i$jscomp$139$$).join("/")), -1 === $id$jscomp$21$$) {
      return $i$jscomp$139$$ < $n$jscomp$14$$ - 1 ? {id:-1, parentid:-1, name:$path$jscomp$8_walk$jscomp$1$$[$i$jscomp$139$$], forward_path:$forward_path$$} : {id:-1, parentid:$parentid$jscomp$15$$, name:$path$jscomp$8_walk$jscomp$1$$[$i$jscomp$139$$], forward_path:$forward_path$$};
    }
  }
  return {id:$id$jscomp$21$$, parentid:$parentid$jscomp$15$$, name:$path$jscomp$8_walk$jscomp$1$$[$i$jscomp$139$$], forward_path:$forward_path$$};
};
$FS$$.prototype.GetRecursiveList = function($dirid_i$jscomp$140$$, $list$$) {
  if (this.is_forwarder(this.inodes[$dirid_i$jscomp$140$$])) {
    const $foreign_fs$jscomp$1$$ = this.follow_fs(this.inodes[$dirid_i$jscomp$140$$]), $mount_id$$ = this.inodes[$dirid_i$jscomp$140$$].mount_id, $foreign_start$$ = $list$$.length;
    $foreign_fs$jscomp$1$$.GetRecursiveList(this.inodes[$dirid_i$jscomp$140$$].foreign_id, $list$$);
    for ($dirid_i$jscomp$140$$ = $foreign_start$$; $dirid_i$jscomp$140$$ < $list$$.length; $dirid_i$jscomp$140$$++) {
      $list$$[$dirid_i$jscomp$140$$].parentid = this.get_forwarder($mount_id$$, $list$$[$dirid_i$jscomp$140$$].parentid);
    }
  } else {
    for (const [$name$jscomp$106$$, $id$jscomp$22$$] of this.inodes[$dirid_i$jscomp$140$$].direntries) {
      "." !== $name$jscomp$106$$ && ".." !== $name$jscomp$106$$ && ($list$$.push({parentid:$dirid_i$jscomp$140$$, name:$name$jscomp$106$$}), this.IsDirectory($id$jscomp$22$$) && this.GetRecursiveList($id$jscomp$22$$, $list$$));
    }
  }
};
$FS$$.prototype.RecursiveDelete = function($i$jscomp$141_ids_path$jscomp$9$$) {
  var $toDelete$$ = [];
  $i$jscomp$141_ids_path$jscomp$9$$ = this.SearchPath($i$jscomp$141_ids_path$jscomp$9$$);
  if (-1 !== $i$jscomp$141_ids_path$jscomp$9$$.id) {
    for (this.GetRecursiveList($i$jscomp$141_ids_path$jscomp$9$$.id, $toDelete$$), $i$jscomp$141_ids_path$jscomp$9$$ = $toDelete$$.length - 1; 0 <= $i$jscomp$141_ids_path$jscomp$9$$; $i$jscomp$141_ids_path$jscomp$9$$--) {
      const $ret$jscomp$9$$ = this.Unlink($toDelete$$[$i$jscomp$141_ids_path$jscomp$9$$].parentid, $toDelete$$[$i$jscomp$141_ids_path$jscomp$9$$].name);
      $dbg_assert$$(0 === $ret$jscomp$9$$, "Filesystem RecursiveDelete failed at parent=" + $toDelete$$[$i$jscomp$141_ids_path$jscomp$9$$].parentid + ", name='" + $toDelete$$[$i$jscomp$141_ids_path$jscomp$9$$].name + "' with error code: " + -$ret$jscomp$9$$);
    }
  }
};
$FS$$.prototype.DeleteNode = function($path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$) {
  var $ids$jscomp$1$$ = this.SearchPath($path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$);
  -1 !== $ids$jscomp$1$$.id && ((this.inodes[$ids$jscomp$1$$.id].mode & 61440) === $S_IFREG$$ ? ($path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$ = this.Unlink($ids$jscomp$1$$.parentid, $ids$jscomp$1$$.name), $dbg_assert$$(0 === $path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$, "Filesystem DeleteNode failed with error code: " + -$path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$)) : (this.inodes[$ids$jscomp$1$$.id].mode & 61440) === $S_IFDIR$$ && (this.RecursiveDelete($path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$), 
  $path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$ = this.Unlink($ids$jscomp$1$$.parentid, $ids$jscomp$1$$.name), $dbg_assert$$(0 === $path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$, "Filesystem DeleteNode failed with error code: " + -$path$jscomp$10_ret$jscomp$10_ret$jscomp$11$$)));
};
$FS$$.prototype.NotifyListeners = function() {
};
$FS$$.prototype.Check = function() {
  for (var $i$jscomp$142$$ = 1; $i$jscomp$142$$ < this.inodes.length; $i$jscomp$142$$++) {
    if (-1 !== this.inodes[$i$jscomp$142$$].status) {
      var $inode$jscomp$22_inode$jscomp$23$$ = this.GetInode($i$jscomp$142$$);
      0 > $inode$jscomp$22_inode$jscomp$23$$.nlinks && $message$$.Debug("Error in filesystem: negative nlinks=" + $inode$jscomp$22_inode$jscomp$23$$.nlinks + " at id =" + $i$jscomp$142$$);
      if (this.IsDirectory($i$jscomp$142$$)) {
        $inode$jscomp$22_inode$jscomp$23$$ = this.GetInode($i$jscomp$142$$);
        this.IsDirectory($i$jscomp$142$$) && 0 > this.GetParent($i$jscomp$142$$) && $message$$.Debug("Error in filesystem: negative parent id " + $i$jscomp$142$$);
        for (const [$name$jscomp$107$$, $id$jscomp$24$$] of $inode$jscomp$22_inode$jscomp$23$$.direntries) {
          0 === $name$jscomp$107$$.length && $message$$.Debug("Error in filesystem: inode with no name and id " + $id$jscomp$24$$);
          for (const $c$jscomp$3$$ of $name$jscomp$107$$) {
            32 > $c$jscomp$3$$ && $message$$.Debug("Error in filesystem: Unallowed char in filename");
          }
        }
      }
    }
  }
};
$FS$$.prototype.FillDirectory = function($data$jscomp$251_dirid$jscomp$1$$) {
  var $child$jscomp$1_inode$jscomp$24$$ = this.inodes[$data$jscomp$251_dirid$jscomp$1$$];
  if (this.is_forwarder($child$jscomp$1_inode$jscomp$24$$)) {
    this.follow_fs($child$jscomp$1_inode$jscomp$24$$).FillDirectory($child$jscomp$1_inode$jscomp$24$$.foreign_id);
  } else {
    var $offset$jscomp$78_size$jscomp$46$$ = 0;
    for (const $name$jscomp$108$$ of $child$jscomp$1_inode$jscomp$24$$.direntries.keys()) {
      $offset$jscomp$78_size$jscomp$46$$ += 24 + $texten$$.encode($name$jscomp$108$$).length;
    }
    $data$jscomp$251_dirid$jscomp$1$$ = this.inodedata[$data$jscomp$251_dirid$jscomp$1$$] = new Uint8Array($offset$jscomp$78_size$jscomp$46$$);
    $child$jscomp$1_inode$jscomp$24$$.size = $offset$jscomp$78_size$jscomp$46$$;
    $offset$jscomp$78_size$jscomp$46$$ = 0;
    for (const [$name$jscomp$109$$, $id$jscomp$25$$] of $child$jscomp$1_inode$jscomp$24$$.direntries) {
      $child$jscomp$1_inode$jscomp$24$$ = this.GetInode($id$jscomp$25$$), $offset$jscomp$78_size$jscomp$46$$ += $marshall$$.Marshall(["Q", "d", "b", "s"], [$child$jscomp$1_inode$jscomp$24$$.qid, $offset$jscomp$78_size$jscomp$46$$ + 13 + 8 + 1 + 2 + $texten$$.encode($name$jscomp$109$$).length, $child$jscomp$1_inode$jscomp$24$$.mode >> 12, $name$jscomp$109$$], $data$jscomp$251_dirid$jscomp$1$$, $offset$jscomp$78_size$jscomp$46$$);
    }
  }
};
$FS$$.prototype.RoundToDirentry = function($dirid$jscomp$2_offset$jscomp$79$$, $offset_target$$) {
  const $data$jscomp$252$$ = this.inodedata[$dirid$jscomp$2_offset$jscomp$79$$];
  $dbg_assert$$($data$jscomp$252$$, `FS directory data for dirid=${$dirid$jscomp$2_offset$jscomp$79$$} should be generated`);
  $dbg_assert$$($data$jscomp$252$$.length, "FS directory should have at least an entry");
  if ($offset_target$$ >= $data$jscomp$252$$.length) {
    return $data$jscomp$252$$.length;
  }
  for ($dirid$jscomp$2_offset$jscomp$79$$ = 0;;) {
    const $next_offset$$ = $marshall$$.Unmarshall(["Q", "d"], $data$jscomp$252$$, {offset:$dirid$jscomp$2_offset$jscomp$79$$})[1];
    if ($next_offset$$ > $offset_target$$) {
      break;
    }
    $dirid$jscomp$2_offset$jscomp$79$$ = $next_offset$$;
  }
  return $dirid$jscomp$2_offset$jscomp$79$$;
};
$FS$$.prototype.IsDirectory = function($idx$jscomp$16_inode$jscomp$25$$) {
  $idx$jscomp$16_inode$jscomp$25$$ = this.inodes[$idx$jscomp$16_inode$jscomp$25$$];
  return this.is_forwarder($idx$jscomp$16_inode$jscomp$25$$) ? this.follow_fs($idx$jscomp$16_inode$jscomp$25$$).IsDirectory($idx$jscomp$16_inode$jscomp$25$$.foreign_id) : ($idx$jscomp$16_inode$jscomp$25$$.mode & 61440) === $S_IFDIR$$;
};
$FS$$.prototype.IsEmpty = function($idx$jscomp$17_inode$jscomp$26$$) {
  $idx$jscomp$17_inode$jscomp$26$$ = this.inodes[$idx$jscomp$17_inode$jscomp$26$$];
  if (this.is_forwarder($idx$jscomp$17_inode$jscomp$26$$)) {
    return this.follow_fs($idx$jscomp$17_inode$jscomp$26$$).IsDirectory($idx$jscomp$17_inode$jscomp$26$$.foreign_id);
  }
  for (const $name$jscomp$110$$ of $idx$jscomp$17_inode$jscomp$26$$.direntries.keys()) {
    if ("." !== $name$jscomp$110$$ && ".." !== $name$jscomp$110$$) {
      return !1;
    }
  }
  return !0;
};
$FS$$.prototype.GetChildren = function($idx$jscomp$18_inode$jscomp$27$$) {
  $dbg_assert$$(this.IsDirectory($idx$jscomp$18_inode$jscomp$27$$), "Filesystem: cannot get children of non-directory inode");
  $idx$jscomp$18_inode$jscomp$27$$ = this.inodes[$idx$jscomp$18_inode$jscomp$27$$];
  if (this.is_forwarder($idx$jscomp$18_inode$jscomp$27$$)) {
    return this.follow_fs($idx$jscomp$18_inode$jscomp$27$$).GetChildren($idx$jscomp$18_inode$jscomp$27$$.foreign_id);
  }
  const $children$jscomp$3$$ = [];
  for (const $name$jscomp$111$$ of $idx$jscomp$18_inode$jscomp$27$$.direntries.keys()) {
    "." !== $name$jscomp$111$$ && ".." !== $name$jscomp$111$$ && $children$jscomp$3$$.push($name$jscomp$111$$);
  }
  return $children$jscomp$3$$;
};
$FS$$.prototype.GetParent = function($idx$jscomp$19_inode$jscomp$28$$) {
  $dbg_assert$$(this.IsDirectory($idx$jscomp$19_inode$jscomp$28$$), "Filesystem: cannot get parent of non-directory inode");
  $idx$jscomp$19_inode$jscomp$28$$ = this.inodes[$idx$jscomp$19_inode$jscomp$28$$];
  if (this.should_be_linked($idx$jscomp$19_inode$jscomp$28$$)) {
    return $idx$jscomp$19_inode$jscomp$28$$.direntries.get("..");
  }
  const $foreign_dirid$jscomp$1$$ = this.follow_fs($idx$jscomp$19_inode$jscomp$28$$).GetParent($idx$jscomp$19_inode$jscomp$28$$.foreign_id);
  $dbg_assert$$(-1 !== $foreign_dirid$jscomp$1$$, "Filesystem: should not have invalid parent ids");
  return this.get_forwarder($idx$jscomp$19_inode$jscomp$28$$.mount_id, $foreign_dirid$jscomp$1$$);
};
$FS$$.prototype.PrepareCAPs = function($id$jscomp$26_inode$jscomp$29$$) {
  $id$jscomp$26_inode$jscomp$29$$ = this.GetInode($id$jscomp$26_inode$jscomp$29$$);
  if ($id$jscomp$26_inode$jscomp$29$$.caps) {
    return $id$jscomp$26_inode$jscomp$29$$.caps.length;
  }
  $id$jscomp$26_inode$jscomp$29$$.caps = new Uint8Array(20);
  $id$jscomp$26_inode$jscomp$29$$.caps[0] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[1] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[2] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[3] = 2;
  $id$jscomp$26_inode$jscomp$29$$.caps[4] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[5] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[6] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[7] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[8] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[9] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[10] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[11] = 255;
  $id$jscomp$26_inode$jscomp$29$$.caps[12] = 63;
  $id$jscomp$26_inode$jscomp$29$$.caps[13] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[14] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[15] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[16] = 63;
  $id$jscomp$26_inode$jscomp$29$$.caps[17] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[18] = 0;
  $id$jscomp$26_inode$jscomp$29$$.caps[19] = 0;
  return $id$jscomp$26_inode$jscomp$29$$.caps.length;
};
function $FSMountInfo$$($filesystem$jscomp$2$$) {
  this.fs = $filesystem$jscomp$2$$;
  this.backtrack = new Map;
}
$FSMountInfo$$.prototype.get_state = function() {
  const $state$jscomp$60$$ = [];
  $state$jscomp$60$$[0] = this.fs;
  $state$jscomp$60$$[1] = [...this.backtrack];
  return $state$jscomp$60$$;
};
$FSMountInfo$$.prototype.set_state = function($state$jscomp$61$$) {
  this.fs = $state$jscomp$61$$[0];
  this.backtrack = new Map($state$jscomp$61$$[1]);
};
$FS$$.prototype.set_forwarder = function($idx$jscomp$20$$, $mount_id$jscomp$1$$, $foreign_id$jscomp$10$$) {
  const $inode$jscomp$30$$ = this.inodes[$idx$jscomp$20$$];
  $dbg_assert$$(0 === $inode$jscomp$30$$.nlinks, "Filesystem: attempted to convert an inode into forwarder before unlinking the inode");
  this.is_forwarder($inode$jscomp$30$$) && this.mounts[$inode$jscomp$30$$.mount_id].backtrack.delete($inode$jscomp$30$$.foreign_id);
  $inode$jscomp$30$$.status = 5;
  $inode$jscomp$30$$.mount_id = $mount_id$jscomp$1$$;
  $inode$jscomp$30$$.foreign_id = $foreign_id$jscomp$10$$;
  this.mounts[$mount_id$jscomp$1$$].backtrack.set($foreign_id$jscomp$10$$, $idx$jscomp$20$$);
};
$FS$$.prototype.create_forwarder = function($mount_id$jscomp$2$$, $foreign_id$jscomp$11$$) {
  const $inode$jscomp$31$$ = this.CreateInode(), $idx$jscomp$21$$ = this.inodes.length;
  this.inodes.push($inode$jscomp$31$$);
  $inode$jscomp$31$$.fid = $idx$jscomp$21$$;
  this.set_forwarder($idx$jscomp$21$$, $mount_id$jscomp$2$$, $foreign_id$jscomp$11$$);
  return $idx$jscomp$21$$;
};
$FS$$.prototype.is_forwarder = function($inode$jscomp$32$$) {
  return 5 === $inode$jscomp$32$$.status;
};
$FS$$.prototype.is_a_root = function($idx$jscomp$22$$) {
  return 0 === this.GetInode($idx$jscomp$22$$).fid;
};
$FS$$.prototype.get_forwarder = function($mount_id$jscomp$3$$, $foreign_id$jscomp$12$$) {
  var $mount_result$jscomp$21$$ = this.mounts[$mount_id$jscomp$3$$];
  $dbg_assert$$(0 <= $foreign_id$jscomp$12$$, "Filesystem get_forwarder: invalid foreign_id: " + $foreign_id$jscomp$12$$);
  $dbg_assert$$($mount_result$jscomp$21$$, "Filesystem get_forwarder: invalid mount number: " + $mount_id$jscomp$3$$);
  $mount_result$jscomp$21$$ = $mount_result$jscomp$21$$.backtrack.get($foreign_id$jscomp$12$$);
  return void 0 === $mount_result$jscomp$21$$ ? this.create_forwarder($mount_id$jscomp$3$$, $foreign_id$jscomp$12$$) : $mount_result$jscomp$21$$;
};
$FS$$.prototype.delete_forwarder = function($inode$jscomp$33$$) {
  $dbg_assert$$(this.is_forwarder($inode$jscomp$33$$), "Filesystem delete_forwarder: expected forwarder");
  $inode$jscomp$33$$.status = -1;
  this.mounts[$inode$jscomp$33$$.mount_id].backtrack.delete($inode$jscomp$33$$.foreign_id);
};
$FS$$.prototype.follow_fs = function($inode$jscomp$34$$) {
  const $mount$jscomp$1$$ = this.mounts[$inode$jscomp$34$$.mount_id];
  $dbg_assert$$(this.is_forwarder($inode$jscomp$34$$), "Filesystem follow_fs: inode should be a forwarding inode");
  $dbg_assert$$($mount$jscomp$1$$, "Filesystem follow_fs: inode<id=" + $inode$jscomp$34$$.fid + "> should point to valid mounted FS");
  return $mount$jscomp$1$$.fs;
};
$FS$$.prototype.Mount = function($mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$, $fs$jscomp$8_idx$jscomp$23$$) {
  $dbg_assert$$($fs$jscomp$8_idx$jscomp$23$$.qidcounter === this.qidcounter, "Cannot mount filesystem whose qid numbers aren't synchronised with current filesystem.");
  var $path_infos$jscomp$1_ret$jscomp$12$$ = this.SearchPath($mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$);
  if (-1 === $path_infos$jscomp$1_ret$jscomp$12$$.parentid) {
    return $dbg_log$$("Mount failed: parent for path not found: " + $mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$, 4194304), -2;
  }
  if (-1 !== $path_infos$jscomp$1_ret$jscomp$12$$.id) {
    return $dbg_log$$("Mount failed: file already exists at path: " + $mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$, 4194304), -17;
  }
  if ($path_infos$jscomp$1_ret$jscomp$12$$.forward_path) {
    return $mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$ = this.inodes[$path_infos$jscomp$1_ret$jscomp$12$$.parentid], $path_infos$jscomp$1_ret$jscomp$12$$ = this.follow_fs($mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$).Mount($path_infos$jscomp$1_ret$jscomp$12$$.forward_path, $fs$jscomp$8_idx$jscomp$23$$), 0 > $path_infos$jscomp$1_ret$jscomp$12$$ ? $path_infos$jscomp$1_ret$jscomp$12$$ : this.get_forwarder($mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$.mount_id, $path_infos$jscomp$1_ret$jscomp$12$$);
  }
  $mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$ = this.mounts.length;
  this.mounts.push(new $FSMountInfo$$($fs$jscomp$8_idx$jscomp$23$$));
  $fs$jscomp$8_idx$jscomp$23$$ = this.create_forwarder($mount_id$jscomp$4_parent$jscomp$6_path$jscomp$11$$, 0);
  this.link_under_dir($path_infos$jscomp$1_ret$jscomp$12$$.parentid, $fs$jscomp$8_idx$jscomp$23$$, $path_infos$jscomp$1_ret$jscomp$12$$.name);
  return $fs$jscomp$8_idx$jscomp$23$$;
};
function $FSLockRegion$$() {
  this.type = 2;
  this.start = 0;
  this.length = Infinity;
  this.proc_id = -1;
  this.client_id = "";
}
$FSLockRegion$$.prototype.get_state = function() {
  const $state$jscomp$62$$ = [];
  $state$jscomp$62$$[0] = this.type;
  $state$jscomp$62$$[1] = this.start;
  $state$jscomp$62$$[2] = Infinity === this.length ? 0 : this.length;
  $state$jscomp$62$$[3] = this.proc_id;
  $state$jscomp$62$$[4] = this.client_id;
  return $state$jscomp$62$$;
};
$FSLockRegion$$.prototype.set_state = function($state$jscomp$63$$) {
  this.type = $state$jscomp$63$$[0];
  this.start = $state$jscomp$63$$[1];
  this.length = 0 === $state$jscomp$63$$[2] ? Infinity : $state$jscomp$63$$[2];
  this.proc_id = $state$jscomp$63$$[3];
  this.client_id = $state$jscomp$63$$[4];
};
$FSLockRegion$$.prototype.clone = function() {
  const $new_region$$ = new $FSLockRegion$$;
  $new_region$$.set_state(this.get_state());
  return $new_region$$;
};
$FSLockRegion$$.prototype.conflicts_with = function($region$$) {
  return this.proc_id === $region$$.proc_id && this.client_id === $region$$.client_id || 2 === this.type || 2 === $region$$.type || 1 !== this.type && 1 !== $region$$.type || this.start + this.length <= $region$$.start || $region$$.start + $region$$.length <= this.start ? !1 : !0;
};
$FSLockRegion$$.prototype.is_alike = function($region$jscomp$1$$) {
  return $region$jscomp$1$$.proc_id === this.proc_id && $region$jscomp$1$$.client_id === this.client_id && $region$jscomp$1$$.type === this.type;
};
$FSLockRegion$$.prototype.may_merge_after = function($region$jscomp$2$$) {
  return this.is_alike($region$jscomp$2$$) && $region$jscomp$2$$.start + $region$jscomp$2$$.length === this.start;
};
$FS$$.prototype.DescribeLock = function($type$jscomp$158$$, $start$jscomp$51$$, $length$jscomp$29$$, $proc_id$$, $client_id$$) {
  $dbg_assert$$(0 === $type$jscomp$158$$ || 1 === $type$jscomp$158$$ || 2 === $type$jscomp$158$$, "Filesystem: Invalid lock type: " + $type$jscomp$158$$);
  $dbg_assert$$(0 <= $start$jscomp$51$$, "Filesystem: Invalid negative lock starting offset: " + $start$jscomp$51$$);
  $dbg_assert$$(0 < $length$jscomp$29$$, "Filesystem: Invalid non-positive lock length: " + $length$jscomp$29$$);
  const $lock$jscomp$1$$ = new $FSLockRegion$$;
  $lock$jscomp$1$$.type = $type$jscomp$158$$;
  $lock$jscomp$1$$.start = $start$jscomp$51$$;
  $lock$jscomp$1$$.length = $length$jscomp$29$$;
  $lock$jscomp$1$$.proc_id = $proc_id$$;
  $lock$jscomp$1$$.client_id = $client_id$$;
  return $lock$jscomp$1$$;
};
$FS$$.prototype.GetLock = function($id$jscomp$27_inode$jscomp$35$$, $request$jscomp$5$$) {
  $id$jscomp$27_inode$jscomp$35$$ = this.inodes[$id$jscomp$27_inode$jscomp$35$$];
  if (this.is_forwarder($id$jscomp$27_inode$jscomp$35$$)) {
    var $foreign_id$jscomp$13_region$jscomp$3$$ = $id$jscomp$27_inode$jscomp$35$$.foreign_id;
    return this.follow_fs($id$jscomp$27_inode$jscomp$35$$).GetLock($foreign_id$jscomp$13_region$jscomp$3$$, $request$jscomp$5$$);
  }
  for ($foreign_id$jscomp$13_region$jscomp$3$$ of $id$jscomp$27_inode$jscomp$35$$.locks) {
    if ($request$jscomp$5$$.conflicts_with($foreign_id$jscomp$13_region$jscomp$3$$)) {
      return $foreign_id$jscomp$13_region$jscomp$3$$.clone();
    }
  }
  return null;
};
$FS$$.prototype.Lock = function($foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$, $request$jscomp$6$$, $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$) {
  const $inode$jscomp$36$$ = this.inodes[$foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$];
  if (this.is_forwarder($inode$jscomp$36$$)) {
    return $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$ = $inode$jscomp$36$$.foreign_id, this.follow_fs($inode$jscomp$36$$).Lock($foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$, $request$jscomp$6$$, $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$);
  }
  $request$jscomp$6$$ = $request$jscomp$6$$.clone();
  if (2 !== $request$jscomp$6$$.type && this.GetLock($foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$, $request$jscomp$6$$)) {
    return 1;
  }
  for ($flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$ = 0; $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$ < $inode$jscomp$36$$.locks.length; $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$++) {
    $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$ = $inode$jscomp$36$$.locks[$flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$];
    $dbg_assert$$(0 < $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.length, "Filesystem: Found non-positive lock region length: " + $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.length);
    $dbg_assert$$(0 === $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.type || 1 === $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.type, "Filesystem: Found invalid lock type: " + $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.type);
    $dbg_assert$$(!$inode$jscomp$36$$.locks[$flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$ - 1] || $inode$jscomp$36$$.locks[$flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$ - 1].start <= $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.start, "Filesystem: Locks should be sorted by starting offset");
    if ($foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.start + $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.length <= $request$jscomp$6$$.start) {
      continue;
    }
    if ($request$jscomp$6$$.start + $request$jscomp$6$$.length <= $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.start) {
      break;
    }
    if ($foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.proc_id !== $request$jscomp$6$$.proc_id || $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.client_id !== $request$jscomp$6$$.client_id) {
      $dbg_assert$$(!$foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.conflicts_with($request$jscomp$6$$), "Filesytem: Found conflicting lock region, despite already checked for conflicts");
      continue;
    }
    var $i$jscomp$144_start2$$ = $request$jscomp$6$$.start + $request$jscomp$6$$.length;
    const $length1$$ = $request$jscomp$6$$.start - $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.start, $length2$$ = $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.start + $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.length - $i$jscomp$144_start2$$;
    if (0 < $length1$$ && 0 < $length2$$ && $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.type === $request$jscomp$6$$.type) {
      return 0;
    }
    0 < $length1$$ && ($foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.length = $length1$$);
    if (0 >= $length1$$ && 0 < $length2$$) {
      $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.start = $i$jscomp$144_start2$$, $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.length = $length2$$;
    } else {
      if (0 < $length2$$) {
        for (; $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$ < $inode$jscomp$36$$.locks.length && $inode$jscomp$36$$.locks[$flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$].start < $i$jscomp$144_start2$$;) {
          $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$++;
        }
        $inode$jscomp$36$$.locks.splice($flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$, 0, this.DescribeLock($foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.type, $i$jscomp$144_start2$$, $length2$$, $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.proc_id, $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$.client_id));
      } else {
        0 >= $length1$$ && ($inode$jscomp$36$$.locks.splice($flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$, 1), $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$--);
      }
    }
  }
  if (2 !== $request$jscomp$6$$.type) {
    $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$ = $request$jscomp$6$$;
    $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$ = !1;
    for ($i$jscomp$144_start2$$ = 0; $i$jscomp$144_start2$$ < $inode$jscomp$36$$.locks.length && !($flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$.may_merge_after($inode$jscomp$36$$.locks[$i$jscomp$144_start2$$]) && ($inode$jscomp$36$$.locks[$i$jscomp$144_start2$$].length += $request$jscomp$6$$.length, $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$ = $inode$jscomp$36$$.locks[$i$jscomp$144_start2$$], $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$ = !0), $request$jscomp$6$$.start <= 
    $inode$jscomp$36$$.locks[$i$jscomp$144_start2$$].start); $i$jscomp$144_start2$$++) {
    }
    $foreign_id$jscomp$14_has_merged_id$jscomp$28_region$jscomp$4$$ || ($inode$jscomp$36$$.locks.splice($i$jscomp$144_start2$$, 0, $flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$), $i$jscomp$144_start2$$++);
    for (; $i$jscomp$144_start2$$ < $inode$jscomp$36$$.locks.length; $i$jscomp$144_start2$$++) {
      if ($inode$jscomp$36$$.locks[$i$jscomp$144_start2$$].is_alike($flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$)) {
        $inode$jscomp$36$$.locks[$i$jscomp$144_start2$$].may_merge_after($flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$) && ($flags$jscomp$17_i$jscomp$143_new_region$jscomp$1$$.length += $inode$jscomp$36$$.locks[$i$jscomp$144_start2$$].length, $inode$jscomp$36$$.locks.splice($i$jscomp$144_start2$$, 1));
        break;
      }
    }
  }
  return 0;
};
$FS$$.prototype.read_dir = function($dir$jscomp$1_p$jscomp$1_path$jscomp$12$$) {
  $dir$jscomp$1_p$jscomp$1_path$jscomp$12$$ = this.SearchPath($dir$jscomp$1_p$jscomp$1_path$jscomp$12$$);
  if (-1 !== $dir$jscomp$1_p$jscomp$1_path$jscomp$12$$.id) {
    return $dir$jscomp$1_p$jscomp$1_path$jscomp$12$$ = this.GetInode($dir$jscomp$1_p$jscomp$1_path$jscomp$12$$.id), Array.from($dir$jscomp$1_p$jscomp$1_path$jscomp$12$$.direntries.keys()).filter($path$jscomp$13$$ => "." !== $path$jscomp$13$$ && ".." !== $path$jscomp$13$$);
  }
};
$FS$$.prototype.read_file = function($file$jscomp$7_p$jscomp$2$$) {
  $file$jscomp$7_p$jscomp$2$$ = this.SearchPath($file$jscomp$7_p$jscomp$2$$);
  if (-1 === $file$jscomp$7_p$jscomp$2$$.id) {
    return Promise.resolve(null);
  }
  const $inode$jscomp$37$$ = this.GetInode($file$jscomp$7_p$jscomp$2$$.id);
  return this.Read($file$jscomp$7_p$jscomp$2$$.id, 0, $inode$jscomp$37$$.size);
};
var $message$$ = {Debug:function($log$jscomp$1$$) {
  $dbg_log$$([].slice.apply(arguments).join(" "), 4194304);
}, Abort:function() {
  throw Error("message.Abort()");
}};
var $marshall$$ = {};
const $textde$$ = new TextDecoder, $texten$$ = new TextEncoder;
$marshall$$.Marshall = function($typelist$$, $input$jscomp$10$$, $struct$jscomp$1$$, $offset$jscomp$80$$) {
  for (var $item$jscomp$8_stringBytes$$, $size$jscomp$47$$ = 0, $i$jscomp$145$$ = 0; $i$jscomp$145$$ < $typelist$$.length; $i$jscomp$145$$++) {
    switch($item$jscomp$8_stringBytes$$ = $input$jscomp$10$$[$i$jscomp$145$$], $typelist$$[$i$jscomp$145$$]) {
      case "w":
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ >> 8 & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ >> 16 & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ >> 24 & 255;
        $size$jscomp$47$$ += 4;
        break;
      case "d":
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ >> 8 & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ >> 16 & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ >> 24 & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = 0;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = 0;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = 0;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = 0;
        $size$jscomp$47$$ += 8;
        break;
      case "h":
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ & 255;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$ >> 8;
        $size$jscomp$47$$ += 2;
        break;
      case "b":
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = $item$jscomp$8_stringBytes$$;
        $size$jscomp$47$$ += 1;
        break;
      case "s":
        var $lengthoffset$$ = $offset$jscomp$80$$, $length$jscomp$30$$ = 0;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = 0;
        $struct$jscomp$1$$[$offset$jscomp$80$$++] = 0;
        $size$jscomp$47$$ += 2;
        $item$jscomp$8_stringBytes$$ = $texten$$.encode($item$jscomp$8_stringBytes$$);
        $size$jscomp$47$$ += $item$jscomp$8_stringBytes$$.byteLength;
        $length$jscomp$30$$ += $item$jscomp$8_stringBytes$$.byteLength;
        $struct$jscomp$1$$.set($item$jscomp$8_stringBytes$$, $offset$jscomp$80$$);
        $offset$jscomp$80$$ += $item$jscomp$8_stringBytes$$.byteLength;
        $struct$jscomp$1$$[$lengthoffset$$ + 0] = $length$jscomp$30$$ & 255;
        $struct$jscomp$1$$[$lengthoffset$$ + 1] = $length$jscomp$30$$ >> 8 & 255;
        break;
      case "Q":
        $marshall$$.Marshall(["b", "w", "d"], [$item$jscomp$8_stringBytes$$.type, $item$jscomp$8_stringBytes$$.version, $item$jscomp$8_stringBytes$$.path], $struct$jscomp$1$$, $offset$jscomp$80$$);
        $offset$jscomp$80$$ += 13;
        $size$jscomp$47$$ += 13;
        break;
      default:
        $message$$.Debug("Marshall: Unknown type=" + $typelist$$[$i$jscomp$145$$]);
    }
  }
  return $size$jscomp$47$$;
};
$marshall$$.Unmarshall = function($typelist$jscomp$1$$, $struct$jscomp$2$$, $state$jscomp$64$$) {
  let $offset$jscomp$81$$ = $state$jscomp$64$$.offset;
  for (var $output$jscomp$2$$ = [], $i$jscomp$146$$ = 0; $i$jscomp$146$$ < $typelist$jscomp$1$$.length; $i$jscomp$146$$++) {
    switch($typelist$jscomp$1$$[$i$jscomp$146$$]) {
      case "w":
        var $len$jscomp$28_qid_val$jscomp$1$$ = $struct$jscomp$2$$[$offset$jscomp$81$$++];
        $len$jscomp$28_qid_val$jscomp$1$$ += $struct$jscomp$2$$[$offset$jscomp$81$$++] << 8;
        $len$jscomp$28_qid_val$jscomp$1$$ += $struct$jscomp$2$$[$offset$jscomp$81$$++] << 16;
        $len$jscomp$28_qid_val$jscomp$1$$ += $struct$jscomp$2$$[$offset$jscomp$81$$++] << 24 >>> 0;
        $output$jscomp$2$$.push($len$jscomp$28_qid_val$jscomp$1$$);
        break;
      case "d":
        $len$jscomp$28_qid_val$jscomp$1$$ = $struct$jscomp$2$$[$offset$jscomp$81$$++];
        $len$jscomp$28_qid_val$jscomp$1$$ += $struct$jscomp$2$$[$offset$jscomp$81$$++] << 8;
        $len$jscomp$28_qid_val$jscomp$1$$ += $struct$jscomp$2$$[$offset$jscomp$81$$++] << 16;
        $len$jscomp$28_qid_val$jscomp$1$$ += $struct$jscomp$2$$[$offset$jscomp$81$$++] << 24 >>> 0;
        $offset$jscomp$81$$ += 4;
        $output$jscomp$2$$.push($len$jscomp$28_qid_val$jscomp$1$$);
        break;
      case "h":
        $len$jscomp$28_qid_val$jscomp$1$$ = $struct$jscomp$2$$[$offset$jscomp$81$$++];
        $output$jscomp$2$$.push($len$jscomp$28_qid_val$jscomp$1$$ + ($struct$jscomp$2$$[$offset$jscomp$81$$++] << 8));
        break;
      case "b":
        $output$jscomp$2$$.push($struct$jscomp$2$$[$offset$jscomp$81$$++]);
        break;
      case "s":
        $len$jscomp$28_qid_val$jscomp$1$$ = $struct$jscomp$2$$[$offset$jscomp$81$$++];
        $len$jscomp$28_qid_val$jscomp$1$$ += $struct$jscomp$2$$[$offset$jscomp$81$$++] << 8;
        var $stringBytes$jscomp$1$$ = $struct$jscomp$2$$.slice($offset$jscomp$81$$, $offset$jscomp$81$$ + $len$jscomp$28_qid_val$jscomp$1$$);
        $offset$jscomp$81$$ += $len$jscomp$28_qid_val$jscomp$1$$;
        $output$jscomp$2$$.push($textde$$.decode($stringBytes$jscomp$1$$));
        break;
      case "Q":
        $state$jscomp$64$$.offset = $offset$jscomp$81$$;
        $len$jscomp$28_qid_val$jscomp$1$$ = $marshall$$.Unmarshall(["b", "w", "d"], $struct$jscomp$2$$, $state$jscomp$64$$);
        $offset$jscomp$81$$ = $state$jscomp$64$$.offset;
        $output$jscomp$2$$.push({type:$len$jscomp$28_qid_val$jscomp$1$$[0], version:$len$jscomp$28_qid_val$jscomp$1$$[1], path:$len$jscomp$28_qid_val$jscomp$1$$[2], });
        break;
      default:
        $message$$.Debug("Error in Unmarshall: Unknown type=" + $typelist$jscomp$1$$[$i$jscomp$146$$]);
    }
  }
  $state$jscomp$64$$.offset = $offset$jscomp$81$$;
  return $output$jscomp$2$$;
};
}).call(this);
