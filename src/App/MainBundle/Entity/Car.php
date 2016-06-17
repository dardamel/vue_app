<?php

namespace App\MainBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Car
 */
class Car
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var \DateTime
     */
    private $created;

    /**
     * @var \App\MainBundle\Entity\Producer
     */
    private $producer;

    /**
     * @var \App\MainBundle\Entity\Model
     */
    private $model;

    function __construct() {
        $this->created = new \DateTime();
    }

    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Car
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Car
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime 
     */
    public function getCreated()
    {
        return $this->created;
    }


    /**
     * Set producer
     *
     * @param \App\MainBundle\Entity\Producer $producer
     * @return Car
     */
    public function setProducer(\App\MainBundle\Entity\Producer $producer = null)
    {
        $this->producer = $producer;

        return $this;
    }

    /**
     * Get producer
     *
     * @return \App\MainBundle\Entity\Producer 
     */
    public function getProducer()
    {
        return $this->producer;
    }

    /**
     * Set model
     *
     * @param \App\MainBundle\Entity\Model $model
     * @return Car
     */
    public function setModel(\App\MainBundle\Entity\Model $model = null)
    {
        $this->model = $model;

        return $this;
    }

    /**
     * Get model
     *
     * @return \App\MainBundle\Entity\Model 
     */
    public function getModel()
    {
        return $this->model;
    }
    
    public function handleJson($data, $em){
        $this->name = $data['name'];
        $this->model = $em->getReference('AppMainBundle:Model', $data['model']);
    }
}
