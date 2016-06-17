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
    /**
     * 
     * @return Serializer
     */
    private function getSerializer(){
        $encoders = array(new JsonEncoder());
        
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getName();
        });

        return new Serializer(array($normalizer), $encoders);
    }
    
    /**
     * 
     * @param type $resource
     * @return JsonResponse
     */
    public function getAllAction($resource){
        
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppMainBundle:'.$resource)->findAll();
        
        $data = array(
            'data' => $this->getSerializer()->normalize($entities, 'json'),
        );
        
        return new JsonResponse($data);
        
    }
    
    /**
     * 
     * @param type $resource
     * @param type $id
     * @return JsonResponse
     * @throws type
     */
    public function getElementAction($resource, $id){
        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('AppMainBundle:'.$resource)->find($id);
        
        if(!$entity){
            throw $this->createNotFoundException('Unable to find entity.');
        }
        
        $data = array(
            'data' => $this->getSerializer()->normalize($entity, 'json'),
        );
        
        return new JsonResponse($data);
    }
    
    /**
     * 
     * @param type $resource
     * @param type $id
     * @return JsonResponse
     * @throws type
     */
    public function removeElementAction($resource, $id){
        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('AppMainBundle:'.$resource)->find($id);
        
        if(!$entity){
            throw $this->createNotFoundException('Unable to find entity.');
        }
        
        $em->remove($entity);
        $em->flush();
        
        return new JsonResponse('success');
    }
    
    /**
     * 
     * @param Request $request
     * @param type $resource
     * @return JsonResponse
     * @throws type
     */
    public function saveElementAction(Request $request, $resource){
        
        $em = $this->getDoctrine()->getManager();
        $data = $this->get('request')->request->all();
        
        if($request->get('id')){
            $entity = $em->getRepository('AppMainBundle:'.$resource)->find($request->get('id'));
        }else{
            $class = '\App\MainBundle\Entity\\'.$resource; 
            $entity = new $class();
        }
        
        if(!$entity){
            throw $this->createNotFoundException('Unable to find entity.');
        }
        
        $entity->handleJson($data, $em);
        
        $em->persist($entity);
        $em->flush();
        
        $data = array(
            'data' => $this->getSerializer()->normalize($entity, 'json'),
        );
        
        return new JsonResponse($data);
    }
    
    /**
     * 
     * @return JsonResponse
     */
//    public function contactAction(){
//        
//        $postdata = file_get_contents("php://input");
//        $data = json_decode($postdata);
//        
//        try{
//            $contact = new Contact();
//            
//            $contact->setEmail($data->email)->setMessage($data->content)->setName($data->name);
//            
//            $em = $this->getDoctrine()->getManager();
//            $em->persist($contact);
//            $em->flush();
//        } catch (\Exception $ex) {
//            return new JsonResponse(array('errors' => $ex->getMessage()));
//        }
//        
//        return new JsonResponse(array('message' => 'Twoje zapytanie zostało zapisane.'));
//    }
//    
//    public function adminAction(){
//        return $this->render('AppMainBundle:Admin:index.html.twig');
//    }
}
