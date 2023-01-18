<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\BookRequest;

class HomeController extends Controller
{
    public function index()
    {
        return view('public', ['title' => 's21dororebe']);
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function list()
    {
        $items = Book::orderBy('name', 'asc')->get();
        return view('book.list', ['title' => 'Grāmatas', 'items' => $items]);
    }

}
