<?php
	require_once('getid3.php');

	function embed($swf, $width=-1, $height=-1, $flashvars=''){
		$swf = explode('.', $swf);
		array_pop($swf);
		$swf = implode('.', $swf);

		if($width == -1 || $height == -1)
			list($width, $height) = getimagesize($swf.'.swf');

		echo "<script language='javascript'>\n";
		echo "	'codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',\n";
		echo "	'width', '$width',\n";
		echo "	'height', '$height',\n";
		echo "	'src', 'x',\n";
		echo "	'quality', 'high',\n";
		echo "	'pluginspage', 'http://www.macromedia.com/go/getflashplayer',\n";
		echo "	'align', 'middle',\n";
		echo "	'play', 'true',\n";
		echo "	'FlashVars', '$flashvars',\n";
		echo "	'allowFullScreen', 'true',\n";
		echo "	'movie', '$swf'\n";
		echo "	}\n";
		echo "</script>\n";
		echo "<noscript>\n";
		echo "	<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='$width' height='$height' align='middle'>\n";
		echo "	<param name='allowFullScreen' value='true'>\n";
		echo "	<param name='movie' value='$swf.swf?$flashvars' /><param name='quality' value='high' /><embed src='$swf.swf?$flashvars' width='$width' height='$height' align='middle' allowFullScreen='true' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'>\n";
		echo "	</object>\n";
		echo "</noscript>\n";
	}

	function getflvsize($flv){
		$getID3 = new getID3;
		$fileinfo = $getID3->analyze($flv);
		if(!($fileinfo['meta']['onMetaData']['width'] && $fileinfo['meta']['onMetaData']['height']))
			return false;
		$width = $fileinfo['meta']['onMetaData']['width'];
		$height = $fileinfo['meta']['onMetaData']['height'];
		return array($width, $height);
	}
	
	function flvheader(){
		static $once=true;
		
		if($once){
			if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE'))
				echo "<script src='AC_RunActiveContent.js' language='javascript'></script>";
			else
				echo "<script charset='ISO-8859-1' src='rac.js' language='javascript'></script>";
		}
		
		$once = false;
	}

	function flvstring($movie, $width=-1, $height=-1, $fgcolor='', $bgcolor='', $autoplay=false, $autoload=true, $autorewind=true, $volume=70, $loop=false, $mute=false, $muteonly=false, $clickurl='', $clicktarget=''){
		if(!file_exists($movie))
			return "Movie not found.";
		if($width == -1 || $height == -1)
			list($width, $height) = getflvsize($movie);

		$height += 40;
		$retval = '';
		$options = array();

		if($fgcolor && $accentcolor !== '' && $accentcolor !== 'default')
			$options[] = "accentcolor=$accentcolor";
		if($bgcolor && $btncolor !== '' && $btncolor !== 'default')
			$options[] = "btncolor=$btncolor";

		if($autoplay && $autoplay !== '' && $autoplay !== 'default')
			$options[] = 'autoplay=off';
			
		if(!$autoload)
			$options[] = 'autoload=on';
			
		if($volume && $volume !== '' && $volume !== 'default')
			$options[] = "volume=$volume";
		if($mute && $mute !== '' && $mute !== 'default')
			$options[] = 'mute=off';
			
		$options = implode('&', $options);

		if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE'))
			$retval = "<!-- saved from url=(0013)about:internet -->\n";
		
		$retval .= "<script language='javascript'>\n";
		$retval .= "  var src = 'player';\n";
		$retval .= "  if(!DetectFlashVer(9, 0, 0) && DetectFlashVer(8, 0, 0))\n";
		$retval .= "   src = 'player8';\n";
		$retval .= "  AC_FL_RunContent('codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0', 'width', $width, 'height', $height, 'src', src, 'pluginspage', 'http://www.macromedia.com/go/getflashplayer',	'id', 'flvPlayer', 'allowFullScreen', 'true', 'movie', src, 'FlashVars','movie=$movie&$options');\n";
		$retval .= "</script>\n";
		$retval .= "<noscript>\n";
		$retval .= "<object width='$width' height='$height' id='flvPlayer'>\n";
		$retval .= " <param name='allowFullScreen' value='true'>\n";
		$retval .= " <param name='movie' value='player.swf?movie=$movie&$options'>\n";
		$retval .= " <embed src='player.swf?movie=$movie&$options' width='$width' height='$height' allowFullScreen='true' type='application/x-shockwave-flash'>\n";
		$retval .= "</object>\n";
		$retval .= "</noscript>\n";
			
		return	 $retval;
	}
	
	function flv($movie, $width=400, $height=325, $accentcolor='', $btncolor='',$txtcolor='', $autoplay=off, $autoload=on, $volume=20, $mute="off"){
		echo flvstring($movie, $width, $height, $accentcolor, $btncolor, $txtcolor, $autoplay, $autoload, $volume, $mute);
	}

?>