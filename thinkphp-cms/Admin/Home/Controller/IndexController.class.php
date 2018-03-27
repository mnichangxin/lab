<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    
    //后台主入口
    public function index(){
                
        $sess=session('sessionname');//判断是否登录

        if(empty($sess)){

            $this->display();

        }else{

           $this->redirect('Home/Index/publish');
        }
   
    }

    //错误处理函数
    public function deal($error,$username){

         $this->show("<script>alert('$error');</script>");
         $this->assign('username',$username);
         $this->display('index');        
    }

    //登录验证
    public function login(){

        $username=I('post.username');
        $password=I('post.password');

        $Adminer=M('Adminer');

        //判断用户名密码
        if(!empty($username)){

            if(!empty($password)){

                if($Adminer->where(array('username'=>$username,'password'=>$password))->find()){

                session('sessionname',$username);

                $this->redirect('Home/Index/publish');

                }else{

                    $this->deal('用户名或密码错误！',$username);//调用自定义的错误处理函数deal
                }  

            }else{

                $this->deal('密码为空！',$username);
            }
            
            
        }else{

            $this->deal('用户名为空！','');
        }
          

    }
         

    //注册验证
    /*public function register(){

        $username=I('post.username');
        $password=I('post.password');

        $Adminer=M('Adminer');

        if(!empty($username)){

            if(!empty($password)){

                $userlen=strlen($username);
                $passlen=strlen($password);

                if(($userlen>=4&&$userlen<=10)&&($passlen>=4&&$passlen<=10)){

                     if(!($Adminer->where(array('username'=>$username))->find())){

                        $data['username']=$username;
                        $data['password']=$password;

                        $Adminer->data($data)->add();//写入数据库

                        session('sessionname',$username);

                        $this->redirect('Home/Index/publish');

                     }else{

                        $this->deal('用户名已存在！',$username);
                     }

                }else{

                    $this->deal('用户名或密码长度必须介于6-10位之间',$username);
                }
                
            }else{

                $this->deal('密码为空！',$username);
            }

        }else{

            $this->deal('用户名为空','');
        }

    }*/

    //注销用户
    public function logout(){

        session(null);
        $this->redirect('Home/Index/index');
    }

    //文章发布首页
    public function publish(){
        
        if(empty($_SESSION)){

            $this->redirect('Home/Index/login');
        }

        $Blog=M('Blog');

        $data=$Blog->order('id desc')->select();

        $this->assign('data',$data);

        $this->display();
    }
}