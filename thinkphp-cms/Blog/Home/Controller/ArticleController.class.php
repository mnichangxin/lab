<?php
namespace Home\Controller;
use Think\Controller;

class ArticleController extends Controller {

	public function exhibition($id){

		$Blog=M('Blog');
		$data=$Blog->where("id=$id")->find();

		$Comment=M('Comment');
		$comment_data=$Comment->where("id=$id")->order('identify desc')->select();

		$ob=new \Home\Controller\IndexController;

		$content=html_entity_decode($data['content']);

		$this->assign('id',$data['id']);
		$this->assign('title',$data['title']);
		$this->assign('author',$data['author']);
		$this->assign('content',$content);
		$this->assign('classify',$data['classify']);
		$this->assign('fav',$data['love']);
		$this->assign('comment',$comment_data);

		$ob->city();

		$this->display();

	}

	public function fav(){

		$condition['id']=$_POST['id'];
		$condition['ip']=get_client_ip();
		
		$fav=$_POST['fav'];

		$Love=M('Fav');

		if($Love->where($condition)->find()){

			$this->ajaxReturn($fav);

		}else{	

			$data['id']=$condition['id'];
			$data['ip']=$condition['ip'];

			$Love->add($data);

			$fav++;

			$Blog=M('Blog');
			$fav_data['love']=$fav;
			$id=$data['id'];

			$Blog->where("id=$id")->data($fav_data)->save();

			$this->ajaxReturn($fav);
		}

	}

	public function comment(){

		$data['id']=$_POST['id'];
		$data['name']=$_POST['name'];
		$data['homepage']=$_POST['homepage'];
		$data['comment']=$_POST['comment'];

		$Comment=M('Comment');

		$Comment->add($data);
	}

	public function search(){

		$search=$_POST['search'];

		$Blog=M('Blog');

		$where['title']=array('like','%'.$search.'%');

		$count=$Blog->where($where)->count();//统计数据个数

		$Page=new \Think\Page($count,5);//实例化分页类，传入总记录数	

		$show=$Page->show();

		$blog=$Blog->where($where)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();

		$ob=new \Home\Controller\IndexController;
		$ob->city();

		$this->assign('page',$show);
		$this->assign('blog',$blog);

		$this->display('Index:index');

	}

	public function sea_class($classify){

		$Blog=M('Blog');

		$where['classify']=$classify;

		$Blog->where($where)->select();

    	$count=$Blog->count();//统计数据个数

    	$Page=new \Think\Page($count,5);//实例化分页类，传入总记录数

    	$show=$Page->show();

    	$blog=$Blog->where($where)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();

    	$this->assign('page',$show);//赋值分页输出
    	
    	$this->assign('blog',$blog);

    	$ob=new \Home\Controller\IndexController;

    	$ob->city();	

    	$this->display('Index:index');
	}

	public function about(){

		$ob=new \Home\Controller\IndexController;
		$ob->city();
		$this->display();
	}

}