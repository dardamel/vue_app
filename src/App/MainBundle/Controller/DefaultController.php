<?php

namespace App\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

use App\MainBundle\Entity\Contact;

class DefaultController extends Controller
{
    private function getSerializer(){
        $encoders = array(new JsonEncoder());
        
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getName();
        });

        return new Serializer(array($normalizer), $encoders);
    }
    
    public function homeAction()
    {
        $em = $this->getDoctrine()->getManager();
        $articles = $em->getRepository('AppMainBundle:Article')->getHomeArticles();
        $data = array(
            'articles' => $this->getSerializer()->normalize($articles, 'json'),
        );
        
        return new JsonResponse($data);
    }

    public function menuAction()
    {
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('AppMainBundle:Category')->findAll();
        $data = array(
            'categories' => $this->getSerializer()->normalize($categories, 'json'),
        );
        
        return new JsonResponse($data);
    }
    
    public function categoryAction($link)
    {
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('AppMainBundle:Category')->findOneBy(array('link' => $link));
        
        $data = array(
            'category' => $this->getSerializer()->normalize($categories, 'json'),
        );
        
        return new JsonResponse($data);
    }

    public function articleAction($link)
    {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('AppMainBundle:Article')->findOneBy(array('link' => $link));
        
        $data = array(
            'article' => $this->getSerializer()->normalize($article, 'json'),
        );
        
        return new JsonResponse($data);
        
    }
    
    public function contactAction(){
        
        $postdata = file_get_contents("php://input");
        $data = json_decode($postdata);
        
        try{
            $contact = new Contact();
            
            $contact->setEmail($data->email)->setMessage($data->content)->setName($data->name);
            
            $em = $this->getDoctrine()->getManager();
            $em->persist($contact);
            $em->flush();
        } catch (\Exception $ex) {
            return new JsonResponse(array('errors' => $ex->getMessage()));
        }
        
        return new JsonResponse(array('message' => 'Twoje zapytanie zostało zapisane.'));
    }
}
