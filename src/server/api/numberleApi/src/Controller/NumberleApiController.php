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
        $this->loadComponent('Collation');
        $this->viewBuilder()->setClassName('Json');
        $this->set('samples', $this->Collation->statusOfProposedSolution('aiueo', 'ofuea'));
        $this->set('_serialize', ['samples']);
    }
}
