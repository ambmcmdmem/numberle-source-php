<?php

namespace Module;

class NumberleConfig
{
  private $numberleConfig;
  private $maxNumberOfTries;
  private $maxNumberOfInput;

  public function __construct()
  {
    $this->numberleConfig = json_decode(file_get_contents('./numberleConfig.json'));
    $this->maxNumberOfTries = $this->numberleConfig->maxNumberOfTries;
    $this->maxNumberOfInput = $this->numberleConfig->maxNumberOfInput;
  }

  public function getMaxNumberOfTries(): int
  {
    return $this->maxNumberOfTries;
  }

  public function getMaxNumberOfInput(): int
  {
    return $this->maxNumberOfInput;
  }
}
