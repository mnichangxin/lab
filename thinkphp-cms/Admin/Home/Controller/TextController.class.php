<?php
namespace Home\Controller;
use Think\Controller;

class TextController extends Controller{

	//检查用户是否存在
	public function check(){

		if(empty($_SESSION)){

			$this->redirect('Home/Index/login');
		}
	}

	//发布
	public function send(){

		$this->check();

		if(IS_POST){									  

			if(!empty($_FILES['img']['tmp_name'])){

				$config=array(

					'maxSize'=>5242880,
					'savaPath'=>'/uploads/',
					'savaName'=>array('uniqid',''),
					'exts'=>array('jpg','jpeg','gif','png'),
					//'mimes'=>array('image/jpeg','image/pjpeg','image/gif','image/x-png','image/bmp'),

				);//上传参数配置

				$upload=new \Think\Upload($config,'sae');//实例化上传类
				
				$info=$upload->uploadOne($_FILES['img']);

				if(!$info){

					$this->error($upload->getError());

				}else{

					$title=I('post.title');
					$author=I('post.author');
					$introduction=I('post.introduction');
					$content=I('post.content');
					$classify=I('post.classify');
					$time=time();

					$image=$info['savename'];

					$Blog=M('Blog');

					$data['title']=$title;
					$data['author']=$author;
					$data['introduction']=$introduction;
					$data['content']=$content;
					$data['classify']=$classify;
					$data['time']=$time;
					$data['image']=$image;


					if($Blog->data($data)->add()){

						$this->success('发布成功');

					}else{

						$this->error('发布失败！');
					}

				}		
				
			}else{

				$title=I('post.title');
				$author=I('post.author');
				$introduction=I('post.introduction');
				$content=I('post.content');
				$classify=I('post.classify');
				$time=time();

				$data['title']=$title;
				$data['author']=$author;
				$data['introduction']=$introduction;
				$data['content']=$content;
				$data['classify']=$classify;
				$data['time']=$time;

				$Blog=M('Blog');

				if($Blog->data($data)->add()){

					$this->success("发布成功");

				}else{

					$this->error('发布失败！');
				}
				
			}

		}else{

			$this->display();
		}
		
	}

	//更新
	public function upd($id){

		$this->check();

		if(IS_POST){

			if(!empty($_FILES['img']['tmp_name'])){

				$config=array(

					'maxSize'=>5242880,
					'savaPath'=>'/uploads/',
					'savaName'=>array('uniqid',''),
					'exts'=>array('jpg','jpeg','gif','png'),
					//'mimes'=>array('image/jpeg','image/pjpeg','image/gif','image/x-png','image/bmp'),

				);//上传参数配置

				$upload=new \Think\Upload($config,'sae');//实例化上传类
				
				$info=$upload->uploadOne($_FILES['img']);

				if(!$info){

					$this->error($upload->getError());

				}else{

					$id=I('post.id');
					$title=I('post.title');
					$author=I('post.author');
					$introduction=I('post.introduction');
					$content=I('post.content');
					$classify=I('post.classify');
					$time=time();

					$image=$info['savename'];

					$Blog=M('Blog');

					$data['title']=$title;
					$data['author']=$author;
					$data['introduction']=$introduction;
					$data['content']=$content;
					$data['classify']=$classify;
					$data['time']=$time;
					$data['image']=$image;


					if($Blog->where("id=$id")->save($data)){

						$this->success('更新成功');

					}else{

						$this->error('更新失败！');
					}

				}		
				
			}else{

				$id=I('post.id');
				$title=I('post.title');
				$author=I('post.author');
				$introduction=I('post.introduction');
				$content=I('post.content');
				$classify=I('post.classify');
				$time=time();

				$data['title']=$title;
				$data['author']=$author;
				$data['introduction']=$introduction;
				$data['content']=$content;
				$data['classify']=$classify;
				$data['time']=$time;

				$Blog=M('Blog');

				if($Blog->where("id=$id")->save($data)){

					$this->success("更新成功");

				}else{

					$this->error('更新失败！');
				}
				
			}

		}else{

			$Blog=M('Blog');

			$data=$Blog->where("id= $id")->find();

			$this->assign('data',$data);

			$this->display();
		}
		
	}

	//删除
	public function del(){

		$this->check();

		$Blog=M('Blog');

		$iname=$_POST['id'];

		$Blog->where("id= $iname")->delete();

	}

	//搜索
	public function ser(){

		$this->check();

		$this->display();
	}

	//关于
	public function about(){

		$this->check();

		$this->display();
	}

	//其他功能
	public function other(){

		$this->check();
		
		$this->display();
	}

}