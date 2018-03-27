<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends Controller {

    public function index(){

    	//从数据库读取数据
    	$Blog=M('Blog');

    	$count=$Blog->count();//统计数据个数

    	$Page=new \Think\Page($count,5);//实例化分页类，传入总记录数

    	$show=$Page->show();

    	$blog=$Blog->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();

    	$this->assign('page',$show);//赋值分页输出
    	
    	$this->assign('blog',$blog);

    	$this->city();	

    	$this->display();
    }

    public function city(){

    	$ipname = get_client_ip();

   		//配置appkey
		$appkey = "c13876fd46c1e59f54a1378e19de4c24"; 
		
		$url = "http://apis.juhe.cn/ip/ip2addr";

		$params = array(

		      "ip" =>$ipname,//需要查询的IP地址或域名
		      "key" => $appkey,//应用APPKEY(应用详细页查询)
		      "dtype" => "json",//返回数据的格式,xml或json，默认json
		);


		/**
		 * 请求接口返回内容
		 * @param  string $url [请求的URL地址]
		 * @param  string $params [请求的参数]
		 * @param  int $ipost [是否采用POST形式]
		 * @return  string
		 */
		function juhecurl($url,$params=false,$ispost=0){

		    $httpInfo = array();
		    $ch = curl_init();
		 
		    curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
		    curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
		    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
		    curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
		    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
		    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

		    if( $ispost )
		    {
		        curl_setopt( $ch , CURLOPT_POST , true );
		        curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
		        curl_setopt( $ch , CURLOPT_URL , $url );
		    }
		    else{
		    	
		        if($params){

		            curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );

		        }else{

		            curl_setopt( $ch , CURLOPT_URL , $url);
		        }
		    }
		    $response = curl_exec( $ch );
		    if ($response === FALSE) {
		        //echo "cURL Error: " . curl_error($ch);
		        return false;
		    }
		    $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
		    $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
		    curl_close( $ch );
		    return $response;
		}

		$paramstring = http_build_query($params);
		$content = juhecurl($url,$paramstring);
		$result = json_decode($content,true);

		if($result){

		    if($result['error_code']=='0'){

		    	$str=$result['result']['area'];

		    	//自定义中文字符串转数组
		    	function mb_str_split($str,$charset) {

				  $strlen=mb_strlen($str);

				  while($strlen){

				    $array[]=mb_substr($str,0,1,$charset);
				    $str=mb_substr($str,1,$strlen,$charset);
				    $strlen=mb_strlen($str);

				  }

				  return $array;

				}

				$arr=mb_str_split($str,'utf-8');

		    	foreach($arr as $key=>$value){
		    		
		    		if($value=='省'){

		    			$statnum = $key;
		    		}
		    			
		    		if($value=='市'){

		    			$stopnum = $key;
		    		}
		    	}

		    	$arr_result=mb_substr($str,$statnum+1,$stopnum-$statnum-1,'utf-8');

		    	$data=$this->weather($arr_result);

		   		
		   		if(strstr($data['info'],'晴')){

					$img_name='sunny';
				}

				if(strstr($data['info'],'多云')){

					$img_name='cloudy';
				}

				if(strstr($data['info'],'阴')){

					$img_name='nosunny';
				}

				if(strstr($data['info'],'霾')){

					$img_name='fog';
				}

				if(strstr($data['info'],'雾')){

					$img_name='fog';
				}

				if(strstr($data['info'],'雪')){

					$img_name='snow';
				}
			

				if(strstr($data['info'],'雨')){

					$img_name='rain';
				}
				
				$img_name="images/blog/weather/".$img_name.".png";

		    	$this->assign('img_name',$img_name);

				$this->assign('info',$data['info']);

				$this->assign('temperature',$data['temperature']);

		        $this->assign('area',$result['result']['area']);

		        //$this->display();

		    }else{

		        echo $result['error_code'].":".$result['reason'];

		    }

		}else{

		    echo "请求失败";
		}
    	
    }


    public function weather($arr_result){

		//配置appkey
		$appkey = "1a26617fc93820e84c075468cbd4f58a"; 
		 
		$url = "http://op.juhe.cn/onebox/weather/query";

		$params = array(

		      "cityname" =>$arr_result,//要查询的城市，如：温州、上海、北京
		      "key" => $appkey,//应用APPKEY(应用详细页查询)
		      "dtype" => "json",//返回数据的格式,xml或json，默认json
		);


		/**
		 * 请求接口返回内容
		 * @param  string $url [请求的URL地址]
		 * @param  string $params [请求的参数]
		 * @param  int $ipost [是否采用POST形式]
		 * @return  string
		 */
		function juhecur($url,$params=false,$ispost=0){

		    $httpInfo = array();
		    $ch = curl_init();
		 
		    curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
		    curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
		    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
		    curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
		    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
		    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

		    if( $ispost )
		    {
		        curl_setopt( $ch , CURLOPT_POST , true );
		        curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
		        curl_setopt( $ch , CURLOPT_URL , $url );
		    }
		    else
		    {
		        if($params){

		            curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );

		        }else{

		            curl_setopt( $ch , CURLOPT_URL , $url);
		        }
		    }

		    $response = curl_exec( $ch );

		    if ($response === FALSE) {

		        //echo "cURL Error: " . curl_error($ch);
		        return false;
		    }

		    $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
		    $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
		    curl_close( $ch );
		    return $response;
		}	


		$paramstring = http_build_query($params);
		$content = juhecur($url,$paramstring);
		$result = json_decode($content,true);

		if($result){

		    if($result['error_code']=='0'){

		    	return $result['result']['data']['realtime']['weather'];//返回天气信息

		    }else{

		        echo $result['error_code'].":".$result['reason'];
		   
		    }

		}else{

		    echo "请求失败";
		}

    }

}
    