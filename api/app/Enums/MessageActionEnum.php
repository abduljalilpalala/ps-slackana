<?php

namespace App\Enums;

enum MessageActionEnum: string
{
    case ADD_MESSAGE = 'ADD_MESSAGE';
    case UPDATE_MESSAGE = 'UPDATE_MESSAGE';
    case DELETE_MESSAGE = 'DELETE_MESSAGE';
}
