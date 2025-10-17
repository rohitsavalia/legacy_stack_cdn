<?php
//js.php
require 'jsmin.php';
 
function checkCanGzip(){
    if (array_key_exists('HTTP_ACCEPT_ENCODING', $_SERVER)) {
        if (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip') !== false) return "gzip";
        if (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'x-gzip') !== false) return "x-gzip";
    }
    return false;
}
 
function gzDocOut($contents, $level=6){
    $return = array();
    $return[] = "\x1f\x8b\x08\x00\x00\x00\x00\x00";
    $size = strlen($contents);
    $crc = crc32($contents);
    $contents = gzcompress($contents,$level);
    $contents = substr($contents, 0, strlen($contents) - 4);
    $return[] = $contents;
    $return[] = pack('V',$crc);
    $return[] = pack('V',$size);
    return implode(null, $return);
}
 
//$ite = new RecursiveDirectoryIterator(dirname(__FILE__));
$fileArr = array(
	'jquery-1.7.1.js',
	'jquery.ui.core.min.js',
	'jquery.ui.widget.min.js',
	'minified/jquery.ui.position.min.js',
	'minified/jquery.ui.datepicker.min.js',
	'minified/jquery.ui.autocomplete.min.js',
	'minified/jquery.ui.dialog.min.js',
	'minified/jquery.ui.tabs.min.js'
);

foreach($fileArr as $file) {

				$fdata = "";
        $handle = fopen($file, 'r');
				$fdata = fread($handle,filesize($file));
        $buffer[] = $fdata;
}
 
$output = JSMin::minify(implode(";\n\n\n", $buffer));

header("Content-type: application/x-javascript; charset: UTF-8");
echo $output;

/*$forceGz    = filter_input(INPUT_GET, 'gz', FILTER_SANITIZE_STRING);
$forcePlain = filter_input(INPUT_GET, 'plain', FILTER_SANITIZE_STRING);
 
$encoding = checkCanGzip();
if ($forceGz) {
    header("Content-Encoding: {$encoding}");
    echo gzDocOut($output);
} elseif ($forcePlain) {
    echo $output;
} else {
    if ($encoding){
        header("Content-Encoding: {$encoding}");
        echo GzDocOut($output);
    } else {
        echo $output;
    }
}*/