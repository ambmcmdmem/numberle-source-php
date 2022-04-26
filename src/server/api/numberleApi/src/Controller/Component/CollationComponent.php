<?php
declare(strict_types=1);

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\Controller\ComponentRegistry;

/**
 * Collation component
 */

// function pattern(bool $condition, string $status): array
// {
//     return [
//         'condition' => $condition,
//         'status' => $status
//     ];
// }

class CollationComponent extends Component
{
    /**
     * Default configuration.
     *
     * @var array<string, mixed>
     */
    protected $_defaultConfig = [];
    private $answer;

    public function statusOfProposedSolution(string $proposedSolution, string $answer): array
    {
        if(strlen($proposedSolution) !== strlen($answer))
            throw new \Exception('提示された文字列長と回答の文字列長が異なります。');

        $this->answer = $answer;

        return array_map(
            function(string $proposedSolutionCharacter, int $proposedSolutionCharacterNo): string {
                if($proposedSolutionCharacter === substr($this->answer, $proposedSolutionCharacterNo, 1)) {
                    return 'correct';
                } else if(strpos($this->answer, $proposedSolutionCharacter) !== false) {
                    return 'differentLocation';
                } else {
                    return 'wrong';
                }
            },
            str_split($proposedSolution),
            range(0, strlen($proposedSolution) - 1)
        );
    }
}
