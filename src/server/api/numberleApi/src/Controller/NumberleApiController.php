<?php

declare(strict_types=1);

namespace App\Controller;

/**
 * NumberleApi Controller
 *
 * @method \App\Model\Entity\NumberleApi[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class NumberleApiController extends AppController
{
    public function initialize(): void
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function answer()
    {
        $this->loadComponent('Numberle', [
            'seed' => 2
        ]);
        $this->loadComponent('Collation', [
            'answer' => $this->Numberle->getAnswer()
        ]);
        $this->viewBuilder()->setClassName('Json');
        $this->set('samples', [
            $this->Collation->statusOfProposedSolution('12345'),
            '12345',
            $this->Numberle->getAnswer()
        ]);
        $this->set('_serialize', ['samples']);
    }
}
