<?php

namespace App\MainBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Model
 */
class Model
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
     * @return Model
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
     * @var \Doctrine\Common\Collections\Collection
     */
    private $cars;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->cars = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add cars
     *
     * @param \App\MainBundle\Entity\Car $cars
     * @return Model
     */
    public function addCar(\App\MainBundle\Entity\Car $cars)
    {
        $this->cars[] = $cars;

        return $this;
    }

    /**
     * Remove cars
     *
     * @param \App\MainBundle\Entity\Car $cars
     */
    public function removeCar(\App\MainBundle\Entity\Car $cars)
    {
        $this->cars->removeElement($cars);
    }

    /**
     * Get cars
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCars()
    {
        return $this->cars;
    }
    /**
     * @var \App\MainBundle\Entity\Producer
     */
    private $producer;


    /**
     * Set producer
     *
     * @param \App\MainBundle\Entity\Producer $producer
     * @return Model
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
    
    public function handleJson($data, $em){
        $this->name = $data['name'];
        $this->producer = $em->getReference('AppMainBundle:Producer', $data['producer']['id']);
    }
}
